import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { YearPickerProps } from '../../types/date-time-picker';

import { useYearPickerStyles } from './date-time-picker.styles';

const YearPicker: React.FC<YearPickerProps> = ({ calendarYear, onYearSelect }) => {
  const styles = useYearPickerStyles();
  // Generate 120 years (60 before current year and 59 after)
  const years = Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - 60 + i);
  return (
    <View style={styles.modalContent}>
      <ScrollView>
        <View style={styles.yearGrid}>
          {years.map(year => (
            <TouchableOpacity
              key={year}
              style={[styles.yearCell, year === calendarYear && styles.selectedYearCell]}
              onPress={() => onYearSelect(year)}
            >
              <Text style={year === calendarYear ? styles.selectedYearText : styles.yearText}>
                {year}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default YearPicker;
