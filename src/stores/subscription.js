import { defineStore } from 'pinia';
import useSupabaseApi from '@/composables/useSupabaseApi';
import { getLocaleDate } from '@/utils/dateUtils';

const { filteredList, getByUserId } = useSupabaseApi();

export const useSubscriptionStore = defineStore({
  id: 'subscription',

  state: () => ({
    profile: null,
    invoices: [],
    lastPaidInvoice: null,
    isLoading: false,
  }),

  getters: {
    getDueInvoices: (state) => state.invoices.filter((invoice) => getLocaleDate(Number(invoice.due_date)) < getLocaleDate(Date.now()) && invoice.status !== 'succeeded' && invoice.status !== 'paid'),
    getOpennedInvoices: (state) => state.invoices.filter((invoice) => getLocaleDate(Number(invoice.due_date)) >= getLocaleDate(Date.now()) && invoice.status !== 'succeeded' && invoice.status !== 'paid'),
    getPaidInvoices: (state) => state.invoices.filter((invoice) => invoice.status === 'succeeded' || invoice.status === 'paid'),
  },

  actions: {
    setLastPaidInvoice() {
      if (!this.invoices.length) {
        return;
      }

      [this.lastPaidInvoice] = this.getPaidInvoices.sort((a, b) => (a.id < b.id ? 1 : -1));
    },

    async fetchInvoices() {
      if (!this.profile?.stripe_customer) {
        return;
      }

      try {
        this.quasar.loading.show();
        this.isLoading = true;

        this.invoices = await filteredList(
          'subscriptions',
          {
            column: 'stripe_customer',
            value: this.profile.stripe_customer,
          },
        );
      } catch (error) {
        this.notifyError(error.message);
      }

      this.quasar.loading.hide();
      this.isLoading = false;
    },

    async fetchProfile() {
      try {
        this.quasar.loading.show();
        this.isLoading = true;
        this.profile = await getByUserId('profiles');
        console.log(this.profile);
      } catch (error) {
        this.notifyError(error.message);
      }

      this.quasar.loading.hide();
      this.isLoading = false;
    },
  },
});
