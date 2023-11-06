<template>
  <q-page padding>
    <q-img
      :src="require('@/assets/icons/logo-memed.svg')"
      class="q-mb-md"
      spinner-color="primary"
      spinner-size="82px"
      width="200px"
    />

    <q-form
      @submit="onSubmit"
      @reset="onReset"
    >
      <div class="flex justify-between">
        <h6 class="q-ma-none">Dados Cadastrais</h6>

        <q-btn
          color="primary"
          icon="add"
          label="Atendimento"
          @click="$router.push({ name: 'form-treatment' })"
        />
      </div>

      <q-separator spaced />

      <div class="q-ma-none q-mb-md">
        <b>Status da Integração</b>

        <div class="flex items-center">
          <q-toggle
            v-model="form.status_memed"
            checked-icon="mdi-check"
            unchecked-icon="mdi-cancel"
            false-value="inactive"
            true-value="active"
            keep-color
            :label="form.status_memed === 'active' ? 'Ativo' : 'Inativo'"
            :color="form.status_memed === 'active' ? 'positive' : 'negative'"
          />
        </div>
      </div>

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
            :disable="!!form.crm"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            v-model="form.state"
            type="text"
            label="Estado de Atuação"
            outlined
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Por favor, informe o Estado de Atuação.'
            ]"
            :disable="!!form.state"
          />
        </div>
      </div>

      <div class="row q-mb-md q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <q-input
            v-model="form.cpf"
            type="text"
            mask="###.###.###-##"
            label="CPF"
            outlined
            lazy-rules
            :rules="[
              val => (val && val.length) || 'Por favor, informe o CPF.',
              val => (val && val.length >= 11) || 'Por favor, informe um CPF válido.',
            ]"
          />
        </div>

        <div class="col-12 col-md-6">
          <InputDate
            v-model="form.birth_date"
            label="Data de Nascimento"
            :rules="[
              val => (val && val.length === 10) || 'Por favor, informe a data de nascimento.',
              val => (val && val !== getTodayLocaleDate())
                || 'Por favor, a data de nascimento deve ser diferente da data atual.',
            ]"
            :disable="!!form.birth_date"
          />
        </div>
      </div>

      <div class="row q-mb-md q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <q-input
            v-model="form.phone"
            type="text"
            label="Celular"
            class="q-mb-md"
            outlined
            lazy-rules
            mask="(##) ##### - ####"
            hint="Formato: (12) 91234 - 5678"
            :rules="[
              val => (val && val.length > 0) || 'Por favor, informe o celular.',
              val => (val && val.length > 16) || 'Por favor, informe um número de celular válido.',
            ]"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-select
            v-model="specialty"
            label="Especialidade Principal"
            :options="form.specialties"
            outlined
            stack-label
            lazy-rules
            option-label="value"
            option-value="value"
            multiple
            emit-value
            :rules="[
              val => (val && val.length > 0) || 'Por favor, informe uma Especialidade.'
            ]"
          />
        </div>
      </div>

      <div>
        <q-btn
          label="Cancelar"
          type="reset"
          color="negative"
          class="q-mr-md"
          outline
        />
        <q-btn
          label="Salvar"
          type="submit"
          color="positive"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
} from 'vue';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import useNotify from '@/composables/useNotify';
import useSupabaseApi from '@/composables/useSupabaseApi';
import useIntegration from '@/composables/useIntegration';
import { useUserStore } from '@/stores/user';
import { getLocaleDateFormatted, getTodayLocaleDate } from '@/utils/dateUtils';
import { specialties } from '@/static/specialties';
import InputDate from '@/components/InputDate';

export default defineComponent({
  name: 'MemedPage',

  components: {
    InputDate,
  },

  setup() {
    const $q = useQuasar();
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    const { notifyError } = useNotify();
    const { update } = useSupabaseApi();
    const { memedDoctorGet, memedDoctorRegister, memedDoctorUpdate } = useIntegration();

    const form = ref({
      status_memed: 'inactive',
      crm: '',
      cpf: '',
      city: '',
      state: '',
      birthDate: getTodayLocaleDate(),
    });
    const specialty = ref(null);

    const name = computed(() => userStore.getUserName);
    const surname = computed(() => userStore.getUserSurName);
    const getUserState = computed(() => userStore.getUserStateAbbr);

    const handleSendDataToMemed = async () => {
      $q.loading.show();

      try {
        let data = null;

        if (form.value.memed.external_id) {
          data = await memedDoctorUpdate(form.value);
        } else {
          data = await memedDoctorRegister(form.value);
        }

        console.log(data);
      } catch (error) {
        notifyError(error.message);
      } finally {
        $q.loading.hide();
      }
    };

    const getMemedData = async () => {
      $q.loading.show();

      try {
        const data = await memedDoctorGet(user.value.doctor_id);
        if (!data) {
          form.value.memed.external_id = null;
          return;
        }

        form.value.cpf = data.cpf;
        specialty.value = specialties.find((_specialty) => (
          _specialty.id === Number(data.especialidade.data.id)
        ));
      } catch (error) {
        notifyError(error.message);
      } finally {
        $q.loading.hide();
      }
    };

    const onSubmit = async () => {
      $q.loading.show();

      try {
        await handleSendDataToMemed();

        await update('doctors', {
          id: form.value.doctor_id,
          status_memed: form.value.status_memed,
        });
      } catch (error) {
        notifyError(error.message);
      } finally {
        $q.loading.hide();
      }
    };

    onMounted(() => {
      if (user.value) {
        form.value = structuredClone(user.value);
        form.value.birth_date = getLocaleDateFormatted(user.value.birth_date);

        getMemedData();
      }
    });

    watch(user, (_user) => {
      if (_user) {
        form.value = structuredClone(user.value);
        form.value.birth_date = getLocaleDateFormatted(user.value.birth_date);
        getMemedData();
      }
    });

    watch(
      [name, surname, getUserState, specialty],
      ([_name, _surname, _state, _selectedSpecialty]) => {
        form.value._name = _name;
        form.value._surname = _surname;
        form.value._state = _state;
        form.value._specialty = specialties.find((_specialty) => (
          _specialty.value === _selectedSpecialty
        ));
      },
    );

    return {
      form,
      specialty,
      onSubmit,
    };
  },
});
</script>

<style scoped>
</style>
