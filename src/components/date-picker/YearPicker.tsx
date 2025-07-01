import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';

import { YearPickerProps } from '../../types/date-picker';

import { useYearPickerStyles } from './date-picker.styles';

const YearPicker: React.FC<YearPickerProps> = ({ calendarYear, onYearSelect, onCancel }) => {
  const styles = useYearPickerStyles();
  return (
    <Modal visible transparent animationType="none">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.headerText}>SELECT YEAR</Text>
          <ScrollView>
            <View style={styles.yearGrid}>
              {Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - 60 + i).map(
                yearOption => (
                  <TouchableOpacity
                    key={yearOption}
                    style={[styles.yearCell, yearOption === calendarYear && styles.selectedCell]}
                    onPress={() => onYearSelect(yearOption)}
                  >
                    <Text
                      style={
                        yearOption === calendarYear ? styles.selectedDate : styles.dateTextCell
                      }
                    >
                      {yearOption}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          </ScrollView>
          <View style={styles.actionRow}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.actionText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default YearPicker;
