import { useTheme } from 'native-base';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, ScrollView, Dimensions } from 'react-native';

import { ButtonColor, ButtonKind } from '../../types/button';
import { TimePickerProps } from '../../types/date-time-picker';
import Button from '../button/button';

import { useTimePickerStyles } from './date-time-picker.styles';

// Screen constants
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const ITEM_HEIGHT = SCREEN_HEIGHT * 0.06; // Each picker item height

const TimePicker: React.FC<TimePickerProps> = ({ tempDate, onChange, onCancel, triggerLayout }) => {
  const theme = useTheme();
  const styles = useTimePickerStyles(ITEM_HEIGHT);

  // Current selected time values
  const [amPmIndex, setAmPmIndex] = useState(tempDate.getHours() >= 12 ? 1 : 0); // 0 = AM, 1 = PM
  // Convert 24-hour format to 12-hour format
  const to12Hour = (h: number) => (h % 12 === 0 ? 12 : h % 12);
  const [hour, setHour] = useState(to12Hour(tempDate.getHours()));
  const [minute, setMinute] = useState(tempDate.getMinutes());

  // Picker data
  const amPmOptions = ['AM', 'PM'];
  const hourOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  // Scroll refs
  const amPmRef = useRef<ScrollView>(null);
  const hourRef = useRef<ScrollView>(null);
  const minuteRef = useRef<ScrollView>(null);

  // Position picker below the trigger
  const PICKER_VERTICAL_OFFSET = 16; // Offset to slightly overlap the input field
  const pickerTop = triggerLayout.y + triggerLayout.height - PICKER_VERTICAL_OFFSET;

  // Scroll to selected initial values
  const scrollToSelected = () => {
    amPmRef.current?.scrollTo({ y: amPmIndex * ITEM_HEIGHT, animated: false });
    hourRef.current?.scrollTo({ y: (hour - 1) * ITEM_HEIGHT, animated: false });
    minuteRef.current?.scrollTo({ y: minute * ITEM_HEIGHT, animated: false });
  };

  useEffect(() => {
    scrollToSelected();
  }, []);

  // Handle scrolling to select new value
  const handleScroll = (event: any, setSelected: (index: number) => void) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSelected(index);
  };

  // Confirm selected time and send to parent
  const handleConfirm = () => {
    let newHour = hour % 12;
    if (amPmOptions[amPmIndex] === 'PM') {
      newHour += 12;
    }

    const updatedDate = new Date(tempDate);
    updatedDate.setHours(newHour);
    updatedDate.setMinutes(minute);
    onChange(updatedDate);
  };

  // Render picker column (AM/PM, hour, minute)
  const renderPickerColumn = (
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
          <Text style={styles.headerText}>Select Time</Text>

          <View style={styles.pickerRow}>
            {renderPickerColumn(amPmOptions, amPmIndex, setAmPmIndex, amPmRef)}
            <View style={styles.separatorLine} />
            {renderPickerColumn(hourOptions, hour - 1, i => setHour(i + 1), hourRef)}
            <View style={styles.separatorLine} />
            {renderPickerColumn(minuteOptions, minute, setMinute, minuteRef)}
          </View>

          <View style={styles.actionRow}>
            <View style={styles.actionText}>
              <Button onClick={onCancel} kind={ButtonKind.OUTLINED} color={ButtonColor.SECONDARY}>
                Cancel
              </Button>
            </View>
            <View style={styles.actionText}>
              <Button onClick={handleConfirm}>Apply</Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TimePicker;
