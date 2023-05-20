import { ref } from 'vue';
import useAuthUser from '@/composables/useAuthUser';
import { mountObjFormWithTableColumns } from '@/utils/formUtils';

const { userAuthRole } = useAuthUser();

export const profileEnum = {
  profileColumns: ['id', 'name', 'email', 'avatar_url', 'phone', 'stripe_customer', 'status'],
  doctor: {
    table: 'doctors',
    columns: ['crm', 'state', 'sex', 'birth_date', 'specialties', 'plans', 'clinic_id'],
  },
};

const concatTablesColumns = profileEnum[userAuthRole]?.columns
  ? profileEnum.profileColumns.concat(profileEnum[userAuthRole].columns)
  : profileEnum.profileColumns;

export const profileEnumForm = ref(mountObjFormWithTableColumns(concatTablesColumns));
