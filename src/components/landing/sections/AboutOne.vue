<template>
  <section class="about-one">
    <a class="invisible-anchor" id="sobre-um"></a>

    <div class="content grid">
      <div class="section-left">
        <header class="title">
          <h2>Impulsione sua eficiência com a Health Easy</h2>

          <p>
            Gerencie pacientes, históricos médicos e exames de forma eficiente.
            Simplifique a administração financeira do seu consultório ou clínica.
            Inovamos constantemente para fornecer as melhores ferramentas e tecnologias.
            Junte-se à nossa comunidade confiável de profissionais de saúde.
            Entre em contato hoje mesmo.
          </p>
        </header>

        <div class="left-chips hidden">
           <CustomChip
            title="+ de 10 milhões"
            subtitle="de atendimentos."
            bgColor="var(--light-purple)"
            titleColor="var(--dark-purple)"
            :height="50"
            :width="200"
          />

          <CustomChip
            title="+ de 10 milhões"
            subtitle="de atendimentos."
            bgColor="var(--light-purple)"
            titleColor="var(--dark-purple)"
            :height="50"
            :width="200"
          />
        </div>
      </div>

      <div class="section-right">
        <CustomImage bgColor="var(--dark-purple)" imageName="mockup-1" />
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import CustomChip from '@/components/landing/elements/CustomChip';
import CustomImage from '@/components/landing/elements/CustomImage';

export default defineComponent({
  name: 'AboutOneSection',

  components: {
    CustomChip,
    CustomImage,
  },
});
</script>

<style scoped>
.sobre-um {
  background: linear-gradient (177deg, var(--light-blue) 10%, var(--white) 90%);
}

.content {
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  min-height: 90vh;
}

.section-left {
  justify-content: center;
  width: 90%;
}

.section-left h2 {
  color: var(--dark-blue);
  font-size: 3rem;
  margin-bottom: 20px;
}

.section-left p {
  font-size: 1.2rem;
}

.left-chips {
  display: flex;
  gap: 40px;
}

.section-right {
  width: 90%;
}

@media (max-width: 668px) {
  .section-left,
  .section-right {
    width: 100%;
  }

  .left-chips {
    flex-direction: column;
    gap: 20px;
    margin-inline: auto;
  }
}
</style>
