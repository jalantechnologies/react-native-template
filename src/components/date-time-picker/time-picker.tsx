import { useTheme } from 'native-base';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, ScrollView, Dimensions } from 'react-native';

import { ButtonColor, ButtonKind } from '../../types/button';
import { TimePickerProps } from '../../types/date-time-picker';
import Button from '../button/button';

import { useTimePickerStyles } from './date-time-picker.styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const ITEM_HEIGHT = SCREEN_HEIGHT * 0.06;

const TimePicker: React.FC<TimePickerProps> = ({ tempDate, onChange, onCancel, triggerLayout }) => {
  const theme = useTheme();
  const styles = useTimePickerStyles(ITEM_HEIGHT);

  const [selectedAmPm, setSelectedAmPm] = useState(tempDate.getHours() >= 12 ? 1 : 0);
  const [selectedHour, setSelectedHour] = useState(tempDate.getHours() % 12 || 12);
  const [selectedMinute, setSelectedMinute] = useState(tempDate.getMinutes());

  const ampm = ['AM', 'PM'];
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const ampmRef = useRef<ScrollView>(null);
  const hourRef = useRef<ScrollView>(null);
  const minuteRef = useRef<ScrollView>(null);

  const pickerTop = triggerLayout.y + triggerLayout.height - theme.space[4];

  const confirmTime = () => {
    let hour = selectedHour % 12;
    if (ampm[selectedAmPm] === 'PM') {
      hour += 12;
    }
    const newDate = new Date(tempDate);
    newDate.setHours(hour);
    newDate.setMinutes(selectedMinute);
    onChange(newDate);
  };

  const handleScroll = (event: any, setSelected: (index: number) => void) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSelected(index);
  };

  const scrollToInitialPosition = () => {
    ampmRef.current?.scrollTo({ y: selectedAmPm * ITEM_HEIGHT, animated: false });
    hourRef.current?.scrollTo({ y: (selectedHour - 1) * ITEM_HEIGHT, animated: false });
    minuteRef.current?.scrollTo({ y: selectedMinute * ITEM_HEIGHT, animated: false });
  };

  useEffect(() => {
    scrollToInitialPosition();
  }, []);

  const renderPicker = (
    data: string[],
    selectedIndex: number,
    setSelected: (index: number) => void,
    ref: React.RefObject<ScrollView>,
  ) => (
    <View style={styles.pickerContainer}>
      <ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={e => handleScroll(e, setSelected)}
        contentContainerStyle={styles.pickerContent}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.timerItem}>
            <Text
              style={[
                styles.timerItemText,
                {
                  color:
                    index === selectedIndex
                      ? theme.colors.primary[500]
                      : theme.colors.secondary[900],
                },
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.highlight} pointerEvents="none" />
    </View>
  );

  return (
    <Modal visible transparent animationType="fade">
      <View
        style={[
          styles.modalContainer,
          styles.position,
          { top: pickerTop, left: triggerLayout.x, width: triggerLayout.width },
        ]}
      >
        <View style={styles.modalContent}>
          <Text style={styles.headerText}>SELECT TIME</Text>

          <View style={styles.pickerRow}>
            {renderPicker(ampm, selectedAmPm, setSelectedAmPm, ampmRef)}
            <View style={styles.separator} />
            {renderPicker(hours, selectedHour - 1, index => setSelectedHour(index + 1), hourRef)}
            <View style={styles.separator} />
            {renderPicker(minutes, selectedMinute, setSelectedMinute, minuteRef)}
          </View>

          <View style={styles.actionRow}>
            <View style={styles.actionText}>
              <Button onClick={onCancel} kind={ButtonKind.OUTLINED} color={ButtonColor.SECONDARY}>
                Cancel
              </Button>
            </View>
            <View style={styles.actionText}>
              <Button onClick={confirmTime}>Apply</Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TimePicker;
