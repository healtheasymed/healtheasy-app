import { defineStore } from 'pinia';
import useSupabaseApi from '@/composables/useSupabaseApi';
import useIntegration from '@/composables/useIntegration';
import { useBrazilianStatesStore } from '@/stores/brazilianStates';

const { getUser, updateUser } = useSupabaseApi();
const { memedDoctorUpdate } = useIntegration();

export const useUserStore = defineStore({
  id: 'user',

  state: () => ({
    user: null,
    memedToken: null,
  }),

  getters: {
    getUserId: (state) => state.user?.id,
    getUserRole: (state) => state.user?.role,
    getUserFullName: (state) => state.user?.name,
    getUserName: (state) => state.user?.name.split(' ')[0],
    getUserSurName: (state) => state.user?.name.slice(state.user.name.indexOf(' ') + 1),
    getUserStateAbbr: (state) => (
      state.user?.state ? useBrazilianStatesStore().getSelectedState(state.user.state).sigla : null
    ),
  },

  actions: {
    async fetchUser() {
      try {
        this.quasar.loading.show();
        const user = await getUser();

        if (user) {
          this.user = user;
        }
      } catch (error) {
        this.notifyError(error.message);
        this.user = null;
      }
      this.quasar.loading.hide();
    },

    async updateUser(form) {
      try {
        this.quasar.loading.show();
        const user = await updateUser(form);

        if (!user) return;

        this.user = user;
        if (user.status_memed === 'active') {
          await memedDoctorUpdate(form);
        }
      } catch (error) {
        this.notifyError(error.message);
        this.user = null;
      }
      this.quasar.loading.hide();
    },
  },
});
