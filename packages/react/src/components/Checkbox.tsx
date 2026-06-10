import { forwardRef, type InputHTMLAttributes } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label text */
  label?: string;
  /** Description below label */
  description?: string;
  /** Indeterminate state (visual only — set via ref) */
  indeterminate?: boolean;
}

/**
 * Checkbox with label and indeterminate support.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, indeterminate, disabled, className = '', id, ...props }, ref) => {
    return (
      <label
        className={`ui-checkbox${disabled ? ' ui-checkbox--disabled' : ''} ${className}`}
        htmlFor={id}
      >
        <input
          ref={(el) => {
            if (el) el.indeterminate = !!indeterminate;
            if (typeof ref === 'function') ref(el);
            else if (ref) ref.current = el;
          }}
          type="checkbox"
          id={id}
          className="ui-checkbox__input"
          disabled={disabled}
          {...props}
        />
        <span className="ui-checkbox__control">
          <svg className="ui-checkbox__icon ui-checkbox__icon--check" viewBox="0 0 16 16" fill="none">
            <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="ui-checkbox__icon ui-checkbox__icon--minus" viewBox="0 0 16 16" fill="none">
            <path d="M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        {(label || description) && (
          <span>
            {label && <span className="ui-checkbox__label">{label}</span>}
            {description && <span className="ui-checkbox__description">{description}</span>}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
