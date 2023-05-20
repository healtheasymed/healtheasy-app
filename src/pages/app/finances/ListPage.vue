<template>
  <q-page padding>
    <Finances />

    <DynamicTable
      labelTitle="Finanças"
      routeName="form-finance"
      :rowsData="finances"
      :colsData="financeEnum.quasarColumns"
      :isLoading="isLoading"
      :customSlots="['value', 'date']"
      @edit="(id) => onEdit(id)"
      @delete="({ key, rowName }) => onDelete(key, rowName)"
    >
      <template v-slot:body-cell-value="{ item }">
        <q-td :props="item">
          <q-chip
            class="text-white"
            :color="`${item.row.type === 'income' ? 'positive' : 'negative'}`"
          >
            R$ {{ item.row.value }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-date="{ item }">
        <q-td :props="item">
          {{ getLocaleDateFormatted(item.row.date) }}
        </q-td>
      </template>
    </DynamicTable>
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useFinancesStore } from '@/stores/finances';
import { financeEnum } from '@/enums/financeEnum';
import { getLocaleDateFormatted } from '@/utils/dateUtils';
import Finances from '@/components/dashboard/finances/Finances.vue';
import DynamicTable from '@/components/DynamicTable.vue';

export default defineComponent({
  name: 'ListPage',

  components: { DynamicTable, Finances },

  setup() {
    const router = useRouter();
    const store = useFinancesStore();
    const { finances, isLoading } = storeToRefs(store);
    const fetchFinances = () => store.fetchFinances();
    const onDelete = (id, name) => store.deleteFinance(id, name);

    const onEdit = (id) => {
      router.push({ name: 'form-finance', params: { id } });
    };

    onMounted(() => {
      fetchFinances();
    });

    return {
      financeEnum,
      isLoading,
      finances,
      onEdit,
      onDelete,
      getLocaleDateFormatted,
    };
  },
});
</script>
