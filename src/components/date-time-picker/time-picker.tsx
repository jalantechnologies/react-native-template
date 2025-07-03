import { useTheme } from 'native-base';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Modal, FlatList, Dimensions } from 'react-native';

import { ButtonKind } from '../../types/button';
import { TimePickerProps } from '../../types/date-time-picker';
import Button from '../button/button';

import { useTimePickerStyles } from './date-time-picker.styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const ITEM_HEIGHT = SCREEN_HEIGHT * 0.05;

const TimePicker: React.FC<TimePickerProps> = ({ tempDate, onChange, onCancel, triggerLayout }) => {
  const theme = useTheme();
  const styles = useTimePickerStyles(ITEM_HEIGHT);

  const [selectedAmPm, setSelectedAmPm] = useState(tempDate.getHours() >= 12 ? 1 : 0);
  const [selectedHour, setSelectedHour] = useState(tempDate.getHours() % 12 || 12);
  const [selectedMinute, setSelectedMinute] = useState(tempDate.getMinutes());

  const ampm = ['AM', 'PM'];
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const ampmRef = useRef<FlatList<any>>(null);
  const hourRef = useRef<FlatList<any>>(null);
  const minuteRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    scrollToIndex(ampmRef, selectedAmPm);
    scrollToIndex(hourRef, selectedHour - 1);
    scrollToIndex(minuteRef, selectedMinute);
  }, []);

  const scrollToIndex = (ref: React.RefObject<FlatList<any>>, index: number) => {
    ref.current?.scrollToIndex({ index, animated: false });
  };

  const renderItem = (item: string, index: number, selectedIndex: number) => (
    <View style={[styles.timerItem, { height: ITEM_HEIGHT }]}>
      <Text
        style={{
          fontSize: theme.fontSizes.lg,
          color: index === selectedIndex ? theme.colors.primary[800] : theme.colors.secondary[400],
        }}
      >
        {item}
      </Text>
    </View>
  );

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

  const pickerTop = triggerLayout.y + triggerLayout.height - 16;

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
            <FlatList
              ref={ampmRef}
              data={ampm}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              getItemLayout={(_, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
              onMomentumScrollEnd={e => {
                const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
                setSelectedAmPm(index);
              }}
              style={{ height: ITEM_HEIGHT * 3 }}
              contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
              renderItem={({ item, index }) => renderItem(item, index, selectedAmPm)}
            />

            <View style={styles.separator} />

            <FlatList
              ref={hourRef}
              data={hours}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              getItemLayout={(_, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
              onMomentumScrollEnd={e => {
                const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
                setSelectedHour(index + 1);
              }}
              style={{ height: ITEM_HEIGHT * 3 }}
              contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
              renderItem={({ item, index }) => renderItem(item, index, selectedHour - 1)}
            />

            <View style={styles.separator} />

            <FlatList
              ref={minuteRef}
              data={minutes}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              getItemLayout={(_, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
              onMomentumScrollEnd={e => {
                const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
                setSelectedMinute(index);
              }}
              style={{ height: ITEM_HEIGHT * 3 }}
              contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
              renderItem={({ item, index }) => renderItem(item, index, selectedMinute)}
            />
          </View>

          <View style={styles.actionRow}>
            <View style={styles.actionText}>
              <Button onClick={onCancel} kind={ButtonKind.SECONDARY}>
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
