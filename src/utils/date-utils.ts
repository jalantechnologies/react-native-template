// to handle date comparisons, blocked dates, range selection

// Checks whether two Date objects represent the same calendar day
export const isSameDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

// Determines whether a given date falls strictly between a start and end date
export const isDateInRange = (targetDate: Date, startDate: Date, endDate: Date): boolean => {
  const time = targetDate.getTime();
  return time > startDate.getTime() && time < endDate.getTime();
};

// Checks whether a particular day is blocked.
export const isBlocked = (
  day: number | null,
  blockedDates: Date[] | undefined,
  calendarMonth: number,
  calendarYear: number,
): boolean => {
  if (day === null || !blockedDates?.length) {
    return false;
  }

  return blockedDates.some(
    date =>
      date.getDate() === day &&
      date.getMonth() === calendarMonth &&
      date.getFullYear() === calendarYear,
  );
};
