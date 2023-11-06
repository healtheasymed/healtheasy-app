<template>
  <q-page padding>
    <q-form @submit.prevent="onSubmit">
      <h5 class="q-mb-md">{{ isUpdate ? 'Editar' : 'Adicionar' }} Evento</h5>

      <q-input
        v-model="form.name"
        type="text"
        label="Título"
        class="q-mb-sm"
        maxlength="20"
        counter
        outlined
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Por favor, informe o título.'
        ]"
      />

      <div class="row q-mb-md" :class="{ 'q-col-gutter-sm': $q.platform.is.desktop }">
        <div class="col-12 col-md-8">
          <q-field
            label="Tipo de Evento"
            v-model="form.type"
            required
            outlined
            dense
            stack-label
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Por favor, informe o tipo de evento.'
            ]"
          >
            <template v-slot:control>
              <q-radio
                v-model="form.type"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                label="Compromisso"
                val="compromisso"
              />

              <q-radio
                v-model="form.type"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                label="Consulta"
                val="consulta"
              />

              <q-radio
                v-model="form.type"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                label="Indisponível"
                val="indisponível"
              />
            </template>
          </q-field>
        </div>

        <div class="col-12 col-md-4">
          <q-select
            v-model="form.color"
            label="Cor"
            class="q-mb-sm"
            :options="colorOptions"
            emit-value
            map-options
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="mdi-circle" :style="{ color: form.color }" />
            </template>
          </q-select>
        </div>
      </div>

      <div class="row" :class="{ 'q-col-gutter-sm': $q.platform.is.desktop }">
        <template v-if="isAllDay">
          <div class="col-12">
            <InputDate
              v-model="startedDate"
              label="Data"
              :rules="[
                val => (val && val.length === 10) || 'Por favor, informe a data.',
              ]"
            />
          </div>
        </template>

        <template v-else>
          <div class="col-12 col-md-6">
            <InputDateTime
              v-model="startedDate"
              label="Data de Início"
              :rules="[
                val => (val && val.length === 16) || 'Por favor, informe a data e hora de início.',
              ]"
            />
          </div>

          <div class="col-12 col-md-6">
            <InputDateTime
              v-model="endedDate"
              label="Data de Fim"
              :rules="[
                val => (val && val.length === 16) || 'Por favor, informe a data e hora de fim.',
              ]"
            />
          </div>
        </template>
      </div>

      <q-checkbox
        v-model="isAllDay"
        class="q-mb-md"
        checked-icon="task_alt"
        label="Dia Inteiro"
      />

      <q-input
        label="Adicionar uma descrição"
        v-model="form.note"
        type="textarea"
        outlined
      />

      <div class="row q-mt-md justify-center q-col-gutter-lg">
        <div class="col-12 col-md-5">
          <q-btn
            label="Descartar"
            type="reset"
            color="negative"
            class="full-width"
            outline
            :disable="!formHasChanged"
            @click="onDiscardChanges"
          />
        </div>

        <div class="col-12 col-md-5">
          <q-btn
            label="Registrar"
            type="submit"
            color="positive"
            class="full-width"
            :outline="isDisabled || !formHasChanged"
            :disable="isDisabled || !formHasChanged"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import {
  computed, defineComponent, onMounted, onUnmounted, ref, watch,
} from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import InputDate from '@/components/InputDate';
import InputDateTime from '@/components/InputDateTime';
import useSupabaseApi from '@/composables/useSupabaseApi';
import useDialog from '@/composables/useDialog';
import useNotify from '@/composables/useNotify';
import { appointmentModel, getAppointmentModelForm } from '@/models/appointmentModel';
import { hasFormChanged } from '@/utils/formUtils';
import {
  getTodayLocaleDateTime,
  getLocaleDateTimeFormatted,
  formatToQalendarDateTime,
  hasFormDateFieldChanged,
} from '@/utils/dateUtils';

export default defineComponent({
  name: 'FormPage',

  components: {
    InputDate,
    InputDateTime,
  },

  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const { getById, post, update } = useSupabaseApi();
    const { dialogConfirm } = useDialog();
    const { notifyError, notifyInfo, notifySuccess } = useNotify();

    const isUpdate = computed(() => !!route.params.id);
    const showError = ref(false);
    const formHasChanged = ref(false);
    const isDisabled = ref(false);
    const form = getAppointmentModelForm();
    const initialForm = structuredClone(form);

    const colorOptions = appointmentModel.eventColors;

    const isAllDay = ref(false);

    const dateStarts = computed(() => route.query.startedDate || getTodayLocaleDateTime());
    const dateEnds = computed(() => route.query.endedDate || getTodayLocaleDateTime());
    const startedDate = ref(dateStarts.value);
    const endedDate = ref(dateEnds.value);

    const initialDateToCheck = computed(() => (
      isUpdate.value
        ? getLocaleDateTimeFormatted(initialForm.value.date_starts)
        : initialForm.value.date_starts
    ));
    const finalDateToCheck = computed(() => (
      isUpdate.value
        ? getLocaleDateTimeFormatted(initialForm.value.date_ends)
        : initialForm.value.date_ends
    ));

    watch(isAllDay, (newValue) => {
      if (newValue) {
        [startedDate.value] = startedDate.value.split(' ');
        endedDate.value = startedDate.value;
        formHasChanged.value = true;
        return;
      }

      startedDate.value = dateStarts.value;
      endedDate.value = dateEnds.value;
    });

    watch([form, startedDate, endedDate], ([newForm, newStartedDate, newEndedDate]) => {
      const hasFormDatesChanged = (
        hasFormDateFieldChanged(initialDateToCheck.value, newStartedDate)
        || hasFormDateFieldChanged(finalDateToCheck.value, newEndedDate)
      );

      if (hasFormDatesChanged) {
        formHasChanged.value = hasFormDatesChanged;
        return;
      }

      console.log(initialForm.value, form.value, newForm);
      formHasChanged.value = hasFormChanged(initialForm.value, newForm);
    }, { deep: true });

    const getAppointment = async () => {
      try {
        $q.loading.show();
        isDisabled.value = true;

        const appointment = await getById('appointments', route.params.id);

        if (appointment) {
          initialForm.value = structuredClone(appointment);
          form.value = appointment;
          startedDate.value = getLocaleDateTimeFormatted(form.value.date_starts);
          endedDate.value = getLocaleDateTimeFormatted(form.value.date_ends);
        }
      } catch (error) {
        notifyError(error.message);
      } finally {
        $q.loading.hide();
        isDisabled.value = false;
      }
    };

    onBeforeRouteLeave((to, from, next) => {
      const isChangingPage = from.path !== to.path;

      if (isChangingPage && formHasChanged.value) {
        dialogConfirm('Você realmente deseja sair da página?', 'Ao sair, todas as alterações serão descartadas.', () => {
          next();
        });
        return;
      }

      next();
    });

    const onDiscardChanges = () => {
      dialogConfirm('Você realmente deseja descartar as alterações?', 'A ação não poderá ser desfeita.', () => {
        form.value = structuredClone(initialForm.value);
        startedDate.value = initialDateToCheck.value;
        endedDate.value = finalDateToCheck.value;
      });
    };

    const onSubmit = async () => {
      if (formHasChanged.value) {
        try {
          $q.loading.show();
          isDisabled.value = true;

          form.value.date_starts = formatToQalendarDateTime(startedDate.value);
          form.value.date_ends = formatToQalendarDateTime(endedDate.value);
          if (isUpdate.value) {
            await update('appointments', form.value);
          } else {
            await post('appointments', form.value);
          }
          notifySuccess(`Compromisso ${isUpdate.value ? 'atualizado' : 'cadastrado'} com sucesso!`);
          formHasChanged.value = false;
        } catch (error) {
          notifyError(error.message);
        } finally {
          $q.loading.hide();
          isDisabled.value = false;
        }

        return;
      }
      notifyInfo('Nenhuma modificação identificada.');
    };

    const checkDates = () => {
      if ((route.query.startedDate && route.query.endedDate)
        && route.query.startedDate === route.query.endedDate) {
        isAllDay.value = true;
      }
    };

    onMounted(() => {
      checkDates();

      if (isUpdate.value) {
        getAppointment();
        return;
      }

      form.value.date_starts = startedDate.value;
      form.value.date_ends = endedDate.value;
      initialForm.value = structuredClone(form.value);
    });

    onUnmounted(() => {
      form.value = getAppointmentModelForm();
      initialForm.value = structuredClone(form);
    });

    return {
      form,
      colorOptions,
      isAllDay,
      startedDate,
      endedDate,
      showError,
      isUpdate,
      isDisabled,
      formHasChanged,
      onDiscardChanges,
      onSubmit,
    };
  },
});
</script>

<style scoped>
:deep(.q-field__prefix) {
  color: v-bind(prefixColor);
  font-weight: bold;
}
</style>
