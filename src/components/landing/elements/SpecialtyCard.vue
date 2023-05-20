<template>
  <div class="specialty-card" v-show="specialty">
    <!-- <span class="mdi mdi-hammer-screwdriver" style="fontsize: 50px" /> -->
    <h5>{{ specialty.name }}</h5>
    <p>{{ specialty.description }}</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SpecialtyCard',

  props: {
    specialty: {
      default: () => ({}),
      required: true,
      type: Object,
    },
  },
});
</script>

<style scoped>
.specialty-card {
  background: var(--light-green);
  border-radius: 8px;
  font-size: 1.4rem;

  align-items: center;
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: center;
  padding: 0 20px;
  width: 100%;
}

.specialty-card .mdi {
  color: var(--dark-purple);

  display: block;
  max-width: 100%;
  transition: all 0.2s ease-in-out;
}

.specialty-card .mdi:hover {
  transform: scale(1.1);
}

.specialty-card h5 {
  color: var(--dark-blue);
  margin: 10px 0;
}

.specialty-card p {
  color: var(--gray);
  text-align: center;
}
</style>
