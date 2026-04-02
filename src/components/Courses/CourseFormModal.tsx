import React, { useState } from 'react';
import { addDays, startOfWeek } from 'date-fns';
import { useCreateCourse, useUpdateCourse, useDeleteCourse } from '../../hooks/useCourses';
import { useCreateEvent } from '../../hooks/useEvents';
import type { Course, EventType } from '../../types';

// ─── Constants ──────────────────────────────────────────────
const COLORS = [
    '#3B82F6', '#F59E0B', '#10B981',
    '#8B5CF6', '#EF4444', '#EC4899', '#14B8A6',
];

const WEEK_DAYS = [
    { label: 'Lun', value: 1 },
    { label: 'Mar', value: 2 },
    { label: 'Mer', value: 3 },
    { label: 'Jeu', value: 4 },
    { label: 'Ven', value: 5 },
];

const SLOT_TYPES = ['CM', 'TD', 'TP'];

// ─── Interfaces ─────────────────────────────────────────────
interface Slot {
    id: string;
    type: string;
    days: number[]; // 1=Lun, 2=Mar, etc.
    startTime: string;
    endTime: string;
}

interface CourseFormModalProps {
    course?: Course | null;
    onClose: () => void;
}

export default function CourseFormModal({ course, onClose }: CourseFormModalProps) {
    const isEditMode = !!course;
    const { mutateAsync: createCourse, isPending: isCreatingCourse } = useCreateCourse();
    const { mutateAsync: updateCourse, isPending: isUpdatingCourse } = useUpdateCourse();
    const { mutate: deleteCourse } = useDeleteCourse();
    const { mutateAsync: createEvent } = useCreateEvent();

    const [form, setForm] = useState({
        name: course?.name || '',
        code: course?.code || '',
        credits: course?.credits || 3,
        color: course?.color || COLORS[0],
    });

    const [addToSchedule, setAddToSchedule] = useState(false);
    const [slots, setSlots] = useState<Slot[]>([
        { id: Math.random().toString(), type: 'CM', days: [1], startTime: '08:00', endTime: '10:00' }
    ]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSlot = () => {
        setSlots(prev => [
            ...prev,
            { id: Math.random().toString(), type: 'TD', days: [], startTime: '14:00', endTime: '16:00' }
        ]);
    };

    const handleUpdateSlot = (id: string, updates: Partial<Slot>) => {
        setSlots(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const handleToggleDay = (slotId: string, dayValue: number) => {
        setSlots(prev => prev.map(s => {
            if (s.id !== slotId) return s;
            const hasDay = s.days.includes(dayValue);
            return {
                ...s,
                days: hasDay ? s.days.filter(d => d !== dayValue) : [...s.days, dayValue]
            };
        }));
    };

    const handleDeleteSlot = (id: string) => {
        setSlots(prev => prev.filter(s => s.id !== id));
    };

    const getPreviewEvents = () => {
        const previews: { day: number; str: string; type: string }[] = [];
        slots.forEach(slot => {
            slot.days.forEach(day => {
                const dayLabel = WEEK_DAYS.find(d => d.value === day)?.label;
                const formatTime = (t: string) => t.replace(':', 'h').replace('h00', 'h');
                previews.push({
                    day,
                    type: slot.type,
                    str: `${dayLabel} ${formatTime(slot.startTime)}–${formatTime(slot.endTime)} (${slot.type})`
                });
            });
        });
        previews.sort((a, b) => a.day - b.day);
        return previews;
    };

    const previewItems = getPreviewEvents();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            let courseId = course?.id;

            if (isEditMode && courseId) {
                await updateCourse({ id: courseId, payload: { ...form, credits: Number(form.credits) } });
            } else {
                const newCourse = await createCourse({ ...form, credits: Number(form.credits) });
                courseId = newCourse.id;

                if (addToSchedule && slots.length > 0) {
                    const WEEKS_TO_GENERATE = 15;
                    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
                    const eventPromises: Promise<any>[] = [];

                    for (let week = 0; week < WEEKS_TO_GENERATE; week++) {
                        for (const slot of slots) {
                            for (const dayValue of slot.days) {
                                const targetDate = addDays(startDate, (week * 7) + (dayValue - 1));
                                const [startH, startM] = slot.startTime.split(':');
                                const [endH, endM] = slot.endTime.split(':');

                                const start = new Date(targetDate);
                                start.setHours(Number(startH), Number(startM), 0, 0);

                                const end = new Date(targetDate);
                                end.setHours(Number(endH), Number(endM), 0, 0);

                                let eventType: EventType = 'CLASS';
                                if (slot.type === 'TP') eventType = 'TP';

                                eventPromises.push(
                                    createEvent({
                                        courseId,
                                        title: `${form.name} - ${slot.type}`,
                                        type: eventType,
                                        startDate: start.toISOString(),
                                        endDate: end.toISOString(),
                                        isAllDay: false
                                    })
                                );
                            }
                        }
                    }
                    await Promise.allSettled(eventPromises);
                }
            }
            onClose();
        } catch (error) {
            console.error("Erreur lors de la soumission du cours:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 sm:p-6 bg-black/30 backdrop-blur-[2px]">
            <div className="bg-white w-full max-w-[560px] max-h-[95vh] overflow-y-auto rounded-[24px] p-8 shadow-2xl relative scrollbar-hide">
                
                <h2 className="text-[22px] font-bold text-[#1A1A1A] mb-8">
                    {isEditMode ? 'Modifier le cours' : 'Nouveau cours'}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* TOP SECTION: Name and Code */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                                Nom du cours
                            </label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Algorithmique"
                                required
                                className="w-full h-[46px] px-4 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] outline-none focus:border-[#A3A3A3] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                                Code
                            </label>
                            <input
                                name="code"
                                value={form.code}
                                onChange={handleChange}
                                placeholder="ALGO201"
                                required
                                className="w-full h-[46px] px-4 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] outline-none focus:border-[#A3A3A3] transition-colors"
                            />
                        </div>
                    </div>

                    {/* MID SECTION: Credits and Color */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                                Crédits
                            </label>
                            <input
                                name="credits"
                                type="number"
                                min={1}
                                max={10}
                                value={form.credits}
                                onChange={handleChange}
                                className="w-full h-[46px] px-4 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] outline-none focus:border-[#A3A3A3] transition-colors"
                            />
                        </div>
                        <div className="md:col-span-2 gap-4">
                            <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                                Couleur
                            </label>
                            <div className="flex items-center h-[46px] gap-3">
                                {COLORS.map((c) => (
                                    <button
                                        key={c}
                                        type="button"
                                        onClick={() => setForm(prev => ({ ...prev, color: c }))}
                                        className="w-[20px] h-[20px] rounded-full transition-all relative flex items-center justify-center shrink-0"
                                        style={{ background: c }}
                                    >
                                        {/* Outer black border if selected */}
                                        {form.color === c && (
                                            <div className="absolute -inset-[3px] rounded-full border border-[#1A1A1A]" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {!isEditMode && (
                        <>
                            <div className="w-full h-px bg-[#E5E5E5] my-2" />

                            {/* SCHEDULE TOGGLE */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-[15px] font-bold text-[#1A1A1A] mb-0.5">Ajouter à l'emploi du temps</div>
                                    <div className="text-[13px] text-[#737373]">Crée les événements récurrents dans l'agenda</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        value="" 
                                        className="sr-only peer" 
                                        checked={addToSchedule}
                                        onChange={(e) => setAddToSchedule(e.target.checked)}
                                    />
                                    <div className="w-[42px] h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                </label>
                            </div>

                            {/* SLOTS LIST */}
                            {addToSchedule && (
                                <div className="flex flex-col gap-4">
                                    
                                    {slots.map((slot) => (
                                        <div key={slot.id} className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] p-5 relative flex items-center gap-6">
                                            
                                            {/* Type */}
                                            <div className="w-6 shrink-0 text-center">
                                                <select 
                                                    value={slot.type}
                                                    onChange={(e) => handleUpdateSlot(slot.id, { type: e.target.value })}
                                                    className="appearance-none bg-transparent text-[13px] font-bold text-[#737373] outline-none cursor-pointer w-full text-center"
                                                >
                                                    {SLOT_TYPES.map(st => <option key={st}>{st}</option>)}
                                                </select>
                                            </div>

                                            {/* Days (Grid) */}
                                            <div className="grid grid-cols-2 gap-2 w-[110px]">
                                                {WEEK_DAYS.map(day => {
                                                    const isActive = slot.days.includes(day.value);
                                                    return (
                                                        <button
                                                            key={day.value}
                                                            type="button"
                                                            onClick={() => handleToggleDay(slot.id, day.value)}
                                                            className={`h-8 text-[13px] font-medium rounded-lg border transition-colors flex items-center justify-center
                                                                ${isActive 
                                                                    ? 'bg-white text-[#1A1A1A] border-[#A3A3A3] shadow-sm' 
                                                                    : 'bg-transparent text-[#1A1A1A] border-[#E5E5E5] hover:border-[#A3A3A3]'}
                                                            `}
                                                        >
                                                            {day.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            {/* Flex spacing */}
                                            <div className="flex-1" />

                                            {/* Time block */}
                                            <div className="flex items-center gap-2">
                                                <div className="relative flex items-center bg-white border border-[#E5E5E5] rounded-lg h-9 w-[80px] px-3">
                                                    <input 
                                                        type="time" 
                                                        value={slot.startTime} 
                                                        onChange={(e) => handleUpdateSlot(slot.id, { startTime: e.target.value })}
                                                        className="w-full text-[14px] font-medium text-[#1A1A1A] bg-transparent outline-none z-10"
                                                    />
                                                    <svg className="absolute right-2 w-4 h-4 text-[#1A1A1A] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 7v5l3 2" />
                                                    </svg>
                                                </div>
                                                <span className="text-[#A3A3A3] text-sm">→</span>
                                                <div className="relative flex items-center bg-white border border-[#E5E5E5] rounded-lg h-9 w-[80px] px-3">
                                                    <input 
                                                        type="time" 
                                                        value={slot.endTime} 
                                                        onChange={(e) => handleUpdateSlot(slot.id, { endTime: e.target.value })}
                                                        className="w-full text-[14px] font-medium text-[#1A1A1A] bg-transparent outline-none z-10"
                                                    />
                                                    <svg className="absolute right-2 w-4 h-4 text-[#1A1A1A] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 7v5l3 2" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Delete Slot Btn */}
                                            <button 
                                                type="button" 
                                                onClick={() => handleDeleteSlot(slot.id)}
                                                className="absolute right-3.5 text-[#A3A3A3] hover:text-[#E74C3C] text-lg w-5 h-5 flex items-center justify-center transition-colors pb-0.5"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={handleAddSlot}
                                        className="w-full py-3.5 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] hover:bg-gray-50 transition-colors"
                                    >
                                        + Ajouter un créneau
                                    </button>

                                    {/* Aperçu */}
                                    {previewItems.length > 0 && (
                                        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[16px] p-4 mt-2">
                                            <div className="text-[12px] text-[#737373] font-medium mb-3">Aperçu — événements générés</div>
                                            <div className="flex flex-wrap gap-2.5 mb-2">
                                                {previewItems.map((item, idx) => (
                                                    <div key={idx} className="bg-[#EFF6FF] text-[#3B82F6] px-2.5 py-1 rounded-[6px] text-[13px] font-bold border border-[#DBEAFE]">
                                                        {item.str}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-[12px] text-[#737373]">· chaque semaine</div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    <div className="w-full h-px bg-[#E5E5E5] mt-4" />

                    {/* ACTIONS */}
                    <div className="flex justify-between items-center mt-2">
                        {isEditMode ? (
                            <button 
                                type="button" 
                                onClick={() => {
                                    if (confirm(`Supprimer le cours "${course?.name}" ? Toutes les données associées seront perdues.`)) {
                                        deleteCourse(course!.id);
                                        onClose();
                                    }
                                }}
                                className="text-[13px] font-bold text-[#EF4444] hover:opacity-70 px-2"
                            >
                                Supprimer
                            </button>
                        ) : (
                            <button 
                                type="button" 
                                onClick={onClose}
                                className="w-[42px] h-[42px] flex items-center justify-center rounded-full border border-[#E5E5E5] text-[#737373] hover:bg-gray-50 transition-colors font-bold text-lg"
                            >
                                ↓
                            </button>
                        )}
                        <div className="flex gap-3">
                            <button 
                                type="button" 
                                onClick={onClose} 
                                className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] hover:bg-gray-50 bg-white shadow-sm transition-colors"
                            >
                                Annuler
                            </button>
                            <button 
                                type="submit" 
                                disabled={isSubmitting || isCreatingCourse || isUpdatingCourse} 
                                className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[15px] font-medium text-[#1A1A1A] hover:bg-gray-50 bg-white shadow-sm transition-colors flex items-center justify-center min-w-[140px]"
                            >
                                {isSubmitting || isCreatingCourse || isUpdatingCourse
                                    ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    : isEditMode ? 'Enregistrer' : 'Créer le cours'
                                }
                            </button>
                        </div>
                    </div>

                </form>
            </div>
            
            {/* Global style to hide native time picker icons */}
            <style>{`
                input[type="time"]::-webkit-calendar-picker-indicator {
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}
