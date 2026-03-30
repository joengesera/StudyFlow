import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useTheme } from '../hooks/useTheme';
import { useNetworkSync } from '../hooks/useNetworkSync';

const navItems = [
    { to: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { to: '/courses', icon: '📚', label: 'Cours' },
    { to: '/calendar', icon: '📅', label: 'Planning' },
    { to: '/tasks', icon: '✓', label: 'Tâches' },
    { to: '/works', icon: '📋', label: 'Works' },
    { to: '/profile', icon: '👤', label: 'Profil' },
];

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const { isOnline, isSyncing, queueCount } = useNetworkSync();

    // CORRECTIF : ferme la sidebar sur mobile quand on change de page
    useEffect(() => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    }, [location.pathname]);

    // CORRECTIF : sidebar fermée par défaut sur mobile
    useEffect(() => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">

            {/* ── OVERLAY mobile ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── SIDEBAR ── */}
            <aside className={`
        flex flex-col bg-base-100 border-r border-base-200
        transition-all duration-300 ease-in-out shrink-0 z-30
        fixed md:relative h-full
        ${sidebarOpen ? 'w-52' : 'w-0 md:w-14 overflow-hidden'}
      `}>

                {/* Logo + toggle */}
                <div className="flex items-center justify-between p-4 border-b border-base-300">
                    {sidebarOpen && (
                        <span className="font-medium text-sm text-base-content whitespace-nowrap">
                            📚 StudentApp
                        </span>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="btn btn-ghost btn-xs shrink-0"
                    >
                        {sidebarOpen ? '←' : '→'}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                transition-colors duration-100 whitespace-nowrap font-medium
                ${isActive
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-base-content/60 hover:bg-base-200/50 hover:text-base-content'
                                }
              `}
                        >
                            <span className="text-base shrink-0">{item.icon}</span>
                            {sidebarOpen && <span>{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                {/* User + logout */}
                <div className="p-3 border-t border-base-300">
                    {sidebarOpen ? (
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                                <div className="w-7 h-7 rounded-full bg-neutral flex items-center justify-center text-neutral-content text-xs font-medium shrink-0">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-xs text-base-content/70 truncate">
                                    {user?.name}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="btn btn-ghost btn-xs text-base-content/40 shrink-0"
                                title="Se déconnecter"
                            >
                                Quitter
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="btn btn-ghost btn-xs w-full"
                            title="Se déconnecter"
                        >
                            ←
                        </button>
                    )}
                </div>

            </aside>

            {/* ── CONTENU PRINCIPAL ── */}
            <main className={`
        flex-1 overflow-y-auto transition-all duration-200
        ${sidebarOpen ? 'md:ml-0' : ''}
      `}>

                {/* Topbar */}
                <div className="sticky top-0 z-10 bg-base-100 border-b border-base-200 px-6 py-3 flex items-center justify-between shadow-sm">
                    {/* Bouton burger sur mobile */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="btn btn-ghost btn-xs md:hidden"
                        >
                            ☰
                        </button>
                        <div className="text-sm text-base-content/50 font-medium">
                            {new Date().toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {!isOnline && (
                            <div className="badge badge-error badge-sm gap-2 font-medium px-3 h-7 text-xs">
                                <span className="w-2 h-2 rounded-full bg-white opacity-80 animate-pulse" />
                                Hors Ligne
                            </div>
                        )}
                        {isOnline && isSyncing && (
                            <div className="badge badge-warning badge-sm gap-2 font-medium px-3 h-7 text-xs">
                                <span className="loading loading-spinner loading-xs" />
                                Sync ({queueCount})
                            </div>
                        )}

                        <button onClick={toggleTheme} className="btn btn-ghost btn-sm btn-circle" title="Basculer le thème">
                            {theme === 'lofi' ? '🌙' : '☀️'}
                        </button>
                        <button className="btn btn-ghost btn-sm btn-circle relative">
                            🔔
                            <span className="badge badge-xs badge-primary absolute top-1 right-1"></span>
                        </button>
                    </div>
                </div>

                {/* Page courante */}
                <div className="p-6">
                    <Outlet />
                </div>

            </main>

        </div>
    );
}