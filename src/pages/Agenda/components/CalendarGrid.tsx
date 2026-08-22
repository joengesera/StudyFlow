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

  return (
    <div className="card overflow-hidden">
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
            const isToday = isSameDay(day, new Date());

            return (
              <button
                key={day.toString()}
                onClick={() => onSelectDay(day)}
                className={`min-h-[80px] flex flex-col items-center justify-start p-2 rounded-lg transition-colors ${
                  !isCurrentMonth ? 'opacity-40' : isSelected ? 'bg-primary/10 border border-primary' : isToday ? 'bg-primary/5' : 'hover:bg-surface-container-low'
                }`}
                aria-pressed={isSelected}
                aria-label={format(day, 'EEEE d MMMM', { locale: fr })}
              >
                <div className={`w-9 h-9 flex items-center justify-center rounded-full text-body-md font-medium mb-1 transition-colors ${
                  !isCurrentMonth ? 'text-outline' : isSelected ? 'bg-primary text-on-primary' : isToday ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-surface-container-highest'
                }`}>
                  {format(day, 'd')}
                </div>

                <div className="flex gap-1 justify-center flex-wrap w-full">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className="w-1.5 h-1.5 rounded-full"
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