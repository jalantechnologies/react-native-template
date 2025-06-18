import { GestureResponderEvent, ViewStyle } from 'react-native';

export enum ButtonKind {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export enum ButtonSize {
  COMPACT = 'compact',
  DEFAULT = 'default',
  LARGE = 'large',
  MINI = 'mini',
}

export interface ButtonProps {
  disabled?: boolean;
  icon?: React.ReactElement;
  loading?: boolean;
  kind?: ButtonKind;
  onPress?: (event: GestureResponderEvent) => void;
  size?: ButtonSize;
  style?: ViewStyle;
  title?: String;
}
