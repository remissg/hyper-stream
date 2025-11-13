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
    <div className="border rounded-lg overflow-hidden bg-card">
      <div className="grid grid-cols-7 bg-muted">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-semibold border-r last:border-r-0 border-border"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
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
