<template>
  <div v-if="(!profile || !profile.app_key || profile.status !== 'active') && !isLoading">
    <q-banner rounded class="text-white bg-negative q-mb-md">
      <template v-slot:default>
        <div class="column items-center">
          <q-icon name="mdi-alert-outline" size="64px" />
          <h6>
            Não foi encontrada uma assinatura ativa para sua conta então não será possível
            gerenciar as <b>Chaves de Uso</b>.
          </h6>
        </div>
      </template>
    </q-banner>

    <p v-if="getDueInvoices && getDueInvoices.length">
      Por favor, será necessário quitar todas as
      <u>
        <q-breadcrumbs-el
          class="text-weight-bold cursor-pointer"
          label="Faturas Vencidas"
          @click="$emit('goToDueTab')"
        />
      </u>
      para prosseguir com a utilização do sistema.
    </p>

    <p v-else>
      Acesse
      <router-link
        class="text-primary text-weight-bold"
        target="_blank"
        rel="noopener noreferrer"
        :to="{ name: 'landing', hash: '#planos' }"
      >
        Nossos Planos
      </router-link>
      e faça sua assinatura para usufruir de todas as funcionalidades
      do <b class="text-primary">Health Easy</b>.
    </p>
  </div>

  <q-form v-else-if="!isLoading">
    <div class="header">
      <p class="q-mb-sm">
        Aqui você conseguirá gerenciar as <b>Chaves de Uso</b> para ter acesso
        às funcionalidades do <b class="text-primary">Health Easy</b>.
      </p>

      <p class="q-mb-md">
        Para isso, basta fornecer abaixo o e-mail da pessoa que irá utilizar
        o nosso sistema, lembrando que a quantidade de chaves dependerá de quantas
        foram solicitadas na última assinatura paga.
      </p>
    </div>

    <div
      class="row q-mb-md"
      :class="{ 'q-col-gutter-sm': $q.platform.is.desktop }"
      v-if="profile"
    >
      <div class="col-12 col-md-6">
        <q-input
          v-model="profile.email"
          type="text"
          label="E-mail da Assinatura"
          class="q-mb-sm"
          outlined
          disable
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input
          v-model="profile.app_key"
          type="text"
          label="Chave de Uso"
          class="q-mb-sm"
          outlined
          disable
        />
      </div>
    </div>

    <q-separator class="full-width q-my-md" />

    <div class="keys-form" v-if="profilesFormArray.length">
      <template v-for="(profileForm, index) in profilesFormArray" :key="profileForm.id">
        <div
          class="row q-mb-md"
          :class="{ 'q-col-gutter-sm': $q.platform.is.desktop }"
          v-if="profileForm"
        >
          <div class="col-12 col-md-5">
            <q-input
              v-model="profileForm.email"
              type="text"
              :label="`(${index + 1}) E-mail`"
              class="q-mb-sm"
              outlined
            />
          </div>

          <div class="col-12 col-sm-8 col-md-4">
            <q-input
              v-model="profileForm.app_key"
              type="text"
              label="Chave de Uso"
              class="q-mb-sm"
              outlined
              disable
            />
          </div>

          <div class="col-12 col-sm-4 col-md-3 flex justify-around items-center">
            <q-toggle
              v-model="profileForm.status"
              checked-icon="mdi-check"
              unchecked-icon="mdi-cancel"
              false-value="inactive"
              true-value="active"
              keep-color
              :label="profileForm.status === 'active' ? 'Ativo' : 'Inativo'"
              :color="profileForm.status === 'active' ? 'positive' : 'negative'"
              :disable="!profileForm.email"
            />
            <div class="buttons q-gutter-x-sm">
              <q-btn
                color="negative"
                icon="mdi-delete-outline"
                size="sm"
                round
                :disable="!profileForm.email"
                @click="deleteProfileObj(profileForm.id)"
              >
                <q-tooltip anchor="top middle" self="center middle">
                  Excluir Acesso
                </q-tooltip>
              </q-btn>
              <q-btn
                color="positive"
                icon="mdi-content-save"
                size="sm"
                round
                :disable="!profileForm.email"
                @click="saveProfileObj(profileForm)"
              >
                <q-tooltip anchor="top middle" self="center middle">
                  Salvar Atribuição
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>

        <q-separator class="full-width q-my-md" />
      </template>
    </div>
  </q-form>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
} from 'vue';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import useSupabaseApi from '@/composables/useSupabaseApi';
import useNotify from '@/composables/useNotify';
import { useSubscriptionStore } from '@/stores/subscription';

export default defineComponent({
  name: 'KeyManagement',

  emits: ['goToDueTab'],

  setup() {
    const $q = useQuasar();
    const { filteredList, publicPost, update } = useSupabaseApi();
    const store = useSubscriptionStore();
    const { notifyError, notifySuccess } = useNotify();
    const {
      profile,
      isLoading,
      lastPaidInvoice,
      getDueInvoices,
    } = storeToRefs(store);

    const initialProfilesFormArray = ref([]);
    const profilesFormArray = ref([]);

    const initialProfileObj = {
      id: '',
      email: '',
      app_key: null,
      status: 'inactive',
    };

    const constructInputForm = () => {
      if (!lastPaidInvoice?.value.quantity) {
        return;
      }

      let quantity = Number(lastPaidInvoice.value.quantity - 1);

      if (profilesFormArray.value.length) {
        quantity = Number(quantity - profilesFormArray.value.length);
      }

      // eslint-disable-next-line
      for (let index = 0; index < quantity; index++) {
        const newProfileObj = {
          ...initialProfileObj,
          id: index,
          app_key: profile?.value.app_key || null,
        };

        profilesFormArray.value.push(newProfileObj);
      }
    };

    const findProfileObj = (id) => (
      profilesFormArray.value && profilesFormArray.value
        .findIndex((profileObj) => profileObj.id === id)
    );

    const modifyProfileObj = (id, newProfileObj) => {
      const indexFoundProfile = findProfileObj(id);

      if (indexFoundProfile === -1) {
        return;
      }

      profilesFormArray.value[indexFoundProfile] = newProfileObj;
    };

    const fetchProfilesKey = async () => {
      if (!profile?.value.app_key) {
        return;
      }

      try {
        $q.loading.show();
        isLoading.value = true;

        profilesFormArray.value = await filteredList(
          'profiles',
          {
            column: 'app_key',
            value: profile?.value.app_key,
          },
          `
            id,
            email,
            app_key,
            status
          `,
        );

        const mainProfileIndex = profilesFormArray.value && profilesFormArray.value
          .findIndex((profileObj) => profileObj.id === profile?.value.id);

        profilesFormArray.value.splice(mainProfileIndex, 1);

        initialProfilesFormArray.value = structuredClone(profilesFormArray.value);
      } catch (error) {
        notifyError(error.message);
      }

      $q.loading.hide();
      isLoading.value = false;
    };

    const fetchProfilesByEmail = async (email) => {
      let profilesByEmail = null;

      try {
        $q.loading.show();
        isLoading.value = true;

        profilesByEmail = await filteredList(
          'profiles',
          {
            column: 'email',
            value: email,
          },
          `
            id,
            email,
            app_key,
            status
          `,
        );
      } catch (error) {
        notifyError(error.message);
      }

      $q.loading.hide();
      isLoading.value = false;

      return profilesByEmail;
    };

    const saveProfileObj = async (profileKeyObj) => {
      const dbProfile = await fetchProfilesByEmail(profileKeyObj.email);

      if (dbProfile.length) {
        await update('profiles', profileKeyObj);
        return;
      }

      await publicPost('profiles', profileKeyObj);
    };

    const deleteProfileFromDB = async (profileKeyObj) => {
      profileKeyObj.app_key = '';
      profileKeyObj.status = 'inactive';

      try {
        $q.loading.show();
        isLoading.value = true;

        await update('profiles', profileKeyObj);
        notifySuccess('O perfil foi removido do Grupo de Acessos para essa assinatura.');
      } catch (error) {
        notifyError(error.message);
      }

      $q.loading.hide();
      isLoading.value = false;
    };

    const deleteProfileObj = async (id) => {
      const savedProfileKey = initialProfilesFormArray.value && initialProfilesFormArray.value
        .find((profileObj) => profileObj.id === id);

      if (savedProfileKey) {
        await deleteProfileFromDB(savedProfileKey);
      }

      const newProfileObj = {
        ...initialProfileObj,
        id,
        app_key: profile?.value.app_key || null,
      };

      modifyProfileObj(id, newProfileObj);
    };

    onMounted(async () => {
      await fetchProfilesKey();
      constructInputForm();
    });

    return {
      isLoading,
      profile,
      deleteProfileObj,
      saveProfileObj,
      getDueInvoices,
      profilesFormArray,
    };
  },
});
</script>
