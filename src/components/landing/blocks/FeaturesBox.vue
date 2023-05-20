<template>
  <div id="features-box">
    <template
      v-for="feature in features"
      :key="feature.id"
    >
      <FeatureCard :feature="feature" />
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { features } from '@/static/landing-page';
import FeatureCard from '@/components/landing/elements/FeatureCard';

export default defineComponent({
  name: 'FeaturesBox',

  components: {
    FeatureCard,
  },

  data() {
    return {
      features,
    };
  },
});
</script>

<style scoped>
#features-box {
  align-items: center;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  height: auto;
  margin-inline: auto;
  max-width: 1200px;
  place-content: center;
  place-items: center;
}

@media (max-width: 1024px) {
  #features-box {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  #features-box {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
