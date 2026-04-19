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
        : '-';

    const scoreColor = work.status === 'GRADED'
        ? getScoreColor(work.pointsEarned, work.pointsPossible)
        : 'text-[#A3A3A3]';

    return (
        <div
            onClick={() => onSelect(work)}
            className={`flex items-center px-5 py-4 cursor-pointer hover:bg-[#FAF9F6] transition-colors ${!isLast ? 'border-b border-[#E5E5E5]' : ''}`}
        >
            <div className="w-2.5 h-2.5 rounded-full shrink-0 mr-4" style={{ backgroundColor: course?.color || '#A3A3A3' }} />

            <div className="flex-1 min-w-0 pr-4">
                <div className="text-[15px] font-bold text-[#1A1A1A] truncate mb-0.5">
                    {work.title}
                </div>
                <div className="text-[13px] font-medium text-[#737373] truncate">
                    {course?.name || 'Général'}
                    {' '}
                    ·
                    {' '}
                    {work.workTypeLabel || 'PROJET'}
                    {' '}
                    ·
                    {' '}
                    {formatDueDate(work.dueDate)}
                </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
                <div className={`px-2.5 py-1 rounded-[6px] text-[11px] font-bold tracking-wide ${badge.className}`}>
                    {badge.label}
                </div>
                <div className={`text-[17px] font-bold w-[72px] text-right ${scoreColor}`}>
                    {scoreDisplay}
                </div>
            </div>
        </div>
    );
};

export const WorksList = ({ works, courses, onSelectWork }: WorksListProps) => {
    return (
        <div className="bg-white rounded-[16px] border border-[#E5E5E5] flex flex-col pt-1 pb-1 mb-6">
            {works.length === 0 ? (
                <div className="p-8 text-center text-[#A3A3A3] text-[14px] font-medium">
                    Aucun travail trouvé.
                </div>
            ) : (
                works.map((work, index) => {
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
                })
            )}
        </div>
    );
};
