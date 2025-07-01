import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { CalendarProps } from '../../types/date-picker';

import { useCalendarStyles } from './date-picker.styles';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const Calendar: React.FC<CalendarProps> = ({
  tempDate,
  calendarMonth,
  calendarYear,
  label,
  onDateSelect,
  onMonthChange,
  onYearPress,
  onCancel,
  onConfirm,
}) => {
  const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

  const styles = useCalendarStyles();

  const dates: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) dates.push(null);
  for (let i = 1; i <= daysInMonth; i++) dates.push(i);
  while (dates.length % 7 !== 0) dates.push(null);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.headerText}>{label || 'SELECT DATE'}</Text>
        <Text style={styles.selectedDateHeader}>
          {tempDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </Text>

        <View style={styles.monthYearRow}>
          <TouchableOpacity onPress={() => onMonthChange(-1)}>
            <Icon name="angle-left" size={24} color="#4d8bf5" />
          </TouchableOpacity>
          <View style={styles.monthYearCont}>
            <Text>{monthNames[calendarMonth]}</Text>
            <TouchableOpacity onPress={onYearPress}>
              <Text>{calendarYear}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => onMonthChange(1)}>
            <Icon name="angle-right" size={24} color="#4d8bf5" />
          </TouchableOpacity>
        </View>

        <View style={styles.daysRow}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
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
                  style={[styles.dateCell, day === tempDate.getDate() ? styles.selectedCell : null]}
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
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.actionText}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm}>
            <Text style={styles.actionText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Calendar;
