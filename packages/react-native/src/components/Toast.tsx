import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { theme, type ThemeColors } from '../theme';
import { Icons } from '../Icons';

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
  duration?: number;
}

export interface ToastItemProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
  colors: ThemeColors;
}

export interface UseToastOptions {
  position?: ToastPosition;
  defaultDuration?: number;
  colors?: ThemeColors;
}

const ICONS: Record<ToastVariant, typeof Icons.Check> = {
  success: Icons.Check,
  error: Icons.Close,
  warning: Icons.Warning,
  info: Icons.Info,
};

const VARIANT_COLORS: Record<ToastVariant, { bg: string; border: string; icon: string }> = {
  success: { bg: '#ecfdf5', border: '#10b981', icon: '#10b981' },
  error: { bg: '#fef2f2', border: '#ef4444', icon: '#ef4444' },
  warning: { bg: '#fffbeb', border: '#f59e0b', icon: '#f59e0b' },
  info: { bg: '#eff6ff', border: '#3b82f6', icon: '#3b82f6' },
};

function ToastItem({ toast, onDismiss, colors }: ToastItemProps) {
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

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

  const variantStyle = VARIANT_COLORS[toast.variant];

  return (
    <View
      style={[
        styles.toast,
        {
          backgroundColor: variantStyle.bg,
          borderColor: variantStyle.border,
          opacity: exiting ? 0 : 1,
          transform: [{ translateY: exiting ? -20 : 0 }],
        },
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <View style={[styles.icon, { color: variantStyle.icon }]}>
        {ICONS[toast.variant]({ size: 18, color: variantStyle.icon })}
      </View>
      <View style={styles.content}>
        {toast.title && <Text style={[styles.title, { color: colors.textPrimary }]}>{toast.title}</Text>}
        <Text style={[styles.message, { color: colors.textSecondary }]}>{toast.message}</Text>
      </View>
      <Pressable
        onPress={dismiss}
        style={styles.closeButton}
        accessibilityRole="button"
        accessibilityLabel="Dismiss"
      >
        <Icons.Close size={14} color={colors.textSecondary} />
      </Pressable>
    </View>
  );
}

export function useToast(options: UseToastOptions = {}) {
  const { position = 'top-right', defaultDuration = 4000, colors = theme.colors } = options;
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

  const ToastContainer = useCallback(() => {
    const positionStyle = getPositionStyle(position);

    return (
      <View style={[styles.container, positionStyle]}>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismissToast} colors={colors} />
        ))}
      </View>
    );
  }, [toasts, position, dismissToast, colors]);

  return { toast, dismissToast, ToastContainer, toasts };
}

function getPositionStyle(position: ToastPosition): ViewStyle {
  const base: ViewStyle = {
    position: 'absolute',
    zIndex: 9999,
    gap: 8,
  };

  switch (position) {
    case 'top-right':
      return { ...base, top: 48, right: 16 };
    case 'top-left':
      return { ...base, top: 48, left: 16 };
    case 'bottom-right':
      return { ...base, bottom: 16, right: 16 };
    case 'bottom-left':
      return { ...base, bottom: 16, left: 16 };
    case 'top-center':
      return { ...base, top: 48, alignSelf: 'center' };
    case 'bottom-center':
      return { ...base, bottom: 16, alignSelf: 'center' };
  }
}

const styles = StyleSheet.create({
  container: {
    width: 380,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    fontSize: 18,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  message: {
    fontSize: 13,
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
});
