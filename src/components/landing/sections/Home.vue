<template>
  <section class="home">
    <a class="invisible-anchor" id="inicio"></a>

    <div class="content grid">
      <div class="section-left">
        <h1>Sistema para clínicas e consultórios médicos</h1>

        <p>
          Somos especializados em fornecer software de gestão para clínicas e
          consultórios médicos. Nossa solução de gestão de clínicas foi
          projetada para facilitar a vida dos médicos e suas equipes, melhorando
          a eficiência e a qualidade do atendimento ao paciente.
        </p>

        <CustomButton
          text="Entrar em contato"
          :height="50"
          :width="200"
          :link="{ name: 'landing', hash: '#contato' }"
        />
      </div>

      <div class="section-right">
        <!-- TODO: trocar imagem -->
        <img src="@/assets/mockup-1.png" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import CustomButton from '@/components/landing/elements/CustomButton';

export default defineComponent({
  name: 'HomeSection',

  components: {
    CustomButton,
  },
});
</script>

<style scoped>
.content {
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  min-height: 75vh;
}

.section-left {
  justify-content: center;
}

.section-left h1 {
  color: var(--dark-blue);
  font-size: 3rem;
}

.section-left p {
  font-size: 1.2rem;
}
</style>
