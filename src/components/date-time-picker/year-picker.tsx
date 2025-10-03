import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { YearPickerProps } from '../../types/date-time-picker';

import { useYearPickerStyles } from './date-time-picker.styles';

const YearPicker: React.FC<YearPickerProps> = ({ calendarYear, onYearSelect }) => {
  const styles = useYearPickerStyles();
  // generate year list centered on current year
  const years = Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - 60 + i);
  return (
    <View style={styles.modalContent}>
      <ScrollView>
        <View style={styles.yearGrid}>
          {years.map(y => (
            <TouchableOpacity
              key={y}
              style={[styles.yearCell, y === calendarYear && styles.selectedCell]}
              onPress={() => onYearSelect(y)}
            >
              <Text style={y === calendarYear ? styles.selectedYear : styles.yearTextCell}>
                {y}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default YearPicker;
