<template>
  <section id="features">
    <div class="content">
      <header class="title">
        <h2>Funcionalidades</h2>
        <p>
          Na <b>Health Easy</b>, oferecemos diversos recursos e funções para ajudar
          clínicas e consultórios a gerenciar seus processos com eficiência e facilidade.
          Nossas soluções de software de gestão de clínicas e consultórios são projetadas para
          ajudar a otimizar o atendimento ao paciente, melhorar o fluxo de trabalho e simplificar
          tarefas administrativas.
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
