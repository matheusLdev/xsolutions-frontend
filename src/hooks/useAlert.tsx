import { useRef } from 'react';
import { Toast } from 'primereact/toast';

export function useAlert() {
  const toast = useRef<Toast | null>(null);

  const showSuccess = (message: string) => {
    toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: message, life: 10000 });
  };

  const showError = (message: string) => {
    toast.current?.show({ severity: 'error', summary: 'Erro', detail: message, life: 10000 });
  };

  const ToastComponent = () => <Toast ref={toast} />;

  return { showSuccess, showError, ToastComponent };
}
