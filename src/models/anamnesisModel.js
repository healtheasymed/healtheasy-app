import { ref } from 'vue';
import { mountObjFormWithTableColumnsWithCustomValue } from '@/utils/formUtils';

export const anamnesisModel = {
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

export function getAnamnesisModelForm() {
  return ref(mountObjFormWithTableColumnsWithCustomValue(anamnesisModel.columns));
}
