export enum AlertType {
  DANGER = 'DANGER',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
}

export interface AlertBoxProps {
  confirmText: string;
  onClose: () => void;
  type: AlertType;
  children: React.ReactNode;
}

export interface AlertIconProps {
  color: string;
  symbol: string;
}

export interface AlertActionButtonProps {
  color: string;
  label: string;
  onPress: () => void;
}
