<template>
  <q-page padding>
    <DynamicTable
      labelTitle="Pacientes"
      routeName="form-patient"
      :rowsData="patients"
      :colsData="patientEnum.quasarColumns"
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
            @click="onTreatmentStart(item.key)"
          >
            Iniciar Atendimento
            <q-icon name="mdi-play-outline" />
          </q-btn>

          <q-btn
            color="info"
            icon="mdi-pencil-outline"
            outline
            size="sm"
            @click="onEdit(item.key)"
          >
            <q-tooltip anchor="top middle" self="center middle">
              Visualizar / Editar
            </q-tooltip>
          </q-btn>

          <q-btn
            color="negative"
            icon="mdi-delete-outline"
            size="sm"
            outline
            @click="onDelete(item.key, item.row.name)"
          >
            <q-tooltip anchor="top middle" self="center middle" class="q-mb-sm">
              Excluir
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
import { usePatientsStore } from '@/stores/patients';
import { patientEnum } from '@/enums/patientEnum';
import DynamicTable from '@/components/DynamicTable.vue';

export default defineComponent({
  name: 'ListPage',

  components: { DynamicTable },

  setup() {
    const router = useRouter();
    const store = usePatientsStore();
    const { patients, isLoading } = storeToRefs(store);
    const fetchPatients = () => store.fetchPatients();
    const onDelete = (id, name) => store.deletePatient(id, name);

    const onEdit = (id) => {
      router.push({ name: 'form-patient', params: { id } });
    };

    const onTreatmentStart = (id) => {
      router.push({ name: 'form-treatment', query: { id, role: 'patient' } });
    };

    const sendEmailMessage = (patientName, patientEmail) => {
      const subject = `Contato - Paciente ${patientName}`;
      const message = `Olá, ${patientName}. Tudo bem?`;
      const link = encodeURI(`mailto:${patientEmail}?subject=${subject}&body=${message}`);
      openURL(link);
    };

    const sendWhatsappMessage = (patientName, phoneNumber) => {
      const message = `Olá, ${patientName}. Tudo bem?`;
      const link = encodeURI(`https://api.whatsapp.com/send?phone=55${phoneNumber.replace(/\D/g, '')}&text=${message}`);
      openURL(link);
    };

    onMounted(() => {
      fetchPatients();
    });

    return {
      patientEnum,
      isLoading,
      patients,
      onEdit,
      onTreatmentStart,
      onDelete,
      sendEmailMessage,
      sendWhatsappMessage,
    };
  },
});
</script>
