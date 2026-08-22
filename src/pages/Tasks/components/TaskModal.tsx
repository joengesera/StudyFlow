import { addDays, format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useMemo, useState } from 'react';
import type { Event, Task } from '../../../types';

interface TaskModalProps {
  task: Task;
  events: Event[];
  onClose: () => void;
  onUpdate: (id: string, payload: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

const fieldClassName = 'input input-bordered w-full h-12 text-base';

const toLocalDateTimeInput = (value?: string | null) => {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}T${String(parsed.getHours()).padStart(2, '0')}:${String(parsed.getMinutes()).padStart(2, '0')}`;
};
const getLocalDatePart = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

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
    setDueDate(`${getLocalDatePart(nextDate)}T${dueTimePart}`);
  };

  const handleDateChange = (nextDatePart: string) => {
    if (!nextDatePart) { setDueDate(''); return; }
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
      completedAt: status === 'COMPLETED' ? (task.status === 'COMPLETED' ? task.completedAt : new Date().toISOString()) : null,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-surface-container-lowest w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-label-caps font-label-caps text-on-surface-variant mb-1">Édition rapide</p>
            <h2 className="text-headline-md font-headline-md text-on-surface">Modifier la tâche</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors" aria-label="Fermer">
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="space-y-5">
          <section className="card card-padded">
            <label className="text-label-sm font-label-sm text-on-surface-variant mb-2 block">Titre</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={fieldClassName} />
          </section>

          <section className="card card-padded">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Priorité</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value as Task['priority'])} className={fieldClassName}>
                  <option value="LOW">Faible</option>
                  <option value="MEDIUM">Moyenne</option>
                  <option value="HIGH">Haute</option>
                  <option value="CRITICAL">Critique</option>
                </select>
              </div>
              <div>
                <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Statut</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as Task['status'])} className={fieldClassName}>
                  <option value="PENDING">À faire</option>
                  <option value="IN_PROGRESS">En cours</option>
                  <option value="COMPLETED">Terminée</option>
                  <option value="CANCELED">Annulée</option>
                </select>
              </div>
            </div>
          </section>

          <section className="card card-padded">
            <div className="flex items-center justify-between mb-2">
              <label className="text-label-caps font-label-caps text-on-surface-variant">Échéance</label>
              {dueDate && (
                <button type="button" onClick={() => setDueDate('')} className="btn btn-text text-error text-label-sm">Effacer</button>
              )}
            </div>
            <div className="card card-padded">
              <div className="flex items-center gap-2 text-body-md font-body-md text-on-surface mb-3">
                <span className="material-symbols-outlined text-on-surface-variant">calendar_today</span>
                <span>{dueDate ? format(new Date(dueDate), 'EEEE d MMMM, HH:mm', { locale: fr }) : 'Aucune date définie'}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">calendar_today</span>
                  <input type="date" value={dueDatePart} onChange={(e) => handleDateChange(e.target.value)} className="input input-bordered w-full h-12 pl-9 pr-3 text-base" />
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">schedule</span>
                  <input type="time" value={dueTimePart} onChange={(e) => handleTimeChange(e.target.value)} className="input input-bordered w-full h-12 pl-9 pr-3 text-base" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <button type="button" onClick={() => applyPresetDate(0)} className="btn btn-outlined px-3 py-1.5 text-label-sm">Aujourd'hui</button>
                <button type="button" onClick={() => applyPresetDate(1)} className="btn btn-outlined px-3 py-1.5 text-label-sm">Demain</button>
                <button type="button" onClick={() => applyPresetDate(7)} className="btn btn-outlined px-3 py-1.5 text-label-sm">+1 semaine</button>
              </div>
            </div>
          </section>

          <section className="card card-padded">
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Événement lié</label>
            <select value={eventId} onChange={(e) => setEventId(e.target.value)} className={fieldClassName}>
              <option value="">Aucun événement</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>{event.title} — {new Date(event.startDate).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</option>
              ))}
            </select>
            {events.length === 0 && <p className="text-label-sm font-label-sm text-on-surface-variant mt-2">Aucun événement disponible</p>}
          </section>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2 border-t border-outline-variant">
          <button onClick={() => { if (confirm('Supprimer cette tâche ?')) { onDelete(task.id); onClose(); }}} className="btn btn-error w-full sm:w-auto">
            <span className="material-symbols-outlined text-[18px]">delete</span> Supprimer
          </button>
          <div className="flex gap-2 w-full sm:w-auto">
            <button onClick={onClose} className="btn btn-outlined flex-1">Annuler</button>
            <button onClick={handleSave} className="btn btn-primary flex-1">
              <span className="material-symbols-outlined text-[18px]">save</span> Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};