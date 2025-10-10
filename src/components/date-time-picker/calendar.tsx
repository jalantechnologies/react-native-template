import { useTheme } from 'native-base';
import React, { useRef, useState, useMemo, useCallback } from 'react';
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
import { isSameDate, isDateInRange, isBlocked } from '../../utils/date-utils';
import MonthNavigator from '../../utils/month-navigator';
import Button from '../button/button';

import { useCalendarStyles } from './date-time-picker.styles';

// Constants
const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const DAYS_IN_WEEK = 7;

const Calendar: React.FC<CalendarProps> = ({
  blockedDates,
  tempDate,
  currentMonth,
  currentYear,
  dateSelectionMode = DateSelectionMode.SINGLE,
  onDateSelect,
  onMonthChange,
  onYearPress,
  onCancel,
  onConfirm,
  onYearLayout,
}) => {
  const theme = useTheme();
  const styles = useCalendarStyles();

  // Selected dates state
  const [selectedDay, setSelectedDay] = useState<number | null>(tempDate.getDate());
  const [rangeStartDate, setRangeStartDate] = useState<Date | null>(null);
  const [rangeEndDate, setRangeEndDate] = useState<Date | null>(null);

  // Preset options for quick range selection
  const [showPresetOptions, setShowPresetOptions] = useState(false);
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

  // Generate calendar grid for current month
  const calendarDates = useMemo(() => {
    const firstWeekday = new Date(currentYear, currentMonth, 1).getDay();
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const datesArray: (number | null)[] = [];

    // Add empty cells before first day
    for (let i = 0; i < firstWeekday; i++) {
      datesArray.push(null);
    }

    // Add days of month
    for (let day = 1; day <= totalDaysInMonth; day++) {
      datesArray.push(day);
    }

    // Fill remaining cells to complete last week
    while (datesArray.length % DAYS_IN_WEEK !== 0) {
      datesArray.push(null);
    }

    return datesArray;
  }, [currentYear, currentMonth]);

  // Split calendar dates into weeks
  const calendarWeeks = useMemo(() => {
    const weeks: (number | null)[][] = [];
    for (let i = 0; i < calendarDates.length; i += DAYS_IN_WEEK) {
      weeks.push(calendarDates.slice(i, i + DAYS_IN_WEEK));
    }
    return weeks;
  }, [calendarDates]);

  // Animated value for horizontal swipe
  const translateX = useRef(new Animated.Value(0)).current;

  const gestureSensitivity = 20;
  const swipeThreshold = 50;
  const swipeDistance = 300;
  const swipeAnimationDuration = 200;

  // Helper function to animate swipe
  const animateSwipe = (toValue: number, callback: () => void) => {
    Animated.timing(translateX, {
      toValue,
      duration: swipeAnimationDuration,
      useNativeDriver: true,
    }).start(() => {
      // Reset translation after animation completes
      translateX.setValue(0);
      callback();
    });
  };

  // PanResponder for swipe gestures to change months
  const panResponder = useRef(
    PanResponder.create({
      // Decide if gesture should start responding
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > gestureSensitivity,
      // Update translation as user drags
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -swipeThreshold) {
          // Swipe left → next month
          animateSwipe(-swipeDistance, () => onMonthChange(1));
        } else if (gestureState.dx > swipeThreshold) {
          // Swipe right → previous month
          animateSwipe(swipeDistance, () => onMonthChange(-1));
        } else {
          // Swipe too small → bounce back
          Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    }),
  ).current;

  // Handle selecting a day on the calendar
  const handleDayPress = useCallback(
    (day: number | null) => {
      if (!day || isBlocked(day, blockedDates, currentMonth, currentYear)) {
        return;
      }

      const fullDate = new Date(currentYear, currentMonth, day);

      if (dateSelectionMode === DateSelectionMode.RANGE) {
        if (!rangeStartDate) {
          setRangeStartDate(fullDate);
          setRangeEndDate(null);
        } else if (!rangeEndDate && fullDate > rangeStartDate) {
          setRangeEndDate(fullDate);
        } else if (rangeStartDate && isSameDate(fullDate, rangeStartDate)) {
          setRangeStartDate(null);
          setRangeEndDate(null);
        } else if (rangeEndDate && isSameDate(fullDate, rangeEndDate)) {
          setRangeEndDate(null);
        } else {
          setRangeStartDate(fullDate);
          setRangeEndDate(null);
        }
      } else {
        setSelectedDay(day);
        onDateSelect(day);
      }
    },
    [
      rangeStartDate,
      rangeEndDate,
      blockedDates,
      currentMonth,
      currentYear,
      dateSelectionMode,
      onDateSelect,
    ],
  );

  // Helper function to calculate start and end dates relative to today
  const calculateDateRange = (daysBefore: number, daysAfter: number = 0) => {
    const start = new Date(today);
    start.setDate(today.getDate() - daysBefore);

    const end = new Date(today);
    end.setDate(today.getDate() + daysAfter);

    return { start, end };
  };

  // Handle selection of quick date range presets
  const handleQuickDateRangePreset = (preset: PresetOption) => {
    let rangeStart: Date;
    let rangeEnd: Date;

    switch (preset) {
      case PresetOption.LAST_3_DAYS:
        ({ start: rangeStart, end: rangeEnd } = calculateDateRange(2));
        break;
      case PresetOption.LAST_7_DAYS:
        ({ start: rangeStart, end: rangeEnd } = calculateDateRange(6));
        break;
      case PresetOption.LAST_14_DAYS:
        ({ start: rangeStart, end: rangeEnd } = calculateDateRange(13));
        break;
      case PresetOption.NEXT_3_DAYS:
        ({ start: rangeStart, end: rangeEnd } = calculateDateRange(0, 2));
        break;
      case PresetOption.NEXT_7_DAYS:
        ({ start: rangeStart, end: rangeEnd } = calculateDateRange(0, 6));
        break;
      case PresetOption.NEXT_14_DAYS:
        ({ start: rangeStart, end: rangeEnd } = calculateDateRange(0, 13));
        break;
      case PresetOption.LAST_MONTH:
        rangeStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        rangeEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case PresetOption.THIS_MONTH:
        rangeStart = new Date(today.getFullYear(), today.getMonth(), 1);
        rangeEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      default:
        return;
    }

    setRangeStartDate(rangeStart);
    setRangeEndDate(rangeEnd);
  };

  // Confirm selected date(s)
  const handleApplySelection = () => {
    if (dateSelectionMode === DateSelectionMode.SINGLE) {
      const selectedDate =
        selectedDay !== null ? new Date(currentYear, currentMonth, selectedDay) : null;
      if (selectedDate) {
        onConfirm(selectedDate);
      }
    } else {
      onConfirm({ startDate: rangeStartDate, endDate: rangeEndDate });
    }
  };

  // Ref to measure the year dropdown
  const yearRef = useRef<TouchableOpacity>(null);

  const updateYearDropdownLayout = () => {
    const handle = yearRef.current && findNodeHandle(yearRef.current);
    if (handle) {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        onYearLayout({ x: pageX, y: pageY, width, height });
      });
    }
  };

  return (
    // Outer modal container
    <Pressable onPress={onCancel} style={styles.modalContainer}>
      <Pressable pointerEvents="box-none" style={styles.modalContent}>
        {/* Header: Year + "Select By" */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            ref={yearRef}
            onPress={() => {
              updateYearDropdownLayout();
              onYearPress();
            }}
            style={styles.yearDropdownButton}
          >
            <Text style={styles.yearDropdownText}>{currentYear}</Text>
            <Icon name="angle-down" style={styles.yearDropdownIcon} />
          </TouchableOpacity>

          {dateSelectionMode === DateSelectionMode.RANGE && (
            <TouchableOpacity
              onPress={() => setShowPresetOptions(true)}
              style={styles.selectByButton}
            >
              <Text style={styles.selectByText}>Select By</Text>
              <Icon name="angle-down" size={theme.sizes[4]} />
            </TouchableOpacity>
          )}
        </View>

        {/* Preset overlay */}
        {showPresetOptions && (
          <Pressable style={styles.presetOverlay} onPress={() => setShowPresetOptions(false)}>
            <Pressable pointerEvents="box-none" style={styles.presetContainer}>
              {presetOptions.map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.presetOption}
                  onPress={() => {
                    handleQuickDateRangePreset(option.value);
                    setShowPresetOptions(false);
                  }}
                >
                  <Text style={styles.presetOptionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </Pressable>
          </Pressable>
        )}

        {/* Selected date display */}
        <Text style={styles.selectedDateText}>
          {tempDate.toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </Text>

        {/* Calendar grid with swipe */}
        <Animated.View {...panResponder.panHandlers} style={{ transform: [{ translateX }] }}>
          <MonthNavigator
            month={currentMonth}
            year={currentYear}
            onMonthChange={onMonthChange}
            styles={styles}
          />

          {/* Weekday labels */}
          <View style={styles.daysRow}>
            {WEEK_DAYS.map((day, index) => (
              <Text key={index} style={styles.dayLabelText}>
                {day}
              </Text>
            ))}
          </View>

          {/* Dates */}
          <View style={styles.calendarGrid}>
            {calendarWeeks.map((week, weekIndex) => (
              <View key={weekIndex} style={styles.calendarRow}>
                {week.map((day, dayIndex) => {
                  const fullDate = day !== null ? new Date(currentYear, currentMonth, day) : null;
                  const isBlockedDate = fullDate
                    ? isBlocked(day, blockedDates, currentMonth, currentYear)
                    : false;
                  const isToday = fullDate ? isSameDate(fullDate, today) : false;
                  const isSelected =
                    dateSelectionMode === DateSelectionMode.SINGLE
                      ? day === selectedDay
                      : fullDate &&
                        ((rangeStartDate && isSameDate(fullDate, rangeStartDate)) ||
                          (rangeEndDate && isSameDate(fullDate, rangeEndDate)));
                  const isInRange =
                    dateSelectionMode === DateSelectionMode.RANGE &&
                    fullDate &&
                    rangeStartDate &&
                    rangeEndDate
                      ? isDateInRange(fullDate, rangeStartDate, rangeEndDate)
                      : false;

                  return (
                    <TouchableOpacity
                      key={dayIndex}
                      style={[
                        styles.dateCell,
                        isBlockedDate && styles.blockedDateCell,
                        isToday && styles.todayDateCell,
                        isSelected && styles.selectedDateCell,
                        isInRange && styles.rangeDateCell,
                      ]}
                      onPress={() => day !== null && handleDayPress(day)}
                    >
                      <Text
                        style={[
                          styles.dateText,
                          isBlockedDate && styles.blockedDateText,
                          isToday && styles.todayDateText,
                          isSelected && styles.selectedDateTextWhite,
                          isInRange && styles.rangeDateText,
                        ]}
                      >
                        {day || ''}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>

          {/* Confirm button */}
          <View style={styles.actionRow}>
            <View style={styles.actionText}>
              <Button onClick={handleApplySelection}>Apply</Button>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Pressable>
  );
};

export default Calendar;
