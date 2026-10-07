import { toaster } from '@/shared/ui/toaster';
import { getErrorMessage } from '../utils/getErrorMessage';

export const useNotifications = () => {

  const showErrorMessage = (fallback: string, error?: unknown) => {
    const errorMessage = error ? getErrorMessage(error) : fallback
    toaster.error({
      title: errorMessage,
      type: "error",
    });
  };

  const showSuccessMessage = (title: string) => {
    toaster.create({
      title,
      type: "success",
    });
  };
  return { showErrorMessage, showSuccessMessage };
};
