import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import { useLocale } from './LocaleProvider';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToastData {
  id: string;
  variant: ToastVariant;
  title?: string;
  message: string;
  /** Auto-dismiss delay in ms. 0 = no auto-dismiss. Default: 4000 */
  duration?: number;
}

export interface ToastItemProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

export interface UseToastOptions {
  position?: ToastPosition;
  defaultDuration?: number;
}

/**
 * Toast icon SVGs by variant.
 */
const ICONS: Record<ToastVariant, ReactNode> = {
  success: (
    <svg className="ui-toast__icon" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="ui-toast__icon" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="ui-toast__icon" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="ui-toast__icon" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
};

/* ── Single toast item ─────────────────────────────────────────── */

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const locale = useLocale();

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => onDismiss(toast.id), 200);
  }, [toast.id, onDismiss]);

  useEffect(() => {
    const duration = toast.duration ?? 4000;
    if (duration > 0) {
      timerRef.current = setTimeout(dismiss, duration);
    }
    return () => clearTimeout(timerRef.current);
  }, [toast.duration, dismiss]);

  return (
    <div
      className={`ui-toast ui-toast--${toast.variant}${exiting ? ' ui-toast--exit' : ''}`}
      role="alert"
    >
      {ICONS[toast.variant]}
      <div className="ui-toast__content">
        {toast.title && <div className="ui-toast__title">{toast.title}</div>}
        <div className="ui-toast__message">{toast.message}</div>
      </div>
      <button className="ui-toast__close" onClick={dismiss} aria-label={locale.dismiss} type="button">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M4 4L12 12M4 12L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

/* ── useToast hook ─────────────────────────────────────────────── */

export function useToast(options: UseToastOptions = {}) {
  const { position = 'top-right', defaultDuration = 4000 } = options;
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback(
    (data: Omit<ToastData, 'id'> & { id?: string }) => {
      const id = data.id ?? Math.random().toString(36).slice(2, 9);
      setToasts((prev) => [...prev, { ...data, id, duration: data.duration ?? defaultDuration }]);
      return id;
    },
    [defaultDuration],
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant = 'info', title?: string) =>
      addToast({ variant, message, title }),
    [addToast],
  );

  /** Toast container — render once in your app root */
  const ToastContainer = useCallback(
    () =>
      toasts.length > 0 ? (
        <div className={`ui-toast-viewport ui-toast-viewport--${position}`}>
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onDismiss={dismissToast} />
          ))}
        </div>
      ) : null,
    [toasts, position, dismissToast],
  );

  return {
    toast,
    success: (msg: string, title?: string) => addToast({ variant: 'success', message: msg, title }),
    error: (msg: string, title?: string) => addToast({ variant: 'error', message: msg, title }),
    warning: (msg: string, title?: string) => addToast({ variant: 'warning', message: msg, title }),
    info: (msg: string, title?: string) => addToast({ variant: 'info', message: msg, title }),
    dismiss: dismissToast,
    ToastContainer,
    toasts,
  };
}
