export interface AlertActionButtonProps {
  bgColor: string;
  label: string;
  onPress: () => void;
  textColor: string;
}

export interface AlertBoxProps {
  children: React.ReactNode;
  confirmText: string;
  onClose: () => void;
  onConfirm: () => void;
  type: AlertType;
}

export interface AlertCloseButtonProps {
  onPress: () => void;
}

export interface AlertIconProps {
  bgColor: string;
  symbol: string;
  textColor: string;
}

export enum AlertType {
  DANGER = 'DANGER',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
}
