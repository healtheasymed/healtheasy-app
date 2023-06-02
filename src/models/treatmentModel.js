import { ref } from 'vue';
import { mountObjFormWithTableColumns } from '@/utils/formUtils';

export const treatmentModel = {
  table: 'treatments',
  columns: ['id', 'doctor_id', 'patient_id', 'plan', 'date', 'anamnesis_id'],
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
      label: 'Paciente',
      field: 'name',
      align: 'center',
      sortable: true,
    },
    {
      name: 'doctor_name',
      label: 'Médico(a)',
      field: 'doctor_name',
      align: 'center',
      sortable: true,
    },
    {
      name: 'plan',
      label: 'Plano',
      field: 'plan',
      align: 'center',
      sortable: true,
    },
    {
      name: 'date',
      label: 'Data',
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

export function getTreatmentModelForm() {
  return ref(mountObjFormWithTableColumns(treatmentModel.columns));
}
