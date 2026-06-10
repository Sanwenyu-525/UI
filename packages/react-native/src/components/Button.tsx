import { Pressable, Text, ActivityIndicator, StyleSheet, type PressableProps, type ViewStyle } from 'react-native';
import { theme, type ThemeColors } from '../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  block?: boolean;
  children: string;
  style?: ViewStyle;
  colors?: ThemeColors;
}

/**
 * React Native button with variant, size, and loading support.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  block = false,
  disabled,
  children,
  style,
  colors = theme.colors,
  ...props
}: ButtonProps) {
  const s = theme.sizes[size];

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
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          height: s.height,
          paddingHorizontal: s.paddingX,
          paddingVertical: s.paddingY,
          gap: s.gap,
          backgroundColor: bgMap[variant],
          borderColor: borderColorMap[variant],
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        block && { width: '100%' as const },
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textMap[variant]} />
      ) : (
        <Text style={[styles.text, { fontSize: s.fontSize, color: textMap[variant] }]}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radii.md,
    borderWidth: 1,
  },
  text: {
    fontWeight: '500',
  },
});
