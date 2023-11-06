<template>
  <h6 class="q-mb-md">Lista de Exames</h6>

  <q-card class="bg-blue-grey-8 text-white">
    <q-card-section class="bg-blue-grey-9 flex items-center q-pb-sm">
      <p class="text-h6 text-bold q-mr-md">Nome do Exame</p>
      <p class="q-mr-md">Pedido: <b>10/11/2022 21:49</b></p>
      <p>Realização: <b>10/11/2022 21:49</b></p>
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
  name: 'ExamForm',
});
</script>
