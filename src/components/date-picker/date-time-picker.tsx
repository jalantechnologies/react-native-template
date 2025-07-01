import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { DateTimePickerMode, DateTimePickerProps } from '../../types/date-picker';
import { Input } from '../inputs';

import DatePicker from './date-picker';
import TimePicker from './time-picker';

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ value, onChange, mode}) => {
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
