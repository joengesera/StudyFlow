import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
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
    <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-surface-container-lowest w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-2xl relative">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-3.5 h-3.5 rounded-full mt-1 shrink-0" style={{ background: courseColor ?? 'var(--color-on-surface)' }} />
          <div className="flex-1">
            {editing ? (
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="input input-bordered w-full h-12 text-base font-medium mb-2"
              />
            ) : (
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-1 leading-tight">{event.title}</h3>
            )}
            <span className={`px-2.5 py-1 rounded text-label-caps font-label-caps ${eventTypeBadge[event.type] ?? 'bg-surface-container-highest text-on-surface-variant'}`}>
              {eventTypeLabel[event.type] ?? event.type}
            </span>
          </div>
        </div>

        {editing ? (
          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as Event['type'] })}
                  className="input input-bordered w-full h-12 text-base"
                >
                  {Object.entries(eventTypeLabel).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">DÃ©but</label>
                <input
                  type="datetime-local"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className="input input-bordered w-full h-12 text-base"
                />
              </div>
              <div className="flex-1">
                <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Fin</label>
                <input
                  type="datetime-local"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  className="input input-bordered w-full h-12 text-base"
                />
              </div>
            </div>

            <div>
              <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Lieu</label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="ex: Amphi B"
                className="input input-bordered w-full h-12 text-base"
              />
            </div>

            <div>
              <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="input input-bordered w-full min-h-[80px] text-base p-3"
                rows={2}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-body-md font-body-md text-on-surface mt-2 mb-4 card card-padded">
            <div className="flex gap-3 items-start">
              <span className="material-symbols-outlined text-on-surface-variant mt-0.5 shrink-0">schedule</span>
              <div>
                <div className="font-medium">
                  {format(parseISO(event.startDate), 'EEEE d MMMM', { locale: fr })}
                </div>
                <div className="text-on-surface-variant">
                  {format(parseISO(event.startDate), 'HH:mm', { locale: fr })} â€“ {format(parseISO(event.endDate), 'HH:mm', { locale: fr })}
                </div>
              </div>
            </div>
            {event.location && (
              <div className="flex gap-3 items-center">
                <span className="material-symbols-outlined text-on-surface-variant shrink-0">location_on</span>
                <span>{event.location}</span>
              </div>
            )}
            {event.description && (
              <div className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-on-surface-variant mt-0.5 shrink-0">description</span>
                <span className="whitespace-pre-line text-on-surface-variant">{event.description}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-outline-variant">
          <button
            type="button"
            onClick={() => {
              if (confirm('Supprimer cet Ã©vÃ©nement ?')) {
                onDelete(event.id);
                onClose();
              }
            }}
            className="btn btn-text text-error"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
            Supprimer
          </button>
          <div className="flex gap-3">
            <button onClick={onClose} className="btn btn-outlined">
              Fermer
            </button>
            {editing ? (
              <button onClick={handleSave} className="btn btn-primary">
                Enregistrer
              </button>
            ) : (
              <button onClick={() => setEditing(true)} className="btn btn-primary">
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Modifier
              </button>
            )}
          </div>
      </div>
    </div>
  );
}