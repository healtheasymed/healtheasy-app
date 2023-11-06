import { defineStore } from 'pinia';
// import useSupabaseApi from '@/composables/useSupabaseApi';

// const { listByUserId, remove } = useSupabaseApi();

export const useAppointmentsStore = defineStore({
  id: 'appointments',

  state: () => ({
    selectedViewMode: localStorage.getItem('selectedViewMode'),
    selectedPeriod: localStorage.getItem('selectedPeriod'),
  }),

  getters: {},

  actions: {},
});
