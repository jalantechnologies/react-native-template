import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTailwind as tailwind } from 'nativewind';

export const useTailwind = (className: string): StyleProp<ViewStyle> => {
  return StyleSheet.flatten(tailwind({ className })) as StyleProp<ViewStyle>;
};
