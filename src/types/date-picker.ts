export enum DateTimePickerMode {
  DATE = 'date',
  DATETIME = 'datetime',
  TIME = 'time',
}

export interface CalendarProps {
  calendarMonth: number;
  calendarYear: number;
  onCancel: () => void;
  onConfirm: () => void;
  onDateSelect: (day: number) => void;
  onMonthChange: (increment: number) => void;
  onYearPress: () => void;
  tempDate: Date;
}

export interface DatePickerProps {
  onCancel: () => void;
  onChange: (date: Date) => void;
  tempDate: Date;
}

export interface DateTimePickerProps {
  label?: string;
  mode: DateTimePickerMode;
  onChange: (date: Date) => void;
  value: Date;
}

export interface TimePickerProps {
  onCancel: () => void;
  onChange: (date: Date) => void;
  tempDate: Date;
}

export interface YearPickerProps {
  calendarYear: number;
  onCancel: () => void;
  onYearSelect: (year: number) => void;
}
