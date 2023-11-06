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
            label="Número do CRM"
            outlined
            v-model="form.crm"
            :rules="[
              val => (val && val.length > 0) || 'Por favor, informe o Número do CRM.'
            ]"
          />
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
import { storeToRefs } from 'pinia';
import useAuthUser from '@/composables/useAuthUser';
import useNotify from '@/composables/useNotify';
import { useBrazilianStatesStore } from '@/stores/brazilianStates';

export default defineComponent({
  name: 'RegisterPage',

  setup() {
    const router = useRouter();
    const { register } = useAuthUser();
    const { notifySuccess, notifyError } = useNotify();
    const brazilianStatesStore = useBrazilianStatesStore();

    const { states } = storeToRefs(brazilianStatesStore);

    const form = ref({
      name: '',
      email: '',
      password: '',
      role: 'doctor',
      crm: '',
      state: '',
    });

    const disabledRadio = ref('');
    const showPassword = ref(false);
    const confirmPassword = ref('');
    const showConfirmPassword = ref(false);

    const onSubmit = async () => {
      try {
        /* TODO:
          caso seja médico, o crm e state será salvo no supabase através do
          user_metadata, então, após o usuario confirmar o email
          e fazer o primeiro login, deverá buscar o user_metadata e salvar
          os valores diretamente na tabela doctors
          (alternativa para não precisar mexer no trigger do postgres porque seria
          muito mais complexo)
        */
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
      states,
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
