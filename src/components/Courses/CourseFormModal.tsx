import React, { useRef, useState } from 'react';
import { addDays, startOfWeek } from 'date-fns';
import { useCreateCourse, useUpdateCourse, useDeleteCourse, useCourses } from '../../hooks/useCourses';
import { useCreateEvent } from '../../hooks/useEvents';
import type { Course, EventType } from '../../types';
import { generateCourseCode, generateRandomCourseColor } from '../../utils/courseMeta';

// ─── Constants ──────────────────────────────────────────────
const WEEK_DAYS = [
    { label: 'Lun', value: 1 },
    { label: 'Mar', value: 2 },
    { label: 'Mer', value: 3 },
    { label: 'Jeu', value: 4 },
    { label: 'Ven', value: 5 },
    { label: 'Sam', value: 6 },
];

const SLOT_TYPES = ['CM', 'TD', 'TP'];

// ─── Interfaces ─────────────────────────────────────────────
interface TimeSlot {
    id: string;
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
    const { data: existingCourses = [] } = useCourses();

    const [form, setForm] = useState(() => ({
        name: course?.name || '',
        code: course?.code || '',
        credits: course?.credits || 3,
        color: course?.color || generateRandomCourseColor(existingCourses.map((c) => c.color)),
    }));
    const codeTouchedRef = useRef(isEditMode);

    const [addToSchedule, setAddToSchedule] = useState(false);
    const [sessionType, setSessionType] = useState<'CM' | 'TD' | 'TP'>('CM');
    const [selectedDays, setSelectedDays] = useState<number[]>([1]);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
        { id: Math.random().toString(), startTime: '08:00', endTime: '10:00' }
    ]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => {
            if (name === 'name' && !codeTouchedRef.current) {
                return { ...prev, name: value, code: generateCourseCode(value) };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleAddSlot = () => {
        setTimeSlots(prev => [
            ...prev,
            { id: Math.random().toString(), startTime: '09:00', endTime: '10:00' }
        ]);
    };

    const handleUpdateSlot = (id: string, field: 'startTime' | 'endTime', value: string) => {
        setTimeSlots(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleToggleDay = (dayValue: number) => {
        setSelectedDays(prev =>
            prev.includes(dayValue) ? prev.filter(d => d !== dayValue) : [...prev, dayValue]
        );
    };

    const handleDeleteSlot = (id: string) => {
        setTimeSlots(prev => prev.length > 1 ? prev.filter(s => s.id !== id) : prev);
    };

    const getPreviewEvents = () => {
        const previews: { day: number; str: string }[] = [];
        timeSlots.forEach(slot => {
            selectedDays.forEach(day => {
                const dayLabel = WEEK_DAYS.find(d => d.value === day)?.label;
                const formatTime = (t: string) => t.replace(':', 'h').replace('h00', 'h');
                previews.push({
                    day,
                    str: `${dayLabel} ${formatTime(slot.startTime)}–${formatTime(slot.endTime)} (${sessionType})`
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

                if (addToSchedule && timeSlots.length > 0) {
                    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
                    const eventPromises: Promise<unknown>[] = [];

                    for (const slot of timeSlots) {
                        for (const dayValue of selectedDays) {
                            const targetDate = addDays(startDate, dayValue - 1);
                            const [startH, startM] = slot.startTime.split(':');
                            const [endH, endM] = slot.endTime.split(':');

                            const start = new Date(targetDate);
                            start.setHours(Number(startH), Number(startM), 0, 0);

                            const end = new Date(targetDate);
                            end.setHours(Number(endH), Number(endM), 0, 0);

                            let eventType: EventType = 'CLASS';
                            if (sessionType === 'TP') eventType = 'TP';

                            eventPromises.push(
                                createEvent({
                                    courseId,
                                    title: `${form.name} - ${sessionType}`,
                                    type: eventType,
                                    startDate: start.toISOString(),
                                    endDate: end.toISOString(),
                                    isAllDay: false
                                })
                            );
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
            <div className="bg-white w-full max-w-[560px] max-h-[95vh] overflow-y-auto rounded-lg p-8 shadow-2xl relative scrollbar-hide">
                
                <h2 className="text-[22px] font-bold text-[#1A1A1A] mb-8">
                    {isEditMode ? 'Modifier le cours' : 'Nouveau cours'}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* TOP SECTION: Name */}
                    <div>
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

                    {/* MID SECTION: Credits */}
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

                    {!isEditMode && (
                        <>
                            <div className="w-full h-px bg-[#E5E5E5] my-2" />

                            {/* SCHEDULE TOGGLE */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-[15px] font-bold text-[#1A1A1A] mb-0.5">Ajouter à l'emploi du temps</div>
                                    <div className="text-[13px] text-[#737373]">Ajoute les créneaux dans l'agenda de la semaine en cours</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        value="" 
                                        className="sr-only peer" 
                                        checked={addToSchedule}
                                        onChange={(e) => setAddToSchedule(e.target.checked)}
                                    />
                                    <div className="w-[42px] h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0d0d0d]"></div>
                                </label>
                            </div>

                            {/* SLOTS EDITOR */}
                            {addToSchedule && (
                                <div className="flex flex-col gap-5">

                                    {/* Session */}
                                    <div>
                                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                                            Session
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={sessionType}
                                                onChange={(e) => setSessionType(e.target.value as 'CM' | 'TD' | 'TP')}
                                                className="w-full h-[46px] px-4 rounded-xl border border-[#E5E5E5] bg-white text-[15px] font-medium text-[#1A1A1A] outline-none appearance-none cursor-pointer focus:border-[#A3A3A3] transition-colors"
                                            >
                                                {SLOT_TYPES.map(st => <option key={st} value={st}>{st}</option>)}
                                            </select>
                                            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Days */}
                                    <div>
                                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                                            Jours
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {WEEK_DAYS.map(day => {
                                                const isActive = selectedDays.includes(day.value);
                                                return (
                                                    <button
                                                        key={day.value}
                                                        type="button"
                                                        onClick={() => handleToggleDay(day.value)}
                                                        aria-pressed={isActive}
                                                        className={`h-[38px] px-5 rounded-full text-[14px] font-medium border transition-colors ${
                                                            isActive
                                                                ? 'bg-[#0d0d0d] text-white border-[#0d0d0d] shadow-sm'
                                                                : 'bg-[#FAF9F6] text-[#1A1A1A] border-[#E5E5E5] hover:border-[#A3A3A3]'
                                                        }`}
                                                    >
                                                        {day.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Time slots */}
                                    <div>
                                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                                            Horaires
                                        </label>
                                        <div className="flex flex-col gap-3">
                                            {timeSlots.map((slot, index) => (
                                                <div key={slot.id} className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="text-[11px] font-bold text-[#737373] uppercase tracking-widest">
                                                            Créneau {index + 1}
                                                        </span>
                                                        {timeSlots.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteSlot(slot.id)}
                                                                aria-label="Supprimer ce créneau"
                                                                className="text-[#A3A3A3] hover:text-[#E74C3C] text-base w-6 h-6 flex items-center justify-center transition-colors -mr-1"
                                                            >
                                                                ✕
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="text-[11px] font-medium text-[#A3A3A3] mb-1.5 block">
                                                                Début
                                                            </label>
                                                            <div className="relative flex items-center bg-white border border-[#E5E5E5] rounded-lg h-10 pl-3 pr-2 focus-within:border-[#A3A3A3] transition-colors">
                                                                <svg className="w-4 h-4 text-[#737373] shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 7v5l3 2" />
                                                                </svg>
                                                                <input
                                                                    type="time"
                                                                    value={slot.startTime}
                                                                    onChange={(e) => handleUpdateSlot(slot.id, 'startTime', e.target.value)}
                                                                    className="w-full min-w-0 bg-transparent outline-none text-[14px] font-medium text-[#1A1A1A] px-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="text-[11px] font-medium text-[#A3A3A3] mb-1.5 block">
                                                                Fin
                                                            </label>
                                                            <div className="relative flex items-center bg-white border border-[#E5E5E5] rounded-lg h-10 pl-3 pr-2 focus-within:border-[#A3A3A3] transition-colors">
                                                                <svg className="w-4 h-4 text-[#737373] shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 7v5l3 2" />
                                                                </svg>
                                                                <input
                                                                    type="time"
                                                                    value={slot.endTime}
                                                                    onChange={(e) => handleUpdateSlot(slot.id, 'endTime', e.target.value)}
                                                                    className="w-full min-w-0 bg-transparent outline-none text-[14px] font-medium text-[#1A1A1A] px-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Ajouter un créneau */}
                                    <button
                                        type="button"
                                        onClick={handleAddSlot}
                                        className="self-start flex items-center gap-1 text-[14px] font-semibold text-[#0d0d0d] hover:opacity-70 transition-opacity"
                                    >
                                        <span className="text-xl leading-none">+</span> Ajouter un créneau
                                    </button>

                                    {/* Aperçu */}
                                    {previewItems.length > 0 && (
                                        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-lg p-4 mt-2">
                                            <div className="text-[12px] text-[#737373] font-medium mb-3">Aperçu — événements générés</div>
                                            <div className="flex flex-wrap gap-2.5 mb-2">
                                                {previewItems.map((item, idx) => (
                                                    <div key={idx} className="bg-[#0d0d0d] text-white px-2.5 py-1 rounded-[6px] text-[13px] font-bold border border-[#0d0d0d]">
                                                        {item.str}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-[12px] text-[#737373]">· une seule fois (semaine en cours)</div>
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
                                className="px-5 py-2.5 rounded-xl bg-[#0d0d0d] text-white text-[15px] font-medium hover:bg-[#2f2f2f] disabled:opacity-50 shadow-sm transition-colors flex items-center justify-center min-w-[140px]"
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
