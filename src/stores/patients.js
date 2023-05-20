import { defineStore } from 'pinia';
import useSupabaseApi from '@/composables/useSupabaseApi';

const { listByUserId, remove } = useSupabaseApi();

export const usePatientsStore = defineStore({
  id: 'patients',

  state: () => ({
    patients: [],
  }),

  getters: {
    getNumberOfPatients: (state) => state.patients.length,
  },

  actions: {
    async fetchPatients() {
      try {
        this.quasar.loading.show();
        this.patients = await listByUserId('patients');
      } catch (error) {
        this.notifyError(error.message);
      }

      this.quasar.loading.hide();
    },

    async deletePatient(id, name) {
      this.dialogConfirm(
        'Excluir paciente',
        `Você realmente deseja excluir o(a) paciente <b>${name}</b> ?`,
        async () => {
          try {
            await remove('patients', id);
            this.notifySuccess();
            this.fetchPatients();
          } catch (error) {
            this.notifyError(error.message);
          }
        },
      );
    },
  },
});
