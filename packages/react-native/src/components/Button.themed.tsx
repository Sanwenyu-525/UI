import { Pressable, Text, ActivityIndicator, StyleSheet, type PressableProps, type ViewStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  block?: boolean;
  children: string;
  style?: ViewStyle;
}

/**
 * React Native button with variant, size, and loading support.
 * Uses ThemeProvider for dynamic theming.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  block = false,
  disabled,
  children,
  style,
  ...props
}: ButtonProps) {
  const { colors } = useTheme();
  const s = sizes[size];

  const bgMap: Record<ButtonVariant, string> = {
    primary: colors.primary,
    secondary: colors.surface,
    ghost: 'transparent',
    destructive: colors.error,
  };

  const textMap: Record<ButtonVariant, string> = {
    primary: colors.textOnPrimary,
    secondary: colors.textPrimary,
    ghost: colors.textSecondary,
    destructive: '#ffffff',
  };

  const borderColorMap: Record<ButtonVariant, string> = {
    primary: colors.primary,
    secondary: colors.borderStrong,
    ghost: 'transparent',
    destructive: colors.error,
  };

  return (
    <Pressable
      style={[
        styles.button,
        {
          height: s.height,
          paddingHorizontal: s.paddingX,
          backgroundColor: bgMap[variant],
          borderColor: borderColorMap[variant],
          opacity: disabled || loading ? 0.5 : 1,
        },
        block && styles.block,
        style,
      ]}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: loading }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textMap[variant]} />
      ) : (
        <Text style={[styles.text, { color: textMap[variant], fontSize: s.fontSize }]}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}

const sizes = {
  sm: { height: 32, paddingX: 12, fontSize: 14 },
  md: { height: 40, paddingX: 16, fontSize: 14 },
  lg: { height: 48, paddingX: 20, fontSize: 16 },
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  block: {
    width: '100%',
  },
  text: {
    fontWeight: '600',
  },
});
