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
        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] overflow-hidden flex flex-col mb-8 mt-5 shadow-sm -mx-4 md:mx-0">
            <div className="overflow-x-auto scrollbar-hide">
                <div className="min-w-[770px] flex flex-col">
                    <div className="h-[500px] overflow-y-auto scrollbar-thin relative bg-white">
                        <div className="flex border-b border-[#E5E5E5] bg-white sticky top-0 z-40">
                            <div className="w-[50px] shrink-0 border-r border-[#E5E5E5] bg-white"></div>
                            {days.map((day) => (
                                <div
                                    key={day.toString()}
                                    className="flex-1 min-w-[120px] text-center py-3 border-r border-[#E5E5E5] last:border-none bg-white"
                                >
                                    <div className={`text-[12px] font-bold uppercase tracking-widest ${isToday(day) ? 'text-[#1A1A1A]' : 'text-[#737373]'}`}>
                                        {format(day, 'EEEE', { locale: fr })}
                                    </div>
                                    <div className={`text-[18px] font-bold mt-1 ${isToday(day) ? 'text-[#1A1A1A] bg-[#E5E5E5] inline-block px-2 rounded-lg' : 'text-[#1A1A1A]'}`}>
                                        {format(day, 'd')}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex relative bg-white">
                            <div className="w-[50px] shrink-0 border-r border-[#E5E5E5] flex flex-col relative z-20 bg-white">
                                {weekPlannerHours.map((hour, index) => (
                                    <div
                                        key={hour}
                                        className={`h-[55px] relative ${index < weekPlannerHours.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}
                                    >
                                        <span className="absolute -top-2.5 right-2 text-[11px] font-bold text-[#A3A3A3] bg-white px-1">
                                            {hour}h
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {days.map((day) => {
                                const dayEvents = getEventsForDay(events, day);

                                return (
                                    <div
                                        key={day.toString()}
                                        className="flex-1 min-w-[120px] border-r border-[#E5E5E5] last:border-none relative"
                                    >
                                        {weekPlannerHours.map((hour, index) => (
                                            <div
                                                key={hour}
                                                className={`h-[55px] pointer-events-none ${index < weekPlannerHours.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}
                                            />
                                        ))}
                                        {dayEvents.map((event) => {
                                            const start = parseISO(event.startDate);
                                            const end = parseISO(event.endDate);
                                            const startHour = start.getHours() + start.getMinutes() / 60;
                                            const endHour = end.getHours() + end.getMinutes() / 60;

                                            const top = (startHour - 8) * 55;
                                            let height = (endHour - startHour) * 55;

                                            if (height < 20) {
                                                height = 20;
                                            }

                                            if (top < -55 || top > weekPlannerHours.length * 55) {
                                                return null;
                                            }

                                            const color = getCourseColor(courses, event.courseId);

                                            return (
                                                <div
                                                    key={event.id}
                                                    onClick={() => onSelectEvent(event)}
                                                    className="absolute left-[3px] right-[3px] rounded-[6px] p-2 overflow-hidden cursor-pointer hover:shadow-md transition-shadow z-30 border"
                                                    style={{
                                                        top: `${top}px`,
                                                        height: `${height}px`,
                                                        backgroundColor: `${color}1A`,
                                                        borderColor: `${color}40`,
                                                        borderLeft: `4px solid ${color}`,
                                                    }}
                                                    title={`${event.title} (${format(start, 'HH:mm')} - ${format(end, 'HH:mm')})`}
                                                >
                                                    <div className="text-[12px] font-bold leading-tight text-[#1A1A1A]">
                                                        {event.title}
                                                    </div>
                                                    {height >= 40 && (
                                                        <div className="text-[10px] font-medium text-[#737373] mt-0.5 truncate bg-white/60 px-1 rounded max-w-max">
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
