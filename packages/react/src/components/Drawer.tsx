import { useEffect, useCallback, type ReactNode, type MouseEvent } from 'react';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  position?: DrawerPosition;
  size?: DrawerSize;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  headerAction?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Slide-in side panel. */
export function Drawer({
  open,
  onClose,
  title,
  position = 'right',
  size = 'md',
  closeOnOverlay = true,
  closeOnEscape = true,
  headerAction,
  footer,
  children,
  className = '',
}: DrawerProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') onClose();
    },
    [closeOnEscape, onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  const handleOverlayClick = (e: MouseEvent) => {
    if (closeOnOverlay && e.target === e.currentTarget) onClose();
  };

  const isHorizontal = position === 'left' || position === 'right';

  const drawerClasses = [
    'ui-drawer',
    `ui-drawer--${position}`,
    isHorizontal && `ui-drawer--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`ui-drawer-overlay${open ? ' ui-drawer-overlay--open' : ''}`}
      onClick={handleOverlayClick}
      style={{ display: open ? undefined : 'none' }}
    >
      <div className={drawerClasses} role="dialog" aria-modal="true" aria-label={title}>
        {(title || headerAction) && (
          <div className="ui-drawer__header">
            {title && <h2 className="ui-drawer__title">{title}</h2>}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              {headerAction}
              <button className="ui-drawer__close" onClick={onClose} aria-label="Close" type="button">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4L12 12M4 12L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        )}
        <div className="ui-drawer__body">{children}</div>
        {footer && <div className="ui-drawer__footer">{footer}</div>}
      </div>
    </div>
  );
}
