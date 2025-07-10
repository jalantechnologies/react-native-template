import { CheckboxProps, CheckboxSize } from 'boilerplate-react-native/src/types/checkbox';
import { useTheme } from 'native-base';
import React, { useState } from 'react';
import { View, Text, GestureResponderEvent, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

import { useCheckboxStyles } from './checkbox.styles';
import { CheckboxShape } from '../../types/checkbox';

const Checkbox: React.FC<CheckboxProps> = ({
  shape = CheckboxShape.SQUARE,
  size = CheckboxSize.SMALL,
  disabled = false,
  checked = false,
  label,
  onPress,
  indeterminate = false,
}) => {
  const [focused, setFocused] = useState(false);

  const handlePress = (event: GestureResponderEvent) => {
    if (!disabled) {
      onPress(label);
    }
  };

  const styles = useCheckboxStyles(size);
  const theme = useTheme();

  const iconSize = size === CheckboxSize.LARGE ? theme.sizes['3'] : theme.sizes['2.5'];

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        style={[
          styles.checkboxBase,
          shape === CheckboxShape.CIRCLE && styles.circle,
          checked && styles.checkedBox,
          focused && styles.focusedShadow,
          disabled && styles.disabledBox,
        ]}
      >
        {checked && indeterminate ? (
          <Icon
            name="minus"
            color={disabled ? theme.colors.secondary['500'] : theme.colors.white}
            size={iconSize}
          />
        ) : checked ? (
          <Icon
            name="check"
            color={disabled ? theme.colors.secondary['500'] : theme.colors.white}
            size={iconSize}
          />
        ) : null}
      </Pressable>

      {label && <Text style={[styles.label, disabled && styles.disabledLabel]}>{label}</Text>}
    </View>
  );
};

export default Checkbox;
