import React, { useMemo } from 'react';
import { Switch as NativeSwitch, StyleSheet, ViewStyle } from 'react-native';

import { useThemeColor } from '../../utils/use-theme-color.hook';

export interface SwitchProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
  colorScheme?: {
    trackColorOn?: string;
    trackColorOff?: string;
    thumbColor?: string;
  };
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  style = undefined,
  colorScheme = {},
}) => {
  const trackColorOn = useThemeColor(colorScheme.trackColorOn ?? 'primary.500');
  const trackColorOff = useThemeColor(colorScheme.trackColorOff ?? 'neutral.300');
  const thumbColor = useThemeColor(colorScheme.thumbColor ?? 'white');

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

const styles = StyleSheet.create({
  base: {
    margin: 4,
  },
});

export default Switch;
