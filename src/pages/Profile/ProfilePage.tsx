import { useState } from 'react';
import { isAxiosError } from 'axios';
import { useAuthStore } from '../../stores/authStore';
// import { useAuth } from '../../hooks/useAuth';
import { apiClient } from '../../api/client';

// ─── Hook install PWA ──────────────────────────────────────

const usePwaInstall = () => {
    const [prompt, setPrompt] = useState<Event & { prompt?: () => void } | null>(null);
    const [installed, setInstalled] = useState(false);

    useState(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setPrompt(e as Event & { prompt?: () => void });
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    });

    const install = async () => {
        if (!prompt?.prompt) return;
        prompt.prompt();
        setInstalled(true);
        setPrompt(null);
    };

    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);

    return { canInstall: !!prompt, install, installed, isIos };
};

// ─── Section : Informations personnelles ──────────────────

const PersonalInfoSection = () => {
    const { user, updateUser } = useAuthStore();
    const [form, setForm] = useState({
        name: user?.name ?? '',
        email: user?.email ?? '',
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setIsLoading(true);

        try {
            const { data } = await apiClient.put('/updateprofile', form);
            updateUser(data.data);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.error?.message ?? 'Une erreur est survenue.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-base-100 rounded-2xl border border-base-200 p-6">

            <div className="text-xs font-medium text-base-content/40 uppercase tracking-widest mb-5">
                Informations personnelles
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-neutral flex items-center justify-center text-neutral-content text-xl font-medium shrink-0">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <div className="text-sm font-medium text-base-content">{user?.name}</div>
                    <div className="text-xs text-base-content/40">{user?.email}</div>
                    <div className="text-xs text-base-content/30 mt-0.5 capitalize">
                        {user?.role === 'STUDENT' ? 'Étudiant' : 'Professeur'}
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                <div>
                    <label className="text-xs text-base-content/50 mb-1 block">Nom complet</label>
                    <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="input input-bordered input-sm w-full"
                    />
                </div>

                <div>
                    <label className="text-xs text-base-content/50 mb-1 block">Email</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="input input-bordered input-sm w-full"
                    />
                </div>

                {error && <div className="text-xs text-error">{error}</div>}
                {success && (
                    <div className="text-xs text-success">Profil mis à jour avec succès.</div>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-neutral btn-sm"
                    >
                        {isLoading
                            ? <span className="loading loading-spinner loading-xs" />
                            : 'Enregistrer'
                        }
                    </button>
                </div>

            </form>

        </div>
    );
};

// ─── Section : Sécurité ────────────────────────────────────

const SecuritySection = () => {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (form.newPassword !== form.confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }
        if (form.newPassword.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }

        setIsLoading(true);
        try {
            await apiClient.put('/updateprofile', {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
            });
            setSuccess(true);
            setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.error?.message ?? 'Une erreur est survenue.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-base-100 rounded-2xl border border-base-200 p-6">

            <div className="text-xs font-medium text-base-content/40 uppercase tracking-widest mb-5">
                Sécurité
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                <div>
                    <label className="text-xs text-base-content/50 mb-1 block">
                        Mot de passe actuel
                    </label>
                    <input
                        type="password"
                        value={form.currentPassword}
                        onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                        placeholder="••••••••"
                        required
                        className="input input-bordered input-sm w-full"
                    />
                </div>

                <div className="flex gap-3">
                    <div className="flex-1">
                        <label className="text-xs text-base-content/50 mb-1 block">
                            Nouveau mot de passe
                        </label>
                        <input
                            type="password"
                            value={form.newPassword}
                            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                            placeholder="••••••••"
                            required
                            className="input input-bordered input-sm w-full"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-xs text-base-content/50 mb-1 block">
                            Confirmer
                        </label>
                        <input
                            type="password"
                            value={form.confirmPassword}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            placeholder="••••••••"
                            required
                            className="input input-bordered input-sm w-full"
                        />
                    </div>
                </div>

                {error && <div className="text-xs text-error">{error}</div>}
                {success && (
                    <div className="text-xs text-success">
                        Mot de passe modifié avec succès.
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-neutral btn-sm"
                    >
                        {isLoading
                            ? <span className="loading loading-spinner loading-xs" />
                            : 'Changer le mot de passe'
                        }
                    </button>
                </div>

            </form>

        </div>
    );
};

// ─── Section : Notifications ───────────────────────────────

const NotificationsSection = () => {
    const [settings, setSettings] = useState({
        examReminder: true,
        lateTasks: true,
        highRisk: true,
        weeklySummary: false,
    });

    const toggle = (key: keyof typeof settings) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const items = [
        {
            key: 'examReminder' as const,
            label: 'Rappel avant un examen',
            sub: '24h et 1h avant',
        },
        {
            key: 'lateTasks' as const,
            label: 'Tâches en retard',
            sub: 'Notification quotidienne',
        },
        {
            key: 'highRisk' as const,
            label: 'Cours à risque élevé',
            sub: 'Quand le score dépasse HIGH',
        },
        {
            key: 'weeklySummary' as const,
            label: 'Résumé hebdomadaire',
            sub: 'Chaque lundi matin',
        },
    ];

    return (
        <div className="bg-base-100 rounded-2xl border border-base-200 p-6">

            <div className="text-xs font-medium text-base-content/40 uppercase tracking-widest mb-5">
                Notifications
            </div>

            <div className="flex flex-col">
                {items.map((item, i) => (
                    <div
                        key={item.key}
                        className={`flex justify-between items-center py-3 ${i < items.length - 1 ? 'border-b border-base-200' : ''}`}
                    >
                        <div>
                            <div className="text-sm text-base-content">{item.label}</div>
                            <div className="text-xs text-base-content/40 mt-0.5">{item.sub}</div>
                        </div>
                        <input
                            type="checkbox"
                            className="toggle toggle-sm"
                            checked={settings[item.key]}
                            onChange={() => toggle(item.key)}
                        />
                    </div>
                ))}
            </div>

        </div>
    );
};

// ─── Section : Statistiques ────────────────────────────────

const StatsSection = () => {
    const { user } = useAuthStore();

    const stats = [
        {
            label: 'Membre depuis', value: user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString('fr-FR', {
                    month: 'long', year: 'numeric',
                })
                : '—'
        },
        { label: 'Rôle', value: user?.role === 'STUDENT' ? 'Étudiant' : 'Professeur' },
    ];

    return (
        <div className="bg-base-100 rounded-2xl border border-base-200 p-6">

            <div className="text-xs font-medium text-base-content/40 uppercase tracking-widest mb-5">
                Informations du compte
            </div>

            <div className="flex flex-col">
                {stats.map((s, i) => (
                    <div
                        key={s.label}
                        className={`flex justify-between items-center py-3 text-sm ${i < stats.length - 1 ? 'border-b border-base-200' : ''}`}
                    >
                        <span className="text-base-content/50">{s.label}</span>
                        <span className="font-medium text-base-content">{s.value}</span>
                    </div>
                ))}
            </div>

        </div>
    );
};

// ─── Section : PWA Install ─────────────────────────────────

const PwaSection = () => {
    const { canInstall, install, installed, isIos } = usePwaInstall();

    return (
        <div className="bg-base-100 rounded-2xl border border-base-200 p-6">

            <div className="text-xs font-medium text-base-content/40 uppercase tracking-widest mb-5">
                Application
            </div>

            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral flex items-center justify-center text-2xl shrink-0">
                    📚
                </div>
                <div className="flex-1">
                    <div className="text-sm font-medium text-base-content mb-1">
                        Installer l'application
                    </div>
                    <div className="text-xs text-base-content/40">
                        Accède à l'app depuis ton bureau ou écran d'accueil
                    </div>
                </div>
                {installed ? (
                    <span className="badge badge-success badge-sm">Installée</span>
                ) : isIos ? (
                    <span className="text-xs text-base-content/40 max-w-32 text-right">
                        Appuie sur Partager → "Sur l'écran d'accueil"
                    </span>
                ) : canInstall ? (
                    <button onClick={install} className="btn btn-neutral btn-sm shrink-0">
                        Installer
                    </button>
                ) : (
                    <span className="text-xs text-base-content/30">Déjà installée</span>
                )}
            </div>

        </div>
    );
};

// ─── Section : Danger zone ─────────────────────────────────

const DangerZone = () => {
    // const { logout : _logout} = useAuth();
    const [confirm, setConfirm] = useState(false);

    return (
        <div className="bg-error/5 border border-error/20 rounded-2xl p-6">

            <div className="text-xs font-medium text-error/70 uppercase tracking-widest mb-5">
                Zone dangereuse
            </div>

            <div className="flex justify-between items-center">
                <div>
                    <div className="text-sm font-medium text-error">
                        Supprimer mon compte
                    </div>
                    <div className="text-xs text-error/60 mt-0.5">
                        Toutes les données seront supprimées définitivement
                    </div>
                </div>
                {confirm ? (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setConfirm(false)}
                            className="btn btn-ghost btn-xs"
                        >
                            Annuler
                        </button>
                        <button className="btn btn-error btn-xs">
                            Confirmer
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setConfirm(true)}
                        className="btn btn-error btn-outline btn-sm"
                    >
                        Supprimer
                    </button>
                )}
            </div>

        </div>
    );
};

// ─── Page principale ───────────────────────────────────────

export default function ProfilePage() {
    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-5">

            <h1 className="text-xl font-medium text-base-content">Mon profil</h1>

            <PersonalInfoSection />
            <SecuritySection />
            <NotificationsSection />
            <StatsSection />
            <PwaSection />
            <DangerZone />

        </div>
    );
}