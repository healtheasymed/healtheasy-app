<template>
  <q-page padding>
    <Finances />

    <div class="row q-col-gutter-sm" v-if="userAuthRole === 'doctor'">
      <div class="col-6">
        <TotalPatientsCard />
      </div>
      <div class="col-6">
        <TotalTreatmentsCard />
      </div>
    </div>

    <template v-if="userAuthRole === 'clinic'">
      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <TotalPatientsCard />
        </div>
        <div class="col-6">
          <TotalDoctorsCard />
        </div>
      </div>

      <div class="row q-col-gutter-sm q-my-sm">
        <div class="col-6">
          <TotalTreatmentsCard />
        </div>
      </div>
    </template>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import useAuthUser from '@/composables/useAuthUser';
import Finances from '@/components/dashboard/finances/Finances.vue';
import TotalPatientsCard from '@/components/dashboard/TotalPatientsCard.vue';
import TotalDoctorsCard from '@/components/dashboard/TotalDoctorsCard.vue';
import TotalTreatmentsCard from '@/components/dashboard/TotalTreatmentsCard.vue';

export default defineComponent({
  name: 'DashboardPage',

  components: {
    Finances,
    TotalDoctorsCard,
    TotalPatientsCard,
    TotalTreatmentsCard,
  },

  setup() {
    const { userAuthRole } = useAuthUser();

    return {
      userAuthRole,
    };
  },
});
</script>
