import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useAuth } from '../../hooks/useAuth';
import logo from '@/assets/Fichier1.svg'

export default function LoginPage() {
    const { login, isLoginLoading, loginError } = useAuth();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login({ email: form.email, password: form.password });
    };

    const backendError = loginError && isAxiosError(loginError)
        ? loginError.response?.data?.error?.message ?? 'Une erreur est survenue.'
        : null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="flex w-full max-w-3xl rounded-2xl overflow-hidden shadow-lg">

                {/* ── GAUCHE : Formulaire ── */}
                <div className="flex-1 bg-base-100 p-10 flex flex-col justify-center">

                    <div className="mb-7">
                        <h1 className="text-xl font-medium text-base-content">Bon retour 👋</h1>
                        <p className="text-sm text-base-content/50 mt-1">
                            Connecte-toi pour accéder à ton espace
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                        <div>
                            <label className="text-xs text-base-content/50 mb-1 block">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="lucas@univ.fr"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="input input-bordered input-sm w-full"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-base-content/50 mb-1 block">Mot de passe</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="input input-bordered input-sm w-full"
                            />
                        </div>

                        {/* Lien mot de passe oublié */}
                        <div className="text-right">
                            <Link
                                to="/forgot-password"
                                className="text-xs text-base-content/40 hover:text-base-content"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        {/* Erreur backend */}
                        {backendError && (
                            <div className="text-xs text-error">{backendError}</div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoginLoading}
                            className="btn btn-neutral btn-sm w-full mt-1"
                        >
                            {isLoginLoading
                                ? <span className="loading loading-spinner loading-xs" />
                                : 'Se connecter'
                            }
                        </button>

                    </form>

                    <p className="text-xs text-center text-base-content/40 mt-5">
                        Pas encore de compte ?{' '}
                        <Link to="/register" className="text-base-content font-medium">
                            Créer un compte
                        </Link>
                    </p>

                </div>

                {/* ── DROITE : Visuel ── */}
                <div className="w-64 bg-neutral flex flex-col items-center justify-center p-8 shrink-0">

                    <div className="text-4xl mb-3"><img src={logo} alt="logo" className="w-20 h-20" /></div>
                    <div className="text-sm font-medium text-neutral-content mb-1">StudyFlow</div>
                    <div className="text-xs text-neutral-content/40 text-center mb-8">
                        Ton assistant académique
                    </div>

                </div>

            </div>
        </div>
    );
}