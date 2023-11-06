<template>
  <q-page padding>
    <q-form @submit.prevent="onSubmit">
      <h5 class="q-mb-md">{{ isUpdate ? 'Editar' : 'Adicionar' }} Finança</h5>

      <div class="row" :class="{ 'q-col-gutter-sm': $q.platform.is.desktop }">
        <div class="col-12 col-md-4">
          <InputDate
            v-model="date"
            label="Data de Lançamento"
            :rules="[
              val => (val && val.length === 10) || 'Por favor, informe a data de lançamento.',
            ]"
          />
        </div>

        <div class="col-12 col-md-8">
          <q-input
            v-model="form.name"
            type="text"
            label="Descrição"
            class="q-mb-sm"
            maxlength="20"
            counter
            outlined
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Por favor, informe a descrição.'
            ]"
          />
        </div>
      </div>

      <div class="row" :class="{ 'q-col-gutter-sm': $q.platform.is.desktop }">
        <div class="col-12 col-md-4" :class="{ 'q-mb-lg': $q.platform.is.mobile }">
          <q-field label="Tipo de Finança" outlined dense stack-label>
            <template v-slot:control>
              <q-radio
                v-model="form.type"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                label="Ganho"
                color="green"
                val="income"
              />

              <q-radio
                v-model="form.type"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                label="Despesa"
                color="red"
                val="expense"
              />
            </template>
          </q-field>
        </div>

        <div class="col-12 col-md-8">
          <q-input
            v-model="form.value"
            type="text"
            label="Valor"
            class="q-mb-sm"
            :prefix="`${form.type === 'income' ? '+' : '-'} R$`"
            mask="#,##"
            reverse-fill-mask
            outlined
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Por favor, informe o valor.'
            ]"
          >
            <template v-slot:append v-if="form.value">
              <q-icon
                :name="`${form.type === 'income'
                  ? 'mdi-arrow-up-circle' : 'mdi-arrow-down-circle'}`"
                :color="`${form.type === 'income' ? 'positive' : 'negative'}`"
              />
            </template>
          </q-input>
        </div>
      </div>

      <q-input
        label="Observação"
        v-model="form.note"
        type="textarea"
        outlined
      />

      <div class="row q-mt-md justify-center q-col-gutter-lg">
        <div class="col-12 col-md-5">
          <q-btn
            label="Descartar"
            type="reset"
            color="negative"
            class="full-width"
            outline
            :disable="!formHasChanged"
            @click="onDiscardChanges"
          />
        </div>

        <div class="col-12 col-md-5">
          <q-btn
            label="Registrar"
            type="submit"
            color="positive"
            class="full-width"
            :outline="isDisabled || !formHasChanged"
            :disable="isDisabled || !formHasChanged"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import {
  computed, defineComponent, onMounted, onUnmounted, ref, watch,
} from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import InputDate from '@/components/InputDate';
import useSupabaseApi from '@/composables/useSupabaseApi';
import useDialog from '@/composables/useDialog';
import useNotify from '@/composables/useNotify';
import { getFinanceModelForm } from '@/models/financeModel';
import { hasFormChanged } from '@/utils/formUtils';
import {
  getTodayLocaleDate,
  getLocaleDateFormatted,
  getDateInISOFormat,
  hasFormDateFieldChanged,
} from '@/utils/dateUtils';

export default defineComponent({
  name: 'FormPage',

  components: { InputDate },

  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const { getById, post, update } = useSupabaseApi();
    const { dialogConfirm } = useDialog();
    const { notifyError, notifyInfo, notifySuccess } = useNotify();

    const isUpdate = computed(() => !!route.params.id);
    const showError = ref(false);
    const formHasChanged = ref(false);
    const isDisabled = ref(false);
    const form = getFinanceModelForm();
    const initialForm = structuredClone(form);

    const date = ref(getTodayLocaleDate());
    const dateToCheck = computed(() => (isUpdate.value
      ? getLocaleDateFormatted(initialForm.value.date)
      : initialForm.value.date));

    const prefixColor = computed(() => (form.value.type === 'income' ? 'var(--green)' : 'var(--red)'));

    watch([form, date], () => {
      const hasFormDatesChanged = hasFormDateFieldChanged(dateToCheck.value, date.value);
      if (hasFormDatesChanged) {
        formHasChanged.value = hasFormDatesChanged;
        return;
      }

      formHasChanged.value = hasFormChanged(initialForm.value, form.value);
    }, { deep: true });

    const getFinance = async () => {
      try {
        $q.loading.show();
        isDisabled.value = true;

        const finance = await getById('finances', route.params.id);

        if (finance) {
          initialForm.value = structuredClone(finance);
          form.value = finance;
          date.value = getLocaleDateFormatted(form.value.date);
        }
      } catch (error) {
        notifyError(error.message);
      } finally {
        $q.loading.hide();
        isDisabled.value = false;
      }
    };

    onBeforeRouteLeave((to, from, next) => {
      const isChangingPage = from.path !== to.path;

      if (isChangingPage && formHasChanged.value) {
        dialogConfirm('Você realmente deseja sair da página?', 'Ao sair, todas as alterações serão descartadas.', () => {
          next();
        });
        return;
      }

      next();
    });

    const onDiscardChanges = () => {
      dialogConfirm('Você realmente deseja descartar as alterações?', 'A ação não poderá ser desfeita.', () => {
        form.value = structuredClone(initialForm.value);
        date.value = dateToCheck.value;
      });
    };

    const onSubmit = async () => {
      if (formHasChanged.value) {
        try {
          $q.loading.show();
          isDisabled.value = true;
          form.value.date = getDateInISOFormat(date.value);
          if (isUpdate.value) {
            await update('finances', form.value);
          } else {
            await post('finances', form.value);
          }
          notifySuccess(`Finança ${isUpdate.value ? 'atualizada' : 'cadastrada'} com sucesso!`);
          formHasChanged.value = false;
        } catch (error) {
          notifyError(error.message);
        } finally {
          $q.loading.hide();
          isDisabled.value = false;
        }

        return;
      }
      notifyInfo('Nenhuma modificação identificada.');
    };

    onMounted(() => {
      if (isUpdate.value) {
        getFinance();
        return;
      }

      form.value.type = 'income';
      form.value.date = date.value;
      initialForm.value = structuredClone(form.value);
    });

    onUnmounted(() => {
      form.value = getFinanceModelForm();
      initialForm.value = structuredClone(form);
    });

    return {
      form,
      date,
      getTodayLocaleDate,
      showError,
      isUpdate,
      isDisabled,
      prefixColor,
      formHasChanged,
      onDiscardChanges,
      onSubmit,
    };
  },
});
</script>

<style scoped>
:deep(.q-field__prefix) {
  color: v-bind(prefixColor);
  font-weight: bold;
}
</style>
