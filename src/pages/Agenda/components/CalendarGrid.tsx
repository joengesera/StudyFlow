import { format, isSameDay, isSameMonth } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Event } from '../../../types';
import { getCourseColor, getEventsForDay, getMonthDays, type AgendaCourse } from '../agendaShared';

interface CalendarGridProps {
  currentMonth: Date;
  events: Event[];
  courses: AgendaCourse[];
  selectedDay: Date;
  onSelectDay: (day: Date) => void;
}

const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export function CalendarGrid({
  currentMonth,
  events,
  courses,
  selectedDay,
  onSelectDay,
}: CalendarGridProps) {
  const days = getMonthDays(currentMonth);
  const today = new Date();

  return (
    <div className="border border-outline-variant bg-surface-container-lowest rounded-xl overflow-hidden">
      <div className="p-card-padding">
        <div className="grid grid-cols-7 mb-4">
          {dayNames.map((dayName) => (
            <div key={dayName} className="text-label-caps font-label-caps text-center text-on-surface-variant">
              {dayName}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const dayEvents = getEventsForDay(events, day);
            const isSelected = isSameDay(day, selectedDay);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isToday = isSameDay(day, today);

            return (
              <button
                key={day.toString()}
                onClick={() => onSelectDay(day)}
                className={`min-h-[80px] flex flex-col items-center justify-start p-2 rounded-lg transition-colors ${
                  !isCurrentMonth
                    ? 'opacity-40'
                    : isSelected
                      ? 'bg-primary/5 border border-primary'
                      : isToday
                        ? 'bg-surface-container-low'
                        : 'hover:bg-surface-container-low'
                }`}
                aria-pressed={isSelected}
                aria-label={format(day, 'EEEE d MMMM', { locale: fr })}
              >
                <div className={`w-9 h-9 flex items-center justify-center text-body-md font-medium mb-1 transition-colors ${
                  !isCurrentMonth
                    ? 'text-outline'
                    : isSelected || isToday
                      ? 'bg-primary text-on-primary rounded-full'
                      : 'text-on-background hover:bg-surface-container-highest rounded-full'
                }`}>
                  {format(day, 'd')}
                </div>

                <div className="flex gap-1 justify-center flex-wrap w-full">
                  {dayEvents.slice(0, 3).map((event) => (
                    <span
                      key={event.id}
                      className="w-1.5 h-1.5"
                      style={{ background: getCourseColor(courses, event.courseId) }}
                    />
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="text-[10px] text-on-surface-variant">+{dayEvents.length - 3}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
