import { useNavigate } from 'react-router-dom';
import { useCourses } from '../../hooks/useCourses';
import { useRisk } from '../../hooks/useRisks';
import type { Course, RiskAnalysis } from '../../types';

// ─── Helpers ──────────────────────────────────────────────

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

const riskBorder: Record<string, string> = {
    LOW: 'border-base-200',
    MEDIUM: 'border-warning/30',
    HIGH: 'border-error/30',
    CRITICAL: 'border-purple-500/30',
};

// ─── Carte risque par cours ────────────────────────────────

interface RiskCardProps {
    course: Course;
    onClick: () => void;
}

const RiskCard = ({ course, onClick }: RiskCardProps) => {
    const { data: risk, isLoading } = useRisk(course.id);

    if (isLoading) {
        return <div className="h-24 skeleton rounded-xl" />;
    }

    if (!risk) {
        return (
            <div
                onClick={onClick}
                className="bg-base-100 border border-base-200 rounded-xl p-4 cursor-pointer hover:border-base-300 transition-colors"
            >
                <div className="flex items-center gap-2 mb-1">
                    <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: course.color }}
                    />
                    <div className="text-sm font-medium text-base-content">{course.name}</div>
                </div>
                <div className="text-xs text-base-content/30">Données insuffisantes</div>
            </div>
        );
    }

    const factors = [
        { label: 'Performance', value: risk.details.performance },
        { label: 'Procrastination', value: risk.details.procrastination },
        { label: 'Pression', value: risk.details.pressure },
    ];

    return (
        <div
            onClick={onClick}
            className={`
        bg-base-100 border rounded-xl p-4 cursor-pointer
        hover:border-base-300 transition-colors
        ${riskBorder[risk.level]}
      `}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: course.color }}
                    />
                    <div className="text-sm font-medium text-base-content">
                        {course.name}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`text-base font-medium ${riskColor[risk.level]}`}>
                        {risk.overallScore}
                    </span>
                    <span className={`badge badge-xs ${riskBadge[risk.level]}`}>
                        {risk.level}
                    </span>
                </div>
            </div>

            {/* Facteurs */}
            <div className="flex flex-col gap-1.5">
                {factors.map((f) => (
                    <div key={f.label} className="flex items-center gap-2">
                        <span className="text-xs text-base-content/40 w-24 shrink-0">
                            {f.label}
                        </span>
                        <div className="flex-1 h-1 bg-base-200 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full"
                                style={{
                                    width: `${f.value}%`,
                                    background:
                                        f.value >= 70 ? '#E24B4A' :
                                            f.value >= 40 ? '#EF9F27' :
                                                '#639922',
                                }}
                            />
                        </div>
                        <span className="text-xs text-base-content/40 w-6 text-right">
                            {f.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Résumé global ─────────────────────────────────────────

interface GlobalSummaryProps {
    risks: (RiskAnalysis | undefined)[];
}

const GlobalSummary = ({ risks }: GlobalSummaryProps) => {
    const defined = risks.filter((r): r is RiskAnalysis => !!r);
    if (defined.length === 0) return null;

    const avg = Math.round(
        defined.reduce((sum, r) => sum + r.overallScore, 0) / defined.length
    );

    const counts = {
        CRITICAL: defined.filter((r) => r.level === 'CRITICAL').length,
        HIGH: defined.filter((r) => r.level === 'HIGH').length,
        MEDIUM: defined.filter((r) => r.level === 'MEDIUM').length,
        LOW: defined.filter((r) => r.level === 'LOW').length,
    };

    return (
        <div className="bg-base-100 rounded-2xl border border-base-200 p-5 mb-6">

            <div className="flex gap-0 mb-5">
                <div className="flex-1 text-center">
                    <div className="text-2xl font-medium text-base-content">{avg}</div>
                    <div className="text-xs text-base-content/40 mt-0.5">Score global</div>
                </div>
                <div className="w-px bg-base-200" />
                <div className="flex-1 text-center">
                    <div className="text-2xl font-medium text-purple-500">
                        {counts.CRITICAL}
                    </div>
                    <div className="text-xs text-base-content/40 mt-0.5">CRITICAL</div>
                </div>
                <div className="w-px bg-base-200" />
                <div className="flex-1 text-center">
                    <div className="text-2xl font-medium text-error">{counts.HIGH}</div>
                    <div className="text-xs text-base-content/40 mt-0.5">HIGH</div>
                </div>
                <div className="w-px bg-base-200" />
                <div className="flex-1 text-center">
                    <div className="text-2xl font-medium text-warning">{counts.MEDIUM}</div>
                    <div className="text-xs text-base-content/40 mt-0.5">MEDIUM</div>
                </div>
                <div className="w-px bg-base-200" />
                <div className="flex-1 text-center">
                    <div className="text-2xl font-medium text-success">{counts.LOW}</div>
                    <div className="text-xs text-base-content/40 mt-0.5">LOW</div>
                </div>
            </div>

            {/* Barre globale */}
            <div>
                <div className="flex justify-between text-xs text-base-content/40 mb-1.5">
                    <span>Risque global</span>
                    <span>{avg} / 100</span>
                </div>
                <div className="h-2 bg-base-200 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all"
                        style={{
                            width: `${avg}%`,
                            background:
                                avg >= 85 ? '#7C3AED' :
                                    avg >= 60 ? '#E24B4A' :
                                        avg >= 30 ? '#EF9F27' :
                                            '#639922',
                        }}
                    />
                </div>
                <div className="flex justify-between text-xs text-base-content/20 mt-1">
                    <span>LOW</span>
                    <span>MEDIUM</span>
                    <span>HIGH</span>
                    <span>CRITICAL</span>
                </div>
            </div>

        </div>
    );
};

// ─── Conseils ─────────────────────────────────────────────

interface TipsProps {
    courses: Course[];
    risks: (RiskAnalysis | undefined)[];
}

const Tips = ({ courses, risks }: TipsProps) => {
    const critical = risks
        .filter((r): r is RiskAnalysis => !!r && r.level === 'CRITICAL')
        .map((r) => ({
            risk: r,
            course: courses.find((c) => c.id === r.courseId),
        }));

    const high = risks
        .filter((r): r is RiskAnalysis => !!r && r.level === 'HIGH')
        .map((r) => ({
            risk: r,
            course: courses.find((c) => c.id === r.courseId),
        }));

    if (critical.length === 0 && high.length === 0) {
        return (
            <div className="bg-base-100 rounded-xl border border-base-200 p-5 text-center">
                <div className="text-2xl mb-2">🎉</div>
                <div className="text-sm text-base-content/50">
                    Aucun cours à risque élevé pour le moment
                </div>
            </div>
        );
    }

    return (
        <div className="bg-base-100 rounded-xl border border-base-200 overflow-hidden">
            {[...critical, ...high].map(({ risk, course }, i) => (
                <div
                    key={risk.courseId}
                    className={`flex gap-3 px-5 py-4 ${i < critical.length + high.length - 1 ? 'border-b border-base-200' : ''}`}
                >
                    <span className="text-base shrink-0">
                        {risk.level === 'CRITICAL' ? '🔴' : '🟠'}
                    </span>
                    <div>
                        <div className="text-sm font-medium text-base-content mb-1">
                            {course?.name ?? risk.courseId}
                        </div>
                        <div className="text-xs text-base-content/50">
                            {risk.details.pressure >= 70
                                ? 'Examen proche — concentre-toi sur les révisions.'
                                : risk.details.procrastination >= 60
                                    ? 'Trop de tâches en attente — planifie une session aujourd\'hui.'
                                    : 'Moyenne insuffisante — cherche de l\'aide ou des ressources.'}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// ─── Page principale ───────────────────────────────────────

export default function RiskPage() {
    const navigate = useNavigate();
    const { data: courses = [], isLoading } = useCourses();

    const activeCourses = courses.filter((c) => !c.isDeleted);

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto flex flex-col gap-4">
                <div className="skeleton h-32 rounded-2xl" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="skeleton h-28 rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-5">

            {/* Header */}
            <div>
                <h1 className="text-xl font-medium text-base-content">Analyse de risque</h1>
                <p className="text-sm text-base-content/40 mt-1">
                    Basé sur tes notes, tâches et événements
                </p>
            </div>

            {activeCourses.length === 0 ? (
                <div className="text-center py-16 text-base-content/40">
                    <div className="text-4xl mb-3">📚</div>
                    <div className="text-sm">Ajoute des cours pour voir l'analyse de risque</div>
                    <button
                        onClick={() => navigate('/courses')}
                        className="btn btn-neutral btn-sm mt-4"
                    >
                        Aller aux cours
                    </button>
                </div>
            ) : (
                <>
                    {/* Résumé global — on le passe les données via un trick */}
                    <RiskPageContent
                        courses={activeCourses}
                        onCourseClick={(id) => navigate(`/courses/${id}`)}
                    />
                </>
            )}

        </div>
    );
}

// Composant interne pour accéder aux données risk de chaque cours
const RiskPageContent = ({
    courses,
    onCourseClick,
}: {
    courses: Course[];
    onCourseClick: (id: string) => void;
}) => {
    // CORRECTIF : on ne peut pas appeler useRisk dans un .map()
    // Chaque RiskCard appelle useRisk elle-même — c'est correct
    // Pour le résumé global et les conseils, on collecte via un composant dédié
    return (
        <>
            <GlobalRiskSummary courses={courses} />

            <div>
                <div className="text-xs font-medium text-base-content/40 uppercase tracking-widest mb-3">
                    Conseils prioritaires
                </div>
                <GlobalTips courses={courses} />
            </div>

            <div>
                <div className="text-xs font-medium text-base-content/40 uppercase tracking-widest mb-3">
                    Par cours
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {courses.map((course) => (
                        <RiskCard
                            key={course.id}
                            course={course}
                            onClick={() => onCourseClick(course.id)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};