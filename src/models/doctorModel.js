import { ref } from 'vue';
import { mountObjFormWithTableColumns } from '@/utils/formUtils';

export const doctorModel = {
  table: 'doctors',
  profileColumns: ['id', 'name', 'phone', 'email'],
  columns: ['id', 'crm', 'state', 'sex', 'birth_date', 'specialties', 'plans', 'clinic_id', 'profile_id', 'status_memed'],
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
      label: 'Nome',
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

export function getProfileModelForm() {
  return ref(mountObjFormWithTableColumns(doctorModel.profileColumns));
}

export function getDoctorModelForm() {
  return ref(mountObjFormWithTableColumns(doctorModel.columns));
}
