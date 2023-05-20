<template>
  <q-form @submit.prevent="onSubmit" @reset="onDiscardChanges">
    <q-page-sticky v-if="isDoctorRegistered || isUpdate" position="bottom-right" :offset="[18, 18]">
      <template v-if="isUpdate">
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
      </template>

      <template v-else>
        <q-btn
          color="negative"
          padding="sm"
          class="q-mr-sm"
          icon="mdi-delete"
          fab
          :disable="!isAlreadyBelongToClinic"
          @click="removeOfClinic"
        >
          <q-tooltip anchor="top middle" self="center middle" :offset="[18, 18]">
            Remover da Clínica
          </q-tooltip>
        </q-btn>

        <q-btn
          color="positive"
          padding="sm"
          icon="mdi-plus"
          fab
          :disable="isAlreadyBelongToClinic"
          @click="addToClinic"
        >
          <q-tooltip anchor="top middle" self="center middle" :offset="[18, 18]">
            Adicionar à Clínica
          </q-tooltip>
        </q-btn>
      </template>
    </q-page-sticky>

    <template v-if="isDoctorRegistered || isUpdate">
      <h6 class="q-mb-md">Dados Pessoais</h6>

      <q-input
        v-model="profileForm.name"
        type="text"
        label="Nome Completo"
        class="q-mb-sm"
        outlined
        lazy-rules
        :rules="[
          val => (val && val.length >= 6) || 'Por favor, informe o nome completo.'
        ]"
        :disable="isDoctorRegistered"
      />

      <div class="row q-mb-md q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <q-input
            v-model="form.crm"
            type="text"
            label="CRM"
            outlined
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Por favor, informe o CRM.'
            ]"
            :disable="isDoctorRegistered"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-select
            v-model="form.state"
            label="Estado de Atuação"
            outlined
            :options="states"
            option-label="nome"
            option-value="nome"
            emit-value
            map-options
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Por favor, informe o Estado de Atuação.'
            ]"
            :disable="isDoctorRegistered"
          />
        </div>
      </div>

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
            :disable="isDoctorRegistered"
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
            :disable="isDoctorRegistered"
          />
        </div>
      </div>

      <h6 class="q-mb-lg">Contato</h6>

      <div class="row q-mb-md q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <q-input
            v-model="profileForm.email"
            type="email"
            label="E-mail"
            outlined
            lazy-rules
            :rules="[
              val => (val && val.length >= 5) || 'Por favor, informe o e-mail.'
            ]"
            :disable="isDoctorRegistered"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            v-model="profileForm.phone"
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
            :disable="isDoctorRegistered"
          />
        </div>
      </div>

      <h6 class="q-mb-lg">Dados Médicos</h6>

      <q-select
        ref="healthPlansSelectRef"
        v-model="form.plans"
        label="Plano(s) de Saúde"
        class="q-mb-lg"
        new-value-mode="add-unique"
        outlined
        use-input
        use-chips
        multiple
        bottom-slots
        hide-dropdown-icon
        @input-value="plans = $event"
        :disable="isDoctorRegistered"
      >
        <template v-slot:hint>
          <p>Digite o nome do plano e tecle <b>ENTER</b>,
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
            @click="onAddItem(plans, healthPlansSelectRef)"
          />
        </template>
      </q-select>

      <q-select
        v-model="form.specialties"
        label="Especialidade(s)"
        :options="specialtiesOptions"
        outlined
        option-label="value"
        option-value="value"
        multiple
        use-chips
        stack-label
        emit-value
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Por favor, informe ao menos uma Especialidade.'
        ]"
      >
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
      </q-select>
    </template>

    <template v-else>
      <h6 class="q-mb-md">Buscar médico(a)</h6>

      <div class="row q-mb-md q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <q-input
            v-model="profileForm.email"
            type="email"
            label="E-mail"
            outlined
            lazy-rules
            :rules="[
              val => (val && val.length >= 5) || 'Por favor, informe o e-mail.'
            ]"
            @keyup.enter="profileForm.email?.length >= 5 && searchDoctorByEmail()"
          >
            <template v-slot:append v-if="!!profileForm.email && profileForm.email.length >= 5">
              <q-icon name="mdi-magnify" @click="searchDoctorByEmail" class="cursor-pointer" />
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-6">

        </div>
      </div>
    </template>
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
import { storeToRefs } from 'pinia';
import useSupabaseApi from '@/composables/useSupabaseApi';
import useDialog from '@/composables/useDialog';
import useNotify from '@/composables/useNotify';
import { getProfileEnumForm, getDoctorEnumForm } from '@/enums/doctorEnum';
import { sexEnum } from '@/enums/sexEnum';
import { hasFormChanged } from '@/utils/formUtils';
import {
  getTodayLocaleDate,
  getLocaleDateFormatted,
  getDateInISOFormat,
  hasFormDateFieldChanged,
} from '@/utils/dateUtils';
import { specialties as specialtiesOptions } from '@/static/specialties';
import InputDate from '@/components/InputDate';
import { useUserStore } from '@/stores/user';
import { useBrazilianStatesStore } from '@/stores/brazilianStates';

export default defineComponent({
  name: 'IdentificationForm',

  components: {
    InputDate,
  },

  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const {
      filteredList,
      getById,
      getByProfileId,
      post,
      update,
    } = useSupabaseApi();
    const { dialogConfirm } = useDialog();
    const { notifyError, notifyInfo, notifySuccess } = useNotify();
    const store = useUserStore();
    const brazilianStatesStore = useBrazilianStatesStore();
    const { states } = storeToRefs(brazilianStatesStore);

    const isUpdate = computed(() => !!route.params.id);
    const isDoctorRegistered = ref(false);
    const showError = ref(false);
    const formHasChanged = ref(false);
    const isDisabled = ref(false);

    const form = getDoctorEnumForm();
    const initialForm = structuredClone(form);
    const profileForm = getProfileEnumForm();
    const initialProfileForm = structuredClone(profileForm);
    const sexOptions = sexEnum;
    const birthDate = ref(getTodayLocaleDate());
    const healthPlansSelectRef = ref(null);
    const plans = ref(null);

    const dateToCheck = computed(() => {
      if (!initialForm.value) return birthDate.value;

      return isUpdate.value
        ? getLocaleDateFormatted(initialForm.value.birth_date)
        : initialForm.value.birth_date;
    });

    const userId = computed(() => store.getUserId);
    const userRole = computed(() => store.getUserRole);
    const isAlreadyBelongToClinic = computed(() => (
      !!form.value.clinic_id?.filter((clinic) => clinic === userId.value)
      || false
    ));

    const onAddItem = (itemValue, refName) => {
      if (itemValue && itemValue !== '') {
        refName.add(itemValue);
        refName.updateInputValue('');
      }
    };

    const searchDoctorByEmail = async () => {
      try {
        $q.loading.show();
        isDisabled.value = true;

        const [profile] = await filteredList(
          'profiles',
          {
            column: 'email',
            value: profileForm.value.email,
          },
          `
            id,
            name,
            email,
            phone,
            role
          `,
        );

        if (profile && profile.role === 'doctor') {
          isDoctorRegistered.value = true;
          initialProfileForm.value = structuredClone(profile);
          profileForm.value = profile;
          return;
        }
      } catch (error) {
        notifyError(error.message);
      } finally {
        $q.loading.hide();
        isDisabled.value = false;
      }
    };

    watch([form, profileForm, birthDate], () => {
      const hasFormDatesChanged = hasFormDateFieldChanged(
        dateToCheck.value,
        birthDate.value,
      );

      if (hasFormDatesChanged) {
        formHasChanged.value = hasFormDatesChanged;
        return;
      }

      const doctorFormHasChanged = hasFormChanged(initialForm.value, form.value);
      const profileFormHasChanged = hasFormChanged(initialProfileForm.value, profileForm.value);
      formHasChanged.value = doctorFormHasChanged || profileFormHasChanged;
    }, { deep: true });

    const getProfile = async () => {
      try {
        $q.loading.show();
        isDisabled.value = true;

        const profile = await getById('profiles', route.params.id);

        if (profile) {
          initialProfileForm.value = structuredClone(profile);
          profileForm.value = profile;
        }
      } catch (error) {
        notifyError(error.message);
      } finally {
        $q.loading.hide();
        isDisabled.value = false;
      }
    };

    const getDoctor = async () => {
      try {
        $q.loading.show();
        isDisabled.value = true;

        const doctor = await getByProfileId('doctors', profileForm.value.id);

        if (doctor) {
          doctor.birth_date = getLocaleDateFormatted(doctor.birth_date);
          initialForm.value = structuredClone(doctor);
          form.value = doctor;

          birthDate.value = doctor.birth_date;
        }
      } catch (error) {
        notifyError(error.message);
      } finally {
        $q.loading.hide();
        isDisabled.value = false;
      }
    };

    const addToClinic = async () => {
      try {
        $q.loading.show();

        if (form.value.clinic_id) {
          form.value.clinic_id.push(userId.value);
        } else {
          form.value.clinic_id = [userId.value];
        }

        await update('doctors', form.value);

        notifySuccess('Médico(a) adicionado à Clínica!');
      } catch (error) {
        notifyError(error.message);
      } finally {
        $q.loading.hide();
      }
    };

    const removeOfClinic = async () => {
      try {
        $q.loading.show();

        if (form.value.clinic_id) {
          form.value.clinic_id = form.value.clinic_id.filter((clinic) => clinic !== userId.value);
        } else {
          form.value.clinic_id = null;
        }

        await update('doctors', form.value);

        notifySuccess('Médico(a) removido da Clínica!');
      } catch (error) {
        notifyError(error.message);
      } finally {
        $q.loading.hide();
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
          profileForm.value = structuredClone(initialProfileForm.value);
          birthDate.value = dateToCheck.value;
        },
      );
    };

    const onSubmit = async () => {
      if (isDoctorRegistered.value && userRole.value === 'clinic') {
        notifyError('Alterações de dados pessoais somente deverão ser feitas através da conta deste usuário.');
        return;
      }

      if (formHasChanged.value) {
        try {
          $q.loading.show();
          isDisabled.value = true;

          form.value.birth_date = getDateInISOFormat(birthDate.value);
          profileForm.value.role = 'doctor';

          const isClinicAlreadyAdded = form.value.clinic_id
            .find((clinicId) => Number(clinicId) === userId.value);

          if (userRole.value === 'clinic' && !isClinicAlreadyAdded) {
            form.value.clinic_id = form.value.clinic_id
              ? [...form.value.clinic_id, userId.value]
              : userId.value;
          }

          if (isUpdate.value) {
            await update('profiles', profileForm.value);
            await update('doctors', form.value);
          } else {
            profileForm.value = await post('profiles', profileForm.value);
            form.value.profile_id = profileForm.value.id;
            await post('doctors', form.value);
          }

          notifySuccess(`Médico(a) ${isUpdate.value ? 'atualizado' : 'cadastrado'} com sucesso!`);
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

    watch(isDoctorRegistered, (value) => !!value && getDoctor());

    onMounted(async () => {
      if (isUpdate.value) {
        await getProfile();
        await getDoctor();
      }

      initialForm.value = structuredClone(form.value);
      initialProfileForm.value = structuredClone(profileForm.value);
    });

    onUnmounted(() => {
      form.value = getDoctorEnumForm();
      initialForm.value = structuredClone(form);
      profileForm.value = getProfileEnumForm();
      initialProfileForm.value = structuredClone(profileForm);
    });

    return {
      form,
      profileForm,
      sexOptions,
      birthDate,
      states,
      getTodayLocaleDate,
      showError,
      isUpdate,
      isDoctorRegistered,
      isDisabled,
      isAlreadyBelongToClinic,
      formHasChanged,
      healthPlansSelectRef,
      plans,
      specialtiesOptions,
      onDiscardChanges,
      searchDoctorByEmail,
      onAddItem,
      onSubmit,
      addToClinic,
      removeOfClinic,
    };
  },
});
</script>
