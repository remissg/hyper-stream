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
      <header className="border-b">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold">Calendar Application</h1>
          <p className="text-muted-foreground mt-1">Manage your events efficiently</p>
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        <CalendarView initialEvents={sampleEvents} />
      </main>
    </div>
  );
};

export default Index;
