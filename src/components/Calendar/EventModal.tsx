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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{event ? 'Edit Event' : 'Create Event'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Event title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Event description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={formatDateForInput(formData.startDate!)}
                onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={formatDateForInput(formData.endDate!)}
                onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <Select
              value={formData.color}
              onValueChange={(value) => setFormData({ ...formData, color: value as EventColor })}
            >
              <SelectTrigger id="color">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {event && onDelete && (
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!validateEvent(formData)}>
              {event ? 'Update' : 'Create'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
