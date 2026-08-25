import type { StateStorage } from 'zustand/middleware';

// NOTE sécurité : le chiffrement AES-GCM n'est qu'une obfuscation — la clé
// repose dans la même IndexedDB que les données chiffrées. L'objectif est
// d'éviter la lecture casual des données en clair, pas de résister à un
// attaquant ayant un accès complet au stockage local du navigateur.

type ScopeResolver = () => string;

interface PersistedRecord {
  id: string;
  scope: string;
  key: string;
  value: string;
  updatedAt: number;
}

interface ScopeSecretRecord {
  scope: string;
  secretB64: string;
  createdAt: number;
}

const DB_NAME = 'studyflow-offline';
const DB_VERSION = 1;
const STATE_STORE = 'state_records';
const SECRET_STORE = 'scope_secrets';
const CIPHER_PREFIX = 'enc:v1:';

let dbPromise: Promise<IDBDatabase> | null = null;

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const supportsCrypto = () =>
  typeof window !== 'undefined'
  && typeof window.crypto !== 'undefined'
  && typeof window.crypto.subtle !== 'undefined';

const toBase64 = (bytes: Uint8Array): string => {
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
};

const fromBase64 = (value: string): Uint8Array => {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

const buildRecordId = (scope: string, key: string) => `${scope}::${key}`;

const promisifyRequest = <T>(request: IDBRequest<T>): Promise<T> =>
  new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'));
  });

const promisifyTransaction = (transaction: IDBTransaction): Promise<void> =>
  new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error('IndexedDB transaction failed'));
    transaction.onabort = () => reject(transaction.error ?? new Error('IndexedDB transaction aborted'));
  });

const openDatabase = (): Promise<IDBDatabase> => {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not available'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STATE_STORE)) {
        const stateStore = db.createObjectStore(STATE_STORE, { keyPath: 'id' });
        stateStore.createIndex('scope', 'scope', { unique: false });
        stateStore.createIndex('updatedAt', 'updatedAt', { unique: false });
      }

      if (!db.objectStoreNames.contains(SECRET_STORE)) {
        db.createObjectStore(SECRET_STORE, { keyPath: 'scope' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Failed to open IndexedDB'));
  });

  return dbPromise;
};

const getScopeSecret = async (scope: string): Promise<Uint8Array | null> => {
  if (!supportsCrypto()) return null;

  const db = await openDatabase();
  const tx = db.transaction(SECRET_STORE, 'readwrite');
  const store = tx.objectStore(SECRET_STORE);

  const current = await promisifyRequest<ScopeSecretRecord | undefined>(store.get(scope));
  if (current?.secretB64) {
    await promisifyTransaction(tx);
    return fromBase64(current.secretB64);
  }

  const generated = new Uint8Array(32);
  window.crypto.getRandomValues(generated);

  const createdRecord: ScopeSecretRecord = {
    scope,
    secretB64: toBase64(generated),
    createdAt: Date.now(),
  };

  store.put(createdRecord);
  await promisifyTransaction(tx);
  return generated;
};

const importAesKey = async (scope: string): Promise<CryptoKey | null> => {
  const secret = await getScopeSecret(scope);
  if (!secret) return null;

  return window.crypto.subtle.importKey(
    'raw',
    secret,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt'],
  );
};

const encryptValue = async (scope: string, value: string): Promise<string> => {
  if (!supportsCrypto()) return value;

  try {
    const key = await importAesKey(scope);
    if (!key) return value;

    const iv = new Uint8Array(12);
    window.crypto.getRandomValues(iv);

    const encrypted = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      textEncoder.encode(value),
    );

    return `${CIPHER_PREFIX}${toBase64(iv)}:${toBase64(new Uint8Array(encrypted))}`;
  } catch (error) {
    console.warn('[offline-storage] encryption fallback to plain text', error);
    return value;
  }
};

const decryptValue = async (scope: string, rawValue: string): Promise<string> => {
  if (!rawValue.startsWith(CIPHER_PREFIX)) {
    return rawValue;
  }

  if (!supportsCrypto()) {
    return rawValue;
  }

  try {
    const serialized = rawValue.slice(CIPHER_PREFIX.length);
    const [ivB64, cipherB64] = serialized.split(':');
    if (!ivB64 || !cipherB64) return rawValue;

    const key = await importAesKey(scope);
    if (!key) return rawValue;

    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: fromBase64(ivB64) },
      key,
      fromBase64(cipherB64),
    );

    return textDecoder.decode(decrypted);
  } catch (error) {
    console.warn('[offline-storage] unable to decrypt payload', error);
    return rawValue;
  }
};

export const createAccountScopedIndexedDbStorage = (resolveScope: ScopeResolver): StateStorage => ({  getItem: async (key) => {
    const scope = resolveScope();
    const db = await openDatabase();
    const tx = db.transaction(STATE_STORE, 'readonly');
    const store = tx.objectStore(STATE_STORE);
    const recordId = buildRecordId(scope, key);
    const record = await promisifyRequest<PersistedRecord | undefined>(store.get(recordId));
    await promisifyTransaction(tx);

    if (!record) return null;
    return decryptValue(scope, record.value);
  },

  setItem: async (key, value) => {
    const scope = resolveScope();
    const db = await openDatabase();
    const tx = db.transaction(STATE_STORE, 'readwrite');
    const store = tx.objectStore(STATE_STORE);
    const recordId = buildRecordId(scope, key);
    const encryptedValue = await encryptValue(scope, value);

    const record: PersistedRecord = {
      id: recordId,
      scope,
      key,
      value: encryptedValue,
      updatedAt: Date.now(),
    };

    store.put(record);
    await promisifyTransaction(tx);
  },

  removeItem: async (key) => {
    const scope = resolveScope();
    const db = await openDatabase();
    const tx = db.transaction(STATE_STORE, 'readwrite');
    const store = tx.objectStore(STATE_STORE);
    const recordId = buildRecordId(scope, key);
    store.delete(recordId);
    await promisifyTransaction(tx);
  },
});

// Indice (en clair) du scope actif, lu par le service worker pour savoir
// quelle file/chiffrement utiliser lors d'un drain en Background Sync.
export const ACTIVE_SCOPE_HINT_KEY = '__active_scope__';

export const writeActiveScopeHint = async (scope: string): Promise<void> => {
  if (typeof indexedDB === 'undefined') return;

  try {
    const db = await openDatabase();
    const tx = db.transaction(SECRET_STORE, 'readwrite');
    const store = tx.objectStore(SECRET_STORE);
    store.put({ scope: ACTIVE_SCOPE_HINT_KEY, secretB64: scope, createdAt: Date.now() });
    await promisifyTransaction(tx);
  } catch {
    // best effort : le SW retombera sur la délégation aux clients ouverts
  }
};

