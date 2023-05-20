<template>
  <h6 class="q-mb-md">Dados do Atendimento</h6>

  <q-input
    v-if="userAuth && userAuthRole === 'doctor' && userAuth.user_metadata.name"
    v-model="userAuth.user_metadata.name"
    type="text"
    label="Médico(a) Responsável"
    class="q-mb-sm"
    disable
    outlined
    lazy-rules
    :rules="[
      val => (val && val.length >= 6)
        || 'Por favor, informe o nome do profissional responsável.'
    ]"
  />

  <q-input
    v-else-if="selectedDoctor"
    v-model="selectedDoctor.name"
    type="text"
    label="Médico(a) Responsável"
    class="q-mb-sm"
    disable
    outlined
    lazy-rules
    :rules="[
      val => (val && val.length >= 6)
        || 'Por favor, informe o nome do profissional responsável.'
    ]"
  />

  <q-checkbox
    v-model="isPaidTreatment"
    class="q-mb-md"
    checked-icon="task_alt"
    label="Particular"
  />

  <div class="row q-mb-md q-col-gutter-sm">
    <div class="col-12 col-md-6">
      <q-input
        v-model="treatmentForm.plan"
        type="text"
        label="Plano de Saúde"
        class="q-mb-sm"
        outlined
        lazy-rules
        :rules="[
          val => (val && val.length >= 4) || 'Por favor, informe o nome plano de saúde.'
        ]"
      />
    </div>

    <div class="col-12 col-md-6">
      <InputDateTime
        v-model="treatmentDate"
        label="Data"
        :rules="[
          val => (val && val.length === 16) || 'Por favor, informe a data e hora.',
        ]"
      />
    </div>
  </div>

  <h6 class="q-mb-md">Dados do Paciente</h6>

  <q-select
    v-if="patientsList"
    v-model="treatmentForm.patient_id"
    label="Paciente"
    outlined
    :options="patientsList"
    option-label="name"
    option-value="id"
    emit-value
    map-options
    @update:model-value="showPatientCard = false"
    lazy-rules
    :rules="[
      val => (val && val > 0) || 'Por favor, informe o paciente.'
    ]"
  >
  <template v-slot:append v-if="treatmentForm.patient_id">
    <q-tooltip anchor="top middle" self="center middle">
      Exibir Ficha do Paciente
    </q-tooltip>
    <q-icon
      v-if="!selectedPatient"
      name="mdi-eye"
      @click.stop.prevent="showPatientCard = true"
    />
    <q-icon
      v-else
      name="mdi-eye-off"
      @click.stop.prevent="showPatientCard = false"
    />
  </template>
  </q-select>

  <q-card class="bg-blue-grey-8 text-white" v-if="showPatientCard && selectedPatient">
    <q-card-section class="bg-blue-grey-9 flex column q-pb-sm">
      <p class="text-h6 text-bold">
        {{ selectedPatient.name || selectedPatient.social_name }}
        - {{ selectedPatient.sex }}
      </p>
      <p>
        Nascimento:
        <b>
          {{ getLocaleDateFormatted(selectedPatient.birth_date) }}
          <span v-if="getAge(selectedPatient.birth_date)">
            ( {{ getAge(selectedPatient.birth_date) }} anos )
          </span>
        </b>
      </p>
    </q-card-section>

    <q-separator dark />

    <q-card-section class="flex column">
      <p v-if="selectedPatient.plans">
        Planos:
        <b>{{ selectedPatient.plans.join(',') }}</b>
      </p>
      <p v-if="selectedPatient.previous_illnesses">
        Doenças Prévias:
        <b>{{ selectedPatient.previous_illnesses.join(',') }}</b>
      </p>
      <p v-if="selectedPatient.usual_medications">
        Medicamentos em Uso:
        <b>{{ selectedPatient.usual_medications.join(',') }}</b>
      </p>
      <p v-if="selectedPatient.allergies">
        Alergias:
        <b>{{ selectedPatient.allergies.join(',') }}</b>
      </p>
      <!-- <q-btn dense flat>
        <q-icon name="mdi-eye" class="q-mr-sm" />
        Visualizar
      </q-btn> -->
    </q-card-section>
  </q-card>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useTreatmentsStore } from '@/stores/treatments';
import useAuthUser from '@/composables/useAuthUser';
import { hasFormChanged } from '@/utils/formUtils';
import {
  getLocaleDateFormatted,
  formatDateTimeToLocaleString,
  getAge,
  hasFormDateFieldChanged,
} from '@/utils/dateUtils';
import InputDateTime from '@/components/InputDateTime';

export default defineComponent({
  name: 'IdentificationForm',

  components: {
    InputDateTime,
  },

  setup() {
    const route = useRoute();
    const store = useTreatmentsStore();
    const {
      isDisabled,
      identificationFormHasChanged,
      treatmentForm,
      initialTreatmentForm,
      treatmentDate,
      patientsList,
      selectedPatient,
      selectedDoctor,
      showPatientCard,
    } = storeToRefs(store);
    const fetchAllPatients = () => store.fetchAllPatients();
    const fetchSelectedPatient = () => store.fetchSelectedPatient();
    const fetchSelectedDoctor = (id) => store.fetchSelectedDoctor(id);
    const fetchTreatment = (id) => store.fetchTreatment(id);

    const { userAuth, userAuthRole } = useAuthUser();

    const isUpdate = computed(() => !!route.params.id || !!initialTreatmentForm.value.id);
    const hasPatientQueryId = computed(() => !!(route.query.id && route.query.role === 'patient'));
    const hasDoctorQueryId = computed(() => !!(route.query.id && route.query.role === 'doctor'));
    const isPaidTreatment = ref(false);

    const dateToCheck = computed(() => (
      isUpdate.value
        ? formatDateTimeToLocaleString(initialTreatmentForm.value.date)
        : initialTreatmentForm.value.date
    ));

    watch(isPaidTreatment, (isPaid) => {
      if (isPaid) {
        treatmentForm.value.plan = 'Particular';
        return;
      }

      treatmentForm.value.plan = initialTreatmentForm.value.plan;
    });

    watch([treatmentForm, treatmentDate], () => {
      const hasFormDatesChanged = hasFormDateFieldChanged(dateToCheck.value, treatmentDate.value);
      if (hasFormDatesChanged) {
        identificationFormHasChanged.value = hasFormDatesChanged;
        return;
      }

      identificationFormHasChanged.value = hasFormChanged(
        initialTreatmentForm.value,
        treatmentForm.value,
      );
    }, { deep: true });

    watch(showPatientCard, (show) => {
      if (!show) {
        selectedPatient.value = null;
        return;
      }

      const isSamePatient = selectedPatient.value
        && selectedPatient.value.id === treatmentForm.value.patient_id;

      if (isSamePatient) {
        return;
      }

      fetchSelectedPatient();
    });

    const findAndSelectPatient = () => {
      const selectedPatientByQuery = patientsList.value
        .find((patient) => patient.id === Number(route.query.id));

      if (!selectedPatientByQuery) {
        return;
      }

      initialTreatmentForm.value.patient_id = selectedPatientByQuery.id;
      treatmentForm.value.patient_id = selectedPatientByQuery.id;
    };

    onMounted(async () => {
      initialTreatmentForm.value = structuredClone(treatmentForm.value);
      await fetchAllPatients();

      if (hasPatientQueryId.value) {
        findAndSelectPatient();
        return;
      }

      if (hasDoctorQueryId.value) {
        fetchSelectedDoctor(route.query.id);
        return;
      }

      if (isUpdate.value) {
        fetchTreatment(route.params.id);
      }
    });

    return {
      identificationFormHasChanged,
      isDisabled,
      userAuth,
      userAuthRole,
      treatmentForm,
      treatmentDate,
      patientsList,
      selectedPatient,
      selectedDoctor,
      showPatientCard,
      getLocaleDateFormatted,
      getAge,
      isPaidTreatment,
    };
  },
});
</script>
