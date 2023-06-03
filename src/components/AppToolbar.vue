<template>
  <q-toolbar :class="toolbarClass">
    <q-btn
      v-if="menu"
      flat
      dense
      round
      icon="menu"
      aria-label="Menu"
      @click="$emit('toggleLeftDrawer')"
    />

    <q-toolbar-title v-if="userAuth">
      <b class="text-white">Olá,</b>
      {{ userAuthRole === 'doctor' ? 'Dr(a)' : null }}
      {{ userAuth?.user_metadata?.name }}
    </q-toolbar-title>

    <q-btn-dropdown flat icon="mdi-account-circle-outline">
      <q-list>
        <q-item clickable v-close-popup @click="handleUserProfile">
          <q-item-section class="row items-start">
            <q-item-label class="flex">
              <q-icon name="mdi-account-edit" class="q-mr-sm" />
              <span>Perfil</span>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-if="userAuthRole === 'doctor'"
          clickable
          v-close-popup
          :disable="disable"
          @click="handleUserIntegrations"
        >
          <q-item-section class="row items-start">
            <q-item-label class="flex">
              <q-icon name="mdi-cog-sync" class="q-mr-sm" />
              <span>Integrações</span>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          :disable="disable"
          @click="handleSubscription"
        >
          <q-item-section class="row items-start">
            <q-item-label class="flex">
              <q-icon name="mdi-credit-card" class="q-mr-sm" />
              <span>Assinatura</span>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onLogout">
          <q-item-section class="row items-start">
            <q-item-label class="flex">
              <q-icon name="logout" class="q-mr-sm" />
              <span>Sair</span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </q-toolbar>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import useAuthUser from '@/composables/useAuthUser';
import useDialog from '@/composables/useDialog';
import useNotify from '@/composables/useNotify';

export default defineComponent({
  name: 'AppToolbar',

  emits: ['toggleLeftDrawer'],

  props: {
    menu: {
      default: () => ({}),
      required: true,
      type: Object,
    },

    disable: {
      default: false,
      required: true,
      type: Boolean,
    },
  },

  setup() {
    const router = useRouter();
    const { userAuth, userAuthRole, logout } = useAuthUser();
    const { dialogConfirm } = useDialog();
    const { notifyDefault } = useNotify();

    const toolbarClass = computed(() => {
      if (userAuthRole === 'clinic') {
        return 'bg-secondary';
      }

      if (userAuthRole === 'clinic') {
        return 'bg-primary';
      }

      return 'bg-dark';
    });

    const handleUserProfile = () => {
      router.push({ name: 'profile' });
    };

    const handleUserIntegrations = () => {
      router.push({ name: 'integrations' });
    };

    const handleSubscription = () => {
      router.push({ name: 'subscription' });
    };

    const onLogout = async () => {
      dialogConfirm('Sair', 'Você realmente deseja sair?', async () => {
        await logout();
        notifyDefault('Até breve!');
        router.replace({ name: 'login' });
      });
    };

    return {
      userAuth,
      userAuthRole,
      toolbarClass,
      handleUserProfile,
      handleUserIntegrations,
      handleSubscription,
      onLogout,
    };
  },
});
</script>
