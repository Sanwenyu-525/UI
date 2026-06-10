import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from 'react';

/* ── Field wrapper ─────────────────────────────────────────────── */

export interface FieldProps {
  /** Label text */
  label?: string;
  /** Mark as required */
  required?: boolean;
  /** Helper text below the input */
  helperText?: string;
  /** Error message (replaces helperText when set) */
  error?: string;
  /** Unique id for label-input association */
  id?: string;
  /** Children (input element) */
  children: ReactNode;
  /** Additional class on wrapper */
  className?: string;
}

/**
 * Field wrapper that provides label, helper text, and error display.
 */
export function Field({
  label,
  required,
  helperText,
  error,
  id,
  children,
  className = '',
}: FieldProps) {
  return (
    <div className={`ui-field ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`ui-field__label${required ? ' ui-field__label--required' : ''}`}
        >
          {label}
        </label>
      )}
      {children}
      {error ? (
        <span className="ui-field__error" role="alert">
          {error}
        </span>
      ) : helperText ? (
        <span className="ui-field__helper">{helperText}</span>
      ) : null}
    </div>
  );
}

/* ── Input ─────────────────────────────────────────────────────── */

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Size preset */
  size?: InputSize;
  /** Show error state */
  error?: boolean;
  /** Leading element (icon, text) */
  prefix?: ReactNode;
  /** Trailing element (icon, text) */
  suffix?: ReactNode;
  /** Label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  errorMessage?: string;
  /** Required indicator */
  required?: boolean;
}

/**
 * Text input with label, prefix/suffix, and error handling.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      error = false,
      prefix,
      suffix,
      label,
      helperText,
      errorMessage,
      required,
      id: idProp,
      className = '',
      disabled,
      ...props
    },
    ref,
  ) => {
    const id = idProp || props.name || undefined;
    const wrapClasses = [
      'ui-input-wrap',
      size !== 'md' && `ui-input-wrap--${size}`,
      error && 'ui-input-wrap--error',
      disabled && 'ui-input-wrap--disabled',
    ]
      .filter(Boolean)
      .join(' ');

    const input = (
      <div className={wrapClasses}>
        {prefix && <span className="ui-input-wrap__prefix">{prefix}</span>}
        <input
          ref={ref}
          id={id}
          className={`ui-input ${className}`}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={
            errorMessage ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          {...props}
        />
        {suffix && <span className="ui-input-wrap__suffix">{suffix}</span>}
      </div>
    );

    if (label || helperText || errorMessage) {
      return (
        <Field
          label={label}
          required={required}
          helperText={helperText}
          error={errorMessage}
          id={id}
        >
          {input}
        </Field>
      );
    }

    return input;
  },
);

Input.displayName = 'Input';

/* ── Textarea ──────────────────────────────────────────────────── */

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Show error state */
  error?: boolean;
  /** Label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  errorMessage?: string;
  /** Required indicator */
  required?: boolean;
}

/**
 * Multi-line text input with label and error handling.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { error = false, label, helperText, errorMessage, required, id: idProp, className = '', ...props },
    ref,
  ) => {
    const id = idProp || props.name || undefined;
    const wrapClasses = [
      'ui-textarea-wrap',
      error && 'ui-input-wrap--error',
    ]
      .filter(Boolean)
      .join(' ');

    const textarea = (
      <div className={wrapClasses}>
        <textarea
          ref={ref}
          id={id}
          className={`ui-textarea ${className}`}
          aria-invalid={error || undefined}
          {...props}
        />
      </div>
    );

    if (label || helperText || errorMessage) {
      return (
        <Field
          label={label}
          required={required}
          helperText={helperText}
          error={errorMessage}
          id={id}
        >
          {textarea}
        </Field>
      );
    }

    return textarea;
  },
);

Textarea.displayName = 'Textarea';
