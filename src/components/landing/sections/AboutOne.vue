<template>
  <section class="about-one">
    <a class="invisible-anchor" id="sobre-um"></a>

    <div class="content grid">
      <div class="section-left">
        <header class="title">
          <h2>Agenda médica na palma da mão</h2>

          <p>
            Com a agenda médica online do <b>Health Easy</b>, sua equipe
            controla agendamentos, diminui faltas por meio do envio de SMS e
            e-mail e ganha tempo para realizar o que realmente importa: o
            atendimento ao paciente.
          </p>
          <p>
            Com a agenda médica online do <b>Health Easy</b>, sua equipe
            controla agendamentos.
          </p>
        </header>

        <div class="left-chips">
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
