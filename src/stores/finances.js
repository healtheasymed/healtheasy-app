import { defineStore } from 'pinia';
import useSupabaseApi from '@/composables/useSupabaseApi';
import { parseStringToNumber } from '@/utils/currencyUtils';

const { listByUserId, remove } = useSupabaseApi();

export const useFinancesStore = defineStore({
  id: 'finances',

  state: () => ({
    finances: [],
    incomes: 0,
    expenses: 0,
    total: 0,
  }),

  actions: {
    setIncomes() {
      this.incomes = 0;
      this.finances.forEach((transaction) => {
        if (transaction.type === 'income') {
          this.incomes += parseStringToNumber(transaction.value);
        }
      });
    },

    setExpenses() {
      this.expenses = 0;
      this.finances.forEach((transaction) => {
        if (transaction.type === 'expense') {
          this.expenses -= parseStringToNumber(transaction.value);
        }
      });
    },

    setTotal() {
      this.total = this.incomes + this.expenses;
    },

    async fetchFinances() {
      try {
        this.quasar.loading.show();
        this.finances = await listByUserId('finances');
      } catch (error) {
        this.notifyError(error.message);
      }

      this.setIncomes();
      this.setExpenses();
      this.setTotal();

      this.quasar.loading.hide();
    },

    async deleteFinance(id, name) {
      this.dialogConfirm(
        'Excluir finança',
        `Você realmente deseja excluir a finança <b>${name}</b> ?`,
        async () => {
          try {
            await remove('finances', id);
            this.notifySuccess();
            this.fetchFinances();
          } catch (error) {
            this.notifyError(error.message);
          }
        },
      );
    },
  },
});
