import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface RadioButtonProps {
  value: string;
  selected: boolean;
  onPress: (value: string) => void;
  label?: string;
  disabled?: boolean;
  kind?: 'primary' | 'error' | 'success';
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};
