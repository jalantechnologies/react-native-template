import React from 'react';
import { TouchableOpacity, ActivityIndicator, Text, View } from 'react-native';

import { BUTTON_KIND, BUTTON_SIZE, BUTTON_SHAPE } from './constants';
import type { ButtonProps } from './types';

/**
 * Button Component - A reusable and customizable button.
 *
 * Example usage:
 * ```tsx
 * <Button variant={BUTTON_KIND.primary} size={BUTTON_SIZE.medium} onPress={() => console.log('Clicked!')}>
 *   Click Me
 * </Button>
 * ```
 */
const Button: React.FC<ButtonProps> = ({
  variant = BUTTON_KIND.primary,
  size = BUTTON_SIZE.medium,
  shape = BUTTON_SHAPE.default,
  isDisabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled || isLoading}
      activeOpacity={0.7} // Gives a subtle feedback effect
    >
      <View>
        {/* Left Icon */}
        {leftIcon && <View>{leftIcon}</View>}
        {/* Button Content */}
        {isLoading ? <ActivityIndicator testID="loading-spinner" /> : <Text>{children}</Text>}
        {/* Right Icon */}
        {rightIcon && <View>{rightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
