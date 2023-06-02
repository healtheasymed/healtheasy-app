import { ref } from 'vue';
import { mountObjFormWithTableColumns } from '@/utils/formUtils';

export const financeModel = {
  table: 'finances',
  columns: ['id', 'name', 'type', 'value', 'date', 'note'],
  quasarColumns: [
    {
      name: 'id',
      label: 'ID',
      field: 'id',
      align: 'center',
      sortable: true,
    },
    {
      name: 'name',
      label: 'Descrição',
      field: 'name',
      align: 'center',
      sortable: true,
    },
    {
      name: 'value',
      label: 'Valor',
      field: 'value',
      align: 'center',
      sortable: true,
    },
    {
      name: 'date',
      label: 'Data de Lançamento',
      field: 'date',
      align: 'center',
      sortable: true,
    },
    {
      name: 'actions',
      label: 'Ações',
      field: 'actions',
      align: 'center',
      sortable: false,
    },
  ],
};

export function getFinanceModelForm() {
  return ref(mountObjFormWithTableColumns(financeModel.columns));
}
