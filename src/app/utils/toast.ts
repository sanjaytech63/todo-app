import { toast, ToastOptions } from 'react-toastify';


const defaultToastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
};

export const toastFunctions = {
    success: (message: string, options?: ToastOptions) => {
        toast.success(message, { ...defaultToastOptions, ...options });
    },
    error: (message: string, options?: ToastOptions) => {
        toast.error(message, { ...defaultToastOptions, ...options });
    },
    info: (message: string, options?: ToastOptions) => {
        toast.info(message, { ...defaultToastOptions, ...options });
    },
    warn: (message: string, options?: ToastOptions) => {
        toast.warn(message, { ...defaultToastOptions, ...options });
    },
};

export const showSuccessToast = toastFunctions.success;
export const showErrorToast = toastFunctions.error;
export const showInfoToast = toastFunctions.info;
export const showWarningToast = toastFunctions.warn;