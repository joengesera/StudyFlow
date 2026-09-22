import { useMemo, useState } from 'react';
import { useCreateEvent, useDeleteEvent, useEvents, useUpdateEvent } from '../../hooks/useEvents';
import { useCourses } from '../../hooks/useCourses';
import type { Event, EventType } from '../../types';
import { CreateEventModal } from '../../components/events/CreateEventModal';
import { EventModal } from '../../components/events/EventModal';
import { EventsHeader } from './components/EventsHeader';
import { EventsStatsCards } from './components/EventsStatsCards';
import { EventsFilters } from './components/EventsFilters';
import { EventsList } from './components/EventsList';
import { computeEventsStats, filterAndSortEvents, type EventsHorizonFilter } from './eventsShared';

export default function EventsPage() {
  const { data: events = [], isLoading } = useEvents();
  const { data: courses = [] } = useCourses();
  const { mutateAsync: createEventAsync, isPending: isCreating } = useCreateEvent();
  const { mutate: updateEvent } = useUpdateEvent();
  const { mutate: deleteEvent } = useDeleteEvent();

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<EventType | 'ALL'>('ALL');
  const [courseFilter, setCourseFilter] = useState<string | null>(null);
  const [horizonFilter, setHorizonFilter] = useState<EventsHorizonFilter>('ALL');

  const stats = useMemo(() => computeEventsStats(events), [events]);
  const filteredEvents = useMemo(
    () => filterAndSortEvents(events, typeFilter, courseFilter, horizonFilter),
    [events, typeFilter, courseFilter, horizonFilter],
  );

  const handleCreate = async (payloads: Partial<Event>[]) => {
    try {
      await Promise.all(payloads.map((payload) => createEventAsync(payload)));
      setIsCreateOpen(false);
    } catch {
      setIsCreateOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-on-surface-variant">
        Chargement des événements...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <EventsHeader stats={stats} onCreate={() => setIsCreateOpen(true)} />
      <EventsStatsCards stats={stats} />
      <EventsFilters
        courses={courses}
        typeFilter={typeFilter}
        courseFilter={courseFilter}
        horizonFilter={horizonFilter}
        onTypeFilterChange={setTypeFilter}
        onCourseFilterToggle={(courseId) =>
          setCourseFilter((current) => (current === courseId ? null : courseId))
        }
        onHorizonFilterChange={setHorizonFilter}
      />
      <EventsList
        events={filteredEvents}
        courses={courses}
        onSelectEvent={setSelectedEvent}
        onCreate={() => setIsCreateOpen(true)}
      />

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          courseColor={courses.find((course) => course.id === selectedEvent.courseId)?.color}
          onClose={() => setSelectedEvent(null)}
          onDelete={deleteEvent}
          onUpdate={(id, payload) => updateEvent({ id, payload })}
        />
      )}

      {isCreateOpen && (
        <CreateEventModal
          defaultDate={new Date()}
          courses={courses}
          isLoading={isCreating}
          onClose={() => setIsCreateOpen(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}