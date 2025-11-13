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
        'min-h-[100px] p-2 cursor-pointer transition-all duration-200',
        isWeekend && 'bg-calendar-weekend',
        !isCurrentMonth && 'opacity-40',
        isSelected && 'bg-accent ring-2 ring-primary/20',
        'hover:bg-calendar-hover'
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className={cn(
            'text-sm font-semibold transition-all',
            isToday && 'flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm',
            !isToday && 'text-foreground'
          )}
        >
          {formatDayOfMonth(date)}
        </span>
      </div>

      <div className="space-y-1.5">
        {displayedEvents.map((event) => (
          <div
            key={event.id}
            className={cn(
              'text-xs px-2 py-1 rounded-md cursor-pointer truncate transition-all duration-200 hover:scale-[1.02] hover:shadow-sm',
              `bg-event-${event.color} text-white font-medium`
            )}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event);
            }}
          >
            {!event.allDay && viewMode === 'week' && (
              <span className="font-bold opacity-90">{formatTime(event.startDate)} </span>
            )}
            <span className="opacity-95">{event.title}</span>
          </div>
        ))}
        {hasMoreEvents && (
          <div className="text-xs text-muted-foreground px-2 font-medium">
            +{events.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
};
