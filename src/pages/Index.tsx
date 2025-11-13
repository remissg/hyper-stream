import { CalendarView } from '@/components/Calendar/CalendarView';
import { CalendarEvent } from '@/types/calendar.types';

// Sample events for demonstration
const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly sync with the team',
    startDate: new Date(2025, 10, 15, 10, 0),
    endDate: new Date(2025, 10, 15, 11, 0),
    color: 'blue',
    allDay: false,
  },
  {
    id: '2',
    title: 'Project Deadline',
    description: 'Submit final deliverables',
    startDate: new Date(2025, 10, 20, 17, 0),
    endDate: new Date(2025, 10, 20, 18, 0),
    color: 'red',
    allDay: false,
  },
  {
    id: '3',
    title: 'Conference',
    description: 'Annual tech conference',
    startDate: new Date(2025, 10, 18, 9, 0),
    endDate: new Date(2025, 10, 18, 17, 0),
    color: 'green',
    allDay: true,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-elegant">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <svg className="h-6 w-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Organize and manage your schedule</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <CalendarView initialEvents={sampleEvents} />
      </main>
    </div>
  );
};

export default Index;
