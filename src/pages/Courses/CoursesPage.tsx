import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses, useCreateCourse, useDeleteCourse } from '../../hooks/useCourses';
import type { Course } from '../../types';

// ─── Helpers ──────────────────────────────────────────────

const COLORS = [
    '#3B82F6', '#F59E0B', '#10B981',
    '#8B5CF6', '#EF4444', '#EC4899', '#14B8A6',
];

// ─── Composant carte cours ─────────────────────────────────

interface CourseCardProps {
    course: Course;
    onDelete: (id: string) => void;
    onClick: (id: string) => void;
}

const CourseCard = ({ course, onClick, onDelete }: CourseCardProps) => (
    <div
        className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 cursor-pointer hover:shadow-md transition-all"
        onClick={() => onClick(course.id)}
    >
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
                <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ background: course.color }}
                />
                <div className="font-medium text-sm text-base-content">{course.name}</div>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(course.id);
                }}
                className="btn btn-ghost btn-xs text-base-content/30 hover:text-error"
            >
                ✕
            </button>
        </div>
        <div className="text-xs text-base-content/40 mb-4">
            {course.code} · {course.credits ?? 3} crédits
        </div>
        <div
            className="h-1 rounded-full bg-base-200 overflow-hidden"
        >
            <div
                className="h-full rounded-full"
                style={{ width: '50%', background: course.color }}
            />
        </div>
    </div>
);

// ─── Modal création cours ──────────────────────────────────

interface CreateCourseModalProps {
    onClose: () => void;
    onCreate: (payload: Partial<Course>) => void;
    isLoading: boolean;
}

const CreateCourseModal = ({ onClose, onCreate, isLoading }: CreateCourseModalProps) => {
    const [form, setForm] = useState({
        name: '',
        code: '',
        credits: 3,
        color: COLORS[0],
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate({
            ...form,
            credits: Number(form.credits),
        });
    };

    return (
        <dialog open className="modal modal-open">
            <div className="modal-box max-w-md">

                <h3 className="font-medium text-base mb-5">Nouveau cours</h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="text-xs text-base-content/50 mb-1 block">Nom du cours</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="ex: Algorithmique"
                                required
                                className="input input-bordered input-sm w-full"
                            />
                        </div>
                        <div className="w-28">
                            <label className="text-xs text-base-content/50 mb-1 block">Code</label>
                            <input
                                name="code"
                                value={form.code}
                                onChange={handleChange}
                                placeholder="ALGO201"
                                required
                                className="input input-bordered input-sm w-full"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="w-24">
                            <label className="text-xs text-base-content/50 mb-1 block">Crédits</label>
                            <input
                                name="credits"
                                type="number"
                                min={1}
                                max={10}
                                value={form.credits}
                                onChange={handleChange}
                                className="input input-bordered input-sm w-full"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-base-content/50 mb-1 block">Couleur</label>
                            <div className="flex gap-2 pt-1">
                                {COLORS.map((c) => (
                                    <button
                                        key={c}
                                        type="button"
                                        onClick={() => setForm((prev) => ({ ...prev, color: c }))}
                                        className="w-6 h-6 rounded-full shrink-0 transition-transform"
                                        style={{
                                            background: c,
                                            outline: form.color === c ? `2px solid ${c}` : 'none',
                                            outlineOffset: '2px',
                                            transform: form.color === c ? 'scale(1.2)' : 'scale(1)',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-base-content/50 mb-1 block">Description (optionnel)</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Quelques mots sur ce cours..."
                            className="textarea textarea-bordered textarea-sm w-full"
                            rows={2}
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                        <button type="button" onClick={onClose} className="btn btn-ghost btn-sm">
                            Annuler
                        </button>
                        <button type="submit" disabled={isLoading} className="btn btn-neutral btn-sm">
                            {isLoading
                                ? <span className="loading loading-spinner loading-xs" />
                                : 'Créer le cours'
                            }
                        </button>
                    </div>

                </form>

            </div>
            <div className="modal-backdrop" onClick={onClose} />
        </dialog>
    );
};

// ─── Page principale ───────────────────────────────────────

export default function CoursesPage() {
    const navigate = useNavigate();
    const { data: courses = [], isLoading } = useCourses();
    const { mutate: createCourse, isPending: isCreating } = useCreateCourse();
    const { mutate: deleteCourse } = useDeleteCourse();

    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');

    const filtered = courses.filter(
        (c) =>
            !c.isDeleted &&
            (c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.code.toLowerCase().includes(search.toLowerCase()))
    );

    const handleCreate = (payload: Partial<Course>) => {
        createCourse(payload, {
            onSuccess: () => setShowModal(false),
        });
    };

    return (
        <div className="max-w-4xl mx-auto">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl font-medium text-base-content">Mes cours</h1>
                    <p className="text-sm text-base-content/40 mt-1">
                        {courses.filter((c) => !c.isDeleted).length} cours
                    </p>
                </div>
            </div>

            {/* Recherche */}
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un cours..."
                className="input input-bordered input-sm w-full mb-6"
            />

            {/* Grille */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-36 skeleton rounded-xl" />
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-16 text-base-content/40">
                    <div className="text-4xl mb-3">📚</div>
                    <div className="text-sm">
                        {search ? 'Aucun cours trouvé' : 'Aucun cours pour le moment'}
                    </div>
                    {!search && (
                        <div className="text-xs text-blue-500 font-medium mt-4">
                            Appuyez sur le bouton + pour commencer
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onClick={(id) => navigate(`/courses/${id}`)}
                            onDelete={(id) => {
                                if (confirm('Supprimer ce cours ?')) deleteCourse(id);
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Floating Action Button (FAB) */}
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center text-3xl font-light transition-transform hover:scale-105 z-50 focus:outline-none"
            >
                +
            </button>

            {/* Modal */}
            {showModal && (
                <CreateCourseModal
                    onClose={() => setShowModal(false)}
                    onCreate={handleCreate}
                    isLoading={isCreating}
                />
            )}

        </div>
    );
}