<template>
  <q-input
    class="q-mb-sm"
    outlined
    mask="##/##/####"
    :label="label"
    :model-value="modelValue"
    :disable="disable"
    :rules="rules"
    reactive-rules
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            mask="DD/MM/YYYY"
            :model-value="modelValue"
            @update:model-value="$emit('update:modelValue', $event)"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Fechar" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputDate',

  props: {
    disable: {
      default: false,
      required: false,
      type: Boolean,
    },

    label: {
      default: 'Imagem',
      required: false,
      type: String,
    },

    modelValue: {
      default: '',
      required: false,
      type: String,
    },

    rules: {
      default: () => ([]),
      required: false,
      type: Array,
    },
  },
});
</script>
