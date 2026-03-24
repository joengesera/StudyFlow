import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useAuth } from '../../hooks/useAuth';

export default function ForgotPasswordPage() {
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await forgotPassword(email);
            setSubmitted(true);
        } catch (err) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.error?.message ?? 'Une erreur est survenue.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // ── Vue succès ──────────────────────────────────────────
    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
                <div className="bg-base-100 rounded-2xl p-10 w-full max-w-md text-center shadow-lg">
                    <div className="text-4xl mb-4">📬</div>
                    <h1 className="text-lg font-medium text-base-content mb-2">
                        Email envoyé
                    </h1>
                    <p className="text-sm text-base-content/50 mb-6">
                        Si un compte existe pour <strong>{email}</strong>, tu recevras
                        un lien de réinitialisation dans quelques minutes.
                    </p>
                    <Link to="/login" className="btn btn-neutral btn-sm w-full">
                        Retour à la connexion
                    </Link>
                </div>
            </div>
        );
    }

    // ── Vue formulaire ──────────────────────────────────────
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="bg-base-100 rounded-2xl p-10 w-full max-w-md shadow-lg">

                <div className="mb-7">
                    <h1 className="text-xl font-medium text-base-content">
                        Mot de passe oublié
                    </h1>
                    <p className="text-sm text-base-content/50 mt-1">
                        Entre ton email pour recevoir un lien de réinitialisation
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                    <div>
                        <label className="text-xs text-base-content/50 mb-1 block">Email</label>
                        <input
                            type="email"
                            placeholder="lucas@univ.fr"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input input-bordered input-sm w-full"
                        />
                    </div>

                    {error && (
                        <div className="text-xs text-error">{error}</div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-neutral btn-sm w-full mt-1"
                    >
                        {isLoading
                            ? <span className="loading loading-spinner loading-xs" />
                            : 'Envoyer le lien'
                        }
                    </button>

                </form>

                <p className="text-xs text-center text-base-content/40 mt-5">
                    Tu te souviens ?{' '}
                    <Link to="/login" className="text-base-content font-medium">
                        Se connecter
                    </Link>
                </p>

            </div>
        </div>
    );
}