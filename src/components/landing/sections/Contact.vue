<template>
  <section class="contact">
    <a class="invisible-anchor" id="contato"></a>
    <div class="content grid">
      <header class="title">
        <h2>Entre em <span>contato</span></h2>
        <p>
         Para entrar em contato conosco, basta preencher o <b>formulário</b>
         na aba "Contato" ou por meio do número <b>(85) 4042-6250</b>.
        </p>
        <div class="social-media">
          <SocialButton
            v-for="site in sites"
            :key="site.id"
            :iconName="site.icone"
            :link="site.link"
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
