import { useState, useCallback } from 'react';
import { View, Text, Pressable, Modal, type ViewProps } from 'react-native';
import { theme, type ThemeColors } from '../theme';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export interface MenuProps extends ViewProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  align?: 'left' | 'right';
  onClose?: () => void;
  colors?: ThemeColors;
}

/**
 * Dropdown menu with keyboard navigation support.
 */
export function Menu({
  trigger,
  items,
  align = 'left',
  onClose,
  style,
  colors = theme.colors,
  ...props
}: MenuProps & { colors?: ThemeColors }) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleItemPress = useCallback(
    (item: MenuItem) => {
      if (!item.disabled && item.onClick) {
        item.onClick();
      }
      close();
    },
    [close]
  );

  return (
    <View style={[{ position: 'relative' }, style]} {...props}>
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        accessibilityHasPopup
      >
        {trigger}
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable style={{ flex: 1 }} onPress={close}>
          <View
            style={{
              position: 'absolute',
              top: '50%',
              [align === 'right' ? 'right' : 'left']: 16,
              minWidth: 200,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: theme.radii.lg,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 8,
              padding: 4,
            }}
            accessibilityRole="menu"
          >
            {items.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => handleItemPress(item)}
                disabled={item.disabled}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: theme.radii.md,
                  opacity: item.disabled ? 0.5 : 1,
                  backgroundColor: 'transparent',
                }}
                accessibilityRole="menuitem"
                accessibilityState={{ disabled: item.disabled }}
              >
                {item.icon && (
                  <View style={{ width: 16, height: 16 }}>
                    {item.icon}
                  </View>
                )}
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: item.danger ? colors.error : colors.textPrimary,
                  }}
                >
                  {item.label}
                </Text>
                {item.shortcut && (
                  <Text style={{ fontSize: 12, color: colors.textTertiary }}>
                    {item.shortcut}
                  </Text>
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

/** Visual separator between menu items. */
export function MenuDivider({ style }: { style?: ViewProps['style'] }) {
  return (
    <View
      style={[{ height: 1, backgroundColor: theme.colors.border, marginVertical: 4 }, style]}
      accessibilityRole="separator"
    />
  );
}
