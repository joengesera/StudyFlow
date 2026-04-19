import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock3 } from 'lucide-react';
import type { Task } from '../../../types';
import { formatDueDate, getDueDateColor, priorityColor } from '../taskShared';

interface TaskCardProps {
    task: Task;
    courseName?: string;
    onSelect: (task: Task) => void;
    isSelected: boolean;
}

const priorityBadgeMap: Record<Task['priority'], { label: string; bg: string; text: string }> = {
    LOW: { label: 'Faible', bg: '#ECFDF5', text: '#10B981' },
    MEDIUM: { label: 'Moyenne', bg: '#FEF9C3', text: '#CA8A04' },
    HIGH: { label: 'Haute', bg: '#FFF3E0', text: '#F97316' },
    CRITICAL: { label: 'Critique', bg: '#FDF2F2', text: '#E74C3C' },
};

export const TaskCard = ({ task, courseName, onSelect, isSelected }: TaskCardProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useSortable({ id: task.id });

    const isCompleted = task.status === 'COMPLETED';
    const priorityBadge = priorityBadgeMap[task.priority];
    const cardDotColor = (() => {
        if (task.status === 'PENDING') return '#737373';
        if (task.status === 'IN_PROGRESS') return '#F59E0B';
        if (task.status === 'COMPLETED') return '#10B981';
        if (task.status === 'CANCELED') return '#A3A3A3';
        return priorityColor[task.priority] || '#A3A3A3';
    })();

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: 'all 0.2s ease',
        opacity: isDragging ? 0.3 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => onSelect(task)}
            className={`
                bg-white rounded-[16px] p-4 mb-3 border cursor-grab active:cursor-grabbing select-none transition-shadow hover:shadow-sm
                ${isSelected ? 'ring-2 ring-blue-500 border-transparent' : 'border-[#E5E5E5]'}
            `}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    {isCompleted ? (
                        <div className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center shrink-0">
                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 14 14" fill="none">
                                <path d="M2 7L6 11L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    ) : (
                        <div
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ background: cardDotColor }}
                        />
                    )}
                    <div className={`text-[15px] font-bold mt-0.5 leading-tight ${isCompleted ? 'text-[#A3A3A3] line-through' : 'text-[#1A1A1A]'}`}>
                        {task.title}
                    </div>
                </div>
                {task.timeSpentMinutes > 0 && (
                    <div className="text-[13px] font-medium text-[#737373] shrink-0 whitespace-nowrap ml-2 mt-0.5 flex items-center gap-1">
                        <Clock3 size={14} className="text-[#A3A3A3]" />
                        {task.timeSpentMinutes}
                        min
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                    <div className={`px-2.5 py-1 rounded-[6px] text-[12px] font-bold ${isCompleted ? 'bg-[#FAF9F6] text-[#A3A3A3]' : 'bg-[#FAF9F6] text-[#737373]'}`}>
                        {courseName || 'General'}
                    </div>
                    <div
                        className="px-2.5 py-1 rounded-[6px] text-[12px] font-bold whitespace-nowrap"
                        style={{ background: priorityBadge.bg, color: priorityBadge.text }}
                    >
                        {priorityBadge.label}
                    </div>
                </div>
                {task.dueDate && !isCompleted && (
                    <div className={`text-[12px] font-bold ${getDueDateColor(task.dueDate)}`}>
                        {formatDueDate(task.dueDate)}
                    </div>
                )}
            </div>
        </div>
    );
};
