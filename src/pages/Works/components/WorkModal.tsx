import { Trash2, Clock, Send, Star, Save, X, CalendarDays } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useCourseWorkTypes } from '../../../hooks/useCourses';
import type { Course, Work, WorkStatus } from '../../../types';

interface WorkModalProps {
  work: Work | null;
  courses: Course[];
  onClose: () => void;
  onSave: (payload: Partial<Work>) => void;
  onDelete: (id: string) => void;
}

const defaultWorkForm = (courseId: string): Partial<Work> => ({
  title: '',
  courseId,
  status: 'PLANNED',
  pointsPossible: 20,
  workTypeLabel: 'PROJET',
  description: '',
  dueDate: '',
});

const statusOptions: { value: WorkStatus; label: string; icon: LucideIcon }[] = [
  { value: 'PLANNED', label: 'Planifié', icon: Clock },
  { value: 'SUBMITTED', label: 'Soumis', icon: Send },
  { value: 'GRADED', label: 'Noté', icon: Star },
];

export const WorkModal = ({ work, courses, onClose, onSave, onDelete }: WorkModalProps) => {
  const [form, setForm] = useState<Partial<Work>>(work || defaultWorkForm(courses[0]?.id || ''));
  const [courseMissing, setCourseMissing] = useState(false);
  const selectedCourseId = typeof form.courseId === 'string' ? form.courseId : undefined;
  const { data: configuredWorkTypes = [] } = useCourseWorkTypes(selectedCourseId);

  const workTypeOptions = useMemo(() => {
    if (configuredWorkTypes.length > 0) {
      return configuredWorkTypes.map((item) => ({
        value: item.type,
        label: `${item.type} (${item.weightPercent}%)`,
        weightPercent: item.weightPercent,
      }));
    }
    return [
      { value: 'EXAMEN', label: 'EXAMEN', weightPercent: null as number | null },
      { value: 'INTERRO', label: 'INTERRO', weightPercent: null as number | null },
      { value: 'TP', label: 'TP', weightPercent: null as number | null },
      { value: 'TD', label: 'TD', weightPercent: null as number | null },
      { value: 'PROJET', label: 'PROJET', weightPercent: null as number | null },
      { value: 'EXERCICES', label: 'EXERCICES', weightPercent: null as number | null },
    ];
  }, [configuredWorkTypes]);

  useEffect(() => {
    if (workTypeOptions.length === 0) return;
    setForm((prev) => {
      const normalized = String(prev.workTypeLabel || '').trim().toUpperCase();
      const exists = workTypeOptions.some((option) => option.value === normalized);
      if (exists) return prev;
      const first = workTypeOptions[0];
      return { ...prev, workTypeLabel: first.value, percentage: first.weightPercent ?? prev.percentage };
    });
  }, [workTypeOptions]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.courseId) {
      setCourseMissing(true);
      return;
    }
    const normalizedType = String(form.workTypeLabel || '').trim().toUpperCase();
    const selectedType = workTypeOptions.find((option) => option.value === normalizedType);
    onSave({ ...form, workTypeLabel: normalizedType || null, percentage: selectedType?.weightPercent ?? form.percentage });
  };

  const selectedCourse = courses.find((c) => c.id === form.courseId);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-surface-container-lowest w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-label-caps font-label-caps text-on-surface-variant mb-1">
              {work ? 'Modification' : 'Création'}
            </p>
            <h2 className="text-headline-md font-headline-md text-on-surface">
              {work ? 'Modifier le travail' : 'Nouveau travail'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors" aria-label="Fermer">
            <X className="text-[22px]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <section className="card card-padded">
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Cours</label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Choix du cours">
              {courses.map((course) => (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => { setCourseMissing(false); setForm({ ...form, courseId: course.id }); }}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-label-sm font-label-sm border transition-colors cursor-pointer ${
                    form.courseId === course.id
                      ? 'bg-primary text-on-primary border-primary'
                      : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: course.color }} />
                  {course.name}
                </button>
              ))}
              {courses.length === 0 && (
                <p className="text-label-sm font-label-sm text-error">Créez d'abord un cours.</p>
              )}
            </div>
            {courseMissing && (
              <p className="text-label-sm font-label-sm text-error mt-2">Sélectionnez un cours pour continuer.</p>
            )}
          </section>

          <section className="card card-padded space-y-4">
            <div>
              <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">Titre</label>
              <input
                required
                placeholder="ex: Rapport de projet"
                className="input input-bordered w-full h-12 text-base"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Type de travail</label>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Type de travail">
                {workTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setForm({ ...form, workTypeLabel: option.value, percentage: option.weightPercent ?? form.percentage })}
                    className={`px-3.5 py-2 rounded-lg text-label-sm font-label-sm border transition-colors ${
                      String(form.workTypeLabel || '').toUpperCase() === option.value
                        ? 'bg-primary text-on-primary border-primary'
                        : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="card card-padded">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">Barème</label>
                <input
                  type="number"
                  required
                  placeholder="Sur 20"
                  className="input input-bordered w-full h-12 text-base"
                  value={form.pointsPossible}
                  onChange={(e) => setForm({ ...form, pointsPossible: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 flex items-center gap-1.5">
                  <CalendarDays className="text-[14px]" /> Échéance
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full h-12 text-base"
                  value={form.dueDate ? new Date(form.dueDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value ? new Date(e.target.value).toISOString() : '' })}
                />
              </div>
            </div>
          </section>

          <section className="card card-padded">
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Statut</label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Statut du travail">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setForm({ ...form, status: option.value })}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-label-sm font-label-sm border transition-colors ${
                    form.status === option.value
                      ? 'bg-primary text-on-primary border-primary'
                      : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                  }`}
                >
                  <option.icon className="text-[16px]" />
                  {option.label}
                </button>
              ))}
            </div>

            {form.status === 'GRADED' && (
              <div className="mt-4 pt-4 border-t border-outline-variant">
                <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">Note obtenue</label>
                <input
                  type="number"
                  step="any"
                  placeholder="ex: 15"
                  className="input input-bordered w-32 h-12 text-base font-bold"
                  value={form.pointsEarned || ''}
                  onChange={(e) => setForm({ ...form, pointsEarned: Number(e.target.value) })}
                />
                {selectedCourse && (
                  <div className="text-label-sm font-label-sm text-on-surface-variant mt-2">
                    {form.pointsEarned || 0} / {form.pointsPossible} · {selectedCourse.name}
                  </div>
                )}
              </div>
            )}
          </section>

          <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
            {work ? (
              <button
                type="button"
                onClick={() => { if (confirm('Supprimer ce travail ?')) onDelete(work.id); }}
                className="btn btn-text text-error"
              >
                <Trash2 className="text-[18px]" /> Supprimer
              </button>
            ) : (
              <div />
            )}
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="btn btn-outlined">Annuler</button>
              <button type="submit" className="btn btn-primary min-w-[140px]">
                <span className="flex items-center justify-center gap-2">
                  <Save className="text-[18px]" /> Enregistrer
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};