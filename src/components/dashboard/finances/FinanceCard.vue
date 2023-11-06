<template>
  <q-card :class="`q-pa-sm ${addClass.toString().replace(',',' ')}`">
    <q-card-section class="flex items-center justify-between">
      <div class="text-h4">{{ title }}</div>
      <q-icon :name="icon" :color="`${ title === 'Entradas' ? 'positive' : 'negative' }`" />
    </q-card-section>
    <q-card-section
      class="text-h5"
      :class="{
        'text-positive': title === 'Entradas',
        'text-negative': title === 'Saídas',
      }"
    >
      {{ formattedAmount }}
    </q-card-section>
  </q-card>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { formatCurrency } from '@/utils/currencyUtils';

export default defineComponent({
  name: 'FinanceCard',

  props: {
    title: {
      default: '',
      required: true,
      type: String,
    },

    icon: {
      default: '',
      required: true,
      type: String,
    },

    addClass: {
      default: () => ([]),
      required: false,
      type: Array,
    },

    amount: {
      default: 0,
      required: true,
      type: Number,
    },
  },

  setup(props) {
    return {
      formattedAmount: computed(() => formatCurrency(props.amount)),
    };
  },
});
</script>

<style scoped>
.q-card i {
  font-size: 2rem;
  line-height: 3rem;
}

.q-card.total {
  color: var(--white);
  background: rgba(54, 63, 95, 0.4);
}

.q-card.total.positive {
  background: rgba(81, 189, 79, 0.7);
}

.q-card.total.negative {
  background: rgba(189, 79, 105, 0.7);
}
</style>
