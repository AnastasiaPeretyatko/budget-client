import { toaster } from '@/shared/ui/toaster';

export const useNotifications = () => {

  const showErrorMessage = (title: string) => {
    toaster.error({
      title,
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
