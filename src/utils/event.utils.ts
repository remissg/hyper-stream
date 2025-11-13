import { CalendarEvent } from '@/types/calendar.types';
import { isSameDay, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

export const getEventsForDay = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);
  
  return events.filter(event => {
    const eventStart = startOfDay(event.startDate);
    const eventEnd = endOfDay(event.endDate);
    
    return isWithinInterval(dayStart, { start: eventStart, end: eventEnd }) ||
           isWithinInterval(dayEnd, { start: eventStart, end: eventEnd }) ||
           isWithinInterval(eventStart, { start: dayStart, end: dayEnd });
  });
};

export const sortEventsByTime = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

export const generateEventId = (): string => {
  return `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const validateEvent = (event: Partial<CalendarEvent>): boolean => {
  return !!(
    event.title &&
    event.startDate &&
    event.endDate &&
    event.startDate <= event.endDate
  );
};
