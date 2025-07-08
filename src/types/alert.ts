import { ButtonColor, ButtonKind } from './button';

export enum AlertType {
  DANGER = 'danger',
  DELETE = 'delete',
  INFO = 'info',
  SAVED = 'saved',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export enum AlertPosition {
  BOTTOM = 'bottom',
  CENTER = 'center',
}

export interface AlertCloseButtonProps {
  onPress: () => void;
}

export interface AlertActionButtonProps {
  color: ButtonColor;
  label: string;
  type: ButtonKind;
  onPress: () => void;
}

export interface AlertIconProps {
  symbol: React.ReactNode;
  bgColor: string;
}

export interface AlertProps {
  cancelText?: string;
  children: React.ReactNode;
  confirmText?: string;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  position?: AlertPosition;
  type: AlertType;
}

export interface AlertTitleProps {
  children: React.ReactNode;
}

export interface AlertBodyProps {
  children: React.ReactNode;
}
