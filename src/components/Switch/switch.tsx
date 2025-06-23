import { useTheme } from 'native-base';
import React, { useMemo } from 'react';
import { Switch as NativeSwitch, StyleSheet, ViewStyle, StyleProp } from 'react-native';

export interface SwitchProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const Switch: React.FC<SwitchProps> = ({ value, onValueChange, disabled, style, testID }) => {
  const theme = useTheme();
  const switchStyle = useMemo(() => [styles.base, style], [style]);

  return (
    <NativeSwitch
      testID={testID}
      value={value}
      onValueChange={disabled ? undefined : onValueChange}
      disabled={disabled}
      style={switchStyle}
      trackColor={{
        false: theme.colors.gray?.[300] ?? '#d1d5db',
        true: theme.colors.blue?.[500] ?? '#2563eb',
      }}
      thumbColor={disabled ? theme.colors.gray?.[400] ?? '#9ca3af' : theme.colors.white ?? '#fff'}
    />
  );
};

Switch.defaultProps = {
  disabled: false,
  style: undefined,
  testID: 'switch',
};

const styles = StyleSheet.create({
  base: {
    margin: 4,
  },
});

export default Switch;
