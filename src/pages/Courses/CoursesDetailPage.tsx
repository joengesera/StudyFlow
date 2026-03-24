import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourse } from '../../hooks/useCourses';
import { useGrades, useCreateGrade, useDeleteGrade } from '../../hooks/useGrades';
import { useEvents } from '../../hooks/useEvents';
import { useTasks, useUpdateTask } from '../../hooks/useTasks';
import { useRisk } from '../../hooks/useRisks';
import type { Grade } from '../../types';

// ─── Helpers ──────────────────────────────────────────────

type Tab = 'notes' | 'taches' | 'evenements' | 'risque';

const riskColor: Record<string, string> = {
    LOW: 'text-success',
    MEDIUM: 'text-warning',
    HIGH: 'text-error',
    CRITICAL: 'text-purple-500',
};

const riskBadge: Record<string, string> = {
    LOW: 'badge-success',
    MEDIUM: 'badge-warning',
    HIGH: 'badge-error',
    CRITICAL: 'badge-ghost',
};

const scoreColor = (score: number, max: number): string => {
    const ratio = score / max;
    if (ratio >= 0.7) return 'text-success';
    if (ratio >= 0.5) return 'text-warning';
    return 'text-error';
};

// Calcule la note minimale à obtenir pour atteindre l'objectif
const simulateGrade = (
    grades: Grade[],
    target: number,
    nextWeight: number = 1
): number | null => {
    if (grades.length === 0) return target;
    const totalWeight = grades.reduce((sum, g) => sum + (g.weight ?? 1), 0) + nextWeight;
    const currentSum = grades.reduce(
        (sum, g) => sum + ((g.score / g.maxScore) * 20) * (g.weight ?? 1),
        0
    );
    const needed = (target * totalWeight - currentSum) / nextWeight;
    return Math.round(needed * 100) / 100;
};

// ─── Onglet Notes ──────────────────────────────────────────

interface NotesTabProps {
    courseId: string;
}

const NotesTab = ({ courseId }: NotesTabProps) => {
    const { data: grades = [], isLoading } = useGrades(courseId);
    const { mutate: createGrade, isPending: isCreating } = useCreateGrade();
    const { mutate: deleteGrade } = useDeleteGrade();
    const [showForm, setShowForm] = useState(false);
    const [simulatorTarget, setSimulatorTarget] = useState(10);
    const [form, setForm] = useState({
        name: '',
        score: '',
        maxScore: '20',
        weight: '1',
    });

    const average =
        grades.length === 0
            ? null
            : grades.reduce(
                (sum, g) => sum + ((g.score / g.maxScore) * 20) * (g.weight ?? 1),
                0
            ) / grades.reduce((sum, g) => sum + (g.weight ?? 1), 0);

    const needed = simulateGrade(grades, simulatorTarget);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createGrade(
            {
                name: form.name,
                score: Number(form.score),
                maxScore: Number(form.maxScore),
                weight: Number(form.weight),
                courseId,
            },
            { onSuccess: () => { setShowForm(false); setForm({ name: '', score: '', maxScore: '20', weight: '1' }); } }
        );
    };

    if (isLoading) return <div className="skeleton h-40 rounded-xl" />;

    return (
        <div className="flex flex-col gap-4">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="text-sm text-base-content/50">
                    Moyenne pondérée :{' '}
                    <strong className={`text-base-content ${average !== null ? scoreColor(average, 20) : ''}`}>
                        {average !== null ? `${average.toFixed(1)} / 20` : '—'}
                    </strong>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn btn-neutral btn-xs"
                >
                    + Ajouter une note
                </button>
            </div>

            {/* Formulaire ajout */}
            {showForm && (
                <form
                    onSubmit={handleCreate}
                    className="bg-base-200 rounded-xl p-4 flex flex-col gap-3"
                >
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="text-xs text-base-content/50 mb-1 block">Nom</label>
                            <input
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="ex: Examen final"
                                required
                                className="input input-bordered input-xs w-full"
                            />
                        </div>
                        <div className="w-20">
                            <label className="text-xs text-base-content/50 mb-1 block">Note</label>
                            <input
                                type="number"
                                value={form.score}
                                onChange={(e) => setForm({ ...form, score: e.target.value })}
                                placeholder="12"
                                required
                                min={0}
                                className="input input-bordered input-xs w-full"
                            />
                        </div>
                        <div className="w-20">
                            <label className="text-xs text-base-content/50 mb-1 block">Sur</label>
                            <input
                                type="number"
                                value={form.maxScore}
                                onChange={(e) => setForm({ ...form, maxScore: e.target.value })}
                                min={1}
                                className="input input-bordered input-xs w-full"
                            />
                        </div>
                        <div className="w-20">
                            <label className="text-xs text-base-content/50 mb-1 block">Coeff.</label>
                            <input
                                type="number"
                                value={form.weight}
                                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                                min={0.5}
                                step={0.5}
                                className="input input-bordered input-xs w-full"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowForm(false)} className="btn btn-ghost btn-xs">
                            Annuler
                        </button>
                        <button type="submit" disabled={isCreating} className="btn btn-neutral btn-xs">
                            {isCreating ? <span className="loading loading-spinner loading-xs" /> : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            )}

            {/* Liste notes */}
            {grades.length === 0 ? (
                <div className="text-sm text-base-content/40 text-center py-8">
                    Aucune note pour ce cours
                </div>
            ) : (
                <div className="bg-base-100 rounded-xl border border-base-200 overflow-hidden">
                    {grades.map((grade, i) => (
                        <div
                            key={grade.id}
                            className={`flex items-center gap-4 px-5 py-3 ${i < grades.length - 1 ? 'border-b border-base-200' : ''}`}
                        >
                            <div className="flex-1">
                                <div className="text-sm text-base-content">{grade.name}</div>
                                <div className="text-xs text-base-content/40 mt-0.5">
                                    Coeff. {grade.weight ?? 1}
                                    {grade.date ? ` · ${new Date(grade.date).toLocaleDateString('fr-FR')}` : ''}
                                </div>
                            </div>
                            <div className={`text-base font-medium ${scoreColor(grade.score, grade.maxScore)}`}>
                                {grade.score} / {grade.maxScore}
                            </div>
                            <button
                                onClick={() => deleteGrade(grade.id)}
                                className="btn btn-ghost btn-xs text-base-content/30 hover:text-error"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Simulateur */}
            <div className="bg-base-200 rounded-xl p-4">
                <div className="text-xs text-base-content/50 mb-3 font-medium">
                    Simulateur de moyenne
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm text-base-content/60">Objectif :</span>
                    <input
                        type="number"
                        value={simulatorTarget}
                        onChange={(e) => setSimulatorTarget(Number(e.target.value))}
                        min={0}
                        max={20}
                        className="input input-bordered input-xs w-16 text-center"
                    />
                    <span className="text-sm text-base-content/60">/ 20 → il te faut au moins</span>
                    <span className={`text-base font-medium ${needed !== null ? scoreColor(needed, 20) : ''}`}>
                        {needed !== null
                            ? needed > 20
                                ? 'Impossible 😔'
                                : needed < 0
                                    ? 'Déjà atteint 🎉'
                                    : `${needed} / 20`
                            : '—'
                        }
                    </span>
                </div>
            </div>

        </div>
    );
};

// ─── Onglet Tâches ─────────────────────────────────────────

interface TasksTabProps {
    courseId: string;
}

const TasksTab = ({ courseId }: TasksTabProps) => {
    const { data: tasks = [], isLoading } = useTasks();
    const { mutate: updateTask } = useUpdateTask();

    const courseTasks = tasks.filter(
        (t) => t.courseId === courseId && !t.isDeleted
    );

    if (isLoading) return <div className="skeleton h-40 rounded-xl" />;

    if (courseTasks.length === 0) {
        return (
            <div className="text-sm text-base-content/40 text-center py-8">
                Aucune tâche pour ce cours
            </div>
        );
    }

    return (
        <div className="bg-base-100 rounded-xl border border-base-200 overflow-hidden">
            {courseTasks.map((task, i) => (
                <div
                    key={task.id}
                    className={`flex items-center gap-3 px-5 py-3 ${i < courseTasks.length - 1 ? 'border-b border-base-200' : ''}`}
                >
                    <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={task.status === 'COMPLETED'}
                        onChange={() =>
                            updateTask({
                                id: task.id,
                                payload: {
                                    status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED',
                                },
                            })
                        }
                    />
                    <div className="flex-1">
                        <div className={`text-sm ${task.status === 'COMPLETED' ? 'line-through text-base-content/30' : 'text-base-content'}`}>
                            {task.title}
                        </div>
                        {task.dueDate && (
                            <div className="text-xs text-base-content/40 mt-0.5">
                                {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                            </div>
                        )}
                    </div>
                    <span className={`badge badge-xs ${task.priority === 'CRITICAL' ? 'badge-ghost' :
                            task.priority === 'HIGH' ? 'badge-error' :
                                task.priority === 'MEDIUM' ? 'badge-warning' : 'badge-success'
                        }`}>
                        {task.priority}
                    </span>
                </div>
            ))}
        </div>
    );
};

// ─── Onglet Événements ─────────────────────────────────────

interface EventsTabProps {
    courseId: string;
}

const EventsTab = ({ courseId }: EventsTabProps) => {
    const { data: events = [], isLoading } = useEvents();

    const courseEvents = events
        .filter((e) => e.courseId === courseId)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    if (isLoading) return <div className="skeleton h-40 rounded-xl" />;

    if (courseEvents.length === 0) {
        return (
            <div className="text-sm text-base-content/40 text-center py-8">
                Aucun événement pour ce cours
            </div>
        );
    }

    return (
        <div className="bg-base-100 rounded-xl border border-base-200 overflow-hidden">
            {courseEvents.map((event, i) => (
                <div
                    key={event.id}
                    className={`flex items-center gap-4 px-5 py-3 ${i < courseEvents.length - 1 ? 'border-b border-base-200' : ''}`}
                >
                    <div
                        className="w-1 self-stretch rounded-full shrink-0"
                        style={{ background: '#3B82F6' }}
                    />
                    <div className="flex-1">
                        <div className="text-sm text-base-content">{event.title}</div>
                        <div className="text-xs text-base-content/40 mt-0.5">
                            {new Date(event.startDate).toLocaleDateString('fr-FR', {
                                weekday: 'short', day: 'numeric', month: 'short',
                            })}
                            {' · '}
                            {new Date(event.startDate).toLocaleTimeString('fr-FR', {
                                hour: '2-digit', minute: '2-digit',
                            })}
                            {' – '}
                            {new Date(event.endDate).toLocaleTimeString('fr-FR', {
                                hour: '2-digit', minute: '2-digit',
                            })}
                        </div>
                    </div>
                    <span className="badge badge-xs badge-info">{event.type}</span>
                </div>
            ))}
        </div>
    );
};

// ─── Onglet Risque ─────────────────────────────────────────

interface RiskTabProps {
    courseId: string;
}

const RiskTab = ({ courseId }: RiskTabProps) => {
    const { data: risk, isLoading } = useRisk(courseId);

    if (isLoading) return <div className="skeleton h-40 rounded-xl" />;

    if (!risk) {
        return (
            <div className="text-sm text-base-content/40 text-center py-8">
                Données insuffisantes pour calculer le risque
            </div>
        );
    }

    const factors = [
        { label: 'Performance', value: risk.details.performance },
        { label: 'Procrastination', value: risk.details.procrastination },
        { label: 'Pression examen', value: risk.details.pressure },
    ];

    return (
        <div className="flex flex-col gap-4">

            {/* Score global */}
            <div className="bg-base-100 rounded-xl border border-base-200 p-5">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <div className="text-sm text-base-content/50 mb-1">Score de risque</div>
                        <div className={`text-3xl font-medium ${riskColor[risk.level]}`}>
                            {risk.overallScore}
                            <span className="text-base text-base-content/30 ml-1">/ 100</span>
                        </div>
                    </div>
                    <span className={`badge ${riskBadge[risk.level]}`}>{risk.level}</span>
                </div>

                {/* Facteurs */}
                <div className="flex flex-col gap-3">
                    {factors.map((f) => (
                        <div key={f.label}>
                            <div className="flex justify-between text-xs text-base-content/50 mb-1">
                                <span>{f.label}</span>
                                <span>{f.value}</span>
                            </div>
                            <div className="h-1.5 bg-base-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${f.value}%`,
                                        background: f.value >= 70 ? '#E24B4A' : f.value >= 40 ? '#EF9F27' : '#639922',
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

// ─── Page principale ───────────────────────────────────────

export default function CourseDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('notes');

    const { data: course, isLoading } = useCourse(id ?? '');

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto flex flex-col gap-4">
                <div className="skeleton h-8 w-48 rounded-lg" />
                <div className="skeleton h-28 rounded-xl" />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="text-center py-16 text-base-content/40">
                <div className="text-4xl mb-3">🔍</div>
                <div className="text-sm">Cours introuvable</div>
                <button onClick={() => navigate('/courses')} className="btn btn-ghost btn-sm mt-4">
                    ← Retour aux cours
                </button>
            </div>
        );
    }

    const tabs: { key: Tab; label: string }[] = [
        { key: 'notes', label: 'Notes' },
        { key: 'taches', label: 'Tâches' },
        { key: 'evenements', label: 'Événements' },
        { key: 'risque', label: 'Risque' },
    ];

    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-5">

            {/* Retour */}
            <button
                onClick={() => navigate('/courses')}
                className="text-xs text-base-content/40 hover:text-base-content w-fit"
            >
                ← Mes cours
            </button>

            {/* Header cours */}
            <div className="bg-base-100 rounded-2xl border border-base-200 p-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ background: course.color }}
                        />
                        <div>
                            <h1 className="text-xl font-medium text-base-content">{course.name}</h1>
                            <div className="text-xs text-base-content/40 mt-1">
                                {course.code} · {course.credits ?? 3} crédits
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-ghost btn-xs">Modifier</button>
                </div>
            </div>

            {/* Onglets */}
            <div className="flex gap-1 border-b border-base-200 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`
              px-4 py-2 text-sm whitespace-nowrap border-b-2 transition-colors
              ${activeTab === tab.key
                                ? 'border-base-content text-base-content font-medium'
                                : 'border-transparent text-base-content/40 hover:text-base-content'
                            }
            `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Contenu onglet actif */}
            <div>
                {activeTab === 'notes' && <NotesTab courseId={id ?? ''} />}
                {activeTab === 'taches' && <TasksTab courseId={id ?? ''} />}
                {activeTab === 'evenements' && <EventsTab courseId={id ?? ''} />}
                {activeTab === 'risque' && <RiskTab courseId={id ?? ''} />}
            </div>

        </div>
    );
}