import { format, formatDistanceToNow, formatDistance, subDays } from "date-fns";

type FormatDateParam = number | string | Date;

export const fDate = (date: FormatDateParam): string => {
  return format(new Date(date), "dd MMM, yyyy");
};

export const fDateTime24 = (date: FormatDateParam): string => {
  return format(new Date(date), "dd MMM, yyyy HH:mm");
};

export const fDateTime12 = (date: FormatDateParam): string => {
  return format(new Date(date), "dd MMM, yyyy p");
};

export const fDateTimeSuffix = (date: FormatDateParam): string => {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
};

export const fDateTimeSuffix2 = (date: FormatDateParam): string => {
  return format(new Date(date), "dd/MM/yyyy p");
};

export const fToNow = (date: FormatDateParam): string => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
};

export const getTimeNum = (date?: FormatDateParam): number => {
  return date ? new Date(date).getTime() : new Date().getTime();
};

export const isDateExpired = (date: FormatDateParam): boolean => {
  const now = new Date().getTime();
  const expiry = new Date(date).getTime();
  return expiry < now;
};
