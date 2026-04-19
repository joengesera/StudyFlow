import { format, isSameDay, isSameMonth } from 'date-fns';
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
        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-4 md:p-6 mb-8 mt-5 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-6">
            <div className="min-w-[320px]">
                <div className="grid grid-cols-7 mb-4">
                    {dayNames.map((dayName) => (
                        <div key={dayName} className="text-[12px] md:text-[13px] text-center text-[#737373] font-bold">
                            {dayName}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-y-3 gap-x-1">
                    {days.map((day) => {
                        const dayEvents = getEventsForDay(events, day);
                        const isSelected = isSameDay(day, selectedDay);
                        const isCurrentMonth = isSameMonth(day, currentMonth);

                        return (
                            <div
                                key={day.toString()}
                                onClick={() => onSelectDay(day)}
                                className="min-h-[64px] flex flex-col items-center justify-start cursor-pointer group"
                            >
                                <div
                                    className={`
                                        w-9 h-9 flex items-center justify-center rounded-full text-[15px] font-bold mb-[6px] transition-colors
                                        ${!isCurrentMonth ? 'text-[#D4D4D4]' : isSelected ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A] hover:bg-[#E5E5E5]'}
                                    `}
                                >
                                    {format(day, 'd')}
                                </div>

                                <div className="flex gap-1 justify-center flex-wrap px-1 w-full max-w-[28px]">
                                    {dayEvents.slice(0, 4).map((event) => (
                                        <div
                                            key={event.id}
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ background: getCourseColor(courses, event.courseId) }}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
