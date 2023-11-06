<template>
  <h6 class="q-mb-md">Listagem dos Atendimentos</h6>

  <q-card class="bg-grey-8 text-white">
    <q-card-section class="bg-grey-9 flex items-center q-pb-sm">
      <p class="text-h6 text-bold q-mr-md"> Dr(a) Fulana de Tal</p>
      <p class="q-mr-md">Início: <b>10/11/2022 21:49</b></p>
      <p>Fim: <b>10/11/2022 21:49</b></p>
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
  name: 'TreatmentsForm',
});
</script>
