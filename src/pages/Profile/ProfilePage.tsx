import { User as UserIcon, Contrast, Settings, Lock, EyeOff, Eye, Bell, BarChart3, Smartphone, Trash2, MoreVertical, Sun, Moon, Monitor } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { isApiError, apiClient } from '../../api/client';
import { useAuthStore, type User } from '../../stores/authStore';
import { useVisualComfort, MIN_VISUAL_SCALE, MAX_VISUAL_SCALE, DEFAULT_VISUAL_SCALE } from '../../hooks/useVisualComfort';
import { useTheme, type ThemeMode } from '../../hooks/useTheme';
import { usePushNotifications } from '../../hooks/usePushNotifications';
import { getInitials } from '../../utils/initials';

const usePwaInstall = () => {
  const [prompt, setPrompt] = useState<Event & { prompt?: () => void } | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => { e.preventDefault(); setPrompt(e as Event & { prompt?: () => void }); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => { if (!prompt?.prompt) return; prompt.prompt(); setInstalled(true); setPrompt(null); };
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  return { canInstall: !!prompt, install, installed, isIos };
};

const PersonalInfoSection = () => {
  const { user, updateUser } = useAuthStore();
  const [form, setForm] = useState({ name: user?.name ?? '', email: user?.email ?? '', language: user?.language ?? 'fr', timezone: 'Europe/Paris' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setSuccess(false); setIsLoading(true);
    try {
      const { data } = await apiClient.put<{ data: Partial<User> }>('/updateprofile', form);
      updateUser(data.data); setSuccess(true); setTimeout(() => setSuccess(false), 3000);
    } catch (err) { if (isApiError(err)) setError(err.response?.data?.error?.message ?? 'Une erreur est survenue.'); }
    finally { setIsLoading(false); }
  };

  return (
    <section className="card card-padded">
      <div className="flex items-center gap-3 mb-6">
        <UserIcon className="text-primary text-[20px]" />
        <div className="text-label-caps font-label-caps text-on-surface-variant">Informations personnelles</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-5 p-4 bg-surface-container rounded-lg">
          <div className="w-16 h-16 rounded-full border border-outline-variant bg-surface-container-lowest flex items-center justify-center text-2xl font-bold text-on-surface shrink-0">
            {getInitials(user?.name)}
          </div>
          <div className="flex-1">
            <div className="text-body-lg font-body-lg font-medium text-on-surface">{user?.name}</div>
            <div className="text-body-md font-body-md text-on-surface-variant mt-1">{user?.email}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Nom complet</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input input-bordered w-full h-12 text-base" />
          </div>
          <div>
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input input-bordered w-full h-12 text-base" />
          </div>
        </div>

        {error && <div className="text-label-sm font-label-sm text-error">{error}</div>}
        {success && <div className="text-label-sm font-label-sm text-primary">Profil mis à jour avec succès.</div>}

        <div className="flex justify-end">
          <button type="submit" disabled={isLoading} className="btn btn-primary min-w-[140px]">
            {isLoading ? <span className="loading loading-spinner loading-sm" /> : 'Enregistrer'}
          </button>
        </div>
      </form>
    </section>
  );
};

const AppearanceSection = () => {
  const { mode, resolved, setMode } = useTheme();
  const options: { value: ThemeMode; icon: LucideIcon; label: string; sub: string }[] = [
    { value: 'light', icon: Sun, label: 'Clair', sub: 'Toujours clair' },
    { value: 'dark', icon: Moon, label: 'Sombre', sub: 'Toujours sombre' },
    { value: 'system', icon: Monitor, label: 'Système', sub: `Suit le navigateur (actuel : ${resolved === 'dark' ? 'sombre' : 'clair'})` },
  ];
  return (
    <section className="card card-padded">
      <div className="flex items-center gap-3 mb-4">
        <Contrast className="text-primary text-[20px]" />
        <div className="text-label-caps font-label-caps text-on-surface-variant">Apparence</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Thème d'affichage">
        {options.map((opt) => {
          const active = mode === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setMode(opt.value)}
              className={`flex items-center gap-3 p-4 rounded-lg border text-left transition-colors ${
                active
                  ? 'border-primary bg-surface-container'
                  : 'border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low'
              }`}
            >
              <opt.icon className={`text-[24px] ${active ? 'text-primary' : 'text-on-surface-variant'}`} />
              <span>
                <span className="block text-body-md font-body-md font-medium text-on-surface">{opt.label}</span>
                <span className="block text-label-sm font-label-sm text-on-surface-variant mt-0.5">{opt.sub}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

const VisualComfortSection = () => {
  const { scale, setScale } = useVisualComfort();
  const formatPercent = (value: number) => `${value}%`;
  return (
    <section className="card card-padded">
      <div className="flex items-center gap-3 mb-4">
        <Settings className="text-primary text-[20px]" />
        <div className="text-label-caps font-label-caps text-on-surface-variant">Accessibilité visuelle</div>
      </div>
      <p className="text-body-md font-body-md text-on-surface-variant mb-4">Ajuste la taille globale des textes de 100 à 200 % pour un meilleur confort de lecture.</p>
      <div className="flex items-center gap-4 mb-1">
        <input
          type="range"
          min={MIN_VISUAL_SCALE}
          max={MAX_VISUAL_SCALE}
          step={10}
          value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
          aria-label="Taille des textes"
          className="range range-primary flex-1"
        />
        <div className={`min-w-16 px-3 py-1 rounded text-label-caps font-label-caps whitespace-nowrap ${scale === DEFAULT_VISUAL_SCALE ? 'bg-surface-container-highest text-on-surface-variant' : 'bg-primary text-on-primary'}`}>
          {formatPercent(scale)}
        </div>
      </div>
      <div className="flex justify-between text-label-sm font-label-sm text-on-surface-variant mb-4">
        <span>{formatPercent(MIN_VISUAL_SCALE)}</span>
        <span>Exemple de texte : la taille change en direct.</span>
        <span>{formatPercent(MAX_VISUAL_SCALE)}</span>
      </div>
      <div className="rounded p-4 bg-surface-container-highest text-body-md font-body-md text-on-surface" aria-live="polite">
        Régler la taille des textes améliore le confort de lecture de toute l&apos;application, y compris les titres et les listes de cours.
      </div>
      {scale !== DEFAULT_VISUAL_SCALE && (
        <button
          type="button"
          onClick={() => setScale(DEFAULT_VISUAL_SCALE)}
          className="btn btn-neutral btn-sm mt-4"
        >
          Réinitialiser
        </button>
      )}
    </section>
  );
};

const SecuritySection = () => {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setSuccess(false);
    if (form.newPassword !== form.confirmPassword) { setError('Les mots de passe ne correspondent pas.'); return; }
    if (form.newPassword.length < 8) { setError('Le mot de passe doit contenir au moins 8 caractères.'); return; }
    setIsLoading(true);
    try {
      await apiClient.put('/updateprofile', { currentPassword: form.currentPassword, newPassword: form.newPassword });
      setSuccess(true); setForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); setTimeout(() => setSuccess(false), 3000);
    } catch (err) { if (isApiError(err)) setError(err.response?.data?.error?.message ?? 'Une erreur est survenue.'); }
    finally { setIsLoading(false); }
  };

  return (
    <section className="card card-padded">
      <div className="flex items-center gap-3 mb-6">
        <Lock className="text-primary text-[20px]" />
        <div className="text-label-caps font-label-caps text-on-surface-variant">Sécurité</div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Mot de passe actuel</label>
          <div className="relative">
            <input type={showCurrent ? 'text' : 'password'} value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} placeholder="••••••••" required className="input input-bordered w-full h-12 pr-12 text-base font-mono tracking-wider" />
            <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
              {showCurrent ? <EyeOff className="text-[20px]" /> : <Eye className="text-[20px]" />}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Nouveau mot de passe</label>
            <div className="relative">
              <input type={showNew ? 'text' : 'password'} value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} placeholder="••••••••" required className="input input-bordered w-full h-12 pr-12 text-base font-mono tracking-wider" />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
                {showNew ? <EyeOff className="text-[20px]" /> : <Eye className="text-[20px]" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Confirmer</label>
            <div className="relative">
              <input type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} placeholder="••••••••" required className="input input-bordered w-full h-12 pr-12 text-base font-mono tracking-wider" />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
                {showConfirm ? <EyeOff className="text-[20px]" /> : <Eye className="text-[20px]" />}
              </button>
            </div>
          </div>
        </div>
        {error && <div className="text-label-sm font-label-sm text-error">{error}</div>}
        {success && <div className="text-label-sm font-label-sm text-primary">Mot de passe modifié avec succès.</div>}
        <div className="flex justify-end">
          <button type="submit" disabled={isLoading} className="btn btn-primary min-w-[200px]">
            {isLoading ? <span className="loading loading-spinner loading-sm" /> : 'Changer le mot de passe'}
          </button>
        </div>
      </form>
    </section>
  );
};

const NotificationsSection = () => {
  const { isSupported, permissionStatus, isSubscribed, isLoading, error, preferences, setPreference, enablePush, disablePush, sendTestNotification } = usePushNotifications();

  return (
    <section className="card card-padded">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Bell className="text-primary text-[20px]" />
          <div className="text-label-caps font-label-caps text-on-surface-variant">Notifications push</div>
        </div>
        <span className={`px-2.5 py-1 rounded text-label-caps font-label-caps bg-surface-container-highest text-on-surface-variant`}>
          {(() => { if (!isSupported) return 'Non supporté'; if (permissionStatus === 'denied') return 'Bloqué'; if (permissionStatus === 'granted' && isSubscribed) return 'Actif'; return 'Inactif'; })()}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {isSubscribed ? (
          <> <button type="button" onClick={() => void sendTestNotification()} disabled={isLoading} className="btn btn-outlined">Tester</button>
            <button type="button" onClick={() => void disablePush()} disabled={isLoading} className="btn btn-error">Désactiver push</button>
          </>
        ) : (
          <button type="button" onClick={() => void enablePush()} disabled={isLoading || !isSupported} className="btn btn-primary">Activer push</button>
        )}
      </div>

      {!isSupported && <div className="text-label-sm font-label-sm text-on-surface-variant mb-3">Ce navigateur ne supporte pas les notifications push.</div>}
      {permissionStatus === 'denied' && <div className="text-label-sm font-label-sm text-tertiary mb-3">Permission bloquée. Autorise dans les paramètres du navigateur.</div>}
      {error && <div className="text-label-sm font-label-sm text-error mb-3">{error}</div>}

      <div className="text-label-caps font-label-caps text-on-surface-variant mb-2">Préférences de notification</div>
      <div className="space-y-0 divide-y divide-outline-variant">
        {([
          { key: 'examReminder', label: 'Rappel avant un examen', sub: '24h et 1h avant' },
          { key: 'lateTasks', label: 'Tâches en retard', sub: 'Notification quotidienne' },
          { key: 'highRisk', label: 'Cours à risque élevé', sub: 'Quand le score dépasse HIGH' },
          { key: 'weeklySummary', label: 'Résumé hebdomadaire', sub: 'Chaque lundi matin' },
        ] as const).map((item) => (
          <div key={item.key} className="flex justify-between items-center py-4">
            <div>
              <div className="text-body-md font-body-md font-medium text-on-surface">{item.label}</div>
              <div className="text-label-sm font-label-sm text-on-surface-variant mt-0.5">{item.sub}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={preferences[item.key]} onChange={() => setPreference(item.key, !preferences[item.key])} />
              <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-outline-variant after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-checked:after:border-transparent" />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};

const StatsSection = () => {
  const { user } = useAuthStore();
  const stats = [
    { label: 'Tâches complétées', value: '47' },
    { label: 'Sessions Pomodoro', value: '23' },
    { label: 'Cours suivis', value: '6' },
    { label: 'Membre depuis', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }).replace('.', '') : '—' },
    { label: 'Dernière synchronisation', value: 'il y a 2 min' },
  ];
  return (
    <section className="card card-padded">
      <div className="flex items-center gap-3 mb-4">
        <BarChart3 className="text-primary text-[20px]" />
        <div className="text-label-caps font-label-caps text-on-surface-variant">Statistiques du compte</div>
      </div>
      <div className="divide-y divide-outline-variant">
        {stats.map((s) => (
          <div key={s.label} className="flex justify-between items-center py-4">
            <span className="text-label-sm font-label-sm text-on-surface-variant">{s.label}</span>
            <span className="text-body-md font-body-md font-medium text-on-surface">{s.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const PwaSection = () => {
  const { canInstall, install, installed, isIos } = usePwaInstall();
  return (
    <section className="card card-padded">
      <div className="flex items-center gap-3 mb-4">
        <Smartphone className="text-primary text-[20px]" />
        <div className="text-label-caps font-label-caps text-on-surface-variant">Application</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary text-xl font-bold shrink-0">SF</div>
        <div className="flex-1">
          <div className="text-body-md font-body-md font-medium text-on-surface mb-1">Installer l&apos;application</div>
          <div className="text-label-sm font-label-sm text-on-surface-variant">Accédez à l&apos;app depuis ton bureau ou écran d&apos;accueil</div>
        </div>
        {installed ? (
          <span className="btn btn-outlined px-3 py-1 text-label-sm">Installée</span>
        ) : isIos ? (
          <span className="text-label-sm font-label-sm text-on-surface-variant max-w-xs text-right leading-tight">Appuie sur Partager → &quot;Sur l&apos;écran d&apos;accueil&quot;</span>
        ) : canInstall ? (
          <button onClick={install} className="btn btn-outlined shrink-0">Installer</button>
        ) : (
          <span className="text-label-sm font-label-sm text-on-surface-variant">Déjà installée</span>
        )}
      </div>
    </section>
  );
};

const DangerZone = () => {
  const [confirm, setConfirm] = useState(false);
  return (
    <section className="card card-padded border-error/20 bg-error/5 relative">
      <div className="flex items-center gap-3 mb-4">
        <Trash2 className="text-error text-[20px]" />
        <div className="text-label-caps font-label-caps text-error">Zone dangereuse</div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-body-md font-body-md font-medium text-error">Supprimer mon compte</div>
          <div className="text-label-sm font-label-sm text-error/80 mt-1">Toutes les données seront supprimées définitivement</div>
        </div>
        {confirm ? (
          <div className="flex gap-2">
            <button onClick={() => setConfirm(false)} className="btn btn-outlined">Annuler</button>
            <button className="btn btn-error">Confirmer</button>
          </div>
        ) : (
          <button onClick={() => setConfirm(true)} className="btn btn-error">Supprimer</button>
        )}
      </div>
    </section>
  );
};

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 p-2 pt-2 pb-16">
      <header className="flex justify-between items-center mb-2">
        <h1 className="text-display-lg font-display-lg text-on-surface">Mon profil</h1>
        <button className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface" aria-label="Plus d&apos;options"><MoreVertical className="text-[24px]" /></button>
      </header>
      <PersonalInfoSection />
      <AppearanceSection />
      <VisualComfortSection />
      <SecuritySection />
      <NotificationsSection />
      <StatsSection />
      <PwaSection />
      <DangerZone />
    </div>
  );
}
