export const convertDaysToMilliseconds = (days: number): number => {
  return days * 24 * 60 * 60 * 1000;
};

export const convertDaysToMicroseconds = (days: number): number => {
  return days * 24 * 60 * 60 * 1000000;
};
