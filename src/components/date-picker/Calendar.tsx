import { useTheme } from 'native-base';
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Pressable, PanResponder, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { CalendarProps } from '../../types/date-picker';
import Button from '../button/button';

import { useCalendarStyles } from './date-picker.styles';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Calendar: React.FC<CalendarProps> = ({
  tempDate,
  calendarMonth,
  calendarYear,
  onDateSelect,
  onMonthChange,
  onYearPress,
  onCancel,
  onConfirm,
}) => {
  const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

  const styles = useCalendarStyles();
  const theme = useTheme();

  const dates: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) dates.push(null);
  for (let i = 1; i <= daysInMonth; i++) dates.push(i);
  while (dates.length % 7 !== 0) dates.push(null);

  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 20,
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          Animated.timing(translateX, {
            toValue: -300,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            translateX.setValue(0);
            onMonthChange(1);
          });
        } else if (gestureState.dx > 50) {
          Animated.timing(translateX, {
            toValue: 300,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            translateX.setValue(0);
            onMonthChange(-1);
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Pressable onPress={onCancel} style={styles.modalContainer}>
      <Pressable onPress={() => {}} style={styles.modalContent}>
        <View style={styles.headerCont}>
          <TouchableOpacity onPress={onYearPress} style={styles.header}>
            <Text style={styles.headerText}>{calendarYear}</Text>
            <Icon name="angle-down" style={[{ marginLeft: theme.space[1] }, styles.headerText]} />
          </TouchableOpacity>
        </View>

        <Text style={styles.selectedDateHeader}>
          {tempDate.toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </Text>

        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.calendarCont, { transform: [{ translateX }] }]}
        >
          <View style={styles.monthYearRow}>
            <TouchableOpacity onPress={() => onMonthChange(-1)} style={styles.monthYearItems}>
              <Icon name="angle-left" size={theme.sizes[6]} color="#4d8bf5" />
            </TouchableOpacity>
            <View style={[styles.monthYear, styles.monthYearItems]}>
              <Text
                style={styles.monthYearText}
              >{`${monthNames[calendarMonth]} ${calendarYear}`}</Text>
            </View>
            <TouchableOpacity onPress={() => onMonthChange(1)} style={styles.monthYearItems}>
              <Icon name="angle-right" size={theme.sizes[6]} color="#4d8bf5" />
            </TouchableOpacity>
          </View>

          <View style={styles.daysRow}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
              <Text key={index} style={styles.dayLabel}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {Array.from({ length: dates.length / 7 }).map((_, rowIndex) => (
              <View key={rowIndex} style={styles.calendarRow}>
                {dates.slice(rowIndex * 7, rowIndex * 7 + 7).map((day, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    style={[
                      styles.dateCell,
                      day === tempDate.getDate() ? styles.selectedCell : null,
                    ]}
                    onPress={() => day && onDateSelect(day)}
                  >
                    <Text
                      style={day === tempDate.getDate() ? styles.selectedDate : styles.dateTextCell}
                    >
                      {day || ''}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.actionRow}>
            <View style={styles.actionText}>
              <Button onClick={onConfirm}>Apply</Button>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Pressable>
  );
};

export default Calendar;
