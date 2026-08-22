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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-surface-container-lowest w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-2xl">
        <h2 className="text-headline-md font-headline-md text-on-surface mb-6">Nouvel événement</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Titre</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="ex: Cours de Maths"
              required
              className="input input-bordered w-full h-12 text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
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
            <div>
              <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Cours lié</label>
              <select
                value={form.courseId}
                onChange={(e) => setForm({ ...form, courseId: e.target.value })}
                className="input input-bordered w-full h-12 text-base"
              >
                <option value="">Aucun</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Début</label>
              <input
                type="datetime-local"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                required
                className="input input-bordered w-full h-12 text-base"
              />
            </div>
            <div>
              <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Fin</label>
              <input
                type="datetime-local"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                required
                className="input input-bordered w-full h-12 text-base"
              />
            </div>
          </div>

          <div>
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Lieu (optionnel)</label>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="ex: Amphi B"
              className="input input-bordered w-full h-12 text-base"
            />
          </div>

          <div className="card card-padded">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20"
              />
              <span className="text-body-md font-body-md text-on-surface">Répéter toutes les semaines</span>
            </label>
            {isRecurring && (
              <div className="mt-4 pt-4 border-t border-outline-variant">
                <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Jusqu'au</label>
                <input
                  type="date"
                  value={recurrenceEndDate}
                  onChange={(e) => setRecurrenceEndDate(e.target.value)}
                  required={isRecurring}
                  className="input input-bordered w-[180px] h-12 text-base"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn btn-outlined">
              Annuler
            </button>
            <button type="submit" disabled={isLoading} className="btn btn-primary min-w-[120px]">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-sm" />
                  Création...
                </span>
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