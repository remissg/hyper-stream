import { useState } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { EventModal } from './EventModal';
import { CalendarEvent } from '@/types/calendar.types';

interface CalendarViewProps {
  initialEvents?: CalendarEvent[];
}

export const CalendarView = ({ initialEvents = [] }: CalendarViewProps) => {
  const {
    currentDate,
    selectedDate,
    viewMode,
    events,
    days,
    navigate,
    goToToday,
    setViewMode,
    selectDate,
    addEvent,
    updateEvent,
    deleteEvent,
  } = useCalendar(initialEvents);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | undefined>();
  const [modalDefaultDate, setModalDefaultDate] = useState<Date | undefined>();

  const handleDayClick = (date: Date) => {
    selectDate(date);
    setModalDefaultDate(date);
  };

  const handleCreateEvent = () => {
    setEditingEvent(undefined);
    setModalDefaultDate(selectedDate || new Date());
    setIsModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (event: CalendarEvent) => {
    if (editingEvent) {
      updateEvent(event.id, event);
    } else {
      addEvent(event);
    }
    setIsModalOpen(false);
    setEditingEvent(undefined);
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
    setIsModalOpen(false);
    setEditingEvent(undefined);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <CalendarHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onNavigate={navigate}
        onToday={goToToday}
        onViewModeChange={setViewMode}
        onCreateEvent={handleCreateEvent}
      />

      <CalendarGrid
        days={days}
        currentDate={currentDate}
        selectedDate={selectedDate}
        events={events}
        viewMode={viewMode}
        onDayClick={handleDayClick}
        onEventClick={handleEventClick}
      />

      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(undefined);
        }}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        event={editingEvent}
        defaultDate={modalDefaultDate}
      />
    </div>
  );
};
