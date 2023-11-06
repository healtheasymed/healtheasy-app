<template>
  <q-card flat class="flex column items-center full-width">
    <q-img
      v-if="modelValue || fileUrl"
      spinner-color="primary"
      spinner-size="20px"
      class="data__img q-mb-md"
      :src="modelValue || fileUrl"
      :ratio="4 / 3"
      :class="errorClass"
      @error="handleErrorClass"
    >
      <template v-slot:error>
        <div class="absolute-full flex flex-center bg-negative text-white">
          URL inválida
        </div>
      </template>
    </q-img>

    <q-icon
      v-if="!modelValue && !fileUrl && showDefaultProfileIcon"
      color="primary"
      name="mdi-account-circle-outline"
      size="10em"
    />

    <q-tabs
      v-model="tab"
      dense
      class="text-grey full-width"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="pasteUrl" label="Colar URL" />
      <q-tab name="upload" label="Enviar do Computador" />
      <q-btn
        icon="mdi-delete"
        color="negative"
        square
        v-if="modelValue && modelValue.includes('supabase.co/storage')"
        @click="handleDeleteImage"
      />
    </q-tabs>

    <q-separator class="full-width" />

    <q-tab-panels v-model="tab" class="full-width" animated>
      <q-tab-panel name="pasteUrl">
        <q-input
          type="text"
          outline
          error-message="Por favor, verifique a URL informada."
          :label="label"
          :error="!!errorClass"
          :disable="disable"
          :model-value="modelValue"
          @update:model-value="handleUpdateImgURL"
        >
          <template v-slot:append v-if="modelValue && modelValue.includes('supabase.co/storage')">
            <q-icon
              name="mdi-information"
              color="warning"
              class="cursor-pointer"
              @click.stop.prevent="dialogDefault('Atenção!', `Essa imagem está salva
                no nosso servidor. Caso queira excluí-la, clique no botão de exclusão.`)"
            />
          </template>
        </q-input>
      </q-tab-panel>

      <q-tab-panel name="upload">
        <q-file
          v-model="imgFile"
          accept="image/*"
          outline
          :label="label"
          :disable="disable"
          @update:model-value="handleUpdateImgFile"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
          <template v-slot:append v-if="imgFile">
            <q-icon
              name="mdi-close"
              @click.stop.prevent="imgFile = null"
              class="cursor-pointer"
            />
          </template>
        </q-file>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import useSupabaseApi from '@/composables/useSupabaseApi';
import useNotify from '@/composables/useNotify';
import useDialog from '@/composables/useDialog';

export default defineComponent({
  name: 'InputImage',

  emits: ['imgError', 'update:modelValue'],

  props: {
    disable: {
      default: false,
      required: false,
      type: Boolean,
    },

    label: {
      default: 'Imagem',
      required: false,
      type: String,
    },

    modelValue: {
      default: '',
      required: false,
      type: String,
    },

    showDefaultProfileIcon: {
      default: false,
      required: false,
      type: Boolean,
    },
  },

  setup(props, { emit }) {
    const $q = useQuasar();
    const { uploadImg, removeProfileImg } = useSupabaseApi();
    const { notifyError, notifySuccess } = useNotify();
    const { dialogDefault, dialogConfirm } = useDialog();

    const tab = ref('pasteUrl');
    const initialModelValue = ref(props.modelValue?.value);
    const imgFile = ref(null);
    const fileUrl = ref('');
    const errorClass = ref('');

    watch(errorClass, (newErrorClass) => {
      emit('imgError', newErrorClass);
    });

    const handleErrorClass = (event) => {
      if (event && event.type === 'error') {
        errorClass.value = 'error';
        return;
      }

      errorClass.value = '';
    };

    const clearImgFile = () => {
      imgFile.value = null;
      fileUrl.value = '';
    };

    const clearImgUrl = () => {
      handleErrorClass();
      emit('update:modelValue', '');
    };

    const handleUpdateImgURL = (data) => {
      handleErrorClass();
      if (!errorClass.value) {
        clearImgFile();
        emit('update:modelValue', data.trim());
      }
    };

    const handleUpdateImgFile = () => {
      handleErrorClass();
      if (!errorClass.value && imgFile.value) {
        clearImgUrl();
        fileUrl.value = URL.createObjectURL(imgFile.value);
        emit('update:modelValue', fileUrl.value.trim());
      }
    };

    const handleDeleteImage = () => {
      dialogConfirm(
        'Você realmente deseja excluir a imagem?',
        'A ação não poderá ser desfeita.',
        async () => {
          $q.loading.show();
          await removeProfileImg('profile-image', [imgFile.value]);
          clearImgUrl();
          clearImgFile();
          notifySuccess('A imagem foi excluída.');
          $q.loading.hide();
        },
      );
    };

    const uploadFileOnSubmit = async () => {
      if (imgFile.value && imgFile.value !== initialModelValue.value) {
        try {
          const avatar_url = await uploadImg('profile-image', imgFile.value);
          emit('update:modelValue', avatar_url.trim());

          notifySuccess('A imagem foi salva com sucesso!');
        } catch (error) {
          notifyError('Erro ao salvar a imagem! Tente novamente, por favor.');
        }
      }
    };

    return {
      tab,
      imgFile,
      errorClass,
      dialogDefault,
      handleUpdateImgURL,
      handleUpdateImgFile,
      handleErrorClass,
      fileUrl,
      handleDeleteImage,
      uploadFileOnSubmit,
    };
  },
});
</script>

<style scoped>
.data__img {
  height: 150px;
  width: 150px;
}
.data__img:not(.error):hover {
  height: 300px;
  width: 300px;
  z-index: 999;
}
</style>
