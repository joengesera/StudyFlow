import { useState } from 'react';
import { useWorks, useCreateWork, useUpdateWork, useDeleteWork } from '../../hooks/useWorks';
import { useCourses } from '../../hooks/useCourses';
import type { Work, WorkStatus } from '../../types';

// ─── Helpers ──────────────────────────────────────────────

const WORK_STATUSES: { key: WorkStatus; label: string; color: string }[] = [
    { key: 'PLANNED', label: 'À faire', color: 'bg-blue-500' },
    { key: 'SUBMITTED', label: 'Rendus', color: 'bg-warning' },
    { key: 'GRADED', label: 'Corrigés', color: 'bg-success' },
];

const formatDueDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return '';
    const due = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.ceil(
        (due.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
    );
    if (diffDays < 0) return 'En retard';
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return 'Demain';
    return `Dans ${diffDays}j`;
};

// Analyse les subtasks format Markdown depuis la description
const parseSubtasks = (desc: string) => {
    const lines = (desc || '').split('\n');
    const tasks = lines.filter(l => l.trim().startsWith('- [ ]') || l.trim().startsWith('- [x]'));
    const completed = tasks.filter(t => t.trim().startsWith('- [x]')).length;
    return { total: tasks.length, completed };
};

// ─── Composants ───────────────────────────────────────────

interface WorkCardProps {
    work: Work;
    courseCode?: string;
    courseColor?: string;
    onClick: (id: string) => void;
    onStatusChange: (status: WorkStatus) => void;
}

const WorkCard = ({ work, courseCode, courseColor, onClick, onStatusChange }: WorkCardProps) => {
    const due = formatDueDate(work.dueDate);
    const sub = parseSubtasks(work.description || '');

    return (
        <div
            className="bg-white rounded-2xl p-4 shadow-sm mb-3 cursor-pointer hover:shadow-md transition-all border border-gray-100 flex flex-col gap-2 relative"
            onClick={() => onClick(work.id)}
        >
            <div className="flex items-center gap-2 mb-1">
                <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: courseColor || '#ccc' }}
                />
                <span className="text-xs font-medium text-gray-500">
                    {courseCode || 'Projet'}
                </span>
                {work.workTypeLabel && (
                    <span className="ml-auto text-[10px] uppercase font-bold tracking-wider text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                        {work.workTypeLabel}
                    </span>
                )}
            </div>

            <div className="text-[15px] font-medium text-gray-800 leading-tight">
                {work.title}
            </div>

            <div className="flex items-center gap-3 mt-1">
                {due && (
                    <div className={`text-xs font-medium ${due.includes('retard') ? 'text-red-500' : 'text-gray-500'}`}>
                        {due}
                    </div>
                )}
                {sub.total > 0 && (
                    <div className="text-xs text-blue-500 font-medium">
                        {sub.completed}/{sub.total} étapes
                    </div>
                )}
                {work.status === 'GRADED' && work.pointsEarned !== null && (
                    <div className="text-xs font-bold text-green-600 ml-auto bg-green-50 px-2 py-0.5 rounded-full">
                        {work.pointsEarned} / {work.pointsPossible}
                    </div>
                )}
            </div>

            {/* Quick Actions Status */}
            <div className="flex gap-2 mt-2 pt-2 border-t border-gray-50">
                {work.status === 'PLANNED' && (
                    <button
                        className="text-[11px] font-medium text-blue-600 hover:text-blue-700 w-full text-center py-1 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
                        onClick={(e) => { e.stopPropagation(); onStatusChange('SUBMITTED'); }}
                    >
                        Marquer Rendu
                    </button>
                )}
                {work.status === 'SUBMITTED' && (
                    <button
                        className="text-[11px] font-medium text-green-600 hover:text-green-700 w-full text-center py-1 rounded bg-green-50 hover:bg-green-100 transition-colors"
                        onClick={(e) => { e.stopPropagation(); onStatusChange('GRADED'); }}
                    >
                        Ajouter Note
                    </button>
                )}
            </div>
        </div>
    );
};

// ─── Modal ────────────────────────────────────────────────

// Pour faire simple, la modale gère la création/édition basique.
// Les sous-tâches (checklists) peuvent être éditées via un composant dédié dans la modale.

const WorkModal = ({ work, onClose, onSave, onDelete }: any) => {
    const { data: courses = [] } = useCourses();
    const [form, setForm] = useState<Partial<Work>>(
        work || {
            title: '',
            courseId: courses[0]?.id || '',
            status: 'PLANNED',
            pointsPossible: 20,
            workTypeLabel: 'PROJET',
            description: '',
            dueDate: '',
        }
    );
    const [subtaskInput, setSubtaskInput] = useState('');

    const activeSubtasks = (form.description || '').split('\n').filter(l => l.trim().startsWith('- [ ]') || l.trim().startsWith('- [x]'));

    const handleAddSubtask = () => {
        if (!subtaskInput.trim()) return;
        setForm(prev => ({
            ...prev,
            description: `${prev.description ? prev.description.trim() + '\n' : ''}- [ ] ${subtaskInput.trim()}`
        }));
        setSubtaskInput('');
    }

    const toggleSubtask = (index: number) => {
        let lines = (form.description || '').split('\n');
        let tIdx = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('- [')) {
                if (tIdx === index) {
                    lines[i] = lines[i].replace('- [ ]', '- [TMP]').replace('- [x]', '- [ ]').replace('- [TMP]', '- [x]');
                    break;
                }
                tIdx++;
            }
        }
        setForm(prev => ({ ...prev, description: lines.join('\n') }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <dialog open className="modal modal-open">
            <div className="modal-box bg-white rounded-2xl shadow-xl max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-lg text-gray-800">
                        {work ? 'Modifier Livrable' : 'Nouveau Livrable'}
                    </h3>
                    {work && (
                        <button onClick={() => { if(confirm('Supprimer ?')) onDelete(work.id); }} className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50">
                            🗑️
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <input
                            required
                            placeholder="Titre du projet / devoir"
                            className="input input-bordered w-full bg-gray-50 border-gray-200 text-gray-800 font-medium"
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                        />
                    </div>

                    <div className="flex gap-3">
                        <select
                            required
                            className="select select-bordered w-full bg-gray-50 border-gray-200 text-sm"
                            value={form.courseId}
                            onChange={e => setForm({ ...form, courseId: e.target.value })}
                        >
                            <option value="" disabled>Sélectionner un cours</option>
                            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        
                        <div className="w-1/3">
                            <input
                                type="number"
                                required
                                placeholder="Sur /20"
                                className="input input-bordered w-full bg-gray-50 border-gray-200 text-sm"
                                value={form.pointsPossible}
                                onChange={e => setForm({ ...form, pointsPossible: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <input
                            type="date"
                            className="input input-bordered w-full bg-gray-50 border-gray-200 text-sm"
                            value={form.dueDate ? new Date(form.dueDate).toISOString().split('T')[0] : ''}
                            onChange={e => setForm({ ...form, dueDate: e.target.value ? new Date(e.target.value).toISOString() : '' })}
                        />
                        <select
                            className="select select-bordered w-full bg-gray-50 border-gray-200 text-sm"
                            value={form.workTypeLabel || ''}
                            onChange={e => setForm({ ...form, workTypeLabel: e.target.value })}
                        >
                            <option value="PROJET">Projet</option>
                            <option value="EXAMEN">Examen</option>
                            <option value="DEVOIR">Devoir</option>
                            <option value="EXPOSE">Exposé</option>
                        </select>
                    </div>

                    {form.status === 'GRADED' && (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700">Note obtenue :</span>
                            <input
                                type="number"
                                placeholder="ex: 15"
                                className="input input-bordered w-24 bg-green-50 border-green-200 text-green-700 font-bold"
                                value={form.pointsEarned || ''}
                                onChange={e => setForm({ ...form, pointsEarned: Number(e.target.value) })}
                            />
                        </div>
                    )}

                    <div className="divider my-0"></div>

                    {/* Sous-tâches (Checklist) */}
                    <div>
                        <div className="text-sm font-semibold text-gray-700 mb-2">Sous-tâches / Étapes</div>
                        <div className="flex flex-col gap-2 mb-3">
                            {activeSubtasks.map((st, i) => (
                                <div key={i} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded" onClick={() => toggleSubtask(i)}>
                                    <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" checked={st.startsWith('- [x]')} readOnly />
                                    <span className={`text-sm ${st.startsWith('- [x]') ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                        {st.substring(6)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="input input-bordered input-sm flex-1 bg-gray-50 border-gray-200"
                                placeholder="Ajouter une étape..."
                                value={subtaskInput}
                                onChange={e => setSubtaskInput(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddSubtask(); } }}
                            />
                            <button type="button" onClick={handleAddSubtask} className="btn btn-sm btn-outline text-blue-500 border-blue-200 hover:bg-blue-50 hover:border-blue-300">
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                        <button type="button" onClick={onClose} className="btn btn-ghost text-gray-500 hover:bg-gray-100">
                            Annuler
                        </button>
                        <button type="submit" className="btn bg-blue-500 hover:bg-blue-600 border-none text-white px-6">
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
            <div className="modal-backdrop bg-black/20" onClick={onClose} />
        </dialog>
    );
};

// ─── Works Page ───────────────────────────────────────────

export default function WorksPage() {
    const { data: works = [], isLoading } = useWorks();
    const { data: courses = [] } = useCourses();
    const { mutate: createWork } = useCreateWork();
    const { mutate: updateWork } = useUpdateWork();
    const { mutate: deleteWork } = useDeleteWork();

    const [selectedWork, setSelectedWork] = useState<Work | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    if (isLoading) {
        return <div className="p-8 text-center text-gray-400">Chargement des Livrables...</div>;
    }

    const handleSave = (form: Partial<Work>) => {
        if (selectedWork) {
            updateWork({ id: selectedWork.id, payload: form });
        } else {
            createWork(form);
        }
        setSelectedWork(null);
        setIsCreating(false);
    };

    const handleDelete = (id: string) => {
        deleteWork(id);
        setSelectedWork(null);
        setIsCreating(false);
    };

    const handleStatusChange = (id: string, status: WorkStatus) => {
        updateWork({ id, payload: { status } });
    }

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex justify-between items-center px-2 mb-6">
                <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Projets & Livrables</h1>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 px-2 snap-x">
                {WORK_STATUSES.map(column => (
                    <div key={column.key} className="flex flex-col flex-1 min-w-[280px] snap-center">
                        <h2 className="text-sm font-semibold text-blue-600 mb-4 px-1">{column.label}</h2>
                        
                        <div className="flex flex-col gap-0.5">
                            {works.filter(w => w.status === column.key).map(work => {
                                const course = courses.find(c => c.id === work.courseId);
                                return (
                                    <WorkCard
                                        key={work.id}
                                        work={work}
                                        courseCode={course?.code}
                                        courseColor={course?.color}
                                        onClick={() => setSelectedWork(work)}
                                        onStatusChange={(status) => handleStatusChange(work.id, status)}
                                    />
                                );
                            })}
                            
                            {works.filter(w => w.status === column.key).length === 0 && (
                                <div className="text-center p-6 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 text-sm font-medium">
                                    Vide
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Edit/Create */}
            {(selectedWork || isCreating) && (
                <WorkModal
                    work={selectedWork}
                    onClose={() => { setSelectedWork(null); setIsCreating(false); }}
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            )}

            {/* FAB */}
            <button
                onClick={() => { setSelectedWork(null); setIsCreating(true); }}
                className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center text-3xl font-light transition-transform hover:scale-105 z-50 focus:outline-none"
            >
                +
            </button>
        </div>
    );
}
