import React, { useEffect, useRef, useState } from 'react';
import { addDays, startOfWeek } from 'date-fns';
import { Clock, Trash2, Plus, Save, X } from 'lucide-react';
import { useCreateCourse, useUpdateCourse, useDeleteCourse, useCourses } from '../../hooks/useCourses';
import { useCreateEvent } from '../../hooks/useEvents';
import type { Course, EventType } from '../../types';
import { generateCourseCode, generateRandomCourseColor } from '../../utils/courseMeta';

const WEEK_DAYS = [
  { label: 'Lun', value: 1 },
  { label: 'Mar', value: 2 },
  { label: 'Mer', value: 3 },
  { label: 'Jeu', value: 4 },
  { label: 'Ven', value: 5 },
  { label: 'Sam', value: 6 },
];

const SLOT_TYPES = ['CM', 'TD', 'TP'];

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

interface CourseFormModalProps {
  course?: Course | null;
  onClose: () => void;
}

function TimeField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">{label}</label>
      <div className="relative">
        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input input-bordered w-full h-12 pl-9 pr-3 text-base"
        />
      </div>
    </div>
  );
}

export default function CourseFormModal({ course, onClose }: CourseFormModalProps) {
  const isEditMode = !!course;
  const { mutateAsync: createCourse, isPending: isCreatingCourse } = useCreateCourse();
  const { mutateAsync: updateCourse, isPending: isUpdatingCourse } = useUpdateCourse();
  const { mutate: deleteCourse } = useDeleteCourse();
  const { mutateAsync: createEvent } = useCreateEvent();
  const { data: existingCourses = [] } = useCourses();

  const [form, setForm] = useState(() => ({
    name: course?.name || '',
    code: course?.code || '',
    credits: course?.credits || 3,
    color: course?.color || generateRandomCourseColor(existingCourses.map((c) => c.color)),
  }));
  const codeTouchedRef = useRef(isEditMode);

  const [addToSchedule, setAddToSchedule] = useState(false);
  const [sessionType, setSessionType] = useState<'CM' | 'TD' | 'TP'>('CM');
  const [selectedDays, setSelectedDays] = useState<number[]>([1]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: crypto.randomUUID(), startTime: '08:00', endTime: '10:00' },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === 'name' && !codeTouchedRef.current) {
        return { ...prev, name: value, code: generateCourseCode(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    codeTouchedRef.current = true;
    setForm((prev) => ({ ...prev, code: e.target.value }));
  };

  const handleAddSlot = () => {
    setTimeSlots((prev) => [...prev, { id: crypto.randomUUID(), startTime: '09:00', endTime: '10:00' }]);
  };

  const handleUpdateSlot = (id: string, field: 'startTime' | 'endTime', value: string) => {
    setTimeSlots((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleToggleDay = (dayValue: number) => {
    setSelectedDays((prev) => (prev.includes(dayValue) ? prev.filter((d) => d !== dayValue) : [...prev, dayValue]));
  };

  const handleDeleteSlot = (id: string) => {
    setTimeSlots((prev) => (prev.length > 1 ? prev.filter((s) => s.id !== id) : prev));
  };

  const getPreviewEvents = () => {
    const previews: { day: number; str: string }[] = [];
    timeSlots.forEach((slot) => {
      selectedDays.forEach((day) => {
        const dayLabel = WEEK_DAYS.find((d) => d.value === day)?.label;
        const formatTime = (t: string) => t.replace(':', 'h').replace('h00', 'h');
        previews.push({ day, str: `${dayLabel} ${formatTime(slot.startTime)}–${formatTime(slot.endTime)} (${sessionType})` });
      });
    });
    previews.sort((a, b) => a.day - b.day);
    return previews;
  };

  const previewItems = getPreviewEvents();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      let courseId = course?.id;

      if (isEditMode && courseId) {
        await updateCourse({ id: courseId, payload: { ...form, credits: Number(form.credits) } });
      } else {
        const newCourse = await createCourse({ ...form, credits: Number(form.credits) });
        courseId = newCourse.id;

        if (addToSchedule && timeSlots.length > 0) {
          const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
          const eventPromises: Promise<unknown>[] = [];

          for (const slot of timeSlots) {
            for (const dayValue of selectedDays) {
              const targetDate = addDays(startDate, dayValue - 1);
              const [startH, startM] = slot.startTime.split(':');
              const [endH, endM] = slot.endTime.split(':');

              const start = new Date(targetDate);
              start.setHours(Number(startH), Number(startM), 0, 0);

              const end = new Date(targetDate);
              end.setHours(Number(endH), Number(endM), 0, 0);

              let eventType: EventType = 'CLASS';
              if (sessionType === 'TP') eventType = 'TP';

              eventPromises.push(
                createEvent({
                  courseId,
                  title: `${form.name} - ${sessionType}`,
                  type: eventType,
                  startDate: start.toISOString(),
                  endDate: end.toISOString(),
                  isAllDay: false,
                }),
              );
            }
          }
          await Promise.allSettled(eventPromises);
        }
      }
      onClose();
    } catch (error) {
      console.error('Erreur lors de la soumission du cours:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm modal-backdrop" onClick={onClose}>
      <div
        className="bg-surface-container-lowest w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-2xl modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={isEditMode ? "Modifier le cours" : "Nouveau cours"}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-label-caps font-label-caps text-on-surface-variant mb-1">
              {isEditMode ? 'Modification' : 'Création'}
            </p>
            <h2 className="text-headline-md font-headline-md text-on-surface">
              {isEditMode ? 'Modifier le cours' : 'Nouveau cours'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors" aria-label="Fermer">
            <X className="text-[22px]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <section className="field-section space-y-4">
            <div>
              <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">Nom du cours</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="ex: Algorithmique" required autoFocus className="input input-bordered w-full h-12 text-base" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">Code</label>
                <input name="code" value={form.code} onChange={handleCodeChange} placeholder="algo-101" className="input input-bordered w-full h-12 text-base" />
              </div>
              <div>
                <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">Crédits</label>
                <input name="credits" type="number" min={1} max={10} value={form.credits} onChange={handleChange} className="input input-bordered w-full h-12 text-base" />
              </div>
            </div>
          </section>

          {!isEditMode && (
            <section className="field-section">
              <label className="flex items-center gap-3 cursor-pointer">
                <button
                  type="button"
                  role="switch"
                  aria-checked={addToSchedule}
                  onClick={() => setAddToSchedule((prev) => !prev)}
                  className={`relative w-[42px] h-6 rounded-full transition-colors shrink-0 ${addToSchedule ? 'bg-primary' : 'bg-surface-container-highest'}`}
                >
                  <span className={`absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-white transition-transform ${addToSchedule ? 'translate-x-[18px]' : ''}`} />
                </button>
                <div>
                  <span className="text-body-md font-body-md text-on-surface">Ajouter à l'emploi du temps</span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant block">Crée les créneaux dans l'agenda de la semaine</span>
                </div>
              </label>

              {addToSchedule && (
                <div className="mt-4 pt-4 border-t border-outline-variant space-y-4">
                  <div>
                    <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Type de session</label>
                    <div className="flex gap-2">
                      {SLOT_TYPES.map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setSessionType(st as 'CM' | 'TD' | 'TP')}
                          className={`px-4 py-2 rounded-lg text-label-sm font-label-sm transition-colors ${
                            sessionType === st ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Jours</label>
                    <div className="flex flex-wrap gap-2">
                      {WEEK_DAYS.map((day) => {
                        const isActive = selectedDays.includes(day.value);
                        return (
                          <button
                            key={day.value}
                            type="button"
                            onClick={() => handleToggleDay(day.value)}
                            className={`px-4 py-2 rounded-lg text-label-sm font-label-sm transition-colors ${
                              isActive ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest'
                            }`}
                          >
                            {day.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Horaires</label>
                    <div className="space-y-3">
                      {timeSlots.map((slot, index) => (
                        <div key={slot.id} className="bg-surface-container-low border border-outline-variant rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-label-sm font-label-sm text-on-surface-variant">Créneau {index + 1}</span>
                            {timeSlots.length > 1 && (
                              <button type="button" onClick={() => handleDeleteSlot(slot.id)} className="p-1 rounded-full hover:bg-surface-container-highest text-on-surface-variant hover:text-error transition-colors" aria-label="Supprimer">
                                <Trash2 className="text-[16px]" />
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <TimeField label="Début" value={slot.startTime} onChange={(v) => handleUpdateSlot(slot.id, 'startTime', v)} />
                            <TimeField label="Fin" value={slot.endTime} onChange={(v) => handleUpdateSlot(slot.id, 'endTime', v)} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button type="button" onClick={handleAddSlot} className="mt-3 flex items-center gap-2 text-label-sm font-label-sm text-primary hover:text-primary/80 transition-colors">
                      <Plus className="text-[16px]" /> Ajouter un créneau
                    </button>
                  </div>

                  {previewItems.length > 0 && (
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                      <div className="text-label-sm font-label-sm text-on-surface-variant mb-2">Aperçu — événements générés</div>
                      <div className="flex flex-wrap gap-2">
                        {previewItems.map((item, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-label-sm font-label-sm font-medium">
                            {item.str}
                          </span>
                        ))}
                      </div>
                      <div className="text-label-sm font-label-sm text-on-surface-variant mt-2">Une seule fois (semaine en cours)</div>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
            {isEditMode ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Supprimer le cours "${course?.name}" ? Toutes les données associées seront perdues.`)) {
                    deleteCourse(course!.id);
                    onClose();
                  }
                }}
                className="btn btn-text text-error"
              >
                <Trash2 className="text-[18px]" /> Supprimer
              </button>
            ) : (
              <div />
            )}
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="btn btn-outlined">
                Annuler
              </button>
              <button type="submit" disabled={isSubmitting || isCreatingCourse || isUpdatingCourse} className="btn btn-primary min-w-[140px]">
                {isSubmitting || isCreatingCourse || isUpdatingCourse ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm" />
                    {isEditMode ? 'Enregistrement...' : 'Création...'}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Save className="text-[18px]" />
                    {isEditMode ? 'Enregistrer' : 'Créer le cours'}
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}