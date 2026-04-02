import { useState, useMemo } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { useWorks, useCreateWork, useUpdateWork, useDeleteWork } from '../../hooks/useWorks';
import { useCourses } from '../../hooks/useCourses';
import type { Work, WorkStatus } from '../../types';
import { format, differenceInDays, isToday, isTomorrow } from 'date-fns';
import { fr } from 'date-fns/locale';

// ─── Helpers ──────────────────────────────────────────────

function formatDueDate(dueDateStr: string | null | undefined) {
    if (!dueDateStr) return 'sans date';
    const date = new Date(dueDateStr);
    if (isToday(date)) return "rendu aujourd'hui";
    if (isTomorrow(date)) return "rendu demain";
    const diff = differenceInDays(date, new Date());
    if (diff > 0 && diff < 15) return `dans ${diff}j`;
    if (diff < 0) return `en retard`;
    return format(date, 'd MMM yyyy', { locale: fr });
}

const getScoreColor = (earned: number | null | undefined, possible: number | null | undefined) => {
    if (earned == null || possible == null) return 'text-[#A3A3A3]'; // gris
    const ratio = earned / possible;
    if (ratio >= 0.5) return 'text-[#16A34A]'; // vert
    return 'text-[#DC2626]'; // rouge
};

// ─── Modal Création/Édition ───────────────────────────────

const WorkModal = ({ work, courses, onClose, onSave, onDelete }: any) => {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <dialog open className="modal modal-open">
            <div className="modal-box bg-white rounded-2xl shadow-xl max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-lg text-[#1A1A1A]">
                        {work ? 'Modifier le travail' : 'Nouveau travail'}
                    </h3>
                    {work && (
                        <button type="button" onClick={() => { if(confirm('Supprimer ce travail ?')) onDelete(work.id); }} className="btn btn-ghost btn-sm text-[#EF4444] hover:bg-[#FEF2F2]">
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
                            onChange={e => setForm({ ...form, title: e.target.value })}
                        />
                    </div>

                    <div className="flex gap-3">
                        <select
                            required
                            className="select select-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-sm text-[#1A1A1A]"
                            value={form.courseId}
                            onChange={e => setForm({ ...form, courseId: e.target.value })}
                        >
                            <option value="" disabled>Sélectionner un cours...</option>
                            {courses.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        
                        <div className="w-1/3">
                            <input
                                type="number"
                                required
                                placeholder="Sur /20"
                                className="input input-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-sm text-[#1A1A1A]"
                                value={form.pointsPossible}
                                onChange={e => setForm({ ...form, pointsPossible: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <input
                            type="date"
                            className="input input-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-sm text-[#1A1A1A]"
                            value={form.dueDate ? new Date(form.dueDate).toISOString().split('T')[0] : ''}
                            onChange={e => setForm({ ...form, dueDate: e.target.value ? new Date(e.target.value).toISOString() : '' })}
                        />
                        <select
                            className="select select-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-sm text-[#1A1A1A]"
                            value={form.workTypeLabel || ''}
                            onChange={e => setForm({ ...form, workTypeLabel: e.target.value })}
                        >
                            <option value="PROJET">Projet</option>
                            <option value="EXPOSE">Exposé</option>
                            <option value="EXAMEN">Examen</option>
                            <option value="TD">TD</option>
                            <option value="TP">TP</option>
                            <option value="INTERRO">Interro</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[12px] font-bold text-[#737373] mb-1">Statut</label>
                        <select
                            className="select select-bordered w-full bg-[#FAF9F6] border-[#E5E5E5] text-sm text-[#1A1A1A]"
                            value={form.status}
                            onChange={e => setForm({ ...form, status: e.target.value as WorkStatus })}
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
                                onChange={e => setForm({ ...form, pointsEarned: Number(e.target.value) })}
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

// ─── Works Page ───────────────────────────────────────────

export default function WorksPage() {
    const { data: works = [], isLoading } = useWorks();
    const { data: courses = [] } = useCourses();
    const { mutate: createWork } = useCreateWork();
    const { mutate: updateWork } = useUpdateWork();
    const { mutate: deleteWork } = useDeleteWork();

    const [selectedWork, setSelectedWork] = useState<Work | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const [statusFilter, setStatusFilter] = useState<'ALL' | 'PLANNED' | 'SUBMITTED' | 'GRADED'>('ALL');
    const [courseFilter, setCourseFilter] = useState<string | null>(null);

    // Calculs de stats
    const stats = useMemo(() => {
        let planned = 0;
        let submitted = 0;
        let graded = 0;
        let sumScore20 = 0;

        works.forEach(w => {
            if (w.status === 'PLANNED') planned++;
            if (w.status === 'SUBMITTED') submitted++;
            if (w.status === 'GRADED') {
                graded++;
                if (w.pointsEarned != null && w.pointsPossible != null && w.pointsPossible > 0) {
                    sumScore20 += (w.pointsEarned / w.pointsPossible) * 20;
                }
            }
        });

        const avg = graded > 0 ? (sumScore20 / graded).toFixed(1) : '-';

        return {
            total: works.length,
            planned,
            submitted,
            graded,
            avg
        };
    }, [works]);

    const filteredWorks = useMemo(() => {
        return works
            .filter(w => statusFilter === 'ALL' || w.status === statusFilter)
            .filter(w => !courseFilter || w.courseId === courseFilter)
            .sort((a, b) => {
                // Tri par date si dueDate existe, sinon ceux sans date à la fin
                if (a.dueDate && b.dueDate) {
                    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                }
                if (a.dueDate && !b.dueDate) return -1;
                if (!a.dueDate && b.dueDate) return 1;
                // Sinon par date de crétation descendante par défault
                return (b.createdAt || '').localeCompare(a.createdAt || '');
            });
    }, [works, statusFilter, courseFilter]);

    if (isLoading) {
        return <div className="p-8 text-center text-[#A3A3A3]">Chargement des travaux...</div>;
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

    return (
        <div className="flex flex-col max-w-[900px] mx-auto pb-12 pt-4 px-2 sm:px-4">
            
            {/* ── Entête ── */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-[28px] font-bold text-[#1A1A1A] tracking-tight mb-1">
                        Travaux
                    </h1>
                    <div className="text-[14px] font-medium text-[#737373]">
                        {stats.total} travaux · {stats.planned} à rendre
                    </div>
                </div>
                <button
                    onClick={() => { setSelectedWork(null); setIsCreating(true); }}
                    className="h-[44px] px-5 bg-white border border-[#E5E5E5] rounded-[12px] flex items-center justify-center gap-2 hover:bg-[#FAF9F6] transition-colors shadow-sm text-[14px] font-bold text-[#1A1A1A]"
                >
                    <Plus size={18} />
                    Ajouter un travail
                </button>
            </div>

            {/* ── Stats Cards ── */}
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

            {/* ── Filters (Badges/Pills) ── */}
            <div className="flex flex-wrap gap-2 mb-8">
                {/* Status */}
                <button 
                    onClick={() => setStatusFilter('ALL')}
                    className={`px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors ${statusFilter === 'ALL' ? 'bg-[#1A1A1A] text-white' : 'bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50'}`}
                >
                    Tous
                </button>
                <button 
                    onClick={() => setStatusFilter('PLANNED')}
                    className={`px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors ${statusFilter === 'PLANNED' ? 'bg-[#1A1A1A] text-white' : 'bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50'}`}
                >
                    Planifiés
                </button>
                <button 
                    onClick={() => setStatusFilter('SUBMITTED')}
                    className={`px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors ${statusFilter === 'SUBMITTED' ? 'bg-[#1A1A1A] text-white' : 'bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50'}`}
                >
                    Soumis
                </button>
                <button 
                    onClick={() => setStatusFilter('GRADED')}
                    className={`px-4 py-[6px] rounded-full text-[13px] font-bold transition-colors ${statusFilter === 'GRADED' ? 'bg-[#1A1A1A] text-white' : 'bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50'}`}
                >
                    Notés
                </button>

                <div className="w-[1px] h-6 bg-[#E5E5E5] self-center mx-1" />

                {/* Courses */}
                {courses.slice(0, 5).map(c => (
                    <button 
                        key={c.id} 
                        onClick={() => setCourseFilter(courseFilter === c.id ? null : c.id)}
                        className={`px-3.5 py-[6px] rounded-full text-[13px] font-bold transition-colors flex items-center gap-2 border ${courseFilter === c.id ? 'bg-[#FAF9F6] border-[#A3A3A3]' : 'bg-transparent border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50'}`}
                    >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                        {c.name}
                    </button>
                ))}
            </div>

            {/* ── List ── */}
            <div className="bg-white rounded-[16px] border border-[#E5E5E5] flex flex-col pt-1 pb-1 mb-6">
                {filteredWorks.length === 0 ? (
                    <div className="p-8 text-center text-[#A3A3A3] text-[14px] font-medium">
                        Aucun travail trouvé.
                    </div>
                ) : (
                    filteredWorks.map((work, index) => {
                        const course = courses.find(c => c.id === work.courseId);
                        const isLast = index === filteredWorks.length - 1;

                        let statusBadgeClass = '';
                        let statusLabel = '';

                        if (work.status === 'GRADED') {
                            statusBadgeClass = 'bg-[#DCFCE7] text-[#166534]';
                            statusLabel = 'Noté';
                        } else if (work.status === 'SUBMITTED') {
                            statusBadgeClass = 'bg-[#DBEAFE] text-[#1E3A8A]';
                            statusLabel = 'Soumis';
                        } else {
                            statusBadgeClass = 'bg-[#F3F4F6] text-[#4B5563]';
                            statusLabel = 'Planifié';
                        }

                        const scoreDisplay = work.status === 'GRADED' && work.pointsEarned != null && work.pointsPossible != null
                            ? `${work.pointsEarned.toFixed(1)} / ${work.pointsPossible}`
                            : '—';

                        const numScoreColor = work.status === 'GRADED' 
                            ? getScoreColor(work.pointsEarned, work.pointsPossible) 
                            : 'text-[#A3A3A3]';

                        return (
                            <div 
                                key={work.id}
                                onClick={() => setSelectedWork(work)}
                                className={`flex items-center px-5 py-4 cursor-pointer hover:bg-[#FAF9F6] transition-colors ${!isLast ? 'border-b border-[#E5E5E5]' : ''}`}
                            >
                                {/* Course Dot */}
                                <div className="w-2.5 h-2.5 rounded-full shrink-0 mr-4" style={{ backgroundColor: course?.color || '#A3A3A3' }} />
                                
                                {/* Info */}
                                <div className="flex-1 min-w-0 pr-4">
                                    <div className="text-[15px] font-bold text-[#1A1A1A] truncate mb-0.5">
                                        {work.title}
                                    </div>
                                    <div className="text-[13px] font-medium text-[#737373] truncate">
                                        {course?.name || 'Général'} · {work.workTypeLabel || 'PROJET'} · {formatDueDate(work.dueDate)}
                                    </div>
                                </div>
                                
                                {/* Status & Score */}
                                <div className="flex items-center gap-4 shrink-0">
                                    <div className={`px-2.5 py-1 rounded-[6px] text-[11px] font-bold tracking-wide ${statusBadgeClass}`}>
                                        {statusLabel}
                                    </div>
                                    <div className={`text-[17px] font-bold w-[72px] text-right ${numScoreColor}`}>
                                        {scoreDisplay}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* ── Progress Bar ── */}
            {stats.total > 0 && (
                <div className="border border-[#E5E5E5] rounded-[16px] p-5 pb-6">
                    <div className="flex justify-between items-center text-[13px] font-medium text-[#737373] mb-3">
                        <span>Progression du semestre</span>
                        <span>{stats.graded} / {stats.total} notés</span>
                    </div>
                    <div className="h-[6px] w-full bg-[#E5E5E5] rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-[#1A1A1A] rounded-full transition-all duration-700"
                            style={{ width: `${Math.round((stats.graded / stats.total) * 100)}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Modal Edit/Create */}
            {(selectedWork || isCreating) && (
                <WorkModal
                    work={selectedWork}
                    courses={courses}
                    onClose={() => { setSelectedWork(null); setIsCreating(false); }}
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
