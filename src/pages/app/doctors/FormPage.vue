<template>
  <q-page padding>
    <q-tabs
      v-model="tab"
      inline-label
      outside-arrows
      mobile-arrows
      narrow-indicator
      align="left"
      active-color="primary"
      indicator-color="primary"
      class="text-primary bg-white"
    >
      <q-tab
        name="identification"
        icon="mdi-account-plus"
        label="Identificação"
      />
      <q-tab
        name="treatment"
        icon="mdi-medical-bag"
        label="Atendimentos"
        :disable="!isUpdate"
      />
    </q-tabs>

    <q-tab-panels v-model="tab" animated keep-alive>
      <q-tab-panel name="identification">
        <IdentificationForm />
      </q-tab-panel>

      <q-tab-panel name="treatment">
        <TreatmentsForm />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import IdentificationForm from './tabs/IdentificationForm';
import TreatmentsForm from './tabs/TreatmentsForm';

export default defineComponent({
  name: 'FormPage',

  components: {
    IdentificationForm,
    TreatmentsForm,
  },

  setup() {
    const route = useRoute();

    return {
      tab: ref('identification'),
      isUpdate: computed(() => !!route.params.id),
    };
  },
});
</script>

<style scoped>
:deep(.q-field__marginal) {
  height: auto;
}

:deep(.q-chip__content) {
  text-transform: capitalize;
}

h6 {
  border-bottom: 1px solid var(--dark-blue);
}
</style>
