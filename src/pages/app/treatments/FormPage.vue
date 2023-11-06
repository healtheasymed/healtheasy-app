<template>
  <q-page padding>
    <q-form @submit.prevent="onSubmit" @reset="onDiscardChanges">
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          type="reset"
          color="negative"
          padding="sm"
          class="q-mr-sm"
          icon="mdi-cancel"
          fab
          :disable="!formHasChanged"
        >
          <q-tooltip anchor="top middle" self="center middle" :offset="[18, 18]">
            Descartar
          </q-tooltip>
        </q-btn>

        <q-btn
          type="submit"
          color="positive"
          padding="sm"
          icon="mdi-content-save"
          fab
          :disable="!formHasChanged"
        >
          <q-tooltip anchor="top middle" self="center middle" :offset="[18, 18]">
            Registrar
          </q-tooltip>
        </q-btn>
      </q-page-sticky>

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
          name="anamnesis"
          icon="mdi-stethoscope"
          label="Anamnese"
        />

        <q-btn
          class="absolute-right memed-button"
          icon="add"
          label="Receituário"
          @click="$router.push({ name: 'form-treatment' })"
        />
      </q-tabs>

      <q-tab-panels v-model="tab" animated keep-alive>
        <q-tab-panel name="identification">
          <IdentificationForm />
        </q-tab-panel>

        <q-tab-panel name="anamnesis">
          <AnamnesisForm />
        </q-tab-panel>
      </q-tab-panels>
    </q-form>
  </q-page>
</template>

<script>
import {
  defineComponent,
  onUnmounted,
  ref,
} from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useTreatmentsStore } from '@/stores/treatments';
import useDialog from '@/composables/useDialog';
import AnamnesisForm from './tabs/AnamnesisForm';
import IdentificationForm from './tabs/IdentificationForm';

export default defineComponent({
  name: 'FormPage',

  components: {
    AnamnesisForm,
    IdentificationForm,
  },

  setup() {
    const { dialogConfirm } = useDialog();
    const store = useTreatmentsStore();
    const { formHasChanged } = storeToRefs(store);
    const onSubmit = () => store.onSubmit();
    const discardFormChanges = () => store.discardFormChanges();

    const tab = ref('identification');

    onBeforeRouteLeave((to, from, next) => {
      const isChangingPage = from.path !== to.path;

      if (isChangingPage && formHasChanged.value) {
        dialogConfirm('Você realmente deseja sair da página?', 'Ao sair, todas as alterações serão descartadas.', () => {
          next();
        });
        return;
      }

      next();
    });

    const onDiscardChanges = () => {
      dialogConfirm(
        'Você realmente deseja descartar as alterações?',
        'A ação não poderá ser desfeita.',
        () => discardFormChanges(),
      );
    };

    onUnmounted(() => store.$reset());

    return {
      tab,
      formHasChanged,
      onDiscardChanges,
      onSubmit,
    };
  },
});
</script>

<style scoped>
.memed-button {
  background: var(--memed);
  color: white;
}
</style>
