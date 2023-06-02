<template>
  <q-form @submit.prevent="onSubmit" @reset="onDiscardChanges">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        type="reset"
        color="negative"
        padding="sm"
        class="q-mr-sm"
        icon="mdi-cancel"
        fab
        :disable="!formHasChanged"
      >
        <q-tooltip anchor="top middle" self="center middle" :offset="[18, 18]">
          Descartar
        </q-tooltip>
      </q-btn>

      <q-btn
        type="submit"
        color="positive"
        padding="sm"
        icon="mdi-content-save"
        fab
        :disable="!formHasChanged"
      >
        <q-tooltip anchor="top middle" self="center middle" :offset="[18, 18]">
          Registrar
        </q-tooltip>
      </q-btn>
    </q-page-sticky>

    <h6 class="q-mb-md">Dados Pessoais</h6>

    <q-input
      v-if="!hasSocialName"
      v-model="form.name"
      type="text"
      label="Nome Completo"
      class="q-mb-sm"
      outlined
      lazy-rules
      :rules="[
        val => (val && val.length >= 6) || 'Por favor, informe o nome completo.'
      ]"
    />

    <q-checkbox
      v-model="hasSocialName"
      class="q-mb-md"
      checked-icon="task_alt"
      label="Quero informar um Nome Social"
    />

    <q-input
      v-if="hasSocialName"
      v-model="form.social_name"
      type="text"
      label="Nome Social"
      class="q-mb-sm"
      outlined
      lazy-rules
      :rules="[
        val => (val && val.length >= 3) || 'Por favor, informe o nome social.'
      ]"
    />

    <q-input
      v-model="form.cpf"
      type="text"
      mask="###.###.###-##"
      label="CPF"
      class="q-my-md"
      outlined
      lazy-rules
      :rules="[
        val => (val && val.length) || 'Por favor, informe o CPF.',
        val => (val && val.length >= 11) || 'Por favor, informe um CPF válido.',
      ]"
    />

    <div class="row q-mb-md q-col-gutter-sm">
      <div class="col-12 col-md-6">
        <q-select
          v-model="form.sex"
          label="Sexo"
          :options="sexOptions"
          outlined
          stack-label
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Por favor, informe o sexo.',
          ]"
        />
      </div>

      <div class="col-12 col-md-6">
        <InputDate
          v-model="birthDate"
          label="Data de Nascimento"
          :rules="[
            val => (val && val.length === 10) || 'Por favor, informe a data de nascimento.',
            val => (val && val !== getTodayLocaleDate())
              || 'Por favor, a data de nascimento deve ser diferente da data atual.',
          ]"
        />
      </div>
    </div>

    <h6 class="q-mb-lg">Contato & Endereço</h6>

    <div class="row q-mb-md q-col-gutter-sm">
      <div class="col-12 col-md-6">
        <q-input
          v-model="form.email"
          type="email"
          label="E-mail"
          outlined
          lazy-rules
          :rules="[
            val => (val && val.length >= 5) || 'Por favor, informe o e-mail.'
          ]"
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input
          v-model="form.phone"
          type="text"
          label="Whatsapp"
          class="q-mb-md"
          outlined
          lazy-rules
          mask="(##) ##### - ####"
          hint="Formato: (12) 91234 - 5678"
          :rules="[
            val => (val && val.length > 0) || 'Por favor, informe o celular.',
            val => (val && val.length > 16)
              || 'Por favor, informe um número de celular válido.',
          ]"
        />
      </div>
    </div>

    <q-input
      v-model="form.address"
      type="text"
      label="Endereço Completo"
      class="q-my-md"
      outlined
      lazy-rules
      :rules="[
        val => (val && val.length >= 10) || 'Por favor, informe o endereço completo.'
      ]"
    />

    <h6 class="q-mb-lg">Dados Médicos</h6>

    <q-checkbox
      v-model="onlyPaidTreatment"
      class="q-mb-md"
      checked-icon="task_alt"
      label="Apenas Particular"
    />

    <div class="row q-col-gutter-sm q-mb-md">
      <div class="col-12 col-md-6">
        <q-input
          v-model="form.plan"
          type="text"
          label="Plano de Saúde"
          outlined
          lazy-rules
          :rules="[
            val => (val && val.length >= 4) || 'Por favor, informe o plano de saúde.'
          ]"
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input
          v-model="form.plan_number"
          type="text"
          label="Número do Plano Principal / SUS"
          outlined
          lazy-rules
          :rules="[
            val => (val && val.length >= 5)
              || 'Por favor, informe corretamente o número do plano.'
          ]"
        />
      </div>
    </div>

    <q-select
      ref="previousIllnessesSelectRef"
      v-model="form.previous_illnesses"
      label="Doenças Prévias"
      class="q-mb-lg"
      new-value-mode="add-unique"
      outlined
      use-input
      use-chips
      multiple
      bottom-slots
      hide-dropdown-icon
      @input-value="previousIllness = $event"
    >
      <template v-slot:hint>
        <p>Digite o nome da doença e tecle <b>ENTER</b>,
          ou clique no botão <b>+</b> para adicioná-lo.</p>
      </template>

      <template v-slot:selected-item="scope">
        <q-chip
          class="q-px-md"
          color="primary"
          text-color="white"
          icon="mdi-check"
          square
          outline
          size="md"
          removable
          @remove="scope.removeAtIndex(scope.index)"
        >
          {{ scope.opt }}
        </q-chip>
      </template>

      <template v-slot:append>
        <q-btn
          color="primary"
          icon="mdi-plus"
          flat
          dense
          @click="onAddItem(previousIllness, previousIllnessesSelectRef)"
        />
      </template>
    </q-select>

    <q-select
      ref="usualMedicationsSelectRef"
      v-model="form.usual_medications"
      label="Medicamentos em Uso"
      :class="{
        'q-mb-lg': $q.platform.is.desktop,
        'q-mb-md': $q.platform.is.mobile,
      }"
      new-value-mode="add-unique"
      outlined
      use-input
      use-chips
      multiple
      bottom-slots
      hide-dropdown-icon
      @input-value="usualMedication = $event"
    >
      <template v-slot:hint>
        <p>Digite o nome do medicamento e tecle <b>ENTER</b>,
          ou clique no botão <b>+</b> para adicioná-lo.</p>
      </template>

      <template v-slot:selected-item="scope">
        <q-chip
          class="q-px-md"
          color="primary"
          text-color="white"
          icon="mdi-check"
          square
          outline
          size="md"
          removable
          @remove="scope.removeAtIndex(scope.index)"
        >
          {{ scope.opt }}
        </q-chip>
      </template>

      <template v-slot:append>
        <q-btn
          color="primary"
          icon="mdi-plus"
          flat
          dense
          @click="onAddItem(usualMedication, usualMedicationsSelectRef)"
        />
      </template>
    </q-select>

    <q-select
      ref="allergiesSelectRef"
      v-model="form.allergies"
      label="Alergias"
      class="q-mb-lg"
      new-value-mode="add-unique"
      outlined
      use-input
      use-chips
      multiple
      bottom-slots
      hide-dropdown-icon
      @input-value="allergy = $event"
    >
      <template v-slot:hint>
        <p>Digite o nome da alergia e tecle <b>ENTER</b>,
          ou clique no botão <b>+</b> para adicioná-lo.</p>
      </template>

      <template v-slot:selected-item="scope">
        <q-chip
          class="q-px-md"
          color="primary"
          text-color="white"
          icon="mdi-check"
          square
          outline
          size="md"
          removable
          @remove="scope.removeAtIndex(scope.index)"
        >
          {{ scope.opt }}
        </q-chip>
      </template>

      <template v-slot:append>
        <q-btn
          color="primary"
          icon="mdi-plus"
          flat
          dense
          @click="onAddItem(allergy, allergiesSelectRef)"
        />
      </template>
    </q-select>
  </q-form>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import useSupabaseApi from '@/composables/useSupabaseApi';
import useDialog from '@/composables/useDialog';
import useNotify from '@/composables/useNotify';
import { getPatientModelForm } from '@/models/patientModel';
import { sexModel } from '@/models/sexModel';
import { hasFormChanged } from '@/utils/formUtils';
import {
  getTodayLocaleDate,
  getLocaleDateFormatted,
  getDateInISOFormat,
  hasFormDateFieldChanged,
} from '@/utils/dateUtils';
import InputDate from '@/components/InputDate';

export default defineComponent({
  name: 'IdentificationForm',

  components: {
    InputDate,
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

    const form = getPatientModelForm();
    const initialForm = structuredClone(form);
    const sexOptions = sexModel;
    const hasSocialName = ref(false);
    const birthDate = ref(getTodayLocaleDate());

    const dateToCheck = computed(() => (
      isUpdate.value
        ? getLocaleDateFormatted(initialForm.value.birth_date)
        : initialForm.value.birth_date
    ));

    const onlyPaidTreatment = ref(false);
    const previousIllnessesSelectRef = ref(null);
    const previousIllness = ref(null);
    const usualMedicationsSelectRef = ref(null);
    const usualMedication = ref(null);
    const allergiesSelectRef = ref(null);
    const allergy = ref(null);

    watch(onlyPaidTreatment, (onlyPaid) => {
      if (onlyPaid) {
        form.value.plan = 'Particular';
        return;
      }

      form.value.plan = initialForm.value.plan;
    });

    watch(hasSocialName, (newValue) => {
      if (newValue) {
        form.value.name = '';
      }
    });

    watch([form, birthDate], () => {
      const hasFormDatesChanged = hasFormDateFieldChanged(
        dateToCheck.value,
        birthDate.value,
      );

      if (hasFormDatesChanged) {
        formHasChanged.value = hasFormDatesChanged;
        return;
      }

      formHasChanged.value = hasFormChanged(initialForm.value, form.value);
    }, { deep: true });

    const getPatient = async () => {
      try {
        $q.loading.show();
        isDisabled.value = true;

        const patient = await getById('patients', route.params.id);

        if (patient) {
          initialForm.value = structuredClone(patient);
          form.value = patient;
          birthDate.value = getLocaleDateFormatted(form.value.birth_date);
          hasSocialName.value = Boolean(form.value.social_name);
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
        dialogConfirm(
          'Você realmente deseja sair da página?',
          'Ao sair, todas as alterações serão descartadas.',
          () => {
            next();
          },
        );

        return;
      }

      next();
    });

    const onDiscardChanges = () => {
      dialogConfirm(
        'Você realmente deseja descartar as alterações?',
        'A ação não poderá ser desfeita.',
        () => {
          form.value = structuredClone(initialForm.value);
          birthDate.value = dateToCheck.value;
          hasSocialName.value = Boolean(initialForm.value.social_name);
        },
      );
    };

    const onAddItem = (itemValue, refName) => {
      if (itemValue && itemValue !== '') {
        refName.add(itemValue);
        refName.updateInputValue('');
      }
    };

    const onSubmit = async () => {
      if (formHasChanged.value) {
        try {
          $q.loading.show();
          isDisabled.value = true;

          form.value.birth_date = getDateInISOFormat(birthDate.value);

          if (isUpdate.value) {
            await update('patients', form.value);
          } else {
            await post('patients', form.value);
          }

          notifySuccess(`Paciente ${isUpdate.value ? 'atualizado' : 'cadastrado'} com sucesso!`);
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

    onMounted(() => {
      if (isUpdate.value) {
        getPatient();
        return;
      }

      initialForm.value = structuredClone(form.value);
      initialForm.value.birth_date = birthDate.value;
    });

    onUnmounted(() => {
      form.value = getPatientModelForm();
      initialForm.value = structuredClone(form);
    });

    return {
      form,
      sexOptions,
      hasSocialName,
      birthDate,
      getTodayLocaleDate,
      showError,
      isUpdate,
      isDisabled,
      formHasChanged,
      onDiscardChanges,
      onlyPaidTreatment,
      previousIllnessesSelectRef,
      previousIllness,
      usualMedicationsSelectRef,
      usualMedication,
      allergiesSelectRef,
      allergy,
      onAddItem,
      onSubmit,
    };
  },
});
</script>
