import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './radio-button.styles';
import { RadioButtonProps } from './radio-button.types';

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  selected,
  onPress,
  label,
  disabled = false,
  kind = 'primary',
  containerStyle,
  labelStyle,
}) => {
  const getColors = (type: String) => {
    if (disabled) {
      return '#ccc';
    }
    if (type === 'border') {
      switch (kind) {
        case 'error':
          return '#dc2626';
        case 'success':
          return '#16a34a';
        default:
          return '#0073e6';
      }
    } else if (type === 'inner') {
      switch (kind) {
        case 'error':
          return '#df3a3a';
        case 'success':
          return '#1cca5b';
        default:
          return '#0080ff';
      }
    }
  };

  const borderColor = getColors('border');
  const innerColors = getColors('inner');

  const handlePress = () => {
    if (!disabled) {
      onPress(value);
    }
  };

  const outerCircleStyle = {
    borderColor: selected && !disabled ? borderColor : '#d1d5db',
    backgroundColor: disabled ? '#f3f4f6' : '#fff',
  };

  const textColorStyle = {
    color: disabled ? '#9ca3af' : '#111',
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.wrapper, containerStyle]}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={label || value}
    >
      <View style={[styles.outerCircle, outerCircleStyle]}>
        {selected && <View style={[styles.innerCircle, { backgroundColor: innerColors }]} />}
      </View>
      {label && <Text style={[styles.label, textColorStyle, labelStyle]}>{label}</Text>}
    </Pressable>
  );
};

export default RadioButton;
