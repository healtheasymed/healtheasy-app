<template>
  <DynamicTable
    flat
    hide-header
    custom-actions
    :rowsData="getPaidInvoices"
    :colsData="paidColumns"
    :isLoading="isLoading"
    :customSlots="['total', 'payment_date', 'useful_date']"
  >
    <template v-slot:body-cell-total="{ item }">
      <q-td :props="item">
        R$ {{ formatStripeCurrency(item.row.total) }}
      </q-td>
    </template>

    <template v-slot:body-cell-payment_date="{ item }">
      <q-td :props="item">
        <q-chip
          class="text-white"
          color="positive"
        >
          {{ getLocaleDate(Number(item.row.payment_date)) }}
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
        color="info"
        icon="mdi-file-download"
        size="sm"
        outline
        :href="item.row.invoice_pdf"
        target="_blank"
      >
        <q-tooltip anchor="top middle" self="center middle" class="q-mb-sm">
          Baixar Recibo
        </q-tooltip>
      </q-btn>

      <q-btn
        color="accent"
        icon="mdi-eye"
        size="sm"
        outline
        :href="item.row.receipt_url"
        target="_blank"
      >
        <q-tooltip anchor="top middle" self="center middle" class="q-mb-sm">
          Ver Recibo
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
  name: 'PaidInvoices',

  components: { DynamicTable },

  setup() {
    const store = useSubscriptionStore();
    const {
      isLoading,
      getPaidInvoices,
    } = storeToRefs(store);

    const paidColumns = computed(() => {
      const cols = structuredClone(invoiceEnum.quasarColumns);
      cols.splice(-2, 0, ...invoiceEnum.quasarPaidColumns);
      return cols;
    });

    return {
      isLoading,
      getPaidInvoices,
      paidColumns,
      getLocaleDate,
      formatStripeCurrency,
    };
  },
});
</script>
