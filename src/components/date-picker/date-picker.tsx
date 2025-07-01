import React, { useState } from 'react';
import { Modal } from 'react-native';

import { DatePickerProps } from '../../types/date-picker';

import Calendar from './calendar';
import YearPicker from './year-picker';

const DatePicker: React.FC<DatePickerProps> = ({ tempDate, onChange, onCancel }) => {
  const [calendarMonth, setCalendarMonth] = useState(tempDate.getMonth());
  const [calendarYear, setCalendarYear] = useState(tempDate.getFullYear());
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(tempDate);

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
      if (newMonth < 0) newMonth = 11;
      if (newMonth > 11) newMonth = 0;
      return newMonth;
    });
  };

  const handleYearSelect = (year: number) => {
    setCalendarYear(year);
    setShowYearPicker(false);
  };

  const confirmDate = () => {
    onChange(selectedDate);
  };

  return (
    <>
      <Modal visible transparent animationType="fade">
        <Calendar
          tempDate={selectedDate}
          calendarMonth={calendarMonth}
          calendarYear={calendarYear}
          onDateSelect={handleDateSelect}
          onMonthChange={handleMonthChange}
          onYearPress={() => setShowYearPicker(true)}
          onCancel={onCancel}
          onConfirm={confirmDate}
        />
      </Modal>

      {showYearPicker && (
        <YearPicker
          calendarYear={calendarYear}
          onYearSelect={handleYearSelect}
          onCancel={() => setShowYearPicker(false)}
        />
      )}
    </>
  );
};

export default DatePicker;
