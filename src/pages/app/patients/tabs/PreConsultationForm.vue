<template>
  <h6 class="q-mb-md">Pré-Consultas Respondidas</h6>

  <q-card class="bg-teal-8 text-white">
    <q-card-section class="bg-teal-9 flex items-center q-pb-sm">
      <p class="text-h6 text-bold q-mr-md">Nome da Pré-Consulta</p>
      <p class="q-mr-md">Respondido em: <b>10/11/2022 21:49</b></p>
    </q-card-section>

    <q-separator dark />

    <q-card-actions>
      <q-btn dense flat>
        <q-icon name="mdi-eye" class="q-mr-sm" />
        Visualizar
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  name: 'PreConsultationForm',
});
</script>
