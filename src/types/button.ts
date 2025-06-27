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

export enum ButtonShape {
  CAPSULE = 'capsule',
  CIRCULAR = 'circular',
  DEFAULT = 'default',
  SQUARE = 'square',
}

export enum ButtonSize {
  COMPACT = 'compact',
  DEFAULT = 'default',
  LARGE = 'large',
  MINI = 'mini',
}

export interface ButtonProps {
  disabled?: boolean;
  endEnhancer?: React.ReactNode;
  isLoading?: boolean;
  kind?: ButtonKind;
  onClick?: (event: GestureResponderEvent) => void;
  shape?: ButtonShape;
  size?: ButtonSize;
  startEnhancer?: React.ReactNode;
}
