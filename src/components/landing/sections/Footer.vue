<template>
  <footer>
    <div class="content grid">
      <div class="footer-about">
        <img src="@/assets/logos/logo-white.png" alt="Health Easy - Logomarca" />
        <p>
          HEALTH EASY GESTAO EM SISTEMAS DE SAUDE LTDA
          CNPJ 45.808.183/0001-04
        </p>

        <div class="social-media">
          <SocialButton
            v-for="site in sites"
            :key="site.id"
            :iconName="site.icon"
            :link="site.link"
            :iconSize="16"
          />
        </div>
      </div>

      <div class="footer-services">
        <h5>Serviços</h5>
        <p>
          Transformando a saúde em uma jornada fácil e acessível, a Health Easy oferece
          serviços de qualidade para cuidar do seu bem-estar.
        </p>
      </div>

      <div class="footer-contact">
        <h5>Contato</h5>
        <p class="text-left">
          <q-icon name="mdi-email" size="16px" class="q-mr-sm" />
          <a class="text-white" href="mailto:contato@healtheasy.com.br">
            contato@healtheasy.com.br
          </a>
        </p>
        <p class="text-left">
          <q-icon name="mdi-phone" size="16px" class="q-mr-sm" />
          (85) 4042-6250
        </p>
        <p class="text-left">
          <q-icon name="mdi-map-marker" size="16px" class="q-mr-sm" />
           Avenida Dom Luís, 176 - Mezanino - Fortaleza - Ceará
        </p>
      </div>
    </div>

    <div class="content copyright">
      <p>© 2023 - Health Easy. Todos os direitos reservados.</p>

      <ul>
        <li>
          <router-link :to="{ name: 'termos' }">Termos & Condições</router-link>
        </li>
        <li>|</li>
        <li>
          <router-link :to="{ name: 'privacidade' }">Política de Privacidade</router-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from 'vue';
import { sites } from '@/static/landing-page';
import SocialButton from '@/components/landing/elements/SocialButton';

export default defineComponent({
  name: 'FooterSection',

  components: {
    SocialButton,
  },

  data() {
    return {
      sites,
    };
  },
});
</script>

<style scoped>
footer {
  background: var(--dark-blue);
  min-height: 35vh;
}
</style scoped>

.content {
  color: var(--white);
  align-items: start;
  grid-template-columns: repeat(3, 1fr);
}

.footer-about img {
  margin-bottom: 20px;
  max-width: 200px;
}

.content h5 {
  font-size: 1.4rem;
}

.social-media {
  align-items: center;
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.footer-services,
.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.copyright {
  color: var(--white);
  opacity: 0.8;
}

.copyright {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.copyright span {
  color: var(--dark-green);
}

.copyright ul {
  align-items: center;
  display: flex;
  gap: 10px;
}

.copyright ul a {
  color: var(--dark-green);
  transition: all 0.2s ease-in-out;
}

.footer-contact .mdi,
.copyright ul a:hover {
  color: var(--white) !important;
}

@media (max-width: 768px) {
  .content.grid {
    grid-template-rows: repeat(3, 1fr) !important;
  }

  .footer-contact {
    text-align: start;
  }
}

@media (max-width: 665px) {
  .copyright {
    flex-direction: column-reverse;
    gap: 20px;
    padding: 0 40px 40px !important;
  }
sr