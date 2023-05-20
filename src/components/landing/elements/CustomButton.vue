<template>
  <button
    v-if="type"
    :type="type"
    @click="$emit('click')"
    :style="{
      backgroundColor: bgColor,
      height: height + 'px',
      width: width + 'px',
    }"
  >
    {{ text }}
  </button>

  <router-link
    v-else
    :to="link"
    :style="{
      backgroundColor: bgColor,
      height: height + 'px',
      width: width + 'px',
    }"
    @click="$emit('click')"
  >
    {{ text }}
  </router-link>
</template>

<script>
export default {
  name: 'CustomButton',

  props: {
    text: {
      default: '',
      required: true,
      type: String,
    },

    link: {
      default: () => ({ hash: '#' }),
      required: false,
      type: Object,
    },

    type: {
      default: '',
      required: false,
      type: String,
    },

    bgColor: {
      default: 'var(--dark-purple)',
      required: false,
      type: String,
    },

    height: {
      default: 40,
      required: false,
      type: Number,
    },

    width: {
      default: 140,
      required: false,
      type: Number,
    },
  },
};
</script>

<style scoped>
a,
button {
  border: none;
  border-radius: 4px;
  color: var(--white) !important;

  align-items: center;
  display: inline-flex;
  justify-content: center;
  transition: all 0.2s ease-in-out;
}

a:hover,
button:hover {
  opacity: 0.8;
}

@media (max-width: 615px) {
  a,
  button {
    max-width: 260px !important;
  }
}
</style>
