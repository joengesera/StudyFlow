import { useNavigate } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { riskApi } from '../../api/risk.api';
import { useCourses } from '../../hooks/useCourses';
import { riskKeys } from '../../hooks/useRisks';
import { riskScoreStyles, riskScoreColor } from '../../utils/risk';
import type { Course, RiskAnalysis } from '../../types';

const GlobalSummary = ({ risks }: { risks: (RiskAnalysis | undefined)[] }) => {
  const defined = risks.filter((r): r is RiskAnalysis => !!r);
  const avg = defined.length > 0 ? Math.round(defined.reduce((sum, r) => sum + r.overallScore, 0) / defined.length) : 0;

  const counts = {
    CRITICAL_HIGH: defined.filter((r) => r.level === 'CRITICAL' || r.level === 'HIGH').length,
    MEDIUM: defined.filter((r) => r.level === 'MEDIUM').length,
    LOW: defined.filter((r) => r.level === 'LOW').length,
  };

  return (
    <div className="card card-padded mb-8">
      <div className="text-label-caps font-label-caps text-on-surface-variant mb-6 border-b border-outline-variant pb-2">Vue globale</div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
        <div className="flex flex-col items-center text-center">
          <div className={`text-display-lg font-display-lg ${riskScoreStyles(avg).text}`}>{avg}</div>
          <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Score global</div>
        </div>
        <div className="flex flex-col items-center text-center border-l border-outline-variant pl-6 sm:pl-8">
          <div className="text-display-lg font-display-lg text-error">{counts.CRITICAL_HIGH}</div>
          <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Cours HIGH+</div>
        </div>
        <div className="flex flex-col items-center text-center border-l border-outline-variant pl-6 sm:pl-8">
          <div className="text-display-lg font-display-lg text-tertiary">{counts.MEDIUM}</div>
          <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Cours MEDIUM</div>
        </div>
        <div className="flex flex-col items-center text-center border-l border-outline-variant pl-6 sm:pl-8">
          <div className="text-display-lg font-display-lg text-primary">{counts.LOW}</div>
          <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Cours LOW</div>
        </div>
      </div>

      <div className="sm:px-2">
        <div className="flex justify-between text-label-sm font-label-sm mb-2">
          <span className="text-on-surface-variant">Risque global</span>
          <span className={riskScoreStyles(avg).text}>{avg} / 100</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gradient-to-r from-primary via-tertiary to-error relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 bg-surface-container-highest transition-all duration-700 ease-out" style={{ width: `${Math.max(0, 100 - avg)}%` }} />
        </div>
        <div className="flex justify-between text-[10px] font-label-caps text-on-surface-variant mt-2 uppercase tracking-wide px-1">
          <span>Low</span><span className="ml-[12%]">Medium</span><span className="mr-[12%]">High</span><span>Critical</span>
        </div>
      </div>
    </div>
  );
};

const RiskCard = ({ course, risk, onClick }: { course: Course; risk: RiskAnalysis | undefined; onClick: () => void }) => {
  if (!risk) {
    return (
      <button onClick={onClick} className="card card-padded cursor-pointer hover:border-primary transition-colors">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full shrink-0" style={{ background: course.color }} />
          <span className="text-body-md font-body-md font-medium text-on-surface">{course.name}</span>
        </div>
        <div className="text-label-sm font-label-sm text-on-surface-variant mt-1 ml-6">Données insuffisantes</div>
      </button>
    );
  }

  const theme = riskScoreStyles(risk.overallScore);
  const factors = [
    { label: 'Performance', value: risk.details.performance },
    { label: 'Procrastination', value: risk.details.procrastination },
    { label: 'Pression examen', value: risk.details.pressure },
  ];

  return (
    <button onClick={onClick} className={`${theme.bg} card card-padded cursor-pointer hover:border-primary transition-colors`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ background: course.color }} />
          <span className="text-body-md font-body-md font-medium text-on-surface">{course.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-headline-md font-headline-md text-on-surface">{risk.overallScore}</span>
          <span className={`px-2 py-1 rounded text-label-caps font-label-caps ${theme.bg} ${theme.text}`}>{risk.level}</span>
        </div>
      </div>

      <div className="mt-4 space-y-3 ml-1 mr-1">
        {factors.map((f) => {
          const barColor = f.value >= 70 ? 'var(--color-error)' : f.value >= 40 ? 'var(--color-tertiary)' : 'var(--color-primary)';
          return (
            <div key={f.label} className="flex items-center gap-4">
              <span className="text-label-sm font-label-sm text-on-surface-variant w-[130px] shrink-0">{f.label}</span>
              <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${f.value}%`, backgroundColor: barColor }} />
              </div>
              <span className={`text-label-sm font-label-sm w-[28px] text-right shrink-0 ${f.value >= 70 ? 'text-error' : f.value >= 40 ? 'text-tertiary' : 'text-primary'}`}>
                {f.value}%
              </span>
            </div>
          );
        })}
      </div>
    </button>
  );
};

const Tips = ({ courses, risks }: { courses: Course[]; risks: (RiskAnalysis | undefined)[] }) => {
  const worstRisks = [...risks]
    .filter((r): r is RiskAnalysis => !!r && r.level !== 'LOW')
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, 3)
    .map((r) => ({ risk: r, course: courses.find((c) => c.id === r.courseId) }));

  if (worstRisks.length === 0) {
    return (
      <div className="card card-padded text-center text-on-surface-variant py-10 mt-8">
        <span className="material-symbols-outlined text-4xl mb-2 opacity-40 block mx-auto">celebration</span>
        <h3 className="text-body-md font-body-md font-medium text-on-surface mb-2">Aucun cours à risque</h3>
        <p className="text-body-md font-body-md text-on-surface-variant">Tout va bien ! Continue comme ça.</p>
      </div>
    );
  }

  return (
    <div className="card card-padded mt-8">
      <div className="flex items-center gap-2 text-label-caps font-label-caps text-on-surface-variant mb-6">
        <span className="material-symbols-outlined text-primary text-[18px]">shield</span>
        Conseils prioritaires
      </div>
      <div className="space-y-4">
        {worstRisks.map(({ risk, course }, i) => {
          const isLast = i === worstRisks.length - 1;
          const circleColor = riskScoreColor(risk.overallScore);

          let subTitle = '', message = '';
          if (risk.details.pressure >= 70) {
            subTitle = " — examen imminent";
            message = "Concentre-toi sur les révisions maintenant. Les autres tâches peuvent attendre.";
          } else if (risk.details.procrastination >= 60) {
            subTitle = " — tâches en attente";
            message = "Tu accumules du retard. Planifie au moins 1h aujourd'hui.";
          } else {
            subTitle = " — moyenne fragile";
            message = "Correcte mais un mauvais examen suffit à faire basculer le cours.";
          }

          return (
            <div className={`flex gap-4 py-4 ${!isLast ? 'border-b border-outline-variant' : ''}`}>
              <div className="w-3.5 h-3.5 rounded-full shrink-0 mt-1" style={{ background: circleColor }} />
              <div className="flex-1">
                <div className="text-body-md font-body-md font-medium text-on-surface mb-1">
                  {course?.name || 'Cours'}{subTitle}
                </div>
                <div className="text-label-sm font-label-sm text-on-surface-variant leading-relaxed">{message}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RiskPageContent = ({ courses, onCourseClick }: { courses: Course[]; onCourseClick: (id: string) => void }) => {
  const riskQueries = useQueries({
    queries: courses.map((course) => ({ queryKey: riskKeys.course(course.id), queryFn: () => riskApi.getCourseRisk(course.id), enabled: !!course.id })),
  });
  const risks = riskQueries.map((q) => q.data);
  const sortedCourses = [...courses].sort((a, b) => (risks.find(r => r?.courseId === b.id)?.overallScore || 0) - (risks.find(r => r?.courseId === a.id)?.overallScore || 0));

  return (
    <>
      <GlobalSummary risks={risks} />
      <div>
        <div className="text-label-caps font-label-caps text-on-surface-variant mb-4">Par cours</div>
        <div className="flex flex-col gap-3">
          {sortedCourses.map((course) => (
            <RiskCard key={course.id} course={course} risk={risks.find(r => r?.courseId === course.id)} onClick={() => onCourseClick(course.id)} />
          ))}
        </div>
      </div>
      <Tips courses={courses} risks={risks} />
    </>
  );
};

export default function RiskPage() {
  const navigate = useNavigate();
  const { data: courses = [], isLoading } = useCourses();
  const activeCourses = courses.filter((c) => !c.isDeleted);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4 p-2 pt-6">
        <div className="card animate-pulse h-10 w-48 mb-6" />
        <div className="card animate-pulse h-48" />
        <div className="space-y-4 mt-6">
          {[1, 2, 3].map((i) => <div key={i} className="card animate-pulse h-28" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 p-2 pt-2">
      <header className="mb-2">
        <h1 className="text-display-lg font-display-lg text-on-surface">Analyse de risque</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant mt-2">Mis à jour il y a 3 min — semestre en cours</p>
      </header>

      {activeCourses.length === 0 ? (
        <div className="card card-padded text-center py-20 mt-8">
          <span className="material-symbols-outlined text-5xl opacity-20 mx-auto mb-4 block">menu_book</span>
          <h2 className="text-headline-md font-headline-md text-on-surface mb-2">Aucun cours trouvé</h2>
          <p className="text-body-md font-body-md text-on-surface-variant max-w-md mx-auto mb-6">Ajoute tes cours pour afficher ton niveau de risque en temps réel.</p>
          <button onClick={() => navigate('/courses')} className="btn btn-outlined">Aller aux cours</button>
        </div>
      ) : (
        <RiskPageContent courses={activeCourses} onCourseClick={(id) => navigate(`/courses/${id}`)} />
      )}
    </div>
  );
}