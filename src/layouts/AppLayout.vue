<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <AppToolbar
        :menu="menu"
        :disable="!isUserActive"
        @toggleLeftDrawer="handleToggleLeftDrawer"
      />
    </q-header>

    <DrawerMenu
      ref="drawerMenuRef"
      v-if="menu"
      :menu="menu"
      :disable="!isUserActive"
    />

    <q-page-container>
      <router-view v-slot="{ Component }" class="app-layout" v-if="isUserActive">
        <transition
          appear
          enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOutDown"
        >
          <component v-if="Component" :is="Component" />
          <Dashboard v-else />
        </transition>
      </router-view>

      <q-banner v-else rounded class="text-white bg-negative q-ma-md">
        <template v-slot:default>
          <div class="column items-center">
            <q-icon name="mdi-alert-outline" size="64px" />
            <h6 class="text-center">
              Não foi encontrada uma assinatura ativa para sua conta então não será possível
              utilizar o sistema
            </h6>
            <p class="full-width q-mt-md q-mb-sm">
              Verifique se você possui uma assinatura ou se faz parte de um Grupo
              de Assinantes.
            </p>
            <p class="full-width">
              Qualquer dúvida, entre em contato conosco através do
              <a class="text-white" href="mailto:contato@healtheasy.com.br">
                contato@healtheasy.com.br
              </a>
            </p>
          </div>
        </template>
      </q-banner>
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from 'vue';
import { mainMenu } from '@/static/main-menu';
import useAuthUser from '@/composables/useAuthUser';
import AppToolbar from '@/components/AppToolbar.vue';
import DrawerMenu from '@/components/DrawerMenu.vue';
import Dashboard from '@/pages/app/Dashboard.vue';
import { useUserStore } from '@/stores/user';

export default defineComponent({
  name: 'AppLayout',

  components: {
    DrawerMenu,
    AppToolbar,
    Dashboard,
  },

  setup() {
    const { userAuthRole } = useAuthUser();
    const store = useUserStore();
    const fetchUser = () => store.fetchUser();

    const menu = ref({});
    const drawerMenuRef = ref(null);

    const isUserActive = computed(() => store.getUserStatus === 'active');

    const handleToggleLeftDrawer = () => {
      drawerMenuRef.value.leftDrawerOpen = !drawerMenuRef.value.leftDrawerOpen;
    };

    const getMenuItems = () => {
      if (userAuthRole) {
        menu.value = mainMenu[userAuthRole] || [];
      }
    };

    onMounted(async () => {
      await fetchUser();
      getMenuItems();
    });

    return {
      menu,
      drawerMenuRef,
      isUserActive,
      handleToggleLeftDrawer,
    };
  },
});
</script>

<style>
.app-layout > .q-form {
  background: #FFF;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin: 0 auto;
  padding: 20px;
}
</style>
