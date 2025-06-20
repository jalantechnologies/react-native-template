import { GestureResponderEvent } from 'react-native';

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
  endEnhancer?: React.ReactElement | string;
  isLoading?: boolean;
  kind?: ButtonKind;
  onClick?: (event: GestureResponderEvent) => void;
  size?: ButtonSize;
  startEnhancer?: React.ReactElement | string;
}
