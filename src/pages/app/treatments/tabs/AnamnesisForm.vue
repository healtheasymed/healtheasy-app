<template>
  <q-field
    label="Anamnese / Exame Físico / Sinais e Sintomas"
    stack-label
    outlined
    class="q-mb-lg"
  >
    <template v-slot:control>
      <div class="self-center full-width no-outline" tabindex="0">
        <q-editor
          v-model="anamnesisForm.exam"
          :dense="$q.screen.lt.md"
          flat
          :toolbar="[
            ['anmnesisExamples'],
            [
              {
                label: $q.lang.editor.align,
                icon: $q.iconSet.editor.align,
                fixedLabel: true,
                options: ['left', 'center', 'right', 'justify']
              }
            ],
            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
            ['token', 'hr', 'link', 'custom_btn'],
            ['print', 'fullscreen'],
            [
              {
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: [
                  'p',
                  'h1',
                  'h2',
                  'h3',
                  'h4',
                  'h5',
                  'h6',
                  'code'
                ]
              },
              {
                label: $q.lang.editor.fontSize,
                icon: $q.iconSet.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'size-1',
                  'size-2',
                  'size-3',
                  'size-4',
                  'size-5',
                  'size-6',
                  'size-7'
                ]
              },
              {
                label: $q.lang.editor.defaultFont,
                icon: $q.iconSet.editor.font,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'default_font',
                  'arial',
                  'arial_black',
                  'comic_sans',
                  'courier_new',
                  'impact',
                  'lucida_grande',
                  'times_new_roman',
                  'verdana'
                ]
              },
              'removeFormat'
            ],
            ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

            ['undo', 'redo']
          ]"
          :fonts="{
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana'
          }"
          >
            <template v-slot:anmnesisExamples v-if="anamnesisTemplates">
              <q-btn-dropdown
                dense
                no-caps
                ref="anmnesisExamplesRef"
                no-wrap
                unelevated
                color="white"
                text-color="primary"
                label="Modelos de Anamnese"
                size="sm"
              >
                <q-list dense>
                  <q-item
                    v-for="(template, index) in anamnesisTemplates"
                    :key="index"
                    tag="label"
                    clickable
                    v-close-popup
                    @click="setAnamesisTemplate(template)"
                  >
                    <q-item-section>{{ template.title }}</q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </template>
        </q-editor>
      </div>
    </template>
  </q-field>

  <q-field
    label="Avaliação e Plano"
    stack-label
    outlined
    class="q-mb-lg"
  >
    <template v-slot:control>
      <div class="self-center full-width no-outline" tabindex="0">
        <q-editor
          v-model="anamnesisForm.medical_plan"
          :dense="$q.screen.lt.md"
          flat
          :toolbar="[
            [
              {
                label: $q.lang.editor.align,
                icon: $q.iconSet.editor.align,
                fixedLabel: true,
                list: 'only-icons',
                options: ['left', 'center', 'right', 'justify']
              }
            ],
            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
            ['token', 'hr', 'link', 'custom_btn'],
            ['print', 'fullscreen'],
            [
              {
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: [
                  'p',
                  'h1',
                  'h2',
                  'h3',
                  'h4',
                  'h5',
                  'h6',
                  'code'
                ]
              },
              {
                label: $q.lang.editor.fontSize,
                icon: $q.iconSet.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'size-1',
                  'size-2',
                  'size-3',
                  'size-4',
                  'size-5',
                  'size-6',
                  'size-7'
                ]
              },
              {
                label: $q.lang.editor.defaultFont,
                icon: $q.iconSet.editor.font,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'default_font',
                  'arial',
                  'arial_black',
                  'comic_sans',
                  'courier_new',
                  'impact',
                  'lucida_grande',
                  'times_new_roman',
                  'verdana'
                ]
              },
              'removeFormat'
            ],
            ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

            ['undo', 'redo'],
            ['viewsource']
          ]"
          :fonts="{
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana'
          }"
        />
      </div>
    </template>
  </q-field>

  <q-select
    v-model="anamnesisForm.cid"
    label="CID"
    class="q-mb-lg"
    outlined
    use-input
    :options="cidList"
    option-value="id"
    option-label="description"
    emit-value
    map-options
    multiple
    use-chips
    :loading="isLoading"
    @virtual-scroll="onCidSelectScroll"
    @input-value="(value) => onSearchCid(value)"
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
        {{ scope.opt.description }}
      </q-chip>
    </template>

    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          Nenhum resultado encontrado.
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import {
  computed,
  defineComponent,
  ref,
  onMounted,
  watch,
} from 'vue';
import { storeToRefs } from 'pinia';
import { useTreatmentsStore } from '@/stores/treatments';
import { hasFormChanged } from '@/utils/formUtils';

export default defineComponent({
  name: 'AnamnesisForm',

  setup() {
    const store = useTreatmentsStore();
    const {
      isLoading,
      isDisabled,
      treatmentForm,
      anamnesisFormHasChanged,
      anamnesisForm,
      initialAnamnesisForm,
      cidList,
      searchedCid,
      anamnesisTemplates,
    } = storeToRefs(store);
    const fetchAnamnesis = () => store.fetchAnamnesis();
    const fetchAnamnesisTemplates = () => store.fetchAnamnesisTemplates();
    const fetchCIDs = (page) => store.fetchCIDs(page);
    const page = ref(0);

    const cidsSelectRef = ref(null);
    const cid = ref(null);

    const isUpdate = computed(() => !!treatmentForm.value.anamnesis_id);

    watch(anamnesisForm, () => {
      anamnesisFormHasChanged.value = hasFormChanged(
        initialAnamnesisForm.value,
        anamnesisForm.value,
      );
    }, { deep: true });

    const setAnamesisTemplate = (template) => {
      anamnesisForm.value.exam = template.html;
    };

    const onSearchCid = (value) => {
      searchedCid.value = value;
      fetchCIDs();
    };

    const onCidSelectScroll = ({ to }) => {
      if (searchedCid.value) {
        return;
      }

      const lastIndex = cidList.value.length - 1;

      if (!isLoading.value && to === lastIndex) {
        page.value += 1;

        setTimeout(() => {
          fetchCIDs(page.value);
        }, 500);
      }
    };

    const onAddItem = (itemValue, refName) => {
      if (itemValue && itemValue !== '') {
        refName.add(itemValue);
        refName.updateInputValue('');
      }
    };

    onMounted(() => {
      if (isUpdate.value) {
        fetchAnamnesis();
      }

      fetchAnamnesisTemplates();
      fetchCIDs();
    });

    return {
      anamnesisFormHasChanged,
      isLoading,
      isDisabled,
      anamnesisForm,
      anamnesisTemplates,
      setAnamesisTemplate,
      cidList,
      searchedCid,
      onCidSelectScroll,
      onSearchCid,
      fetchCIDs,
      cid,
      cidsSelectRef,
      onAddItem,
    };
  },
});
</script>

<style scoped>
:deep(.q-editor__toolbars-container) {
  border-bottom: 1px solid;
}
</style>
