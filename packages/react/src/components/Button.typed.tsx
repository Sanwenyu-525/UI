import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { BUTTON } from '@ui/css/class-names';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  block?: boolean;
}

/**
 * React button component with type-safe class names.
 * Uses generated constants from CSS for compile-time checking.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      block = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      BUTTON.base,
      BUTTON[variant],
      BUTTON[size],
      loading && BUTTON.loading,
      disabled && BUTTON.disabled,
      block && BUTTON.block,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <span className={BUTTON.loading}>Loading...</span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
