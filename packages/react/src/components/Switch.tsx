import { forwardRef, type InputHTMLAttributes } from 'react';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label text */
  label?: string;
  /** Description below label */
  description?: string;
}

/**
 * Toggle switch for boolean on/off state.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, disabled, className = '', id, ...props }, ref) => {
    return (
      <label
        className={`ui-switch${disabled ? ' ui-switch--disabled' : ''} ${className}`}
        htmlFor={id}
      >
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className="ui-switch__input"
          role="switch"
          disabled={disabled}
          {...props}
        />
        <span className="ui-switch__track">
          <span className="ui-switch__thumb" />
        </span>
        {(label || description) && (
          <span>
            {label && <span className="ui-switch__label">{label}</span>}
            {description && <span className="ui-switch__description">{description}</span>}
          </span>
        )}
      </label>
    );
  },
);

Switch.displayName = 'Switch';
