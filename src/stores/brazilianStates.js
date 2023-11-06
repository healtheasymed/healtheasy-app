import { defineStore } from 'pinia';

export const useBrazilianStatesStore = defineStore({
  id: 'brazilianStates',

  state: () => ({
    states: null,
  }),

  getters: {
    getSelectedState: (state) => (selectedState) => (
      state?.states ? state.states.find(({ nome }) => nome === selectedState) : null
    ),
  },

  actions: {
    async fetchBrazilianStates() {
      try {
        const states = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
          .then((res) => (res.ok ? res.json() : []));

        if (states) {
          this.states = states;
        }
      } catch (error) {
        this.notifyError(error.message);
        this.states = null;
      }
    },
  },
});
