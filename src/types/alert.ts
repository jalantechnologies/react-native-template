export enum AlertType {
  DANGER = 'DANGER',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
}

export interface AlertConfig {
  confirmText: string;
  message: string;
  title: string;
  type: AlertType;
  visible: boolean;
}

export interface AlertContextType {
  hideAlert: () => void;
  showAlert: (config: Omit<AlertConfig, 'visible'>) => void;
}

export interface AlertBoxProps {
  confirmText: string;
  message: string;
  onClose: () => void;
  type: AlertType;
  title: string;
}

export interface AlertIconProps {
  color: string;
  symbol: string;
}

export interface AlertContentProps {
  message: string;
  title: string;
}

export interface AlertActionButtonProps {
  color: string;
  label: string;
  onPress: () => void;
}
