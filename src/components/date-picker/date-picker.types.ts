export interface DatePickerProps {
  date: Date;
  onDateChange: (newDate: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
}
