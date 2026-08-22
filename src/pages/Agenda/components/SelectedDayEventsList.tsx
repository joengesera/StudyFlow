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
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-label-caps font-label-caps text-on-surface-variant uppercase">
          {format(selectedDay, 'EEEE d MMMM', { locale: fr })}
        </h3>
        <span className="text-label-sm font-label-sm text-on-surface-variant">
          {events.length} événement{events.length !== 1 ? 's' : ''}
        </span>
      </div>

      {events.length === 0 ? (
        <div className="border border-outline-variant bg-surface-container-lowest rounded-xl text-center py-10">
          <span className="material-symbols-outlined text-4xl mb-2 block text-outline">event_busy</span>
          <p className="text-body-md font-body-md text-on-surface-variant">Aucun événement pour cette journée.</p>
        </div>
      ) : (
        <div className="border border-outline-variant bg-surface-container-lowest rounded-xl overflow-hidden divide-y divide-outline-variant">
          {events.map((event) => {
            const course = courses.find((item) => item.id === event.courseId);
            const color = getCourseColor(courses, event.courseId);

            return (
              <button
                key={event.id}
                onClick={() => onSelectEvent(event)}
                className="relative flex items-center p-4 w-full text-left hover:bg-surface-container-low transition-colors"
              >
                <span className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: color }} />
                <div className="w-[120px] shrink-0 pl-4 pr-3">
                  <div className="text-label-sm font-label-sm font-medium text-on-background">
                    {format(parseISO(event.startDate), 'HH:mm')}
                  </div>
                  <div className="text-label-caps font-label-caps text-on-surface-variant">
                    {format(parseISO(event.endDate), 'HH:mm')}
                  </div>
                </div>
                <div className="w-px self-stretch mr-4" style={{ background: color }} />
                <div className="flex-1 min-w-0 pr-4">
                  <div className="text-body-md font-body-md font-medium text-on-surface truncate">
                    {course ? `${course.name} — ` : ''}{event.title}
                  </div>
                  {event.location && (
                    <div className="text-label-caps font-label-caps text-on-surface-variant flex items-center gap-1 mt-1 truncate">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {event.location}
                    </div>
                  )}
                </div>
                <span className={`px-3 py-1 rounded text-label-caps font-label-caps shrink-0 ${eventTypeBadge[event.type] ?? 'bg-surface-container-highest text-on-surface-variant'}`}>
                  {eventTypeLabel[event.type] ?? event.type}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
