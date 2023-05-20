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

        <q-btn
          label="Entrar"
          type="submit"
          color="positive"
          class="full-width q-mt-md"
        />

        <div class="flex justify-center">
          <q-btn
            label="Esqueceu a senha?"
            color="primary"
            class="q-mt-md"
            flat
            :to="{ name: 'forgot-password' }"
            size="sm"
          />

          <q-btn
            label="Registre-se"
            color="primary"
            class="q-mt-md"
            flat
            :to="{ name: 'register' }"
            size="sm"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuthUser from '@/composables/useAuthUser';
import useNotify from '@/composables/useNotify';

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const router = useRouter();
    const { login, isLoggedIn } = useAuthUser();
    const { notifySuccess, notifyError } = useNotify();

    const form = ref({
      email: '',
      password: '',
    });

    const showPassword = ref(false);

    onMounted(async () => {
      if (isLoggedIn) {
        // TODO: obter o tipo de usuário e direcionar para o modulo certo
        router.push({ name: 'app' });
      }
    });

    const onSubmit = async () => {
      try {
        await login(form.value);
        notifySuccess();
        // TODO: obter o tipo de usuário e direcionar para o modulo certo
        router.push({ name: 'app' });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      showPassword,
      onSubmit,
    };
  },
});
</script>
