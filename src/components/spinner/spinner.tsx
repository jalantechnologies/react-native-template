import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

import { DEFAULT_SPINNER_SIZE, DEFAULT_SPINNER_COLOR, DEFAULT_SPINNER_DURATION } from './constants';
import type { SpinnerProps } from './types';

/**
 * Spinner Component - A loading indicator.
 *
 * Example usage:
 * ```tsx
 * <Spinner
 *   size={40}
 *   color="blue"
 *   animationType="indeterminate"
 *   duration={1000}
 * />
 * ```
 *
 * Note: Styling will be enhanced with NativeWind in the future.
 */
const Spinner: React.FC<SpinnerProps> = ({
  size = DEFAULT_SPINNER_SIZE,
  color = DEFAULT_SPINNER_COLOR,
  animationType = 'indeterminate',
  duration = DEFAULT_SPINNER_DURATION,
  style,
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animationType === 'indeterminate') {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else if (animationType === 'fixed') {
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [animationType, duration, rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Basic placeholder styling for now.
  const spinnerStyle = {
    width: size,
    height: size,
    borderWidth: size / 10,
    borderColor: color,
    borderRadius: size / 2,
    borderTopColor: 'transparent', // creates a spinner effect
    transform: [{ rotate: spin }],
  };

  return <Animated.View style={[spinnerStyle, style]} />;
};

export default Spinner;
