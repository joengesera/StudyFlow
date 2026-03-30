import { useState, type ChangeEvent, type FormEvent } from 'react';
import { isAxiosError } from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authAPI } from '../../api/auth.api';

interface FormValues {
    password: string;
    confirmPassword: string;
}

const initialForm: FormValues = {
    password: '',
    confirmPassword: '',
};

export default function ResetPasswordPage() {
    const [form, setForm] = useState<FormValues>(initialForm);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get('token')?.trim() ?? '';

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!token) {
            setError('Lien invalide: token manquant.');
            return;
        }

        if (form.password.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caracteres.');
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        setIsLoading(true);
        try {
            await authAPI.resetPassword({
                token,
                newPassword: form.password,
            });

            setSuccess('Mot de passe reinitialise avec succes. Redirection...');
            setForm(initialForm);
            setTimeout(() => navigate('/login'), 1200);
        } catch (err) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.error?.message ?? 'Impossible de reinitialiser le mot de passe.');
            } else {
                setError('Une erreur inattendue est survenue.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
                <div className="bg-base-100 rounded-2xl p-10 w-full max-w-md text-center shadow-lg">
                    <div className="text-4xl mb-3">⚠️</div>
                    <h1 className="text-lg font-medium text-base-content mb-2">Lien invalide</h1>
                    <p className="text-sm text-base-content/50 mb-6">
                        Ce lien de reinitialisation est incomplet ou invalide.
                    </p>
                    <Link to="/forgot-password" className="btn btn-neutral btn-sm w-full">
                        Demander un nouveau lien
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="bg-base-100 rounded-2xl p-10 w-full max-w-md shadow-lg">
                <div className="mb-7">
                    <h1 className="text-xl font-medium text-base-content">Nouveau mot de passe</h1>
                    <p className="text-sm text-base-content/50 mt-1">
                        Definis un nouveau mot de passe pour ton compte
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div>
                        <label className="text-xs text-base-content/50 mb-1 block">Nouveau mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder="8 caracteres minimum"
                            className="input input-bordered input-sm w-full"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-base-content/50 mb-1 block">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            className="input input-bordered input-sm w-full"
                        />
                    </div>

                    {error && <div className="text-xs text-error">{error}</div>}
                    {success && <div className="text-xs text-success">{success}</div>}

                    <button type="submit" disabled={isLoading} className="btn btn-neutral btn-sm w-full mt-1">
                        {isLoading ? <span className="loading loading-spinner loading-xs" /> : 'Reinitialiser le mot de passe'}
                    </button>
                </form>

                <p className="text-xs text-center text-base-content/40 mt-5">
                    Retour a{' '}
                    <Link to="/login" className="text-base-content font-medium">
                        la connexion
                    </Link>
                </p>
            </div>
        </div>
    );
}
