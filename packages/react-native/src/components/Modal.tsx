import { type ReactNode } from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { theme, type ThemeColors } from '../theme';
import { Icons } from '../Icons';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  closeOnOverlay?: boolean;
  footer?: ReactNode;
  children: ReactNode;
  style?: ViewStyle;
  colors?: ThemeColors;
}

const sizeMap: Record<ModalSize, { width: number; maxWidth: number }> = {
  sm: { width: 400, maxWidth: '90%' },
  md: { width: 500, maxWidth: '90%' },
  lg: { width: 600, maxWidth: '90%' },
  xl: { width: 800, maxWidth: '95%' },
};

/**
 * React Native modal dialog with overlay, title, body, and footer.
 */
export function Modal({
  open,
  onClose,
  title,
  size = 'md',
  closeOnOverlay = true,
  footer,
  children,
  style,
  colors = theme.colors,
}: ModalProps) {
  return (
    <RNModal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      accessibilityViewIsModal
    >
      <Pressable
        style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}
        onPress={closeOnOverlay ? onClose : undefined}
      >
        <Pressable
          style={[
            styles.modal,
            {
              width: sizeMap[size].width,
              maxWidth: sizeMap[size].maxWidth,
              backgroundColor: colors.surface,
            },
            style,
          ]}
          onPress={(e) => e.stopPropagation()}
          accessibilityRole="dialog"
          accessibilityLabel={title}
        >
          {title && (
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
              <Pressable
                onPress={onClose}
                style={styles.closeButton}
                accessibilityRole="button"
                accessibilityLabel="Close"
              >
                <Icons.Close size={18} color={colors.textSecondary} />
              </Pressable>
            </View>
          )}

          <View style={styles.body}>{children}</View>

          {footer && <View style={styles.footer}>{footer}</View>}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modal: {
    borderRadius: 12,
    maxHeight: '80%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  body: {
    padding: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
});
