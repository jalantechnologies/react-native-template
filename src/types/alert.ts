export interface AlertBodyProps {
  children: React.ReactNode;
}

export interface AlertActionButtonProps {
  bgColor: string;
  label: string;
  onPress: () => void;
  textColor: string;
}

export interface AlertCloseButtonProps {
  onPress: () => void;
}

export interface AlertIconProps {
  bgColor: string;
  symbol: string;
  textColor: string;
}

export interface AlertProps {
  children: React.ReactNode;
  confirmText: string;
  onClose: () => void;
  onConfirm: () => void;
  type: AlertType;
}

export interface AlertTitleProps {
  children: React.ReactNode;
}

export enum AlertType {
  DANGER = 'DANGER',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
}
