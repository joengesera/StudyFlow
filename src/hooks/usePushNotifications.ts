import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiClient } from '../api/client';

type NotificationPreferenceKey = 'examReminder' | 'lateTasks' | 'highRisk' | 'weeklySummary';

export interface NotificationPreferences {
    examReminder: boolean;
    lateTasks: boolean;
    highRisk: boolean;
    weeklySummary: boolean;
}

interface UsePushNotificationsReturn {
    isSupported: boolean;
    permissionStatus: NotificationPermission | 'unsupported';
    isSubscribed: boolean;
    isLoading: boolean;
    error: string | null;
    preferences: NotificationPreferences;
    setPreference: (key: NotificationPreferenceKey, value: boolean) => void;
    enablePush: () => Promise<void>;
    disablePush: () => Promise<void>;
    sendTestNotification: () => Promise<void>;
}

const STORAGE_KEY = 'studyflow-notification-preferences';
const SHOULD_SYNC_WITH_BACKEND = import.meta.env.VITE_ENABLE_PUSH_BACKEND_SYNC === 'true';
const VAPID_PUBLIC_KEY = (import.meta.env.VITE_WEB_PUSH_PUBLIC_KEY ?? '').trim();

const defaultPreferences: NotificationPreferences = {
    examReminder: true,
    lateTasks: true,
    highRisk: true,
    weeklySummary: false,
};

const isBrowser = typeof window !== 'undefined';

const isPushSupported = isBrowser
    && 'serviceWorker' in navigator
    && 'PushManager' in window
    && 'Notification' in window;

const base64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; i += 1) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
};

const readPreferences = (): NotificationPreferences => {
    if (!isBrowser) return defaultPreferences;

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultPreferences;
        const parsed = JSON.parse(raw) as Partial<NotificationPreferences>;
        return {
            ...defaultPreferences,
            ...parsed,
        };
    } catch {
        return defaultPreferences;
    }
};

const syncSubscriptionWithBackend = async (subscription: PushSubscription, preferences: NotificationPreferences) => {
    if (!SHOULD_SYNC_WITH_BACKEND) return;

    try {
        await apiClient.post('/notifications/subscriptions', {
            subscription,
            preferences,
        });
    } catch (error) {
        console.warn('Sync abonnement push échoué:', error);
    }
};

const removeSubscriptionFromBackend = async (endpoint: string) => {
    if (!SHOULD_SYNC_WITH_BACKEND) return;

    try {
        await apiClient.delete('/notifications/subscriptions', {
            data: { endpoint },
        });
    } catch (error) {
        console.warn('Suppression abonnement push échouée:', error);
    }
};

const syncPreferencesWithBackend = async (preferences: NotificationPreferences) => {
    if (!SHOULD_SYNC_WITH_BACKEND) return;

    try {
        await apiClient.put('/notifications/preferences', preferences);
    } catch (error) {
        console.warn('Sync préférences notifications échoué:', error);
    }
};

export const usePushNotifications = (): UsePushNotificationsReturn => {
    const [preferences, setPreferences] = useState<NotificationPreferences>(readPreferences);
    const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | 'unsupported'>(
        isPushSupported ? Notification.permission : 'unsupported',
    );
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isBrowser) return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }, [preferences]);

    useEffect(() => {
        if (!isPushSupported) return;
        let cancelled = false;

        const loadSubscription = async () => {
            try {
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.getSubscription();
                if (cancelled) return;
                setIsSubscribed(Boolean(subscription));
                setPermissionStatus(Notification.permission);
            } catch (err) {
                if (cancelled) return;
                setError('Impossible de vérifier l’état des notifications push.');
                console.warn(err);
            }
        };

        void loadSubscription();

        return () => {
            cancelled = true;
        };
    }, []);

    const setPreference = useCallback((key: NotificationPreferenceKey, value: boolean) => {
        setPreferences((prev) => {
            const next = { ...prev, [key]: value };
            void syncPreferencesWithBackend(next);
            return next;
        });
    }, []);

    const enablePush = useCallback(async () => {
        if (!isPushSupported) {
            setError('Ce navigateur ne supporte pas les notifications push.');
            return;
        }

        if (!VAPID_PUBLIC_KEY) {
            setError('Clé VAPID manquante. Ajoute VITE_WEB_PUSH_PUBLIC_KEY dans .env.');
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            const permission = await Notification.requestPermission();
            setPermissionStatus(permission);

            if (permission !== 'granted') {
                setError('Permission refusée. Active les notifications dans ton navigateur.');
                setIsSubscribed(false);
                return;
            }

            const registration = await navigator.serviceWorker.ready;
            let subscription = await registration.pushManager.getSubscription();

            if (!subscription) {
                subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: base64ToUint8Array(VAPID_PUBLIC_KEY),
                });
            }

            await syncSubscriptionWithBackend(subscription, preferences);
            setIsSubscribed(true);
        } catch (err) {
            setError('Activation push échouée. Vérifie HTTPS, service worker et clé VAPID.');
            console.warn(err);
        } finally {
            setIsLoading(false);
        }
    }, [preferences]);

    const disablePush = useCallback(async () => {
        if (!isPushSupported) return;

        setError(null);
        setIsLoading(true);

        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            if (!subscription) {
                setIsSubscribed(false);
                return;
            }

            await removeSubscriptionFromBackend(subscription.endpoint);
            await subscription.unsubscribe();
            setIsSubscribed(false);
        } catch (err) {
            setError('Désactivation push échouée.');
            console.warn(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const sendTestNotification = useCallback(async () => {
        if (!isPushSupported) return;

        try {
            const registration = await navigator.serviceWorker.ready;
            await registration.showNotification('StudyFlow', {
                body: 'Notifications push prêtes.',
                icon: '/pwa-192x192.png',
                badge: '/pwa-192x192.png',
                tag: 'studyflow-test-notification',
                data: { url: '/profile' },
            });
        } catch (err) {
            setError('Impossible d’envoyer la notification de test.');
            console.warn(err);
        }
    }, []);

    return useMemo(
        () => ({
            isSupported: isPushSupported,
            permissionStatus,
            isSubscribed,
            isLoading,
            error,
            preferences,
            setPreference,
            enablePush,
            disablePush,
            sendTestNotification,
        }),
        [
            permissionStatus,
            isSubscribed,
            isLoading,
            error,
            preferences,
            setPreference,
            enablePush,
            disablePush,
            sendTestNotification,
        ],
    );
};

