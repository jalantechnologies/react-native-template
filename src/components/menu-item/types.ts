import { ViewStyle, TextStyle, StyleProp } from 'react-native';

export type MenuItemProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};
