import { theme } from 'native-base';
import React, { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';

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
  const [calendarMonth, setCalendarMonth] = useState(tempDate.getMonth());
  const [calendarYear, setCalendarYear] = useState(tempDate.getFullYear());
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(tempDate);

  const [yearLayout, setYearLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const handleDateSelect = (day: number) => {
    const updatedDate = new Date(selectedDate);
    updatedDate.setFullYear(calendarYear);
    updatedDate.setMonth(calendarMonth);
    updatedDate.setDate(day);
    setSelectedDate(updatedDate);
  };

  const handleMonthChange = (increment: number) => {
    setCalendarMonth(prev => {
      let newMonth = prev + increment;
      if (newMonth < 0) {
        newMonth = 11;
      }
      if (newMonth > 11) {
        newMonth = 0;
      }
      return newMonth;
    });
  };

  const handleYearSelect = (year: number) => {
    setCalendarYear(year);
    setShowYearPicker(false);
  };

  const confirmDate = (date: Date | { startDate: Date | null; endDate: Date | null }) => {
    if (date instanceof Date) {
      setSelectedDate(date);
      onChange(date);
    } else {
      const start = date.startDate ?? null;
      const end = date.endDate ?? null;
      onChange({ start, end });
    }
  };
  

  const pickerTop = triggerLayout.y + triggerLayout.height - theme.space[4];

  return (
    <>
      <Modal visible transparent animationType="fade">
        <Pressable style={{ flex: 1 }} onPress={onCancel}>
          <View
            style={{
              position: 'absolute',
              top: pickerTop,
              left: triggerLayout.x,
              width: triggerLayout.width,
            }}
          >
            <Calendar
              blockedDates={blockedDates}
              tempDate={selectedDate}
              calendarMonth={calendarMonth}
              calendarYear={calendarYear}
              dateSelectionMode={dateSelectionMode}
              onDateSelect={handleDateSelect}
              onMonthChange={handleMonthChange}
              onYearPress={() => setShowYearPicker(true)}
              onYearLayout={layout => setYearLayout(layout)}
              onCancel={onCancel}
              onConfirm={confirmDate}
            />
          </View>
        </Pressable>
      </Modal>

      {showYearPicker && (
        <Modal visible transparent animationType="fade">
          <Pressable
            style={{ flex: 1 }}
            onPress={() => {
              setShowYearPicker(false);
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: yearLayout ? yearLayout.y + yearLayout.height + theme.space[1] : 0,
                left: yearLayout ? yearLayout.x : 0,
              }}
            >
              <Pressable style={{ flex: 1 }} onPress={() => {}}>
                <YearPicker calendarYear={calendarYear} onYearSelect={handleYearSelect} />
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      )}
    </>
  );
};

export default DatePicker;
