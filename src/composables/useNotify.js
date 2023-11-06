import { useQuasar } from 'quasar';

export default function useNotify() {
  const $q = useQuasar();

  $q.notify.setDefaults({
    position: 'bottom',
    timeout: 2000,
  });

  const notifyDefault = (message) => {
    $q.notify({
      color: 'gray',
      message: message || '',
      html: true,
    });
  };

  const notifyInfo = (message) => {
    $q.notify({
      color: 'info',
      message: message || '',
      html: true,
    });
  };

  const notifySuccess = (message) => {
    $q.notify({
      type: 'positive',
      message: message || 'Ok!',
      html: true,
    });
  };

  const notifyError = (message) => {
    $q.notify({
      type: 'negative',
      message: message || 'Falhou!',
      html: true,
    });
  };

  const unclosebleNotify = (type, message) => {
    $q.notify({
      type,
      message,
      timeout: 0,
      html: true,
      actions: [{ icon: 'close', color: 'white' }],
    });
  };

  return {
    notifyDefault,
    notifyInfo,
    notifySuccess,
    notifyError,
    unclosebleNotify,
  };
}
