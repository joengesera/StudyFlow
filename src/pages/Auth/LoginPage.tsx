import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isApiError } from '../../api/client';
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

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'email') {
      setEmailError(value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Email invalide' : '');
    }
    if (name === 'password') {
      setPasswordError(value && value.length < 8 ? '8 caractères minimum' : '');
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('Email invalide');
    }
    if (name === 'password' && value && value.length < 8) {
      setPasswordError('8 caractères minimum');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setEmailError('Email invalide');
      hasError = true;
    }
    if (!form.password || form.password.length < 8) {
      setPasswordError('8 caractères minimum');
      hasError = true;
    }
    if (hasError) return;

    login({ email: form.email, password: form.password });
  };

  const backendError =
    loginError && isApiError(loginError)
      ? loginError.response?.data?.error?.message ?? 'Une erreur est survenue.'
      : null;

  return (
    <div className="auth-bg-shell relative flex min-h-dvh items-center justify-center bg-base-200 px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div
        aria-hidden="true"
        className="auth-bg-media"
        style={{ backgroundImage: `url(${CLASSROOM_BG_URL})` }}
      />
      <div aria-hidden="true" className="auth-bg-tint" />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col">
        <div className="w-full overflow-hidden rounded-none bg-base-100/95 backdrop-blur-[2px] sm:rounded-2xl md:grid md:grid-cols-[1fr_380px]">
          {/* Left: Form */}
          <div className="flex flex-col justify-center p-5 sm:p-8 md:p-10 lg:p-12">
            <div className="mb-8 md:hidden flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-neutral/10 flex items-center justify-center">
                <img src={logo} alt="logo" className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-semibold text-base-content">StudyFlow</p>
                <p className="text-xs text-base-content/60">Ton assistant académique</p>
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-base-content tracking-tight">Bon retour</h1>
              <p className="mt-2 text-base text-base-content/50">Connecte-toi pour accéder à ton espace</p>
            </div>

            <form onSubmit={handleSubmit} className="flex w-full max-w-xl flex-col gap-5">
              {/* Email Field */}
              <div className="relative" data-error={!!emailError}>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-base-content/60">
                  Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-base-content/30" aria-hidden="true">mail</span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="lucas@univ.fr"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`input input-bordered w-full pl-10 pr-4 h-12 text-base transition-all ${
                      emailError ? 'input-error border-error/30 focus:border-error focus:ring-error/20' : ''
                    }`}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'email-error' : undefined}
                  />
                </div>
                {emailError && (
                  <p id="email-error" className="mt-1.5 text-xs text-error flex items-center gap-1" role="alert">
                    {emailError}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative" data-error={!!passwordError || !!backendError}>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="text-xs font-medium text-base-content/60">
                    Mot de passe
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:text-primary/70 transition-colors"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-base-content/30" aria-hidden="true">lock</span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`input input-bordered w-full pl-10 pr-12 h-12 text-base transition-all ${
                      passwordError || backendError ? 'input-error border-error/30 focus:border-error focus:ring-error/20' : ''
                    }`}
                    aria-invalid={!!(passwordError || backendError)}
                    aria-describedby={passwordError ? 'password-error' : backendError ? 'backend-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-base-content/60 transition-colors"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <span className="material-symbols-outlined text-[20px]">visibility_off</span> : <span className="material-symbols-outlined text-[20px]">visibility</span>}
                  </button>
                </div>
                {passwordError && (
                  <p id="password-error" className="mt-1.5 text-xs text-error flex items-center gap-1" role="alert">
                    {passwordError}
                  </p>
                )}
                {backendError && !passwordError && (
                  <p id="backend-error" className="mt-1.5 text-xs text-error flex items-center gap-1" role="alert">
                    <span className="material-symbols-outlined text-[16px] shrink-0">check_circle</span>
                    {backendError}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoginLoading}
                className="btn btn-primary w-full h-12 text-base font-medium mt-2 transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:hover:shadow-none"
              >
                {isLoginLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm" />
                    Connexion en cours...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Se connecter
                    <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </span>
                )}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-base-content/50">
              Pas encore de compte ?{' '}
              <Link to="/register" className="font-medium text-primary hover:text-primary/70 transition-colors">
                Créer un compte
              </Link>
            </p>
          </div>

          {/* Right: Brand Panel */}
          <div className="hidden shrink-0 flex-col items-center justify-center bg-base-200/50 p-8 md:flex border-l border-base-200">
            <div className="mb-6 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                <img src={logo} alt="StudyFlow" className="h-10 w-10" />
              </div>
              <h2 className="text-xl font-bold text-base-content">StudyFlow</h2>
              <p className="mt-1 text-sm text-base-content/50">Ton assistant académique</p>
            </div>

            <div className="w-full max-w-xs space-y-4">
              {[
                { icon: '📅', title: 'Agenda intelligent', desc: 'Cours, examens, révisions planifiés' },
                { icon: '✅', title: 'Gestion des tâches', desc: 'Board Kanban + Pomodoro intégré' },
                { icon: '📊', title: 'Suivi des notes', desc: 'Moyennes, simulateur, statistiques' },
                { icon: '⚠️', title: 'Analyse de risque', desc: 'Anticipe les difficultés avant l\'examen' },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 p-3 rounded-xl bg-base-100/50 border border-base-200 hover:border-primary/30 transition-colors"
                >
                  <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-base shrink-0">
                    <span>{feature.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-base-content">{feature.title}</p>
                    <p className="text-xs text-base-content/50 mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}