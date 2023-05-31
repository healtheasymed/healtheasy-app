<template>
  <q-page>
    <q-form
      class="row justify-center"
      @submit.prevent="onSubmit"
      @reset="onReset"
    >
      <img
        class="col-10 q-mt-md q-mb-xl"
        src="@/assets/logos/logo.png"
        alt="Health Easy"
        width="100%"
      />

      <div class="col-10 q-gutter-y-md">
        <q-input
          v-model="form.name"
          type="text"
          :label="form.role === 'doctor' ? 'Nome Completo' : 'Nome da Clínica'"
          outlined
          lazy-rules
          :rules="[
            val => (val && val.length >= 6) || 'Por favor, informe o nome completo.'
          ]"
        />

        <q-input
          v-model="form.email"
          type="email"
          label="E-mail"
          outlined
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Por favor, informe o e-mail.'
          ]"
        />

        <q-input
          v-model="form.password"
          label="Senha"
          outlined
          lazy-rules
          :type="showPassword ? 'text' : 'password'"
          :rules="[
            val => (val && val.length > 0) || 'Por favor, informe a senha.',
            val => (val && val.length >= 6) || 'A senha deve conter, no mínimo, 6 caracteres.'
          ]"
        >
          <template v-slot:append>
            <q-icon
              color="primary"
              :name="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>

        <q-input
          v-model="confirmPassword"
          label="Confirme a Senha"
          outlined
          lazy-rules
          :type="showConfirmPassword ? 'text' : 'password'"
          :rules="[
            val => (val && val.length > 0) || 'Por favor, informe a confirmação da senha.',
            val => (val && val.length >= 6) || 'A senha deve conter, no mínimo, 6 caracteres.',
            val => (val && val === form.password)
              || 'A senha e a confirmação de senha devem ser iguais.',
          ]"
        >
          <template v-slot:append>
            <q-icon
              color="primary"
              :name="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click="showConfirmPassword = !showConfirmPassword"
            />
          </template>
        </q-input>

        <q-field
          label="Tipo de Cadastro"
          borderless
          dense
          lazy-rules
          reactive-rules
          v-model="form.role"
          :rules="[
            val => (!!val) || 'Por favor, informe o tipo de cadastro.'
          ]"
        >
          <template v-slot:control>
            <q-radio
              v-model="form.role"
              class="q-mt-md col-12"
              checked-icon="task_alt"
              val="doctor"
              label="Médico(a)"
            />

            <q-radio
              v-model="form.role"
              class="col-12"
              checked-icon="task_alt"
              val="clinic"
              label="Clínica"
            />

            <q-radio
              v-model="disabledRadio"
              class="col-12"
              checked-icon="task_alt"
              val="laboratory"
              label="Laboratório"
              disable
            />
          </template>
        </q-field>
        <template v-if="form.role === 'doctor'">
        <q-input
        label="Número de CRM"
        outlined
        v-model="form.crmNumber"
        :rules="[
          val => (val && val.length > 0) || 'Por favor, informe o número de CRM.'
        ]"
      />
        <q-select
        label="Estado de Atuação"
        outlined
        v-model="form.crmState"
        :options="estadoOptions"
        :rules="[
          val => (val && val.length > 0) || 'Por favor, informe o estado de atuação.'
        ]"
        emit-value
        map-options
        option-value="value"
        option-label="label"
      />
        </template>

        <q-btn
          label="Registrar"
          type="submit"
          color="positive"
          class="full-width q-mt-md"
        />

        <q-btn
          label="Limpar"
          type="reset"
          color="negative"
          class="full-width q-mt-md"
          outline
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuthUser from '@/composables/useAuthUser';
import useNotify from '@/composables/useNotify';

export default defineComponent({
  name: 'RegisterPage',

  setup() {
    const estadoOptions = [
      { label: 'Acre', value: 'AC' },
      { label: 'Alagoas', value: 'AL' },
      { label: 'Amapá', value: 'AP' },
      { label: 'Amazonas', value: 'AM' },
      { label: 'Bahia', value: 'BA' },
      { label: 'Ceará', value: 'CE' },
      { label: 'Distrito Federal', value: 'DF' },
      { label: 'Espírito Santo', value: 'ES' },
      { label: 'Goiás', value: 'GO' },
      { label: 'Maranhão', value: 'MA' },
      { label: 'Mato Grosso', value: 'MT' },
      { label: 'Mato Grosso do Sul', value: 'MS' },
      { label: 'Minas Gerais', value: 'MG' },
      { label: 'Pará', value: 'PA' },
      { label: 'Paraíba', value: 'PB' },
      { label: 'Paraná', value: 'PR' },
      { label: 'Pernambuco', value: 'PE' },
      { label: 'Piauí', value: 'PI' },
      { label: 'Rio de Janeiro', value: 'RJ' },
      { label: 'Rio Grande do Norte', value: 'RN' },
      { label: 'Rio Grande do Sul', value: 'RS' },
      { label: 'Rondônia', value: 'RO' },
      { label: 'Roraima', value: 'RR' },
      { label: 'Santa Catarina', value: 'SC' },
      { label: 'São Paulo', value: 'SP' },
      { label: 'Sergipe', value: 'SE' },
      { label: 'Tocantins', value: 'TO' },
    ];
    const router = useRouter();
    const { register } = useAuthUser();
    const { notifySuccess, notifyError } = useNotify();

    const form = ref({
      name: '',
      email: '',
      password: '',
      role: 'doctor',
    });

    const disabledRadio = ref('');
    const showPassword = ref(false);
    const confirmPassword = ref('');
    const showConfirmPassword = ref(false);

    const onSubmit = async () => {
      try {
        await register(form.value);
        notifySuccess();
        router.push({
          name: 'confirmation',
          query: { email: form.value.email },
        });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const onReset = () => {
      form.value = {
        name: '',
        email: '',
        password: '',
        role: 'doctor',
      };
    };

    return {
      estadoOptions,
      form,
      disabledRadio,
      showPassword,
      confirmPassword,
      showConfirmPassword,
      onSubmit,
      onReset,
    };
  },
});
</script>