export enum AlertType {
  SUCCESS = 'SUCCESS',
  DANGER = 'DANGER',
  WARNING = 'WARNING',
  INFO = 'INFO',
}

export interface AlertOptions {
  type?: AlertType;
  title: string;
  content: string;
  confirmText?: string;
}
