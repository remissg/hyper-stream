export type EventColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange';

export type ViewMode = 'month' | 'week';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color: EventColor;
  allDay?: boolean;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isWeekend: boolean;
  events: CalendarEvent[];
}

export interface CalendarState {
  currentDate: Date;
  selectedDate: Date | null;
  viewMode: ViewMode;
  events: CalendarEvent[];
}
