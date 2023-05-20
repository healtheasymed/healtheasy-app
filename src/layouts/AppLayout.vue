<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <AppToolbar
        :menu="menu"
        @toggleLeftDrawer="handleToggleLeftDrawer"
      />
    </q-header>

    <DrawerMenu
      ref="drawerMenuRef"
      v-if="menu"
      :menu="menu"
    />

    <q-page-container>
      <router-view v-slot="{ Component }" class="app-layout">
        <transition
          appear
          enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOutDown"
        >
          <component v-if="Component" :is="Component" />
          <Dashboard v-else />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
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

    const handleToggleLeftDrawer = () => {
      drawerMenuRef.value.leftDrawerOpen = !drawerMenuRef.value.leftDrawerOpen;
    };

    const getMenuItems = () => {
      if (userAuthRole) {
        menu.value = mainMenu[userAuthRole] || [];
      }
    };

    onMounted(async () => {
      getMenuItems();
      await fetchUser();
    });

    return {
      menu,
      drawerMenuRef,
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
