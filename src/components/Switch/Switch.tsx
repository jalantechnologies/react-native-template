import React, { useMemo } from 'react';
import { Switch as NativeSwitch, StyleSheet, ViewStyle } from 'react-native';

import { useThemeColor } from '../../utils/use-theme-color.hook';

export interface SwitchProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  style = undefined,
}) => {
  const trackColorOn = useThemeColor('trackColorOn');
  const trackColorOff = useThemeColor('trackColorOff');
  const thumbColor = useThemeColor('thumbColor');

  const switchStyle = useMemo(() => [styles.base, style], [style]);

  return (
    <NativeSwitch
      testID="switch"
      value={value}
      onValueChange={disabled ? undefined : onValueChange}
      disabled={disabled}
      trackColor={{ true: trackColorOn, false: trackColorOff }}
      thumbColor={thumbColor}
      style={switchStyle}
    />
  );
};

Switch.defaultProps = {
  disabled: false,
  style: undefined,
};

const styles = StyleSheet.create({
  base: {
    margin: 4,
  },
});

export default Switch;
