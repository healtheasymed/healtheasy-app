import { ref } from 'vue';
import { mountObjFormWithTableColumnsWithCustomValue } from '@/utils/formUtils';

export const anamnesisEnum = {
  table: 'anamnesis',
  columns: [
    {
      column: 'id',
      value: null,
    },
    {
      column: 'exam',
      value: '',
    },
    {
      column: 'medical_plan',
      value: '',
    },
    {
      column: 'cid',
      value: [],
    },
  ],
};

export function getAnamnesisEnumForm() {
  return ref(mountObjFormWithTableColumnsWithCustomValue(anamnesisEnum.columns));
}
