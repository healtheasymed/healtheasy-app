<template>
  <q-page padding>
    <h5>Integrações</h5>

    <q-card class="q-pa-sm q-my-sm memed">
      <q-card-section class="flex col justify-center q-gutter-y-md q-pb-none">
        <q-img
          :src="require('@/assets/icons/logo-memed.svg')"
          spinner-color="primary"
          spinner-size="82px"
        />

        <q-chip class="bg-transparent">
          <q-icon
            name="mdi-circle"
            :color="memedStatus === 'active' ? 'positive' : 'negative'"
            class="status-icon"
            />
          <span class="q-ml-xs text-subtitle1 text-capitalize">
            {{ memedStatus === 'active' ? 'Ativo' : 'Inativo' }}
          </span>
        </q-chip>
      </q-card-section>
      <q-card-actions vertical align="center">
        <q-btn
          outline
          color="primary"
          label="Ver mais"
          @click="$router.push({ name: 'memed' })"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { storeToRefs } from 'pinia';
import { computed, defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';

export default defineComponent({
  name: 'IntegrationsPage',

  setup() {
    const store = useUserStore();
    const { user } = storeToRefs(store);

    const memedStatus = computed(() => user?.value?.status_memed);

    return {
      memedStatus,
    };
  },
});
</script>

<style scoped>
.q-card {
  max-width: 200px;
}

.status-icon {
  font-size: 12px;
}
</style>
