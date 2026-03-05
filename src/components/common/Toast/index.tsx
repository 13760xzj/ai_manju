import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeToast } from '@/store/slices/uiSlice';
import type { Toast as ToastType, ToastType as ToastVariant } from '@/store/slices/uiSlice';
import './Toast.css';

function ToastItem({ toast }: { toast: ToastType }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, dispatch]);

  const getIcon = (type: ToastVariant): string => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  };

  const handleClose = () => {
    dispatch(removeToast(toast.id));
  };

  return (
    <div className={`toast-item toast-${toast.type}`}>
      <span className="toast-icon">{getIcon(toast.type)}</span>
      <span className="toast-message">{toast.message}</span>
      <button className="toast-close" onClick={handleClose} aria-label="关闭">
        ×
      </button>
    </div>
  );
}

export function Toast() {
  const toasts = useAppSelector((state) => state.ui.toasts);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
