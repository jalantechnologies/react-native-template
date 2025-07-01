import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

import { ClockAmPmSelectionProps } from '../../types/date-picker';

import { useClockStyles } from './date-picker.styles';

const ClockAmPmSelection: React.FC<ClockAmPmSelectionProps> = ({
  tempDate,
  visible,
  onSelect,
  onCancel,
}) => {
  const styles = useClockStyles();
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: 20,
        }}
      >
        <View style={styles.amPmModalContent}>
          <Text style={styles.headerText}>SELECT AM/PM</Text>
          <View style={styles.amPmGrid}>
            {['AM', 'PM'].map(period => {
              const isSelected =
                (period === 'AM' && tempDate.getHours() < 12) ||
                (period === 'PM' && tempDate.getHours() >= 12);
              return (
                <TouchableOpacity
                  key={period}
                  style={[styles.amPmCell, isSelected && styles.amPmSelectedCell]}
                  onPress={() => {
                    const updatedDate = new Date(tempDate);
                    const hour = updatedDate.getHours();
                    if (period === 'AM' && hour >= 12) updatedDate.setHours(hour - 12);
                    if (period === 'PM' && hour < 12) updatedDate.setHours(hour + 12);
                    onSelect(updatedDate);
                  }}
                >
                  <Text style={isSelected ? styles.amPmSelectedText : styles.amPmText}>
                    {period}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
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

export default ClockAmPmSelection;
