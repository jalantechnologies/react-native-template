import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

import { ClockMode, TimePickerProps } from '../../types/date-picker';

import ClockAmPmSelection from './ClockAmPmSelection';
import ClockFace from './ClockFace';
import ClockHand from './ClockHand';
import { useClockStyles } from './date-picker.styles';

const TimePicker: React.FC<TimePickerProps> = ({ tempDate, onChange, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState(tempDate);
  const [clockMode, setClockMode] = useState<ClockMode>(ClockMode.HOUR);
  const [showAmPmPicker, setShowAmPmPicker] = useState(false);

  const styles = useClockStyles();

  const handleClockSelect = (val: number) => {
    const updatedDate = new Date(selectedDate);
    if (clockMode === 'hour') {
      const currentHours = updatedDate.getHours();
      const isPM = currentHours >= 12;
      updatedDate.setHours((val % 12) + (isPM ? 12 : 0));
      setClockMode(ClockMode.MINUTE);
    } else {
      updatedDate.setMinutes(val);
    }
    setSelectedDate(updatedDate);
  };

  const confirmTime = () => {
    onChange(selectedDate);
  };

  return (
    <>
      {!showAmPmPicker && (
        <Modal visible transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.headerText}>SELECT TIME</Text>

              <TouchableOpacity onPress={() => setShowAmPmPicker(true)}>
                <Text
                  style={{ color: '#000', fontSize: 24, marginBottom: 20, textAlign: 'center' }}
                >
                  {selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => setClockMode(ClockMode.HOUR)}>
                  <Text style={[styles.clockLabel, clockMode === 'hour' && { color: '#4d8bf5' }]}>
                    Hours
                  </Text>
                </TouchableOpacity>
                <Text style={{ marginHorizontal: 10 }}>|</Text>
                <TouchableOpacity onPress={() => setClockMode(ClockMode.MINUTE)}>
                  <Text style={[styles.clockLabel, clockMode === 'minute' && { color: '#4d8bf5' }]}>
                    Minutes
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: '#4d8bf5',
                  alignSelf: 'center',
                  position: 'relative',
                }}
              >
                <ClockFace
                  tempDate={selectedDate}
                  clockMode={clockMode}
                  onSelect={handleClockSelect}
                />
                <ClockHand tempDate={selectedDate} clockMode={clockMode} />
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity onPress={onCancel}>
                  <Text style={styles.actionText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmTime}>
                  <Text style={styles.actionText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      <Modal visible={showAmPmPicker} transparent animationType="fade">
        <ClockAmPmSelection
          tempDate={selectedDate}
          visible={showAmPmPicker}
          onSelect={date => {
            setSelectedDate(date);
            setShowAmPmPicker(false);
          }}
          onCancel={() => setShowAmPmPicker(false)}
        />
      </Modal>
    </>
  );
};

export default TimePicker;
