import React, { useState } from 'react';
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { DatePickerProps } from './date-picker.types';
import { styles } from './date-picker.styles';

export const DatePicker: React.FC<DatePickerProps> = ({
  date,
  onDateChange,
  mode = 'date',
}) => {
  const [show, setShow] = useState(false);

  const onChange = (_: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) onDateChange(selectedDate);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.button}>
        <Text style={styles.text}>
          {mode === 'time'
            ? date.toLocaleTimeString()
            : date.toLocaleDateString(
                'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
            )}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode={mode === 'datetime' ? 'date' : mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'spinner'}
          onChange={onChange}
        />
      )}
    </View>
  );
};
