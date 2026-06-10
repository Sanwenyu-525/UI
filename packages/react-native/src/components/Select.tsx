import { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { theme, type ThemeColors } from '../theme';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
  colors?: ThemeColors;
}

/**
 * React Native select dropdown with custom styling.
 */
export function Select({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Select...',
  label,
  disabled = false,
  style,
  colors = theme.colors,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);

  const value = controlledValue ?? internalValue;
  const selectedOption = options.find((o) => o.value === value);

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(optionValue);
      }
      onChange?.(optionValue);
      setOpen(false);
    },
    [controlledValue, onChange],
  );

  const toggleOpen = useCallback(() => {
    if (!disabled) {
      setOpen(!open);
    }
  }, [open, disabled]);

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      )}

      <Pressable
        onPress={toggleOpen}
        disabled={disabled}
        style={[
          styles.trigger,
          {
            backgroundColor: colors.surface,
            borderColor: open ? colors.primary : colors.border,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
        accessibilityRole="combobox"
        accessibilityState={{ disabled, expanded: open }}
        accessibilityValue={{ text: selectedOption?.label }}
      >
        <Text
          style={[
            styles.triggerText,
            {
              color: selectedOption ? colors.textPrimary : colors.textSecondary,
            },
          ]}
        >
          {selectedOption?.label || placeholder}
        </Text>
        <Text style={[styles.arrow, { color: colors.textSecondary }]}>
          {open ? '▲' : '▼'}
        </Text>
      </Pressable>

      {open && (
        <View
          style={[
            styles.dropdown,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
          accessibilityRole="listbox"
        >
          <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled>
            {options.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => !option.disabled && handleSelect(option.value)}
                disabled={option.disabled}
                style={[
                  styles.option,
                  option.value === value && {
                    backgroundColor: `${colors.primary}15`,
                  },
                  option.disabled && styles.optionDisabled,
                ]}
                accessibilityRole="option"
                accessibilityState={{
                  selected: option.value === value,
                  disabled: option.disabled,
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: option.disabled
                        ? colors.textSecondary
                        : option.value === value
                        ? colors.primary
                        : colors.textPrimary,
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  trigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  triggerText: {
    fontSize: 14,
    flex: 1,
  },
  arrow: {
    fontSize: 12,
    marginLeft: 8,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
    zIndex: 9999,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 14,
  },
});
