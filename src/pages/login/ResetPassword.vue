<template>
  <q-page>
    <q-form class="row justify-center" @submit.prevent="onSubmit">
      <img
        class="col-10 q-mt-md q-mb-xl"
        src="@/assets/logos/logo.png"
        alt="Health Easy"
        width="100%"
      />

      <div class="col-10 q-gutter-y-md">
        <q-input
          v-model="password"
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
            val => (val && val === password)
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

        <q-btn
          label="Salvar"
          type="submit"
          color="positive"
          class="full-width q-mt-md"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useAuthUser from '@/composables/useAuthUser';
import useNotify from '@/composables/useNotify';

export default defineComponent({
  name: 'ResetPasswordPage',

  setup() {
    const { resetPassword } = useAuthUser();
    const { notifySuccess, notifyError } = useNotify();

    const route = useRoute();
    const router = useRouter();
    const { token } = route.query;

    const password = ref('');
    const confirmPassword = ref('');
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);

    const onSubmit = async () => {
      try {
        await resetPassword(token, password.value);
        notifySuccess();
        router.push({ name: 'login' });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      password,
      confirmPassword,
      showPassword,
      showConfirmPassword,
      onSubmit,
    };
  },
});
</script>
