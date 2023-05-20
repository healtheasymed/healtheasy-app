<template>
  <DynamicTable
    flat
    hide-header
    custom-actions
    :rowsData="getOpennedInvoices"
    :colsData="dueAndOpennedColumns"
    :isLoading="isLoading"
    :customSlots="['total', 'due_date', 'useful_date']"
  >
    <template v-slot:body-cell-total="{ item }">
      <q-td :props="item">
        R$ {{ formatStripeCurrency(item.row.total) }}
      </q-td>
    </template>

    <template v-slot:body-cell-due_date="{ item }">
      <q-td :props="item">
        <q-chip
          class="text-white"
          color="info"
        >
          {{ getLocaleDate(Number(item.row.due_date)) }}
        </q-chip>
      </q-td>
    </template>

    <template v-slot:body-cell-useful_date="{ item }">
      <q-td :props="item">
        {{`
          ${getLocaleDate(item.row.date_start)}
          -
          ${getLocaleDate(item.row.date_end)}
        `}}
      </q-td>
    </template>

    <template v-slot:custom-actions="{ item }">
      <q-btn
        color="positive"
        icon="mdi-cash"
        outline
        size="sm"
        :href="item.row.invoice_url"
        target="_blank"
      >
        <q-tooltip anchor="top middle" self="center middle">
          Pagar Fatura
        </q-tooltip>
      </q-btn>
    </template>
  </DynamicTable>
</template>

<script>
import {
  computed,
  defineComponent,
} from 'vue';
import { storeToRefs } from 'pinia';
import { useSubscriptionStore } from '@/stores/subscription';
import { formatStripeCurrency } from '@/utils/currencyUtils';
import { getLocaleDate } from '@/utils/dateUtils';
import { invoiceEnum } from '@/enums/invoiceEnum';
import DynamicTable from '@/components/DynamicTable';

export default defineComponent({
  name: 'OpennedInvoices',

  components: { DynamicTable },

  setup() {
    const store = useSubscriptionStore();
    const {
      isLoading,
      getOpennedInvoices,
    } = storeToRefs(store);

    const dueAndOpennedColumns = computed(() => {
      const cols = structuredClone(invoiceEnum.quasarColumns);
      cols.splice(-2, 0, ...invoiceEnum.quasarOpennedColumns);
      return cols;
    });

    return {
      isLoading,
      getOpennedInvoices,
      dueAndOpennedColumns,
      getLocaleDate,
      formatStripeCurrency,
    };
  },
});
</script>
