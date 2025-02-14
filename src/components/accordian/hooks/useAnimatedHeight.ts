import { useCallback } from 'react';
import { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

import { ANIMATION_CONFIG } from '../constants';

export const useAnimatedHeight = (isExpanded: boolean) => {
  const height = useSharedValue(0);
  const contentHeight = useSharedValue(0);

  const onLayout = useCallback(
    ({ nativeEvent: { layout } }: { nativeEvent: { layout: { height: number } } }) => {
      contentHeight.value = layout.height;
      if (isExpanded) {
        height.value = layout.height;
      }
    },
    [],
  );

  const animatedStyle = useAnimatedStyle(() => {
    height.value = withTiming(isExpanded ? contentHeight.value : 0, ANIMATION_CONFIG);

    return {
      height: height.value,
    };
  }, [isExpanded]);

  return { animatedStyle, onLayout };
};
