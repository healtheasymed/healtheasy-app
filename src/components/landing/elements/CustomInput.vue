<template>
  <label
    class="input"
    :style="{
      border: `2px solid ${color}`,
      color: color,
      height: isTextArea ? 4*height + 'px' : height + 'px',
      width: width + 'px'
    }"
  >
    {{ label }}

    <q-icon
      v-if="iconName"
      :name="iconName"
      :size="iconSize"
    />

    <input
      v-if="!isTextArea"
      :value="value"
      :min="min"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :required="required"
    />

    <textarea
      v-else
      :value="value"
      :name="name"
      :placeholder="placeholder"
      :required="required"
    >
    </textarea>
  </label>
</template>

<script>
export default {
  name: 'CustomInput',

  props: {
    label: {
      default: '',
      required: false,
      type: String,
    },

    name: {
      default: '',
      required: true,
      type: String,
    },

    type: {
      default: 'text',
      required: false,
      type: String,
    },

    required: {
      default: false,
      required: false,
      type: Boolean,
    },

    isTextArea: {
      default: false,
      required: false,
      type: Boolean,
    },

    color: {
      default: 'var(--dark-blue)',
      required: false,
      type: String,
    },

    value: {
      default: '',
      required: false,
      type: String,
    },

    min: {
      default: 0,
      required: false,
      type: Number,
    },

    placeholder: {
      default: '',
      required: true,
      type: String,
    },

    iconName: {
      default: '',
      required: false,
      type: String,
    },

    iconSize: {
      default: '20px',
      required: false,
      type: String,
    },

    height: {
      default: 40,
      required: false,
      type: Number,
    },

    width: {
      default: 300,
      required: false,
      type: Number,
    },
  },
};
</script>

<style scoped>
.input {
  border-radius: 4px;
  position: relative;
}

.mdi {
  left: 4px;
  position: absolute;
  top: 8px;
}

input,
textarea {
  background: transparent;
  border: none;
  border-radius: 4px;

  height: 100%;
  text-indent: 30px;
  transition: all 0.2s ease-in-out;
  width: 100%;
}

textarea {
  padding-top: 5px;
  resize: none;
}

.input:hover {
  opacity: 0.8;
}

@media (max-width: 615px) {
  label {
    max-width: 260px !important;
  }
}
</style>
