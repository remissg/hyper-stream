import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { formatMonthYear } from '@/utils/date.utils';
import { ViewMode } from '@/types/calendar.types';
import { cn } from '@/lib/utils';

interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: ViewMode;
  onNavigate: (direction: 'next' | 'prev') => void;
  onToday: () => void;
  onViewModeChange: (mode: ViewMode) => void;
  onCreateEvent: () => void;
}

export const CalendarHeader = ({
  currentDate,
  viewMode,
  onNavigate,
  onToday,
  onViewModeChange,
  onCreateEvent,
}: CalendarHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold">{formatMonthYear(currentDate)}</h2>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate('prev')}
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate('next')}
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={onToday}>
            Today
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex gap-1 border rounded-md p-1">
          <Button
            variant={viewMode === 'month' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('month')}
            className={cn(viewMode === 'month' && 'bg-primary text-primary-foreground')}
          >
            Month
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('week')}
            className={cn(viewMode === 'week' && 'bg-primary text-primary-foreground')}
          >
            Week
          </Button>
        </div>
        <Button onClick={onCreateEvent} className="gap-2">
          <CalendarIcon className="h-4 w-4" />
          Create Event
        </Button>
      </div>
    </div>
  );
};
