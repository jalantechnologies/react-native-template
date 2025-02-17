import React from 'react';
import { TouchableOpacity, Text, View, StyleProp, ViewStyle, TextStyle } from 'react-native';

import { menuItemStyles } from './styles';

type MenuItemProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export const MenuItem = ({
  label,
  onPress,
  disabled = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}: MenuItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.7}
    style={[menuItemStyles.container, disabled && menuItemStyles.disabled, style]}
    accessible
    accessibilityRole="button"
    accessibilityLabel={label}
    accessibilityState={{ disabled }}
  >
    {iconPosition === 'left' && icon && <View style={menuItemStyles.iconContainer}>{icon}</View>}
    <Text style={[menuItemStyles.label, textStyle]}>{label}</Text>
    {iconPosition === 'right' && icon && <View style={menuItemStyles.iconContainer}>{icon}</View>}
  </TouchableOpacity>
);
MenuItem.defaultProps = {
  disabled: false,
  iconPosition: 'left',
  onPress: () => {}, 
  icon: undefined, 
  style: undefined,
  textStyle: undefined,
};
