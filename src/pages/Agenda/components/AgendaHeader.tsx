import { format, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import type { AgendaViewMode } from '../agendaShared';

interface AgendaHeaderProps {
    currentDate: Date;
    viewMode: AgendaViewMode;
    onPrevious: () => void;
    onNext: () => void;
    onToday: () => void;
    onViewModeChange: (viewMode: AgendaViewMode) => void;
    onCreateEvent: () => void;
}

const viewOptions: Array<{ label: string; value: AgendaViewMode }> = [
    { label: 'Mois', value: 'month' },
    { label: 'Semaine', value: 'week' },
    { label: 'Jour', value: 'day' },
];

export function AgendaHeader({
    currentDate,
    viewMode,
    onPrevious,
    onNext,
    onToday,
    onViewModeChange,
    onCreateEvent,
}: AgendaHeaderProps) {
    const title =
        viewMode === 'month'
            ? format(currentDate, 'MMMM yyyy', { locale: fr })
            : `Sem. du ${format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'd MMM', { locale: fr })}`;

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 mt-2">
            <div className="flex items-center justify-between md:justify-start gap-2 md:gap-4">
                <button
                    onClick={onPrevious}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50 transition-colors bg-white shadow-sm"
                >
                    <ChevronLeft size={18} />
                </button>
                <span className="text-[26px] font-bold text-[#1A1A1A] capitalize tracking-tight min-w-[160px] text-center">
                    {title}
                </span>
                <button
                    onClick={onNext}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50 transition-colors bg-white shadow-sm"
                >
                    <ChevronRight size={18} />
                </button>

                <button
                    onClick={onToday}
                    className="px-4 h-10 ml-2 rounded-xl border border-[#E5E5E5] text-[#1A1A1A] font-bold text-[14px] hover:bg-gray-50 bg-white shadow-sm transition-colors"
                >
                    Aujourd'hui
                </button>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex rounded-xl border border-[#E5E5E5] overflow-hidden bg-[#FAF9F6] p-1 gap-1">
                    {viewOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => onViewModeChange(option.value)}
                            className={`px-4 py-[6px] rounded-[8px] text-[13px] font-bold transition-colors ${viewMode === option.value ? 'bg-white text-[#1A1A1A] shadow-sm' : 'bg-transparent text-[#737373] hover:text-[#1A1A1A]'}`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
                <button
                    onClick={onCreateEvent}
                    className="px-4 py-2.5 md:px-5 rounded-xl border border-[#E5E5E5] bg-white text-[15px] font-bold text-[#1A1A1A] hover:bg-gray-50 shadow-sm transition-colors whitespace-nowrap flex items-center justify-center gap-2"
                >
                    <Plus size={16} />
                    <span className="hidden md:inline">Événement</span>
                </button>
            </div>
        </div>
    );
}
