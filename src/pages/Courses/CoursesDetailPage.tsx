import { Star, CheckSquare, ClipboardList, Calendar, BarChart3, CalendarDays, FileEdit, GraduationCap, ArrowLeft, Check, X, Plus, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useCourse, useCourseWorkTypes, useCourses } from '../../hooks/useCourses';
import { useGrades, useCreateGrade, useUpdateGrade } from '../../hooks/useGrades';
import { useEvents } from '../../hooks/useEvents';
import { useTasks, useUpdateTask } from '../../hooks/useTasks';
import { useWorks } from '../../hooks/useWorks';
import { useRisk } from '../../hooks/useRisks';
import { pointsAverage, type PointItem } from '../../utils/pointsEngine';
import { riskScoreStyles, riskLevelLabel } from '../../utils/risk';
import CourseFormModal from '../../components/Courses/CourseFormModal';
import { formatDueDate, getStatusBadge } from '../Works/worksShared';
import type { Grade, Task } from '../../types';

type Tab = 'notes' | 'travaux' | 'taches' | 'evenements' | 'risque';

// Une tâche appartient à un cours si elle y est directement liée (courseId) ou
// si elle est liée à un événement de ce cours (eventId -> event.courseId).
const taskBelongsToCourse = (task: Task, courseEventIds: Set<string>, courseId: string): boolean =>
  !task.isDeleted &&
  (task.courseId === courseId || (task.eventId != null && courseEventIds.has(task.eventId)));

const typeToLabel = (grade: Grade): string => {
  if (grade.workTypeLabel) return grade.workTypeLabel;
  const nameStr = grade.name.toLowerCase();
  if (nameStr.includes('interro')) return 'Interro';
  if (nameStr.includes('tp')) return 'TP';
  if (nameStr.includes('projet')) return 'Projet';
  return 'Examen';
};

const getBadgeStyle = (label: string) => {
  if (label === 'Examen') return 'bg-error/10 text-error';
  if (label === 'Interro') return 'bg-primary/10 text-primary';
  if (label === 'TP' || label === 'Projet') return 'bg-tertiary/10 text-tertiary';
  return 'bg-surface-container-highest text-on-surface-variant';
};

const getScoreColor = (score: number, max: number) => {
  const ratio = score / max;
  if (ratio >= 0.7) return 'text-primary';
  if (ratio >= 0.45) return 'text-tertiary';
  return 'text-error';
};

// Note (sur 20) nécessaire au prochain devoir pour atteindre la cible, via le
// même moteur que le backend : le candidat reçoit la pondération du type choisi.
const neededNextGrade = (
  grades: Grade[],
  target: number,
  nextType: { workTypeLabel: string; percentage?: number | null },
): number | null => {
  if (grades.length === 0) return target;
  const candidate = (score: number): PointItem => ({
    score,
    maxScore: 20,
    workTypeLabel: nextType.workTypeLabel,
    percentage: nextType.percentage ?? null,
  });
  const averageAt = (score: number) => pointsAverage([...grades, candidate(score)]);
  if (averageAt(0) >= target) return 0;
  if (averageAt(20) < target) return null;
  let lo = 0;
  let hi = 20;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (averageAt(mid) < target) lo = mid;
    else hi = mid;
  }
  return Math.round(hi * 100) / 100;
};

const NotesTab = ({ courseId }: { courseId: string }) => {
  const { data: grades = [], isLoading } = useGrades(courseId);
  const { data: courseWorkTypes = [] } = useCourseWorkTypes(courseId);
  const { mutate: createGrade, isPending: isCreating } = useCreateGrade();
  const { mutate: updateGrade, isPending: isUpdating } = useUpdateGrade();
  const [showForm, setShowForm] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [simulatorTarget, setSimulatorTarget] = useState<number | ''>(10);
  const [form, setForm] = useState({ name: '', score: '', maxScore: '20', workTypeLabel: 'EXAMEN' });

  const weightPercentToTwenty = (wp: number | null | undefined): string =>
    wp == null ? '-' : `${Math.round((wp / 5) * 10) / 10} / 20`;

  const workTypeOptions = useMemo(() => {
    if (courseWorkTypes.length > 0) {
      return courseWorkTypes.map((item) => ({
        value: item.type,
        label: `${item.type} (${weightPercentToTwenty(item.weightPercent)})`,
        weightPercent: item.weightPercent
      }));
    }
    return [
      { value: 'EXAMEN', label: 'EXAMEN', weightPercent: null as number | null },
      { value: 'INTERRO', label: 'INTERRO', weightPercent: null as number | null },
      { value: 'TP', label: 'TP', weightPercent: null as number | null }
    ];
  }, [courseWorkTypes]);

  const normalizedFormType = String(form.workTypeLabel || '').trim().toUpperCase();
  const currentTypeValue = workTypeOptions.some((option) => option.value === normalizedFormType)
    ? normalizedFormType
    : (workTypeOptions[0]?.value ?? 'EXAMEN');

  const average = grades.length === 0 ? null : pointsAverage(grades);

  const needed = neededNextGrade(grades, Number(simulatorTarget), {
    workTypeLabel: currentTypeValue,
    percentage: workTypeOptions.find((option) => option.value === currentTypeValue)?.weightPercent ?? null,
  });

  const resetForm = () =>
    setForm({
      name: '',
      score: '',
      maxScore: '20',
      workTypeLabel: workTypeOptions[0]?.value ?? 'EXAMEN'
    });

  const handleEdit = (grade: Grade) => {
    setEditingGrade(grade);
    setForm({
      name: grade.name,
      score: String(grade.score),
      maxScore: String(grade.maxScore),
      workTypeLabel: grade.workTypeLabel ?? currentTypeValue
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedType = workTypeOptions.find((option) => option.value === currentTypeValue);

    if (editingGrade) {
      updateGrade(
        {
          id: editingGrade.id,
          payload: {
            name: form.name,
            score: Number(form.score),
            maxScore: Number(form.maxScore),
            workTypeLabel: currentTypeValue,
            percentage: selectedType?.weightPercent ?? null
          }
        },
        {
          onSuccess: () => {
            setShowForm(false);
            setEditingGrade(null);
            resetForm();
          }
        }
      );
      return;
    }

    createGrade(
      {
        ...form,
        score: Number(form.score),
        maxScore: Number(form.maxScore),
        workTypeLabel: currentTypeValue,
        percentage: selectedType?.weightPercent ?? undefined,
        courseId
      },
      {
        onSuccess: () => {
          setShowForm(false);
          setEditingGrade(null);
          resetForm();
        }
      }
    );
  };

  if (isLoading) return <div className="h-40 bg-surface-container-highest/50 rounded-xl animate-pulse" />;

  return (
    <div className="space-y-8">
      {/* Notes Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-2 gap-4">
        <div>
          <div className="text-label-caps font-label-caps text-on-surface-variant mb-2">Notes du cours</div>
          <div className="text-body-md font-body-md text-on-surface-variant">
            Moyenne pondérée : <span className="text-on-surface font-bold">{average !== null ? `${average.toFixed(1)} / 20` : '— / 20'}</span>
          </div>
        </div>
        <button
          onClick={() => {
            setEditingGrade(null);
            resetForm();
            setShowForm(!showForm);
          }}
          className="btn btn-outlined w-full sm:w-auto"
        >
          {showForm ? <X className="text-[18px]" /> : <Plus className="text-[18px]" />}
          {showForm ? 'Fermer' : 'Ajouter une note'}
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="card card-padded space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-label-caps font-label-caps text-on-surface-variant">
              {editingGrade ? `Modifier : ${editingGrade.name}` : 'Nouvelle note'}
            </div>
            {editingGrade && (
              <span className="px-2.5 py-0.5 rounded text-label-caps font-label-caps bg-surface-container-highest text-on-surface-variant">
                Édition
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">Nom</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="input input-bordered w-full h-12 text-base"
                placeholder="Ex: Examen Mi-Semestre"
              />
            </div>
            <div>
              <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">Note</label>
              <input
                type="number"
                step="0.5"
                value={form.score}
                onChange={(e) => setForm({ ...form, score: e.target.value })}
                required
                min={0}
                className="input input-bordered w-full h-12 text-base"
              />
            </div>
            <div>
              <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">Sur</label>
              <input
                type="number"
                value={form.maxScore}
                onChange={(e) => setForm({ ...form, maxScore: e.target.value })}
                min={1}
                className="input input-bordered w-full h-12 text-base"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">Type de note</label>
              <select
                value={currentTypeValue}
                onChange={(e) => setForm({ ...form, workTypeLabel: e.target.value })}
                className="input input-bordered w-full h-12 text-base"
              >
                {workTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-label-sm font-label-sm text-on-surface-variant mb-1.5 block">Pondération appliquée</label>
              <input
                readOnly
                value={weightPercentToTwenty(workTypeOptions.find((option) => option.value === currentTypeValue)?.weightPercent)}
                className="input w-full h-12 text-base bg-surface-container"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-outline-variant">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingGrade(null);
                resetForm();
              }}
              className="btn btn-outlined"
            >
              Annuler
            </button>
            <button type="submit" disabled={isCreating || isUpdating} className="btn btn-primary">
              {isCreating || isUpdating ? 'Enregistrement...' : editingGrade ? 'Enregistrer les modifications' : 'Enregistrer'}
            </button>
          </div>
        </form>
      )}

      {/* Notes List */}
      {grades.length === 0 ? (
        <div className="card card-padded text-center text-on-surface-variant py-10">
          <Star className="text-4xl mb-2 block text-outline" />
          <p className="text-body-md font-body-md">Aucune note enregistrée.</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="p-card-padding border-b border-outline-variant bg-surface-bright">
            <h3 className="text-label-caps font-label-caps text-on-surface-variant">Historique des notes</h3>
          </div>
          <div className="divide-y divide-outline-variant">
            {grades.map((grade) => {
              const typeLabel = typeToLabel(grade);
              const badgeStyle = getBadgeStyle(typeLabel);
              const scoreColor = getScoreColor(grade.score, grade.maxScore);

              return (
                <div key={grade.id} className="p-card-padding flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-body-md font-body-md font-medium text-on-surface mb-1 truncate">{grade.name}</div>
                    <div className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-2">
                      <span>{typeLabel}</span>
                      <span className="w-1 h-1 bg-outline-variant rounded-full" />
                      {grade.date && (
                        <span className="w-1 h-1 bg-outline-variant rounded-full" />
                      )}
                      {grade.date && (
                        <span>{format(new Date(grade.date), 'd MMM yyyy', { locale: fr })}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2.5 py-0.5 rounded text-label-caps font-label-caps ${badgeStyle}`}>
                      {typeLabel}
                    </span>
                    <div className={`text-headline-sm font-headline-sm w-20 text-right ${scoreColor}`}>
                      {grade.score} / {grade.maxScore}
                    </div>
                    <button
                      onClick={() => handleEdit(grade)}
                      className="p-2 rounded-full hover:bg-surface-container transition-colors"
                      aria-label="Modifier la note"
                    >
                      <FileEdit className="text-[20px] text-on-surface-variant" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Simulator */}
      <div className="card card-padded">
        <div className="text-label-caps font-label-caps text-on-surface-variant mb-2">Simulateur de moyenne</div>
        <div className="text-body-md font-body-md text-on-surface-variant mb-5">
          Quelle note faut-il avoir au prochain examen pour atteindre {simulatorTarget || 10} / 20 ?
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-body-md font-body-md text-on-surface">Objectif :</span>
          <input
            type="number"
            min="0"
            max="20"
            step="0.5"
            value={simulatorTarget === '' ? '' : simulatorTarget}
            onChange={(e) => setSimulatorTarget(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-[80px] h-12 input input-bordered text-center text-base"
          />
          <span className="text-body-md font-body-md text-on-surface ml-2">→ Il te faut au moins</span>
          <span className="text-headline-sm font-headline-sm text-on-surface">
            {needed === null
              ? 'Impossible — trop haut'
              : needed <= 0
                ? 'Déjà atteint !'
                : `${needed} / 20`}
          </span>
        </div>
      </div>
    </div>
  );
};

const TasksTab = ({ courseId }: { courseId: string }) => {
  const { data: tasks = [], isLoading } = useTasks();
  const { data: events = [] } = useEvents();
  const { mutate: updateTask } = useUpdateTask();

  const courseEventIds = new Set(events.filter((e) => e.courseId === courseId).map((e) => e.id));
  const courseTasks = tasks.filter((t) => taskBelongsToCourse(t, courseEventIds, courseId));

  if (isLoading) return <div className="h-40 bg-surface-container-highest/50 rounded-xl animate-pulse" />;

  if (courseTasks.length === 0) {
    return (
      <div className="card card-padded text-center text-on-surface-variant py-10">
        <CheckSquare className="text-4xl mb-2 block text-outline" />
        <p className="text-body-md font-body-md">Aucune tâche pour ce cours.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="p-card-padding border-b border-outline-variant bg-surface-bright">
        <h3 className="text-label-caps font-label-caps text-on-surface-variant">Tâches du cours</h3>
      </div>
      <div className="divide-y divide-outline-variant">
        {courseTasks.map((task) => (
          <div key={task.id} className="p-card-padding flex items-center gap-4">
            <button
              className={`w-5 h-5 rounded border flex-shrink-0 cursor-pointer ${task.status === 'COMPLETED' ? 'bg-primary border-primary' : 'border-outline'}`}
              onClick={() => updateTask({ id: task.id, payload: { status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' } })}
              aria-label={task.status === 'COMPLETED' ? 'Marquer comme à faire' : 'Marquer comme terminée'}
            >
              {task.status === 'COMPLETED' && <Check className="text-on-primary text-[18px]" />}
            </button>
            <div className="flex-1 min-w-0">
              <div className={`text-body-md font-body-md font-medium text-on-surface ${task.status === 'COMPLETED' ? 'line-through' : ''}`}>
                {task.title}
              </div>
              {task.dueDate && (
                <div className="text-label-sm font-label-sm text-on-surface-variant mt-0.5">
                  {new Date(task.dueDate).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                </div>
              )}
            </div>
            <span className={`px-2.5 py-0.5 rounded text-label-caps font-label-caps ${
              task.priority === 'CRITICAL' || task.priority === 'HIGH' ? 'bg-error/10 text-error' :
              task.priority === 'MEDIUM' ? 'bg-tertiary/10 text-tertiary' :
              'bg-surface-container-highest text-on-surface-variant'
            }`}>
              {task.priority === 'CRITICAL' || task.priority === 'HIGH' ? 'Urgent' :
               task.priority === 'MEDIUM' ? 'Moyen' : 'Faible'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TravauxTab = ({ courseId }: { courseId: string }) => {
  const { data: works = [], isLoading } = useWorks();
  const { data: courses = [] } = useCourses();
  const course = courses.find((item) => item.id === courseId);

  const courseWorks = works
    .filter((w) => w.courseId === courseId)
    .sort((a, b) => {
      if (a.dueDate && b.dueDate) return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && b.dueDate) return 1;
      return (b.createdAt || '').localeCompare(a.createdAt || '');
    });

  if (isLoading) return <div className="h-40 bg-surface-container-highest/50 rounded-xl animate-pulse" />;

  if (courseWorks.length === 0) {
    return (
      <div className="card card-padded text-center text-on-surface-variant py-10">
        <ClipboardList className="text-4xl mb-2 block text-outline" />
        <p className="text-body-md font-body-md">Aucun travail pour ce cours.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="p-card-padding border-b border-outline-variant bg-surface-bright">
        <h3 className="text-label-caps font-label-caps text-on-surface-variant">Travaux du cours</h3>
      </div>
      <div className="divide-y divide-outline-variant">
        {courseWorks.map((work) => {
          const badge = getStatusBadge(work.status);
          const scoreDisplay = work.status === 'GRADED' && work.pointsEarned != null && work.pointsPossible != null
            ? `${work.pointsEarned.toFixed(1)} / ${work.pointsPossible}`
            : '—';
          return (
            <div key={work.id} className="p-card-padding flex items-center gap-4">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: course?.color || 'var(--color-on-surface)' }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-body-md font-body-md font-medium text-on-surface">{work.title}</div>
                <div className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-2 mt-0.5">
                  <span>{work.workTypeLabel || 'PROJET'}</span>
                  <span className="w-1 h-1 bg-outline-variant rounded-full" />
                  <span>{formatDueDate(work.dueDate)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-2.5 py-1 rounded text-label-caps font-label-caps ${badge.bg}`}>{badge.label}</span>
                <div className="text-headline-sm font-headline-sm w-[72px] text-right text-on-surface-variant">{scoreDisplay}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const EventsTab = ({ courseId }: { courseId: string }) => {
  const { data: events = [], isLoading } = useEvents();

  const courseEvents = events
    .filter((e) => e.courseId === courseId)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  if (isLoading) return <div className="h-40 bg-surface-container-highest/50 rounded-xl animate-pulse" />;

  if (courseEvents.length === 0) {
    return (
      <div className="card card-padded text-center text-on-surface-variant py-10">
        <Calendar className="text-4xl mb-2 block text-outline" />
        <p className="text-body-md font-body-md">Aucun événement pour ce cours.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="p-card-padding border-b border-outline-variant bg-surface-bright">
        <h3 className="text-label-caps font-label-caps text-on-surface-variant">Événements du cours</h3>
      </div>
      <div className="divide-y divide-outline-variant">
        {courseEvents.map((event) => (
          <div key={event.id} className="p-card-padding flex items-center gap-4">
            <div className="w-1.5 self-stretch rounded-full shrink-0 bg-on-surface-variant" />
            <div className="flex-1 min-w-0">
              <div className="text-body-md font-body-md font-medium text-on-surface">{event.title}</div>
              <div className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                <CalendarDays className="text-[16px]" />
                {new Date(event.startDate).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                <span className="w-1 h-1 bg-outline-variant rounded-full" />
                {new Date(event.startDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} –{' '}
                {new Date(event.endDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded text-label-caps font-label-caps bg-surface-container text-on-surface-variant">
              {event.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const RiskTab = ({ courseId }: { courseId: string }) => {
  const { data: risk, isLoading } = useRisk(courseId);

  if (isLoading) return <div className="h-40 bg-surface-container-highest/50 rounded-xl animate-pulse" />;

  if (!risk) {
    return (
      <div className="card card-padded text-center text-on-surface-variant py-10">
        <BarChart3 className="text-4xl mb-2 block text-outline" />
        <p className="text-body-md font-body-md">Données insuffisantes pour calculer le risque.</p>
      </div>
    );
  }

  const factors = [
    { label: 'Performance', value: risk.details.performance },
    { label: 'Procrastination', value: risk.details.procrastination },
    { label: 'Pression examen', value: risk.details.pressure },
  ];

  const rStyle = riskScoreStyles(risk.overallScore);

  return (
    <div className="card card-padded space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-label-sm font-label-sm text-on-surface-variant mb-1">Score de risque global</div>
          <div className="flex items-baseline gap-2">
            <span className={`text-display-lg font-display-lg ${rStyle.text}`}>{risk.overallScore}</span>
            <span className="text-headline-md font-headline-md text-on-surface-variant">/ 100</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded text-label-caps font-label-caps ${rStyle.bg} ${rStyle.text}`}>
          {riskLevelLabel(risk.level)}
        </span>
      </div>

      <div className="space-y-4">
        {factors.map((f) => (
          <div key={f.label} className="p-4 rounded-lg bg-surface-container-lowest border border-outline-variant">
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-label-sm font-label-sm text-on-surface">{f.label}</span>
              <span className="text-label-sm font-label-sm text-on-surface">{f.value}%</span>
            </div>
            <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${f.value}%`,
                  background: f.value >= 70 ? 'var(--color-error)' : f.value >= 40 ? 'var(--color-tertiary)' : 'var(--color-primary)'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('notes');
  const [showEditModal, setShowEditModal] = useState(false);

  const { data: course, isLoading } = useCourse(id ?? '');
  const { data: grades = [] } = useGrades(id ?? '');
  const { data: tasks = [] } = useTasks();
  const { data: events = [] } = useEvents();
  const { data: risk } = useRisk(id ?? '');

  const courseEventIds = useMemo(
    () => new Set(events.filter((e) => e.courseId === id).map((e) => e.id)),
    [events, id]
  );
  const courseTasks = tasks.filter((t) => taskBelongsToCourse(t, courseEventIds, id ?? ''));

  const average = grades.length === 0 ? null : pointsAverage(grades);

  const riskLevel = risk?.level || 'LOW';
  const rStyle = riskScoreStyles(risk?.overallScore ?? 0);

  if (isLoading) return <div className="max-w-4xl mx-auto h-[300px] bg-surface-container-highest/50 rounded-xl animate-pulse" />;

  if (!course) {
    return (
      <div className="text-center py-16 text-on-surface-variant max-w-4xl mx-auto">
        <GraduationCap className="text-6xl mb-3 block text-outline" />
        <h2 className="text-headline-md font-headline-md text-on-surface mb-2">Cours introuvable</h2>
        <button onClick={() => navigate('/courses')} className="mt-4 btn btn-outlined">
          <ArrowLeft className="text-[18px]" />
          Retour aux cours
        </button>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: LucideIcon }[] = [
    { key: 'notes', label: 'Notes', icon: Star },
    { key: 'travaux', label: 'Travaux', icon: ClipboardList },
    { key: 'taches', label: 'Tâches', icon: CheckSquare },
    { key: 'evenements', label: 'Événements', icon: Calendar },
    { key: 'risque', label: 'Risque', icon: BarChart3 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      {/* Back Action */}
      <button
        onClick={() => navigate('/courses')}
        className="btn btn-text"
      >
        <ArrowLeft className="text-[18px]" />
        Mes cours
      </button>

      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ background: course.color }} />
            <h1 className="text-display-lg font-display-lg text-on-surface">{course.name}</h1>
          </div>
          <div className="text-body-lg font-body-lg text-on-surface-variant ml-6.5">
            {course.code} • {course.credits ?? 3} crédits
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className={`px-3 py-1 rounded text-label-caps font-label-caps ${rStyle.bg} ${rStyle.text}`}>
            {riskLevelLabel(riskLevel)}
          </span>
          <button
            onClick={() => setShowEditModal(true)}
            className="btn btn-outlined"
          >
            <FileEdit className="text-[18px]" />
            Modifier
          </button>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mb-8">
        <div className="card card-padded flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="text-primary" />
            <span className="text-label-caps font-label-caps text-on-surface-variant">Moyenne</span>
          </div>
          <div className="text-display-lg font-display-lg text-on-surface">
            {average !== null ? average.toFixed(1) : '-'}
            <span className="text-body-md text-on-surface-variant">/ 20</span>
          </div>
        </div>
        <div className="card card-padded flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <Star className="text-primary" />
            <span className="text-label-caps font-label-caps text-on-surface-variant">Notes</span>
          </div>
          <div className="text-display-lg font-display-lg text-on-surface">{grades.length}</div>
        </div>
        <div className="card card-padded flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <CheckSquare className="text-primary" />
            <span className="text-label-caps font-label-caps text-on-surface-variant">Tâches</span>
          </div>
          <div className="text-display-lg font-display-lg text-on-surface">{courseTasks.length}</div>
        </div>
        <div className="card card-padded flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="text-error" />
            <span className="text-label-caps font-label-caps text-on-surface-variant">Risque</span>
          </div>
          <div className={`text-display-lg font-display-lg ${riskScoreStyles(risk?.overallScore ?? 0).text}`}>{Math.round(risk?.overallScore || 0)}</div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex border-b border-outline-variant overflow-x-auto mb-6" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`flex items-center gap-2 px-5 py-3 text-body-md font-body-md transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.key
                ? 'text-primary border-primary font-medium'
                : 'text-on-surface-variant border-transparent hover:text-on-surface'
            }`}
          >
            <tab.icon className="text-[20px]" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div role="tabpanel">
        {activeTab === 'notes' && <NotesTab courseId={id ?? ''} />}
        {activeTab === 'travaux' && <TravauxTab courseId={id ?? ''} />}
        {activeTab === 'taches' && <TasksTab courseId={id ?? ''} />}
        {activeTab === 'evenements' && <EventsTab courseId={id ?? ''} />}
        {activeTab === 'risque' && <RiskTab courseId={id ?? ''} />}
      </div>

      {showEditModal && course && (
        <CourseFormModal course={course} onClose={() => setShowEditModal(false)} />
      )}
    </div>
  );
}