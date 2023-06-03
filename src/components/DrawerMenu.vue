<template>
  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    bordered
  >
    <q-list>
      <q-item-label header>Menu</q-item-label>

      <EssentialLink
        v-for="item in menu"
        :key="item.title"
        :disable="disable"
        v-bind="item"
      />
    </q-list>
  </q-drawer>
</template>

<script>
import { defineComponent, ref } from 'vue';
import EssentialLink from './EssentialLink.vue';

export default defineComponent({
  name: 'DrawerMenu',

  components: {
    EssentialLink,
  },

  props: {
    menu: {
      default: () => ({}),
      required: true,
      type: Object,
    },

    disable: {
      default: false,
      required: true,
      type: Boolean,
    },
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
    };
  },
});
</script>
