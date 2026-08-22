import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Event } from '../../../types';
import {
  eventTypeBadge,
  eventTypeLabel,
  getCourseColor,
  type AgendaCourse,
} from '../agendaShared';

interface SelectedDayEventsListProps {
  selectedDay: Date;
  events: Event[];
  courses: AgendaCourse[];
  onSelectEvent: (event: Event) => void;
}

export function SelectedDayEventsList({
  selectedDay,
  events,
  courses,
  onSelectEvent,
}: SelectedDayEventsListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-label-caps font-label-caps text-on-surface-variant">
          {format(selectedDay, 'EEEE d MMMM', { locale: fr })}
        </div>
        <span className="text-label-sm font-label-sm text-on-surface-variant">
          {events.length} événement{events.length !== 1 ? 's' : ''}
        </span>
      </div>

      {events.length === 0 ? (
        <div className="card card-padded text-center text-on-surface-variant py-10">
          <span className="material-symbols-outlined text-4xl mb-2 block text-outline">event_busy</span>
          <p className="text-body-md font-body-md">Aucun événement pour cette journée.</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="divide-y divide-outline-variant">
            {events.map((event, index) => {
              const course = courses.find((item) => item.id === event.courseId);
              const color = getCourseColor(courses, event.courseId);
              const isNotLast = index !== events.length - 1;

              return (
                <button
                  key={event.id}
                  onClick={() => onSelectEvent(event)}
                  className={`flex items-center p-4 w-full text-left hover:bg-surface-container-low transition-colors ${isNotLast ? 'border-b border-outline-variant' : ''}`}
                >
                  <div className="absolute left-4 top-4 bottom-4 w-1 rounded-full" style={{ background: color }} />
                  <div className="w-[130px] shrink-0 pl-8 text-label-sm font-label-sm text-on-surface-variant">
                    {format(parseISO(event.startDate), 'HH:mm')} – {format(parseISO(event.endDate), 'HH:mm')}
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="text-body-md font-body-md font-medium text-on-surface truncate">
                      {course ? `${course.name} — ` : ''}{event.title}
                    </div>
                    <div className="text-label-sm font-label-sm text-on-surface-variant mt-0.5 truncate">
                      {event.location || event.description || '—'}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded text-label-caps font-label-caps shrink-0 ${eventTypeBadge[event.type] ?? 'bg-surface-container-highest text-on-surface-variant'}`}>
                    {eventTypeLabel[event.type] ?? event.type}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}