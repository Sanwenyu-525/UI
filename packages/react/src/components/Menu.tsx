import { useState, useEffect, useCallback, useRef, forwardRef, type ReactNode, type HTMLAttributes, type KeyboardEvent } from 'react';

export interface MenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  children?: MenuItem[];
  onClick?: () => void;
}

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Menu trigger element */
  trigger: ReactNode;
  /** Menu items */
  items: MenuItem[];
  /** Alignment of dropdown */
  align?: 'left' | 'right';
  /** Callback when menu closes */
  onClose?: () => void;
}

export interface MenuDividerProps {
  className?: string;
}

/**
 * Dropdown menu with keyboard navigation support.
 */
export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ trigger, items, align = 'left', onClose, className = '', ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const menuRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

    const close = useCallback(() => {
      setIsOpen(false);
      setFocusedIndex(-1);
      onClose?.();
    }, [onClose]);

    const toggle = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (!isOpen) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
          return;
        }

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setFocusedIndex((prev) => (prev + 1) % items.length);
            break;
          case 'ArrowUp':
            e.preventDefault();
            setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            if (focusedIndex >= 0) {
              const item = items[focusedIndex];
              if (!item.disabled && item.onClick) {
                item.onClick();
              }
              close();
            }
            break;
          case 'Escape':
            e.preventDefault();
            close();
            break;
          case 'Home':
            e.preventDefault();
            setFocusedIndex(0);
            break;
          case 'End':
            e.preventDefault();
            setFocusedIndex(items.length - 1);
            break;
        }
      },
      [isOpen, items, focusedIndex, toggle, close]
    );

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          close();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, close]);

    useEffect(() => {
      if (isOpen && focusedIndex >= 0 && itemsRef.current[focusedIndex]) {
        itemsRef.current[focusedIndex]?.focus();
      }
    }, [isOpen, focusedIndex]);

    return (
      <div
        ref={ref}
        className={`ui-menu ${className}`}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <div
          className="ui-menu__trigger"
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggle();
            }
          }}
          role="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          tabIndex={0}
        >
          {trigger}
        </div>

        <div
          ref={menuRef}
          className={`ui-menu__dropdown ${isOpen ? 'ui-menu__dropdown--open' : ''} ${
            align === 'right' ? 'ui-menu__dropdown--right' : ''
          }`}
          role="menu"
          aria-orientation="vertical"
        >
          <ul className="ui-menu__list">
            {items.map((item, index) => (
              <li key={item.id}>
                {item.children ? (
                  <div className="ui-menu__item ui-menu__item--has-submenu">
                    <span className="ui-menu__icon">{item.icon}</span>
                    <span className="ui-menu__label">{item.label}</span>
                    <svg
                      className="ui-menu__submenu-arrow"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 2L8 6L4 10" />
                    </svg>
                    <div className="ui-menu__submenu">
                      <ul className="ui-menu__list">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <button
                              className={`ui-menu__item ${child.disabled ? 'ui-menu__item--disabled' : ''} ${
                                child.danger ? 'ui-menu__item--danger' : ''
                              }`}
                              role="menuitem"
                              disabled={child.disabled}
                              onClick={() => {
                                if (!child.disabled && child.onClick) {
                                  child.onClick();
                                }
                                close();
                              }}
                            >
                              {child.icon && <span className="ui-menu__icon">{child.icon}</span>}
                              <span className="ui-menu__label">{child.label}</span>
                              {child.shortcut && <span className="ui-menu__shortcut">{child.shortcut}</span>}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <button
                    ref={(el) => {
                      itemsRef.current[index] = el;
                    }}
                    className={`ui-menu__item ${item.disabled ? 'ui-menu__item--disabled' : ''} ${
                      item.danger ? 'ui-menu__item--danger' : ''
                    } ${focusedIndex === index ? 'ui-menu__item--focused' : ''}`}
                    role="menuitem"
                    disabled={item.disabled}
                    onClick={() => {
                      if (!item.disabled && item.onClick) {
                        item.onClick();
                      }
                      close();
                    }}
                    onMouseEnter={() => setFocusedIndex(index)}
                  >
                    {item.icon && <span className="ui-menu__icon">{item.icon}</span>}
                    <span className="ui-menu__label">{item.label}</span>
                    {item.shortcut && <span className="ui-menu__shortcut">{item.shortcut}</span>}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);

Menu.displayName = 'Menu';

/** Visual separator between menu items. */
export function MenuDivider({ className = '' }: MenuDividerProps) {
  return <div className={`ui-menu__divider ${className}`} role="separator" />;
}
