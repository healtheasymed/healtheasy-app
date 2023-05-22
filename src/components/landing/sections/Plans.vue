<template>
  <section class="plans">
    <a class="invisible-anchor" id="planos"></a>

    <div class="content">
      <header class="title">
        <h2>Nossos <span>planos</span></h2>
        <p>
          Na Health Easy, temos planos flexíveis que são adaptados
          às necessidades individuais de cada clínica ou consultório.
          Oferecemos soluções personalizadas e eficazes para atender às suas demandas específicas.
          Caso queira descobrir qual plano é o melhor para você ou sua empresa,
          utilize nossa ferramenta de simulação
          ou entre em contato conosco para saber mais sobre as nossas opções de planos.
          Estamos prontos para ajudá-lo a encontrar a melhor solução
          para a sua clínica ou consultório.
        </p>
      </header>

      <InteractivePricing />
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import InteractivePricing from '@/components/landing/elements/InteractivePricing';

export default defineComponent({
  name: 'PlansSection',

  components: {
    InteractivePricing,
  },
});
</script>

<style scoped>
.plans {
  background: linear-gradient(180deg, var(--light-green) 10%, var(--white) 90%);
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  margin-bottom: 40px;
  text-align: center;
}

.title h2 {
  font-size: 2.6rem;
}

.title span {
  color: var(--dark-blue);
}

.title p {
  width: 60%;
}

@media (max-width: 375px) {
  .content {
    max-width: 320px;
    padding: 0 !important;
  }
}
</style>
