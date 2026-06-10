import { Pressable, View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { theme, type ThemeColors } from '../theme';

export interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  colors?: ThemeColors;
  style?: ViewStyle;
}

const TRACK_WIDTH = 44;
const TRACK_HEIGHT = 24;
const THUMB_SIZE = TRACK_HEIGHT - 4; // 2px padding each side
const THUMB_OFFSET = TRACK_WIDTH - THUMB_SIZE - 4;

/**
 * Toggle switch for boolean on/off state.
 */
export function Switch({
  value,
  onValueChange,
  label,
  description,
  disabled = false,
  colors = theme.colors,
  style,
}: SwitchProps) {
  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      style={[styles.wrapper, disabled && { opacity: 0.5 }, style]}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
    >
      <View
        style={[
          styles.track,
          {
            backgroundColor: value ? colors.primary : colors.bgMuted,
            borderColor: value ? colors.primary : colors.border,
          },
        ]}
      >
        <View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: value ? THUMB_OFFSET : 0 }],
            },
          ]}
        />
      </View>
      {(label || description) && (
        <View style={styles.textWrapper}>
          {label && <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>}
          {description && (
            <Text style={[styles.description, { color: colors.textTertiary }]}>{description}</Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    borderWidth: 1,
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  textWrapper: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
  },
});
