// lib/toast-utils.ts
import { toast, ToastOptions } from 'react-hot-toast';

const defaultOptions: ToastOptions = {
  style: {
    background: 'rgba(15, 20, 40, 0.95)',
    color: '#fff',
    border: '1px solid rgba(99, 102, 241, 0.25)',
    backdropFilter: 'blur(16px)',
    borderRadius: '14px',
    fontSize: '14px',
    padding: '12px 16px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
  },
};

export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      ...defaultOptions,
      iconTheme: {
        primary: '#10b981',
        secondary: '#fff',
      },
      ...options,
    });
  },

  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      ...defaultOptions,
      iconTheme: {
        primary: '#f43f5e',
        secondary: '#fff',
      },
      ...options,
    });
  },

  info: (message: string, options?: ToastOptions) => {
    return toast(message, {
      ...defaultOptions,
      icon: 'ℹ️',
      ...options,
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    return toast(message, {
      ...defaultOptions,
      icon: '⚠️',
      ...options,
    });
  },

  loading: (message: string, options?: ToastOptions) => {
    return toast.loading(message, {
      ...defaultOptions,
      ...options,
    });
  },

  dismiss: (toastId?: string) => {
    toast.dismiss(toastId);
  },
};
