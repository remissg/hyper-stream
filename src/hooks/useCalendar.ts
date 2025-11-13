import { useState, useCallback, useMemo } from 'react';
import { CalendarEvent, CalendarState, ViewMode } from '@/types/calendar.types';
import { navigateMonth, navigateWeek, getMonthDays, getWeekDays, normalizeDate } from '@/utils/date.utils';

export const useCalendar = (initialEvents: CalendarEvent[] = []) => {
  const [state, setState] = useState<CalendarState>({
    currentDate: new Date(),
    selectedDate: null,
    viewMode: 'month',
    events: initialEvents,
  });

  const days = useMemo(() => {
    return state.viewMode === 'month' 
      ? getMonthDays(state.currentDate)
      : getWeekDays(state.currentDate);
  }, [state.currentDate, state.viewMode]);

  const navigate = useCallback((direction: 'next' | 'prev') => {
    setState(prev => ({
      ...prev,
      currentDate: prev.viewMode === 'month' 
        ? navigateMonth(prev.currentDate, direction)
        : navigateWeek(prev.currentDate, direction),
    }));
  }, []);

  const goToToday = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: new Date(),
      selectedDate: new Date(),
    }));
  }, []);

  const setViewMode = useCallback((mode: ViewMode) => {
    setState(prev => ({ ...prev, viewMode: mode }));
  }, []);

  const selectDate = useCallback((date: Date) => {
    setState(prev => ({ ...prev, selectedDate: normalizeDate(date) }));
  }, []);

  const addEvent = useCallback((event: CalendarEvent) => {
    setState(prev => ({
      ...prev,
      events: [...prev.events, event],
    }));
  }, []);

  const updateEvent = useCallback((eventId: string, updates: Partial<CalendarEvent>) => {
    setState(prev => ({
      ...prev,
      events: prev.events.map(event => 
        event.id === eventId ? { ...event, ...updates } : event
      ),
    }));
  }, []);

  const deleteEvent = useCallback((eventId: string) => {
    setState(prev => ({
      ...prev,
      events: prev.events.filter(event => event.id !== eventId),
    }));
  }, []);

  return {
    ...state,
    days,
    navigate,
    goToToday,
    setViewMode,
    selectDate,
    addEvent,
    updateEvent,
    deleteEvent,
  };
};
