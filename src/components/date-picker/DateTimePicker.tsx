import React, { useState } from 'react';
import { View, Pressable, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { DateTimePickerMode, DateTimePickerProps } from '../../types/date-picker';
import { Input } from '../inputs';

import DatePicker from './date-picker';
import TimePicker from './TimePicker';

const calendarIcon = 'https://img.icons8.com/ios-filled/50/000000/calendar.png';
const clockIcon = 'https://img.icons8.com/ios-filled/50/000000/clock.png';

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ value, onChange, mode, label }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(value);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateInputPress = () => setShowDatePicker(true);
  const handleTimeInputPress = () => setShowTimePicker(true);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
    setShowDatePicker(false);
  };

  const handleTimeChange = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
    setShowTimePicker(false);
  };

  return (
    <View>
      {(mode === DateTimePickerMode.DATE || mode === DateTimePickerMode.DATETIME) && (
        <Pressable onPress={handleDateInputPress}>
          <Input
            value={selectedDate.toLocaleDateString()}
            editable={false}
            showSoftInputOnFocus={false}
            endEnhancer={
              <Pressable onPress={handleDateInputPress}>
                <Icon name="calendar-alt" size={20} />
              </Pressable>
            }
            onPressIn={handleDateInputPress}
          />
        </Pressable>
      )}

      {(mode === DateTimePickerMode.TIME || mode === DateTimePickerMode.DATETIME) && (
        <Pressable onPress={handleTimeInputPress}>
          <Input
            value={selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            editable={false}
            showSoftInputOnFocus={false}
            endEnhancer={
              <Pressable onPress={handleTimeInputPress}>
                <Icon name="clock" size={20} />
              </Pressable>
            }
            onPressIn={handleTimeInputPress}
          />
        </Pressable>
      )}

      {showDatePicker && (
        <DatePicker
          tempDate={selectedDate}
          onChange={handleDateChange}
          onCancel={() => setShowDatePicker(false)}
          label={label}
        />
      )}

      {showTimePicker && (
        <TimePicker
          tempDate={selectedDate}
          onChange={handleTimeChange}
          onCancel={() => setShowTimePicker(false)}
        />
      )}
    </View>
  );
};

