<template>
  <q-page padding>
    <Qalendar
      v-if="showQalendar"
      :config="config"
      :events="parsedAppointments"
      :selected-date="new Date()"
      @updated-mode="selectedViewMode = $event.mode"
      @updated-period="onViewModeChange"
      @event-was-clicked="getClickedEvent"
      @interval-was-clicked="getClickedInterval"
      @event-was-dragged="onDraggedOrResized"
      @event-was-resized="onDraggedOrResized"
      @edit-event="(id) => onEdit(id)"
      @delete-event="(id) => onDelete(id)"
    />
  </q-page>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  watch,
} from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { Qalendar } from 'qalendar';
import { storeToRefs } from 'pinia';
import { useAppointmentsStore } from '@/stores/appointments';
import useSupabaseApi from '@/composables/useSupabaseApi';
import useDialog from '@/composables/useDialog';
import useNotify from '@/composables/useNotify';
import {
  getYear,
  getTodayLocaleDate,
  getLocaleDateFormatted,
  formatDateTimeToLocaleString,
} from '@/utils/dateUtils';

export default defineComponent({
  name: 'AppointmentsPage',

  components: {
    Qalendar,
  },

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const store = useAppointmentsStore();
    const { selectedViewMode } = storeToRefs(store);
    const { listByUserId, remove, update } = useSupabaseApi();
    const { notifyError, notifySuccess } = useNotify();
    const { dialogConfirm } = useDialog();

    const showQalendar = ref(false);
    const appointments = ref(null);
    const parsedAppointments = ref(null);
    const clickedDayOfMonth = ref(null);
    const clickedIntervalStart = ref(null);
    const clickedIntervalEnd = ref(null);
    const qalendarInterval = ref(null);
    const clickedEvent = ref(null);

    const parseAppointments = () => {
      parsedAppointments.value = appointments.value.map((appointment) => (
        {
          title: appointment.name,
          time: {
            start: appointment.date_starts,
            end: appointment.date_ends,
          },
          color: appointment.color || 'green',
          isEditable: true,
          id: appointment.id,
          description: appointment.note,
        }
      ));

      showQalendar.value = true;
    };

    const unparseAppointment = (appointment) => (
      {
        name: appointment.title,
        date_starts: appointment.time.start,
        date_ends: appointment.time.end,
        color: appointment.color,
        id: appointment.id,
        note: appointment.description,
      }
    );

    const showDialogToIncludeAppointment = (date) => {
      dialogConfirm(
        'Novo Compromisso',
        `
          Deseja incluir um novo compromisso em
          <b>${date}</b>?
        `,
        () => (
          router.push({
            name: 'form-appointment',
            query: {
              startedDate: clickedIntervalStart.value || clickedDayOfMonth.value,
              endedDate: clickedIntervalEnd.value || clickedDayOfMonth.value,
            },
          })
        ),
      );
    };

    const getClickedEvent = (appointment) => {
      clickedEvent.value = appointment.clickedEvent;
    };

    const getClickedInterval = (data) => {
      clickedIntervalStart.value = formatDateTimeToLocaleString(data.intervalStart);
      clickedIntervalEnd.value = formatDateTimeToLocaleString(data.intervalEnd);
      showDialogToIncludeAppointment(clickedIntervalStart.value);
    };

    const addEventListenerOnVisibleDaysOfMonth = (clickedDay) => {
      if (!clickedDay) {
        return;
      }

      clickedDay.addEventListener('click', (element) => {
        const elementDate = String(element.target.id).replace('day-', '');

        if (!elementDate) {
          return;
        }

        clickedDayOfMonth.value = getLocaleDateFormatted(elementDate);
        clickedIntervalStart.value = null;
        clickedIntervalEnd.value = null;
        showDialogToIncludeAppointment(clickedDayOfMonth.value);
      });
    };

    const setStyleClassInTodayElement = () => {
      const calendarWeekDays = document.querySelectorAll('.calendar-month__weekday');

      if (!calendarWeekDays) {
        return;
      }

      [...calendarWeekDays].forEach(({ id: dayId, children }) => {
        [...children].forEach(({ id, classList }) => {
          if (classList.contains('calendar-month__day-date')) {
            id = getLocaleDateFormatted(dayId.replace('day-', ''));

            if (id === getTodayLocaleDate()) {
              classList.add('is-today-month');
            }
          }
        });
      });
    };

    const setEventListenerOnMonthViewMode = () => {
      const visibleDays = document.querySelectorAll('.calendar-month__weekday');

      if (!visibleDays) {
        return;
      }

      visibleDays.forEach((clickedDay) => (addEventListenerOnVisibleDaysOfMonth(clickedDay)));
    };

    const setYearInWeekViewModeTitle = () => {
      const titleWeekViewMode = document.querySelector('.calendar-header__period-name');
      const currentYear = getYear();
      const titleHasYear = titleWeekViewMode.innerHTML.includes(currentYear);

      if (!titleWeekViewMode || titleHasYear) {
        return;
      }

      titleWeekViewMode.innerHTML += ` ${currentYear}`;
    };

    const findQalendarAndApplyListener = (elementClass) => {
      const qalendarElement = document.querySelector(`${elementClass}`);

      if (!qalendarElement) {
        return;
      }

      if (elementClass.includes('month')) {
        setEventListenerOnMonthViewMode();
        setStyleClassInTodayElement();
      }

      if (elementClass.includes('week')) {
        setYearInWeekViewModeTitle();
      }

      clearInterval(qalendarInterval.value);
    };

    const searchQalendarElement = (elementClass) => {
      findQalendarAndApplyListener(elementClass);
      qalendarInterval.value = setInterval(findQalendarAndApplyListener, 1000, elementClass);
    };

    const fetchAppointments = async () => {
      try {
        $q.loading.show();
        appointments.value = await listByUserId('appointments');

        if (appointments.value) {
          parseAppointments();
        }
      } catch (error) {
        notifyError(error.message);
      }

      $q.loading.hide();
    };

    const onViewModeChange = () => {
      clearInterval(qalendarInterval.value);

      if (selectedViewMode.value === 'month' || selectedViewMode.value === 'day') {
        searchQalendarElement(`.calendar-root.mode-is-${selectedViewMode.value}`);
        return;
      }

      if (selectedViewMode.value === 'week') {
        searchQalendarElement('.calendar-root.mode-is-week .calendar-header__period-name');
      }
    };

    const findAppointment = (id) => (
      appointments.value.find((appointment) => appointment.id === id)
    );

    const updateAppointment = async (appointment) => {
      try {
        await update('appointments', appointment);
        notifySuccess();
      } catch (error) {
        notifyError(error.message);
      }
    };

    const onDraggedOrResized = (newAppointment) => {
      let appointment = findAppointment(newAppointment.id);
      if (appointment) {
        appointment = unparseAppointment(newAppointment);
        updateAppointment(appointment);
      }
    };

    const onEdit = (id) => {
      const appointment = findAppointment(id);
      if (appointment) {
        router.push({ name: 'form-appointment', params: { id } });
      }
    };

    const deleteAppointment = async ({ id, name }) => {
      dialogConfirm(
        'Excluir evento',
        `Você realmente deseja excluir o evento <b>${name}</b> ?`,
        async () => {
          try {
            await remove('appointments', id);
            notifySuccess();
            fetchAppointments();
          } catch (error) {
            notifyError(error.message);
          }
        },
      );
    };

    const onDelete = (id) => {
      const appointment = findAppointment(id);
      if (appointment) {
        deleteAppointment(appointment);
      }
    };

    watch((selectedViewMode), () => {
      localStorage.setItem('selectedViewMode', selectedViewMode.value);
      onViewModeChange();
    });

    onMounted(() => {
      onViewModeChange();
      fetchAppointments();
    });

    return {
      config: {
        locale: 'pt-BR',
        defaultMode: selectedViewMode.value,
        style: {
          colorSchemes: {
            backgroundColor: '#FFF',
          },
        },
        week: {
          startsOn: 'sunday',
          nDays: 7,
        },
        dayIntervals: {
          length: 30,
          height: 50,
          displayClickableInterval: true,
        },
      },
      parsedAppointments,
      showQalendar,
      getClickedEvent,
      getClickedInterval,
      selectedViewMode,
      onViewModeChange,
      onDraggedOrResized,
      onEdit,
      onDelete,
    };
  },
});
</script>

<style>
@import '../../../../node_modules/qalendar/dist/style.css';

.qalendar-is-small .calendar-header__mode-picker {
  display: block !important;
}

.calendar-root-wrapper .calendar-root {
  background-color: var(--white);
}

.calendar-header svg {
  color: var(--q-primary);
}

.week-timeline__date {
  width: 2.1rem !important;
}

.is-today-month {
  background: var(--dark-blue);
  border-radius: 50%;
  color: var(--white) !important;
  padding: 4px 6px;
}

.is-today .week-timeline__date,
.has-day.is-today {
  background-color: var(--q-primary) !important;
}

.has-day.is-today:hover {
  opacity: 0.8 !important;
}

.is-icon:hover,
.date-picker__toggle-mode:hover {
  color: var(--q-secondary) !important;
}

.week.is-active {
  border-color: var(--q-secondary) !important;
}

.calendar-month__day-name,
.calendar-month__day-date {
  pointer-events: none;
}

@media (max-width: 700px) {
  .event-flyout.is-visible {
    position: fixed !important;
  }
}
</style>
