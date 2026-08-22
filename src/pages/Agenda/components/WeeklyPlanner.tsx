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

interface WeeklyPlannerProps {
  currentDate: Date;
  events: Event[];
  courses: AgendaCourse[];
  onSelectEvent: (event: Event) => void;
}

export function WeeklyPlanner({
  currentDate,
  events,
  courses,
  onSelectEvent,
}: WeeklyPlannerProps) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = Array.from({ length: weekPlannerDays }, (_, index) => addDays(weekStart, index));

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[800px] flex flex-col">
          <div className="h-[550px] overflow-y-auto relative">
            {/* Header Row */}
            <div className="flex border-b border-outline-variant sticky top-0 z-40 bg-surface-container-lowest">
              <div className="w-[60px] shrink-0 border-r border-outline-variant flex flex-col" />
              {days.map((day) => (
                <div
                  key={day.toString()}
                  className="flex-1 min-w-[130px] text-center py-3 border-r border-outline-variant last:border-none sticky top-0 z-30 bg-surface-container-lowest"
                >
                  <div className={`text-label-caps font-label-caps ${isToday(day) ? 'text-primary' : 'text-on-surface-variant'}`}>
                    {format(day, 'EEEE', { locale: fr })}
                  </div>
                  <div className={`text-headline-sm font-headline-sm mt-1 ${isToday(day) ? 'text-primary bg-primary/10 inline-block px-2 rounded' : 'text-on-surface'}`}>
                    {format(day, 'd')}
                  </div>
                </div>
              ))}
            </div>

            {/* Time Slots Grid */}
            <div className="flex relative">
              {/* Time Column */}
              <div className="w-[60px] shrink-0 border-r border-outline-variant flex flex-col relative z-20 bg-surface-container-lowest">
                {weekPlannerHours.map((hour, index) => (
                  <div
                    key={hour}
                    className={`h-[60px] relative ${index < weekPlannerHours.length - 1 ? 'border-b border-outline-variant' : ''}`}
                  >
                    <span className="absolute -top-2 right-2 text-label-caps font-label-caps text-outline bg-surface-container-lowest px-1">
                      {hour}h
                    </span>
                  </div>
                ))}
              </div>

{/* Days Columns */}
              {days.map((day) => {
                const dayEvents = getEventsForDay(events, day);

                return (
                  <div
                    key={day.toString()}
                    className="flex-1 min-w-[130px] border-r border-outline-variant last:border-none relative"
                  >
                    {/* Time grid lines */}
                    {weekPlannerHours.map((hour, index) => (
                      <div
                        key={hour}
                        className={`h-[60px] ${index < weekPlannerHours.length - 1 ? 'border-b border-outline-variant' : ''}`}
                      />
                    ))}
                    {/* Events */}
                    {dayEvents.map((event) => {
                      const start = parseISO(event.startDate);
                      const end = parseISO(event.endDate);
                      const startHour = start.getHours() + start.getMinutes() / 60;
                      const endHour = end.getHours() + end.getMinutes() / 60;

                      const top = (startHour - 8) * 60;
                      let height = (endHour - startHour) * 60;

                      if (height < 30) height = 30;

                      if (top < -60 || top > weekPlannerHours.length * 60) return null;

                      const color = getCourseColor(courses, event.courseId);

                      return (
                        <div
                          key={event.id}
                          onClick={() => onSelectEvent(event)}
                          className="absolute left-[4px] right-[4px] rounded-md p-2 overflow-hidden cursor-pointer hover:shadow-md transition-shadow z-30 border"
                          style={{
                            top: `${top}px`,
                            height: `${height}px`,
                            backgroundColor: `${color}1A`,
                            borderColor: `${color}40`,
                            borderLeftWidth: '4px',
                            borderLeftStyle: 'solid',
                            borderLeftColor: color,
                          }}
                          title={`${event.title} (${format(start, 'HH:mm')} - ${format(end, 'HH:mm')})`}
                        >
                          <div className="text-label-sm font-label-sm font-medium text-on-surface leading-tight">
                            {event.title}
                          </div>
                          {height >= 50 && (
                            <div className="text-[10px] font-label-sm text-on-surface-variant mt-0.5 truncate bg-white/60 px-1 rounded max-w-max">
                              {format(start, 'HH:mm')} - {format(end, 'HH:mm')}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}