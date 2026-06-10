import { View, Text, Pressable, type ViewProps, type ViewStyle } from 'react-native';
import { theme, type ThemeColors } from '../theme';

export type CardVariant = 'elevated' | 'outlined' | 'flat';

export interface CardProps extends ViewProps {
  variant?: CardVariant;
  onPress?: () => void;
  colors?: ThemeColors;
}

export interface CardHeaderProps {
  title: string;
  description?: string;
  colors?: ThemeColors;
}

/**
 * Content container with optional press handler.
 */
export function Card({
  variant = 'elevated',
  onPress,
  style,
  colors = theme.colors,
  children,
  ...props
}: CardProps) {
  const variantStyles: Record<CardVariant, ViewStyle> = {
    elevated: {
      backgroundColor: colors.surfaceElevated,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    outlined: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    flat: {
      backgroundColor: colors.bgSubtle,
    },
  };

  const content = (
    <View
      style={[
        {
          borderRadius: theme.radii.lg,
          overflow: 'hidden',
        },
        variantStyles[variant],
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

/** Card header with title and optional description. */
export function CardHeader({ title, description, colors = theme.colors }: CardHeaderProps) {
  return (
    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border }}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary }}>{title}</Text>
      {description && (
        <Text style={{ fontSize: 14, color: colors.textSecondary, marginTop: 4 }}>
          {description}
        </Text>
      )}
    </View>
  );
}

/** Card body — main content area. */
export function CardBody({ style, children, ...props }: ViewProps) {
  return (
    <View style={[{ padding: 16 }, style]} {...props}>
      {children}
    </View>
  );
}

/** Card footer. */
export function CardFooter({ style, children, ...props }: ViewProps) {
  return (
    <View
      style={[
        { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, padding: 12, borderTopWidth: 1 },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
