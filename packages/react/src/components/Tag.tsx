import { type HTMLAttributes, type ReactNode } from 'react';

export type TagVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  size?: TagSize;
  /** Show close button */
  closable?: boolean;
  /** Close callback */
  onClose?: () => void;
  children: ReactNode;
}

/** Inline label / attribute pill. */
export function Tag({
  variant = 'default',
  size = 'md',
  closable,
  onClose,
  className = '',
  children,
  ...props
}: TagProps) {
  const classes = [
    'ui-tag',
    `ui-tag--${variant}`,
    size !== 'md' && `ui-tag--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {children}
      {closable && (
        <button className="ui-tag__close" onClick={onClose} aria-label="Remove" type="button">
          <svg viewBox="0 0 12 12" fill="none"><path d="M3 3L9 9M3 9L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      )}
    </span>
  );
}
