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
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">{formatMonthYear(currentDate)}</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border rounded-lg p-0.5 bg-card shadow-elegant">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('prev')}
              aria-label="Previous"
              className="h-8 w-8 hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('next')}
              aria-label="Next"
              className="h-8 w-8 hover:bg-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" onClick={onToday} className="h-8 font-medium shadow-elegant">
            Today
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex gap-0.5 border rounded-lg p-1 bg-card shadow-elegant">
          <Button
            variant={viewMode === 'month' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('month')}
            className={cn(
              'h-8 px-4 font-medium transition-all',
              viewMode === 'month' && 'bg-primary text-primary-foreground shadow-sm'
            )}
          >
            Month
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('week')}
            className={cn(
              'h-8 px-4 font-medium transition-all',
              viewMode === 'week' && 'bg-primary text-primary-foreground shadow-sm'
            )}
          >
            Week
          </Button>
        </div>
        <Button onClick={onCreateEvent} className="gap-2 h-9 px-4 font-medium shadow-sm">
          <CalendarIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Create Event</span>
          <span className="sm:hidden">Create</span>
        </Button>
      </div>
    </div>
  );
};
