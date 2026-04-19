interface WorksProgressProps {
    total: number;
    graded: number;
}

export const WorksProgress = ({ total, graded }: WorksProgressProps) => {
    if (total <= 0) return null;

    return (
        <div className="border border-[#E5E5E5] rounded-[16px] p-5 pb-6">
            <div className="flex justify-between items-center text-[13px] font-medium text-[#737373] mb-3">
                <span>Progression du semestre</span>
                <span>
                    {graded}
                    {' '}
                    /
                    {' '}
                    {total}
                    {' '}
                    notes
                </span>
            </div>
            <div className="h-[6px] w-full bg-[#E5E5E5] rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#1A1A1A] rounded-full transition-all duration-700"
                    style={{ width: `${Math.round((graded / total) * 100)}%` }}
                />
            </div>
        </div>
    );
};
