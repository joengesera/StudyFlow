import type { WorksStats } from '../worksShared';

interface WorksStatsCardsProps {
    stats: WorksStats;
}

export const WorksStatsCards = ({ stats }: WorksStatsCardsProps) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] py-5 flex flex-col items-center justify-center">
                <div className="text-[26px] font-bold text-[#1A1A1A] leading-tight">
                    {stats.avg}
                </div>
                <div className="text-[13px] font-medium text-[#737373] mt-1">Moy. générale</div>
            </div>
            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] py-5 flex flex-col items-center justify-center">
                <div className="text-[26px] font-bold text-[#B45309] leading-tight">
                    {stats.planned}
                </div>
                <div className="text-[13px] font-medium text-[#737373] mt-1">À rendre</div>
            </div>
            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] py-5 flex flex-col items-center justify-center">
                <div className="text-[26px] font-bold text-[#15803D] leading-tight">
                    {stats.graded}
                </div>
                <div className="text-[13px] font-medium text-[#737373] mt-1">Notés</div>
            </div>
            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] py-5 flex flex-col items-center justify-center">
                <div className="text-[26px] font-bold text-[#1D4ED8] leading-tight">
                    {stats.submitted}
                </div>
                <div className="text-[13px] font-medium text-[#737373] mt-1">Soumis</div>
            </div>
        </div>
    );
};
