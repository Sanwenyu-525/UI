import { View, Text, TextInput, type TextInputProps, type ViewStyle } from 'react-native';
import { theme, type ThemeColors } from '../theme';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  size?: InputSize;
  error?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  style?: ViewStyle;
  colors?: ThemeColors;
}

/**
 * React Native text input with label and error handling.
 */
export function Input({
  size = 'md',
  error = false,
  label,
  helperText,
  errorMessage,
  required,
  style,
  colors = theme.colors,
  editable = true,
  ...props
}: InputProps) {
  const s = theme.sizes[size];

  return (
    <View style={[fieldStyles.wrapper, style]}>
      {label && (
        <Text style={[fieldStyles.label, { color: colors.textPrimary }]}>
          {label}
          {required && <Text style={{ color: colors.error }}> *</Text>}
        </Text>
      )}

      <View
        style={[
          inputStyles.base,
          {
            height: s.height,
            paddingHorizontal: s.paddingX,
            borderColor: error ? colors.error : colors.border,
            backgroundColor: editable ? colors.bg : colors.bgMuted,
          },
        ]}
      >
        <TextInput
          style={[
            inputStyles.input,
            { fontSize: s.fontSize, color: colors.textPrimary },
          ]}
          placeholderTextColor={colors.textTertiary}
          editable={editable}
          accessibilityState={{ disabled: !editable }}
          accessibilityInvalid={error}
          {...props}
        />
      </View>

      {errorMessage ? (
        <Text style={[fieldStyles.helper, { color: colors.error }]}>{errorMessage}</Text>
      ) : helperText ? (
        <Text style={[fieldStyles.helper, { color: colors.textTertiary }]}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const fieldStyles = {
  wrapper: { gap: 4 } as ViewStyle,
  label: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  helper: {
    fontSize: 12,
    lineHeight: 16,
  },
};

const inputStyles = {
  base: {
    borderWidth: 1,
    borderRadius: theme.radii.md,
    justifyContent: 'center' as const,
  },
  input: {
    flex: 1,
    padding: 0, // RN TextInput has default padding
  },
};
