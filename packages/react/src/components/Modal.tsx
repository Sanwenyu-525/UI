import { useEffect, useCallback, type ReactNode, type MouseEvent } from 'react';
import { useLocale } from './LocaleProvider';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  /** Controls visibility */
  open: boolean;
  /** Called when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Size preset */
  size?: ModalSize;
  /** Close when clicking overlay */
  closeOnOverlay?: boolean;
  /** Close on Escape key */
  closeOnEscape?: boolean;
  /** Header action slot (top-right) */
  headerAction?: ReactNode;
  /** Footer content (typically action buttons) */
  footer?: ReactNode;
  /** Body content */
  children: ReactNode;
  /** Additional class on modal container */
  className?: string;
}

/**
 * Modal dialog with overlay, header, body, and footer.
 */
export function Modal({
  open,
  onClose,
  title,
  size = 'md',
  closeOnOverlay = true,
  closeOnEscape = true,
  headerAction,
  footer,
  children,
  className = '',
}: ModalProps) {
  const locale = useLocale();
  // Escape key handler
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

  const modalClasses = ['ui-modal', `ui-modal--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`ui-modal-overlay${open ? ' ui-modal-overlay--open' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{ display: open ? undefined : 'none' }}
    >
      <div className={modalClasses}>
        {(title || headerAction) && (
          <div className="ui-modal__header">
            {title && <h2 className="ui-modal__title">{title}</h2>}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              {headerAction}
              <button
                className="ui-modal__close"
                onClick={onClose}
                aria-label={locale.close}
                type="button"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4L12 12M4 12L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="ui-modal__body">{children}</div>

        {footer && <div className="ui-modal__footer">{footer}</div>}
      </div>
    </div>
  );
}
