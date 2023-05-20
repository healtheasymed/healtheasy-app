<template>
  <div
    :class="width === 140 && 'default-width'"
    :style="{
      backgroundColor: bgColor,
      height: height + 'px',
      width: width + 'px',
    }"
  >
    <h3
      :style="{
        color: titleColor
      }"
    >
      {{ title }}
    </h3>
    <p>{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: 'CustomChip',

  props: {
    title: {
      default: '',
      required: true,
      type: String,
    },

    subtitle: {
      default: '',
      required: true,
      type: String,
    },

    bgColor: {
      default: 'var(--light-green)',
      type: String,
    },

    titleColor: {
      default: 'var(--dark-blue)',
      type: String,
    },

    height: {
      default: 40,
      type: Number,
    },

    width: {
      default: 140,
      type: Number,
    },
  },
};
</script>

<style scoped>
div {
  border: none;
  border-radius: 4px;

  align-items: center;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s ease-in-out;
}

div:hover {
  cursor: default;
  opacity: 0.8;
}

div p {
  color: var(--primary-text) !important;
  font-weight: 600;
}
</style>
