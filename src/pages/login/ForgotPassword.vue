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
          v-model="email"
          type="email"
          label="E-mail"
          outlined
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Por favor, informe o e-mail.'
          ]"
        />

        <q-btn
          label="Recuperar a senha"
          type="submit"
          color="primary"
          class="full-width q-mt-md"
          outline
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import useAuthUser from '@/composables/useAuthUser';
import useNotify from '@/composables/useNotify';

export default defineComponent({
  name: 'ForgotPasswordPage',

  setup() {
    const { sendPasswordResetEmail } = useAuthUser();
    const { notifySuccess, notifyError } = useNotify();

    const email = ref('');

    const onSubmit = async () => {
      try {
        await sendPasswordResetEmail(email.value);
        notifySuccess(
          `O e-mail para resetar a senha foi enviado para: <b>${email.value}</b>`,
        );
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      email,
      onSubmit,
    };
  },
});
</script>
