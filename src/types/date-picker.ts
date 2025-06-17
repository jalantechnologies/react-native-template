export enum DatePickerMode {
  DATE = 'date',
  DATETIME = 'datetime',
  TIME = 'time',
}


export interface DatePickerProps {
  date: Date;
  mode?: DatePickerMode;
  onDateChange: (newDate: Date) => void;
}
