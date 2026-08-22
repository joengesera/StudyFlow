import { useEffect, useState } from 'react';
import { addDays, format, isToday, parseISO, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Event } from '../../../types';
import {
  getCourseColor,
  getEventsForDay,
  weekPlannerDays,
  weekPlannerHours,
  type AgendaCourse,
} from '../agendaShared';

const HOUR_HEIGHT = 100;
const GUTTER_WIDTH = 60;

interface WeeklyPlannerProps {
  currentDate: Date;
  events: Event[];
  courses: AgendaCourse[];
  onSelectEvent: (event: Event) => void;
}

function useCurrentMinutes() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return now.getHours() + now.getMinutes() / 60;
}

export function WeeklyPlanner({
  currentDate,
  events,
  courses,
  onSelectEvent,
}: WeeklyPlannerProps) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = Array.from({ length: weekPlannerDays }, (_, index) => addDays(weekStart, index));
  const currentHour = useCurrentMinutes();
  const gridHeight = weekPlannerHours.length * HOUR_HEIGHT;

  const timeLabels = weekPlannerHours.map((hour) => ({
    hour,
    top: (hour - weekPlannerHours[0]) * HOUR_HEIGHT,
  }));

  return (
    <div className="border border-outline-variant bg-surface-container-lowest rounded-xl flex flex-col min-h-[600px] overflow-hidden">
      {/* Days Header */}
      <div
        className="grid border-b border-outline-variant bg-surface-bright shrink-0"
        style={{ gridTemplateColumns: `${GUTTER_WIDTH}px repeat(${weekPlannerDays}, minmax(0, 1fr))` }}
      >
        <div className="p-3 border-r border-outline-variant flex items-end justify-end text-label-caps font-label-caps text-on-surface-variant">
          GMT+2
        </div>
          {days.map((day) => (
            <div
              key={day.toString()}
              className={`p-3 text-center border-r border-outline-variant last:border-none ${isToday(day) ? 'bg-surface-container-low' : ''}`}
            >
            <div className={`text-label-caps font-label-caps uppercase ${isToday(day) ? 'text-primary' : 'text-on-surface-variant'}`}>
              {format(day, 'EEE', { locale: fr })}
            </div>
            <div className={`text-headline-sm font-headline-sm mt-1 ${isToday(day) ? 'text-primary' : 'text-on-background'}`}>
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>

      {/* Time Slots Area */}
      <div className="flex-1 overflow-y-auto relative">
        {/* Background vertical lines */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none grid"
          style={{
            gridTemplateColumns: `${GUTTER_WIDTH}px repeat(${weekPlannerDays}, minmax(0, 1fr))`,
            height: `${gridHeight}px`,
          }}
        >
          {days.map((day) => (
            <div key={day.toString()} className="border-r border-outline-variant last:border-none" />
          ))}
        </div>

        {/* Horizontal hour lines + events */}
        <div className="relative w-full" style={{ height: `${gridHeight}px` }}>
          {timeLabels.map(({ hour, top }) => (
            <div key={hour} className="absolute w-full border-t border-outline-variant flex items-start" style={{ top: `${top}px` }}>
              <span
                className="text-right pr-2 pt-1 text-label-caps font-label-caps text-on-surface-variant shrink-0"
                style={{ width: `${GUTTER_WIDTH}px` }}
              >
                {String(hour).padStart(2, '0')}:00
              </span>
            </div>
          ))}

          {/* Events columns */}
          <div
            className="absolute inset-0 grid"
            style={{ paddingLeft: `${GUTTER_WIDTH}px`, gridTemplateColumns: `repeat(${weekPlannerDays}, minmax(0, 1fr))` }}
          >
            {days.map((day) => {
              const dayIsToday = isToday(day);
              const dayEvents = getEventsForDay(events, day);

              return (
                <div key={day.toString()} className="relative">
                  {dayEvents.map((event) => {
                    const start = parseISO(event.startDate);
                    const end = parseISO(event.endDate);
                    const startHour = start.getHours() + start.getMinutes() / 60;
                    const endHour = end.getHours() + end.getMinutes() / 60;

                    const firstHour = weekPlannerHours[0];
                    const top = (startHour - firstHour) * HOUR_HEIGHT;
                    let height = (endHour - startHour) * HOUR_HEIGHT;

                    if (height < 32) height = 32;

                    if (top < -HOUR_HEIGHT || top > gridHeight) return null;

                    const color = getCourseColor(courses, event.courseId);

                    return (
                      <button
                        key={event.id}
                        onClick={() => onSelectEvent(event)}
                        className="absolute left-1 right-1 rounded-r-md p-2 text-left overflow-hidden cursor-pointer transition-[filter] hover:brightness-[0.97]"
                        style={{
                          top: `${top}px`,
                          height: `${height}px`,
                          backgroundColor: `${color}14`,
                          borderLeft: `2px solid ${color}`,
                        }}
                        title={`${event.title} (${format(start, 'HH:mm')} – ${format(end, 'HH:mm')})`}
                      >
                        <div className="text-label-caps font-label-caps text-on-surface-variant mb-1 truncate">
                          {format(start, 'HH:mm')} - {format(end, 'HH:mm')}
                        </div>
                        <div className="text-label-sm font-label-sm font-medium text-on-background leading-tight line-clamp-2">
                          {event.title}
                        </div>
                        {height >= 90 && event.location && (
                          <div className="text-label-caps font-label-caps text-on-surface-variant flex items-center gap-1 mt-1 truncate">
                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                            {event.location}
                          </div>
                        )}
                      </button>
                    );
                  })}

                  {dayIsToday && currentHour >= weekPlannerHours[0] && currentHour <= weekPlannerHours[weekPlannerHours.length - 1] + 1 && (
                    <div
                      className="absolute left-0 right-0 h-px bg-primary z-10 pointer-events-none"
                      style={{ top: `${currentHour * HOUR_HEIGHT - weekPlannerHours[0] * HOUR_HEIGHT}px` }}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary absolute -left-1 -top-1" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
