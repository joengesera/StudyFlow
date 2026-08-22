import { useState, useEffect } from 'react';
import { isAxiosError } from 'axios';
import { useAuthStore } from '../../stores/authStore';
import { useVisualComfort, type VisualComfortMode } from '../../hooks/useVisualComfort';
import { usePushNotifications } from '../../hooks/usePushNotifications';
import { apiClient } from '../../api/client';

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
      const { data } = await apiClient.put('/updateprofile', form);
      updateUser(data.data); setSuccess(true); setTimeout(() => setSuccess(false), 3000);
    } catch (err) { if (isAxiosError(err)) setError(err.response?.data?.error?.message ?? 'Une erreur est survenue.'); }
    finally { setIsLoading(false); }
  };

  return (
    <section className="card card-padded">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-primary text-[20px]">person</span>
        <div className="text-label-caps font-label-caps text-on-surface-variant">Informations personnelles</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-5 p-4 bg-surface-container rounded-lg">
          <div className="w-16 h-16 rounded-full border border-outline-variant bg-surface-container-lowest flex items-center justify-center text-2xl font-bold text-on-surface shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Langue</label>
            <select value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} className="input input-bordered w-full h-12 text-base">
              <option value="fr">Français</option>
              <option value="en">Anglais</option>
            </select>
          </div>
          <div>
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Fuseau horaire</label>
            <select value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })} className="input input-bordered w-full h-12 text-base">
              <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
            </select>
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

const visualComfortOptions: Array<{ value: VisualComfortMode; title: string; description: string; scale: string }> = [
  { value: 'standard', title: 'Standard', description: 'Taille actuelle', scale: '100%' },
  { value: 'comfortable', title: 'Confort', description: 'Texte plus lisible', scale: '108%' },
  { value: 'high', title: 'Confort+', description: 'Maximum lisibilité', scale: '116%' },
];

const VisualComfortSection = () => {
  const { mode, setMode } = useVisualComfort();
  return (
    <section className="card card-padded">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-primary text-[20px]">settings</span>
        <div className="text-label-caps font-label-caps text-on-surface-variant">Accessibilité visuelle</div>
      </div>
      <p className="text-body-md font-body-md text-on-surface-variant mb-4">Ajuste la taille globale des textes pour un meilleur confort de lecture.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visualComfortOptions.map((option) => {
          const selected = mode === option.value;
          return (
            <button key={option.value} type="button" onClick={() => setMode(option.value)} aria-pressed={selected}
              className={`text-left card card-padded transition-colors ${selected ? 'ring-2 ring-primary' : 'hover:border-primary'}`}
            >
              <div className="text-body-md font-body-md font-medium text-on-surface">{option.title}</div>
              <div className="text-label-sm font-label-sm text-on-surface-variant mt-1">{option.description}</div>
              <div className={`mt-2 inline-flex px-2 py-1 rounded text-label-caps font-label-caps ${selected ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                {option.scale}
              </div>
            </button>
          );
        })}
      </div>
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
    } catch (err) { if (isAxiosError(err)) setError(err.response?.data?.error?.message ?? 'Une erreur est survenue.'); }
    finally { setIsLoading(false); }
  };

  return (
    <section className="card card-padded">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-primary text-[20px]">lock</span>
        <div className="text-label-caps font-label-caps text-on-surface-variant">Sécurité</div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Mot de passe actuel</label>
          <div className="relative">
            <input type={showCurrent ? 'text' : 'password'} value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} placeholder="••••••••" required className="input input-bordered w-full h-12 pr-12 text-base font-mono tracking-wider" />
            <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
              {showCurrent ? <span className="material-symbols-outlined text-[20px]">visibility_off</span> : <span className="material-symbols-outlined text-[20px]">visibility</span>}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Nouveau mot de passe</label>
            <div className="relative">
              <input type={showNew ? 'text' : 'password'} value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} placeholder="••••••••" required className="input input-bordered w-full h-12 pr-12 text-base font-mono tracking-wider" />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
                {showNew ? <span className="material-symbols-outlined text-[20px]">visibility_off</span> : <span className="material-symbols-outlined text-[20px]">visibility</span>}
              </button>
            </div>
          </div>
          <div>
            <label className="text-label-caps font-label-caps text-on-surface-variant mb-2 block">Confirmer</label>
            <div className="relative">
              <input type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} placeholder="••••••••" required className="input input-bordered w-full h-12 pr-12 text-base font-mono tracking-wider" />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
                {showConfirm ? <span className="material-symbols-outlined text-[20px]">visibility_off</span> : <span className="material-symbols-outlined text-[20px]">visibility</span>}
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
          <span className="material-symbols-outlined text-primary text-[20px]">notifications</span>
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
        {[
          { key: 'examReminder', label: 'Rappel avant un examen', sub: '24h et 1h avant' },
          { key: 'lateTasks', label: 'Tâches en retard', sub: 'Notification quotidienne' },
          { key: 'highRisk', label: 'Cours à risque élevé', sub: 'Quand le score dépasse HIGH' },
          { key: 'weeklySummary', label: 'Résumé hebdomadaire', sub: 'Chaque lundi matin' },
        ].map((item) => (
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
        <span className="material-symbols-outlined text-primary text-[20px]">bar_chart</span>
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
        <span className="material-symbols-outlined text-primary text-[20px]">smartphone</span>
        <div className="text-label-caps font-label-caps text-on-surface-variant">Application</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary text-xl font-bold shrink-0">SF</div>
        <div className="flex-1">
          <div className="text-body-md font-body-md font-medium text-on-surface mb-1">Installer l'application</div>
          <div className="text-label-sm font-label-sm text-on-surface-variant">Accédez à l'app depuis ton bureau ou écran d'accueil</div>
        </div>
        {installed ? (
          <span className="btn btn-outlined px-3 py-1 text-label-sm">Installée</span>
        ) : isIos ? (
          <span className="text-label-sm font-label-sm text-on-surface-variant max-w-xs text-right leading-tight">Appuie sur Partager → "Sur l'écran d'accueil"</span>
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
        <span className="material-symbols-outlined text-error text-[20px]">delete</span>
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
        <button className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface" aria-label="Plus d'options"><span className="material-symbols-outlined text-[24px]">more_vert</span></button>
      </header>
      <PersonalInfoSection />
      <VisualComfortSection />
      <SecuritySection />
      <NotificationsSection />
      <StatsSection />
      <PwaSection />
      <DangerZone />
    </div>
  );
}