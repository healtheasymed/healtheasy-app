<template>
  <section id="features">
    <div class="content">
      <header class="title">
        <h2>Funcionalidades</h2>
        <p>
          Lorem ipsum is common placeholder text used to demonstrate the graphic
          elements of a document or visual presentation.
        </p>
      </header>

      <FeaturesBox />
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import FeaturesBox from '@/components/landing/blocks/FeaturesBox';

export default defineComponent({
  name: 'FeaturesSection',

  components: {
    FeaturesBox,
  },
});
</script>

<style scoped>
#features {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 70vh;
  position: relative;
  top: -15vh;
}

.title {
  margin-bottom: 40px;
  text-align: center;
}

.title h2 {
  color: var(--dark-blue);
  font-size: 2.6rem;
}

.title p {
  width: 60%;
}
</style>
