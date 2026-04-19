import { useMemo, useState } from 'react';
import { useWorks, useCreateWork, useUpdateWork, useDeleteWork } from '../../hooks/useWorks';
import { useCourses } from '../../hooks/useCourses';
import type { Work } from '../../types';
import { WorkModal } from './components/WorkModal';
import { WorksFilters } from './components/WorksFilters';
import { WorksHeader } from './components/WorksHeader';
import { WorksList } from './components/WorksList';
import { WorksProgress } from './components/WorksProgress';
import { WorksStatsCards } from './components/WorksStatsCards';
import { computeWorksStats, filterAndSortWorks, type WorksStatusFilter } from './worksShared';

export default function WorksPage() {
    const { data: works = [], isLoading } = useWorks();
    const { data: courses = [] } = useCourses();
    const { mutate: createWork } = useCreateWork();
    const { mutate: updateWork } = useUpdateWork();
    const { mutate: deleteWork } = useDeleteWork();

    const [selectedWork, setSelectedWork] = useState<Work | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [statusFilter, setStatusFilter] = useState<WorksStatusFilter>('ALL');
    const [courseFilter, setCourseFilter] = useState<string | null>(null);

    const stats = useMemo(() => computeWorksStats(works), [works]);
    const filteredWorks = useMemo(
        () => filterAndSortWorks(works, statusFilter, courseFilter),
        [works, statusFilter, courseFilter],
    );

    const closeModal = () => {
        setSelectedWork(null);
        setIsCreating(false);
    };

    const handleSave = (form: Partial<Work>) => {
        if (selectedWork) {
            updateWork({ id: selectedWork.id, payload: form });
        } else {
            createWork(form);
        }
        closeModal();
    };

    const handleDelete = (id: string) => {
        deleteWork(id);
        closeModal();
    };

    if (isLoading) {
        return <div className="p-8 text-center text-[#A3A3A3]">Chargement des travaux...</div>;
    }

    return (
        <div className="flex flex-col max-w-[900px] mx-auto pb-12 pt-4 px-2 sm:px-4">
            <WorksHeader
                stats={stats}
                onCreate={() => {
                    setSelectedWork(null);
                    setIsCreating(true);
                }}
            />

            <WorksStatsCards stats={stats} />

            <WorksFilters
                courses={courses}
                statusFilter={statusFilter}
                courseFilter={courseFilter}
                onStatusFilterChange={setStatusFilter}
                onCourseFilterToggle={(courseId) => {
                    setCourseFilter((current) => (current === courseId ? null : courseId));
                }}
            />

            <WorksList
                works={filteredWorks}
                courses={courses}
                onSelectWork={setSelectedWork}
            />

            <WorksProgress total={stats.total} graded={stats.graded} />

            {(selectedWork || isCreating) && (
                <WorkModal
                    work={selectedWork}
                    courses={courses}
                    onClose={closeModal}
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
