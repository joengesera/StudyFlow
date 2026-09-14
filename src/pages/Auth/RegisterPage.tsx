import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { isApiError } from '../../api/client';
import logo from '@/assets/Fichier1.svg';

export default function RegisterPage() {
  const { register, isRegisterLoading, registerError } = useAuth();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'firstName':
        if (value && value.length < 2) error = 'Au moins 2 caractères';
        break;
      case 'lastName':
        if (value && value.length < 2) error = 'Au moins 2 caractères';
        break;
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Email invalide';
        break;
      case 'password':
        if (value && value.length < 8) error = '8 caractères minimum';
        break;
      case 'confirmPassword':
        if (value && value !== form.password) error = 'Les mots de passe ne correspondent pas';
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (value) validateField(name, value);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    const newErrors: Record<string, string> = {};

    if (!form.firstName.trim() || form.firstName.length < 2) {
      newErrors.firstName = 'Prénom requis (2 caractères min.)';
      hasError = true;
    }
    if (!form.lastName.trim() || form.lastName.length < 2) {
      newErrors.lastName = 'Nom requis (2 caractères min.)';
      hasError = true;
    }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email invalide';
      hasError = true;
    }
    if (!form.password || form.password.length < 8) {
      newErrors.password = '8 caractères minimum';
      hasError = true;
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    register({
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      email: form.email,
      password: form.password,
    });
  };

  const backendError = registerError && isApiError(registerError)
    ? registerError.response?.data?.error?.message ?? 'Une erreur est survenue.'
    : null;

  const inputClass = (fieldError?: string) =>
    `input input-bordered w-full pl-10 pr-12 h-12 text-base transition-all ${
      fieldError ? 'input-error border-error/30 focus:border-error focus:ring-error/20' : ''
    }`;

  return (
    <div className="auth-bg-shell relative flex min-h-dvh items-center justify-center bg-base-200 px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div aria-hidden="true" className="auth-bg-tint" />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col">
        <div className="w-full overflow-hidden rounded-none bg-base-100/95 backdrop-blur-[2px] sm:rounded-2xl md:grid md:grid-cols-[1fr_420px]">
          {/* Left: Brand Panel */}
          <div className="hidden shrink-0 flex-col items-center justify-center bg-base-200/50 p-8 md:flex border-r border-base-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            <div className="relative z-10 w-full max-w-sm text-center">
              <div className="mb-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                  <img src={logo} alt="StudyFlow" className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold text-base-content">StudyFlow</h2>
                <p className="mt-1 text-sm text-base-content/50">Ton assistant académique</p>
              </div>

              <div className="space-y-3 text-left">
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
                    <div>
                      <p className="text-sm font-medium text-base-content">{feature.title}</p>
                      <p className="text-xs text-base-content/50 mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex flex-col justify-center p-5 sm:p-8 md:p-10 lg:p-12">
            <div className="mb-8 md:hidden flex items-center gap-3 justify-center">
              <div className="h-10 w-10 rounded-xl bg-neutral/10 flex items-center justify-center">
                <img src={logo} alt="logo" className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-semibold text-base-content">StudyFlow</p>
                <p className="text-xs text-base-content/60">Ton assistant académique</p>
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-base-content tracking-tight">Créer ton compte</h1>
              <p className="mt-2 text-base text-base-content/50">Commence à gérer tes cours et tâches dès maintenant</p>
            </div>

            <form onSubmit={handleSubmit} className="flex w-full max-w-xl flex-col gap-5">
              {/* First Name + Last Name */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative" data-error={!!errors.firstName}>
                  <label htmlFor="firstName" className="mb-1.5 block text-xs font-medium text-base-content/60">
                    Prénom
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-base-content/30" aria-hidden="true">person</span>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Lucas"
                      value={form.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={inputClass(errors.firstName)}
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? 'firstname-error' : undefined}
                    />
                  </div>
                  {errors.firstName && (
                    <p id="firstname-error" className="mt-1.5 text-xs text-error flex items-center gap-1" role="alert">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="flex-1 relative" data-error={!!errors.lastName}>
                  <label htmlFor="lastName" className="mb-1.5 block text-xs font-medium text-base-content/60">
                    Nom
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-base-content/30" aria-hidden="true">person</span>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Martin"
                      value={form.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={inputClass(errors.lastName)}
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? 'lastname-error' : undefined}
                    />
                  </div>
                  {errors.lastName && (
                    <p id="lastname-error" className="mt-1.5 text-xs text-error flex items-center gap-1" role="alert">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="relative" data-error={!!errors.email}>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-base-content/60">
                  Email universitaire
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
                    className={inputClass(errors.email)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-error flex items-center gap-1" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative" data-error={!!errors.password}>
                <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-base-content/60">
                  Mot de passe
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-base-content/30" aria-hidden="true">lock</span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={inputClass(errors.password)}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
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
                {errors.password && (
                  <p id="password-error" className="mt-1.5 text-xs text-error flex items-center gap-1" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative" data-error={!!errors.confirmPassword || !!backendError}>
                <label htmlFor="confirmPassword" className="mb-1.5 block text-xs font-medium text-base-content/60">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-base-content/30" aria-hidden="true">lock</span>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={inputClass(errors.confirmPassword || backendError ? 'backend' : '')}
                    aria-invalid={!!(errors.confirmPassword || backendError)}
                    aria-describedby={errors.confirmPassword ? 'confirm-error' : backendError ? 'backend-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-base-content/60 transition-colors"
                    aria-label={showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    aria-pressed={showConfirmPassword}
                  >
                    {showConfirmPassword ? <span className="material-symbols-outlined text-[20px]">visibility_off</span> : <span className="material-symbols-outlined text-[20px]">visibility</span>}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p id="confirm-error" className="mt-1.5 text-xs text-error flex items-center gap-1" role="alert">
                    {errors.confirmPassword}
                  </p>
                )}
                {backendError && !errors.confirmPassword && (
                  <p id="backend-error" className="mt-1.5 text-xs text-error flex items-center gap-1" role="alert">
                    <span className="material-symbols-outlined text-[16px] shrink-0">check_circle</span>
                    {backendError}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isRegisterLoading}
                className="btn btn-primary w-full h-12 text-base font-medium mt-2 transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:hover:shadow-none"
              >
                {isRegisterLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm" />
                    Création en cours...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Créer mon compte
                    <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </span>
                )}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-base-content/50">
              Déjà un compte ?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary/70 transition-colors">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}