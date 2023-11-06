import { ref } from 'vue';
import { mountObjFormWithTableColumns } from '@/utils/formUtils';

export const appointmentModel = {
  table: 'appointments',
  columns: ['id', 'name', 'color', 'date_starts', 'date_ends', 'note', 'type'],
  eventColors: [
    {
      label: 'Azul',
      value: 'blue',
    },
    {
      label: 'Amarelo',
      value: 'yellow',
    },
    {
      label: 'Verde',
      value: 'green',
    },
    {
      label: 'Vermelho',
      value: 'red',
    },
  ],
};

export function getAppointmentModelForm() {
  return ref(mountObjFormWithTableColumns(appointmentModel.columns));
}
