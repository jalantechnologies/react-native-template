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

function isRangePickerProps(props: DateTimePickerProps): props is RangeDateTimePickerProps {
  return props.dateSelectionMode === DateSelectionMode.RANGE;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = props => {
  const theme = useTheme();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);

  const isRangeMode = isRangePickerProps(props);

  const inputRef = useRef<View>(null);
  const measureInput = () => {
    inputRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
    });
  };

  const handleDatePress = () => {
    measureInput();
    setShowDatePicker(true);
  };

  const handleTimePress = () => {
    measureInput();
    setShowTimePicker(true);
  };

  const handleDateChange = (date: Date | { start: Date; end: Date }) => {
    if (isRangeMode) {
      if ('start' in date && 'end' in date) {
        props.onChange(date);
      }
    } else {
      if (date instanceof Date) {
        props.onChange(date);
      }
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (date: Date) => {
    if (!isRangeMode) {
      props.onChange(date);
    }
    setShowTimePicker(false);
  };

  const getLocalizedDatePlaceholder = () => {
    const format = new Intl.DateTimeFormat(undefined).formatToParts(new Date());

    return format
      .map(part => {
        if (part.type === 'day') {
          return 'DD';
        }
        if (part.type === 'month') {
          return 'MM';
        }
        if (part.type === 'year') {
          return 'YYYY';
        }
        return part.value;
      })
      .join('');
  };

  return (
    <View>
      {(props.mode === DateTimePickerMode.DATE || props.mode === DateTimePickerMode.DATETIME) && (
        <Pressable ref={inputRef} onLayout={measureInput} onPress={() => setShowDatePicker(true)}>
          <Input
            value={
              isRangeMode
                ? props.value
                  ? `${props.value.start.toLocaleDateString(undefined, {
                      dateStyle: 'medium',
                    })} - ${props.value.end.toLocaleDateString(undefined, { dateStyle: 'medium' })}`
                  : `${props.label}`
                : props.value.toLocaleDateString(undefined, { dateStyle: 'medium' })
            }
            placeholder={!props.label ? getLocalizedDatePlaceholder() : ''}
            editable={false}
            showSoftInputOnFocus={false}
            endEnhancer={
              <Pressable onPress={() => setShowDatePicker(true)}>
                <Icon name="calendar-alt" size={theme.sizes[5]} />
              </Pressable>
            }
            onPressIn={handleDatePress}
          />
        </Pressable>
      )}

      {(props.mode === DateTimePickerMode.TIME || props.mode === DateTimePickerMode.DATETIME) &&
        !isRangeMode && (
          <Pressable ref={inputRef} onLayout={measureInput} onPress={() => setShowTimePicker(true)}>
            <Input
              value={props.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              editable={false}
              showSoftInputOnFocus={false}
              endEnhancer={
                <Pressable onPress={() => setShowTimePicker(true)}>
                  <Icon name="clock" size={theme.sizes[5]} />
                </Pressable>
              }
              onPressIn={handleTimePress}
            />
          </Pressable>
        )}

      {showDatePicker && triggerLayout && (
        <DatePicker
          blockedDates={props.blockedDates}
          tempDate={isRangeMode ? new Date() : props.value}
          dateSelectionMode={props.dateSelectionMode}
          onChange={handleDateChange}
          onCancel={() => setShowDatePicker(false)}
          triggerLayout={triggerLayout}
        />
      )}

      {!isRangeMode && showTimePicker && triggerLayout && (
        <TimePicker
          tempDate={props.value}
          onChange={handleTimeChange}
          onCancel={() => setShowTimePicker(false)}
          triggerLayout={triggerLayout}
        />
      )}
    </View>
  );
};
