import { GestureResponderEvent } from 'react-native';

export enum ButtonKind {
  DANGER = 'danger',
  DARK = 'dark',
  DASHED = 'dashed',
  INFO = 'info',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  TERTIARY = 'tertiary',
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
  diameter?: number;
  endEnhancer?: React.ReactNode;
  isCircular?: boolean;
  isLoading?: boolean;
  kind?: ButtonKind;
  onClick?: (event: GestureResponderEvent) => void;
  size?: ButtonSize;
  startEnhancer?: React.ReactNode;
}
