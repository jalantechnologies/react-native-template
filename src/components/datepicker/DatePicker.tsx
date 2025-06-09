import React, { useState } from 'react';
import {
  Platform,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export interface DatePickerProps {
  date: Date;
  onDateChange: (newDate: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
}

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

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});
