import { GestureResponderEvent } from 'react-native';

export enum ButtonColor {
  DANGER = 'danger',
  INFO = 'info',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export enum ButtonKind {
  CONTAINED = 'contained',
  OUTLINED = 'outlined',
  DASHED = 'dashed',
  LINK = 'link',
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

interface StandardButton {
  kind?: ButtonKind.CONTAINED | ButtonKind.OUTLINED | ButtonKind.DASHED;
  color?: ButtonColor;
}

interface LinkButton {
  kind?: ButtonKind.LINK;
  color?: ButtonColor.PRIMARY;
}

interface CommonButtonProps {
  disabled?: boolean;
  endEnhancer?: React.ReactNode;
  isLoading?: boolean;
  onClick?: (event: GestureResponderEvent) => void;
  shape?: ButtonShape;
  size?: ButtonSize;
  startEnhancer?: React.ReactNode;
}

export type ButtonProps = (StandardButton | LinkButton) & CommonButtonProps;
