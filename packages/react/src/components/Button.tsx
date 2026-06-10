import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

/** Button visual variant */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

/** Button size */
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Stretch to full container width */
  block?: boolean;
  /** Icon-only mode — requires `aria-label` */
  iconOnly?: boolean;
  /** Button content */
  children: ReactNode;
}

/**
 * Primary interactive button.
 *
 * Supports four variants (primary, secondary, ghost, destructive),
 * three sizes, loading state, and icon-only mode.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      block = false,
      iconOnly = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref,
  ) => {
    const classes = [
      'ui-btn',
      `ui-btn--${variant}`,
      size !== 'md' && `ui-btn--${size}`,
      loading && 'ui-btn--loading',
      block && 'ui-btn--block',
      iconOnly && 'ui-btn--icon-only',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
