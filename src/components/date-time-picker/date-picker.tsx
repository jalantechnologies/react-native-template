import { theme } from 'native-base';
import React, { useState } from 'react';
import { Modal, Pressable, View, StyleSheet, ViewStyle } from 'react-native';

import { DatePickerProps } from '../../types/date-time-picker';

import Calendar from './calendar';
import YearPicker from './year-picker';

const DatePicker: React.FC<DatePickerProps> = ({
  triggerLayout,
  tempDate,
  onChange,
  onCancel,
  dateSelectionMode,
  blockedDates,
}) => {
  // Current displayed month & year
  const [displayedMonth, setDisplayedMonth] = useState(tempDate.getMonth());
  const [displayedYear, setDisplayedYear] = useState(tempDate.getFullYear());

  // State for showing year picker modal
  const [showYearPicker, setShowYearPicker] = useState(false);

  // Currently selected date
  const [selectedDate, setSelectedDate] = useState(tempDate);

  // Position and dimensions of year dropdown
  const [yearDropdownLayout, setYearDropdownLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  // Update selected date
  const updateSelectedDate = (day: number) => {
    const updated = new Date(selectedDate);
    updated.setFullYear(displayedYear);
    updated.setMonth(displayedMonth);
    updated.setDate(day);
    setSelectedDate(updated);
  };

  // Change month by increment (-1 prev, +1 next)
  const updateDisplayedMonth = (increment: number) => {
    setDisplayedMonth(prevMonth => {
      let nextMonth = prevMonth + increment;

      if (nextMonth < 0) {
        nextMonth = 11;
        setDisplayedYear(prev => prev - 1);
      } else if (nextMonth > 11) {
        nextMonth = 0;
        setDisplayedYear(prev => prev + 1);
      }

      return nextMonth;
    });
  };

  // Year selected from year picker
  const updateDisplayedYear = (year: number) => {
    setDisplayedYear(year);
    setShowYearPicker(false);
  };

  // called when apply button is pressed and applies the selected date or date range to the parent component.
  const applySelectedDate = (date: Date | { startDate: Date | null; endDate: Date | null }) => {
    if (date instanceof Date) {
      setSelectedDate(date);
      onChange(date);
    } else {
      onChange({
        start: date.startDate ?? null,
        end: date.endDate ?? null,
      });
    }
  };

  // Position calendar relative to trigger
  const calendarTop = triggerLayout.y + triggerLayout.height - theme.space[4];

  const calendarPosition: ViewStyle = {
    position: 'absolute',
    top: calendarTop,
    left: triggerLayout.x,
    width: triggerLayout.width,
  };

  // Position the year picker relative to the year dropdown
  const yearPickerPosition: ViewStyle = {
    position: 'absolute',
    top: yearDropdownLayout ? yearDropdownLayout.y + yearDropdownLayout.height + theme.space[1] : 0,
    left: yearDropdownLayout ? yearDropdownLayout.x : 0,
  };

  return (
    <>
      {/* Calendar Modal */}
      <Modal visible transparent animationType="fade">
        <Pressable style={styles.flex} onPress={onCancel}>
          <View style={calendarPosition}>
            <Calendar
              blockedDates={blockedDates}
              tempDate={selectedDate}
              currentMonth={displayedMonth}
              currentYear={displayedYear}
              dateSelectionMode={dateSelectionMode}
              onDateSelect={updateSelectedDate}
              onMonthChange={updateDisplayedMonth}
              onYearPress={() => setShowYearPicker(true)}
              onYearLayout={layout => setYearDropdownLayout(layout)}
              onCancel={onCancel}
              onConfirm={applySelectedDate}
            />
          </View>
        </Pressable>
      </Modal>

      {/* Year Picker Modal */}
      {showYearPicker && (
        <Modal visible transparent animationType="fade">
          <Pressable style={styles.flex} onPress={() => setShowYearPicker(false)}>
            <View style={yearPickerPosition}>
              <Pressable style={styles.flex} onPress={() => {}}>
                <YearPicker calendarYear={displayedYear} onYearSelect={updateDisplayedYear} />
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default DatePicker;
