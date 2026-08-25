const AUTH_STORAGE_KEY = 'auth-storage';
export const GUEST_SCOPE = 'guest';

export const getPersistedAccountId = (): string | null => {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as { state?: { user?: { id?: string | null } | null } };
    return parsed?.state?.user?.id ?? null;
  } catch {
    return null;
  }
};

// FNV-1a — suffisant pour délimiter des namespaces locaux, pas à usage sécurité.
export const hashScope = (value: string): string => {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return (hash >>> 0).toString(16);
};

export const toAccountScope = (accountId: string | null) =>
  accountId ? `user-${hashScope(accountId)}` : GUEST_SCOPE;

export const getInitialAccountScope = () => toAccountScope(getPersistedAccountId());
