import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { ClockFaceProps } from '../../types/date-picker';

const ClockFace: React.FC<ClockFaceProps> = ({ tempDate, clockMode, onSelect }) => {
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
            style={{
              position: 'absolute',
              left: x - 15,
              top: y - 15,
              width: 30,
              height: 30,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isSelected ? '#4d8bf5' : 'transparent',
            }}
          >
            <Text
              style={{
                color: isSelected ? '#fff' : '#000',
                fontWeight: isSelected ? 'bold' : 'normal',
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
