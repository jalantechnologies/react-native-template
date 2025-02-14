import { Easing } from 'react-native-reanimated';

export const STATE_CHANGE_TYPE = {
  expand: 'expand' as const,
};

export const ANIMATION_CONFIG = {
  duration: 500,
  easing: Easing.bezierFn(0.83, 0, 0.17, 1), // Matching BaseWeb's easing
};
