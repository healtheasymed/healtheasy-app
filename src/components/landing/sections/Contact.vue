<template>
  <section class="contact">
    <a class="invisible-anchor" id="contato"></a>
    <div class="content grid">
      <header class="title">
        <h2>Entre em <span>contato</span></h2>
        <p>
          Para entrar em contato conosco, basta preencher o <b>formulário</b>
          na aba "Contato" ou por meio do número
          <a href="https://wa.me/558540426250/?text=Olá!%20Estou%20entrando%20em%20contato%20através%20do%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20Health%20Easy.%20"><b>(85) 4042-6250</b></a>.
        </p>

        <div class="social-media">
          <SocialButton
            v-for="site in sites"
            :key="site.id"
            :iconName="site.icon"
            :link="site.link"
            :iconSize="24"
            isColored
          />
        </div>
      </header>

      <ContactForm />
    </div>
  </section>
</template>
<script>
import { defineComponent } from 'vue';
import { sites } from '@/static/landing-page';
import SocialButton from '@/components/landing/elements/SocialButton';
import ContactForm from '@/components/landing/groups/ContactForm';

export default defineComponent({
  name: 'ContactSection',
  components: {
    SocialButton,
    ContactForm,
  },

  data() {
    return {
      sites,
    };
  },
});
</script>

<style scoped>
.contact {
  min-height: 80vh;
  padding: 40px 0;
}

.content {
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  height: 100%;
}

.title {
  text-align: center;
}

.title h2 {
  font-size: 3rem;
  margin-bottom: 30px;
}

.title span {
  color: var(--dark-green);
}

.title p {
  line-height: 1.6;
  margin-bottom: 30px;
  text-align: left;
  width: 80%;
}

.social-media {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-inline: auto;
  max-width: 320px;
}

@media (max-width: 768px) {
  .content.grid {
    gap: 40px;
    grid-template-rows: auto 1fr;
    margin: 0 auto;
    padding: 0 !important;
  }

  .title {
    width: 100%;
  }
}
</style>
