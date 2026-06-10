import { type HTMLAttributes, type ReactNode } from 'react';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual variant */
  variant?: BadgeVariant;
  /** Size preset */
  size?: BadgeSize;
  /** Show dot indicator before text */
  dot?: boolean;
  /** Badge content */
  children: ReactNode;
}

/**
 * Inline status or label badge.
 */
export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
  children,
  ...props
}: BadgeProps) {
  const classes = [
    'ui-badge',
    `ui-badge--${variant}`,
    size !== 'md' && `ui-badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {dot && <span className="ui-badge__dot" />}
      {children}
    </span>
  );
}
