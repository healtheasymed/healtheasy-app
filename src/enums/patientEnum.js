import { ref } from 'vue';
import { mountObjFormWithTableColumns } from '@/utils/formUtils';

export const patientEnum = {
  table: 'patients',
  columns: ['id', 'name', 'social_name', 'sex', 'birth_date', 'address', 'cpf', 'phone', 'email', 'plan', 'plan_number', 'previous_illnesses', 'usual_medications', 'allergies'],
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
      label: 'Nome / Nome Social',
      field: 'name',
      align: 'center',
      sortable: true,
    },
    {
      name: 'plans',
      label: 'Planos',
      field: 'plans',
      align: 'center',
      sortable: false,
    },
    {
      name: 'contacts',
      label: 'Contatos',
      field: 'contacts',
      align: 'center',
      sortable: false,
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

export function getPatientEnumForm() {
  return ref(mountObjFormWithTableColumns(patientEnum.columns));
}
