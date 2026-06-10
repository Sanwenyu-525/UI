import { View, Text, type ViewProps } from 'react-native';
import { theme, type ThemeColors } from '../theme';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends ViewProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: string;
  colors?: ThemeColors;
}

/**
 * Inline status or label badge.
 */
export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  style,
  colors = theme.colors,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:  { bg: colors.bgMuted, text: colors.textSecondary, border: colors.border },
    primary:  { bg: colors.primary + '20', text: colors.primary, border: colors.primary + '30' },
    success:  { bg: colors.success + '20', text: colors.success, border: colors.success + '30' },
    warning:  { bg: colors.warning + '20', text: colors.warning, border: colors.warning + '30' },
    error:    { bg: colors.error + '20', text: colors.error, border: colors.error + '30' },
    info:     { bg: colors.info + '20', text: colors.info, border: colors.info + '30' },
  };

  const sizeMap = {
    sm: { py: 0, px: 4, fontSize: 10, dot: 4 },
    md: { py: 2, px: 8, fontSize: 12, dot: 6 },
    lg: { py: 4, px: 12, fontSize: 14, dot: 8 },
  };

  const v = variantStyles[variant];
  const s = sizeMap[size];

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          paddingVertical: s.py,
          paddingHorizontal: s.px,
          backgroundColor: v.bg,
          borderWidth: 1,
          borderColor: v.border,
          borderRadius: theme.radii.full,
        },
        style,
      ]}
      accessibilityRole="text"
      {...props}
    >
      {dot && (
        <View
          style={{
            width: s.dot,
            height: s.dot,
            borderRadius: theme.radii.full,
            backgroundColor: v.text,
          }}
        />
      )}
      <Text style={{ fontSize: s.fontSize, fontWeight: '500', color: v.text }}>
        {children}
      </Text>
    </View>
  );
}
