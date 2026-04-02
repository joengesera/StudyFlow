import { useState, useEffect } from 'react';
import { isAxiosError } from 'axios';
import { useAuthStore } from '../../stores/authStore';
import { apiClient } from '../../api/client';

// ─── Hook install PWA ──────────────────────────────────────

const usePwaInstall = () => {
    const [prompt, setPrompt] = useState<Event & { prompt?: () => void } | null>(null);
    const [installed, setInstalled] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setPrompt(e as Event & { prompt?: () => void });
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

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
        language: user?.language ?? 'fr',
        timezone: 'UTC+2'
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
        <div className="bg-[#FAF9F6] rounded-[16px] border border-[#E5E5E5] p-6">
            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-6">
                Informations personnelles
            </div>

            {/* Avatar section */}
            <div className="flex items-center gap-5 mb-8">
                <div className="w-[64px] h-[64px] rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center text-[24px] font-bold text-[#1A1A1A] shrink-0">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <div className="text-[15px] font-bold text-[#1A1A1A]">{user?.name}</div>
                    <div className="text-[13px] font-medium text-[#737373] mb-1">{user?.email}</div>
                    <button type="button" className="border border-[#E5E5E5] rounded-[8px] bg-transparent px-3 py-1 text-[11px] font-bold text-[#1A1A1A] hover:bg-white transition-colors mt-0.5">
                        Changer la photo
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-1">
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                            Nom complet
                        </label>
                        <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none bg-white focus:border-[#A3A3A3] transition-colors shadow-sm"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                            Email
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none bg-white focus:border-[#A3A3A3] transition-colors shadow-sm"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-1 relative">
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                            Langue
                        </label>
                        <select 
                            value={form.language}
                            onChange={(e) => setForm({ ...form, language: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none bg-white appearance-none cursor-pointer focus:border-[#A3A3A3] transition-colors shadow-sm"
                        >
                            <option value="fr">Français</option>
                            <option value="en">Anglais</option>
                        </select>
                        <div className="absolute right-4 top-[38px] pointer-events-none text-[#737373]">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                            Fuseau horaire
                        </label>
                        <select 
                            value={form.timezone}
                            onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[14px] font-medium text-[#1A1A1A] outline-none bg-white appearance-none cursor-pointer focus:border-[#A3A3A3] transition-colors shadow-sm"
                        >
                            <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                            <option value="UTC">UTC</option>
                            <option value="America/New_York">America/New_York (EST)</option>
                        </select>
                        <div className="absolute right-4 top-[38px] pointer-events-none text-[#737373]">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {error && <div className="text-[12px] font-bold text-[#EF4444] mt-1">{error}</div>}
                {success && <div className="text-[12px] font-bold text-[#10B981] mt-1">Profil mis à jour avec succès.</div>}

                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="h-10 px-5 rounded-xl border border-[#E5E5E5] text-[14px] font-bold text-[#1A1A1A] bg-transparent hover:bg-white transition-colors flex items-center justify-center min-w-[120px]"
                    >
                        {isLoading ? <span className="w-4 h-4 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" /> : 'Enregistrer'}
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
        <div className="bg-[#FAF9F6] rounded-[16px] border border-[#E5E5E5] p-6">
            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-6">
                Sécurité
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                    <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                        Mot de passe actuel
                    </label>
                    <input
                        type="password"
                        value={form.currentPassword}
                        onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                        placeholder="••••••••"
                        required
                        className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[16px] font-mono tracking-[0.2em] text-[#A3A3A3] outline-none bg-white focus:border-[#A3A3A3] focus:text-[#1A1A1A] transition-colors shadow-sm placeholder:tracking-[0.2em] placeholder:text-[#D4D4D4] pt-1"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-1">
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                            Nouveau mot de passe
                        </label>
                        <input
                            type="password"
                            value={form.newPassword}
                            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                            placeholder="••••••••"
                            required
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[16px] font-mono tracking-[0.2em] text-[#A3A3A3] outline-none bg-white focus:border-[#A3A3A3] focus:text-[#1A1A1A] transition-colors shadow-sm placeholder:tracking-[0.2em] placeholder:text-[#D4D4D4] pt-1"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2 block">
                            Confirmer
                        </label>
                        <input
                            type="password"
                            value={form.confirmPassword}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            placeholder="••••••••"
                            required
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] text-[16px] font-mono tracking-[0.2em] text-[#A3A3A3] outline-none bg-white focus:border-[#A3A3A3] focus:text-[#1A1A1A] transition-colors shadow-sm placeholder:tracking-[0.2em] placeholder:text-[#D4D4D4] pt-1"
                        />
                    </div>
                </div>

                {error && <div className="text-[12px] font-bold text-[#EF4444] mt-1">{error}</div>}
                {success && <div className="text-[12px] font-bold text-[#10B981] mt-1">Mot de passe modifié avec succès.</div>}

                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="h-10 px-5 rounded-xl border border-[#E5E5E5] text-[14px] font-bold text-[#1A1A1A] bg-transparent hover:bg-white transition-colors flex items-center justify-center min-w-[200px]"
                    >
                        {isLoading ? <span className="w-4 h-4 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" /> : 'Changer le mot de passe'}
                    </button>
                </div>
            </form>
        </div>
    );
};

// ─── Section : Notifications ───────────────────────────────

const NotificationsSection = () => {
    const [settings, setSettings] = useState({
        examReminder: false,
        lateTasks: false,
        highRisk: false,
        weeklySummary: false,
    });
    
    const [permissionStatus, setPermissionStatus] = useState(
        'Notification' in window ? Notification.permission : 'denied'
    );

    const toggle = async (key: keyof typeof settings) => {
        if (!settings[key] && permissionStatus !== 'granted') {
            if ('Notification' in window) {
                const result = await Notification.requestPermission();
                setPermissionStatus(result);
                if (result !== 'granted') return;
            } else {
                alert("Ce navigateur ne supporte pas les notifications desktop.");
                return;
            }
        }
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
        
        // Exemple de scheduling direct d'une notification de test (10 sec plus tard)
        if (!settings[key] && permissionStatus === 'granted') {
            // (import dynamically or use window for tests)
            try {
                const reg = await navigator.serviceWorker.ready;
                // Si showTrigger est dispo
                if ('showTrigger' in Notification.prototype) {
                    await reg.showNotification('Notifications Activées !', {
                        body: `L'alerte "${key}" est active.`,
                        icon: '/pwa-192x192.png',
                        // @ts-ignore
                        showTrigger: new (window.TimestampTrigger as any)(Date.now() + 5000)
                    });
                } else {
                    // Fallback local timeout si app ouverte
                    setTimeout(() => {
                        reg.showNotification('Notifications Activées !', {
                            body: `L'alerte "${key}" est active.`,
                            icon: '/pwa-192x192.png',
                        });
                    }, 5000);
                }
            } catch (e) {
                console.warn('Erreur test notification locale:', e);
            }
        }
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
        <div className="bg-[#FAF9F6] rounded-[16px] border border-[#E5E5E5] p-6">
            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-2">
                Notifications
            </div>

            <div className="flex flex-col">
                {items.map((item, i) => (
                    <div
                        key={item.key}
                        className={`flex justify-between items-center py-4 ${i < items.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}
                    >
                        <div>
                            <div className="text-[14px] font-bold text-[#1A1A1A]">{item.label}</div>
                            <div className="text-[12px] font-medium text-[#737373] mt-0.5">{item.sub}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings[item.key]}
                                onChange={() => toggle(item.key)}
                            />
                            <div className="w-[44px] h-[24px] bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                        </label>
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
        { label: 'Tâches complétées', value: '47' },
        { label: 'Sessions Pomodoro', value: '23' },
        { label: 'Cours suivis', value: '6' },
        {
            label: 'Membre depuis', value: user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString('fr-FR', {
                    month: 'short', year: 'numeric',
                }).replace('.', '')
                : '—'
        },
        { label: 'Dernière synchronisation', value: 'il y a 2 min' },
    ];

    return (
        <div className="bg-[#FAF9F6] rounded-[16px] border border-[#E5E5E5] p-6">
            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-1">
                Statistiques du compte
            </div>

            <div className="flex flex-col">
                {stats.map((s, i) => (
                    <div
                        key={s.label}
                        className={`flex justify-between items-center py-3.5 ${i < stats.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}
                    >
                        <span className="text-[13px] font-bold text-[#737373]">{s.label}</span>
                        <span className="text-[14px] font-bold text-[#1A1A1A]">{s.value}</span>
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
        <div className="bg-[#FAF9F6] rounded-[16px] border border-[#E5E5E5] p-6">
            <div className="text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-5">
                Application
            </div>

            <div className="flex items-center gap-4">
                <div className="w-[50px] h-[50px] rounded-[12px] bg-[#1A1A1A] flex items-center justify-center text-white text-[16px] font-bold shrink-0 tracking-tighter">
                    SF
                </div>
                <div className="flex-1">
                    <div className="text-[14px] font-bold text-[#1A1A1A] mb-0.5">
                        Installer l'application
                    </div>
                    <div className="text-[12px] font-medium text-[#737373]">
                        Accédez à l'app depuis ton bureau ou écran d'accueil
                    </div>
                </div>
                {installed ? (
                    <span className="bg-[#E5E5E5] text-[#1A1A1A] px-2 py-1 rounded-[6px] text-[11px] font-bold border border-[#D4D4D4]">Installée</span>
                ) : isIos ? (
                    <span className="text-[11px] font-bold text-[#737373] max-w-[120px] text-right leading-tight">
                        Appuie sur Partager → "Sur l'écran d'accueil"
                    </span>
                ) : canInstall ? (
                    <button onClick={install} className="h-9 px-4 rounded-xl border border-[#E5E5E5] text-[13px] font-bold text-[#1A1A1A] bg-white hover:bg-gray-50 transition-colors shrink-0">
                        Installer
                    </button>
                ) : (
                    <span className="text-[12px] font-bold text-[#A3A3A3]">Déjà installée</span>
                )}
            </div>
        </div>
    );
};

// ─── Section : Danger zone ─────────────────────────────────

const DangerZone = () => {
    const [confirm, setConfirm] = useState(false);

    return (
        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[16px] p-6 mb-8 relative">
            <div className="text-[11px] font-bold text-[#EF4444] uppercase tracking-widest mb-6">
                Zone dangereuse
            </div>

            <div className="flex justify-between items-center">
                <div>
                    <div className="text-[14px] font-bold text-[#EF4444]">
                        Supprimer mon compte
                    </div>
                    <div className="text-[12px] font-medium text-[#EF4444]/80 mt-1">
                        Toutes les données seront supprimées définitivement
                    </div>
                </div>
                {confirm ? (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setConfirm(false)}
                            className="h-10 px-4 rounded-xl text-[13px] font-bold text-[#1A1A1A] bg-transparent hover:bg-[#F3F4F6] transition-colors"
                        >
                            Annuler
                        </button>
                        <button className="h-10 px-4 rounded-xl border border-[#FECACA] text-[13px] font-bold text-[#EF4444] bg-[#FEE2E2] hover:bg-[#FECACA] transition-colors shadow-sm">
                            Confirmer
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setConfirm(true)}
                        className="h-10 px-5 rounded-xl border border-[#FECACA] text-[14px] font-bold text-[#EF4444] bg-transparent hover:bg-[#FEE2E2] transition-colors"
                    >
                        Supprimer
                    </button>
                )}
            </div>

            {/* Simulated scroll arrow icon from design snippet positioned at center bottom layout roughly */}
            <div className="absolute -bottom-[22px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center text-[#737373] shadow-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20M12 20L5 13M12 20L19 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    );
};

// ─── Page principale ───────────────────────────────────────

export default function ProfilePage() {
    return (
        <div className="max-w-[700px] mx-auto flex flex-col gap-5 px-2 md:px-0 pt-2 pb-16">
            {/* Header */}
            <div className="flex justify-between items-center mb-1">
                <h1 className="text-[22px] font-bold text-[#1A1A1A] tracking-tight">Mon profil</h1>
                <button className="text-[24px] font-bold text-[#A3A3A3] hover:text-[#1A1A1A] transition-colors leading-[0.5] pb-2 px-1 tracking-widest cursor-pointer">
                    ...
                </button>
            </div>

            <PersonalInfoSection />
            <SecuritySection />
            <NotificationsSection />
            <StatsSection />
            <PwaSection />
            <DangerZone />
        </div>
    );
}