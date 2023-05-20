<template>
  <div class="row">
    <!-- :grid="$q.platform.is.mobile" -->
    <q-table
      class="full-width"
      :rows="rowsData"
      :columns="colsData"
      :row-key="rowKey"
      :loading="isLoading"
      :filter="filter"
      :dense="$q.screen.lt.md"
      :flat="flat"
      loading-label="Buscando registros..."
    >
      <template v-slot:top v-if="!hideHeader">
        <span class="text-h6">{{ labelTitle }}</span>

        <slot name="top-buttons" />

        <q-space />

        <q-input class="search" dense debounce="300" v-model="filter" placeholder="Pesquisar...">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-space />

        <q-btn
          v-if="$q.platform.is.desktop"
          color="primary"
          icon="mdi-plus"
          label="Adicionar"
          outline
          :to="{ name: routeName }"
        />
      </template>

      <template v-for="slot in customSlots" v-slot:[`body-cell-${slot}`]="item">
        <!--
          Para ser possível personalizar um item do body de uma determinada coluna,
          é necessário passar o nome da coluna como props e, no componente filho, criar um slot
          com o mesmo nome dessa coluna. Ex.: <template v-slot:status="{ item }">
        -->
        <slot :name="`body-cell-${slot}`" :item="item"></slot>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-sm">
          <template v-if="!customActions">
            <q-btn
              color="info"
              icon="mdi-pencil-outline"
              outline
              size="sm"
              @click="$emit('edit', props.key)"
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
              @click="$emit('delete', { key: props.key, rowName: props.row.name })"
            >
              <q-tooltip anchor="top middle" self="center middle" class="q-mb-sm">
                Excluir
              </q-tooltip>
            </q-btn>
          </template>

          <slot name="custom-actions" :item="props"></slot>
        </q-td>
      </template>

      <template v-slot:no-data v-if="!isLoading">
        <div class="full-width row flex-center text-primary q-gutter-sm">
          <span>Nenhum registro encontrado.</span>
        </div>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
  </div>

  <q-page-sticky
    v-if="$q.platform.is.mobile"
    position="bottom-right"
    :offset="[18, 18]"
  >
    <q-btn fab icon="mdi-plus" color="primary" :to="{ name: routeName }" />
  </q-page-sticky>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DynamicTable',

  emits: ['edit', 'delete'],

  props: {
    flat: {
      default: false,
      required: false,
      type: Boolean,
    },

    hideHeader: {
      default: false,
      required: false,
      type: Boolean,
    },

    customActions: {
      default: false,
      required: false,
      type: Boolean,
    },

    rowsData: {
      default: () => [],
      required: true,
      type: Array,
    },

    colsData: {
      default: () => [],
      required: true,
      type: Array,
    },

    rowKey: {
      default: 'id',
      required: false,
      type: String,
    },

    isLoading: {
      default: false,
      required: false,
      type: Boolean,
    },

    customSlots: {
      default: () => [],
      required: false,
      type: Array,
    },

    labelTitle: {
      default: '',
      required: false,
      type: String,
    },

    routeName: {
      default: '#',
      required: false,
      type: String,
    },
  },

  setup() {
    return {
      filter: ref(''),
    };
  },
});
</script>

<style>
.search {
  width: 60%;
}
</style>
