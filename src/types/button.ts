import { GestureResponderEvent } from 'react-native';

export enum ButtonClass {
  DANGER = 'danger',
  DARK = 'dark',
  INFO = 'info',
  NORMAL = 'normal',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export enum ButtonKind {
  DASHED = 'dashed',
  LINK = 'link',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum ButtonShape {
  CAPSULE = 'capsule',
  REGULAR = 'regular',
}

export enum ButtonSize {
  COMPACT = 'compact',
  DEFAULT = 'default',
  LARGE = 'large',
  MINI = 'mini',
}

export interface ButtonProps {
  buttonClass?: ButtonClass;
  disabled?: boolean;
  endEnhancer?: React.ReactNode;
  isLoading?: boolean;
  kind?: ButtonKind;
  onClick?: (event: GestureResponderEvent) => void;
  shape?: ButtonShape;
  size?: ButtonSize;
  startEnhancer?: React.ReactNode;
}
