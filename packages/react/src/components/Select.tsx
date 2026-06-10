import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { useLocale } from './LocaleProvider';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** Options list */
  options: SelectOption[];
  /** Currently selected value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder when nothing selected */
  placeholder?: string;
  /** Label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  errorMessage?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Size preset */
  size?: 'sm' | 'md' | 'lg';
  /** Required indicator */
  required?: boolean;
  className?: string;
}

/**
 * Custom select dropdown with keyboard navigation.
 */
export function Select({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder,
  label,
  helperText,
  errorMessage,
  disabled,
  size = 'md',
  required,
  className = '',
}: SelectProps) {
  const locale = useLocale();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const value = controlledValue ?? internalValue;
  const selectedOption = options.find((o) => o.value === value);

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (controlledValue === undefined) setInternalValue(optionValue);
      onChange?.(optionValue);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [controlledValue, onChange],
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (open && focusIndex >= 0) {
          handleSelect(options[focusIndex].value);
        } else {
          setOpen(!open);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!open) { setOpen(true); return; }
        setFocusIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Escape':
        setOpen(false);
        triggerRef.current?.focus();
        break;
    }
  };

  const triggerClasses = [
    'ui-select__trigger',
    size !== 'md' && `ui-select__trigger--${size}`,
    errorMessage && 'ui-select__trigger--error',
    disabled && 'ui-select__trigger--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  const select = (
    <div className={`ui-select ${className}`} data-open={open}>
      <button
        ref={triggerRef}
        type="button"
        className={triggerClasses}
        onClick={() => !disabled && setOpen(!open)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={!!errorMessage || undefined}
        disabled={disabled}
      >
        {selectedOption ? (
          <span>{selectedOption.label}</span>
        ) : (
          <span className="ui-select__placeholder">{placeholder ?? locale.selectPlaceholder}</span>
        )}
        <svg className="ui-select__chevron" viewBox="0 0 16 16" fill="none">
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div ref={dropdownRef} className="ui-select__dropdown" role="listbox">
        {options.map((option, i) => (
          <div
            key={option.value}
            className={[
              'ui-select__option',
              option.value === value && 'ui-select__option--selected',
              i === focusIndex && 'ui-select__option--focused',
              option.disabled && 'ui-select__option--disabled',
            ]
              .filter(Boolean)
              .join(' ')}
            role="option"
            aria-selected={option.value === value}
            aria-disabled={option.disabled}
            onClick={() => !option.disabled && handleSelect(option.value)}
          >
            <span>{option.label}</span>
            {option.value === value && (
              <svg className="ui-select__option-check" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  if (label || helperText || errorMessage) {
    return (
      <div className="ui-field">
        {label && (
          <label className={`ui-field__label${required ? ' ui-field__label--required' : ''}`}>
            {label}
          </label>
        )}
        {select}
        {errorMessage ? (
          <span className="ui-field__error" role="alert">{errorMessage}</span>
        ) : helperText ? (
          <span className="ui-field__helper">{helperText}</span>
        ) : null}
      </div>
    );
  }

  return select;
}
