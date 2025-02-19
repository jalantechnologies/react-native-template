import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import {
  DEFAULT_SKELETON_SHAPE,
  DEFAULT_SKELETON_WIDTH,
  DEFAULT_SKELETON_HEIGHT,
  DEFAULT_ANIMATION_DURATION,
} from './constants';
import type { SkeletonProps } from './types';

/**
 * Skeleton Component - Displays a placeholder UI to indicate content loading.
 *
 * Example usage:
 * ```tsx
 * // Rectangle skeleton
 * <Skeleton isVisible={true} shape="rect" width={200} height={20} animation />
 *
 * // Circular skeleton
 * <Skeleton isVisible={true} shape="circle" width={50} animation />
 * ```
 *
 * Note: Styling will be enhanced with NativeWind in the future.
 */
const Skeleton: React.FC<SkeletonProps> = ({
  isVisible = true,
  shape = DEFAULT_SKELETON_SHAPE,
  width = DEFAULT_SKELETON_WIDTH,
  height = DEFAULT_SKELETON_HEIGHT,
  animation = true,
  style,
}) => {
  if (!isVisible) {
    return null;
  }

  const opacityAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (animation) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: DEFAULT_ANIMATION_DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.5,
            duration: DEFAULT_ANIMATION_DURATION,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [animation, opacityAnim]);

  const animatedStyle = animation ? { opacity: opacityAnim } : {};

  // For circles, use width for both dimensions; for rectangles, use provided width and height.
  const containerStyle = {
    width,
    height: shape === 'circle' ? width : height,
    borderRadius: shape === 'circle' ? width / 2 : 4,
    backgroundColor: '#e0e0e0',
  };

  return <Animated.View style={[containerStyle, animatedStyle, style]} />;
};

export default Skeleton;
