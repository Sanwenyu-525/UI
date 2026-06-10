import { useState, useCallback } from 'react';
import { View, Text, Pressable, Modal, ScrollView, type ViewProps } from 'react-native';
import { theme, type ThemeColors } from '../theme';

export interface DatePickerProps extends ViewProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  showTime?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  clearable?: boolean;
  colors?: ThemeColors;
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
export function DatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  disabled = false,
  showTime = false,
  minDate,
  maxDate,
  disabledDates,
  clearable = true,
  style,
  colors = theme.colors,
  ...props
}: DatePickerProps & { colors?: ThemeColors }) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [hours, setHours] = useState(value ? value.getHours() : 0);
  const [minutes, setMinutes] = useState(value ? value.getMinutes() : 0);

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
      days.push(<View key={`empty-${i}`} style={{ width: 40, height: 40 }} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = selectedDate && isSameDay(date, selectedDate);
      const isToday = isSameDay(date, today);
      const isDisabled = isDateDisabled(date, minDate, maxDate, disabledDates);

      days.push(
        <Pressable
          key={day}
          onPress={() => !isDisabled && selectDay(day)}
          disabled={isDisabled}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: theme.radii.md,
            backgroundColor: isSelected ? colors.primary : 'transparent',
            borderWidth: isToday ? 1 : 0,
            borderColor: isToday ? colors.primary : 'transparent',
            opacity: isDisabled ? 0.5 : 1,
          }}
        >
          <Text style={{ fontSize: 14, color: isSelected ? '#ffffff' : colors.textPrimary, fontWeight: isSelected || isToday ? '600' : '400' }}>
            {day}
          </Text>
        </Pressable>
      );
    }

    return days;
  };

  return (
    <View style={[{ position: 'relative' }, style]} {...props}>
      <Pressable
        onPress={toggle}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderWidth: 1,
          borderColor: disabled ? colors.border : colors.border,
          borderRadius: theme.radii.md,
          backgroundColor: disabled ? colors.bgMuted : colors.surface,
          opacity: disabled ? 0.5 : 1,
        }}
        disabled={disabled}
      >
        <Text style={{ flex: 1, fontSize: 14, color: selectedDate ? colors.textPrimary : colors.textTertiary }}>
          {selectedDate ? formatDisplay(selectedDate) : placeholder}
        </Text>
        {clearable && selectedDate && (
          <Pressable onPress={clear}>
            <View style={{ width: 16, height: 16, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 14, color: colors.textSecondary }}>×</Text>
            </View>
          </Pressable>
        )}
      </Pressable>

      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setIsOpen(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }} onPress={() => setIsOpen(false)}>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: theme.radii.lg,
              padding: 16,
              width: 320,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 8,
            }}
            onStartShouldSetResponder={() => true}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Pressable onPress={goPrevMonth} style={{ padding: 8 }}>
                <Text style={{ fontSize: 18, color: colors.textPrimary }}>‹</Text>
              </Pressable>
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.textPrimary }}>
                {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
              </Text>
              <Pressable onPress={goNextMonth} style={{ padding: 8 }}>
                <Text style={{ fontSize: 18, color: colors.textPrimary }}>›</Text>
              </Pressable>
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              {WEEKDAYS.map((day) => (
                <View key={day} style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: colors.textSecondary }}>{day}</Text>
                </View>
              ))}
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{renderCalendar()}</View>

            {showTime && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border }}>
                <Text style={{ fontSize: 14, color: colors.textSecondary }}>Time</Text>
                <Pressable
                  onPress={() => handleTimeChange('hours', (hours + 1) % 24)}
                  style={{ padding: 8, backgroundColor: colors.bgMuted, borderRadius: theme.radii.md }}
                >
                  <Text style={{ fontSize: 14, color: colors.textPrimary }}>{String(hours).padStart(2, '0')}</Text>
                </Pressable>
                <Text style={{ fontSize: 18, color: colors.textPrimary }}>:</Text>
                <Pressable
                  onPress={() => handleTimeChange('minutes', (minutes + 1) % 60)}
                  style={{ padding: 8, backgroundColor: colors.bgMuted, borderRadius: theme.radii.md }}
                >
                  <Text style={{ fontSize: 14, color: colors.textPrimary }}>{String(minutes).padStart(2, '0')}</Text>
                </Pressable>
              </View>
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border }}>
              <Pressable onPress={selectToday}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>Today</Text>
              </Pressable>
              {clearable && selectedDate && (
                <Pressable onPress={clear}>
                  <Text style={{ fontSize: 14, color: colors.textSecondary }}>Clear</Text>
                </Pressable>
              )}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
