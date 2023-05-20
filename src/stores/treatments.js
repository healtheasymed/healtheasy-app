import { defineStore } from 'pinia';

import { getTreatmentEnumForm } from '@/enums/treatmentEnum';
import { getAnamnesisEnumForm } from '@/enums/anamnesisEnum';

import {
  getTodayLocaleDateTime,
  formatDateTimeToLocaleString,
  formatToQalendarDateTime,
} from '@/utils/dateUtils';

import useSupabaseApi from '@/composables/useSupabaseApi';

const {
  getById,
  list,
  listByUserId,
  paginationList,
  filteredList,
  post,
  remove,
  update,
} = useSupabaseApi();

export const useTreatmentsStore = defineStore({
  id: 'treatments',

  state: () => ({
    isLoading: false,
    treatments: [],
    identificationFormHasChanged: false,
    anamnesisFormHasChanged: false,
    isDisabled: false,
    treatmentForm: getTreatmentEnumForm(),
    anamnesisForm: getAnamnesisEnumForm(),
    initialTreatmentForm: getTreatmentEnumForm(),
    initialAnamnesisForm: getAnamnesisEnumForm(),
    treatmentDate: getTodayLocaleDateTime(),
    patientsList: null,
    selectedPatient: null,
    selectedDoctor: null,
    showPatientCard: false,
    anamnesisTemplates: null,
    cidList: [],
    searchedCid: null,
  }),

  getters: {
    getNumberOfTreatments: (state) => state.treatments.length,
    formHasChanged: (state) => state.identificationFormHasChanged || state.anamnesisFormHasChanged,
  },

  actions: {
    discardFormChanges() {
      console.log(this.initialAnamnesisForm, this.anamnesisForm);
      this.treatmentForm = structuredClone(this.initialTreatmentForm);
      this.treatmentDate = formatDateTimeToLocaleString(this.initialTreatmentForm.date);
      this.showPatientCard = false;
      this.anamnesisForm = structuredClone(this.initialAnamnesisForm);
    },

    async fetchTreatments() {
      try {
        this.isLoading = true;

        const treatmentsList = await listByUserId('treatments', `
          id,
          plan,
          date,
          patient_id (
            name,
            social_name
          )
        `);

        if (treatmentsList) {
          this.treatments = treatmentsList.map((treatment) => ({
            ...treatment,
            name: treatment.patient_id.social_name || treatment.patient_id.name,
            date: formatDateTimeToLocaleString(treatment.date),
          }));
        }
      } catch (error) {
        this.notifyError(error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async deleteTreatment(id, name) {
      this.dialogConfirm(
        'Excluir atendimento',
        `Você realmente deseja excluir o atendimento à <b>${name}</b>?`,
        async () => {
          try {
            await remove('treatments', id);
            this.notifySuccess();
            this.fetchTreatments();
          } catch (error) {
            this.notifyError(error.message);
          }
        },
      );
    },

    async fetchAllPatients() {
      try {
        this.quasar.loading.show();
        this.isDisabled = true;

        const patients = await listByUserId('patients', 'id, name, social_name');

        if (patients) {
          this.patientsList = patients.map((patient) => ({
            ...patient,
            name: patient.social_name || patient.name,
          }));
        }
      } catch (error) {
        this.notifyError(error.message);
      } finally {
        this.quasar.loading.hide();
        this.isDisabled = false;
      }
    },

    async fetchSelectedPatient() {
      try {
        this.quasar.loading.show();
        this.isDisabled = true;
        this.selectedPatient = await getById('patients', this.treatmentForm.patient_id);
      } catch (error) {
        this.notifyError(error.message);
      } finally {
        this.quasar.loading.hide();
        this.isDisabled = false;
      }
    },

    async fetchSelectedDoctor(doctorId) {
      try {
        this.quasar.loading.show();
        this.isDisabled = true;
        const { id, ...doctorData } = await getById('doctors', doctorId);
        const profile = await getById('profiles', doctorData.profile_id);
        this.selectedDoctor = Object.assign(profile, doctorData);
      } catch (error) {
        this.notifyError(error.message);
      } finally {
        this.quasar.loading.hide();
        this.isDisabled = false;
      }
    },

    async fetchTreatment(id) {
      try {
        this.quasar.loading.show();
        this.isDisabled = true;

        const treatment = await getById('treatments', id);

        if (treatment) {
          this.initialTreatmentForm = structuredClone(treatment);
          this.treatmentForm = treatment;
          this.treatmentDate = formatDateTimeToLocaleString(this.treatmentForm.date);
        }
      } catch (error) {
        this.notifyError(error.message);
      } finally {
        this.quasar.loading.hide();
        this.isDisabled = false;
      }
    },

    async fetchAnamnesis() {
      try {
        this.quasar.loading.show();
        this.isDisabled = true;

        const anamnesis = await getById('anamnesis', this.treatmentForm.anamnesis_id);

        if (anamnesis) {
          this.initialAnamnesisForm = structuredClone(anamnesis);
          this.anamnesisForm = anamnesis;
        }
      } catch (error) {
        this.notifyError(error.message);
      } finally {
        this.quasar.loading.hide();
        this.isDisabled = false;
      }
    },

    async fetchAnamnesisTemplates() {
      try {
        this.quasar.loading.show();
        this.isDisabled = true;

        const anamnesisTemplates = await list('anamnesis-templates');

        if (anamnesisTemplates) {
          this.anamnesisTemplates = anamnesisTemplates;
        }
      } catch (error) {
        this.notifyError(error.message);
      } finally {
        this.quasar.loading.hide();
        this.isDisabled = false;
      }
    },

    async fetchCIDs(page = 0) {
      try {
        this.quasar.loading.show();
        this.isLoading = true;

        if (this.searchedCid) {
          this.cidList = await filteredList(
            'cids',
            {
              column: 'description',
              value: this.searchedCid,
            },
          );
        } else {
          const actualCidList = await paginationList('cids', page);
          this.cidList = actualCidList.filter((cid) => !this.cidList.includes(cid));
        }
      } catch (error) {
        this.notifyError('Erro ao obter a Lista de CID\'s. Tente novamente, por favor.');
      } finally {
        this.quasar.loading.hide();
        this.isLoading = false;
      }
    },

    updateTreatmentFormId(treamentId) {
      this.initialTreatmentForm.id = treamentId;
      this.treatmentForm.id = treamentId;
    },

    updateAnamnesisFormId(anamnesisId) {
      this.initialAnamnesisForm.id = anamnesisId;
      this.anamnesisForm.id = anamnesisId;
      this.initialTreatmentForm.anamnesis_id = anamnesisId;
      this.treatmentForm.anamnesis_id = anamnesisId;
    },

    async onSubmit() {
      if (!this.identificationFormHasChanged && !this.anamnesisFormHasChanged) {
        this.notifyInfo('Nenhuma modificação identificada.');
        return;
      }

      try {
        this.quasar.loading.show();

        this.isDisabled = true;
        this.initialAnamnesisForm = structuredClone(this.anamnesisForm);

        let anamnesisId = null;
        let treatmentId = null;

        if (this.treatmentForm.anamnesis_id) {
          const { id } = await update('anamnesis', this.anamnesisForm);
          anamnesisId = id;
        } else if (this.anamnesisFormHasChanged) {
          const { id } = await post('anamnesis', this.anamnesisForm);
          anamnesisId = id;
        }

        this.updateAnamnesisFormId(anamnesisId);
        this.treatmentForm.date = formatToQalendarDateTime(this.treatmentDate);
        this.initialTreatmentForm = structuredClone(this.treatmentForm);

        if (this.treatmentForm.id) {
          const { id } = await update('treatments', this.treatmentForm);
          treatmentId = id;
        } else {
          const { id } = await post('treatments', this.treatmentForm);
          treatmentId = id;
        }

        this.notifySuccess(`Atendimento ${this.initialTreatmentForm.id ? 'atualizado' : 'cadastrado'} com sucesso!`);
        this.updateTreatmentFormId(treatmentId);
        this.identificationFormHasChanged = false;
        this.anamnesisFormHasChanged = false;
      } catch (error) {
        this.notifyError(error.message);
      } finally {
        this.quasar.loading.hide();
        this.isDisabled = false;
      }
    },
  },
});
