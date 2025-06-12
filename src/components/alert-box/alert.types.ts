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
