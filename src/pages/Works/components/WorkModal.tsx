import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Trash2 } from 'lucide-react';
import { useCourseWorkTypes } from '../../../hooks/useCourses';
import type { Course, Work, WorkStatus } from '../../../types';

interface WorkModalProps {
    work: Work | null;
    courses: Course[];
    onClose: () => void;
    onSave: (payload: Partial<Work>) => void;
    onDelete: (id: string) => void;
}

const defaultWorkForm = (courseId: string): Partial<Work> => ({
    title: '',
    courseId,
    status: 'PLANNED',
    pointsPossible: 20,
    workTypeLabel: 'PROJET',
    description: '',
    dueDate: '',
});

export const WorkModal = ({ work, courses, onClose, onSave, onDelete }: WorkModalProps) => {
    const [form, setForm] = useState<Partial<Work>>(work || defaultWorkForm(courses[0]?.id || ''));
    const selectedCourseId = typeof form.courseId === 'string' ? form.courseId : undefined;
    const { data: configuredWorkTypes = [] } = useCourseWorkTypes(selectedCourseId);

    const workTypeOptions = useMemo(() => {
        if (configuredWorkTypes.length > 0) {
            return configuredWorkTypes.map((item) => ({
                value: item.type,
                label: `${item.type} (${item.weightPercent}%)`,
                weightPercent: item.weightPercent,
            }));
        }

        return [
            { value: 'EXAMEN', label: 'EXAMEN', weightPercent: null as number | null },
            { value: 'INTERRO', label: 'INTERRO', weightPercent: null as number | null },
            { value: 'TP', label: 'TP', weightPercent: null as number | null },
            { value: 'TD', label: 'TD', weightPercent: null as number | null },
            { value: 'PROJET', label: 'PROJET', weightPercent: null as number | null },
            { value: 'EXERCICES', label: 'EXERCICES', weightPercent: null as number | null },
        ];
    }, [configuredWorkTypes]);

    useEffect(() => {
        if (workTypeOptions.length === 0) return;

        setForm((prev) => {
            const normalized = String(prev.workTypeLabel || '').trim().toUpperCase();
            const exists = workTypeOptions.some((option) => option.value === normalized);
            if (exists) return prev;

            const first = workTypeOptions[0];
            return {
                ...prev,
                workTypeLabel: first.value,
                percentage: first.weightPercent ?? prev.percentage,
            };
        });
    }, [workTypeOptions]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const normalizedType = String(form.workTypeLabel || '').trim().toUpperCase();
        const selectedType = workTypeOptions.find((option) => option.value === normalizedType);

        onSave({
            ...form,
            workTypeLabel: normalizedType || null,
            percentage: selectedType?.weightPercent ?? form.percentage,
        });
    };

    return (
        <dialog open className="modal modal-open">
            <div className="modal-box bg-white rounded-2xl shadow-xl max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-lg text-[#1A1A1A]">
                        {work ? 'Modifier le travail' : 'Nouveau travail'}
                    </h3>
                    {work && (
                        <button
                            type="button"
                            onClick={() => {
                                if (confirm('Supprimer ce travail ?')) onDelete(work.id);
                            }}
                            className="btn btn-ghost btn-sm text-[#EF4444] hover:bg-[#FEF2F2]"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <input
                            required
                            placeholder="Titre du projet / devoir"
                            className="input input-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-[#1A1A1A] font-medium"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                        />
                    </div>

                    <div className="flex gap-3">
                        <select
                            required
                            className="select select-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-sm text-[#1A1A1A]"
                            value={form.courseId}
                            onChange={(e) => setForm({ ...form, courseId: e.target.value, workTypeLabel: '' })}
                        >
                            <option value="" disabled>Sélectionner un cours...</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>

                        <div className="w-1/3">
                            <input
                                type="number"
                                required
                                placeholder="Sur /20"
                                className="input input-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-sm text-[#1A1A1A]"
                                value={form.pointsPossible}
                                onChange={(e) => setForm({ ...form, pointsPossible: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <input
                            type="date"
                            className="input input-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-sm text-[#1A1A1A]"
                            value={form.dueDate ? new Date(form.dueDate).toISOString().split('T')[0] : ''}
                            onChange={(e) => setForm({ ...form, dueDate: e.target.value ? new Date(e.target.value).toISOString() : '' })}
                        />
                        <select
                            className="select select-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-sm text-[#1A1A1A]"
                            value={String(form.workTypeLabel || '').toUpperCase()}
                            onChange={(e) => {
                                const selected = workTypeOptions.find((option) => option.value === e.target.value);
                                setForm({
                                    ...form,
                                    workTypeLabel: e.target.value,
                                    percentage: selected?.weightPercent ?? form.percentage,
                                });
                            }}
                        >
                            {workTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[12px] font-bold text-[#737373] mb-1">Statut</label>
                        <select
                            className="select select-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-sm text-[#1A1A1A]"
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value as WorkStatus })}
                        >
                            <option value="PLANNED">Planifié (À rendre)</option>
                            <option value="SUBMITTED">Soumis</option>
                            <option value="GRADED">Noté</option>
                        </select>
                    </div>

                    {form.status === 'GRADED' && (
                        <div className="flex items-center gap-3 p-3 bg-[#F0FDF4] rounded-xl border border-[#D1FAE5]">
                            <span className="text-sm font-bold text-[#166534]">Note obtenue :</span>
                            <input
                                type="number"
                                step="any"
                                placeholder="ex: 15"
                                className="input input-bordered w-24 bg-white border-[#A7F3D0] text-[#166534] font-bold text-lg text-center px-1"
                                value={form.pointsEarned || ''}
                                onChange={(e) => setForm({ ...form, pointsEarned: Number(e.target.value) })}
                            />
                        </div>
                    )}

                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#E5E5E5]">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-[14px] font-bold text-[#737373] hover:bg-gray-50 hover:text-[#1A1A1A] transition-colors">
                            Annuler
                        </button>
                        <button type="submit" className="px-5 py-2.5 rounded-xl border border-[#1A1A1A] text-[14px] font-bold text-white bg-[#1A1A1A] hover:opacity-90 transition-opacity">
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
            <div className="modal-backdrop bg-black/20 backdrop-blur-sm" onClick={onClose} />
        </dialog>
    );
};
