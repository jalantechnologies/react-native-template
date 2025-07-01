export enum DateTimePickerMode {
  DATE = 'date',
  DATETIME = 'datetime',
  TIME = 'time',
}

export enum ClockMode {
  HOUR = 'hour',
  MINUTE = 'minute',
}

export interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  mode: DateTimePickerMode;
  label?: string;
}

export interface CalendarProps {
  tempDate: Date;
  calendarMonth: number;
  calendarYear: number;
  label?: string;
  onDateSelect: (day: number) => void;
  onMonthChange: (increment: number) => void;
  onYearPress: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export interface YearPickerProps {
  calendarYear: number;
  onYearSelect: (year: number) => void;
  onCancel: () => void;
}

export interface ClockFaceProps {
  tempDate: Date;
  clockMode: ClockMode;
  onSelect: (val: number) => void;
}

export interface ClockHandProps {
  tempDate: Date;
  clockMode: ClockMode;
}

export interface ClockAmPmSelectionProps {
  tempDate: Date;
  visible: boolean;
  onSelect: (updatedDate: Date) => void;
  onCancel: () => void;
}

export interface TimePickerProps {
  tempDate: Date;
  onChange: (date: Date) => void;
  onCancel: () => void;
}

export interface DatePickerProps {
  tempDate: Date;
  onChange: (date: Date) => void;
  onCancel: () => void;
  label?: string;
}
