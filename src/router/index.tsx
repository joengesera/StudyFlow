import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRouter';
import { lazy, Suspense } from 'react';


const AppLayout = lazy(() => import('../layouts/AppLayout'));
const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/Auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/Auth/ResetPassword'));
const DashboardPage = lazy(() => import('../pages/Dashboard/DashboardPage'));
const CoursesPage = lazy(() => import('../pages/Courses/CoursesPage'));
const CourseDetailPage = lazy(() => import('../pages/Courses/CoursesDetailPage'));
const AgendaPage = lazy(() => import('../pages/Agenda/AgendaPage'));
const TasksPage = lazy(() => import('../pages/Tasks/TaskPage'));
const WorksPage = lazy(() => import('../pages/Works/WorksPage'));
const RiskPage = lazy(() => import('../pages/Risk/RiskPage'));
const ProfilePage = lazy(() => import('../pages/Profile/ProfilePage'));

const PageLoader = () => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    }}>
        <span className="loading loading-spinner loading-lg"></span>
    </div>
);

export const router = createBrowserRouter([

    // ─── Routes publiques ──────────────────────────────────
    {
        path: '/login',
        element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense>,
    },
    {
        path: '/register',
        element: <Suspense fallback={<PageLoader />}><RegisterPage /></Suspense>,
    },
    {
        path: '/forgot-password',
        element: <Suspense fallback={<PageLoader />}><ForgotPasswordPage /></Suspense>,
    },
    {
        path: '/reset-password',
        element: <Suspense fallback={<PageLoader />}><ResetPasswordPage /></Suspense>,
    },
   

    // ─── Routes protégées ──────────────────────────────────
    {
        element: <ProtectedRoute />,
        children: [
            {
                // AppLayout enveloppe toutes les pages protégées
                // Il affiche la sidebar + topbar
                // Les pages s'affichent via Outlet à l'intérieur
                element: <Suspense fallback={<PageLoader />}><AppLayout /></Suspense>,
                children: [
                    {
                        path: '/dashboard',
                        element: <Suspense fallback={<PageLoader />}><DashboardPage /></Suspense>,
                    },
                    {
                        path: '/courses',
                        element: <Suspense fallback={<PageLoader />}><CoursesPage /></Suspense>,
                    },
                    {
                        path: '/courses/:id',
                        element: <Suspense fallback={<PageLoader />}><CourseDetailPage /></Suspense>,
                    },
                    {
                        path: '/agenda',
                        element: <Suspense fallback={<PageLoader />}><AgendaPage /></Suspense>,
                    },
                    {
                        path: '/tasks',
                        element: <Suspense fallback={<PageLoader />}><TasksPage /></Suspense>,
                    },
                    {
                        path: '/works',
                        element: <Suspense fallback={<PageLoader />}><WorksPage /></Suspense>,
                    },
                    {
                        path: '/risk',
                        element: <Suspense fallback={<PageLoader />}><RiskPage /></Suspense>,
                    },
                    {
                        path: '/profile',
                        element: <Suspense fallback={<PageLoader />}><ProfilePage /></Suspense>,
                    },
                ],
            },
        ],
    },

    // ─── Redirections par défaut ───────────────────────────
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
    },
    {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
    },

]);
