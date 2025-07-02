import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';

import { YearPickerProps } from '../../types/date-time-picker';

import { useYearPickerStyles } from './date-picker.styles';

const YearPicker: React.FC<YearPickerProps> = ({ calendarYear, onYearSelect, onCancel }) => {
  const styles = useYearPickerStyles();
  return (
    <Modal visible transparent animationType="none">
      <Pressable style={styles.modalContainer} onPress={onCancel}>
        <Pressable style={styles.modalContent} onPress={() => {}}>
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
                        yearOption === calendarYear ? styles.selectedYear : styles.yearTextCell
                      }
                    >
                      {yearOption}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default YearPicker;
