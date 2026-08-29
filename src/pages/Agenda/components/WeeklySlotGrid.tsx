import { Fragment } from 'react';
import { addDays, format, isSameDay, isToday, parseISO, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Event } from '../../../types';
import {
  getCourseColor,
  getEventsForDay,
  type AgendaCourse,
} from '../agendaShared';

const GUTTER_WIDTH = 48;
const WEEK_DAY_COUNT = 6;

interface WeeklySlotGridProps {
  currentDate: Date;
  events: Event[];
  courses: AgendaCourse[];
  onSelectEvent: (event: Event) => void;
}

export function WeeklySlotGrid({
  currentDate,
  events,
  courses,
  onSelectEvent,
}: WeeklySlotGridProps) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = Array.from({ length: WEEK_DAY_COUNT }, (_, index) => addDays(weekStart, index));

  const times = Array.from(
    new Set(
      events
        .filter((event) => days.some((day) => isSameDay(parseISO(event.startDate), day)))
        .map((event) => format(parseISO(event.startDate), 'HH:mm')),
    ),
  ).sort();

  const getSlotEvents = (day: Date, time: string) =>
    getEventsForDay(events, day)
      .filter((event) => format(parseISO(event.startDate), 'HH:mm') === time)
      .sort((left, right) => parseISO(left.startDate).getTime() - parseISO(right.startDate).getTime());

  return (
    <div className="border border-outline-variant bg-surface-container-lowest rounded-xl overflow-hidden">
      <div
        className="grid gap-[2px] min-w-[300px]"
        style={{ gridTemplateColumns: `${GUTTER_WIDTH}px repeat(${WEEK_DAY_COUNT}, minmax(0, 1fr))` }}
      >
        {/* Header: empty gutter cell + days */}
        <div />
        {days.map((day) => (
          <div key={format(day, 'yyyy-MM-dd')} className={`py-2.5 text-center ${isToday(day) ? 'bg-surface-container-low' : ''}`}>
            <div className={`text-label-caps font-label-caps uppercase ${isToday(day) ? 'text-primary' : 'text-on-surface-variant'}`}>
              {format(day, 'EEE', { locale: fr }).replace('.', '')}
            </div>
            <div className={`text-headline-sm font-headline-sm ${isToday(day) ? 'text-primary' : 'text-on-background'}`}>
              {format(day, 'd')}
            </div>
          </div>
        ))}

        {/* Body: one row per start time */}
        {times.map((time) => (
          <Fragment key={time}>
            <div className="text-label-caps font-label-caps text-on-surface-variant flex items-center justify-end pr-1">
              {time}
            </div>
            {days.map((day) => {
              const slotEvents = getSlotEvents(day, time);
              return (
                <div
                  key={`${format(day, 'yyyy-MM-dd')}-${time}`}
                  className="min-h-[80px] border border-outline-variant rounded-lg bg-surface-container-low p-1 flex flex-col gap-1"
                >
                  {slotEvents.map((event) => {
                    const color = getCourseColor(courses, event.courseId);
                    return (
                      <button
                        key={event.id}
                        onClick={() => onSelectEvent(event)}
                        className="w-full text-left rounded-md p-1.5 overflow-hidden transition-[filter] hover:brightness-[0.97] cursor-pointer"
                        style={{ backgroundColor: `${color}14`, borderLeft: `3px solid ${color}` }}
                        title={`${event.title} (${format(parseISO(event.startDate), 'HH:mm')} – ${format(parseISO(event.endDate), 'HH:mm')})`}
                      >
                        <div className="text-label-caps font-label-caps text-on-surface-variant truncate">
                          {format(parseISO(event.startDate), 'HH:mm')}
                        </div>
                        <div className="text-label-sm font-label-sm font-medium text-on-background leading-tight line-clamp-2 mt-0.5">
                          {event.title}
                        </div>
                        {event.location && (
                          <div className="text-label-caps font-label-caps text-on-surface-variant flex items-center gap-0.5 mt-0.5 truncate">
                            <span className="material-symbols-outlined text-[12px] shrink-0">location_on</span>
                            {event.location}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>

      {times.length === 0 && (
        <div className="py-10 text-center text-label-sm font-label-sm text-on-surface-variant">
          Aucun événement pour cette semaine
        </div>
      )}
    </div>
  );
}