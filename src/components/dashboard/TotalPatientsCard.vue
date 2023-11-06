<template>
  <TotalizerCard
    title="Pacientes"
    icon="mdi-account-group"
    :total="total"
  />
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue';
import { usePatientsStore } from '@/stores/patients';
import TotalizerCard from './TotalizerCard';

export default defineComponent({
  name: 'TotalPatientsCard',

  components: { TotalizerCard },

  setup() {
    const store = usePatientsStore();

    onMounted(() => {
      store.fetchPatients();
    });

    return {
      total: computed(() => store.getNumberOfPatients),
    };
  },
});
</script>
