import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { isAxiosError } from 'axios';

export default function RegisterPage() {
    const { register, isRegisterLoading, registerError } = useAuth();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [localError, setLocalError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setLocalError('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        // Validation locale avant d'appeler l'API
        if (form.password !== form.confirmPassword) {
            setLocalError('Les mots de passe ne correspondent pas.');
            return;
        }
        if (form.password.length < 8) {
            setLocalError('Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }

        register({
            name: `${form.firstName} ${form.lastName}`.trim(),
            email: form.email,
            password: form.password,
            role: 'STUDENT'
        });
    };

    // Erreur venant du backend
    const backendError = registerError && isAxiosError(registerError)
        ? registerError.response?.data?.error?.message ?? 'Une erreur est survenue.'
        : null;

    const error = localError || backendError;

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="flex w-full max-w-3xl rounded-2xl overflow-hidden shadow-lg">

                {/* ── GAUCHE : Formulaire ── */}
                <div className="flex-1 bg-base-100 p-10 flex flex-col justify-center">

                    <div className="mb-7">
                        <h1 className="text-xl font-medium text-base-content">Créer un compte</h1>
                        <p className="text-sm text-base-content/50 mt-1">
                            Commence à gérer tes cours et tâches
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                        {/* Prénom + Nom */}
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-xs text-base-content/50 mb-1 block">Prénom</label>
                                <input
                                    name="firstName"
                                    type="text"
                                    placeholder="Lucas"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    required
                                    className="input input-bordered input-sm w-full"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-base-content/50 mb-1 block">Nom</label>
                                <input
                                    name="lastName"
                                    type="text"
                                    placeholder="Martin"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    required
                                    className="input input-bordered input-sm w-full"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-xs text-base-content/50 mb-1 block">Email universitaire</label>
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

                        {/* Mot de passe */}
                        <div>
                            <label className="text-xs text-base-content/50 mb-1 block">Mot de passe</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="8 caractères minimum"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="input input-bordered input-sm w-full"
                            />
                        </div>

                        {/* Confirmer */}
                        <div>
                            <label className="text-xs text-base-content/50 mb-1 block">Confirmer le mot de passe</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                                className="input input-bordered input-sm w-full"
                            />
                        </div>

                        {/* Erreur */}
                        {error && (
                            <div className="text-xs text-error">{error}</div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isRegisterLoading}
                            className="btn btn-neutral btn-sm w-full mt-1"
                        >
                            {isRegisterLoading
                                ? <span className="loading loading-spinner loading-xs" />
                                : 'Créer mon compte'
                            }
                        </button>

                    </form>

                    <p className="text-xs text-center text-base-content/40 mt-5">
                        Déjà un compte ?{' '}
                        <Link to="/login" className="text-base-content font-medium">
                            Se connecter
                        </Link>
                    </p>

                </div>

                {/* ── DROITE : Visuel ── */}
                <div className="w-64 bg-neutral flex flex-col items-center justify-center p-8 shrink-0">

                    <div className="text-4xl mb-3">📚</div>
                    <div className="text-sm font-medium text-neutral-content mb-1">StudentApp</div>
                    <div className="text-xs text-neutral-content/40 text-center mb-8">
                        Ton assistant académique
                    </div>

                    {[
                        { icon: '📅', title: 'Agenda intelligent', sub: 'Cours, examens, révisions' },
                        { icon: '✅', title: 'Gestion des tâches', sub: 'Board Kanban + Pomodoro' },
                        { icon: '📊', title: 'Suivi des notes', sub: 'Moyennes et statistiques' },
                        { icon: '⚠️', title: 'Analyse de risque', sub: 'Anticipe les difficultés' },
                    ].map((f) => (
                        <div key={f.title} className="flex items-start gap-3 mb-5 last:mb-0">
                            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-sm shrink-0">
                                {f.icon}
                            </div>
                            <div>
                                <div className="text-xs font-medium text-neutral-content">{f.title}</div>
                                <div className="text-xs text-neutral-content/40">{f.sub}</div>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}