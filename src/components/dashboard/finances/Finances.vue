<template>
  <section id="finance" class="q-pb-md">
    <FinanceCard title="Entradas" icon="mdi-arrow-up-circle" :amount="incomes" />
    <FinanceCard title="Saídas" icon="mdi-arrow-down-circle" :amount="expenses" />
    <FinanceCard
      title="Total"
      icon="total"
      :addClass="['total', `${ total > 0 && 'positive' || total < 0 && 'negative' || ''}`]"
      :amount="total"
    />
  </section>
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue';
import { useFinancesStore } from '@/stores/finances';
import FinanceCard from './FinanceCard.vue';

export default defineComponent({
  name: 'FinancesDashboard',

  components: { FinanceCard },

  setup() {
    const store = useFinancesStore();
    const fetchFinances = () => store.fetchFinances();
    const incomes = computed(() => store.incomes);
    const expenses = computed(() => store.expenses);
    const total = computed(() => store.total);

    onMounted(async () => {
      await fetchFinances();
    });

    return {
      incomes,
      expenses,
      total,
    };
  },
});
</script>

<style scoped>
#finance {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

@media (max-width: 860px) {
  #finance {
    display: flex;
    flex-direction: column;
  }
}
</style>
