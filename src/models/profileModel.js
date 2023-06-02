import { ref } from 'vue';
import useAuthUser from '@/composables/useAuthUser';
import { mountObjFormWithTableColumns } from '@/utils/formUtils';

const { userAuthRole } = useAuthUser();

export const profileModel = {
  profileColumns: ['id', 'name', 'email', 'avatar_url', 'phone', 'stripe_customer', 'status'],
  doctor: {
    table: 'doctors',
    columns: ['crm', 'state', 'sex', 'birth_date', 'specialties', 'plans', 'clinic_id'],
  },
};

const concatTablesColumns = profileModel[userAuthRole]?.columns
  ? profileModel.profileColumns.concat(profileModel[userAuthRole].columns)
  : profileModel.profileColumns;

export const profileModelForm = ref(mountObjFormWithTableColumns(concatTablesColumns));
