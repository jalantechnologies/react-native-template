import { LayoutRectangle } from 'react-native';

// Picker display mode: Date only, Time only, or both
export enum DateTimePickerMode {
  DATE = 'date',
  DATETIME = 'datetime',
  TIME = 'time',
}

// Date selection type: Single date or a Range
export enum DateSelectionMode {
  SINGLE = 'single',
  RANGE = 'range',
}

// Predefined quick-select options
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

// Props for the Calendar compone
export interface CalendarProps {
  blockedDates?: Date[];
  currentMonth: number; // 0–11
  currentYear: number;
  dateSelectionMode?: DateSelectionMode;
  onCancel: () => void;
  onConfirm: (date: Date | { startDate: Date | null; endDate: Date | null }) => void;
  onDateSelect: (day: number) => void;
  onMonthChange: (increment: number) => void; // +1 for next, -1 for prev
  onYearPress: () => void;
  tempDate: Date;
  onYearLayout: (layout: LayoutRectangle) => void;
}

// Props for a generic DatePicker modal
export interface DatePickerProps {
  blockedDates?: Date[];
  dateSelectionMode?: DateSelectionMode;
  onCancel: () => void;
  onChange: (date: Date | { start: Date | null; end: Date | null }) => void;
  tempDate: Date;
  triggerLayout: LayoutRectangle;
}

// Base props shared between Single and Range pickers
interface BaseDateTimePickerProps {
  blockedDates?: Date[];
  label?: string;
}

// Single date/time picker props
export interface SingleDateTimePickerProps extends BaseDateTimePickerProps {
  dateSelectionMode?: DateSelectionMode.SINGLE;
  value: Date;
  mode: DateTimePickerMode.DATE | DateTimePickerMode.TIME | DateTimePickerMode.DATETIME;
  onChange: (date: Date) => void;
}

// Range date picker props
export interface RangeDateTimePickerProps extends BaseDateTimePickerProps {
  dateSelectionMode: DateSelectionMode.RANGE;
  value: { start: Date; end: Date } | null;
  mode: DateTimePickerMode.DATE;
  onChange: (range: { start: Date; end: Date }) => void;
}

export type DateTimePickerProps = SingleDateTimePickerProps | RangeDateTimePickerProps;

// Props for TimePicker modal
export interface TimePickerProps {
  onCancel: () => void;
  onChange: (date: Date) => void;
  tempDate: Date;
  triggerLayout: LayoutRectangle;
}

// Props for YearPicker modal
export interface YearPickerProps {
  calendarYear: number;
  onYearSelect: (year: number) => void;
}
