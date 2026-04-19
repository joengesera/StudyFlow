import { Plus } from 'lucide-react';
import type { WorksStats } from '../worksShared';

interface WorksHeaderProps {
    stats: WorksStats;
    onCreate: () => void;
}

export const WorksHeader = ({ stats, onCreate }: WorksHeaderProps) => {
    return (
        <div className="flex items-start justify-between mb-6">
            <div>
                <h1 className="text-[28px] font-bold text-[#1A1A1A] tracking-tight mb-1">
                    Travaux
                </h1>
                <div className="text-[14px] font-medium text-[#737373]">
                    {stats.total}
                    {' '}
                    travaux ·
                    {' '}
                    {stats.planned}
                    {' '}
                    à rendre
                </div>
            </div>
            <button
                onClick={onCreate}
                className="h-[44px] px-5 bg-white border border-[#E5E5E5] rounded-[12px] flex items-center justify-center gap-2 hover:bg-[#FAF9F6] transition-colors shadow-sm text-[14px] font-bold text-[#1A1A1A]"
            >
                <Plus size={18} />
                Ajouter un travail
            </button>
        </div>
    );
};
