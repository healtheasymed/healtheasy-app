<template>
  <header :class="{ open: isMenuOpen }" @click.self="isMenuOpen = !isMenuOpen">
    <div class="content" :class="{ open: isMenuOpen }">
      <div class="header-top">
        <p @click="isMenuOpen = !isMenuOpen" class="menu-button">
          <span :class="`mdi mdi-${isMenuOpen ? 'close' : 'menu'}`"></span>
        </p>

        <router-link to="/#inicio" class="logo">
          <img src="@/assets/logos/logo.png" alt="Health Easy" />
        </router-link>

        <div class="header-buttons">
          <CustomButton text="Login" :link="{ name: 'login' }" />
        </div>
      </div>

      <nav v-show="isMenuOpen">
        <ul>
          <li class="logo-item"></li>
          <li class="menu-itens" v-for="item in menu" :key="item.id">
            <a :href="item.link">{{ item.name }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { menu } from '@/static/landing-page';
import CustomButton from '@/components/landing/elements/CustomButton';

export default defineComponent({
  name: 'DesktopHeaderGroup',

  components: {
    CustomButton,
  },

  setup() {
    const isMenuOpen = ref(false);

    return {
      menu,
      isMenuOpen,
    };
  },
});
</script>

<style scoped>
header {
  background-color: var(--white);
  border-bottom: 1px solid var(--light-gray);
  min-height: 8vh;
  padding: 20px 0;
  position: sticky;
  top: -1px;
  z-index: 999;
}

header.open {
  background-color: rgba(0, 0, 0, 0.4);
  height: 100vh;
  padding: 0;
  position: fixed;
  width: 100vw;
}

.header-buttons {
  display: flex;
  gap: 20px;
}

.menu-button {
  align-self: start;
  cursor: pointer;
  font-size: 1.8rem;
}

.content {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding: 0;
}

.content nav ul {
  align-items: center;
  display: flex;
  gap: 40px;
}

.logo img {
  width: 200px;
}

.content nav a:not(:hover) {
  color: var(--black);
}

.content nav a:not(.logo) {
  font-size: 1.2rem;
  font-weight: 500;
  position: relative;
}

.content nav li:nth-child(2) a {
  font-weight: 600;
}

.content nav a:before {
  background: var(--dark-blue);
  bottom: 0;
  content: "";
  height: 0;
  left: -10px;
  position: absolute;
  transition: all 0.3s ease-in-out;
  visibility: hidden;
  width: 100%;
}

nav a:hover:not(.logo):before {
  height: 1px;
  left: 0;
  visibility: visible;
}

.content.open {
  background: var(--white);

  align-items: start;
  flex-direction: column;
  margin: 0;
  padding: 20px 0;
  width: 60vw;
}

.open > .header-top {
  flex-direction: column;
  gap: 20px;
}

.header-top {
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.content nav {
  height: 100vh;
  width: 100%;
}

.content nav ul {
  flex-direction: column;
  gap: 40px;
}

@media (max-width: 550px) {
  .content:not(.open) .header-buttons {
    display: none;
  }

  .content:not(open) .header-top {
    justify-content: start;
    gap: 20px;
  }
}

@media (max-width: 425px) {
  .content.open {
    width: 100vw;
  }
}
</style>
