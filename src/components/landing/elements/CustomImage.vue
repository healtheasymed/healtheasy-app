<template>
  <div class="custom-img">
    <div class="custom-bg" :style="{ backgroundColor: bgColor }"></div>
    <img :src="require(`@/assets/${imageName}.png`)" :alt="imageAlt" />
  </div>
</template>

<script>
export default {
  name: 'CustomImage',

  props: {
    bgColor: {
      default: '',
      required: true,
      type: String,
    },

    imageName: {
      default: '',
      required: true,
      type: String,
    },

    imageAlt: {
      default: '',
      required: false,
      type: String,
    },
  },
};
</script>

<style scoped>
.custom-img {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.custom-bg {
  background: var(--dark-purple);
  border-radius: 16px;
  height: 60vh;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  width: 60%;
  z-index: 1;
}

img {
  height: auto;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  z-index: 2;
}

@media (max-width: 768px) {
  .custom-bg {
    height: 70%;
    width: 80%;
  }
}
</style>
