<template>
  <div class="feature-card" v-show="feature">
    <span class="mdi mdi-hammer-screwdriver" style="fontsize: 50px" />
    <h5>{{ feature.name }}</h5>
    <p v-html="feature.description"></p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FeatureCard',

  props: {
    feature: {
      default: () => ({}),
      required: true,
      type: Object,
    },
  },
});
</script>

<style scoped>
.feature-card {
  background: var(--white);
  border-radius: 4px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 20px;
  width: 300px;
}

.feature-card .mdi {
  color: var(--dark-purple);

  display: block;
  max-width: 100%;
  transition: all 0.2s ease-in-out;
}

.feature-card .mdi:hover {
  transform: scale(1.1);
}

.feature-card h5 {
  color: var(--dark-blue);
  font-size: 1.4rem;
  margin: 10px 0;
  text-align: center;
}

.feature-card p {
  color: var(--dark-gray);
}
</style>
