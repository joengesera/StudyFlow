import { MapPin, CalendarX } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { addDays, format, isSameDay, isToday, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Event } from '../../../types';
import {
  eventTypeBadge,
  eventTypeLabel,
  getCourseColor,
  getEventsForDay,
  sortEventsByStartDate,
  type AgendaCourse,
} from '../agendaShared';

const HOUR_HEIGHT = 72;
const MIN_EVENT_HEIGHT = 34;
const GUTTER_WIDTH = 52;
const STRIP_RANGE = 8;

interface DayTimelineViewProps {
  currentDate: Date;
  events: Event[];
  courses: AgendaCourse[];
  onSelectDay: (day: Date) => void;
  onSelectEvent: (event: Event) => void;
}

interface TimedEvent {
  event: Event;
  startMinutes: number;
  endMinutes: number;
  lane: number;
  laneCount: number;
}

function useCurrentMinutes() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return now.getHours() * 60 + now.getMinutes();
}

export function DayTimelineView({
  currentDate,
  events,
  courses,
  onSelectDay,
  onSelectEvent,
}: DayTimelineViewProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const nowMinutes = useCurrentMinutes();

  const dayEvents = useMemo(
    () => sortEventsByStartDate(getEventsForDay(events, currentDate)),
    [events, currentDate],
  );

  const visibleDays = useMemo(
    () => Array.from({ length: STRIP_RANGE * 2 + 1 }, (_, index) => addDays(currentDate, index - STRIP_RANGE)),
    [currentDate],
  );

  const { hourStart, hourEnd, gridHeight, timedEvents } = useMemo(() => {
    const eventsWithTime: TimedEvent[] = dayEvents.map((event) => {
      const start = parseISO(event.startDate);
      const end = parseISO(event.endDate);
      const startMinutes = start.getHours() * 60 + start.getMinutes();
      let endMinutes = end.getHours() * 60 + end.getMinutes();

      if (endMinutes <= startMinutes) endMinutes = startMinutes + 30;

      return {
        event,
        startMinutes,
        endMinutes,
        lane: 0,
        laneCount: 1,
      };
    });

    if (eventsWithTime.length === 0) {
      return { hourStart: 8, hourEnd: 19, gridHeight: 11 * HOUR_HEIGHT, timedEvents: [] as TimedEvent[] };
    }

    const minStart = Math.min(...eventsWithTime.map((item) => item.startMinutes));
    const maxEnd = Math.max(...eventsWithTime.map((item) => item.endMinutes));
    const hourStart = Math.max(0, Math.floor(minStart / 60) - 1);
    const hourEnd = Math.min(24, Math.ceil(maxEnd / 60) + 1);

    const clusters: TimedEvent[][] = [];
    let currentCluster: TimedEvent[] = [];
    let clusterEnd = -1;

    for (const item of eventsWithTime) {
      if (currentCluster.length > 0 && item.startMinutes < clusterEnd) {
        currentCluster.push(item);
        clusterEnd = Math.max(clusterEnd, item.endMinutes);
      } else {
        if (currentCluster.length > 0) clusters.push(currentCluster);
        currentCluster = [item];
        clusterEnd = item.endMinutes;
      }
    }
    if (currentCluster.length > 0) clusters.push(currentCluster);

    const positioned: TimedEvent[] = [];

    for (const cluster of clusters) {
      const lanes: number[] = [];

      for (const item of cluster) {
        const freeLane = lanes.findIndex((laneEnd) => laneEnd <= item.startMinutes);
        if (freeLane === -1) {
          lanes.push(item.endMinutes);
          item.lane = lanes.length - 1;
        } else {
          lanes[freeLane] = item.endMinutes;
          item.lane = freeLane;
        }
      }

      const laneCount = lanes.length;
      for (const item of cluster) item.laneCount = laneCount;
      positioned.push(...cluster);
    }

    return { hourStart, hourEnd, gridHeight: (hourEnd - hourStart) * HOUR_HEIGHT, timedEvents: positioned };
  }, [dayEvents]);

  useEffect(() => {
    const strip = stripRef.current;
    const selected = strip?.querySelector<HTMLElement>('[data-selected="true"]');
    if (strip && selected) {
      const stripRect = strip.getBoundingClientRect();
      const selectedRect = selected.getBoundingClientRect();
      const targetLeft =
        strip.scrollLeft +
        selectedRect.left -
        stripRect.left -
        stripRect.width / 2 +
        selectedRect.width / 2;
      strip.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
  }, [currentDate]);

  const hourLabels = Array.from({ length: hourEnd - hourStart }, (_, index) => hourStart + index);

  return (
    <div className="border border-outline-variant bg-surface-container-lowest rounded-xl overflow-hidden">
      {/* Navigation horizontale des jours */}
      <div className="border-b border-outline-variant">
        <div
          ref={stripRef}
          className="flex gap-1 overflow-x-auto px-3 pt-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visibleDays.map((day) => {
            const selected = isSameDay(day, currentDate);
            const today = isToday(day);

            return (
              <button
                key={format(day, 'yyyy-MM-dd')}
                onClick={() => onSelectDay(day)}
                data-selected={selected}
                aria-pressed={selected}
                aria-label={format(day, 'EEEE d MMMM', { locale: fr })}
                className={`flex flex-col items-center justify-center min-w-[54px] px-3 py-2 rounded-full transition-colors ${
                  selected ? 'bg-primary text-on-primary' : today ? 'bg-primary/5' : 'hover:bg-surface-container-low'
                }`}
              >
                <span className={`text-label-caps font-label-caps ${selected ? '' : today ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {format(day, 'EEE', { locale: fr }).replace('.', '')}
                </span>
                <span className={`text-headline-sm font-headline-sm mt-0.5 ${selected ? '' : today ? 'text-primary' : 'text-on-background'}`}>
                  {format(day, 'd')}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between px-4 pb-3">
          <span className="text-label-sm font-label-sm text-on-surface-variant capitalize">
            {format(currentDate, 'EEEE d MMMM yyyy', { locale: fr })}
          </span>
          <span className="text-label-sm font-label-sm text-on-surface-variant">
            {dayEvents.length} événement{dayEvents.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Timeline verticale */}
      {timedEvents.length === 0 ? (
        <div className="text-center py-12">
          <CalendarX className="text-4xl mb-2 block text-outline" />
          <p className="text-body-md font-body-md text-on-surface-variant">Aucun événement pour cette journée.</p>
        </div>
      ) : (
        <div className="relative" style={{ height: `${gridHeight}px` }}>
          {/* Gouttière des heures */}
          <div className="absolute inset-y-0 left-0 border-r border-outline-variant" style={{ width: `${GUTTER_WIDTH}px` }}>
            {hourLabels.map((hour) => (
              <div
                key={hour}
                className="absolute w-full border-t border-outline-variant"
                style={{ top: `${(hour - hourStart) * HOUR_HEIGHT}px` }}
              >
                <span className="block text-right pr-2 -translate-y-1/2 text-label-caps font-label-caps text-on-surface-variant">
                  {String(hour).padStart(2, '0')}:00
                </span>
              </div>
            ))}
          </div>

          {/* Zone événements */}
          <div className="absolute inset-y-0" style={{ left: `${GUTTER_WIDTH}px`, right: 0 }}>
            {hourLabels.map((hour) => (
              <div
                key={hour}
                className="absolute w-full border-t border-outline-variant"
                style={{ top: `${(hour - hourStart) * HOUR_HEIGHT}px` }}
              />
            ))}

            {timedEvents.map(({ event, startMinutes, endMinutes, lane, laneCount }) => {
              const color = getCourseColor(courses, event.courseId);
              const course = courses.find((item) => item.id === event.courseId);
              const start = parseISO(event.startDate);
              const end = parseISO(event.endDate);

              let top = ((startMinutes / 60) - hourStart) * HOUR_HEIGHT;
              let height = ((endMinutes - startMinutes) / 60) * HOUR_HEIGHT;
              if (height < MIN_EVENT_HEIGHT) height = MIN_EVENT_HEIGHT;
              top = Math.min(Math.max(top, 0), gridHeight - height);

              return (
                <button
                  key={event.id}
                  onClick={() => onSelectEvent(event)}
                  className="absolute overflow-hidden text-left cursor-pointer transition-[filter] hover:brightness-[0.97]"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    left: `${(lane / laneCount) * 100}%`,
                    width: `${100 / laneCount}%`,
                    backgroundColor: `${color}14`,
                    borderLeft: `3px solid ${color}`,
                    borderRadius: 12,
                    padding: '6px 8px 6px 7px',
                  }}
                  title={`${event.title} (${format(start, 'HH:mm')} – ${format(end, 'HH:mm')})`}
                >
                  <span className="text-label-caps font-label-caps text-on-surface-variant mb-1 block truncate">
                    {format(start, 'HH:mm')} – {format(end, 'HH:mm')}
                  </span>
                  <span className="text-body-md font-body-md font-semibold text-on-background leading-tight line-clamp-2 block">
                    {event.title}
                  </span>
                  {course && height >= 76 && (
                    <span className="text-label-sm font-label-sm text-on-surface-variant truncate mt-1 block">
                      {course.name}
                    </span>
                  )}
                  {event.location && height >= 98 && (
                    <span className="text-label-caps font-label-caps text-on-surface-variant flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="text-[12px] shrink-0" />
                      {event.location}
                    </span>
                  )}
                  {height >= 72 && (
                    <span className={`absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-label-caps font-label-caps ${eventTypeBadge[event.type] ?? 'bg-surface-container-highest text-on-surface-variant'}`}>
                      {eventTypeLabel[event.type] ?? event.type}
                    </span>
                  )}
                </button>
              );
            })}

            {isToday(currentDate) && nowMinutes >= hourStart * 60 && nowMinutes <= hourEnd * 60 && (
              <div
                className="absolute left-0 right-0 h-px bg-primary z-10 pointer-events-none"
                style={{ top: `${((nowMinutes / 60) - hourStart) * HOUR_HEIGHT}px` }}
              >
                <div className="w-2 h-2 rounded-full bg-primary absolute -left-1 -top-[3px]" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}