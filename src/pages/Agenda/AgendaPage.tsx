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
    onCreate: (payload: Partial<Event>) => void;
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate({
            title: form.title,
            type: form.type,
            startDate: new Date(form.startDate).toISOString(),
            endDate: new Date(form.endDate).toISOString(),
            location: form.location || undefined,
            courseId: form.courseId || undefined,
            isAllDay: false,
        });
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

// ─── Page principale ───────────────────────────────────────

export default function AgendaPage() {
    const { data: events = [], isLoading: eventsLoading } = useEvents();
    const { data: courses = [] } = useCourses();
    const { mutate: createEvent, isPending: isCreating } = useCreateEvent();
    const { mutate: updateEvent } = useUpdateEvent();
    const { mutate: deleteEvent } = useDeleteEvent();

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [activeCourseFilter, setActiveCourseFilter] = useState<string | null>(null);

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
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-medium text-base-content">Agenda</h1>
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

            {/* Calendrier */}
            <div className="bg-base-100 rounded-2xl border border-base-200 p-5">

                {/* Navigation mois */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        className="btn btn-ghost btn-xs"
                    >
                        ←
                    </button>
                    <span className="text-sm font-medium text-base-content capitalize">
                        {format(currentMonth, 'MMMM yyyy', { locale: fr })}
                    </span>
                    <button
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        className="btn btn-ghost btn-xs"
                    >
                        →
                    </button>
                </div>

                {eventsLoading ? (
                    <div className="skeleton h-64 rounded-xl" />
                ) : (
                    <CalendarGrid
                        currentMonth={currentMonth}
                        events={filteredEvents}
                        courses={activeCourses}
                        selectedDay={selectedDay}
                        onSelectDay={setSelectedDay}
                    />
                )}

            </div>

            {/* Events du jour sélectionné */}
            <div>
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
                    onCreate={(payload) => {
                        createEvent(payload, {
                            onSuccess: () => setShowCreateModal(false),
                        });
                    }}
                    isLoading={isCreating}
                />
            )}

        </div>
    );
}