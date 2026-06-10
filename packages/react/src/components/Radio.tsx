import { forwardRef, createContext, useContext, type InputHTMLAttributes, type ReactNode } from 'react';

/* ── Radio Group ───────────────────────────────────────────────── */

export interface RadioGroupProps {
  /** Group label */
  label?: string;
  /** Layout direction */
  direction?: 'vertical' | 'horizontal';
  /** Group name (shared across radios) */
  name: string;
  /** Currently selected value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Radio items */
  children: ReactNode;
  /** Disabled all */
  disabled?: boolean;
  className?: string;
}

const RadioGroupContext = createContext<{
  name: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}>({ name: '' });

/**
 * Group of radio buttons with shared state.
 */
export function RadioGroup({
  label,
  direction = 'vertical',
  name,
  value,
  defaultValue,
  onChange,
  disabled,
  className = '',
  children,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name, value, disabled, onChange }}>
      <fieldset
        className={`ui-radio-group${direction === 'horizontal' ? ' ui-radio-group--horizontal' : ''} ${className}`}
        role="radiogroup"
        aria-label={label}
      >
        {label && <legend className="ui-radio-group__label">{label}</legend>}
        {children}
      </fieldset>
    </RadioGroupContext.Provider>
  );
}

/* ── Radio item ────────────────────────────────────────────────── */

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label text */
  label?: string;
  /** Description below label */
  description?: string;
  /** The value of this radio option */
  value: string;
}

/**
 * Single radio option, used inside RadioGroup.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, value, disabled, className = '', id, ...props }, ref) => {
    const ctx = useContext(RadioGroupContext);
    const isDisabled = disabled || ctx.disabled;
    const isChecked = ctx.value === value;

    return (
      <label
        className={`ui-radio${isDisabled ? ' ui-radio--disabled' : ''} ${className}`}
        htmlFor={id}
      >
        <input
          ref={ref}
          type="radio"
          id={id}
          name={ctx.name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          className="ui-radio__input"
          onChange={() => ctx.onChange?.(value)}
          {...props}
        />
        <span className="ui-radio__control" />
        {(label || description) && (
          <span>
            {label && <span className="ui-radio__label">{label}</span>}
            {description && <span className="ui-radio__description">{description}</span>}
          </span>
        )}
      </label>
    );
  },
);

Radio.displayName = 'Radio';
