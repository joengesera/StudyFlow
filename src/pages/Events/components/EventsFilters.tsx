import type { Course, EventType } from '../../../types';
import { eventTypeLabel } from '../../../lib/eventMeta';
import type { EventsHorizonFilter } from '../eventsShared';

interface EventsFiltersProps {
  courses: Course[];
  typeFilter: EventType | 'ALL';
  courseFilter: string | null;
  horizonFilter: EventsHorizonFilter;
  onTypeFilterChange: (value: EventType | 'ALL') => void;
  onCourseFilterToggle: (courseId: string) => void;
  onHorizonFilterChange: (value: EventsHorizonFilter) => void;
}

const horizonOptions: { value: EventsHorizonFilter; label: string }[] = [
  { value: 'ALL', label: 'Tous' },
  { value: 'UPCOMING', label: 'À venir' },
  { value: 'TODAY', label: "Aujourd'hui" },
  { value: 'PAST', label: 'Passés' },
];

export const EventsFilters = ({
  courses,
  typeFilter,
  courseFilter,
  horizonFilter,
  onTypeFilterChange,
  onCourseFilterToggle,
  onHorizonFilterChange,
}: EventsFiltersProps) => {
  return (
    <div className="space-y-3 mb-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtres par période">
        {horizonOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onHorizonFilterChange(option.value)}
            className={`btn ${horizonFilter === option.value ? 'btn-primary' : 'btn-outlined'}`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={typeFilter}
          onChange={(e) => onTypeFilterChange(e.target.value as EventType | 'ALL')}
          className="input input-bordered h-10 text-base w-auto"
          aria-label="Filtrer par type"
        >
          <option value="ALL">Tous les types</option>
          {Object.entries(eventTypeLabel).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <div className="w-[1px] h-6 bg-outline-variant self-center mx-1" />

        {courses.slice(0, 5).map((course) => (
          <button
            key={course.id}
            onClick={() => onCourseFilterToggle(course.id)}
            className={`btn flex items-center gap-2 ${courseFilter === course.id ? 'btn-primary' : 'btn-outlined'}`}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: course.color }} />
            {course.name}
          </button>
        ))}
      </div>
    </div>
  );
};