import { Trash2, FileText, MapPin, FileEdit, Clock, X, Save } from 'lucide-react';
import { useState, type FormEvent } from 'react';
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

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-surface-container-lowest w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-label-caps font-label-caps text-on-surface-variant mb-1">
              {editing ? 'Modification' : 'Détails'}
            </p>
            <h2 className="text-headline-md font-headline-md text-on-surface">
              {editing ? 'Modifier l\'événement' : event.title}
            </h2>
            {!editing && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-3 h-3 rounded-full" style={{ background: courseColor ?? 'var(--color-on-surface)' }} />
                <span className={`px-2.5 py-1 rounded text-label-caps font-label-caps ${eventTypeBadge[event.type] ?? 'bg-surface-container-highest text-on-surface-variant'}`}>
                  {eventTypeLabel[event.type] ?? event.type}
                </span>
              </div>
            )}
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors" aria-label="Fermer">
            <X className="text-[22px]" />
          </button>
        </div>

        {editing ? (
          <form onSubmit={handleSave} className="space-y-5">
            <section className="card card-padded space-y-4">
              <div>
                <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">Titre</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="input input-bordered w-full h-12 text-base"
                />
              </div>
              <div>
                <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Type</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(eventTypeLabel).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setForm({ ...form, type: key as Event['type'] })}
                      className={`px-3 py-1.5 rounded-lg text-label-sm font-label-sm transition-colors ${
                        form.type === key
                          ? `${eventTypeBadge[key] ?? 'bg-primary/10 text-primary'} ring-1 ring-current`
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="card card-padded">
              <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 flex items-center gap-2">
                <Clock className="text-[14px]" /> Horaires
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">Début</label>
                  <input
                    type="datetime-local"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    required
                    className="input input-bordered w-full h-12 text-base"
                  />
                </div>
                <div>
                  <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">Fin</label>
                  <input
                    type="datetime-local"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    required
                    className="input input-bordered w-full h-12 text-base"
                  />
                </div>
              </div>
            </section>

            <section className="card card-padded space-y-4">
              <div>
                <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 flex items-center gap-1.5">
                  <MapPin className="text-[14px]" /> Lieu
                </label>
                <input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="ex: Amphi B"
                  className="input input-bordered w-full h-12 text-base"
                />
              </div>
              <div>
                <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 flex items-center gap-1.5">
                  <FileText className="text-[14px]" /> Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input input-bordered w-full min-h-[80px] text-base p-3"
                  rows={2}
                />
              </div>
            </section>

            <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
              <button type="button" onClick={() => { if (confirm('Supprimer cet événement ?')) { onDelete(event.id); onClose(); } }} className="btn btn-text text-error">
                <Trash2 className="text-[18px]" /> Supprimer
              </button>
              <div className="flex gap-3">
                <button type="button" onClick={() => setEditing(false)} className="btn btn-outlined">Annuler</button>
                <button type="submit" className="btn btn-primary">
                  <span className="flex items-center justify-center gap-2">
                    <Save className="text-[18px]" /> Enregistrer
                  </span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <>
            <div className="space-y-4 text-body-md font-body-md text-on-surface card card-padded">
              <div className="flex gap-3 items-start">
                <Clock className="text-on-surface-variant mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium">
                    {format(parseISO(event.startDate), 'EEEE d MMMM', { locale: fr })}
                  </div>
                  <div className="text-on-surface-variant">
                    {format(parseISO(event.startDate), 'HH:mm', { locale: fr })} – {format(parseISO(event.endDate), 'HH:mm', { locale: fr })}
                  </div>
                </div>
              </div>
              {event.location && (
                <div className="flex gap-3 items-center">
                  <MapPin className="text-on-surface-variant shrink-0" />
                  <span>{event.location}</span>
                </div>
              )}
              {event.description && (
                <div className="flex gap-3 items-start">
                  <FileText className="text-on-surface-variant mt-0.5 shrink-0" />
                  <span className="whitespace-pre-line text-on-surface-variant">{event.description}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-outline-variant">
              <button
                type="button"
                onClick={() => { if (confirm('Supprimer cet événement ?')) { onDelete(event.id); onClose(); } }}
                className="btn btn-text text-error"
              >
                <Trash2 className="text-[18px]" /> Supprimer
              </button>
              <div className="flex gap-3">
                <button onClick={onClose} className="btn btn-outlined">Fermer</button>
                <button onClick={() => setEditing(true)} className="btn btn-primary">
                  <span className="flex items-center justify-center gap-2">
                    <FileEdit className="text-[18px]" /> Modifier
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}