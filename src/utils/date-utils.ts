export const isSameDate = (d1: Date, d2: Date): boolean => {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

export const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
  return date.getTime() > start.getTime() && date.getTime() < end.getTime();
};

export const isBlocked = (
  day: number | null,
  blockedDates: Date[] | undefined,
  calendarMonth: number,
  calendarYear: number,
): boolean => {
  if (day === null || !blockedDates) {
    return false;
  }

  return blockedDates.some(
    date =>
      date.getDate() === day &&
      date.getMonth() === calendarMonth &&
      date.getFullYear() === calendarYear,
  );
};
