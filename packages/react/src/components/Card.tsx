import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export type CardVariant = 'elevated' | 'outlined' | 'flat';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: CardVariant;
  /** Make card clickable */
  clickable?: boolean;
  /** Card content */
  children: ReactNode;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: ReactNode;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Content container with optional header, body, and footer sections.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'elevated', clickable = false, className = '', children, ...props }, ref) => {
    const classes = [
      'ui-card',
      `ui-card--${variant}`,
      clickable && 'ui-card--clickable',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        tabIndex={clickable ? 0 : undefined}
        role={clickable ? 'button' : undefined}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

/** Card header with title, optional description, and action slot. */
export function CardHeader({ title, description, action, className = '', ...props }: CardHeaderProps) {
  return (
    <div className={`ui-card__header ${className}`} {...props}>
      <div>
        <h3 className="ui-card__title">{title}</h3>
        {description && <p className="ui-card__description">{description}</p>}
      </div>
      {action}
    </div>
  );
}

/** Card body — main content area. */
export function CardBody({ className = '', children, ...props }: CardBodyProps) {
  return (
    <div className={`ui-card__body ${className}`} {...props}>
      {children}
    </div>
  );
}

/** Card footer — typically for actions. */
export function CardFooter({ className = '', children, ...props }: CardFooterProps) {
  return (
    <div className={`ui-card__footer ${className}`} {...props}>
      {children}
    </div>
  );
}
