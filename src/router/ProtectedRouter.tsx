import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore.ts';

export const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // Non connecté → on redirige vers login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Connecté → on affiche la page demandée
    // Outlet = la page enfant définie dans le router
    return <Outlet />;
}; 