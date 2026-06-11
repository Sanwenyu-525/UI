import { View, StyleSheet, type ViewStyle } from 'react-native';

export interface IconProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

function CloseIcon({ size = 16, color = '#000000', style }: IconProps) {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <View
        style={[
          styles.line,
          styles.lineDiagonal1,
          {
            width: size * 0.7,
            height: 2,
            backgroundColor: color,
            transform: [{ rotate: '45deg' }],
          },
        ]}
      />
      <View
        style={[
          styles.line,
          styles.lineDiagonal2,
          {
            width: size * 0.7,
            height: 2,
            backgroundColor: color,
            transform: [{ rotate: '-45deg' }],
          },
        ]}
      />
    </View>
  );
}

function CheckIcon({ size = 16, color = '#000000', style }: IconProps) {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <View
        style={[
          styles.line,
          styles.checkLine1,
          {
            width: size * 0.3,
            height: 2,
            backgroundColor: color,
            transform: [{ rotate: '45deg' }],
          },
        ]}
      />
      <View
        style={[
          styles.line,
          styles.checkLine2,
          {
            width: size * 0.55,
            height: 2,
            backgroundColor: color,
            transform: [{ rotate: '-45deg' }],
          },
        ]}
      />
    </View>
  );
}

function WarningIcon({ size = 16, color = '#000000', style }: IconProps) {
  const borderWidth = size * 0.08;
  return (
    <View
      style={[
        styles.triangle,
        {
          width: 0,
          height: 0,
          borderLeftWidth: size * 0.5,
          borderRightWidth: size * 0.5,
          borderBottomWidth: size * 0.87,
          borderBottomColor: color,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
        },
        style,
      ]}
    />
  );
}

function InfoIcon({ size = 16, color = '#000000', style }: IconProps) {
  const dotSize = size * 0.2;
  const barHeight = size * 0.35;
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <View
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: color,
          marginBottom: 2,
        }}
      />
      <View
        style={{
          width: 2,
          height: barHeight,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

function ChevronDownIcon({ size = 16, color = '#000000', style }: IconProps) {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <View
        style={{
          width: size * 0.5,
          height: 2,
          backgroundColor: color,
          transform: [{ rotate: '45deg' }, { translateY: -size * 0.1 }],
        }}
      />
      <View
        style={{
          width: size * 0.5,
          height: 2,
          backgroundColor: color,
          transform: [{ rotate: '-45deg' }, { translateY: -size * 0.1 }],
        }}
      />
    </View>
  );
}

function ChevronUpIcon({ size = 16, color = '#000000', style }: IconProps) {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <View
        style={{
          width: size * 0.5,
          height: 2,
          backgroundColor: color,
          transform: [{ rotate: '-45deg' }, { translateY: size * 0.1 }],
        }}
      />
      <View
        style={{
          width: size * 0.5,
          height: 2,
          backgroundColor: color,
          transform: [{ rotate: '45deg' }, { translateY: size * 0.1 }],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
  },
  checkLine1: {
    left: '25%',
    top: '40%',
  },
  checkLine2: {
    left: '15%',
    top: '55%',
  },
});

export const Icons = {
  Close: CloseIcon,
  Check: CheckIcon,
  Warning: WarningIcon,
  Info: InfoIcon,
  ChevronDown: ChevronDownIcon,
  ChevronUp: ChevronUpIcon,
};
