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
        <div className="flex flex-col">
            <div className="text-[12px] font-bold text-[#737373] uppercase tracking-widest mb-4 ml-1">
                {format(selectedDay, 'EEEE d MMMM', { locale: fr })} — {events.length} ÉVÉNEMENT
                {events.length !== 1 ? 'S' : ''}
            </div>

            {events.length === 0 ? (
                <div className="bg-[#FAF9F6] rounded-[24px] border border-[#E5E5E5] p-6 text-[14px] text-[#A3A3A3] text-center font-bold">
                    Aucun événement pour cette journée.
                </div>
            ) : (
                <div className="bg-[#FAF9F6] rounded-[24px] border border-[#E5E5E5] flex flex-col overflow-hidden">
                    {events.map((event, index) => {
                        const isNotLast = index !== events.length - 1;
                        const course = courses.find((item) => item.id === event.courseId);
                        const color = getCourseColor(courses, event.courseId);

                        return (
                            <div
                                key={event.id}
                                onClick={() => onSelectEvent(event)}
                                className={`flex items-center p-4 relative cursor-pointer hover:bg-white transition-colors ${isNotLast ? 'border-b border-[#E5E5E5]' : ''}`}
                            >
                                <div
                                    className="absolute left-5 top-4 bottom-4 w-1 rounded-full"
                                    style={{ background: color }}
                                />

                                <div className="w-[130px] shrink-0 pl-8 text-[13px] font-medium text-[#737373]">
                                    {format(parseISO(event.startDate), 'HHhmm')} – {format(parseISO(event.endDate), 'HHhmm')}
                                </div>

                                <div className="flex-1 min-w-0 pr-4">
                                    <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                                        {course ? `${course.name} — ` : ''}
                                        {event.title}
                                    </div>
                                    <div className="text-[12px] font-medium text-[#737373] mt-0.5 truncate">
                                        {event.location || event.description || ' '}
                                    </div>
                                </div>

                                <div
                                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide shrink-0 ${eventTypeBadge[event.type] ?? 'bg-[#E5E5E5] text-[#1A1A1A]'}`}
                                >
                                    {eventTypeLabel[event.type] ?? event.type}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
