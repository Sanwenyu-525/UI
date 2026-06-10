import { useState, useEffect, useCallback, useRef, forwardRef, type ReactNode, type HTMLAttributes } from 'react';

export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Selected date */
  value?: Date | null;
  /** Callback when date changes */
  onChange?: (date: Date | null) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Disable the input */
  disabled?: boolean;
  /** Show time picker */
  showTime?: boolean;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Disable specific dates */
  disabledDates?: Date[];
  /** Show clear button */
  clearable?: boolean;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date, disabledDates?: Date[]): boolean {
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  if (disabledDates?.some((d) => isSameDay(date, d))) return true;
  return false;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * Date picker with calendar view, month/year navigation, and optional time picker.
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = 'Select date',
      disabled = false,
      showTime = false,
      format = 'YYYY-MM-DD',
      minDate,
      maxDate,
      disabledDates,
      clearable = true,
      size = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(value || new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
    const [hours, setHours] = useState(value ? value.getHours() : 0);
    const [minutes, setMinutes] = useState(value ? value.getMinutes() : 0);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (value) {
        setSelectedDate(value);
        setViewDate(value);
        setHours(value.getHours());
        setMinutes(value.getMinutes());
      }
    }, [value]);

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const toggle = useCallback(() => {
      if (!disabled) {
        setIsOpen((prev) => !prev);
      }
    }, [disabled]);

    const goPrevMonth = useCallback(() => {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    }, [viewDate]);

    const goNextMonth = useCallback(() => {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    }, [viewDate]);

    const selectDay = useCallback(
      (day: number) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        if (showTime) {
          newDate.setHours(hours, minutes);
        }
        setSelectedDate(newDate);
        onChange?.(newDate);
        if (!showTime) {
          setIsOpen(false);
        }
      },
      [viewDate, showTime, hours, minutes, onChange]
    );

    const selectToday = useCallback(() => {
      const today = new Date();
      if (showTime) {
        today.setHours(hours, minutes);
      }
      setSelectedDate(today);
      setViewDate(today);
      onChange?.(today);
      if (!showTime) {
        setIsOpen(false);
      }
    }, [showTime, hours, minutes, onChange]);

    const clear = useCallback(() => {
      setSelectedDate(null);
      onChange?.(null);
      setIsOpen(false);
    }, [onChange]);

    const handleTimeChange = useCallback(
      (type: 'hours' | 'minutes', value: number) => {
        const newHours = type === 'hours' ? value : hours;
        const newMinutes = type === 'minutes' ? value : minutes;

        if (type === 'hours') setHours(value);
        if (type === 'minutes') setMinutes(value);

        if (selectedDate) {
          const newDate = new Date(selectedDate);
          newDate.setHours(newHours, newMinutes);
          setSelectedDate(newDate);
          onChange?.(newDate);
        }
      },
      [selectedDate, hours, minutes, onChange]
    );

    const formatDisplay = (date: Date | null): string => {
      if (!date) return '';
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      if (showTime) {
        const h = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${y}-${m}-${d} ${h}:${min}`;
      }
      return `${y}-${m}-${d}`;
    };

    const renderCalendar = () => {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
      const daysInMonth = getDaysInMonth(year, month);
      const firstDay = getFirstDayOfMonth(year, month);
      const today = new Date();

      const days = [];
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} />);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isSelected = selectedDate && isSameDay(date, selectedDate);
        const isToday = isSameDay(date, today);
        const isDisabled = isDateDisabled(date, minDate, maxDate, disabledDates);

        days.push(
          <button
            key={day}
            className={`ui-datepicker__day ${isSelected ? 'ui-datepicker__day--selected' : ''} ${
              isToday ? 'ui-datepicker__day--today' : ''
            } ${isDisabled ? 'ui-datepicker__day--disabled' : ''}`}
            onClick={() => !isDisabled && selectDay(day)}
            disabled={isDisabled}
            type="button"
          >
            {day}
          </button>
        );
      }

      return days;
    };

    const sizeClasses = {
      sm: 'ui-input--sm',
      md: '',
      lg: 'ui-input--lg',
    };

    return (
      <div ref={ref} className={`ui-datepicker ${className}`} {...props}>
        <div
          className={`ui-input-wrap ui-datepicker__input ${sizeClasses[size]} ${disabled ? 'ui-input-wrap--disabled' : ''}`}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggle();
            }
          }}
          role="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          tabIndex={disabled ? -1 : 0}
        >
          <svg className="ui-input-wrap__prefix" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="12" height="11" rx="1" />
            <path d="M5 1v3M11 1v3M2 7h12" />
          </svg>
          <span style={{ flex: 1, color: selectedDate ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
            {selectedDate ? formatDisplay(selectedDate) : placeholder}
          </span>
          {clearable && selectedDate && !disabled && (
            <button
              className="ui-datepicker__clear-btn"
              onClick={(e) => {
                e.stopPropagation();
                clear();
              }}
              type="button"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l8 8M4 12l8-8" />
              </svg>
            </button>
          )}
        </div>

        <div
          ref={dropdownRef}
          className={`ui-datepicker__dropdown ${isOpen ? 'ui-datepicker__dropdown--open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Date picker"
        >
          <div className="ui-datepicker__header">
            <button className="ui-datepicker__nav-btn" onClick={goPrevMonth} type="button" aria-label="Previous month">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 4L6 8L10 12" />
              </svg>
            </button>
            <span className="ui-datepicker__title">
              {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button className="ui-datepicker__nav-btn" onClick={goNextMonth} type="button" aria-label="Next month">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 4L10 8L6 12" />
              </svg>
            </button>
          </div>

          <div className="ui-datepicker__calendar">
            {WEEKDAYS.map((day) => (
              <div key={day} className="ui-datepicker__weekday">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>

          {showTime && (
            <div className="ui-datepicker__time">
              <div className="ui-datepicker__time-input">
                <span className="ui-datepicker__time-label">Time</span>
                <input
                  className="ui-datepicker__time-field"
                  type="number"
                  min={0}
                  max={23}
                  value={String(hours).padStart(2, '0')}
                  onChange={(e) => handleTimeChange('hours', parseInt(e.target.value) || 0)}
                />
                <span className="ui-datepicker__time-separator">:</span>
                <input
                  className="ui-datepicker__time-field"
                  type="number"
                  min={0}
                  max={59}
                  value={String(minutes).padStart(2, '0')}
                  onChange={(e) => handleTimeChange('minutes', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          )}

          <div className="ui-datepicker__footer">
            <button className="ui-datepicker__today-btn" onClick={selectToday} type="button">
              Today
            </button>
            {clearable && selectedDate && (
              <button className="ui-datepicker__clear-btn" onClick={clear} type="button">
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
