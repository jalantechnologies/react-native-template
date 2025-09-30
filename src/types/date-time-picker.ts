import { LayoutRectangle } from 'react-native';

export enum DateTimePickerMode {
  DATE = 'date',
  DATETIME = 'datetime',
  TIME = 'time',
}

export enum DateSelectionMode {
  SINGLE = 'single',
  RANGE = 'range',
}

export enum PresetOption {
  LAST_3_DAYS = 'last3',
  LAST_7_DAYS = 'last7',
  LAST_14_DAYS = 'last14',
  LAST_MONTH = 'lastmonth',
  NEXT_3_DAYS = 'next3',
  NEXT_7_DAYS = 'next7',
  NEXT_14_DAYS = 'next14',
  THIS_MONTH = 'thismonth',
}

export interface CalendarProps {
  blockedDates?: Date[];
  calendarMonth: number;
  calendarYear: number;
  dateSelectionMode?: DateSelectionMode;
  onCancel: () => void;
  onConfirm: (date: Date | { startDate: Date | null; endDate: Date | null }) => void;
  onDateSelect: (day: number) => void;
  onMonthChange: (increment: number) => void;
  onYearPress: () => void;
  tempDate: Date;
  onYearLayout: (layout: LayoutRectangle) => void;
}

export interface DatePickerProps {
  blockedDates?: Date[];
  dateSelectionMode?: DateSelectionMode;
  onCancel: () => void;
  onChange: (date: Date | { start: Date | null; end: Date | null }) => void;
  tempDate: Date;
  triggerLayout: LayoutRectangle;
}

interface BaseDateTimePickerProps {
  blockedDates?: Date[];
  label?: String;
}

export interface SingleDateTimePickerProps extends BaseDateTimePickerProps {
  dateSelectionMode?: DateSelectionMode.SINGLE;
  value: Date;
  mode: DateTimePickerMode.DATE | DateTimePickerMode.TIME | DateTimePickerMode.DATETIME;
  onChange: (date: Date) => void;
}

export interface RangeDateTimePickerProps extends BaseDateTimePickerProps {
  dateSelectionMode: DateSelectionMode.RANGE;
  value: { start: Date; end: Date } | null;
  mode: DateTimePickerMode.DATE;
  onChange: (range: { start: Date; end: Date }) => void;
}

export type DateTimePickerProps = SingleDateTimePickerProps | RangeDateTimePickerProps;

export interface TimePickerProps {
  onCancel: () => void;
  onChange: (date: Date) => void;
  tempDate: Date;
  triggerLayout: LayoutRectangle;
}

export interface YearPickerProps {
  calendarYear: number;
  onYearSelect: (year: number) => void;
}
