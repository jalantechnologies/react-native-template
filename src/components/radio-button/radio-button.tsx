import { useTheme } from 'native-base';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { RadioButtonProps, RadioButtonKind } from '../../types/radio-button';

import { RadioStyles, useRadioKindStyles } from './radio-button.styles';

const RadioButton: React.FC<RadioButtonProps> = ({
  disabled = false,
  kind = RadioButtonKind.PRIMARY,
  label,
  onPress,
  selected,
  value,
}) => {
  const theme = useTheme();
  const kindStyles = useRadioKindStyles();
  const btnKindStyle = kindStyles[kind];
  const styles = RadioStyles();

  const handlePress = () => {
    if (!disabled) {
      onPress(value);
    }
  };

  const outerCircleStyle = {
    borderColor: selected && !disabled ? btnKindStyle.borderColor : theme.colors.gray[300],
    backgroundColor: disabled ? '#f3f4f6' : theme.colors.white,
  };

  const innerCircleStyle = {
    backgroundColor: disabled ? theme.colors.gray[400] : btnKindStyle.innerColor,
  };

  const labelColorStyle = {
    color: disabled ? theme.colors.gray[400] : theme.colors.gray[900],
  };

  return (
    <Pressable
      onPress={handlePress}
      style={styles.wrapper}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={label || value}
    >
      <View style={[styles.outerCircle, outerCircleStyle]}>
        {selected && <View style={[styles.innerCircle, innerCircleStyle]} />}
      </View>
      {label && <Text style={[styles.label, labelColorStyle]}>{label}</Text>}
    </Pressable>
  );
};

export default RadioButton;
