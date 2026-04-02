import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useCourse } from '../../hooks/useCourses';
import { useGrades, useCreateGrade } from '../../hooks/useGrades';
import { useEvents } from '../../hooks/useEvents';
import { useTasks, useUpdateTask } from '../../hooks/useTasks';
import { useRisk } from '../../hooks/useRisks';
import CourseFormModal from '../../components/Courses/CourseFormModal';
import type { Grade } from '../../types';

// Tab Definitions
type Tab = 'notes' | 'travaux' | 'taches' | 'evenements' | 'risque';

// Risk Styles
const riskStyles = {
    LOW: { text: "text-[#3B8A44]", bg: "bg-[#E8F2E8]" },
    MEDIUM: { text: "text-[#A36D16]", bg: "bg-[#F5EDDF]" },
    HIGH: { text: "text-[#B22A2A]", bg: "bg-[#F5E2E2]" },
    CRITICAL: { text: "text-[#B22A2A]", bg: "bg-[#F5E2E2]" }
};

// ─── Helpers ──────────────────────────────────────────────
const typeToLabel = (grade: Grade): string => {
    if (grade.workTypeLabel) return grade.workTypeLabel;
    const nameStr = grade.name.toLowerCase();
    if (nameStr.includes('interro')) return 'Interro';
    if (nameStr.includes('tp')) return 'TP';
    if (nameStr.includes('projet')) return 'Projet';
    return 'Examen';
};

const getBadgeStyle = (label: string) => {
    if (label === 'Examen') return 'bg-[#FDF2F2] text-[#E74C3C]';
    if (label === 'Interro') return 'bg-[#EFF6FF] text-[#3B82F6]';
    if (label === 'TP' || label === 'Projet') return 'bg-[#F0FDF4] text-[#22C55E]';
    return 'bg-gray-100 text-gray-600';
};

const getScoreColor = (score: number, max: number) => {
    const ratio = score / max;
    if (ratio >= 0.7) return 'text-[#22C55E]';
    if (ratio >= 0.45) return 'text-[#F59E0B]'; // orange
    return 'text-[#E74C3C]';
};

const simulateGrade = (grades: Grade[], target: number, nextWeight: number = 1): number | null => {
    if (grades.length === 0) return target;
    const totalWeight = grades.reduce((sum, g) => sum + (g.weight ?? 1), 0) + nextWeight;
    const currentSum = grades.reduce((sum, g) => sum + ((g.score / g.maxScore) * 20) * (g.weight ?? 1), 0);
    const needed = (target * totalWeight - currentSum) / nextWeight;
    return Math.round(needed * 100) / 100;
};

// ─── Onglet Notes ──────────────────────────────────────────

const NotesTab = ({ courseId }: { courseId: string }) => {
    const { data: grades = [], isLoading } = useGrades(courseId);
    const { mutate: createGrade, isPending: isCreating } = useCreateGrade();
    const [showForm, setShowForm] = useState(false);
    const [simulatorTarget, setSimulatorTarget] = useState<number | ''>(10);
    const [form, setForm] = useState({ name: '', score: '', maxScore: '20', weight: '1', workTypeLabel: 'Examen' });

    const average = grades.length === 0 ? null :
        grades.reduce((sum, g) => sum + ((g.score / g.maxScore) * 20) * (g.weight ?? 1), 0) /
        grades.reduce((sum, g) => sum + (g.weight ?? 1), 0);

    const needed = simulateGrade(grades, Number(simulatorTarget));

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createGrade(
            { ...form, score: Number(form.score), maxScore: Number(form.maxScore), weight: Number(form.weight), courseId },
            { onSuccess: () => { setShowForm(false); setForm({ name: '', score: '', maxScore: '20', weight: '1', workTypeLabel: 'Examen' }); } }
        );
    };

    if (isLoading) return <div className="h-40 bg-gray-100 rounded-[20px] animate-pulse" />;

    return (
        <div className="flex flex-col gap-5 mt-5">
            {/* Notes Header Section */}
            <div className="flex justify-between items-end mb-2">
                <div>
                    <div className="text-[11px] font-bold text-[#A3A3A3] uppercase tracking-wider mb-2">
                        Notes du cours
                    </div>
                    <div className="text-[14px] font-medium text-[#737373]">
                        Moyenne pondérée : <span className="text-[#1A1A1A] font-bold">{average !== null ? `${average.toFixed(1)} / 20` : '— / 20'}</span>
                    </div>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-white border border-[#E5E5E5] text-[#1A1A1A] rounded-xl text-[14px] font-medium px-4 py-2 hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm"
                >
                    + Ajouter une note
                </button>
            </div>

            {/* Ajout Form dropdown */}
            {showForm && (
                <form onSubmit={handleCreate} className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[20px] p-5 flex flex-col gap-4">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <div className="col-span-2">
                            <label className="text-xs text-[#737373] mb-1.5 block font-medium">Nom</label>
                            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full h-10 px-3 border border-[#E5E5E5] rounded-xl bg-white text-[14px] font-medium outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-[#737373] mb-1.5 block font-medium">Note</label>
                            <input type="number" step="0.5" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} required min={0} className="w-full h-10 px-3 border border-[#E5E5E5] rounded-xl bg-white text-[14px] font-medium outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-[#737373] mb-1.5 block font-medium">Sur</label>
                            <input type="number" value={form.maxScore} onChange={(e) => setForm({ ...form, maxScore: e.target.value })} min={1} className="w-full h-10 px-3 border border-[#E5E5E5] rounded-xl bg-white text-[14px] font-medium outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-[#737373] mb-1.5 block font-medium">Coeff.</label>
                            <input type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} min={0.5} step="0.5" className="w-full h-10 px-3 border border-[#E5E5E5] rounded-xl bg-white text-[14px] font-medium outline-none" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-2">
                        <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-[14px] text-[#737373] font-medium hover:text-[#1A1A1A]">Annuler</button>
                        <button type="submit" disabled={isCreating} className="bg-[#1A1A1A] text-white px-5 py-2 rounded-xl text-[14px] font-medium hover:bg-black">
                            {isCreating ? 'En cours...' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            )}

            {/* Notes List */}
            {grades.length === 0 ? (
                <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-10 text-center text-[#737373] text-[15px]">
                    Aucune note enregistrée.
                </div>
            ) : (
                <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] flex flex-col pt-2 pb-2">
                    {grades.map((grade, i) => {
                        const typeLabel = typeToLabel(grade);
                        const bStyle = getBadgeStyle(typeLabel);
                        const numScoreColor = getScoreColor(grade.score, grade.maxScore);

                        return (
                            <div key={grade.id} className={`flex justify-between items-center px-6 py-4 ${i < grades.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}>
                                <div>
                                    <div className="text-[15px] font-bold text-[#1A1A1A] mb-1">{grade.name}</div>
                                    <div className="text-[13px] text-[#737373]">
                                        {typeLabel} · coeff. {grade.weight ?? 1}{grade.date ? ` ·  ${new Date(grade.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '')}` : ''}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className={`px-2.5 py-0.5 rounded text-[12px] font-bold tracking-wide ${bStyle}`}>
                                        {typeLabel}
                                    </div>
                                    <div className={`text-[17px] font-bold w-20 text-right ${numScoreColor}`}>
                                        {grade.score} / {grade.maxScore}
                                    </div>
                                    <button className="w-8 h-8 flex items-center justify-center border border-[#E5E5E5] rounded-lg hover:bg-white transition-colors">
                                        {/* Crayon rouge ico */}
                                        <svg className="w-3.5 h-3.5 text-[#E74C3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Simulateur Container */}
            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-6 mt-2">
                <div className="text-[15px] font-bold text-[#1A1A1A] mb-2">Simulateur de moyenne</div>
                <div className="text-[15px] text-[#737373] mb-5">Quelle note faut-il avoir au prochain examen pour atteindre {simulatorTarget || 10} / 20 ?</div>
                
                <div className="flex items-center gap-4">
                    <span className="text-[15px] text-[#1A1A1A]">Objectif :</span>
                    <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        value={simulatorTarget === '' ? '' : simulatorTarget}
                        onChange={(e) => setSimulatorTarget(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-[70px] h-[44px] border border-[#E5E5E5] bg-[#FAF9F6] rounded-xl text-center text-[15px] font-medium outline-none focus:border-[#A3A3A3] transition-colors"
                    />
                    <span className="text-[15px] text-[#1A1A1A] ml-2">→ Il te faut au moins</span>
                    <span className="text-[17px] font-bold text-[#1A1A1A]">
                        {needed !== null 
                            ? needed > 20 
                                ? 'Impossible — trop haut' 
                                : needed < 0 
                                    ? 'Déjà atteint !' 
                                    : `${needed} / 20`
                            : '— / 20'}
                    </span>
                </div>
            </div>

        </div>
    );
};

const TasksTab = ({ courseId }: { courseId: string }) => {
    const { data: tasks = [], isLoading } = useTasks();
    const { mutate: updateTask } = useUpdateTask();

    const courseTasks = tasks.filter((t) => t.courseId === courseId && !t.isDeleted);

    if (isLoading) return <div className="h-40 bg-gray-100 rounded-[20px] animate-pulse mt-5" />;

    if (courseTasks.length === 0) {
        return (
            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-10 text-center text-[#737373] text-[15px] mt-5">
                Aucune tâche pour ce cours.
            </div>
        );
    }

    return (
        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] flex flex-col pt-2 pb-2 mt-5">
            {courseTasks.map((task, i) => (
                <div key={task.id} className={`flex items-center gap-4 px-6 py-4 ${i < courseTasks.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}>
                    <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A] cursor-pointer"
                        checked={task.status === 'COMPLETED'}
                        onChange={() => updateTask({ id: task.id, payload: { status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' } })}
                    />
                    <div className="flex-1">
                        <div className={`text-[15px] font-bold ${task.status === 'COMPLETED' ? 'line-through text-[#A3A3A3]' : 'text-[#1A1A1A]'}`}>
                            {task.title}
                        </div>
                        {task.dueDate && (
                            <div className="text-[13px] text-[#737373] mt-0.5">
                                {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                            </div>
                        )}
                    </div>
                    <div className={`px-2.5 py-0.5 rounded text-[12px] font-bold tracking-wide ${
                        task.priority === 'CRITICAL' ? 'bg-[#FDF2F2] text-[#E74C3C]' :
                        task.priority === 'HIGH' ? 'bg-[#FFF3E0] text-[#F97316]' :
                        task.priority === 'MEDIUM' ? 'bg-[#FEF9C3] text-[#EAB308]' :
                        'bg-[#F0FDF4] text-[#22C55E]'
                    }`}>
                        {task.priority}
                    </div>
                </div>
            ))}
        </div>
    );
};

// ─── Onglet Événements ─────────────────────────────────────

const EventsTab = ({ courseId }: { courseId: string }) => {
    const { data: events = [], isLoading } = useEvents();

    const courseEvents = events
        .filter((e) => e.courseId === courseId)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    if (isLoading) return <div className="h-40 bg-gray-100 rounded-[20px] animate-pulse mt-5" />;

    if (courseEvents.length === 0) {
        return (
            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-10 text-center text-[#737373] text-[15px] mt-5">
                Aucun événement pour ce cours.
            </div>
        );
    }

    return (
        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] flex flex-col pt-2 pb-2 mt-5">
            {courseEvents.map((event, i) => (
                <div key={event.id} className={`flex items-center gap-4 px-6 py-4 ${i < courseEvents.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}>
                    <div className="w-1.5 self-stretch rounded-full shrink-0" style={{ background: '#1A1A1A' }} />
                    <div className="flex-1">
                        <div className="text-[15px] font-bold text-[#1A1A1A]">{event.title}</div>
                        <div className="text-[13px] text-[#737373] mt-0.5">
                            {new Date(event.startDate).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                            {' · '}
                            {new Date(event.startDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            {' – '}
                            {new Date(event.endDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                    <div className="px-2.5 py-0.5 rounded text-[12px] font-bold tracking-wide bg-[#F3F4F6] text-[#4B5563]">
                        {event.type}
                    </div>
                </div>
            ))}
        </div>
    );
};

// ─── Onglet Risque ─────────────────────────────────────────

const RiskTab = ({ courseId }: { courseId: string }) => {
    const { data: risk, isLoading } = useRisk(courseId);

    if (isLoading) return <div className="h-40 bg-gray-100 rounded-[20px] animate-pulse mt-5" />;

    if (!risk) {
        return (
            <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-10 text-center text-[#737373] text-[15px] mt-5">
                Données insuffisantes pour calculer le risque.
            </div>
        );
    }

    const factors = [
        { label: 'Performance', value: risk.details.performance },
        { label: 'Procrastination', value: risk.details.procrastination },
        { label: 'Pression examen', value: risk.details.pressure },
    ];

    const riskLevel = risk.level || 'LOW';
    const rStyle = riskStyles[riskLevel as keyof typeof riskStyles] || riskStyles.LOW;

    return (
        <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-6 mt-5 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-[13px] text-[#737373] font-medium mb-1">Score de risque global</div>
                    <div className={`text-[36px] font-bold ${rStyle.text} leading-none`}>
                        {risk.overallScore}
                        <span className="text-[17px] text-[#A3A3A3] ml-1">/ 100</span>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-lg text-[13px] font-bold tracking-widest uppercase ${rStyle.bg} ${rStyle.text}`}>
                    {risk.level}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {factors.map((f) => (
                    <div key={f.label}>
                        <div className="flex justify-between items-end mb-1.5">
                            <span className="text-[14px] text-[#737373] font-medium">{f.label}</span>
                            <span className="text-[14px] font-bold text-[#1A1A1A]">{f.value}%</span>
                        </div>
                        <div className="h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${f.value}%`,
                                    background: f.value >= 70 ? '#E74C3C' : f.value >= 40 ? '#F59E0B' : '#22C55E'
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Onglets génériques pour le moment ─────────────────────

const placeholderSection = (text: string) => (
    <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[24px] p-10 text-center text-[#737373] text-[15px] mt-6">
        {text}
    </div>
);

// ─── Page principale (Détails) ─────────────────────────────

export default function CourseDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('notes');
    const [showEditModal, setShowEditModal] = useState(false);

    const { data: course, isLoading } = useCourse(id ?? '');
    const { data: grades = [] } = useGrades(id ?? '');
    const { data: tasks = [] } = useTasks();
    const { data: risk } = useRisk(id ?? '');

    const courseTasks = tasks.filter(t => t.courseId === id && !t.isDeleted);
    
    // Average
    const average = grades.length === 0 ? null :
        grades.reduce((sum, g) => sum + ((g.score / g.maxScore) * 20) * (g.weight ?? 1), 0) /
        grades.reduce((sum, g) => sum + (g.weight ?? 1), 0);

    const riskLevel = risk?.level || 'LOW';
    const rStyle = riskStyles[riskLevel as keyof typeof riskStyles] || riskStyles.LOW;

    if (isLoading) return <div className="max-w-4xl mx-auto h-[300px] bg-gray-50 rounded-[20px] animate-pulse" />;
    
    if (!course) {
        return (
            <div className="text-center py-16 text-[#737373]">
                <div className="flex justify-center mb-3">
                    <Search size={36} className="opacity-20" />
                </div>
                <div className="text-sm">Cours introuvable</div>
                <button onClick={() => navigate('/courses')} className="mt-4 text-[#1A1A1A] underline">← Retour aux cours</button>
            </div>
        );
    }

    const tabs: { key: Tab; label: string }[] = [
        { key: 'notes', label: 'Notes' },
        { key: 'travaux', label: 'Travaux' },
        { key: 'taches', label: 'Tâches' },
        { key: 'evenements', label: 'Événements' },
        { key: 'risque', label: 'Risque' },
    ];

    return (
        <div className="max-w-[900px] mx-auto pb-10 px-2 lg:px-4">

            {/* Back action */}
            <button
                onClick={() => navigate('/courses')}
                className="text-[14px] font-medium text-[#737373] hover:text-[#1A1A1A] transition-colors mb-4 flex items-center gap-1.5"
            >
                ← Mes cours
            </button>

            {/* Title Section */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ background: course.color }} />
                        <h1 className="text-[26px] font-semibold text-[#1A1A1A] tracking-tight">{course.name}</h1>
                    </div>
                    <div className="text-[14px] text-[#737373] font-medium ml-6.5">
                        {course.code} · {course.credits ?? 3} crédits
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-widest uppercase ${rStyle.bg} ${rStyle.text}`}>
                        {riskLevel}
                    </div>
                    <button 
                        onClick={() => setShowEditModal(true)}
                        className="bg-white border border-[#E5E5E5] text-[#1A1A1A] text-[15px] font-medium rounded-xl px-5 py-2 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        Modifier
                    </button>
                </div>
            </div>

            {/* Top 4 Stats Columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {/* Moyenne */}
                <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[18px] py-4 flex flex-col items-center justify-center">
                    <div className="text-[26px] font-medium text-[#1A1A1A] leading-tight">
                        {average !== null ? average.toFixed(1) : '-'}
                    </div>
                    <div className="text-[13px] text-[#737373] mt-0.5 font-medium">Moyenne</div>
                </div>
                {/* Notes */}
                <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[18px] py-4 flex flex-col items-center justify-center">
                    <div className="text-[26px] font-medium text-[#1A1A1A] leading-tight">
                        {grades.length}
                    </div>
                    <div className="text-[13px] text-[#737373] mt-0.5 font-medium">Notes</div>
                </div>
                {/* Tâches */}
                <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[18px] py-4 flex flex-col items-center justify-center">
                    <div className="text-[26px] font-medium text-[#1A1A1A] leading-tight">
                        {courseTasks.length}
                    </div>
                    <div className="text-[13px] text-[#737373] mt-0.5 font-medium">Tâches</div>
                </div>
                {/* Score risque */}
                <div className="bg-[#FAF9F6] border border-[#E5E5E5] rounded-[18px] py-4 flex flex-col items-center justify-center">
                    <div className="text-[26px] font-medium text-[#E74C3C] leading-tight">
                        {Math.round(risk?.overallScore || 0)}
                    </div>
                    <div className="text-[13px] text-[#737373] mt-0.5 font-medium">Score risque</div>
                </div>
            </div>

            {/* Nav Tabs */}
            <div className="flex border-b border-[#E5E5E5] overflow-x-auto select-none no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-5 py-3 text-[15px] font-medium transition-colors border-b-2 whitespace-nowrap ${
                            activeTab === tab.key 
                            ? 'text-[#1A1A1A] border-[#1A1A1A]' 
                            : 'text-[#737373] border-transparent hover:text-[#1A1A1A]'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
                {/* Espace flexible pour aller jusqu'au bout */}
                <div className="flex-1"></div>
            </div>

            {/* Tab content */}
            <div>
                {activeTab === 'notes' && <NotesTab courseId={id ?? ''} />}
                {activeTab === 'travaux' && placeholderSection("L'onglet Travaux sera bientôt implémenté.")}
                {activeTab === 'taches' && <TasksTab courseId={id ?? ''} />}
                {activeTab === 'evenements' && <EventsTab courseId={id ?? ''} />}
                {activeTab === 'risque' && <RiskTab courseId={id ?? ''} />}
            </div>

            {showEditModal && course && (
                <CourseFormModal course={course} onClose={() => setShowEditModal(false)} />
            )}

        </div>
    );
}