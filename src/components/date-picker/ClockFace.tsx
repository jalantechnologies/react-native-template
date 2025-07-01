import React from 'react';
import { Text, TextStyle, TouchableOpacity } from 'react-native';

import { ClockFaceProps } from '../../types/date-picker';

import { useClockStyles } from './date-picker.styles';
import { useTheme } from 'native-base';

const ClockFace: React.FC<ClockFaceProps> = ({ tempDate, clockMode, onSelect }) => {
  const theme = useTheme();
  const styles = useClockStyles();

  const radius = 100;
  const center = { x: radius, y: radius };
  const hours = Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i));
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const selectedValue =
    clockMode === 'hour'
      ? tempDate.getHours() % 12 || 12
      : Math.round(tempDate.getMinutes() / 5) * 5;

  const items = clockMode === 'hour' ? hours : minutes;

  return (
    <>
      {items.map((val, index) => {
        const angle = (2 * Math.PI * index) / items.length - Math.PI / 2;
        const x = center.x + radius * 0.75 * Math.cos(angle);
        const y = center.y + radius * 0.75 * Math.sin(angle);
        const isSelected = val === selectedValue;

        return (
          <TouchableOpacity
            key={val}
            onPress={() => onSelect(val)}
            style={[
              styles.clockItem,
              {
                left: x - 15,
                top: y - 15,
                backgroundColor: isSelected ? '#4d8bf5' : 'transparent',
              },
            ]}
          >
            <Text
              style={{
                color: isSelected ? theme.colors.white : theme.colors.black,
                fontWeight: isSelected
                  ? (String(theme.fontWeights.bold) as TextStyle['fontWeight'])
                  : (String(theme.fontWeights.normal) as TextStyle['fontWeight']),
              }}
            >
              {val.toString().padStart(2, '0')}
            </Text>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default ClockFace;
