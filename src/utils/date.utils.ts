import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, isSameDay, addMonths, subMonths, addWeeks, subWeeks, startOfDay } from 'date-fns';

export const getMonthDays = (date: Date): Date[] => {
  const start = startOfWeek(startOfMonth(date));
  const end = endOfWeek(endOfMonth(date));
  return eachDayOfInterval({ start, end });
};

export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date);
  const end = endOfWeek(date);
  return eachDayOfInterval({ start, end });
};

export const formatMonthYear = (date: Date): string => {
  return format(date, 'MMMM yyyy');
};

export const formatDayOfWeek = (date: Date): string => {
  return format(date, 'EEE');
};

export const formatDayOfMonth = (date: Date): string => {
  return format(date, 'd');
};

export const formatTime = (date: Date): string => {
  return format(date, 'HH:mm');
};

export const isCurrentMonth = (date: Date, referenceDate: Date): boolean => {
  return isSameMonth(date, referenceDate);
};

export const isTodayDate = (date: Date): boolean => {
  return isToday(date);
};

export const isSameDayDate = (date1: Date, date2: Date): boolean => {
  return isSameDay(date1, date2);
};

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export const navigateMonth = (date: Date, direction: 'next' | 'prev'): Date => {
  return direction === 'next' ? addMonths(date, 1) : subMonths(date, 1);
};

export const navigateWeek = (date: Date, direction: 'next' | 'prev'): Date => {
  return direction === 'next' ? addWeeks(date, 1) : subWeeks(date, 1);
};

export const normalizeDate = (date: Date): Date => {
  return startOfDay(date);
};
