import { cn } from '@/lib/utils';
import { CalendarEvent } from '@/types/calendar.types';
import { formatDayOfMonth, formatTime } from '@/utils/date.utils';

interface CalendarCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isWeekend: boolean;
  events: CalendarEvent[];
  onClick: () => void;
  onEventClick: (event: CalendarEvent) => void;
  viewMode: 'month' | 'week';
}

export const CalendarCell = ({
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  isWeekend,
  events,
  onClick,
  onEventClick,
  viewMode,
}: CalendarCellProps) => {
  const displayedEvents = viewMode === 'month' ? events.slice(0, 3) : events;
  const hasMoreEvents = viewMode === 'month' && events.length > 3;

  return (
    <div
      className={cn(
        'min-h-[100px] border border-border p-2 cursor-pointer transition-colors',
        isWeekend && 'bg-calendar-weekend',
        !isCurrentMonth && 'opacity-40',
        isSelected && 'ring-2 ring-calendar-selected',
        'hover:bg-calendar-hover'
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-1">
        <span
          className={cn(
            'text-sm font-medium',
            isToday && 'flex h-7 w-7 items-center justify-center rounded-full bg-calendar-today text-primary-foreground'
          )}
        >
          {formatDayOfMonth(date)}
        </span>
      </div>

      <div className="space-y-1">
        {displayedEvents.map((event) => (
          <div
            key={event.id}
            className={cn(
              'text-xs p-1 rounded cursor-pointer truncate transition-opacity hover:opacity-80',
              `bg-event-${event.color} text-white`
            )}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event);
            }}
          >
            {!event.allDay && viewMode === 'week' && (
              <span className="font-semibold">{formatTime(event.startDate)} </span>
            )}
            {event.title}
          </div>
        ))}
        {hasMoreEvents && (
          <div className="text-xs text-muted-foreground px-1">
            +{events.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
};
