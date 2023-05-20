<template>
  <TotalizerCard
    title="Atendimentos"
    icon="mdi-stethoscope"
    :total="total"
  />
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue';
import { useTreatmentsStore } from '@/stores/treatments';
import TotalizerCard from './TotalizerCard';

export default defineComponent({
  name: 'TotalTreatmentsCard',

  components: { TotalizerCard },

  setup() {
    const store = useTreatmentsStore();

    onMounted(() => {
      store.fetchTreatments();
    });

    return {
      total: computed(() => store.getNumberOfTreatments),
    };
  },
});
</script>
