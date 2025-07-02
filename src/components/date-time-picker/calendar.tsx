import { useTheme } from 'native-base';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  PanResponder,
  Animated,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { CalendarProps, DateSelectionMode, PresetOption } from '../../types/date-time-picker';
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
  blockedDates,
  tempDate,
  calendarMonth,
  calendarYear,
  dateSelectionMode = DateSelectionMode.SINGLE,
  onDateSelect,
  onMonthChange,
  onYearPress,
  onCancel,
  onConfirm,
}) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(tempDate.getDate());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showSelectByOptions, setShowSelectByOptions] = useState(false);

  const today = new Date();

  const presetOptions = [
    { label: 'Last 3 Days', value: PresetOption.LAST_3_DAYS },
    { label: 'Last 7 Days', value: PresetOption.LAST_7_DAYS },
    { label: 'Last 14 Days', value: PresetOption.LAST_14_DAYS },
    { label: 'Last Month', value: PresetOption.LAST_MONTH },
    { label: 'This Month', value: PresetOption.THIS_MONTH },
    { label: 'Next 3 Days', value: PresetOption.NEXT_3_DAYS },
    { label: 'Next 7 Days', value: PresetOption.NEXT_7_DAYS },
    { label: 'Next 14 Days', value: PresetOption.NEXT_14_DAYS },
  ];

  const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

  const styles = useCalendarStyles();
  const theme = useTheme();

  const dates: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(i);
  }
  while (dates.length % 7 !== 0) {
    dates.push(null);
  }

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

  const isBlocked = (day: number | null) => {
    if (day === null || blockedDates === undefined) {
      return false;
    }
    return blockedDates.some(
      date =>
        date.getDate() === day &&
        date.getMonth() === calendarMonth &&
        date.getFullYear() === calendarYear,
    );
  };

  const isSameDate = (d1: Date, d2: Date) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const isDateInRange = (date: Date, start: Date, end: Date) => {
    return date.getTime() > start.getTime() && date.getTime() < end.getTime();
  };

  const onDatePress = (day: number | null) => {
    if (day === null || isBlocked(day)) {
      return;
    }

    const selectedFullDate = new Date(calendarYear, calendarMonth, day);

    if (dateSelectionMode === DateSelectionMode.RANGE) {
      if (startDate === null) {
        setStartDate(selectedFullDate);
      } else if (
        startDate !== null &&
        endDate === null &&
        selectedFullDate.getTime() > startDate.getTime()
      ) {
        setEndDate(selectedFullDate);
      } else if (isSameDate(selectedFullDate, startDate)) {
        setStartDate(null);
        setEndDate(null);
      } else if (endDate !== null && isSameDate(selectedFullDate, endDate)) {
        setEndDate(null);
      } else {
        setStartDate(selectedFullDate);
        setEndDate(null);
      }
    } else {
      setSelectedDate(day);
      onDateSelect(day);
    }
  };

  const handlePresetSelection = (preset: PresetOption) => {
    let start: Date;
    let end: Date;

    switch (preset) {
      case PresetOption.LAST_3_DAYS:
        start = new Date(today);
        start.setDate(today.getDate() - 2);
        end = today;
        break;

      case PresetOption.LAST_7_DAYS:
        start = new Date(today);
        start.setDate(today.getDate() - 6);
        end = today;
        break;

      case PresetOption.LAST_14_DAYS:
        start = new Date(today);
        start.setDate(today.getDate() - 13);
        end = today;
        break;

      case PresetOption.LAST_MONTH:
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0); // last day of previous month
        break;

      case PresetOption.THIS_MONTH:
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0); // last day of current month
        break;

      case PresetOption.NEXT_3_DAYS:
        start = today;
        end = new Date(today);
        end.setDate(today.getDate() + 2);
        break;

      case PresetOption.NEXT_7_DAYS:
        start = today;
        end = new Date(today);
        end.setDate(today.getDate() + 6);
        break;

      case PresetOption.NEXT_14_DAYS:
        start = today;
        end = new Date(today);
        end.setDate(today.getDate() + 13);
        break;

      default:
        return;
    }

    setStartDate(start);
    setEndDate(end);
  };

  const handleConfirm = () => {
    if (dateSelectionMode === DateSelectionMode.SINGLE) {
      if (selectedDate !== null) {
        const confirmedDate = new Date(calendarYear, calendarMonth, selectedDate);
        onConfirm(confirmedDate);
      }
    } else {
      onConfirm({ startDate, endDate });
    }
  };

  return (
    <Pressable onPress={onCancel} style={styles.modalContainer}>
      <Pressable onPress={() => {}} style={styles.modalContent}>
        <View style={styles.headerCont}>
          <TouchableOpacity onPress={onYearPress} style={styles.header}>
            <Text style={styles.headerText}>{calendarYear}</Text>
            <Icon name="angle-down" style={[styles.headerIcon, styles.headerText]} />
          </TouchableOpacity>
          {dateSelectionMode === DateSelectionMode.RANGE && (
            <TouchableOpacity
              onPress={() => setShowSelectByOptions(true)}
              style={styles.selectByButton}
            >
              <Text style={styles.selectByText}>Select By</Text>
              <Icon name="angle-down" style={styles.headerIcon} size={theme.sizes[4]} />
            </TouchableOpacity>
          )}
        </View>

        {showSelectByOptions && (
          <Pressable style={styles.presetOverlay} onPress={() => setShowSelectByOptions(false)}>
            <Pressable onPress={() => {}} style={styles.presetCont}>
              {presetOptions.map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.presetOption}
                  onPress={() => {
                    handlePresetSelection(option.value);
                    setShowSelectByOptions(false);
                  }}
                >
                  <Text style={styles.presetOptionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </Pressable>
          </Pressable>
        )}

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
              <Icon name="angle-left" style={styles.monthYearText} />
            </TouchableOpacity>
            <View style={[styles.monthYear, styles.monthYearItems]}>
              <Text
                style={[
                  styles.monthYearText,
                  { fontWeight: `${theme.fontWeights.medium}` as TextStyle['fontWeight'] },
                ]}
              >{`${monthNames[calendarMonth]} ${calendarYear}`}</Text>
            </View>
            <TouchableOpacity onPress={() => onMonthChange(1)} style={styles.monthYearItems}>
              <Icon name="angle-right" style={styles.monthYearText} />
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
                      isBlocked(day) ? styles.blockedCell : null,
                      day === today.getDate() &&
                      calendarMonth === today.getMonth() &&
                      calendarYear === today.getFullYear()
                        ? styles.todayCell
                        : null,
                      dateSelectionMode === DateSelectionMode.SINGLE &&
                      day !== null &&
                      day === selectedDate
                        ? styles.selectedCell
                        : null,
                      dateSelectionMode === DateSelectionMode.RANGE &&
                      day !== null &&
                      ((startDate !== null &&
                        isSameDate(new Date(calendarYear, calendarMonth, day), startDate)) ||
                        (endDate !== null &&
                          isSameDate(new Date(calendarYear, calendarMonth, day), endDate)))
                        ? styles.selectedCell
                        : dateSelectionMode === DateSelectionMode.RANGE &&
                          day !== null &&
                          startDate !== null &&
                          endDate !== null &&
                          isDateInRange(
                            new Date(calendarYear, calendarMonth, day),
                            startDate,
                            endDate,
                          )
                        ? styles.rangeCell
                        : null,
                    ]}
                    onPress={() => {
                      if (day !== null) {
                        onDatePress(day);
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.dateTextCell,
                        isBlocked(day) ? styles.blockedCellText : null,
                        day === today.getDate() &&
                        calendarMonth === today.getMonth() &&
                        calendarYear === today.getFullYear()
                          ? styles.todayCellText
                          : null,
                        dateSelectionMode === DateSelectionMode.SINGLE &&
                        day !== null &&
                        day === selectedDate
                          ? styles.selectedDate
                          : dateSelectionMode === DateSelectionMode.RANGE &&
                            day !== null &&
                            ((startDate !== null &&
                              isSameDate(new Date(calendarYear, calendarMonth, day), startDate)) ||
                              (endDate !== null &&
                                isSameDate(new Date(calendarYear, calendarMonth, day), endDate)))
                          ? styles.selectedDate
                          : dateSelectionMode === DateSelectionMode.RANGE &&
                            day !== null &&
                            startDate !== null &&
                            endDate !== null &&
                            isDateInRange(
                              new Date(calendarYear, calendarMonth, day),
                              startDate,
                              endDate,
                            )
                          ? styles.rangeDateText
                          : null,
                      ]}
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
              <Button onClick={handleConfirm}>Apply</Button>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Pressable>
  );
};

export default Calendar;
