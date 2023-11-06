<template>
  <TotalizerCard
    title="Médicos"
    icon="mdi-doctor"
    :total="total"
  />
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue';
import { useDoctorsStore } from '@/stores/doctors';
import TotalizerCard from './TotalizerCard';

export default defineComponent({
  name: 'TotalDoctorsCard',

  components: { TotalizerCard },

  setup() {
    const store = useDoctorsStore();

    onMounted(() => {
      store.fetchDoctors();
    });

    return {
      total: computed(() => store.getNumberOfDoctors),
    };
  },
});
</script>
