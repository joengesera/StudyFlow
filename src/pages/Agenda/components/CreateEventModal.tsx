import { useState, type FormEvent } from 'react';
import { addDays, addMonths, format } from 'date-fns';
import type { Event } from '../../../types';
import { eventTypeLabel, type AgendaCourse } from '../agendaShared';

interface CreateEventModalProps {
    defaultDate: Date;
    courses: AgendaCourse[];
    onClose: () => void;
    onCreate: (payloads: Partial<Event>[]) => void;
    isLoading: boolean;
}

export function CreateEventModal({
    defaultDate,
    courses,
    onClose,
    onCreate,
    isLoading,
}: CreateEventModalProps) {
    const [form, setForm] = useState({
        title: '',
        type: 'CLASS' as Event['type'],
        startDate: format(defaultDate, "yyyy-MM-dd'T'HH:mm"),
        endDate: format(new Date(defaultDate.getTime() + 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm"),
        location: '',
        courseId: '',
    });
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurrenceEndDate, setRecurrenceEndDate] = useState(
        format(addMonths(defaultDate, 1), 'yyyy-MM-dd'),
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const baseStart = new Date(form.startDate);
        const baseEnd = new Date(form.endDate);
        const payloads: Partial<Event>[] = [
            {
                title: form.title,
                type: form.type,
                startDate: baseStart.toISOString(),
                endDate: baseEnd.toISOString(),
                location: form.location || undefined,
                courseId: form.courseId || undefined,
                isAllDay: false,
            },
        ];

        if (isRecurring && recurrenceEndDate) {
            const endRecurrence = new Date(recurrenceEndDate);
            endRecurrence.setHours(23, 59, 59, 999);

            let nextStart = addDays(baseStart, 7);
            let nextEnd = addDays(baseEnd, 7);

            while (nextStart <= endRecurrence) {
                payloads.push({
                    title: form.title,
                    type: form.type,
                    startDate: nextStart.toISOString(),
                    endDate: nextEnd.toISOString(),
                    location: form.location || undefined,
                    courseId: form.courseId || undefined,
                    isAllDay: false,
                });
                nextStart = addDays(nextStart, 7);
                nextEnd = addDays(nextEnd, 7);
            }
        }

        onCreate(payloads);
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 sm:p-6 bg-black/20 backdrop-blur-[2px]">
            <div className="bg-white w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-[24px] p-8 shadow-2xl relative scrollbar-hide">
                <h2 className="text-[22px] font-bold text-[#1A1A1A] mb-8">Nouvel événement</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Titre</label>
                        <input
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="ex: Cours de Maths"
                            required
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] outline-none"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Type</label>
                            <select
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value as Event['type'] })}
                                className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[15px] font-medium bg-transparent text-[#1A1A1A] outline-none"
                            >
                                {Object.entries(eventTypeLabel).map(([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Cours lié</label>
                            <select
                                value={form.courseId}
                                onChange={(e) => setForm({ ...form, courseId: e.target.value })}
                                className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[15px] font-medium bg-transparent text-[#1A1A1A] outline-none"
                            >
                                <option value="">Aucun</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Début</label>
                            <input
                                type="datetime-local"
                                value={form.startDate}
                                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                                required
                                className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Fin</label>
                            <input
                                type="datetime-local"
                                value={form.endDate}
                                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                                required
                                className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Lieu (optionnel)</label>
                        <input
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            placeholder="ex: Amphi B"
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] outline-none"
                        />
                    </div>

                    <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] p-5">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isRecurring}
                                onChange={(e) => setIsRecurring(e.target.checked)}
                                className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black accent-black"
                            />
                            <span className="text-[15px] font-bold text-[#1A1A1A]">Répéter toutes les semaines</span>
                        </label>
                        {isRecurring && (
                            <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
                                <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Jusqu'au</label>
                                <input
                                    type="date"
                                    value={recurrenceEndDate}
                                    onChange={(e) => setRecurrenceEndDate(e.target.value)}
                                    required={isRecurring}
                                    className="w-[180px] h-10 px-3 rounded-xl border border-[#E5E5E5] text-[14px] font-medium outline-none"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[15px] font-bold text-[#1A1A1A] hover:bg-gray-50 bg-white"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-5 py-2.5 rounded-xl border border-[#1A1A1A] bg-[#1A1A1A] text-white text-[15px] font-bold hover:opacity-90 flex items-center justify-center min-w-[120px]"
                        >
                            {isLoading ? (
                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                                'Créer'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
