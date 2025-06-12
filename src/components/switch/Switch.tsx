import React from 'react';
import { Switch as NativeSwitch } from 'react-native';

import { useThemeColor } from '../../utils/use-theme-color.hook';

export interface SwitchProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  disabled?: boolean;
  style?: any;
}

const Switch: React.FC<SwitchProps> = ({ value, onValueChange, disabled = false, style }) => {
  const trackColorOn = useThemeColor('primary.500');
  const trackColorOff = useThemeColor('neutral.300');
  const thumbColor = useThemeColor('white');

  return (
    <NativeSwitch
      testID="switch"
      value={value}
      onValueChange={disabled ? undefined : onValueChange}
      disabled={disabled}
      trackColor={{ true: trackColorOn, false: trackColorOff }}
      thumbColor={thumbColor}
      style={style}
    />
  );
};

Switch.defaultProps = {
  disabled: false,
  style: undefined,
};

export default Switch;
