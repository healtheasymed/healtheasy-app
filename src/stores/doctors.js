import { defineStore } from 'pinia';
import useSupabaseApi from '@/composables/useSupabaseApi';

const {
  listByIdForArray,
  getById,
  getUser,
  update,
} = useSupabaseApi();

export const useDoctorsStore = defineStore({
  id: 'doctors',

  state: () => ({
    doctors: [],
  }),

  getters: {
    getNumberOfDoctors: (state) => state.doctors.length,
  },

  actions: {
    async fetchDoctors() {
      try {
        this.quasar.loading.show();
        const { id: clinicId } = await getUser();

        const doctors = await listByIdForArray(
          'doctors',
          {
            column: 'clinic_id',
            value: clinicId,
          },
          `
            id,
            profile_id,
            clinic_id,
            plans
          `,
        );

        this.doctors = await Promise.all(doctors.map(async (doctor) => {
          const {
            id,
            ...doctorData
          } = doctor;
          doctorData.doctor_id = id;

          let profile = {};

          if (doctorData.profile_id) {
            profile = await getById('profiles', doctorData.profile_id);
          }

          return Object.assign(profile, doctorData);
        }));
      } catch (error) {
        this.notifyError(error.message);
      }

      this.quasar.loading.hide();
    },

    async removeDoctorFromClinic(id, name, clinic_id) {
      this.dialogConfirm(
        'Remover médico(a)',
        `Você realmente deseja remover o(a) médico(a) <b>${name}</b> da Clínica?`,
        async () => {
          try {
            let newClinicIds = null;
            const { id: userClinicId } = await getUser();

            if (clinic_id) {
              newClinicIds = clinic_id
                .filter((clinic) => clinic !== userClinicId);
            } else {
              newClinicIds = null;
            }

            await update('doctors', { id, clinic_id: newClinicIds });
            this.notifySuccess();
            this.fetchDoctors();
          } catch (error) {
            this.notifyError(error.message);
          }
        },
      );
    },
  },
});
