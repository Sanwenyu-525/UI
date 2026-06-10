import { type HTMLAttributes } from 'react';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–100 value. Omit for indeterminate. */
  value?: number;
  /** Label text */
  label?: string;
  /** Show percentage value */
  showValue?: boolean;
  /** Color variant */
  variant?: ProgressVariant;
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Indeterminate / loading state */
  indeterminate?: boolean;
}

/** Linear progress bar. */
export function Progress({
  value,
  label,
  showValue = false,
  variant = 'default',
  size = 'md',
  indeterminate = false,
  className = '',
  ...props
}: ProgressProps) {
  const pct = value !== undefined ? Math.max(0, Math.min(100, value)) : 0;

  return (
    <div
      className={[
        'ui-progress',
        `ui-progress--${size}`,
        indeterminate && 'ui-progress--indeterminate',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : pct}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      {(label || showValue) && (
        <div className="ui-progress__label-row">
          {label && <span className="ui-progress__label">{label}</span>}
          {showValue && !indeterminate && <span className="ui-progress__value">{pct}%</span>}
        </div>
      )}
      <div className="ui-progress__track">
        <div
          className={`ui-progress__fill${variant !== 'default' ? ` ui-progress__fill--${variant}` : ''}`}
          style={indeterminate ? undefined : { width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ── Circular progress ──────────────────────────────────────────── */

export interface CircularProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  /** Diameter in px */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  variant?: ProgressVariant;
  showValue?: boolean;
}

/** Circular progress indicator. */
export function CircularProgress({
  value = 0,
  size = 48,
  strokeWidth = 4,
  variant = 'default',
  showValue = false,
  className = '',
  ...props
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const colorMap: Record<ProgressVariant, string> = {
    default: 'var(--color-primary)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
  };

  return (
    <div
      className={`ui-progress-circle ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg className="ui-progress-circle__svg" width={size} height={size}>
        <circle
          className="ui-progress-circle__track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="ui-progress-circle__fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ stroke: colorMap[variant] }}
        />
      </svg>
      {showValue && (
        <span className="ui-progress-circle__label">{Math.round(value)}%</span>
      )}
    </div>
  );
}
