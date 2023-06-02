<template>
  <q-page padding>
    <DynamicTable
      v-if="treatments"
      labelTitle="Atendimentos"
      routeName="form-treatment"
      :rowsData="treatments"
      :colsData="treatmentModel.quasarColumns"
      :isLoading="isLoading"
      @edit="(id) => onEdit(id)"
      @delete="({ key, rowName }) => onDelete(key, rowName)"
    >
      <template v-slot:body-cell-name="{ item }">
        <q-td :props="item">
          <span v-if="item.row.social_name">
            {{ item.row.social_name }}
          </span>
          <span v-else>
            {{ item.row.name }}
          </span>
        </q-td>
      </template>
    </DynamicTable>
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { treatmentModel } from '@/models/treatmentModel';
import { useTreatmentsStore } from '@/stores/treatments';
import DynamicTable from '@/components/DynamicTable';

export default defineComponent({
  name: 'ListPage',

  components: { DynamicTable },

  setup() {
    const router = useRouter();
    const store = useTreatmentsStore();
    const {
      isLoading,
      treatments,
    } = storeToRefs(store);
    const fetchTreatments = () => store.fetchTreatments();
    const onDelete = (id, name) => store.deleteTreatment(id, name);

    const onEdit = (id) => {
      router.push({ name: 'form-treatment', params: { id } });
    };

    onMounted(() => {
      fetchTreatments();
    });

    return {
      treatmentModel,
      isLoading,
      treatments,
      onEdit,
      onDelete,
    };
  },
});
</script>
