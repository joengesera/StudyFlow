import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useCourses } from '../../../hooks/useCourses';
import { useCreateTask } from '../../../hooks/useTasks';
import { useCreateEvent } from '../../../hooks/useEvents';
import type { CourseRef } from '../../../utils/courseMeta';
import { parseSmartInput } from '../taskShared';

const priorityLabels: Record<string, string> = {
  LOW: 'Faible',
  MEDIUM: 'Moyenne',
  HIGH: 'Haute',
  CRITICAL: 'Critique',
};

export function SmartTaskInput() {
  const [text, setText] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const { data: courses = [] } = useCourses();
  const { mutateAsync: createTaskAsync, isPending: isCreatingTask } = useCreateTask();
  const { mutateAsync: createEventAsync, isPending: isCreatingEvent } = useCreateEvent();

  const courseRefs: CourseRef[] = useMemo(
    () => courses.filter((c) => !c.isDeleted).map((c) => ({ id: c.id, name: c.name, code: c.code, color: c.color })),
    [courses],
  );

  const parsed = useMemo(
    () => (text.trim().length >= 2 ? parseSmartInput(text, courseRefs) : null),
    [text, courseRefs],
  );

  const matches = parsed?.matchedCourses ?? [];
  const needsDisambiguation = matches.length > 1 && !selectedCourseId;
  const resolvedCourse =
    matches.length === 1 ? matches[0] : matches.find((c) => c.id === selectedCourseId) ?? null;

  const isPending = isCreatingTask || isCreatingEvent;
  const canSubmit = Boolean(parsed) && !needsDisambiguation && !isPending;

  const handleSubmit = async () => {
    if (!parsed || !canSubmit) return;
    try {
      if (parsed.type === 'EVENT') {
        await createEventAsync({
          title: parsed.title,
          type: 'CLASS',
          startDate: parsed.dueDate ?? new Date().toISOString(),
          endDate: parsed.endDate ?? parsed.dueDate ?? new Date().toISOString(),
          isAllDay: !parsed.dueDate,
          courseId: resolvedCourse?.id ?? null,
        });
      } else {
        await createTaskAsync({
          title: parsed.title,
          status: 'PENDING',
          priority: parsed.priority,
          dueDate: parsed.dueDate,
          courseId: resolvedCourse?.id ?? null,
        });
      }
      setText('');
      setSelectedCourseId(null);
    } catch (error) {
      console.error('Erreur lors de la création via saisie intelligente:', error);
    }
  };

  return (
    <div className="card card-padded">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-on-surface-variant">auto_awesome</span>
        <input
          value={text}
          onChange={(e) => { setText(e.target.value); setSelectedCourseId(null); }}
          onKeyDown={(e) => { if (e.key === 'Enter') void handleSubmit(); }}
          placeholder="Saisie intelligente — ex : « math ana révision chapitre 3 vendredi urgent »"
          aria-label="Saisie intelligente de tâche"
          className="flex-1 h-10 bg-transparent outline-none text-body-lg font-body-lg text-on-surface placeholder:text-outline"
        />
        {canSubmit && (
          <button onClick={() => void handleSubmit()} className="btn btn-primary px-4 py-2 text-label-sm shrink-0">
            <span className="material-symbols-outlined text-[16px]">add</span>
            {parsed?.type === 'EVENT' ? 'Événement' : 'Tâche'}
          </button>
        )}
      </div>

      {parsed && (
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-outline-variant">
          <span className="px-2 py-1 rounded-full bg-surface-container text-label-caps font-label-caps text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">{parsed.type === 'EVENT' ? 'event' : 'task_alt'}</span>
            {parsed.type === 'EVENT' ? 'Événement' : 'Tâche'}
          </span>
          <span className={`px-2 py-1 rounded-full text-label-caps font-label-caps ${parsed.priority === 'MEDIUM' || parsed.priority === 'LOW' ? 'bg-surface-container text-on-surface-variant' : 'bg-error/10 text-error'}`}>
            {priorityLabels[parsed.priority]}
          </span>
          {parsed.dueDate && (
            <span className="px-2 py-1 rounded-full bg-surface-container text-label-caps font-label-caps text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              {format(new Date(parsed.dueDate), 'EEE d MMM HH:mm', { locale: fr })}
            </span>
          )}

          {matches.length === 1 && (
            <span
              className="px-2 py-1 rounded-full text-label-caps font-label-caps flex items-center gap-1.5 border"
              style={{ borderColor: matches[0].color }}
              title="Cours détecté automatiquement"
            >
              <span className="w-2 h-2 rounded-full" style={{ background: matches[0].color }} />
              {matches[0].code}
            </span>
          )}

          {matches.length === 0 && text.trim().length >= 2 && (
            <span className="text-label-sm font-label-sm text-outline">Aucun cours reconnu</span>
          )}
        </div>
      )}

      {needsDisambiguation && (
        <div className="mt-3 pt-3 border-t border-outline-variant">
          <p className="text-label-sm font-label-sm text-on-surface-variant mb-2">
            Plusieurs cours correspondent — lequel ?
          </p>
          <div className="flex flex-wrap gap-2">
            {matches.map((course) => (
              <button
                key={course.id}
                type="button"
                onClick={() => setSelectedCourseId(course.id)}
                className="px-3 py-1.5 rounded-full border text-label-sm font-label-sm transition-colors hover:bg-surface-container flex items-center gap-2"
                style={{ borderColor: course.color }}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: course.color }} />
                <span className="font-semibold">{course.code}</span>
                <span className="text-on-surface-variant">{course.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
