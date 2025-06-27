import { useTheme } from 'native-base';
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import { RadioButtonProps, RadioButtonKind, RadioButtonSize } from '../../types/radio-button';

import { useRadioKindStyles, useRadioStyles, useSizeStyles } from './radio-button.styles';

const RadioButton: React.FC<RadioButtonProps> = ({
  disabled = false,
  kind = RadioButtonKind.PRIMARY,
  label,
  onPress,
  selected,
  size = RadioButtonSize.LARGE,
  indeterminate = false,
  value,
}) => {
  const theme = useTheme();
  const kindStyles = useRadioKindStyles();
  const btnKindStyle = kindStyles[kind];
  const styles = useRadioStyles();
  const sizeStyles = useSizeStyles();
  const sizeStyle = sizeStyles[size];

  const [isFocused, setIsFocused] = useState(false);

  const handlePress = () => {
    if (!disabled) {
      onPress(value);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const outerCircleStyle = {
    borderColor:
      selected && !disabled
        ? btnKindStyle.borderColor
        : disabled
        ? theme.colors.secondary[200]
        : theme.colors.secondary[400],
    backgroundColor:
      selected && !disabled
        ? btnKindStyle.innerColor
        : selected && disabled
        ? theme.colors.secondary[200]
        : theme.colors.white,
  };

  const innerCircleStyle = {
    backgroundColor: disabled ? theme.colors.secondary[400] : theme.colors.white,
  };

  const labelColorStyle = {
    color: disabled ? theme.colors.secondary[400] : theme.colors.secondary[900],
  };

  const focusedStyle = {
    shadowColor: selected ? btnKindStyle.innerColor : theme.colors.secondary[400],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: theme.radii.sm,
  };

  const indeterminateStyle = {
    width: theme.sizes[2] + 2,
    height: 1.2,
  };

  return (
    <Pressable
      onPress={handlePress}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={styles.wrapper}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={label || value}
    >
      <View style={[styles.outerCircle, sizeStyle.outerCircle, outerCircleStyle, isFocused && focusedStyle]}>
        {selected && (
          <View
            style={[styles.innerCircle, sizeStyle.innerCircle, innerCircleStyle, indeterminate && indeterminateStyle]}
          />
        )}
      </View>
      {label && <Text style={[sizeStyle.label, labelColorStyle]}>{label}</Text>}
    </Pressable>
  );
};

export default RadioButton;
