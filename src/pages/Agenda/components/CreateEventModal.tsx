import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { addDays, addMinutes, addMonths, addWeeks, format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarDays, Clock, MapPin, Repeat2, Save, X } from 'lucide-react';
import type { Event } from '../../../types';
import { eventTypeBadge, eventTypeLabel, type AgendaCourse } from '../agendaShared';

interface CreateEventModalProps {
  defaultDate: Date;
  courses: AgendaCourse[];
  onClose: () => void;
  onCreate: (payloads: Partial<Event>[]) => void;
  isLoading: boolean;
}

type RecurrenceFrequency = 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';

const frequencyLabels: Record<RecurrenceFrequency, string> = {
  DAILY: 'Tous les jours',
  WEEKLY: 'Toutes les semaines',
  BIWEEKLY: 'Toutes les 2 semaines',
  MONTHLY: 'Tous les mois',
};

const durationPresets = [
  { label: '1 h', minutes: 60 },
  { label: '1 h 30', minutes: 90 },
  { label: '2 h', minutes: 120 },
  { label: '3 h', minutes: 180 },
];

const maxOccurrences = 60;

const toLocalInput = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes(),
  ).padStart(2, '0')}`;

const datePartOf = (value: string) => value.slice(0, 10);
const timePartOf = (value: string) => value.slice(11, 16);

export function CreateEventModal({
  defaultDate,
  courses,
  onClose,
  onCreate,
  isLoading,
}: CreateEventModalProps) {
  const defaultEnd = new Date(defaultDate.getTime() + 60 * 60 * 1000);
  const [form, setForm] = useState({
    title: '',
    type: 'CLASS' as Event['type'],
    startDate: toLocalInput(defaultDate),
    endDate: toLocalInput(defaultEnd),
    location: '',
    courseId: '',
  });
  const [isAllDay, setIsAllDay] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState<RecurrenceFrequency>('WEEKLY');
  const [recurrenceEndDate, setRecurrenceEndDate] = useState(
    format(addMonths(defaultDate, 1), 'yyyy-MM-dd'),
  );
  const [error, setError] = useState<string | null>(null);

  const durationMinutes = useMemo(() => {
    const diff =
      new Date(form.endDate).getTime() - new Date(form.startDate).getTime();
    return Math.max(Math.round(diff / 60000), 0);
  }, [form.startDate, form.endDate]);

  const selectedCourse = courses.find((course) => course.id === form.courseId);

  const patch = (partial: Partial<typeof form>) =>
    setForm((current) => ({ ...current, ...partial }));

  const handleStartChange = (nextDatePart: string, nextTimePart: string) => {
    if (!nextDatePart || !nextTimePart) return;
    const nextStart = new Date(`${nextDatePart}T${nextTimePart}`);
    if (Number.isNaN(nextStart.getTime())) return;
    const currentDuration = durationMinutes || 60;
    patch({
      startDate: toLocalInput(nextStart),
      endDate:
        nextStart.getTime() >= new Date(form.endDate).getTime()
          ? toLocalInput(addMinutes(nextStart, currentDuration))
          : form.endDate,
    });
    setError(null);
  };

  const handleEndChange = (nextDatePart: string, nextTimePart: string) => {
    if (!nextDatePart || !nextTimePart) return;
    const nextEnd = new Date(`${nextDatePart}T${nextTimePart}`);
    if (Number.isNaN(nextEnd.getTime())) return;
    patch({ endDate: toLocalInput(nextEnd) });
    setError(null);
  };

  const applyDurationPreset = (minutes: number) => {
    const nextEnd = addMinutes(new Date(form.startDate), minutes);
    patch({ endDate: toLocalInput(nextEnd) });
    setError(null);
  };

  const toggleAllDay = () => {
    const willBeAllDay = !isAllDay;
    setIsAllDay(willBeAllDay);
    if (!willBeAllDay) {
      const start = new Date(form.startDate);
      const end = new Date(form.endDate);
      if (start.getTime() >= end.getTime()) {
        patch({ endDate: toLocalInput(addMinutes(start, Math.max(durationMinutes, 60))) });
      }
    }
  };

  const buildPayloads = (): Partial<Event>[] => {
    const baseStart = new Date(form.startDate);
    const baseEnd = new Date(form.endDate);

    const startDate = isAllDay
      ? new Date(`${datePartOf(form.startDate)}T00:00:00`)
      : baseStart;
    const endDate = isAllDay
      ? new Date(`${datePartOf(form.startDate)}T23:59:59`)
      : baseEnd;

    const payloads: Partial<Event>[] = [
      {
        title: form.title.trim(),
        type: form.type,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        location: form.location.trim() || undefined,
        courseId: form.courseId || undefined,
        isAllDay,
      },
    ];

    if (isRecurring && recurrenceEndDate) {
      const endRecurrence = new Date(`${recurrenceEndDate}T23:59:59.999`);
      let cursor = { start: startDate, end: endDate };

      while (payloads.length < maxOccurrences) {
        cursor =
          frequency === 'DAILY'
            ? { start: addDays(cursor.start, 1), end: addDays(cursor.end, 1) }
            : frequency === 'WEEKLY'
              ? { start: addWeeks(cursor.start, 1), end: addWeeks(cursor.end, 1) }
              : frequency === 'BIWEEKLY'
                ? { start: addWeeks(cursor.start, 2), end: addWeeks(cursor.end, 2) }
                : { start: addMonths(cursor.start, 1), end: addMonths(cursor.end, 1) };

        if (cursor.start.getTime() > endRecurrence.getTime()) break;
        payloads.push({
          title: form.title.trim(),
          type: form.type,
          startDate: cursor.start.toISOString(),
          endDate: cursor.end.toISOString(),
          location: form.location.trim() || undefined,
          courseId: form.courseId || undefined,
          isAllDay,
        });
      }
    }

    return payloads;
  };

  const payloads = useMemo(buildPayloads, [
    form.title,
    form.type,
    form.startDate,
    form.endDate,
    form.location,
    form.courseId,
    isAllDay,
    isRecurring,
    frequency,
    recurrenceEndDate,
  ]);

  const firstOccurrence = payloads[0];
  const firstLabel = firstOccurrence
    ? format(new Date(firstOccurrence.startDate as string), 'EEEE d MMMM yyyy', { locale: fr })
    : '';
  const timeRange =
    firstOccurrence && !isAllDay
      ? `${format(new Date(firstOccurrence.startDate as string), 'HH:mm')} – ${format(
          new Date(firstOccurrence.endDate as string),
          'HH:mm',
        )}`
      : '';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRecurring && !recurrenceEndDate) {
      setError('Choisissez une date de fin de répétition.');
      return;
    }
    if (!isAllDay && durationMinutes <= 0) {
      setError('La fin doit être après le début.');
      return;
    }
    if (payloads.length === 0) {
      setError("Aucun événement n'a pu être planifié. Vérifiez les dates.");
      return;
    }

    onCreate(payloads);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm modal-backdrop"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-2xl modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Ajouter un événement"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-label-caps font-label-caps text-on-surface-variant mb-1">
              Planning
            </p>
            <h2 className="text-headline-md font-headline-md text-on-surface">
              Ajouter un événement
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="Fermer"
          >
            <X className="text-[22px]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <section className="field-section">
            <label className="text-label-sm font-label-sm text-on-surface-variant mb-2 block">
              Titre
            </label>
            <input
              value={form.title}
              onChange={(e) => patch({ title: e.target.value })}
              placeholder="ex: Cours de Maths"
              required
              autoFocus
              className="input input-bordered w-full h-12 text-base"
            />
          </section>

          <section className="field-section space-y-4">
            <div>
              <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">
                Type
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(eventTypeLabel).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => patch({ type: key as Event['type'] })}
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

            <div>
              <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">
                Cours lié <span className="text-on-surface-variant/60">(optionnel)</span>
              </label>
              <div className="relative">
                {selectedCourse && (
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-outline-variant"
                    style={{ background: selectedCourse.color }}
                  />
                )}
                <select
                  value={form.courseId}
                  onChange={(e) => patch({ courseId: e.target.value })}
                  className={`input input-bordered w-full h-12 text-base ${selectedCourse ? 'pl-9' : ''}`}
                >
                  <option value="">Aucun</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              {courses.length === 0 && (
                <p className="text-label-sm font-label-sm text-on-surface-variant mt-2">
                  Aucun cours disponible
                </p>
              )}
            </div>
          </section>

          <section className="field-section">
            <div className="flex items-center justify-between mb-3">
              <label className="text-label-caps font-label-caps text-on-surface-variant">
                {isAllDay ? 'Date' : 'Horaires'}
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <span className="text-label-sm font-label-sm text-on-surface-variant">
                  Toute la journée
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isAllDay}
                  onClick={toggleAllDay}
                  className={`relative w-[42px] h-6 rounded-full transition-colors ${
                    isAllDay ? 'bg-primary' : 'bg-surface-container-highest'
                  }`}
                >
                  <span
                    className={`absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-white transition-transform ${
                      isAllDay ? 'translate-x-[18px]' : ''
                    }`}
                  />
                </button>
              </label>
            </div>

            {isAllDay ? (
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="date"
                  value={datePartOf(form.startDate)}
                  onChange={(e) => {
                    if (e.target.value) {
                      handleStartChange(e.target.value, timePartOf(form.startDate));
                    }
                  }}
                  required
                  className="input input-bordered w-full h-12 pl-9 pr-3 text-base"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 items-end mb-3">
                <div>
                  <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">
                    Début
                  </label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                    <input
                      type="date"
                      value={datePartOf(form.startDate)}
                      onChange={(e) =>
                        handleStartChange(e.target.value, timePartOf(form.startDate))
                      }
                      className="input input-bordered w-full h-12 pl-9 pr-3 text-base"
                    />
                  </div>
                  <div className="relative mt-2">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                    <input
                      type="time"
                      value={timePartOf(form.startDate)}
                      onChange={(e) =>
                        handleStartChange(datePartOf(form.startDate), e.target.value)
                      }
                      className="input input-bordered w-full h-12 pl-9 pr-3 text-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">
                    Fin
                  </label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                    <input
                      type="date"
                      value={datePartOf(form.endDate)}
                      onChange={(e) =>
                        handleEndChange(e.target.value, timePartOf(form.endDate))
                      }
                      className="input input-bordered w-full h-12 pl-9 pr-3 text-base"
                    />
                  </div>
                  <div className="relative mt-2">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                    <input
                      type="time"
                      value={timePartOf(form.endDate)}
                      onChange={(e) =>
                        handleEndChange(datePartOf(form.endDate), e.target.value)
                      }
                      className="input input-bordered w-full h-12 pl-9 pr-3 text-base"
                    />
                  </div>
                </div>
              </div>
            )}

            {!isAllDay && (
              <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-outline-variant">
                <span className="text-label-sm font-label-sm text-on-surface-variant">
                  Durée :
                </span>
                {durationPresets.map((preset) => {
                  const active = durationMinutes === preset.minutes;
                  return (
                    <button
                      key={preset.minutes}
                      type="button"
                      onClick={() => applyDurationPreset(preset.minutes)}
                      className={`px-3 py-1.5 rounded-lg text-label-sm font-label-sm transition-colors ${
                        active
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <section className="field-section">
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">
              Lieu <span className="text-on-surface-variant/60">(optionnel)</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                value={form.location}
                onChange={(e) => patch({ location: e.target.value })}
                placeholder="ex: Amphi B"
                className="input input-bordered w-full h-12 pl-9 pr-3 text-base"
              />
            </div>
          </section>

          <section className="field-section">
            <label className="flex items-center gap-3 cursor-pointer">
              <button
                type="button"
                role="switch"
                aria-checked={isRecurring}
                onClick={() => setIsRecurring((current) => !current)}
                className={`relative w-[42px] h-6 rounded-full transition-colors shrink-0 ${
                  isRecurring ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <span
                  className={`absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-white transition-transform ${
                    isRecurring ? 'translate-x-[18px]' : ''
                  }`}
                />
              </button>
              <span className="text-body-md font-body-md text-on-surface">
                Événement récurrent
              </span>
            </label>

            {isRecurring && (
              <div className="mt-4 pt-4 border-t border-outline-variant grid grid-cols-2 gap-4">
                <div>
                  <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">
                    Fréquence
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as RecurrenceFrequency)}
                    className="input input-bordered w-full h-12 text-base"
                  >
                    {Object.entries(frequencyLabels).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">
                    Jusqu'au
                  </label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                    <input
                      type="date"
                      value={recurrenceEndDate}
                      onChange={(e) => {
                        setRecurrenceEndDate(e.target.value);
                        setError(null);
                      }}
                      required
                      className="input input-bordered w-full h-12 pl-9 pr-3 text-base"
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {firstOccurrence && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-2">
              <div className="flex items-center gap-3">
                <CalendarDays className="text-primary shrink-0" />
                <div>
                  <div className="text-body-md font-body-md text-on-surface capitalize">
                    {firstLabel}
                  </div>
                  {timeRange && (
                    <div className="text-label-sm font-label-sm text-on-surface-variant">
                      {timeRange}
                    </div>
                  )}
                </div>
              </div>
              {form.location.trim() && (
                <div className="flex items-center gap-3 text-label-sm font-label-sm text-on-surface-variant">
                  <MapPin className="text-primary/70 shrink-0" />
                  {form.location.trim()}
                </div>
              )}
              {selectedCourse && (
                <div className="flex items-center gap-3 text-label-sm font-label-sm text-on-surface-variant">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: selectedCourse.color }}
                  />
                  {selectedCourse.name}
                </div>
              )}
              {isRecurring && payloads.length > 1 && (
                <div className="flex items-center gap-3 text-label-sm font-label-sm text-primary">
                  <Repeat2 className="shrink-0" />
                  {payloads.length} événements · {frequencyLabels[frequency]}
                </div>
              )}
            </div>
          )}

          {error && (
            <p className="text-label-sm font-label-sm text-error" role="alert">
              {error}
            </p>
          )}

          <div className="flex gap-3 justify-end pt-2 border-t border-outline-variant">
            <button type="button" onClick={onClose} className="btn btn-outlined">
              Annuler
            </button>
            <button type="submit" disabled={isLoading} className="btn btn-primary min-w-[140px]">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-sm" />
                  Création...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Save className="text-[18px]" />
                  Créer
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}