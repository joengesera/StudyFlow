import { CalendarPlus, CalendarX, MapPin } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import type { Course, Event } from '../../../types';
import { eventTypeBadge, eventTypeLabel } from '../../../lib/eventMeta';
import { formatEventDuration, groupEvents, groupLabels } from '../eventsShared';

interface EventsListProps {
  events: Event[];
  courses: Course[];
  onSelectEvent: (event: Event) => void;
  onCreate: () => void;
}

const EventRow = ({
  event,
  course,
  onSelect,
}: {
  event: Event;
  course: Course | undefined;
  onSelect: (event: Event) => void;
}) => {
  const start = parseISO(event.startDate);
  const color = course?.color ?? 'var(--color-on-surface)';

  return (
    <button
      onClick={() => onSelect(event)}
      className="relative flex items-center gap-4 p-4 w-full text-left hover:bg-surface-container-low transition-colors"
    >
      <span className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: color }} />
      <div className="w-[110px] shrink-0 pl-3">
        {event.isAllDay ? (
          <div className="text-label-sm font-label-sm font-medium text-on-background">Toute la journée</div>
        ) : (
          <>
            <div className="text-label-sm font-label-sm font-medium text-on-background">
              {format(start, 'HH:mm')}
            </div>
            <div className="text-label-caps font-label-caps text-on-surface-variant mt-0.5">
              {formatEventDuration(event)}
            </div>
          </>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-body-md font-body-md font-medium text-on-surface truncate">{event.title}</div>
        <div className="text-label-caps font-label-caps text-on-surface-variant flex items-center gap-1.5 mt-0.5 truncate">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
          <span>{course?.name ?? 'Général'}</span>
          {event.location && (
            <>
              <span className="w-1 h-1 bg-outline-variant rounded-full shrink-0" />
              <span className="flex items-center gap-1 min-w-0">
                <MapPin className="text-[12px] shrink-0" />
                <span className="truncate">{event.location}</span>
              </span>
            </>
          )}
        </div>
      </div>
      <span
        className={`px-2.5 py-1 rounded text-label-caps font-label-caps shrink-0 ${
          eventTypeBadge[event.type] ?? 'bg-surface-container-highest text-on-surface-variant'
        }`}
      >
        {eventTypeLabel[event.type] ?? event.type}
      </span>
    </button>
  );
};

export const EventsList = ({ events, courses, onSelectEvent, onCreate }: EventsListProps) => {
  if (events.length === 0) {
    return (
      <div className="card card-padded text-center text-on-surface-variant py-10">
        <CalendarX className="text-4xl mb-2 block text-outline" />
        <p className="text-body-md font-body-md mb-4">Aucun événement trouvé.</p>
        <button onClick={onCreate} className="btn btn-primary mx-auto">
          <CalendarPlus className="text-[18px]" />
          Nouvel événement
        </button>
      </div>
    );
  }

  const groups = groupEvents(events);

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.key}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-label-caps font-label-caps text-on-surface-variant uppercase">
              {groupLabels[group.key]}
            </h3>
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              {group.events.length} événement{group.events.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="card overflow-hidden divide-y divide-outline-variant">
            {group.events.map((event) => {
              const course = courses.find((item) => item.id === event.courseId);
              return (
                <EventRow key={event.id} event={event} course={course} onSelect={onSelectEvent} />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};