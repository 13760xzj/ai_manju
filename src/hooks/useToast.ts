import { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { showToast } from '@/store/slices/uiSlice';
import type { ToastType } from '@/store/slices/uiSlice';

interface ToastOptions {
  duration?: number;
}

export function useToast() {
  const dispatch = useAppDispatch();

  const show = useCallback(
    (type: ToastType, message: string, options?: ToastOptions) => {
      dispatch(
        showToast({
          type,
          message,
          duration: options?.duration
        })
      );
    },
    [dispatch]
  );

  const success = useCallback(
    (message: string, options?: ToastOptions) => {
      show('success', message, options);
    },
    [show]
  );

  const error = useCallback(
    (message: string, options?: ToastOptions) => {
      show('error', message, { duration: 5000, ...options });
    },
    [show]
  );

  const warning = useCallback(
    (message: string, options?: ToastOptions) => {
      show('warning', message, options);
    },
    [show]
  );

  const info = useCallback(
    (message: string, options?: ToastOptions) => {
      show('info', message, options);
    },
    [show]
  );

  return {
    show,
    success,
    error,
    warning,
    info
  };
}
