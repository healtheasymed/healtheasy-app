<template>
  <q-card>
    <q-card-section class="flex items-center justify-between">
      <div class="text-h4">Total de {{ title }}</div>
      <q-icon :name="icon" :color="iconColor" />
    </q-card-section>
    <q-card-section class="text-h5">
      {{ total }}
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TotalizerCard',

  props: {
    title: {
      default: '',
      required: true,
      type: String,
    },

    icon: {
      default: '',
      required: true,
      type: String,
    },

    iconColor: {
      default: '',
      required: false,
      type: String,
    },

    total: {
      default: 0,
      required: true,
      type: Number,
    },
  },
});
</script>

<style scoped>
.q-card i {
  font-size: 2rem;
  line-height: 3rem;
}
</style>
