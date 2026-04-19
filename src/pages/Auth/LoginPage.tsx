import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useAuth } from '../../hooks/useAuth';
import logo from '@/assets/Fichier1.svg';

const CLASSROOM_BG_URL =
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=2000&q=80';

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

  const backendError =
    loginError && isAxiosError(loginError)
      ? loginError.response?.data?.error?.message ?? 'Une erreur est survenue.'
      : null;

  return (
    <div className="auth-bg-shell min-h-screen bg-base-200 px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div
        aria-hidden="true"
        className="auth-bg-media"
        style={{ backgroundImage: `url(${CLASSROOM_BG_URL})` }}
      />
      <div aria-hidden="true" className="auth-bg-tint" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl items-center justify-center sm:min-h-[calc(100vh-5rem)]">
        <div className="w-full overflow-hidden rounded-2xl bg-base-100/95 shadow-lg backdrop-blur-[2px] md:grid md:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="flex flex-col justify-center p-5 sm:p-8 md:p-10 lg:p-12">
            <div className="mb-6 flex items-center gap-3 md:hidden">
              <img src={logo} alt="logo" className="h-10 w-10 rounded-xl bg-neutral p-1.5" />
              <div>
                <p className="text-sm font-semibold text-base-content">StudyFlow</p>
                <p className="text-xs text-base-content/60">Ton assistant academique</p>
              </div>
            </div>

            <div className="mb-7">
              <h1 className="text-xl font-medium text-base-content">Bon retour</h1>
              <p className="mt-1 text-sm text-base-content/50">Connecte-toi pour acceder a ton espace</p>
            </div>

            <form onSubmit={handleSubmit} className="flex w-full max-w-xl flex-col gap-3">
              <div>
                <label className="mb-1 block text-xs text-base-content/50">Email</label>
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
                <label className="mb-1 block text-xs text-base-content/50">Mot de passe</label>
                <input
                  name="password"
                  type="password"
                  placeholder="********"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="input input-bordered input-sm w-full"
                />
              </div>

              <div className="text-right">
                <Link to="/forgot-password" className="text-xs text-base-content/40 hover:text-base-content">
                  Mot de passe oublie ?
                </Link>
              </div>

              {backendError && <div className="text-xs text-error">{backendError}</div>}

              <button type="submit" disabled={isLoginLoading} className="btn btn-neutral btn-sm mt-1 w-full">
                {isLoginLoading ? <span className="loading loading-spinner loading-xs" /> : 'Se connecter'}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-base-content/40 md:text-left">
              Pas encore de compte ?{' '}
              <Link to="/register" className="font-medium text-base-content">
                Creer un compte
              </Link>
            </p>
          </div>

          <div className="hidden shrink-0 flex-col items-center justify-center bg-neutral p-8 md:flex">
            <div className="mb-3 text-4xl">
              <img src={logo} alt="logo" className="h-20 w-20" />
            </div>
            <div className="mb-1 text-sm font-medium text-neutral-content">StudyFlow</div>
            <div className="mb-8 text-center text-xs text-neutral-content/40">Ton assistant academique</div>
          </div>
        </div>
      </div>
    </div>
  );
}
