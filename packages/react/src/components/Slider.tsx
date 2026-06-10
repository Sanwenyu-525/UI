import { type InputHTMLAttributes } from 'react';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  /** Current value */
  value?: number;
  /** Min value */
  min?: number;
  /** Max value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Change callback */
  onChange?: (value: number) => void;
  /** Show value label */
  showValue?: boolean;
  /** Label text */
  label?: string;
  /** Show min/max labels */
  showBounds?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

/** Numeric range slider. */
export function Slider({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  showValue = false,
  label,
  showBounds = false,
  disabled = false,
  className = '',
  id,
  ...props
}: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={`ui-slider${disabled ? ' ui-slider--disabled' : ''} ${className}`}>
      {(label || showValue) && (
        <div className="ui-slider__label-row">
          {label && (
            <label className="ui-slider__label" htmlFor={id}>{label}</label>
          )}
          {showValue && <span className="ui-slider__value">{value}</span>}
        </div>
      )}

      <div className="ui-slider__track">
        <div className="ui-slider__fill" style={{ width: `${percent}%` }} />
        <input
          type="range"
          id={id}
          className="ui-slider__input"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          disabled={disabled}
          {...props}
        />
        <span className="ui-slider__thumb" style={{ left: `${percent}%` }} />
      </div>

      {showBounds && (
        <div className="ui-slider__bounds">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}
