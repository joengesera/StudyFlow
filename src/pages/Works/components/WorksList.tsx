import type { Course, Work } from '../../../types';
import { formatDueDate, getScoreColor, getStatusBadge } from '../worksShared';

interface WorksListProps {
  works: Work[];
  courses: Course[];
  onSelectWork: (work: Work) => void;
}

const WorkRow = ({
  work,
  isLast,
  course,
  onSelect,
}: {
  work: Work;
  isLast: boolean;
  course: Course | undefined;
  onSelect: (work: Work) => void;
}) => {
  const badge = getStatusBadge(work.status);
  const scoreDisplay = work.status === 'GRADED' && work.pointsEarned != null && work.pointsPossible != null
    ? `${work.pointsEarned.toFixed(1)} / ${work.pointsPossible}`
    : '—';

  const scoreColor = work.status === 'GRADED' ? getScoreColor(work.pointsEarned, work.pointsPossible) : 'text-on-surface-variant';

  return (
    <button
      onClick={() => onSelect(work)}
      className={`flex items-center p-4 w-full text-left hover:bg-surface-container-low transition-colors ${!isLast ? 'border-b border-outline-variant' : ''}`}
    >
      <div className="w-2.5 h-2.5 rounded-full shrink-0 me-4" style={{ backgroundColor: course?.color || 'var(--color-on-surface)' }} />

      <div className="flex-1 min-w-0 pr-4">
        <div className="text-body-md font-body-md font-medium text-on-surface truncate mb-1">{work.title}</div>
        <div className="text-label-sm font-label-sm text-on-surface-variant truncate flex items-center gap-1.5">
          <span>{course?.name || 'Général'}</span>
          <span className="w-1 h-1 bg-outline-variant rounded-full" />
          <span>{work.workTypeLabel || 'PROJET'}</span>
          <span className="w-1 h-1 bg-outline-variant rounded-full" />
          <span>{formatDueDate(work.dueDate)}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <span className={`px-2.5 py-1 rounded text-label-caps font-label-caps ${badge.bg}`}>
          {badge.label}
        </span>
        <div className={`text-headline-sm font-headline-sm w-[72px] text-right ${scoreColor}`}>
          {scoreDisplay}
        </div>
      </div>
    </button>
  );
};

export const WorksList = ({ works, courses, onSelectWork }: WorksListProps) => {
  if (works.length === 0) {
    return (
      <div className="card card-padded text-center text-on-surface-variant py-10">
        <span className="material-symbols-outlined text-4xl mb-2 block text-outline">assignment</span>
        <p className="text-body-md font-body-md">Aucun travail trouvé.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="p-card-padding border-b border-outline-variant bg-surface-bright">
        <h3 className="text-label-caps font-label-caps text-on-surface-variant">Liste des travaux</h3>
      </div>
      <div className="divide-y divide-outline-variant">
        {works.map((work, index) => {
          const course = courses.find((item) => item.id === work.courseId);
          return (
            <WorkRow
              key={work.id}
              work={work}
              isLast={index === works.length - 1}
              course={course}
              onSelect={onSelectWork}
            />
          );
        })}
      </div>
    </div>
  );
};