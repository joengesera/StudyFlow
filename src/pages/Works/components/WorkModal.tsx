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

const Chip = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-label-sm font-label-sm border transition-colors cursor-pointer ${
      active
        ? 'bg-primary text-on-primary border-primary'
        : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
    }`}
  >
    {children}
  </button>
);

const statusOptions: { value: WorkStatus; label: string; icon: string }[] = [
  { value: 'PLANNED', label: 'Planifié', icon: 'schedule' },
  { value: 'SUBMITTED', label: 'Soumis', icon: 'outgoing_mail' },
  { value: 'GRADED', label: 'Noté', icon: 'grade' },
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-surface-container-lowest w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-lg p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-headline-md font-headline-md text-on-surface">
            {work ? 'Modifier le travail' : 'Nouveau travail'}
          </h3>
          {work && (
            <button
              type="button"
              onClick={() => { if (confirm('Supprimer ce travail ?')) onDelete(work.id); }}
              className="btn btn-text text-error"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Cours</label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Choix du cours">
              {courses.map((course) => (
                <Chip
                  key={course.id}
                  active={form.courseId === course.id}
                  onClick={() => { setCourseMissing(false); setForm({ ...form, courseId: course.id }); }}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: course.color }} />
                  {course.name}
                </Chip>
              ))}
              {courses.length === 0 && (
                <p className="text-label-sm font-label-sm text-error">Créez d'abord un cours.</p>
              )}
            </div>
            {courseMissing && (
              <p className="text-label-sm font-label-sm text-error mt-2">Sélectionnez un cours pour continuer.</p>
            )}
          </div>

          <div>
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Titre</label>
            <input
              required
              placeholder="Titre du projet / devoir"
              className="input input-bordered w-full h-12 text-base"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Type de travail</label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Type de travail">
              {workTypeOptions.map((option) => (
                <Chip
                  key={option.value}
                  active={String(form.workTypeLabel || '').toUpperCase() === option.value}
                  onClick={() => setForm({ ...form, workTypeLabel: option.value, percentage: option.weightPercent ?? form.percentage })}
                >
                  {option.label}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Barème</label>
              <input
                type="number"
                required
                placeholder="Sur /20"
                className="input input-bordered w-full h-12 text-base"
                value={form.pointsPossible}
                onChange={(e) => setForm({ ...form, pointsPossible: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Échéance</label>
              <input
                type="date"
                className="input input-bordered w-full h-12 text-base"
                value={form.dueDate ? new Date(form.dueDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value ? new Date(e.target.value).toISOString() : '' })}
              />
            </div>
          </div>

          <div>
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Statut</label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Statut du travail">
              {statusOptions.map((option) => (
                <Chip
                  key={option.value}
                  active={form.status === option.value}
                  onClick={() => setForm({ ...form, status: option.value })}
                >
                  <span className="material-symbols-outlined text-[16px]">{option.icon}</span>
                  {option.label}
                </Chip>
              ))}
            </div>
          </div>

          {form.status === 'GRADED' && (
            <div className="card card-padded bg-primary/5 border-primary/20">
              <label className="text-label-caps font-label-caps text-primary mb-2 block">Note obtenue</label>
              <input
                type="number"
                step="any"
                placeholder="ex: 15"
                className="input input-bordered w-24 h-12 text-lg font-bold text-center text-primary"
                value={form.pointsEarned || ''}
                onChange={(e) => setForm({ ...form, pointsEarned: Number(e.target.value) })}
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
            <button type="button" onClick={onClose} className="btn btn-outlined">Annuler</button>
            <button type="submit" className="btn btn-primary">
              <span className="material-symbols-outlined text-[18px]">save</span> Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
