import { useTheme } from 'native-base';
import React, { useRef, useState } from 'react';
import { View, Pressable, LayoutRectangle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  DateSelectionMode,
  DateTimePickerMode,
  DateTimePickerProps,
  RangeDateTimePickerProps,
} from '../../types/date-time-picker';
import { Input } from '../inputs';

import DatePicker from './date-picker';
import TimePicker from './time-picker';

// check if props belong to a Range Date Picker
function isRangePicker(props: DateTimePickerProps): props is RangeDateTimePickerProps {
  return props.dateSelectionMode === DateSelectionMode.RANGE;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = (props) => {
  const theme = useTheme();

  // State to show/hide the DatePicker or TimePicker overlays
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  // State to store layout position of the input field to position picker overlay
  const [inputLayout, setInputLayout] = useState<LayoutRectangle | null>(null);

  const isRangeMode = isRangePicker(props);

  const inputRef = useRef<View>(null);

  // Measure input position to align picker overlay correctly
  const measureInputLayout = () => {
    inputRef.current?.measureInWindow((x, y, width, height) => {
      setInputLayout({ x, y, width, height });
    });
  };

  //Called when user taps the date input field
  const onDateInputPress = () => {
    measureInputLayout();
    setDatePickerVisible(true);
  };

  // Called when user taps the time input field
  const onTimeInputPress = () => {
    measureInputLayout();
    setTimePickerVisible(true);
  };

  // Called when user selects a date (single or range)
  const onDateSelected = (selectedDate: Date | { start: Date | null; end: Date | null }) => {
    if (isRangeMode) {
      if ('start' in selectedDate && 'end' in selectedDate) {
        const { start, end } = selectedDate;
        if (start && end) {
          props.onChange({ start, end });
          setDatePickerVisible(false);
        }
      }
      return;
    }

    if (selectedDate instanceof Date) {
      props.onChange(selectedDate);
      setDatePickerVisible(false);
    }
  };

  // Called when user selects a time
  const onTimeSelected = (selectedTime: Date) => {
    if (!isRangeMode) {
      props.onChange(selectedTime);
      setTimePickerVisible(false);
    }
  };

  // Generate placeholder based on user's locale date format
  const getDatePlaceholder = () => {
    const formatParts = new Intl.DateTimeFormat(undefined).formatToParts(new Date());

    return formatParts
      .map((part) => {
        if (part.type === 'day') return 'DD';
        if (part.type === 'month') return 'MM';
        if (part.type === 'year') return 'YYYY';
        return part.value;
      })
      .join('');
  };

  return (
    <View>
      {/* Date Input Field */}
      {(props.mode === DateTimePickerMode.DATE || props.mode === DateTimePickerMode.DATETIME) && (
        <Pressable ref={inputRef} onLayout={measureInputLayout} onPress={onDateInputPress}>
          <Input
            value={
              isRangeMode
                ? props.value
                  ? `${props.value.start.toLocaleDateString()} - ${props.value.end.toLocaleDateString()}`
                  : props.label
                : props.value.toLocaleDateString()
            }
            placeholder={!props.label ? getDatePlaceholder() : ''}
            editable={false}
            showSoftInputOnFocus={false}
            endEnhancer={
              <Pressable onPress={onDateInputPress}>
                <Icon name="calendar-alt" size={theme.sizes[4]} />
              </Pressable>
            }
            onPressIn={onDateInputPress}
          />
        </Pressable>
      )}

      {/* Time Input Field (only for single mode or DATETIME) */}
      {(props.mode === DateTimePickerMode.TIME || props.mode === DateTimePickerMode.DATETIME) &&
        !isRangeMode && (
          <Pressable
            ref={inputRef}
            onLayout={measureInputLayout}
            onPress={onTimeInputPress}
            style={props.mode === DateTimePickerMode.DATETIME ? { marginTop: theme.space[1] } : {}}
          >
            <Input
              value={props.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              editable={false}
              showSoftInputOnFocus={false}
              endEnhancer={
                <Pressable onPress={onTimeInputPress}>
                  <Icon name="clock" size={theme.sizes[4]} />
                </Pressable>
              }
              onPressIn={onTimeInputPress}
            />
          </Pressable>
        )}

      {/* DatePicker Overlay */}
      {isDatePickerVisible && inputLayout && (
        <DatePicker
          blockedDates={props.blockedDates}
          tempDate={isRangeMode ? new Date() : props.value}
          dateSelectionMode={props.dateSelectionMode}
          onChange={onDateSelected}
          onCancel={() => setDatePickerVisible(false)}
          triggerLayout={inputLayout}
        />
      )}

      {/* TimePicker Overlay */}
      {!isRangeMode && isTimePickerVisible && inputLayout && (
        <TimePicker
          tempDate={props.value}
          onChange={onTimeSelected}
          onCancel={() => setTimePickerVisible(false)}
          triggerLayout={inputLayout}
        />
      )}
    </View>
  );
};
