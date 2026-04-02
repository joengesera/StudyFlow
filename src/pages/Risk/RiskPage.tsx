import { useNavigate } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { PartyPopper, BookOpen } from 'lucide-react';
import { riskApi } from '../../api/risk.api';
import { useCourses } from '../../hooks/useCourses';
import { riskKeys, useRisk } from '../../hooks/useRisks';
import type { Course, RiskAnalysis } from '../../types';

// ─── Styles et Couleurs ───────────────────────────────────

const riskTheme: Record<string, { container: string; score: string; badge: string }> = {
    CRITICAL: {
        container: 'bg-[#FAF5FF] border-[#E9D5FF]',
        score: 'text-[#A855F7]',
        badge: 'bg-[#F3E8FF] text-[#A855F7]',
    },
    HIGH: {
        container: 'bg-[#FEF2F2] border-[#FECACA]',
        score: 'text-[#EF4444]',
        badge: 'bg-[#FEE2E2] text-[#EF4444]',
    },
    MEDIUM: {
        container: 'bg-[#FAF9F6] border-[#E5E5E5]',
        score: 'text-[#F59E0B]',
        badge: 'bg-[#FEF3C7] text-[#92400E]',
    },
    LOW: {
        container: 'bg-[#FAF9F6] border-[#E5E5E5]',
        score: 'text-[#10B981]',
        badge: 'bg-[#D1FAE5] text-[#047857]',
    },
};

const getFactorStyle = (val: number) => {
    if (val >= 85) return { bg: '#EF4444', text: 'text-[#EF4444]' };
    if (val >= 40) return { bg: '#F59E0B', text: 'text-[#F59E0B]' };
    return { bg: '#10B981', text: 'text-[#10B981]' };
};

// ─── Carte risque par cours ────────────────────────────────

interface RiskCardProps {
    course: Course;
    onClick: () => void;
}

const RiskCard = ({ course, onClick }: RiskCardProps) => {
    const { data: risk, isLoading } = useRisk(course.id);

    if (isLoading) {
        return <div className="h-[72px] bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] animate-pulse" />;
    }

    if (!risk) {
        return (
            <div
                onClick={onClick}
                className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] p-5 cursor-pointer hover:bg-white transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ background: course.color }} />
                    <span className="text-[15px] font-bold text-[#1A1A1A]">{course.name}</span>
                </div>
                <div className="text-[12px] font-medium text-[#A3A3A3] mt-1 ml-6">Données insuffisantes</div>
            </div>
        );
    }

    const theme = riskTheme[risk.level] ?? riskTheme.LOW;

    const factors = [
        { label: 'Performance', val: risk.details.performance },
        { label: 'Procrastination', val: risk.details.procrastination },
        { label: 'Pression examen', val: risk.details.pressure },
    ];

    return (
        <div
            onClick={onClick}
            className={`${theme.container} border rounded-[16px] p-5 cursor-pointer hover:opacity-90 transition-opacity`}
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full" style={{ background: course.color }} />
                    <span className="text-[15px] font-bold text-[#1A1A1A]">{course.name}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`text-[16px] font-bold ${theme.score}`}>
                        {risk.overallScore}
                    </span>
                    <span className={`px-2 py-0.5 rounded-[6px] text-[10px] font-bold uppercase tracking-wider ${theme.badge}`}>
                        {risk.level}
                    </span>
                </div>
            </div>

            {/* Facteurs (Barres) - Caché si LOW */}
            {risk.level !== 'LOW' && (
                <div className="mt-5 flex flex-col gap-3 ml-1 mr-1">
                    {factors.map((f) => {
                        const facStyle = getFactorStyle(f.val);
                        return (
                            <div key={f.label} className="flex items-center gap-4">
                                <span className="text-[12px] font-medium text-[#737373] w-[130px] shrink-0">
                                    {f.label}
                                </span>
                                <div className="flex-1 h-[5px] bg-white/60 rounded-full overflow-hidden relative">
                                    <div
                                        className="absolute top-0 bottom-0 left-0 rounded-full"
                                        style={{ width: `${f.val}%`, backgroundColor: facStyle.bg }}
                                    />
                                </div>
                                <span className={`text-[12px] font-bold w-[28px] text-right shrink-0 ${facStyle.text}`}>
                                    {f.val}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

// ─── Résumé global ─────────────────────────────────────────

interface GlobalSummaryProps {
    risks: (RiskAnalysis | undefined)[];
}

const GlobalSummary = ({ risks }: GlobalSummaryProps) => {
    const defined = risks.filter((r): r is RiskAnalysis => !!r);
    
    // Si aucun risque, on affiche des 0 pour la maquette vide
    const avg = defined.length > 0 ? Math.round(defined.reduce((sum, r) => sum + r.overallScore, 0) / defined.length) : 0;

    const counts = {
        CRITICAL_HIGH: defined.filter((r) => r.level === 'CRITICAL' || r.level === 'HIGH').length,
        MEDIUM: defined.filter((r) => r.level === 'MEDIUM').length,
        LOW: defined.filter((r) => r.level === 'LOW').length,
    };

    return (
        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] p-6 mb-8 mt-6 shadow-sm">
            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-8">
                Vue globale
            </div>

            <div className="flex justify-between items-center sm:px-6 mb-8">
                <div className="flex-1 flex flex-col items-center">
                    <div className="text-[26px] font-bold text-[#1A1A1A] leading-none mb-2">{avg}</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#737373] uppercase tracking-wider text-center">Score global</div>
                </div>
                <div className="w-[1px] h-12 bg-[#E5E5E5]" />
                <div className="flex-1 flex flex-col items-center">
                    <div className="text-[26px] font-bold text-[#EF4444] leading-none mb-2">{counts.CRITICAL_HIGH}</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#737373] uppercase tracking-wider text-center">Cours HIGH+</div>
                </div>
                <div className="w-[1px] h-12 bg-[#E5E5E5]" />
                <div className="flex-1 flex flex-col items-center">
                    <div className="text-[26px] font-bold text-[#F59E0B] leading-none mb-2">{counts.MEDIUM}</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#737373] uppercase tracking-wider text-center">Cours MEDIUM</div>
                </div>
                <div className="w-[1px] h-12 bg-[#E5E5E5]" />
                <div className="flex-1 flex flex-col items-center">
                    <div className="text-[26px] font-bold text-[#10B981] leading-none mb-2">{counts.LOW}</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#737373] uppercase tracking-wider text-center">Cours LOW</div>
                </div>
            </div>

            {/* Barre de score globale */}
            <div className="sm:px-2">
                <div className="flex justify-between text-[11px] font-bold mb-2">
                    <span className="text-[#737373]">Risque global</span>
                    <span className="text-[#1A1A1A]">{avg} / 100</span>
                </div>
                <div className="h-[6px] w-full rounded-full bg-gradient-to-r from-[#10B981] via-[#F59E0B] to-[#EF4444] relative overflow-hidden">
                    <div 
                        className="absolute right-0 top-0 bottom-0 bg-[#E5E5E5] transition-all duration-700 ease-out" 
                        style={{ width: `${Math.max(0, 100 - avg)}%` }} 
                    />
                </div>
                <div className="flex justify-between text-[9px] font-bold text-[#1A1A1A] mt-2 uppercase tracking-wide px-0.5">
                    <span>Low</span>
                    <span className="ml-[12%]">Medium</span>
                    <span className="mr-[12%]">High</span>
                    <span>Critical</span>
                </div>
            </div>
        </div>
    );
};

// ─── Conseils prioritaires ────────────────────────────────

interface TipsProps {
    courses: Course[];
    risks: (RiskAnalysis | undefined)[];
}

const Tips = ({ courses, risks }: TipsProps) => {
    // Trier les risques décroissants et prendre les pires (!= LOW)
    const worstRisks = [...risks]
        .filter((r): r is RiskAnalysis => !!r && r.level !== 'LOW')
        .sort((a, b) => b.overallScore - a.overallScore)
        .slice(0, 3)
        .map((r) => ({
            risk: r,
            course: courses.find((c) => c.id === r.courseId),
        }));

    if (worstRisks.length === 0) {
        return (
            <div className="bg-[#FAF9F6] rounded-[16px] border border-[#E5E5E5] p-6 text-center text-[#A3A3A3] mt-8">
                <div className="flex justify-center mb-2">
                    <PartyPopper size={28} className="opacity-40" />
                </div>
                <div className="text-[14px] font-bold">Aucun cours à risque. Tout va bien !</div>
            </div>
        );
    }

    return (
        <div className="bg-[#FAF9F6] rounded-[16px] border border-[#E5E5E5] p-6 mb-8 mt-8 shadow-sm">
            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-6">
                Conseils prioritaires
            </div>
            
            <div className="flex flex-col">
                {worstRisks.map(({ risk, course }, i) => {
                    const isLast = i === worstRisks.length - 1;
                    
                    // Couleur du point liée au niveau de risque pour attirer l'attention
                    let circleColor = '#EF4444';
                    if (risk.level === 'HIGH') circleColor = '#F97316';
                    if (risk.level === 'MEDIUM') circleColor = '#FBBF24';

                    // Mock générique ressemblant à la maquette
                    let title = `${course?.name || 'Cours'}`;
                    let subTitle = '';
                    let message = '';

                    if (risk.details.pressure >= 70) {
                        subTitle = " — examen dans 2 jours";
                        message = "Concentre-toi sur les révisions maintenant. Toutes les autres tâches peuvent attendre.";
                    } else if (risk.details.procrastination >= 60) {
                        subTitle = " — 4 tâches en attente";
                        message = "Tu accumules du retard. Planifie au moins 1h aujourd'hui.";
                    } else {
                        subTitle = " — moyenne à 11.0";
                        message = "Correcte mais fragile. Un mauvais examen suffit à faire basculer le cours.";
                    }

                    return (
                        <div
                            key={risk.courseId}
                            className={`flex gap-4 py-4 ${!isLast ? 'border-b border-[#E5E5E5]' : ''}`}
                        >
                            <div 
                                className="w-3.5 h-3.5 rounded-full shrink-0 mt-1"
                                style={{
                                    background: `radial-gradient(circle at 30% 30%, ${circleColor}80, ${circleColor})`, 
                                    boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.1)' 
                                }}
                            />
                            <div className="flex-1">
                                <div className="text-[13px] font-bold text-[#1A1A1A] mb-1">
                                    {title}<span className="text-[#1A1A1A]">{subTitle}</span>
                                </div>
                                <div className="text-[12px] font-medium text-[#737373] leading-relaxed">
                                    {message}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ─── Composant interne de contenu ──────────────────────────

const RiskPageContent = ({
    courses,
    onCourseClick,
}: {
    courses: Course[];
    onCourseClick: (id: string) => void;
}) => {
    const riskQueries = useQueries({
        queries: courses.map((course) => ({
            queryKey: riskKeys.course(course.id),
            queryFn: () => riskApi.getCourseRisk(course.id),
            enabled: !!course.id,
        })),
    });

    const risks = riskQueries.map((query) => query.data);

    // On s'assure que les cours sont ordonnés par risque du plus élevé au moins élevé (en simulant si données pas encore chargées)
    const sortedCourses = [...courses].sort((a, b) => {
        const riskA = risks.find(r => r?.courseId === a.id);
        const riskB = risks.find(r => r?.courseId === b.id);
        return (riskB?.overallScore || 0) - (riskA?.overallScore || 0);
    });

    return (
        <>
            <GlobalSummary risks={risks} />

            <div>
                <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-4">
                    Par cours
                </div>
                <div className="flex flex-col gap-3.5">
                    {sortedCourses.map((course) => (
                        <RiskCard
                            key={course.id}
                            course={course}
                            onClick={() => onCourseClick(course.id)}
                        />
                    ))}
                </div>
            </div>

            <Tips courses={courses} risks={risks} />
        </>
    );
};

// ─── Page principale ───────────────────────────────────────

export default function RiskPage() {
    const navigate = useNavigate();
    const { data: courses = [], isLoading } = useCourses();

    const activeCourses = courses.filter((c) => !c.isDeleted);

    if (isLoading) {
        return (
            <div className="max-w-[800px] mx-auto flex flex-col gap-4 sm:px-2 pt-6">
                <div className="skeleton h-10 w-48 mb-6 bg-[#FAF9F6]" />
                <div className="skeleton h-48 rounded-[16px] bg-[#FAF9F6] border border-[#E5E5E5]" />
                <div className="flex flex-col gap-4 mt-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="skeleton h-28 rounded-[16px] bg-[#FAF9F6] border border-[#E5E5E5]" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[700px] mx-auto flex flex-col sm:px-2 pb-16 pt-2">
            
            {/* Header */}
            <div className="mb-2">
                <h1 className="text-[24px] font-bold text-[#1A1A1A] tracking-tight mb-[2px]">Analyse de risque</h1>
                <p className="text-[12px] font-medium text-[#737373]">
                    Mis à jour il y a 3 min - semestre en cours
                </p>
            </div>

            {activeCourses.length === 0 ? (
                <div className="text-center py-20 border border-[#E5E5E5] rounded-[24px] bg-[#FAF9F6] mt-8 shadow-sm">
                    <div className="flex justify-center mb-4">
                        <BookOpen size={40} className="opacity-20" />
                    </div>
                    <div className="text-[15px] font-bold text-[#1A1A1A] mb-2">Aucun cours trouvé</div>
                    <div className="text-[13px] text-[#737373] max-w-[300px] mx-auto mb-6">Ajoute tes cours pour afficher ton niveau de risque en temps réel.</div>
                    <button
                        onClick={() => navigate('/courses')}
                        className="h-10 px-5 rounded-xl border border-[#E5E5E5] bg-white text-[14px] font-bold text-[#1A1A1A] hover:bg-gray-50 shadow-sm transition-colors"
                    >
                        Aller aux cours
                    </button>
                </div>
            ) : (
                <RiskPageContent
                    courses={activeCourses}
                    onCourseClick={(id) => navigate(`/courses/${id}`)}
                />
            )}

        </div>
    );
}
