import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useMemo, useState } from 'react';
import { Platform, View, Text, TouchableOpacity } from 'react-native';

import { DatePickerProps, DatePickerMode, PlatformType } from '../../types/date-picker';

import { DatePickerStyles } from './date-picker.styles';

export const DatePicker: React.FC<DatePickerProps> = ({
  date,
  onDateChange,
  mode = DatePickerMode.DATE,
}) => {
  const [show, setShow] = useState(false);
  const userLocale = useMemo(() => Intl.DateTimeFormat().resolvedOptions().locale, []);
  const styles = DatePickerStyles();
  const onChange = (_: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  const mapToNativePickerMode = (mode: DatePickerMode): 'date' | 'time' => {
    switch (mode) {
      case DatePickerMode.TIME:
        return 'time';
      case DatePickerMode.DATETIME:
      case DatePickerMode.DATE:
      default:
        return 'date';
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.button}>
        <Text style={styles.text}>
          {mode === DatePickerMode.TIME
            ? date.toLocaleTimeString()
            : date.toLocaleDateString(userLocale, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode={mapToNativePickerMode(mode)}
          display={Platform.OS === PlatformType.IOS ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
    </View>
  );
};
