<template>
  <q-page padding>
    <q-form @submit.prevent="onSubmit">
      <h5>Perfil</h5>

      <InputImage
        ref="inputImageRef"
        v-model="form.avatar_url"
        label="Foto de Perfil"
        :disable="isDisabled"
        showDefaultProfileIcon
        @img-error="(hasError) => showError = !!hasError"
      />

      <q-input
        v-model="form.email"
        type="email"
        label="E-mail"
        hint="Não é possível alterar o e-mail."
        class="q-mb-md"
        outlined
        disable
      />

      <q-input
        v-model="form.name"
        type="text"
        :label="form.role === 'doctor' ? 'Nome Completo' : 'Nome da Clínica'"
        class="q-mb-sm"
        outlined
        lazy-rules
        :rules="[
          val => (val && val.length >= 6) || 'Por favor, informe o nome completo.'
        ]"
      />

      <q-input
        v-model="form.phone"
        type="text"
        label="Celular"
        class="q-mb-md"
        outlined
        lazy-rules
        mask="(##) ##### - ####"
        hint="Formato: (12) 91234 - 5678"
        :rules="[
          val => (val && val.length > 0) || 'Por favor, informe o celular.',
          val => (val && val.length > 16) || 'Por favor, informe um número de celular válido.',
        ]"
      />

      <div class="row q-mb-md q-col-gutter-sm" v-if="form.role === 'doctor'">
        <div class="col-12 col-md-6">
          <q-input
            v-model="form.crm"
            type="text"
            label="CRM"
            outlined
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Por favor, informe o CRM.'
            ]"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-select
            v-model="form.state"
            label="Estado de Atuação"
            :options="states"
            outlined
            option-label="nome"
            option-value="nome"
            emit-value
            map-options
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Por favor, informe o Estado de Atuação.'
            ]"
          />
        </div>
      </div>

      <q-select
        v-model="form.specialties"
        label="Especialidade(s)"
        :options="specialtiesOptions"
        outlined
        option-label="value"
        option-value="value"
        multiple
        use-chips
        stack-label
        emit-value
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Por favor, informe ao menos uma Especialidade.'
        ]"
      >
        <template v-slot:selected-item="scope">
          <q-chip
            class="q-px-md"
            color="primary"
            text-color="white"
            icon="mdi-check"
            square
            outline
            size="md"
            removable
            @remove="scope.removeAtIndex(scope.index)"
          >
            {{ scope.opt }}
          </q-chip>
        </template>
      </q-select>

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
  defineComponent, onMounted, ref, watch,
} from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { useBrazilianStatesStore } from '@/stores/brazilianStates';
import useDialog from '@/composables/useDialog';
import useNotify from '@/composables/useNotify';
import { profileEnumForm } from '@/enums/profileEnum';
import { specialties as specialtiesOptions } from '@/static/specialties';
import { hasFormChanged } from '@/utils/formUtils';
import InputImage from '@/components/InputImage.vue';

export default defineComponent({
  name: 'ProfilePage',

  components: {
    InputImage,
  },

  setup() {
    const $q = useQuasar();
    const { dialogConfirm } = useDialog();
    const { notifyError, notifyInfo, notifySuccess } = useNotify();

    const store = useUserStore();
    const { user } = storeToRefs(store);
    const updateUser = (form) => store.updateUser(form);

    const brazilianStatesStore = useBrazilianStatesStore();
    const { states } = storeToRefs(brazilianStatesStore);

    const showError = ref(false);
    const formHasChanged = ref(false);
    const isDisabled = ref(false);

    const initialForm = structuredClone(profileEnumForm);
    const form = profileEnumForm;
    const inputImageRef = ref(null);

    watch(form, () => {
      formHasChanged.value = hasFormChanged(initialForm.value, form.value);
    }, { deep: true });

    watch(user, (_user) => {
      if (_user) {
        initialForm.value = structuredClone(_user);
        form.value = _user;
      }
    });

    onBeforeRouteLeave((to, from, next) => {
      const isChangingPage = from.path !== to.path;

      if (isChangingPage && formHasChanged.value) {
        dialogConfirm(
          'Você realmente deseja sair da página?',
          'Ao sair, todas as alterações serão descartadas.',
          () => {
            next();
          },
        );

        return;
      }

      next();
    });

    const onDiscardChanges = () => {
      dialogConfirm(
        'Você realmente deseja descartar as alterações?',
        'A ação não poderá ser desfeita.',
        () => {
          form.value = structuredClone(initialForm.value);
        },
      );
    };

    const onSubmit = async () => {
      if (formHasChanged.value) {
        try {
          $q.loading.show();
          isDisabled.value = true;

          await inputImageRef.value.uploadFileOnSubmit();
          const userProfile = await updateUser(form.value);

          if (userProfile) {
            initialForm.value = structuredClone(userProfile);
            form.value = userProfile;
          }

          notifySuccess('Perfil atualizado com sucesso!');
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
      if (user.value) {
        initialForm.value = structuredClone(user.value);
        form.value = user.value;
      }
    });

    return {
      form,
      inputImageRef,
      showError,
      states,
      specialtiesOptions,
      isDisabled,
      formHasChanged,
      onDiscardChanges,
      onSubmit,
    };
  },
});
</script>

<style scoped>
:deep(.q-field__marginal) {
  height: auto;
}

:deep(.q-chip__content) {
  text-transform: capitalize;
}
</style>
