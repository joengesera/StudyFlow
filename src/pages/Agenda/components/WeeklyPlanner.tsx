import { MapPin } from 'lucide-react';
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
import { WeeklySlotGrid } from './WeeklySlotGrid';

const HOUR_HEIGHT = 100;
const GUTTER_WIDTH = 60;
const MIN_EVENT_HEIGHT = 32;

interface PlannedEvent {
  event: Event;
  top: number;
  height: number;
  leftPct: number;
  widthPct: number;
  visible: boolean;
}

// Place les événements qui se chevauchent dans des colonnes (lanes)
// côte à côte au lieu de les dessiner les uns par-dessus les autres.
function layoutDayEvents(events: Event[], gridHeight: number): PlannedEvent[] {
  const items = events.map((event) => {
    const start = parseISO(event.startDate);
    const end = parseISO(event.endDate);
    let startHour = start.getHours() + start.getMinutes() / 60;
    let endHour = end.getHours() + end.getMinutes() / 60;
    if (endHour <= startHour) endHour = startHour + 0.5;

    return { event, startHour, endHour, lane: 0, laneCount: 1 };
  });

  const sorted = [...items].sort(
    (a, b) => a.startHour - b.startHour || a.endHour - b.endHour,
  );

  const clusters: (typeof items)[number][][] = [];
  let currentCluster: (typeof items)[number][] = [];
  let clusterEnd = -1;

  for (const item of sorted) {
    if (currentCluster.length > 0 && item.startHour < clusterEnd) {
      currentCluster.push(item);
      clusterEnd = Math.max(clusterEnd, item.endHour);
    } else {
      if (currentCluster.length > 0) clusters.push(currentCluster);
      currentCluster = [item];
      clusterEnd = item.endHour;
    }
  }
  if (currentCluster.length > 0) clusters.push(currentCluster);

  for (const cluster of clusters) {
    const laneEnds: number[] = [];
    for (const item of cluster) {
      const freeLane = laneEnds.findIndex((end) => end <= item.startHour);
      if (freeLane === -1) {
        item.lane = laneEnds.length;
        laneEnds.push(item.endHour);
      } else {
        item.lane = freeLane;
        laneEnds[freeLane] = item.endHour;
      }
    }
    const laneCount = laneEnds.length;
    for (const item of cluster) item.laneCount = laneCount;
  }

  const firstHour = weekPlannerHours[0];

  return items.map(({ event, startHour, endHour, lane, laneCount }) => {
    const top = (startHour - firstHour) * HOUR_HEIGHT;
    let height = (endHour - startHour) * HOUR_HEIGHT;
    if (height < MIN_EVENT_HEIGHT) height = MIN_EVENT_HEIGHT;

    const leftPct = (lane / laneCount) * 100;
    const widthPct = 100 / laneCount;

    return {
      event,
      top,
      height,
      leftPct,
      widthPct,
      visible: top > -HOUR_HEIGHT && top < gridHeight,
    };
  });
}

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
    <>
      {/* Mobile: compact slots grid (Lun → Sam) */}
      <div className="md:hidden">
        <WeeklySlotGrid
          currentDate={currentDate}
          events={events}
          courses={courses}
          onSelectEvent={onSelectEvent}
        />
      </div>

      {/* Desktop: positioned weekly planner */}
      <div className="hidden md:block border border-outline-variant bg-surface-container-lowest rounded-xl flex flex-col min-h-[600px] overflow-hidden">
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
                  {layoutDayEvents(dayEvents, gridHeight)
                    .filter((planned) => planned.visible)
                    .map(({ event, top, height, leftPct, widthPct }) => {
                      const start = parseISO(event.startDate);
                      const end = parseISO(event.endDate);
                      const color = getCourseColor(courses, event.courseId);

                      return (
                        <button
                          key={event.id}
                          onClick={() => onSelectEvent(event)}
                          className="absolute rounded-r-md p-2 text-left overflow-hidden cursor-pointer transition-[filter] hover:brightness-[0.97]"
                          style={{
                            top: `${top}px`,
                            height: `${height}px`,
                            left: `calc(${leftPct}% + 3px)`,
                            width: `calc(${widthPct}% - 6px)`,
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
                              <MapPin className="text-[14px]" />
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
    </>
  );
}
