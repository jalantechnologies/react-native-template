import { useTheme } from 'native-base';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  PanResponder,
  Animated,
  findNodeHandle,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { CalendarProps, DateSelectionMode, PresetOption } from '../../types/date-time-picker';
import Button from '../button/button';

import { useCalendarStyles } from './date-time-picker.styles';
import { isSameDate, isDateInRange, isBlocked } from '../../utils/dateUtils';
import MonthNavigator from '../../utils/MonthNavigator';

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const DAYS_IN_WEEK = 7;

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
  onYearLayout,
}) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(tempDate.getDate());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showSelectByOptions, setShowSelectByOptions] = useState(false);

  const today = new Date();
  const styles = useCalendarStyles();
  const theme = useTheme();

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

  const calendarDates = React.useMemo(() => {
    const firstWeekday = new Date(calendarYear, calendarMonth, 1).getDay();
    const totalDays = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const datesArray: (number | null)[] = [];

    // Leading empty cells
    for (let i = 0; i < firstWeekday; i++) datesArray.push(null);

    // Days of month
    for (let i = 1; i <= totalDays; i++) datesArray.push(i);

    // Trailing empty cells
    while (datesArray.length % DAYS_IN_WEEK !== 0) datesArray.push(null);

    return datesArray;
  }, [calendarYear, calendarMonth]);

  const calendarRows = React.useMemo(() => {
    const rows: (number | null)[][] = [];
    for (let i = 0; i < calendarDates.length; i += DAYS_IN_WEEK) {
      rows.push(calendarDates.slice(i, i + DAYS_IN_WEEK));
    }
    return rows;
  }, [calendarDates]);

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

  const onDatePress = React.useCallback(
    (day: number | null) => {
      if (day === null || isBlocked(day, blockedDates, calendarMonth, calendarYear)) return;

      const selectedFullDate = new Date(calendarYear, calendarMonth, day);

      if (dateSelectionMode === DateSelectionMode.RANGE) {
        if (!startDate) {
          setStartDate(selectedFullDate);
        } else if (!endDate && selectedFullDate.getTime() > startDate.getTime()) {
          setEndDate(selectedFullDate);
        } else if (isSameDate(selectedFullDate, startDate)) {
          setStartDate(null);
          setEndDate(null);
        } else if (endDate && isSameDate(selectedFullDate, endDate)) {
          setEndDate(null);
        } else {
          setStartDate(selectedFullDate);
          setEndDate(null);
        }
      } else {
        setSelectedDate(day);
        onDateSelect(day);
      }
    },
    [startDate, endDate, blockedDates, calendarMonth, calendarYear, dateSelectionMode, onDateSelect],
  );

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
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case PresetOption.THIS_MONTH:
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
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

  const yearRef = useRef<TouchableOpacity>(null);

  const measureYearPosition = () => {
    if (yearRef.current) {
      const handle = findNodeHandle(yearRef.current);
      if (handle) {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
          onYearLayout({ x: pageX, y: pageY, width, height });
        });
      }
    }
  };

  return (
    <Pressable onPress={onCancel} style={styles.modalContainer}>
      <Pressable pointerEvents="box-none" style={styles.modalContent}>
        <View style={styles.headerCont}>
          <TouchableOpacity
            ref={yearRef}
            onPress={() => {
              measureYearPosition();
              onYearPress();
            }}
            style={styles.header}
          >
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
            <Pressable pointerEvents="box-none" style={styles.presetCont}>
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

        <Animated.View {...panResponder.panHandlers} style={{ transform: [{ translateX }] }}>
          <MonthNavigator
            month={calendarMonth}
            year={calendarYear}
            onMonthChange={onMonthChange}
            styles={styles}
          />

          <View style={styles.daysRow}>
            {WEEK_DAYS.map((day, index) => (
              <Text key={index} style={styles.dayLabel}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {calendarRows.map((week, rowIndex) => (
              <View key={rowIndex} style={styles.calendarRow}>
                {week.map((day, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    style={[
                      styles.dateCell,
                      isBlocked(day, blockedDates, calendarMonth, calendarYear)
                        ? styles.blockedCell
                        : null,
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
                          isDateInRange(new Date(calendarYear, calendarMonth, day), startDate, endDate)
                        ? styles.rangeCell
                        : null,
                    ]}
                    onPress={() => day !== null && onDatePress(day)}
                  >
                    <Text
                      style={[
                        styles.dateTextCell,
                        isBlocked(day, blockedDates, calendarMonth, calendarYear)
                          ? styles.blockedCellText
                          : null,
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
                            isDateInRange(new Date(calendarYear, calendarMonth, day), startDate, endDate)
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