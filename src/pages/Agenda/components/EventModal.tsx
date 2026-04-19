import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock, FileText, MapPin } from 'lucide-react';
import type { Event } from '../../../types';
import { eventTypeBadge, eventTypeLabel } from '../agendaShared';

interface EventModalProps {
    event: Event;
    courseColor?: string;
    onClose: () => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, payload: Partial<Event>) => void;
}

export function EventModal({
    event,
    courseColor,
    onClose,
    onDelete,
    onUpdate,
}: EventModalProps) {
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
                                        <option key={key} value={key}>
                                            {label}
                                        </option>
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
                                <div className="font-bold">
                                    {format(parseISO(event.startDate), 'EEEE d MMMM', { locale: fr })}
                                </div>
                                <div className="text-[#737373]">
                                    {format(parseISO(event.startDate), 'HHhmm', { locale: fr })} – {format(parseISO(event.endDate), 'HHhmm', { locale: fr })}
                                </div>
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
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[15px] font-bold text-[#1A1A1A] hover:bg-gray-50 bg-white"
                        >
                            Fermer
                        </button>
                        {editing ? (
                            <button
                                onClick={handleSave}
                                className="px-5 py-2.5 rounded-xl border border-[#1A1A1A] bg-[#1A1A1A] text-white text-[15px] font-bold hover:opacity-90 transition-opacity"
                            >
                                Enregistrer
                            </button>
                        ) : (
                            <button
                                onClick={() => setEditing(true)}
                                className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[15px] font-bold text-[#1A1A1A] hover:bg-gray-50 bg-white shadow-sm"
                            >
                                Modifier
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
