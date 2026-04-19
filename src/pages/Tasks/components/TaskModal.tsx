import { addDays } from 'date-fns';
import { Calendar, Clock3, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Event, Task } from '../../../types';

interface TaskModalProps {
    task: Task;
    events: Event[];
    onClose: () => void;
    onUpdate: (id: string, payload: Partial<Task>) => void;
    onDelete: (id: string) => void;
}

const fieldClassName = 'w-full h-12 px-4 rounded-xl border border-[#E5E5E5] bg-white text-[15px] font-medium text-[#1A1A1A] outline-none focus:border-[#737373] transition-colors';

const statusTone: Record<Task['status'], { label: string; bg: string; text: string }> = {
    PENDING: { label: 'A faire', bg: '#F3F4F6', text: '#4B5563' },
    IN_PROGRESS: { label: 'En cours', bg: '#FFF7ED', text: '#C2410C' },
    COMPLETED: { label: 'Terminee', bg: '#ECFDF5', text: '#047857' },
    CANCELED: { label: 'Annulee', bg: '#F3F4F6', text: '#6B7280' },
};

const formatEventLabel = (event: Event) => {
    const date = new Date(event.startDate);
    const dateLabel = Number.isNaN(date.getTime())
        ? 'Date inconnue'
        : date.toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });

    return `${event.title} - ${dateLabel}`;
};

const pad = (value: number) => String(value).padStart(2, '0');

const toLocalDateTimeInput = (value?: string | null) => {
    if (!value) return '';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '';

    return `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}T${pad(parsed.getHours())}:${pad(parsed.getMinutes())}`;
};

const getLocalDatePart = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const formatDuePreview = (value: string) => {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return 'Date invalide';
    return parsed.toLocaleString('fr-FR', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const TaskModal = ({ task, events, onClose, onUpdate, onDelete }: TaskModalProps) => {
    const [title, setTitle] = useState(task.title);
    const [priority, setPriority] = useState(task.priority);
    const [status, setStatus] = useState(task.status);
    const [eventId, setEventId] = useState(task.eventId ?? '');
    const [dueDate, setDueDate] = useState(toLocalDateTimeInput(task.dueDate));

    const dueDatePart = useMemo(() => (dueDate ? dueDate.slice(0, 10) : ''), [dueDate]);
    const dueTimePart = useMemo(() => (dueDate ? dueDate.slice(11, 16) : '09:00'), [dueDate]);

    const applyPresetDate = (daysToAdd: number) => {
        const nextDate = addDays(new Date(), daysToAdd);
        const nextDatePart = getLocalDatePart(nextDate);
        setDueDate(`${nextDatePart}T${dueTimePart}`);
    };

    const handleDateChange = (nextDatePart: string) => {
        if (!nextDatePart) {
            setDueDate('');
            return;
        }
        setDueDate(`${nextDatePart}T${dueTimePart}`);
    };

    const handleTimeChange = (nextTimePart: string) => {
        if (!nextTimePart) return;
        const baseDatePart = dueDatePart || getLocalDatePart(new Date());
        setDueDate(`${baseDatePart}T${nextTimePart}`);
    };

    const handleSave = () => {
        onUpdate(task.id, {
            title,
            priority,
            status,
            eventId: eventId || null,
            dueDate: dueDate ? new Date(dueDate).toISOString() : null,
            completedAt: status === 'COMPLETED'
                ? (task.status === 'COMPLETED' ? task.completedAt : new Date().toISOString())
                : null,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto bg-[#1A1A1A]/35 backdrop-blur-[3px] p-3 sm:p-4">
            <div className="w-full max-w-[580px] max-h-[92vh] my-3 sm:my-0 overflow-y-auto rounded-[28px] border border-[#E5E5E5] bg-white shadow-[0_28px_75px_rgba(17,24,39,0.24)]">
                <div className="relative px-6 sm:px-7 py-5 border-b border-[#ECECEC] bg-gradient-to-r from-[#FAF9F6] to-white">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 w-10 h-10 rounded-full border border-[#E5E5E5] bg-white text-[#737373] hover:text-[#1A1A1A] hover:border-[#D4D4D4] transition-colors flex items-center justify-center"
                        aria-label="Fermer"
                    >
                        <X size={18} />
                    </button>
                    <p className="text-[12px] uppercase tracking-[0.12em] font-bold text-[#737373]">Edition rapide</p>
                    <h2 className="text-[24px] font-bold text-[#1A1A1A] mt-1">Modifier la tache</h2>
                    <div
                        className="inline-flex items-center mt-3 px-3 py-1.5 rounded-full text-[12px] font-bold"
                        style={{ background: statusTone[status].bg, color: statusTone[status].text }}
                    >
                        {statusTone[status].label}
                    </div>
                </div>

                <div className="px-6 sm:px-7 py-5">
                    <div className="space-y-4">
                        <section className="rounded-2xl border border-[#ECECEC] bg-[#FAF9F6] p-4">
                            <label className="text-[13px] font-bold text-[#525252] uppercase tracking-wide mb-2 block">Titre</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={fieldClassName}
                            />
                        </section>

                        <section className="rounded-2xl border border-[#ECECEC] bg-[#FAF9F6] p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[13px] font-bold text-[#525252] uppercase tracking-wide mb-2 block">Priorite</label>
                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value as Task['priority'])}
                                        className={fieldClassName}
                                    >
                                        <option value="LOW">Faible</option>
                                        <option value="MEDIUM">Moyenne</option>
                                        <option value="HIGH">Haute</option>
                                        <option value="CRITICAL">Critique</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[13px] font-bold text-[#525252] uppercase tracking-wide mb-2 block">Statut</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value as Task['status'])}
                                        className={fieldClassName}
                                    >
                                        <option value="PENDING">A faire</option>
                                        <option value="IN_PROGRESS">En cours</option>
                                        <option value="COMPLETED">Terminee</option>
                                        <option value="CANCELED">Annulee</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-[#ECECEC] bg-[#FAF9F6] p-4">
                            <div className="flex items-center justify-between mb-2 gap-3">
                                <label className="text-[13px] font-bold text-[#525252] uppercase tracking-wide">Echeance</label>
                                {dueDate && (
                                    <button
                                        type="button"
                                        onClick={() => setDueDate('')}
                                        className="text-[13px] font-bold text-[#737373] hover:text-[#1A1A1A] transition-colors"
                                    >
                                        Effacer
                                    </button>
                                )}
                            </div>
                            <div className="rounded-2xl border border-[#E5E5E5] bg-white p-3.5">
                                <div className="flex items-center gap-2 text-[14px] font-bold text-[#404040] mb-3">
                                    <Calendar size={15} className="text-[#737373] shrink-0" />
                                    <span>{dueDate ? formatDuePreview(dueDate) : 'Aucune date definie'}</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    <div className="relative">
                                        <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
                                        <input
                                            type="date"
                                            value={dueDatePart}
                                            onChange={(e) => handleDateChange(e.target.value)}
                                            className="w-full h-11 pl-9 pr-3 rounded-xl border border-[#E5E5E5] bg-white text-[15px] font-medium text-[#1A1A1A] outline-none focus:border-[#737373] transition-colors"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Clock3 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
                                        <input
                                            type="time"
                                            value={dueTimePart}
                                            onChange={(e) => handleTimeChange(e.target.value)}
                                            className="w-full h-11 pl-9 pr-3 rounded-xl border border-[#E5E5E5] bg-white text-[15px] font-medium text-[#1A1A1A] outline-none focus:border-[#737373] transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-3">
                                    <button
                                        type="button"
                                        onClick={() => applyPresetDate(0)}
                                        className="px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-[#FAF9F6] text-[13px] font-bold text-[#404040] hover:bg-[#F3F4F6] transition-colors"
                                    >
                                        Aujourd'hui
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyPresetDate(1)}
                                        className="px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-[#FAF9F6] text-[13px] font-bold text-[#404040] hover:bg-[#F3F4F6] transition-colors"
                                    >
                                        Demain
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyPresetDate(7)}
                                        className="px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-[#FAF9F6] text-[13px] font-bold text-[#404040] hover:bg-[#F3F4F6] transition-colors"
                                    >
                                        +1 semaine
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-[#ECECEC] bg-[#FAF9F6] p-4">
                            <label className="text-[13px] font-bold text-[#525252] uppercase tracking-wide mb-2 block">Evenement lie</label>
                            <select
                                value={eventId}
                                onChange={(e) => setEventId(e.target.value)}
                                className={fieldClassName}
                            >
                                <option value="">Aucun evenement</option>
                                {events.map((event) => (
                                    <option key={event.id} value={event.id}>
                                        {formatEventLabel(event)}
                                    </option>
                                ))}
                            </select>
                            {events.length === 0 && (
                                <p className="text-[13px] text-[#737373] mt-2">
                                    Aucun evenement disponible pour le moment.
                                </p>
                            )}
                        </section>
                    </div>
                </div>

                <div className="px-6 sm:px-7 py-4 border-t border-[#ECECEC] bg-white">
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                        <button
                            onClick={() => {
                                if (confirm('Supprimer cette tache ?')) {
                                    onDelete(task.id);
                                    onClose();
                                }
                            }}
                            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] text-[14px] font-bold text-[#DC2626] hover:bg-[#FEE2E2] transition-colors w-full sm:w-auto"
                        >
                            Supprimer la tache
                        </button>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[15px] font-bold text-[#1A1A1A] bg-white hover:bg-[#FAF9F6] transition-colors w-full sm:w-auto"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-5 py-2.5 rounded-xl border border-[#1A1A1A] text-[15px] font-bold text-white bg-[#1A1A1A] hover:opacity-90 transition-opacity w-full sm:w-auto"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
