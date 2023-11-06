<template>
  <DesktopHeaderGroup v-if="!isMobile" />
  <MobileHeaderGroup v-else />
  <HomeSection />
  <SpecialtiesSection />
  <FeaturesSection />
  <AboutOneSection />
  <AboutTwoSection />
  <PlansSection />
  <ContactSection />
  <FooterSection />
</template>

<script>
import {
  defineComponent,
  ref,
  onBeforeMount,
  onMounted,
  onUnmounted,
  computed,
} from 'vue';
import { useRoute } from 'vue-router';
import useNotify from '@/composables/useNotify';
import DesktopHeaderGroup from '@/components/landing/groups/DesktopHeader';
import MobileHeaderGroup from '@/components/landing/groups/MobileHeader';
import HomeSection from '@/components/landing/sections/Home';
import SpecialtiesSection from '@/components/landing/sections/Specialties';
import FeaturesSection from '@/components/landing/sections/Features';
import AboutOneSection from '@/components/landing/sections/AboutOne';
import AboutTwoSection from '@/components/landing/sections/AboutTwo';
import PlansSection from '@/components/landing/sections/Plans';
import ContactSection from '@/components/landing/sections/Contact';
import FooterSection from '@/components/landing/sections/Footer';

export default defineComponent({
  name: 'LandingPage',

  components: {
    DesktopHeaderGroup,
    MobileHeaderGroup,
    HomeSection,
    SpecialtiesSection,
    FeaturesSection,
    AboutOneSection,
    AboutTwoSection,
    PlansSection,
    ContactSection,
    FooterSection,
  },

  setup() {
    const route = useRoute();
    const { unclosebleNotify } = useNotify();

    const isMobile = ref(false);
    const statusType = computed(() => (
      route.query.status
      || route.hash.split('?status=')[1]
    ));

    const checkScreen = () => {
      const windowWidth = document.body.clientWidth;

      if (windowWidth <= 850) {
        isMobile.value = true;
        return;
      }

      isMobile.value = false;
    };

    const showNotify = () => {
      if (statusType.value === 'success') {
        unclosebleNotify('positive', 'Sua assinatura foi realizada com sucesso! Aproveite nosso sistema =)');
        return;
      }

      unclosebleNotify('negative', 'Ocorreu um erro com a assinatura! Tente novamente em alguns instantes, por favor.');
    };

    onBeforeMount(() => {
      window.addEventListener('resize', checkScreen());
    });

    onMounted(() => {
      window.addEventListener('resize', checkScreen);

      if (statusType.value) {
        showNotify();
      }
    });

    onUnmounted(() => {
      window.removeEventListener('resize', checkScreen);
    });

    return {
      isMobile,
    };
  },
});
</script>

<style scoped>
@import "@/css/landing-page.css";
</style>
