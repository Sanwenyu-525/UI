import { type HTMLAttributes, type ReactNode } from 'react';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /** Visual style */
  variant?: 'solid' | 'dashed';
  /** Optional center label */
  label?: string;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
}

/** Visual separator between content sections. */
export function Divider({
  variant = 'solid',
  label,
  orientation = 'horizontal',
  className = '',
  ...props
}: DividerProps) {
  if (orientation === 'vertical') {
    return <hr className={`ui-divider ui-divider--vertical ${className}`} {...props} />;
  }

  if (label) {
    return (
      <div className={`ui-divider ui-divider--with-label ${className}`} role="separator" {...props}>
        <span className="ui-divider__label">{label}</span>
      </div>
    );
  }

  return (
    <hr
      className={`ui-divider${variant === 'dashed' ? ' ui-divider--dashed' : ''} ${className}`}
      {...props}
    />
  );
}
