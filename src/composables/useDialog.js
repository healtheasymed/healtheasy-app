import { useQuasar } from 'quasar';

export default function useDialog() {
  const $q = useQuasar();

  const dialogDefault = (title, message, onOk) => {
    $q.dialog({
      title,
      message,
    }).onOk(() => {
      if (onOk) {
        onOk();
      }
    });
  };

  const dialogConfirm = (title, message, onOk, onCancel) => {
    $q.dialog({
      title,
      message,
      ok: {
        label: 'Sim',
        color: 'positive',
      },
      cancel: {
        label: 'Cancelar',
        color: 'negative',
        flat: true,
        outline: true,
      },
      persistent: true,
      html: true,
    }).onOk(() => {
      if (onOk) {
        onOk();
      }
    }).onCancel(() => {
      if (onCancel) {
        onCancel();
      }
    });
  };

  return {
    dialogDefault,
    dialogConfirm,
  };
}
