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

export interface AlertProps extends React.PropsWithChildren {
  cancelText?: string;
  confirmText?: string;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  position?: AlertPosition;
  type: AlertType;
}

export interface AlertTitleProps extends React.PropsWithChildren {}

export interface AlertBodyProps extends React.PropsWithChildren {}
