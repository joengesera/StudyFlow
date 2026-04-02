import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    CalendarDays,
    CheckSquare,
    ClipboardList,
    AlertTriangle,
    User,
    LogOut,
    Bell,
    Menu,
    RefreshCw,
    WifiOff,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNetworkSync } from '../hooks/useNetworkSync';
import logo from '@/assets/Fichier1.svg'

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/courses', icon: BookOpen, label: 'Cours' },
    { to: '/agenda', icon: CalendarDays, label: 'Planning' },
    { to: '/tasks', icon: CheckSquare, label: 'Tâches' },
    { to: '/works', icon: ClipboardList, label: 'Works' },
    { to: '/risk', icon: AlertTriangle, label: 'Risque' },
];

const routeTitles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/courses': 'Mes cours',
    '/agenda': 'Planning',
    '/tasks': 'Tâches',
    '/works': 'Travaux',
    '/risk': 'Analyse de risque',
    '/profile': 'Mon profil',
};

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { isOnline, isSyncing } = useNetworkSync();

    // Fermeture de la sidebar sur mobile après navigation
    useEffect(() => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
    };

    // Obtenir le titre de la route actuelle
    const currentPath = location.pathname;
    const routeTitle = routeTitles[Object.keys(routeTitles).find(k => currentPath.startsWith(k)) || '/dashboard'] || 'Dashboard';

    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const dateFormatted = new Date().toLocaleDateString('fr-FR', dateOptions);

    return (
        <div className="flex h-screen bg-[#FAF9F6] overflow-hidden font-sans text-base">
            
            {/* ── OVERLAY mobile ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── SIDEBAR ── */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-50 
                w-[260px] md:w-[90px] bg-white md:bg-[#FAF9F6] 
                flex flex-col items-start md:items-center py-6 shrink-0 
                transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                shadow-2xl md:shadow-none
            `}>
                {/* Logo */}
                <div className="w-12 h-12 rounded-[14px] bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-[18px] mb-8 shadow-sm tracking-tighter ml-6 md:ml-0 shrink-0">
                    <img src={logo} alt="logo" className="w-8 h-8" />
                </div>

                {/* Bouton fermeture mobile */}
                <button 
                    className="md:hidden absolute top-7 right-6 w-10 h-10 flex items-center justify-center bg-[#FAF9F6] rounded-full text-[#1A1A1A]"
                    onClick={() => setSidebarOpen(false)}
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>

                {/* Navigation principale */}
                <nav className="flex flex-col gap-2 w-full">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                title={item.label}
                                className={() => `
                                    relative flex items-center md:justify-center w-full h-[60px] cursor-pointer group px-6 md:px-0
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        {/* Indicateur actif vertical */}
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-[#1A1A1A] rounded-r-md transition-all" />
                                        )}

                                        {/* Icone */}
                                        <div className={`
                                            w-[44px] h-[44px] rounded-[14px] flex items-center justify-center transition-all duration-200 shrink-0
                                            ${isActive 
                                                ? 'bg-[#FAF9F6] md:bg-white md:shadow-sm' 
                                                : 'opacity-40 group-hover:bg-[#E5E5E5] group-hover:opacity-100'
                                            }
                                        `}>
                                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="text-[#1A1A1A]" />
                                        </div>

                                        {/* Label Mobile */}
                                        <span className={`md:hidden ml-4 text-[15px] font-bold ${isActive ? 'text-[#1A1A1A]' : 'text-[#737373] opacity-60'}`}>
                                            {item.label}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Navigation secondaire (Bottom) */}
                <div className="mt-auto flex flex-col md:items-center gap-2 md:gap-4 w-full px-6 md:px-0 pb-4 md:pb-0">
                    <NavLink
                        to="/profile"
                        title="Profil"
                        className={() => `
                            relative flex items-center md:justify-center w-full h-[60px] cursor-pointer group
                        `}
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <div className="absolute left-[-24px] md:left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-[#1A1A1A] rounded-r-md" />
                                )}
                                <div className={`
                                    w-[44px] h-[44px] rounded-[14px] flex items-center justify-center transition-all duration-200 shrink-0
                                    ${isActive ? 'bg-[#FAF9F6] md:bg-white md:shadow-sm' : 'opacity-40 group-hover:bg-[#E5E5E5] group-hover:opacity-100'}
                                `}>
                                    <User size={20} strokeWidth={2} className="text-[#1A1A1A]" />
                                </div>
                                <span className={`md:hidden ml-4 text-[15px] font-bold ${isActive ? 'text-[#1A1A1A]' : 'text-[#737373] opacity-60'}`}>
                                    Profil
                                </span>
                            </>
                        )}
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className="relative flex items-center md:justify-center w-full h-[60px] cursor-pointer group px-6 md:px-0"
                        title="Se déconnecter"
                    >
                        <div className="w-[44px] h-[44px] rounded-[14px] md:rounded-full flex items-center justify-center bg-[#FEF2F2] md:bg-[#1A1A1A] text-[#EF4444] md:text-white shrink-0 group-hover:bg-[#FECACA] md:group-hover:opacity-80 transition-all md:shadow-sm md:group-hover:scale-105">
                            <LogOut size={18} strokeWidth={2.5} className="ml-0.5" />
                        </div>
                        <span className="md:hidden ml-4 text-[15px] font-bold text-[#EF4444]">
                            Déconnexion
                        </span>
                    </button>
                </div>
            </aside>

            {/* ── CONTENU PRINCIPAL ── */}
            <main className="flex-1 flex flex-col h-screen md:py-4 md:pr-4 overflow-hidden w-full relative z-10">

                {/* Mobile Header (hors cadre blanc) */}
                <div className="md:hidden flex items-center justify-between p-4 bg-[#FAF9F6]">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-[#E5E5E5]"
                        >
                            <Menu size={18} className="text-[#1A1A1A]" />
                        </button>
                        <div className="font-bold text-[#1A1A1A] text-[18px]">{routeTitle}</div>
                    </div>
                </div>

                {/* Grand Cadre Blanc (Application Content) */}
                <div className="flex-1 bg-white md:rounded-[24px] md:border border-[#E5E5E5] shadow-sm flex flex-col overflow-hidden relative">
                    
                    {/* Header Interne */}
                    <header className="px-6 md:px-8 py-5 border-b border-[#E5E5E5] flex justify-between items-center bg-white z-10 shrink-0">
                        {/* Titre (masqué sur mobile car déjà dans le mobile header hors cadre) */}
                        <h1 className="text-[20px] font-bold text-[#1A1A1A] tracking-tight hidden md:block">
                            {routeTitle}
                        </h1>
                        
                        <div className="flex-1 md:hidden" />

                        {/* Actions à droite */}
                        <div className="flex items-center gap-5">
                            <div className="text-[13px] font-bold text-[#737373] capitalize truncate max-w-[150px] sm:max-w-none">
                                {dateFormatted}
                            </div>

                            {/* Indicateurs de synchronisation */}
                            {!isOnline && (
                                <span className="bg-[#FEF2F2] text-[#EF4444] px-2.5 py-1 rounded-[6px] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                                    <WifiOff size={12} />
                                    Hors ligne
                                </span>
                            )}
                            {isOnline && isSyncing && (
                                <span className="bg-[#FEF3C7] text-[#F59E0B] px-2.5 py-1 rounded-[6px] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                                    <RefreshCw size={12} className="animate-spin" />
                                    Sync...
                                </span>
                            )}

                            {/* Notification Bell */}
                            <button className="relative hover:opacity-80 transition-opacity flex items-center justify-center cursor-pointer w-9 h-9">
                                <Bell size={20} className="text-[#1A1A1A]" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-[#F59E0B] rounded-full border-2 border-white shadow-sm" />
                            </button>
                        </div>
                    </header>

                    {/* Zone d'affichage des Pages */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin">
                        <div className="h-full">
                            <Outlet />
                        </div>
                    </div>

                </div>

            </main>

        </div>
    );
}