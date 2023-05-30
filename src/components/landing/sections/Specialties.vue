<template>
  <section id="specialties">
    <div class="content">
      <header class="title">
        <h2>O sistema ideal para</h2>
      </header>
    </div>

    <SpecialtiesBox />
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import SpecialtiesBox from '@/components/landing/blocks/SpecialtiesBox';

export default defineComponent({
  name: 'SpecialtiesSection',

  components: {
    SpecialtiesBox,
  },
});
</script>

<style scoped>
#specialties {
  min-height: 70vh;
}

.content {
  background: var(--light-blue);
  height: 45vh;
  max-width: 100%;
}

.title h2 {
  font-size: 2.4rem;
  margin-bottom: 0;
}

.title p {
  color: var(--dark-blue);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}
</style>
