<template>
  <a
    :href="link"
    target="_blank"
    :class="`social-button ${iconName} ${isColored ? 'isColored' : 'isDark'}`"
    v-show="iconName"
  >
    <q-icon :name="'mdi-' + iconName" :size="iconSize + 'px'" />
  </a>
</template>

<script>
export default {
  name: 'SocialButton',

  props: {
    link: {
      default: '',
      required: true,
      type: String,
    },

    iconName: {
      default: '',
      required: true,
      type: String,
    },

    iconSize: {
      default: 16,
      type: Number,
    },

    isColored: {
      default: false,
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.social-button {
  border-radius: 50%;

  align-items: center;
  display: inline-flex;
  height: 50px;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  width: 50px;
}

.social-button .mdi {
  color: #FFF;
}

.social-button.isDark {
  background: #23252E;

  height: 30px;
  width: 30px;
}

.social-button:hover {
  opacity: 0.8;
  transform: rotate(-20deg);
}

.facebook.isColored {
  background: #1877F2;
  color: var(--light-blue);
}

.twitter.isColored {
  background: #55ACEE;
  color: var(--light-blue);
}

.linkedin.isColored {
  background: #0077B5;
  color: var(--light-blue);
}

.instagram.isColored {
  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
  color: var(--light-blue);
}

.custom.isColored {
  background: var(--dark-blue);
  color: var(--light-blue);
}
</style>
