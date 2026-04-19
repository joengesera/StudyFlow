import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import type { Task } from '../../../types';
import type { Column, TaskColumnDef } from '../taskShared';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
    column: TaskColumnDef;
    tasks: Task[];
    courses: Record<string, string>;
    onSelect: (task: Task) => void;
    selectedTaskId: string | null;
    onAddTask: (status: Column) => void;
}

export const KanbanColumn = ({
    column,
    tasks,
    courses,
    onSelect,
    selectedTaskId,
    onAddTask,
}: KanbanColumnProps) => {
    const { setNodeRef } = useDroppable({ id: column.key });

    return (
        <div className={`flex h-full min-h-0 flex-1 flex-col min-w-[300px] rounded-[24px] border border-[#E5E5E5] p-2.5 pt-4 ${column.bg}`}>
            <div className="flex items-center gap-2 mb-4 px-3">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: column.dot }} />
                <span className="text-[15px] font-bold text-[#1A1A1A]">{column.label}</span>
                <span className="bg-white border border-[#E5E5E5] text-[13px] font-bold text-[#1A1A1A] px-2 py-0.5 rounded-full ml-1">
                    {tasks.length}
                </span>
            </div>

            <div ref={setNodeRef} className="flex flex-col flex-1 min-h-[150px] overflow-y-auto scrollbar-hide px-1">
                <SortableContext
                    items={tasks.map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            courseName={task.courseId ? courses[task.courseId] : undefined}
                            onSelect={onSelect}
                            isSelected={selectedTaskId === task.id}
                        />
                    ))}
                </SortableContext>

                <button
                    onClick={() => onAddTask(column.key)}
                    className="w-full py-3 rounded-[12px] border border-[#E5E5E5] text-[14px] font-medium text-[#737373] mt-2 mb-2 bg-transparent hover:bg-white transition-colors"
                >
                    + Ajouter
                </button>
            </div>
        </div>
    );
};
