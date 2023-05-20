<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary text-white">
        <q-btn
          class="q-mr-sm"
          icon="mdi-arrow-left"
          flat
          round
          dense
          :to="{ name: pageName === 'Login' ? 'landing' : 'login' }"
        />

        <q-separator dark vertical inset />

        <q-avatar class="q-ml-sm" size="md">
          <img src="@/assets/logos/icon-white.png">
        </q-avatar>

        <q-toolbar-title>{{ pageName }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view padding class="row items-center justify-center login-layout" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginLayout',

  setup() {
    const router = useRouter();
    const pageName = computed(() => router.currentRoute.value.meta.title);

    return {
      pageName,
    };
  },
});
</script>

<style>
.login-layout > .q-form {
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin: 0 auto;
  padding: 20px 0;
  width: 360px;
}
</style>
