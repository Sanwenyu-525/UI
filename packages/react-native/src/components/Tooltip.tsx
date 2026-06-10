import { useState, useRef, useCallback, useEffect, type ReactNode } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { theme, type ThemeColors } from '../theme';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  style?: ViewStyle;
  colors?: ThemeColors;
}

/**
 * React Native tooltip that shows on long press.
 */
export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 500,
  style,
  colors = theme.colors,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const positionStyle = getPositionStyle(position);

  return (
    <View style={[styles.container, style]}>
      <Pressable
        onLongPress={show}
        onPressOut={hide}
        delayLongPress={delay}
      >
        {children}
      </Pressable>

      {visible && (
        <View
          style={[
            styles.tooltip,
            positionStyle,
            { backgroundColor: colors.textPrimary },
          ]}
          accessibilityRole="text"
        >
          <Text style={[styles.content, { color: colors.surface }]}>
            {content}
          </Text>
        </View>
      )}
    </View>
  );
}

function getPositionStyle(position: 'top' | 'bottom' | 'left' | 'right'): ViewStyle {
  switch (position) {
    case 'top':
      return {
        bottom: '100%',
        alignSelf: 'center',
        marginBottom: 8,
      };
    case 'bottom':
      return {
        top: '100%',
        alignSelf: 'center',
        marginTop: 8,
      };
    case 'left':
      return {
        right: '100%',
        alignSelf: 'center',
        marginRight: 8,
      };
    case 'right':
      return {
        left: '100%',
        alignSelf: 'center',
        marginLeft: 8,
      };
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  tooltip: {
    position: 'absolute',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    maxWidth: 200,
    zIndex: 9999,
  },
  content: {
    fontSize: 12,
    textAlign: 'center',
  },
});
