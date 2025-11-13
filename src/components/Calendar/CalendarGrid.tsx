import { CalendarCell } from './CalendarCell';
import { CalendarEvent } from '@/types/calendar.types';
import { formatDayOfWeek, isCurrentMonth, isTodayDate, isSameDayDate, isWeekend } from '@/utils/date.utils';
import { getEventsForDay, sortEventsByTime } from '@/utils/event.utils';

interface CalendarGridProps {
  days: Date[];
  currentDate: Date;
  selectedDate: Date | null;
  events: CalendarEvent[];
  viewMode: 'month' | 'week';
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarGrid = ({
  days,
  currentDate,
  selectedDate,
  events,
  viewMode,
  onDayClick,
  onEventClick,
}: CalendarGridProps) => {
  return (
    <div className="rounded-xl overflow-hidden bg-card shadow-card border">
      <div className="grid grid-cols-7 bg-muted/50 border-b">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground border-r last:border-r-0 border-border/50"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 divide-x divide-y divide-border/50">
        {days.map((day, index) => {
          const dayEvents = sortEventsByTime(getEventsForDay(events, day));
          
          return (
            <CalendarCell
              key={index}
              date={day}
              isCurrentMonth={isCurrentMonth(day, currentDate)}
              isToday={isTodayDate(day)}
              isSelected={selectedDate ? isSameDayDate(day, selectedDate) : false}
              isWeekend={isWeekend(day)}
              events={dayEvents}
              onClick={() => onDayClick(day)}
              onEventClick={onEventClick}
              viewMode={viewMode}
            />
          );
        })}
      </div>
    </div>
  );
};
