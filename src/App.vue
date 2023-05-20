<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useBrazilianStatesStore } from '@/stores/brazilianStates';

export default defineComponent({
  name: 'App',

  setup() {
    const store = useBrazilianStatesStore();
    const fetchBrazilianStates = () => store.fetchBrazilianStates();

    onMounted(async () => {
      // TODO: conferir se todos os papeis precisam disso ou so doctor
      await fetchBrazilianStates();
    });
  },
});
</script>
