import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSyncStore } from '../stores/syncStore';
import { useNetworkSync } from '../hooks/useNetworkSync';
import { SyncStatus } from '../components/SyncStatus/SyncStatus';
import { SmartCreateModal } from '../components/smart/SmartCreateModal';
import { ToastHost } from '../components/ToastHost';
import { NotificationCenter } from '../components/NotificationCenter/NotificationCenter';
import { useLocalNotifications } from '../hooks/useLocalNotifications';
import logo from '@/assets/Fichier1.svg';

const navItems = [
  { to: '/dashboard', icon: 'dashboard', label: 'Tableau de bord' },
  { to: '/courses', icon: 'school', label: 'Cours' },
  { to: '/agenda', icon: 'calendar_month', label: 'Planning' },
  { to: '/tasks', icon: 'task_alt', label: 'Tâches' },
  { to: '/works', icon: 'assignment', label: 'Travaux' },
  { to: '/risk', icon: 'analytics', label: 'Analyse de risque' },
];

const bottomNavItems = [
  { to: '/settings', icon: 'settings', label: 'Paramètres' },
  { to: '/profile', icon: 'account_circle', label: 'Profil' },
  { to: '/logout', icon: 'logout', label: 'Déconnexion', isLogout: true },
];

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [smartCreateOpen, setSmartCreateOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();
  const isSyncReady = useSyncStore((state) => state.isReady);

  // Point de montage unique du moteur de sync : vide la file offline
  // au retour du réseau et alimente l'indicateur de statut.
  useNetworkSync();

  // Moteur de notifications locales (détecteurs + badge + deep-links SW).
  useLocalNotifications();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
  };

  const currentPath = location.pathname;
  const getActivePath = () => {
    const matched = Object.keys({ '/dashboard': 1, '/courses': 1, '/agenda': 1, '/tasks': 1, '/works': 1, '/risk': 1, '/profile': 1, '/settings': 1 })
      .find(k => currentPath.startsWith(k));
    return matched || '/dashboard';
  };
  const activePath = getActivePath();

  if (!isSyncReady) {
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <div className="text-label-caps font-label-caps text-on-surface-variant">
          Initialisation hors ligne...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans text-base">
      {/* ── OVERLAY mobile ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50 
          w-sidebar bg-surface dark:bg-surface-dim 
          flex flex-col h-full py-unit z-20
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          border-r border-outline-variant dark:border-outline
        `}
        aria-label="Navigation principale"
      >
        {/* Brand */}
        <div className="px-6 py-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <img src={logo} alt="StudyFlow" className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-headline-md font-headline-md tracking-tight text-primary dark:text-primary-fixed-dim">StudyFlow</h1>
              <p className="text-label-sm font-label-sm text-on-surface-variant mt-1">Academic Excellence</p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 flex flex-col gap-1 px-2" aria-label="Navigation principale">
          {navItems.map((item) => {
            const isActive = currentPath.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`
                  flex items-center gap-3 px-4 py-2 text-label-sm font-label-sm rounded-lg
                  transition-all hover:scale-[0.98] duration-200
                  ${isActive
                    ? 'bg-surface-container dark:bg-surface-container-high text-primary dark:text-primary-fixed-dim font-semibold'
                    : 'text-on-surface-variant dark:text-on-secondary-fixed-variant hover:bg-surface-container-low dark:hover:bg-surface-container'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="material-symbols-outlined text-[20px]" data-icon={item.icon} style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="mt-auto px-2 pb-4 flex flex-col gap-1 border-t border-outline-variant pt-4 mx-2">
          {bottomNavItems.map((item) => {
            if (item.isLogout) {
              return (
                <button
                  key={item.label}
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2 text-on-surface-variant dark:text-on-secondary-fixed-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-all hover:scale-[0.98] duration-200 rounded-lg w-full text-left"
                >
                  <span className="material-symbols-outlined text-[20px]" data-icon={item.icon}>
                    {item.icon}
                  </span>
                  <span className="text-label-sm font-label-sm">{item.label}</span>
                </button>
              );
            }
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`
                  flex items-center gap-3 px-4 py-2 text-on-surface-variant dark:text-on-secondary-fixed-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-all hover:scale-[0.98] duration-200 rounded-lg
                  ${currentPath.startsWith(item.to) ? 'bg-surface-container-high text-primary dark:text-primary-fixed-dim font-semibold' : ''}
                `}
                aria-current={currentPath.startsWith(item.to) ? 'page' : undefined}
              >
                <span className="material-symbols-outlined text-[20px]" data-icon={item.icon}>
                  {item.icon}
                </span>
                <span className="text-label-sm font-label-sm">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </aside>

      {/* ── MAIN CONTENT WRAPPER ── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 relative">
        {/* TopNavBar */}
        <header className="bg-surface-container-lowest border-b border-outline-variant dark:border-outline flex justify-between items-center px-4 md:px-container-padding h-16 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden mr-4 text-on-surface-variant p-2 rounded-full hover:bg-surface-container-low"
              onClick={() => setSidebarOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={sidebarOpen}
            >
              <span className="material-symbols-outlined" data-icon="menu">menu</span>
            </button>
            <h2 className="text-headline-sm font-headline-sm text-on-surface hidden md:block">{getPageTitle(activePath)}</h2>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <SyncStatus />
            <NotificationCenter />
            <div className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant overflow-hidden flex items-center justify-center">
              <img
                alt="User Profile"
                className="object-cover w-full h-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjPgzRluqsnXngceN6sTBSyymxvKejnhWpH49qeMWUOsjF1BD21aFPaAPRDbwTJcADK6v3lWcbvRxhP3AiC_1cvwagDRwyu8MSxoq99FOe3-aYxm-lYRonMG6_bPJp1msaFViKq_ABthhFCJy_L8XkyWgibkmtnFiBnI38vMrmOXSJmu9ZO80J8FhtorXSWNdvJ1fbyD8b3zuE4NmJd9Zlp69IEV9PxkSTYS7brmrvSmT0I8S36_HCag"
              />
            </div>
          </div>
        </header>

        {/* Main Canvas */}
        <main className="flex-1 overflow-y-auto p-4 md:p-container-padding bg-background">
          <div className="max-w-[1200px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* FAB création intelligente — icône seule en mobile, étendu en desktop */}
      <button
        onClick={() => setSmartCreateOpen(true)}
        aria-label="Création intelligente de tâche ou d'événement"
        className="fixed z-40 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-[calc(1.5rem+env(safe-area-inset-right))] h-14 w-14 md:h-12 md:w-auto md:px-5 rounded-full bg-primary text-on-primary shadow-lg shadow-black/25 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
      >
        <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
        <span className="hidden md:inline text-label-lg font-label-lg font-semibold">Créer</span>
      </button>

      <SmartCreateModal open={smartCreateOpen} onClose={() => setSmartCreateOpen(false)} />
      <ToastHost />
    </div>
  );
}

function getPageTitle(path: string): string {
  const titles: Record<string, string> = {
    '/dashboard': 'Tableau de bord',
    '/courses': 'Mes cours',
    '/agenda': 'Planning',
    '/tasks': 'Tâches',
    '/works': 'Travaux',
    '/risk': 'Analyse de risque',
    '/profile': 'Profil',
    '/settings': 'Paramètres',
  };
  return titles[path] || 'StudyFlow';
}