interface TimerRingProps {
  progress: number;
  formatted: string;
  phase: 'work' | 'break';
  size?: number;
}

export const TimerRing = ({ progress, formatted, phase, size = 128 }: TimerRingProps) => {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="5" className="text-outline-variant" />
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={`${circumference * (1 - progress / 100)}`}
          strokeLinecap="round"
          className={phase === 'work' ? 'text-primary' : 'text-tertiary'}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-display-lg text-on-surface tabular-nums tracking-tight"
          style={{ fontSize: size >= 200 ? '3.25rem' : undefined }}
        >
          {formatted}
        </span>
      </div>
    </div>
  );
};
