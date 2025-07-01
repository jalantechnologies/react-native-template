import React from 'react';
import { View } from 'react-native';

import { ClockHandProps } from '../../types/date-picker';

const ClockHand: React.FC<ClockHandProps> = ({ tempDate, clockMode }) => {
  const radius = 100;
  const center = { x: radius, y: radius };
  const val = clockMode === 'hour' ? tempDate.getHours() % 12 || 12 : tempDate.getMinutes();
  const max = clockMode === 'hour' ? 12 : 60;
  const angle = (val / max) * 2 * Math.PI - Math.PI / 2;
  const handLength = radius * 0.6;
  const rotateDeg = angle * (180 / Math.PI);

  return (
    <View
      style={{
        position: 'absolute',
        width: handLength,
        height: 2,
        backgroundColor: '#4d8bf5',
        top: center.y,
        left: center.x,
        transform: [
          { translateX: -handLength / 2 },
          { translateY: -1 },
          { rotate: `${rotateDeg}deg` },
          { translateX: handLength / 2 },
        ],
      }}
    />
  );
};

export default ClockHand;
