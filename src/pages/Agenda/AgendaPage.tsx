import { useState } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    addMonths,
    subMonths,
    addWeeks,
    subWeeks,
    isSameMonth,
    isSameDay,
    isToday,
    parseISO,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import {
    Clock,
    MapPin,
    FileText,
    ChevronLeft,
    ChevronRight,
    Plus,
} from 'lucide-react';
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from '../../hooks/useEvents';
import { useCourses } from '../../hooks/useCourses';
import type { Event } from '../../types';

// ─── Helpers ──────────────────────────────────────────────

const eventTypeBadge: Record<string, string> = {
    CLASS: 'bg-[#EFF6FF] text-[#3B82F6]', // bleu
    EXAM: 'bg-[#FEF2F2] text-[#EF4444]',  // rouge
    EXAMEN: 'bg-[#FEF2F2] text-[#EF4444]',
    INTERRO: 'bg-[#FFF7ED] text-[#F59E0B]', // orange
    TP: 'bg-[#F0FDF4] text-[#10B981]',   // vert
    STUDY: 'bg-[#F0FDF4] text-[#10B981]',
    QUIZ: 'bg-[#FFF7ED] text-[#F59E0B]',
    ASSIGNMENT: 'bg-[#EFF6FF] text-[#3B82F6]',
    MEETING: 'bg-[#F3F4F6] text-[#1A1A1A]', // gris
    PERSONAL: 'bg-[#F3F4F6] text-[#1A1A1A]',
    AUTRE: 'bg-[#F3F4F6] text-[#1A1A1A]',
};

const eventTypeLabel: Record<string, string> = {
    CLASS: 'Cours',
    EXAM: 'Examen',
    EXAMEN: 'Examen',
    INTERRO: 'Interro',
    TP: 'TP',
    STUDY: 'Étude',
    QUIZ: 'Quiz',
    ASSIGNMENT: 'Devoir',
    MEETING: 'Réunion',
    PERSONAL: 'Personnel',
    AUTRE: 'Autre',
};

// ─── Modal détail / édition event ─────────────────────────

interface EventModalProps {
    event: Event;
    courseColor?: string;
    onClose: () => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, payload: Partial<Event>) => void;
}

const EventModal = ({
    event,
    courseColor,
    onClose,
    onDelete,
    onUpdate,
}: EventModalProps) => {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        title: event.title,
        type: event.type,
        startDate: event.startDate.slice(0, 16),
        endDate: event.endDate.slice(0, 16),
        location: event.location ?? '',
        description: event.description ?? '',
    });

    const handleSave = () => {
        onUpdate(event.id, {
            title: form.title,
            type: form.type as Event['type'],
            startDate: new Date(form.startDate).toISOString(),
            endDate: new Date(form.endDate).toISOString(),
            location: form.location || undefined,
            description: form.description || undefined,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 sm:p-6 bg-black/20 backdrop-blur-[2px]">
            <div className="bg-white w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-[24px] p-8 shadow-2xl relative scrollbar-hide">
                {/* Header */}
                <div className="flex items-start gap-3 mb-6">
                    <div
                        className="w-3.5 h-3.5 rounded-full mt-1.5 shrink-0"
                        style={{ background: courseColor ?? '#1A1A1A' }}
                    />
                    <div className="flex-1">
                        {editing ? (
                            <input
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="w-full h-10 px-3 rounded-xl border border-[#E5E5E5] text-[15px] font-bold text-[#1A1A1A] outline-none mb-2"
                            />
                        ) : (
                            <h3 className="font-bold text-[20px] text-[#1A1A1A] mb-1 leading-tight">
                                {event.title}
                            </h3>
                        )}
                        <span className={`px-2.5 py-1 rounded-[6px] text-[11px] font-bold ${eventTypeBadge[event.type] ?? 'bg-[#F3F4F6] text-[#1A1A1A]'}`}>
                            {eventTypeLabel[event.type] ?? event.type}
                        </span>
                    </div>
                </div>

                {editing ? (
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Type</label>
                                <select
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value as Event['type'] })}
                                    className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] bg-transparent outline-none"
                                >
                                    {Object.entries(eventTypeLabel).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1" />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Début</label>
                                <input
                                    type="datetime-local"
                                    value={form.startDate}
                                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                                    className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Fin</label>
                                <input
                                    type="datetime-local"
                                    value={form.endDate}
                                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                                    className="w-full h-11 px-3 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Lieu</label>
                            <input
                                value={form.location}
                                onChange={(e) => setForm({ ...form, location: e.target.value })}
                                placeholder="ex: Amphi B"
                                className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest block mb-2">Description</label>
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="w-full rounded-xl border border-[#E5E5E5] text-[15px] p-3 font-medium text-[#1A1A1A] outline-none min-h-[80px]"
                                rows={2}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 text-[15px] font-medium text-[#1A1A1A] mt-2 mb-4 bg-[#FAF9F6] p-5 rounded-[16px]">
                        <div className="flex gap-3 items-start">
                            <Clock size={16} className="text-[#737373] mt-0.5 shrink-0" />
                            <div>
                                <div className="font-bold">{format(parseISO(event.startDate), 'EEEE d MMMM', { locale: fr })}</div>
                                <div className="text-[#737373]">{format(parseISO(event.startDate), 'HHhmm', { locale: fr })} – {format(parseISO(event.endDate), 'HHhmm', { locale: fr })}</div>
                            </div>
                        </div>
                        {event.location && (
                            <div className="flex gap-3 items-center">
                                <MapPin size={16} className="text-[#737373] shrink-0" />
                                <span>{event.location}</span>
                            </div>
                        )}
                        {event.description && (
                            <div className="flex gap-3 items-start">
                                <FileText size={16} className="text-[#737373] mt-0.5 shrink-0" />
                                <span className="whitespace-pre-line text-[14px] text-[#737373]">{event.description}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#E5E5E5]">
                    <button
                        type="button"
                        onClick={() => {
                            if (confirm('Supprimer cet événement ?')) {
                                onDelete(event.id);
                                onClose();
                            }
                        }}
                        className="text-[13px] font-bold text-[#EF4444] hover:opacity-70 px-2"
                    >
                        Supprimer
                    </button>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[15px] font-bold text-[#1A1A1A] hover:bg-gray-50 bg-white">
                            Fermer
                        </button>
                        {editing ? (
                            <button onClick={handleSave} className="px-5 py-2.5 rounded-xl border border-[#1A1A1A] bg-[#1A1A1A] text-white text-[15px] font-bold hover:opacity-90 transition-opacity">
                                Enregistrer
                            </button>
                        ) : (
                            <button onClick={() => setEditing(true)} className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[15px] font-bold text-[#1A1A1A] hover:bg-gray-50 bg-white shadow-sm">
                                Modifier
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

// ─── Modal création event ──────────────────────────────────

interface CreateEventModalProps {
    defaultDate: Date;
    courses: { id: string; name: string; color: string }[];
    onClose: () => void;
    onCreate: (payloads: Partial<Event>[]) => void;
    isLoading: boolean;
}

const CreateEventModal = ({
    defaultDate,
    courses,
    onClose,
    onCreate,
    isLoading,
}: CreateEventModalProps) => {
    const [form, setForm] = useState({
        title: '',
        type: 'CLASS' as Event['type'],
        startDate: format(defaultDate, "yyyy-MM-dd'T'HH:mm"),
        endDate: format(new Date(defaultDate.getTime() + 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm"),
        location: '',
        courseId: '',
    });

    const [isRecurring, setIsRecurring] = useState(false);
    const [recurrenceEndDate, setRecurrenceEndDate] = useState(format(addMonths(defaultDate, 1), "yyyy-MM-dd"));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const baseStart = new Date(form.startDate);
        const baseEnd = new Date(form.endDate);
        const payloads: Partial<Event>[] = [];

        payloads.push({
            title: form.title,
            type: form.type,
            startDate: baseStart.toISOString(),
            endDate: baseEnd.toISOString(),
            location: form.location || undefined,
            courseId: form.courseId || undefined,
            isAllDay: false,
        });

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
                                    <option key={key} value={key}>{label}</option>
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
                                {courses.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
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
                        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[15px] font-bold text-[#1A1A1A] hover:bg-gray-50 bg-white">
                            Annuler
                        </button>
                        <button type="submit" disabled={isLoading} className="px-5 py-2.5 rounded-xl border border-[#1A1A1A] bg-[#1A1A1A] text-white text-[15px] font-bold hover:opacity-90 flex items-center justify-center min-w-[120px]">
                            {isLoading
                                ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                : 'Créer'
                            }
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

// ─── Grille calendrier ─────────────────────────────────────

interface CalendarGridProps {
    currentMonth: Date;
    events: Event[];
    courses: { id: string; name: string; color: string }[];
    selectedDay: Date;
    onSelectDay: (day: Date) => void;
}

const CalendarGrid = ({
    currentMonth,
    events,
    courses,
    selectedDay,
    onSelectDay,
}: CalendarGridProps) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days: Date[] = [];
    let day = startDate;
    while (day <= endDate) {
        days.push(day);
        day = addDays(day, 1);
    }

    const getEventsForDay = (d: Date) =>
        events.filter((e) => isSameDay(parseISO(e.startDate), d));

    const getCourseColor = (courseId: string | null | undefined) =>
        courses.find((c) => c.id === courseId)?.color ?? '#1A1A1A';

    const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    return (
        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-4 md:p-6 mb-8 mt-5 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-6">
            <div className="min-w-[320px]">
                {/* Noms des jours */}
                <div className="grid grid-cols-7 mb-4">
                    {dayNames.map((d) => (
                        <div key={d} className="text-[12px] md:text-[13px] text-center text-[#737373] font-bold">
                            {d}
                        </div>
                    ))}
                </div>

                {/* Cases */}
                <div className="grid grid-cols-7 gap-y-3 gap-x-1">
                {days.map((d) => {
                    const dayEvents = getEventsForDay(d);
                    const isSelected = isSameDay(d, selectedDay);
                    const isCurrentMonth = isSameMonth(d, currentMonth);

                    return (
                        <div
                            key={d.toString()}
                            onClick={() => onSelectDay(d)}
                            className="min-h-[64px] flex flex-col items-center justify-start cursor-pointer group"
                        >
                            <div className={`
                                w-9 h-9 flex items-center justify-center rounded-full text-[15px] font-bold mb-[6px] transition-colors
                                ${!isCurrentMonth ? 'text-[#D4D4D4]' : isSelected ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A] hover:bg-[#E5E5E5]'}
                            `}>
                                {format(d, 'd')}
                            </div>

                            <div className="flex gap-1 justify-center flex-wrap px-1 w-full max-w-[28px]">
                                {dayEvents.slice(0, 4).map((e) => (
                                    <div
                                        key={e.id}
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{ background: getCourseColor(e.courseId) }}
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
};

// ─── Planner hebdomadaire (Emploi du temps) ────────────────
// Restauration de l'affichage hebdo adapté au nouveau style

interface WeeklyPlannerProps {
    currentDate: Date;
    events: Event[];
    courses: { id: string; name: string; color: string }[];
    onSelectEvent: (event: Event) => void;
}

const WeeklyPlanner = ({ currentDate, events, courses, onSelectEvent }: WeeklyPlannerProps) => {
    // Affiche du Lundi au Vendredi (5 jours + Sam), de 08:00 à 19:00 (11 blocs)
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const days = Array.from({ length: 6 }).map((_, i) => addDays(weekStart, i)); // Lun-Sam
    const hours = Array.from({ length: 12 }).map((_, i) => i + 8); // 8h à 19h

    const getCourseColor = (courseId: string | null | undefined) =>
        courses.find((c) => c.id === courseId)?.color ?? '#1A1A1A';

    return (
        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] overflow-hidden flex flex-col mb-8 mt-5 shadow-sm -mx-4 md:mx-0">
            {/* Conteneur scrollable horizontal */}
            <div className="overflow-x-auto scrollbar-hide">
                <div className="min-w-[770px] flex flex-col">
                    
                    {/* Conteneur scrollable vertical unique pour le header et la grille */}
                    <div className="h-[500px] overflow-y-auto scrollbar-thin relative bg-white">
                        
                        {/* Header des jours - Collant au sommet du scroll vertical */}
                        <div className="flex border-b border-[#E5E5E5] bg-white sticky top-0 z-40">
                            <div className="w-[50px] shrink-0 border-r border-[#E5E5E5] bg-white"></div>
                            {days.map(d => (
                                <div key={d.toString()} className="flex-1 min-w-[120px] text-center py-3 border-r border-[#E5E5E5] last:border-none bg-white">
                                    <div className={`text-[12px] font-bold uppercase tracking-widest ${isToday(d) ? 'text-[#1A1A1A]' : 'text-[#737373]'}`}>
                                        {format(d, 'EEEE', { locale: fr })}
                                    </div>
                                    <div className={`text-[18px] font-bold mt-1 ${isToday(d) ? 'text-[#1A1A1A] bg-[#E5E5E5] inline-block px-2 rounded-lg' : 'text-[#1A1A1A]'}`}>
                                        {format(d, 'd')}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Grille */}
                        <div className="flex relative bg-white">
                            <div className="w-[50px] shrink-0 border-r border-[#E5E5E5] flex flex-col relative z-20 bg-white">
                                {hours.map((h, idx) => (
                                    <div key={h} className={`h-[55px] relative ${idx < hours.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}>
                                        <span className="absolute -top-2.5 right-2 text-[11px] font-bold text-[#A3A3A3] bg-white px-1">{h}h</span>
                                    </div>
                                ))}
                            </div>

                            {days.map(d => {
                                const dayEvents = events.filter(e => isSameDay(parseISO(e.startDate), d));
                                return (
                                    <div key={d.toString()} className="flex-1 min-w-[120px] border-r border-[#E5E5E5] last:border-none relative">
                                        {hours.map((h, idx) => (
                                            <div key={h} className={`h-[55px] pointer-events-none ${idx < hours.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`} />
                                        ))}
                                        {dayEvents.map(event => {
                                            const start = parseISO(event.startDate);
                                            const end = parseISO(event.endDate);
                                            const startHour = start.getHours() + start.getMinutes() / 60;
                                            const endHour = end.getHours() + end.getMinutes() / 60;
                                            
                                            const top = (startHour - 8) * 55;
                                            let height = (endHour - startHour) * 55;
                                            if (height < 20) height = 20;
                                            if (top < -55 || top > hours.length * 55) return null;

                                            const color = getCourseColor(event.courseId);

                                            return (
                                                <div
                                                    key={event.id}
                                                    onClick={() => onSelectEvent(event)}
                                                    className="absolute left-[3px] right-[3px] rounded-[6px] p-2 overflow-hidden cursor-pointer hover:shadow-md transition-shadow z-30 border"
                                                    style={{
                                                        top: `${top}px`,
                                                        height: `${height}px`,
                                                        backgroundColor: color + '1A', 
                                                        borderColor: color + '40', 
                                                        borderLeft: `4px solid ${color}` 
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
};

// ─── Page principale ───────────────────────────────────────

export default function AgendaPage() {
    const { data: events = [], isLoading: eventsLoading } = useEvents();
    const { data: courses = [] } = useCourses();
    const { mutateAsync: createEventAsync, isPending: isCreating } = useCreateEvent();
    const { mutate: updateEvent } = useUpdateEvent();
    const { mutate: deleteEvent } = useDeleteEvent();

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [activeCourseFilter, setActiveCourseFilter] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

    const activeCourses = courses
        .filter((c) => !c.isDeleted)
        .map((c) => ({ id: c.id, name: c.name, color: c.color }));

    const filteredEvents = activeCourseFilter
        ? events.filter((e) => e.courseId === activeCourseFilter)
        : events;

    const selectedDayEvents = filteredEvents
        .filter((e) => isSameDay(parseISO(e.startDate), selectedDay))
        .sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime());

    return (
        <div className="max-w-[1400px] mx-auto flex flex-col px-4 md:px-6 pb-20 md:pb-10 pt-2 md:pt-4">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 mt-2">
                
                <div className="flex items-center justify-between md:justify-start gap-2 md:gap-4">
                    <button 
                        onClick={() => setCurrentDate(viewMode === 'month' ? subMonths(currentDate, 1) : subWeeks(currentDate, 1))} 
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50 transition-colors bg-white shadow-sm"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <span className="text-[26px] font-bold text-[#1A1A1A] capitalize tracking-tight min-w-[160px] text-center">
                        {viewMode === 'month' 
                            ? format(currentDate, 'MMMM yyyy', { locale: fr })
                            : `Sem. du ${format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'd MMM', { locale: fr })}`
                        }
                    </span>
                    <button 
                        onClick={() => setCurrentDate(viewMode === 'month' ? addMonths(currentDate, 1) : addWeeks(currentDate, 1))} 
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50 transition-colors bg-white shadow-sm"
                    >
                        <ChevronRight size={18} />
                    </button>
                    
                    <button 
                        onClick={() => {
                            setCurrentDate(new Date());
                            setSelectedDay(new Date());
                        }} 
                        className="px-4 h-10 ml-2 rounded-xl border border-[#E5E5E5] text-[#1A1A1A] font-bold text-[14px] hover:bg-gray-50 bg-white shadow-sm transition-colors"
                    >
                        Aujourd'hui
                    </button>
                </div>
                
                <div className="flex items-center gap-4">
                     <div className="flex rounded-xl border border-[#E5E5E5] overflow-hidden bg-[#FAF9F6] p-1 gap-1">
                          {['Mois', 'Semaine', 'Jour'].map(view => {
                              const vKey = view === 'Mois' ? 'month' : view === 'Semaine' ? 'week' : 'day';
                              return (
                                  <button 
                                      key={vKey}
                                      onClick={() => setViewMode(vKey as any)} 
                                      className={`px-4 py-[6px] rounded-[8px] text-[13px] font-bold transition-colors ${viewMode === vKey ? 'bg-white text-[#1A1A1A] shadow-sm' : 'bg-transparent text-[#737373] hover:text-[#1A1A1A]'}`}
                                  >
                                      {view}
                                  </button>
                              );
                          })}
                     </div>
                     <button
                         onClick={() => setShowCreateModal(true)}
                         className="px-4 py-2.5 md:px-5 rounded-xl border border-[#E5E5E5] bg-white text-[15px] font-bold text-[#1A1A1A] hover:bg-gray-50 shadow-sm transition-colors whitespace-nowrap flex items-center justify-center gap-2"
                     >
                         <Plus size={16} />
                         <span className="hidden md:inline">Événement</span>
                     </button>
                </div>

            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2.5 mt-5 mb-2">
                <button
                    onClick={() => setActiveCourseFilter(null)}
                    className={`px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors ${activeCourseFilter === null ? 'bg-[#1A1A1A] text-white' : 'bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#A3A3A3]'}`}
                >
                    Tous
                </button>
                {activeCourses.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => setActiveCourseFilter(activeCourseFilter === c.id ? null : c.id)}
                        className={`px-3.5 py-[6px] rounded-full text-[13px] font-bold transition-colors flex items-center gap-2 border ${activeCourseFilter === c.id ? 'bg-[#FAF9F6] border-[#A3A3A3] text-[#1A1A1A]' : 'bg-transparent border-[#E5E5E5] text-[#1A1A1A] hover:border-[#A3A3A3]'}`}
                    >
                        <span className="w-2.5 h-2.5 rounded-full mt-0.5" style={{ background: c.color }} />
                        {c.name}
                    </button>
                ))}
            </div>

            {/* Calendrier / Planner */}
            {eventsLoading ? (
                <div className="h-[500px] w-full bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] mt-6 animate-pulse" />
            ) : viewMode === 'month' ? (
                <CalendarGrid
                    currentMonth={currentDate}
                    events={filteredEvents}
                    courses={activeCourses}
                    selectedDay={selectedDay}
                    onSelectDay={setSelectedDay}
                />
            ) : (
                <WeeklyPlanner
                    currentDate={currentDate}
                    events={filteredEvents}
                    courses={activeCourses}
                    onSelectEvent={setSelectedEvent}
                />
            )}

            {/* Events du jour (Vue Mois uniquement) */}
            {viewMode === 'month' && (
                <div className="flex flex-col">
                    <div className="text-[12px] font-bold text-[#737373] uppercase tracking-widest mb-4 ml-1">
                        {format(selectedDay, 'EEEE d MMMM', { locale: fr })} — {selectedDayEvents.length} ÉVÉNEMENT{selectedDayEvents.length !== 1 ? 'S' : ''}
                    </div>

                    {selectedDayEvents.length === 0 ? (
                        <div className="bg-[#FAF9F6] rounded-[24px] border border-[#E5E5E5] p-6 text-[14px] text-[#A3A3A3] text-center font-bold">
                            Aucun événement pour cette journée.
                        </div>
                    ) : (
                        <div className="bg-[#FAF9F6] rounded-[24px] border border-[#E5E5E5] flex flex-col overflow-hidden">
                            {selectedDayEvents.map((event, i) => {
                                const isNotLast = i !== selectedDayEvents.length - 1;
                                const course = courses.find((c) => c.id === event.courseId);
                                const color = course?.color ?? '#A3A3A3';
                                
                                return (
                                <div key={event.id} onClick={() => setSelectedEvent(event)} className={`flex items-center p-4 relative cursor-pointer hover:bg-white transition-colors ${isNotLast ? 'border-b border-[#E5E5E5]' : ''}`}>
                                    <div className="absolute left-5 top-4 bottom-4 w-1 rounded-full" style={{ background: color }} />
                                    
                                    <div className="w-[130px] shrink-0 pl-8 text-[13px] font-medium text-[#737373]">
                                        {format(parseISO(event.startDate), 'HHh\x00mm')} – {format(parseISO(event.endDate), 'HHh\x00mm')}
                                    </div>

                                    <div className="flex-1 min-w-0 pr-4">
                                        <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                                            {course ? `${course.name} — ` : ''}{event.title}
                                        </div>
                                        <div className="text-[12px] font-medium text-[#737373] mt-0.5 truncate">
                                            {event.location || event.description || ' '}
                                        </div>
                                    </div>
                                    
                                    <div className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide shrink-0 ${eventTypeBadge[event.type] ?? 'bg-[#E5E5E5] text-[#1A1A1A]'}`}>
                                        {eventTypeLabel[event.type] ?? event.type}
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Modals existantes */}
            {selectedEvent && (
                <EventModal
                    event={selectedEvent}
                    courseColor={activeCourses.find((c) => c.id === selectedEvent.courseId)?.color}
                    onClose={() => setSelectedEvent(null)}
                    onDelete={deleteEvent}
                    onUpdate={(id, payload) => updateEvent({ id, payload })}
                />
            )}

            {showCreateModal && (
                <CreateEventModal
                    defaultDate={selectedDay}
                    courses={activeCourses}
                    onClose={() => setShowCreateModal(false)}
                    onCreate={async (payloads) => {
                        try {
                            for (const p of payloads) {
                                await createEventAsync(p as Omit<Event, 'id'>);
                            }
                            setShowCreateModal(false);
                        } catch (error) {
                            console.error("Erreur lors de la création multiple:", error);
                        }
                    }}
                    isLoading={isCreating}
                />
            )}
        </div>
    );
}