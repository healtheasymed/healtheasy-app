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
      class="text-primary bg-white rounded-borders"
    >
      <q-tab
        name="due-invoices"
        icon="mdi-credit-card-remove-outline"
        label="Faturas Vencidas"
      >
        <q-badge
          v-if="getDueInvoices.length"
          color="red"
          floating
          rounded
          :label="getDueInvoices.length"
        />
      </q-tab>
      <q-tab
        name="openned-invoices"
        icon="mdi-credit-card-clock-outline"
        label="Faturas à Vencer"
      />
      <q-tab
        name="paid-invoices"
        icon="mdi-credit-card-check-outline"
        label="Faturas Pagas"
      />
      <q-tab
        name="keys-management"
        icon="mdi-key"
        label="Gerenciar Chaves"
      />
    </q-tabs>

    <q-tab-panels v-model="tab" animated keep-alive>
      <q-tab-panel name="due-invoices">
        <DueInvoices />
      </q-tab-panel>

      <q-tab-panel name="openned-invoices">
        <OpennedInvoices />
      </q-tab-panel>

      <q-tab-panel name="paid-invoices">
        <PaidInvoices />
      </q-tab-panel>

      <q-tab-panel name="keys-management">
        <KeyManagement @goToDueTab="tab = 'due-invoices'" />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
} from 'vue';
import { storeToRefs } from 'pinia';
import { useSubscriptionStore } from '@/stores/subscription';
import DueInvoices from './tabs/DueInvoices';
import OpennedInvoices from './tabs/OpennedInvoices';
import PaidInvoices from './tabs/PaidInvoices';
import KeyManagement from './tabs/KeyManagement';

export default defineComponent({
  name: 'ListPage',

  components: {
    DueInvoices,
    OpennedInvoices,
    PaidInvoices,
    KeyManagement,
  },

  setup() {
    const store = useSubscriptionStore();
    const { getDueInvoices } = storeToRefs(store);
    const fetchProfile = () => store.fetchProfile();
    const fetchInvoices = () => store.fetchInvoices();
    const setLastPaidInvoice = () => store.setLastPaidInvoice();

    const tab = ref('due-invoices');

    onMounted(async () => {
      await fetchProfile();
      await fetchInvoices();
      setLastPaidInvoice();
    });

    return {
      tab,
      getDueInvoices,
    };
  },
});
</script>

<style scoped>
.q-page-container {
  height: 100vh;
}

.q-page {
  height: 100%;
}

.q-tab-panels {
  height: calc(100% - 48px);
}
</style>
