import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarEvent, EventColor } from '@/types/calendar.types';
import { generateEventId, validateEvent } from '@/utils/event.utils';
import { format } from 'date-fns';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete?: (eventId: string) => void;
  event?: CalendarEvent;
  defaultDate?: Date;
}

export const EventModal = ({ isOpen, onClose, onSave, onDelete, event, defaultDate }: EventModalProps) => {
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    startDate: defaultDate || new Date(),
    endDate: defaultDate || new Date(),
    color: 'blue',
    allDay: false,
  });

  useEffect(() => {
    if (event) {
      setFormData(event);
    } else if (defaultDate) {
      setFormData(prev => ({
        ...prev,
        startDate: defaultDate,
        endDate: defaultDate,
      }));
    }
  }, [event, defaultDate]);

  const handleSave = () => {
    if (!validateEvent(formData)) return;

    const eventToSave: CalendarEvent = {
      id: event?.id || generateEventId(),
      title: formData.title!,
      description: formData.description,
      startDate: formData.startDate!,
      endDate: formData.endDate!,
      color: formData.color!,
      allDay: formData.allDay,
    };

    onSave(eventToSave);
    onClose();
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
      onClose();
    }
  };

  const formatDateForInput = (date: Date) => {
    return format(date, "yyyy-MM-dd'T'HH:mm");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] shadow-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{event ? 'Edit Event' : 'Create Event'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Event title"
              className="h-10 shadow-elegant"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Event description"
              rows={3}
              className="shadow-elegant resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-semibold">Start Date *</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={formatDateForInput(formData.startDate!)}
                onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
                className="h-10 shadow-elegant"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-sm font-semibold">End Date *</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={formatDateForInput(formData.endDate!)}
                onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
                className="h-10 shadow-elegant"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color" className="text-sm font-semibold">Color</Label>
            <Select
              value={formData.color}
              onValueChange={(value) => setFormData({ ...formData, color: value as EventColor })}
            >
              <SelectTrigger id="color" className="h-10 shadow-elegant">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-event-blue" />
                    <span>Blue</span>
                  </div>
                </SelectItem>
                <SelectItem value="green">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-event-green" />
                    <span>Green</span>
                  </div>
                </SelectItem>
                <SelectItem value="red">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-event-red" />
                    <span>Red</span>
                  </div>
                </SelectItem>
                <SelectItem value="yellow">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-event-yellow" />
                    <span>Yellow</span>
                  </div>
                </SelectItem>
                <SelectItem value="purple">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-event-purple" />
                    <span>Purple</span>
                  </div>
                </SelectItem>
                <SelectItem value="orange">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-event-orange" />
                    <span>Orange</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex justify-between gap-2">
          <div>
            {event && onDelete && (
              <Button variant="destructive" onClick={handleDelete} className="shadow-sm">
                Delete Event
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="shadow-elegant">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!validateEvent(formData)} className="shadow-sm">
              {event ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
