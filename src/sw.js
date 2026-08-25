import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

self.skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

const navigationRoute = new NavigationRoute(createHandlerBoundToURL('/index.html'), {
  denylist: [/^\/api\//],
});
registerRoute(navigationRoute);

// ─── BACKGROUND SYNC ───
// Vidange de la file des mutations hors ligne même quand aucun onglet
// n'est ouvert. En secours : si le drain direct échoue (pas de token,
// IndexedDB illisible…), on délègue aux onglets ouverts via un message,
// sinon l'erreur relance une planification du sync par le navigateur.
const SYNC_TAG = 'studyflow-sync';
const DB_NAME = 'studyflow-offline';
const DB_VERSION = 1;
const STATE_STORE = 'state_records';
const SECRET_STORE = 'scope_secrets';
const ACTIVE_SCOPE_HINT_KEY = '__active_scope__';
const CIPHER_PREFIX = 'enc:v1:';
const API_BASE = (import.meta.env?.VITE_API_URL || self.location.origin).replace(/\/$/, '');

const promisifyRequest = (request) =>
  new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'));
  });

const openOfflineDb = () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Failed to open IndexedDB'));
  });

const fromBase64 = (value) => {
  const binary = atob(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
};

const toBase64 = (bytes) => {
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
};

const getRecord = async (storeName, key) => {
  const db = await openOfflineDb();
  const tx = db.transaction(storeName, 'readonly');
  const record = await promisifyRequest(tx.objectStore(storeName).get(key));
  return record ?? null;
};

const putRecord = async (storeName, record) => {
  const db = await openOfflineDb();
  const tx = db.transaction(storeName, 'readwrite');
  tx.objectStore(storeName).put(record);
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
};

const decryptValue = async (scope, rawValue) => {
  if (!rawValue?.startsWith?.(CIPHER_PREFIX)) return rawValue;

  const secretRecord = await getRecord(SECRET_STORE, scope);
  if (!secretRecord?.secretB64) throw new Error('Missing scope secret');

  const key = await crypto.subtle.importKey(
    'raw',
    fromBase64(secretRecord.secretB64),
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt'],
  );

  const [ivB64, cipherB64] = rawValue.slice(CIPHER_PREFIX.length).split(':');
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: fromBase64(ivB64) },
    key,
    fromBase64(cipherB64),
  );
  return new TextDecoder().decode(decrypted);
};

const encryptValue = async (scope, value) => {
  const secretRecord = await getRecord(SECRET_STORE, scope);
  if (!secretRecord?.secretB64) throw new Error('Missing scope secret');

  const key = await crypto.subtle.importKey(
    'raw',
    fromBase64(secretRecord.secretB64),
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt'],
  );

  const iv = new Uint8Array(12);
  crypto.getRandomValues(iv);
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(value),
  );
  return `${CIPHER_PREFIX}${toBase64(iv)}:${toBase64(new Uint8Array(encrypted))}`;
};

const refreshAccessToken = async () => {
  const response = await fetch(`${API_BASE}/auth/refresh-token`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) throw new Error(`Refresh failed (${response.status})`);
  const payload = await response.json();
  const data = payload && typeof payload === 'object' && 'data' in payload ? payload.data : payload;
  if (!data?.accessToken) throw new Error('No access token after refresh');
  return data.accessToken;
};

const drainQueueDirect = async () => {
  const hintRecord = await getRecord(SECRET_STORE, ACTIVE_SCOPE_HINT_KEY);
  const scope = hintRecord?.secretB64;
  if (!scope) return;

  const stateRecordId = `${scope}::sync-storage`;
  const stateRecord = await getRecord(STATE_STORE, stateRecordId);
  if (!stateRecord?.value) return;

  const parsed = JSON.parse(await decryptValue(scope, stateRecord.value));
  const queue = parsed?.state?.queue ?? [];
  if (queue.length === 0) return;

  const accessToken = await refreshAccessToken();
  const processedIds = new Set();

  for (const action of queue) {
    let response;
    try {
      response = await fetch(`${API_BASE}/sync/push`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'Idempotency-Key': action.id,
        },
        body: JSON.stringify(action),
      });
    } catch {
      break; // réseau perdu en cours de route → on retentera plus tard
    }

    if (response.ok || (response.status >= 400 && response.status < 500)) {
      // Appliquée, ou rejetée définitivement : dans les deux cas on sort
      // l'action de la file (les rejets restent gérables depuis l'app).
      processedIds.add(action.id);
    } else {
      break; // 5xx : serveur indisponible, nouvelle tentative planifiée
    }
  }

  if (processedIds.size > 0) {
    parsed.state.queue = queue.filter((action) => !processedIds.has(action.id));
    await putRecord(STATE_STORE, {
      ...stateRecord,
      value: await encryptValue(scope, JSON.stringify(parsed)),
      updatedAt: Date.now(),
    });
  }
};

const broadcastToClients = async (message) => {
  const clientList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  clientList.forEach((client) => client.postMessage(message));
};

const handleBackgroundSync = async () => {
  try {
    await drainQueueDirect();
  } catch (error) {
    // Drain impossible depuis le SW → délégation aux onglets ouverts.
    await broadcastToClients({ type: 'TRIGGER_SYNC' });
    throw error; // le navigateur replanifiera l'événement sync
  }
};

self.addEventListener('sync', (event) => {
  if (event.tag !== SYNC_TAG) return;
  event.waitUntil(handleBackgroundSync());
});

self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }

  let payload = {};

  try {
    payload = event.data.json();
  } catch {
    payload = { body: event.data.text() };
  }

  const title = payload.title || 'StudyFlow';
  const body = payload.body || 'Nouvelle notification';
  const url = payload.url || '/dashboard';

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      lang: 'fr',
      vibrate: [80, 40, 80],
      tag: payload.tag || 'studyflow-push',
      renotify: Boolean(payload.renotify),
      requireInteraction: Boolean(payload.requireInteraction),
      actions: Array.isArray(payload.actions) ? payload.actions.slice(0, 2) : undefined,
      data: { url },
    }),
  );
});

// Clic sur une notification : on privilégie un client déjà ouvert et on lui
// demande de naviguer via postMessage — le match strict d'URL ouvrerait une
// seconde fenêtre dès que l'app est sur une autre route.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = new URL(event.notification?.data?.url || '/dashboard', self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      const target = clientList.find((client) => client.visibilityState === 'visible') ?? clientList[0];

      if (target) {
        target.postMessage({ type: 'NAVIGATE', url });
        return target.focus();
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }

      return undefined;
    }),
  );
});

