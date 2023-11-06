<template>
  <header>
    <div class="content">
      <nav>
        <ul class="">
          <li class="logo-item">
            <router-link
              :to="{ name: 'landing', hash: '#inicio' }"
              class="logo"
            >
              <img src="@/assets/logos/logo.png" alt="Health Easy" />
            </router-link>
          </li>

          <template v-if="!hideMenuItems">
            <li class="menu-itens" v-for="item in menu" :key="item.id">
              <router-link :to="{ name: 'landing', hash: item.link }">
                {{ item.name }}
              </router-link>
            </li>
          </template>
        </ul>
      </nav>

      <div class="header-buttons">
        <CustomButton
          text="Login"
          :link="{ name: 'login' }"
          :width="$q.platform.is.mobile && '100'"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent } from 'vue';
import { menu } from '@/static/landing-page';
import CustomButton from '@/components/landing/elements/CustomButton';

export default defineComponent({
  name: 'DesktopHeaderGroup',

  components: {
    CustomButton,
  },

  props: {
    hideMenuItems: {
      default: false,
      required: false,
      type: Boolean,
    },
  },

  data() {
    return {
      menu,
    };
  },
});
</script>

<style scoped>
header {
  background: var(--white);
  border-bottom: 1px solid var(--light-gray);
  min-height: 8vh;
  padding: 20px 0;
  position: sticky;
  top: -1px;
  z-index: 999;
}

header.open {
  border-right: 1px solid var(--light-gray);
  height: 100vh;
  padding: 0;
  position: fixed;
  width: 60vw;
}

header:not(.open) {
  padding: 20px 0;
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

.header-buttons {
  display: flex;
  gap: 20px;
}

.menu-button {
  align-self: start;
  cursor: pointer;
  font-size: 1.8rem;
}

@media (max-width: 375px) {
  .content {
    max-width: 100%;
    padding-inline: 20px !important;
  }
}
</style>
