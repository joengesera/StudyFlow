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
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from '../../hooks/useEvents';
import { useCourses } from '../../hooks/useCourses';
import type { Event } from '../../types';

// ─── Helpers ──────────────────────────────────────────────

const eventTypeBadge: Record<string, string> = {
    CLASS: 'badge-info',
    EXAM: 'badge-error',
    EXAMEN: 'badge-error',
    INTERRO: 'badge-warning',
    TP: 'badge-success',
    STUDY: 'badge-success',
    QUIZ: 'badge-warning',
    ASSIGNMENT: 'badge-info',
    MEETING: 'badge-ghost',
    PERSONAL: 'badge-ghost',
    AUTRE: 'badge-ghost',
};

const eventTypeLabel: Record<string, string> = {
    CLASS: 'Cours',
    EXAM: 'Examen',
    EXAMEN: 'Examen',
    INTERRO: 'Interro',
    TP: 'TP',
    STUDY: 'Révision',
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
        <dialog open className="modal modal-open">
            <div className="modal-box max-w-md">

                {/* Header */}
                <div className="flex items-start gap-3 mb-5">
                    <div
                        className="w-3 h-3 rounded-full mt-1 shrink-0"
                        style={{ background: courseColor ?? '#3B82F6' }}
                    />
                    <div className="flex-1">
                        {editing ? (
                            <input
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="input input-bordered input-sm w-full"
                            />
                        ) : (
                            <h3 className="font-medium text-base text-base-content">
                                {event.title}
                            </h3>
                        )}
                        <span className={`badge badge-xs mt-1 ${eventTypeBadge[event.type] ?? 'badge-ghost'}`}>
                            {eventTypeLabel[event.type] ?? event.type}
                        </span>
                    </div>
                </div>

                {editing ? (
                    <div className="flex flex-col gap-3">

                        <div>
                            <label className="text-xs text-base-content/50 mb-1 block">Type</label>
                            <select
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value as Event['type'] })}
                                className="select select-bordered select-sm w-full"
                            >
                                {Object.entries(eventTypeLabel).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-xs text-base-content/50 mb-1 block">Début</label>
                                <input
                                    type="datetime-local"
                                    value={form.startDate}
                                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                                    className="input input-bordered input-xs w-full"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-base-content/50 mb-1 block">Fin</label>
                                <input
                                    type="datetime-local"
                                    value={form.endDate}
                                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                                    className="input input-bordered input-xs w-full"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-base-content/50 mb-1 block">Lieu</label>
                            <input
                                value={form.location}
                                onChange={(e) => setForm({ ...form, location: e.target.value })}
                                placeholder="ex: Amphi B"
                                className="input input-bordered input-sm w-full"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-base-content/50 mb-1 block">Description</label>
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="textarea textarea-bordered textarea-sm w-full"
                                rows={2}
                            />
                        </div>

                    </div>
                ) : (
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex gap-2 text-base-content/60">
                            <span>🕐</span>
                            <span>
                                {format(parseISO(event.startDate), 'EEEE d MMMM · HH:mm', { locale: fr })}
                                {' – '}
                                {format(parseISO(event.endDate), 'HH:mm', { locale: fr })}
                            </span>
                        </div>
                        {event.location && (
                            <div className="flex gap-2 text-base-content/60">
                                <span>📍</span>
                                <span>{event.location}</span>
                            </div>
                        )}
                        {event.description && (
                            <div className="flex gap-2 text-base-content/60">
                                <span>📝</span>
                                <span>{event.description}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={() => {
                            if (confirm('Supprimer cet événement ?')) {
                                onDelete(event.id);
                                onClose();
                            }
                        }}
                        className="btn btn-ghost btn-xs text-error"
                    >
                        Supprimer
                    </button>
                    <div className="flex gap-2">
                        <button onClick={onClose} className="btn btn-ghost btn-sm">
                            Fermer
                        </button>
                        {editing ? (
                            <button onClick={handleSave} className="btn btn-neutral btn-sm">
                                Enregistrer
                            </button>
                        ) : (
                            <button
                                onClick={() => setEditing(true)}
                                className="btn btn-neutral btn-sm"
                            >
                                Modifier
                            </button>
                        )}
                    </div>
                </div>

            </div>
            <div className="modal-backdrop" onClick={onClose} />
        </dialog>
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
        endDate: format(addDays(defaultDate, 0), "yyyy-MM-dd'T'HH:mm"),
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
        <dialog open className="modal modal-open">
            <div className="modal-box max-w-md">

                <h3 className="font-medium text-base mb-5">Nouvel événement</h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                    <div>
                        <label className="text-xs text-base-content/50 mb-1 block">Titre</label>
                        <input
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="ex: Cours de Maths"
                            required
                            className="input input-bordered input-sm w-full"
                        />
                    </div>

                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="text-xs text-base-content/50 mb-1 block">Type</label>
                            <select
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value as Event['type'] })}
                                className="select select-bordered select-sm w-full"
                            >
                                {Object.entries(eventTypeLabel).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-base-content/50 mb-1 block">Cours</label>
                            <select
                                value={form.courseId}
                                onChange={(e) => setForm({ ...form, courseId: e.target.value })}
                                className="select select-bordered select-sm w-full"
                            >
                                <option value="">Aucun</option>
                                {courses.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="text-xs text-base-content/50 mb-1 block">Début</label>
                            <input
                                type="datetime-local"
                                value={form.startDate}
                                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                                required
                                className="input input-bordered input-xs w-full"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-base-content/50 mb-1 block">Fin</label>
                            <input
                                type="datetime-local"
                                value={form.endDate}
                                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                                required
                                className="input input-bordered input-xs w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-base-content/50 mb-1 block">Lieu (optionnel)</label>
                        <input
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            placeholder="ex: Amphi B"
                            className="input input-bordered input-sm w-full"
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-2 bg-base-200/50 p-3 rounded-xl border border-base-200">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="checkbox checkbox-sm"
                                checked={isRecurring}
                                onChange={(e) => setIsRecurring(e.target.checked)}
                            />
                            <span className="text-sm font-medium">Répéter toutes les semaines</span>
                        </label>
                        {isRecurring && (
                            <div className="pl-6 mt-1">
                                <label className="text-xs text-base-content/50 mb-1 block">Jusqu'au</label>
                                <input
                                    type="date"
                                    value={recurrenceEndDate}
                                    onChange={(e) => setRecurrenceEndDate(e.target.value)}
                                    required={isRecurring}
                                    className="input input-bordered input-xs w-full max-w-[150px]"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                        <button type="button" onClick={onClose} className="btn btn-ghost btn-sm">
                            Annuler
                        </button>
                        <button type="submit" disabled={isLoading} className="btn btn-neutral btn-sm">
                            {isLoading
                                ? <span className="loading loading-spinner loading-xs" />
                                : 'Créer'
                            }
                        </button>
                    </div>

                </form>

            </div>
            <div className="modal-backdrop" onClick={onClose} />
        </dialog>
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
        courses.find((c) => c.id === courseId)?.color ?? '#3B82F6';

    const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    return (
        <div>
            {/* Noms des jours */}
            <div className="grid grid-cols-7 mb-1">
                {dayNames.map((d) => (
                    <div key={d} className="text-xs text-center text-base-content/40 py-2 font-medium">
                        {d}
                    </div>
                ))}
            </div>

            {/* Cases */}
            <div className="grid grid-cols-7 gap-0.5">
                {days.map((d) => {
                    const dayEvents = getEventsForDay(d);
                    const isSelected = isSameDay(d, selectedDay);
                    const isCurrentMonth = isSameMonth(d, currentMonth);
                    const isTodayDay = isToday(d);

                    return (
                        <div
                            key={d.toString()}
                            onClick={() => onSelectDay(d)}
                            className={`
                min-h-14 p-1 rounded-lg cursor-pointer transition-colors
                ${isSelected ? 'bg-base-200' : 'hover:bg-base-200/50'}
                ${!isCurrentMonth ? 'opacity-30' : ''}
              `}
                        >
                            {/* Numéro du jour */}
                            <div className="flex justify-center mb-1">
                                <span className={`
                  text-xs w-6 h-6 flex items-center justify-center rounded-full
                  ${isTodayDay
                                        ? 'bg-base-content text-base-100 font-medium'
                                        : 'text-base-content/60'
                                    }
                `}>
                                    {format(d, 'd')}
                                </span>
                            </div>

                            {/* Points d'events */}
                            <div className="flex flex-wrap gap-0.5 justify-center">
                                {dayEvents.slice(0, 3).map((e) => (
                                    <div
                                        key={e.id}
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{ background: getCourseColor(e.courseId) }}
                                    />
                                ))}
                                {dayEvents.length > 3 && (
                                    <div className="text-xs text-base-content/30">
                                        +{dayEvents.length - 3}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ─── Planner hebdomadaire (Emploi du temps) ────────────────

interface WeeklyPlannerProps {
    currentDate: Date;
    events: Event[];
    courses: { id: string; name: string; color: string }[];
    onSelectEvent: (event: Event) => void;
}

const WeeklyPlanner = ({ currentDate, events, courses, onSelectEvent }: WeeklyPlannerProps) => {
    // Affiche du Lundi au Vendredi (5 jours), de 08:00 à 19:00 (11 blocs)
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const days = Array.from({ length: 6 }).map((_, i) => addDays(weekStart, i)); // Lun-Sam
    const hours = Array.from({ length: 12 }).map((_, i) => i + 8); // 8h à 19h

    const getCourseColor = (courseId: string | null | undefined) =>
        courses.find((c) => c.id === courseId)?.color ?? '#3B82F6';

    return (
        <div className="flex flex-col border border-base-200 rounded-xl overflow-x-auto bg-white shadow-sm scrollbar-thin">
            {/* 1. Header des jours */}
            <div className="flex border-b border-base-200 bg-gray-50/50">
                <div className="w-12 shrink-0 border-r border-base-200"></div>
                {days.map(d => (
                    <div key={d.toString()} className={`flex-1 min-w-[120px] text-center py-2.5 border-r border-base-200 last:border-none ${isToday(d) ? 'bg-blue-50/50' : ''}`}>
                        <div className={`text-[11px] font-semibold uppercase tracking-wider ${isToday(d) ? 'text-blue-600' : 'text-gray-500'}`}>
                            {format(d, 'EEEE', { locale: fr })}
                        </div>
                        <div className={`text-xl font-medium mt-0.5 ${isToday(d) ? 'text-blue-600' : 'text-gray-800'}`}>
                            {format(d, 'd')}
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. Grille horaire et événements */}
            <div className="flex relative h-[500px] overflow-y-auto scrollbar-thin">
                {/* Colonne des heures */}
                <div className="w-12 shrink-0 border-r border-base-200 bg-gray-50/30 flex flex-col relative z-10">
                    {hours.map((h, idx) => (
                        <div key={h} className={`h-[50px] relative ${idx < hours.length - 1 ? 'border-b border-base-200/50' : ''}`}>
                            <span className="absolute -top-2.5 right-2 text-[10px] font-medium text-gray-400 bg-white px-0.5">{h}h</span>
                        </div>
                    ))}
                </div>

                {/* Colonnes des jours */}
                {days.map(d => {
                    const dayEvents = events.filter(e => isSameDay(parseISO(e.startDate), d));
                    return (
                        <div key={d.toString()} className={`flex-1 min-w-[120px] border-r border-base-200 last:border-none relative ${isToday(d) ? 'bg-blue-50/10' : ''}`}>
                            {/* Lignes horizontales de fond */}
                            {hours.map((h, idx) => (
                                <div key={h} className={`h-[50px] pointer-events-none ${idx < hours.length - 1 ? 'border-b border-base-200/30' : ''}`} />
                            ))}

                            {/* Blocs d'événements */}
                            {dayEvents.map(event => {
                                const start = parseISO(event.startDate);
                                const end = parseISO(event.endDate);
                                const startHour = start.getHours() + start.getMinutes() / 60;
                                const endHour = end.getHours() + end.getMinutes() / 60;
                                
                                // On dessine si c'est globalement dans la plage 8h-20h
                                // Base : 8h = 0px | Hauteur : 50px par heure
                                const top = (startHour - 8) * 50;
                                let height = (endHour - startHour) * 50;
                                if (height < 20) height = 20; // min-height pour la visibilité
                                
                                // Exclusion hors champ pour l'esthétique simple
                                if (top < -50 || top > hours.length * 50) return null;

                                const color = getCourseColor(event.courseId);

                                return (
                                    <div
                                        key={event.id}
                                        onClick={() => onSelectEvent(event)}
                                        className="absolute left-1 right-1 rounded-md p-1.5 overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform z-20 group border"
                                        style={{
                                            top: `${top}px`,
                                            height: `${height}px`,
                                            backgroundColor: color + '15', // Opacité très faible
                                            borderColor: color + '40',     // Bordure discrète
                                            borderLeft: `4px solid ${color}` // Bordure d'accroche
                                        }}
                                        title={`${event.title} (${format(start, 'HH:mm')} - ${format(end, 'HH:mm')})`}
                                    >
                                        <div className="text-[11px] font-semibold leading-tight text-gray-800 break-words group-hover:text-blue-700">
                                            {event.title}
                                        </div>
                                        {height >= 40 && (
                                            <div className="text-[10px] text-gray-500 mt-0.5 truncate bg-white/50 w-max px-1 rounded-sm">
                                                {format(start, 'HH:mm')} - {format(end, 'HH:mm')}
                                            </div>
                                        )}
                                        {height >= 60 && event.location && (
                                            <div className="text-[10px] text-gray-400 mt-0.5 truncate">
                                                📍 {event.location}
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
    );
};

// ─── Page principale ───────────────────────────────────────

export default function AgendaPage() {
    const { data: events = [], isLoading: eventsLoading } = useEvents();
    const { data: courses = [] } = useCourses();
    const { mutate: createEvent, isPending: isCreating } = useCreateEvent();
    const { mutate: updateEvent } = useUpdateEvent();
    const { mutate: deleteEvent } = useDeleteEvent();

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [activeCourseFilter, setActiveCourseFilter] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

    const activeCourses = courses
        .filter((c) => !c.isDeleted)
        .map((c) => ({ id: c.id, name: c.name, color: c.color }));

    // Filtre par cours
    const filteredEvents = activeCourseFilter
        ? events.filter((e) => e.courseId === activeCourseFilter)
        : events;

    // Events du jour sélectionné
    const selectedDayEvents = filteredEvents
        .filter((e) => isSameDay(parseISO(e.startDate), selectedDay))
        .sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime());

    const getCourseColor = (courseId: string | null | undefined) =>
        activeCourses.find((c) => c.id === courseId)?.color ?? '#3B82F6';

    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-5">

            {/* Header */}
            <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold text-gray-800 tracking-tight">Agenda</h1>
                    {/* Toggle Mois/Semaine */}
                    <div className="bg-gray-100 p-0.5 rounded-lg flex text-[13px] font-medium">
                        <button 
                            className={`px-3 py-1 rounded-md transition-all ${viewMode === 'month' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setViewMode('month')}
                        >
                            Mois
                        </button>
                        <button 
                            className={`px-3 py-1 rounded-md transition-all ${viewMode === 'week' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setViewMode('week')}
                        >
                            Semaine
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="btn btn-neutral btn-sm"
                >
                    + Événement
                </button>
            </div>

            {/* Filtres cours */}
            <div className="flex gap-2 flex-wrap">
                <button
                    onClick={() => setActiveCourseFilter(null)}
                    className={`badge cursor-pointer ${activeCourseFilter === null ? 'badge-neutral' : 'badge-ghost'}`}
                >
                    Tous
                </button>
                {activeCourses.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => setActiveCourseFilter(
                            activeCourseFilter === c.id ? null : c.id
                        )}
                        className={`badge cursor-pointer gap-1 ${activeCourseFilter === c.id ? 'badge-neutral' : 'badge-ghost'}`}
                    >
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: c.color }}
                        />
                        {c.name}
                    </button>
                ))}
            </div>

            {/* Calendrier / Planner */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

                {/* Navigation Période */}
                <div className="flex items-center justify-between mb-5">
                    <button
                        onClick={() => setCurrentDate(viewMode === 'month' ? subMonths(currentDate, 1) : subWeeks(currentDate, 1))}
                        className="btn btn-ghost btn-sm btn-circle hover:bg-gray-100 text-gray-600"
                    >
                        ←
                    </button>
                    <span className="text-[15px] font-semibold text-gray-800 capitalize tracking-wide">
                        {viewMode === 'month' 
                            ? format(currentDate, 'MMMM yyyy', { locale: fr })
                            : `Sem. du ${format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'd MMM', { locale: fr })}`
                        }
                    </span>
                    <button
                        onClick={() => setCurrentDate(viewMode === 'month' ? addMonths(currentDate, 1) : addWeeks(currentDate, 1))}
                        className="btn btn-ghost btn-sm btn-circle hover:bg-gray-100 text-gray-600"
                    >
                        →
                    </button>
                </div>

                {eventsLoading ? (
                    <div className="skeleton h-64 rounded-xl" />
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

            </div>

            {/* Events du jour sélectionné (Seulement en vue Mois) */}
            {viewMode === 'month' && (
            <div className="flex flex-col gap-1">
                <div className="text-xs font-medium text-base-content/40 uppercase tracking-widest mb-3">
                    {format(selectedDay, 'EEEE d MMMM', { locale: fr })}
                    {' · '}
                    {selectedDayEvents.length} événement{selectedDayEvents.length !== 1 ? 's' : ''}
                </div>

                {selectedDayEvents.length === 0 ? (
                    <div className="bg-base-100 rounded-xl border border-base-200 p-5 text-sm text-base-content/40 text-center">
                        Aucun événement ce jour
                    </div>
                ) : (
                    <div className="bg-base-100 rounded-xl border border-base-200 overflow-hidden">
                        {selectedDayEvents.map((event, i) => (
                            <div
                                key={event.id}
                                onClick={() => setSelectedEvent(event)}
                                className={`
                  flex items-center gap-3 px-5 py-3 cursor-pointer
                  hover:bg-base-200 transition-colors
                  ${i < selectedDayEvents.length - 1 ? 'border-b border-base-200' : ''}
                `}
                            >
                                <div
                                    className="w-1 self-stretch rounded-full shrink-0"
                                    style={{ background: getCourseColor(event.courseId) }}
                                />
                                <div className="text-xs text-base-content/40 min-w-20">
                                    {format(parseISO(event.startDate), 'HH:mm')}
                                    {' – '}
                                    {format(parseISO(event.endDate), 'HH:mm')}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm text-base-content">{event.title}</div>
                                    {event.location && (
                                        <div className="text-xs text-base-content/40 mt-0.5">
                                            {event.location}
                                        </div>
                                    )}
                                </div>
                                <span className={`badge badge-xs ${eventTypeBadge[event.type] ?? 'badge-ghost'}`}>
                                    {eventTypeLabel[event.type] ?? event.type}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            )}

            {/* Modal détail event */}
            {selectedEvent && (
                <EventModal
                    event={selectedEvent}
                    courseColor={getCourseColor(selectedEvent.courseId)}
                    onClose={() => setSelectedEvent(null)}
                    onDelete={(id) => {
                        deleteEvent(id);
                        setSelectedEvent(null);
                    }}
                    onUpdate={(id, payload) => updateEvent({ id, payload })}
                />
            )}

            {/* Modal création */}
            {showCreateModal && (
                <CreateEventModal
                    defaultDate={selectedDay}
                    courses={activeCourses}
                    onClose={() => setShowCreateModal(false)}
                    onCreate={(payloads) => {
                        for (const payload of payloads) {
                            createEvent(payload);
                        }
                        setShowCreateModal(false);
                    }}
                    isLoading={isCreating}
                />
            )}

        </div>
    );
}