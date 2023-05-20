<template>
  <div id="specialties-box">
    <template v-for="specialty in specialties" :key="specialty.id">
      <SpecialtyCard :specialty="specialty" />
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { specialties } from '@/static/landing-page';
import SpecialtyCard from '@/components/landing/elements/SpecialtyCard';

export default defineComponent({
  name: 'SpecialtiesBox',

  components: {
    SpecialtyCard,
  },

  data() {
    return {
      specialties,
    };
  },
});
</script>

<style scoped>
#specialties-box {
  background: var(--white);
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(41, 41, 42, 0.07);
  position: relative;
  top: -20vh;

  display: grid;
  gap: 40px;
  grid-template-columns: repeat(4, 1fr);
  margin-inline: auto;
  max-width: 1200px;
  padding: 40px;
  place-content: center;
  place-items: center;
  row-gap: 20px;
}

@media (max-width: 1024px) {
  #specialties-box {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  #specialties-box {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 668px) {
  #specialties-box {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (max-width: 500px) {
  #specialties-box {
    top: -10vh;
  }
}
</style>
