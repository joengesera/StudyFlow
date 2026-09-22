import { useState } from 'react';
import { addMonths, addWeeks, subMonths, subWeeks } from 'date-fns';
import { useCreateEvent, useDeleteEvent, useEvents, useUpdateEvent } from '../../hooks/useEvents';
import { useCourses } from '../../hooks/useCourses';
import type { Event } from '../../types';
import { AgendaHeader } from './components/AgendaHeader';
import { CalendarGrid } from './components/CalendarGrid';
import { CreateEventModal } from '../../components/events/CreateEventModal';
import { CourseFilterBar } from './components/CourseFilterBar';
import { DayTimelineView } from './components/DayTimelineView';
import { EventModal } from '../../components/events/EventModal';
import { SelectedDayEventsList } from './components/SelectedDayEventsList';
import { WeeklyPlanner } from './components/WeeklyPlanner';
import {
  type AgendaCourse,
  type AgendaViewMode,
  getEventsForDay,
  sortEventsByStartDate,
} from './agendaShared';

export default function AgendaPage() {
  const { data: events = [], isLoading: eventsLoading } = useEvents();
  const { data: courses = [] } = useCourses();
  const { mutateAsync: createEventAsync, isPending: isCreating } = useCreateEvent();
  const { mutate: updateEvent } = useUpdateEvent();
  const { mutate: deleteEvent } = useDeleteEvent();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeCourseFilter, setActiveCourseFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<AgendaViewMode>('week');

  const activeCourses: AgendaCourse[] = courses
    .filter((course) => !course.isDeleted)
    .map((course) => ({ id: course.id, name: course.name, color: course.color }));

  const filteredEvents = activeCourseFilter
    ? events.filter((event) => event.courseId === activeCourseFilter)
    : events;

  const selectedDayEvents = sortEventsByStartDate(getEventsForDay(filteredEvents, selectedDay));

  const handlePreviousPeriod = () => {
    setCurrentDate(viewMode === 'month' ? subMonths(currentDate, 1) : subWeeks(currentDate, 1));
  };

  const handleNextPeriod = () => {
    setCurrentDate(viewMode === 'month' ? addMonths(currentDate, 1) : addWeeks(currentDate, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDay(today);
  };

  const handleCreateEvents = async (payloads: Partial<Event>[]) => {
    try {
      for (const payload of payloads) {
        await createEventAsync(payload as Omit<Event, 'id'>);
      }
      setShowCreateModal(false);
    } catch (error) {
      console.error('Erreur lors de la création multiple:', error);
    }
  };

  return (
    <div className="space-y-0">
      <AgendaHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onPrevious={handlePreviousPeriod}
        onNext={handleNextPeriod}
        onToday={handleToday}
        onViewModeChange={setViewMode}
        onCreateEvent={() => setShowCreateModal(true)}
      />

      <CourseFilterBar
        activeCourseFilter={activeCourseFilter}
        courses={activeCourses}
        onSelectCourse={(courseId) => setActiveCourseFilter((currentFilter) => (currentFilter === courseId ? null : courseId))}
        onReset={() => setActiveCourseFilter(null)}
      />

      {eventsLoading ? (
        <div className="border border-outline-variant bg-surface-container-lowest rounded-xl h-[500px] animate-pulse" />
      ) : viewMode === 'month' ? (
        <>
          <CalendarGrid
            currentMonth={currentDate}
            events={filteredEvents}
            courses={activeCourses}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
          <SelectedDayEventsList
            selectedDay={selectedDay}
            events={selectedDayEvents}
            courses={activeCourses}
            onSelectEvent={setSelectedEvent}
          />
        </>
      ) : viewMode === 'day' ? (
        <>
          <div className="md:hidden">
            <DayTimelineView
              currentDate={currentDate}
              events={filteredEvents}
              courses={activeCourses}
              onSelectDay={(day) => {
                setSelectedDay(day);
                setCurrentDate(day);
              }}
              onSelectEvent={setSelectedEvent}
            />
          </div>
          <div className="hidden md:block">
            <WeeklyPlanner
              currentDate={currentDate}
              events={filteredEvents}
              courses={activeCourses}
              onSelectEvent={setSelectedEvent}
            />
          </div>
        </>
      ) : (
        <WeeklyPlanner
          currentDate={currentDate}
          events={filteredEvents}
          courses={activeCourses}
          onSelectEvent={setSelectedEvent}
        />
      )}

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          courseColor={activeCourses.find((course) => course.id === selectedEvent.courseId)?.color}
          onClose={() => setSelectedEvent(null)}
          onDelete={deleteEvent}
          onUpdate={(id, payload) => updateEvent({ id, payload })}
        />
      )}

      {showCreateModal && (
        <CreateEventModal
          defaultDate={selectedDay}
          courses={activeCourses}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateEvents}
          isLoading={isCreating}
        />
      )}
    </div>
  );
}