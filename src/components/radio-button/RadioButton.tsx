import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { styles, useRadioKindStyles } from './radio-button.styles';
import { RadioButtonProps, RadioButtonKind } from './radio-button.types';

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  selected,
  onPress,
  label,
  disabled = false,
  kind = RadioButtonKind.PRIMARY,
}) => {
  const kindStyles = useRadioKindStyles();
  const style = kindStyles[kind];

  const handlePress = () => {
    if (!disabled) {
      onPress(value);
    }
  };

  const outerCircleStyle = {
    borderColor: selected && !disabled ? style.borderColor : '#d1d5db',
    backgroundColor: disabled ? '#f3f4f6' : '#fff',
  };

  const innerCircleStyle = {
    backgroundColor: disabled ? '#9ca3af' : style.innerColor
  };

  const labelColorStyle = {
    color: disabled ? '#9ca3af' : '#111',
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
