<template>
  <q-page padding>
    <DynamicTable
      labelTitle="Médicos"
      routeName="form-doctor"
      :rowsData="doctors"
      :colsData="doctorEnum.quasarColumns"
      :isLoading="isLoading"
      :customSlots="['name', 'plans', 'contacts', 'actions']"
    >
      <template v-slot:body-cell-name="{ item }">
        <q-td :props="item">
          <span v-if="item.row.social_name">
            {{ item.row.social_name }}
          </span>
          <span v-else>
            {{ item.row.name }}
          </span>
        </q-td>
      </template>

      <template v-slot:body-cell-plans="{ item }">
        <q-td :props="item">
          <q-chip
            v-for="(plan, index) in item.row.plans"
            :key="index"
          >
            {{ plan }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-contacts="{ item }">
        <q-td :props="item" class="q-gutter-x-sm">
          <q-btn
            v-if="item.row.email"
            icon="mdi-email"
            outline
            size="sm"
            @click="sendEmailMessage(item.row.name, item.row.email)"
          >
            <q-tooltip anchor="top middle" self="center middle">
              E-mail
            </q-tooltip>
          </q-btn>

          <q-btn
            v-if="item.row.phone"
            color="positive"
            icon="mdi-whatsapp"
            outline
            size="sm"
            @click="sendWhatsappMessage(item.row.name, item.row.phone)"
          >
            <q-tooltip anchor="top middle" self="center middle">
              Whatsapp
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="{ item }">
        <q-td :props="item" class="q-gutter-x-sm">
          <q-btn
            color="secondary"
            size="sm"
            outline
            @click="onTreatmentStart(item.row.doctor_id)"
          >
            Iniciar Atendimento
            <q-icon name="mdi-play-outline" />
          </q-btn>

          <q-btn
            color="info"
            icon="mdi-pencil-outline"
            outline
            size="sm"
            @click="onShow(item.key)"
          >
            <q-tooltip anchor="top middle" self="center middle">
              Visualizar
            </q-tooltip>
          </q-btn>

          <q-btn
            color="negative"
            icon="mdi-delete-outline"
            size="sm"
            outline
            @click="onRemoveFromClinic(item.row.doctor_id, item.row.name, item.row.clinic_id)"
          >
            <q-tooltip anchor="top middle" self="center middle" class="q-mb-sm">
              Remover da Clinica
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </DynamicTable>
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { openURL } from 'quasar';
import { storeToRefs } from 'pinia';
import { useDoctorsStore } from '@/stores/doctors';
import { doctorEnum } from '@/enums/doctorEnum';
import DynamicTable from '@/components/DynamicTable.vue';

export default defineComponent({
  name: 'ListPage',

  components: { DynamicTable },

  setup() {
    const router = useRouter();
    const store = useDoctorsStore();
    const { doctors, isLoading } = storeToRefs(store);
    const fetchDoctors = () => store.fetchDoctors();
    const onRemoveFromClinic = (id, name, clinic_id) => (
      store.removeDoctorFromClinic(id, name, clinic_id)
    );

    const onShow = (id) => {
      router.push({ name: 'form-doctor', params: { id } });
    };

    const onTreatmentStart = (id) => {
      router.push({ name: 'form-treatment', query: { id, role: 'doctor' } });
    };

    const sendEmailMessage = (doctorName, doctorEmail) => {
      const subject = `Contato - Médico(a) ${doctorName}`;
      const message = `Olá, ${doctorName}. Tudo bem?`;
      const link = encodeURI(`mailto:${doctorEmail}?subject=${subject}&body=${message}`);
      openURL(link);
    };

    const sendWhatsappMessage = (doctorName, phoneNumber) => {
      const message = `Olá, ${doctorName}. Tudo bem?`;
      const link = encodeURI(`https://api.whatsapp.com/send?phone=55${phoneNumber.replace(/\D/g, '')}&text=${message}`);
      openURL(link);
    };

    onMounted(() => {
      fetchDoctors();
    });

    return {
      doctorEnum,
      isLoading,
      doctors,
      onShow,
      onTreatmentStart,
      onRemoveFromClinic,
      sendEmailMessage,
      sendWhatsappMessage,
    };
  },
});
</script>
