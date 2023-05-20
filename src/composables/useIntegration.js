import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { formatDateToLocaleString } from '@/utils/dateUtils';

export default function useIntegration() {
  const handleMountMemedDoctor = (form, isUpdate = false) => {
    const data = {
      data: {
        type: 'usuarios',
        attributes: {
          ...(!isUpdate && { external_id: form.doctor_id.toString() }),
          nome: form._name || useUserStore()?.getUserName,
          sobrenome: form._surname || useUserStore()?.getUserSurName,
          data_nascimento: formatDateToLocaleString(form.birth_date),
          cpf: form.cpf,
          uf: form._state || useUserStore()?.getUserStateAbbr,
          email: form.email,
          sexo: form.sex.charAt(0),
          ...(form.avatar_url && { avatar: form.avatar_url }),
          telefone: form.phone,
          user_type: 'Medicos',
        },
      },
      relantionships: {
        especialidade: {
          data: {
            id: form._specialty?.id,
          },
        },
      },
    };

    return JSON.stringify(data);
  };

  const handleUnmountMemedDoctor = (data) => {
    const store = useUserStore();
    const { user } = storeToRefs(store);

    const { attributes, relationships } = data;
    const { especialidade } = relationships;
    const { cpf, token } = attributes;

    user.memedToken = token;

    return { especialidade, cpf };
  };

  const memedDoctorGet = async (doctor_id) => {
    const data = await fetch(`https://integrations.api.memed.com.br/v1/sinapse-prescricao/usuarios/${doctor_id}?api-key=iJGiB4kjDGOLeDFPWMG3no9VnN7Abpqe3w1jEFm6olkhkZD6oSfSmYCm&secret-key=Xe8M5GvBGCr4FStKfxXKisRo3SfYKI7KrTMkJpCAstzu2yXVN4av5nmL`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.api+json',
      },
    })
      .then((response) => response.json())
      .then((response) => handleUnmountMemedDoctor(response.data))
      .catch((error) => error);

    return data;
  };

  const memedDoctorRegister = async (form) => {
    const data = await fetch('https://integrations.api.memed.com.br/v1/sinapse-prescricao/usuarios?api-key=iJGiB4kjDGOLeDFPWMG3no9VnN7Abpqe3w1jEFm6olkhkZD6oSfSmYCm&secret-key=Xe8M5GvBGCr4FStKfxXKisRo3SfYKI7KrTMkJpCAstzu2yXVN4av5nmL', {
      method: 'POST',
      body: handleMountMemedDoctor(form),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.api+json',
      },
    })
      .then((response) => response)
      .catch((error) => error);

    return data;
  };

  const memedDoctorUpdate = async (form) => {
    const data = await fetch(`https://integrations.api.memed.com.br/v1/sinapse-prescricao/usuarios/${form.doctor_id}?api-key=iJGiB4kjDGOLeDFPWMG3no9VnN7Abpqe3w1jEFm6olkhkZD6oSfSmYCm&secret-key=Xe8M5GvBGCr4FStKfxXKisRo3SfYKI7KrTMkJpCAstzu2yXVN4av5nmL`, {
      method: 'PATCH',
      body: handleMountMemedDoctor(form, true),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.api+json',
      },
    })
      .then((response) => response)
      .catch((error) => error);

    return data;
  };

  return {
    memedDoctorGet,
    memedDoctorRegister,
    memedDoctorUpdate,
  };
}
