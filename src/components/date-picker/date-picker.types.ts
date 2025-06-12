export enum DatePickerMode {
  DATE = 'date',
  DATETIME = 'datetime',
  TIME = 'time',
}

export enum PlatformType {
  ANDROID = 'android',
  IOS = 'ios',
}

export interface DatePickerProps {
  date: Date;
  mode?: DatePickerMode;
  onDateChange: (newDate: Date) => void;
}
