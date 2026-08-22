interface WorksProgressProps {
  total: number;
  graded: number;
}

export const WorksProgress = ({ total, graded }: WorksProgressProps) => {
  if (total <= 0) return null;

  return (
    <div className="card card-padded">
      <div className="flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant mb-3">
        <span>Progression du semestre</span>
        <span>{graded} / {total} travaux notés</span>
      </div>
      <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${Math.round((graded / total) * 100)}%` }} />
      </div>
    </div>
  );
};