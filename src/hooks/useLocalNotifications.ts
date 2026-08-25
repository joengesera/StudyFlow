import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { taskKeys } from './useTasks';
import { eventKeys } from './useEvents';
import { gradeKeys } from './useGrades';
import { courseKeys } from './useCourses';
import {
  NOTIFICATION_PREFERENCES_STORAGE_KEY,
  type NotificationPreferences,
} from './usePushNotifications';
import { useNotificationStore } from '../stores/notificationStore';
import { runDetection } from '../utils/notificationDetectors';
import type { Course, Event, Grade, Task } from '../types';

const DETECTION_INTERVAL_MS = 10 * 60_000;
const MOUNT_DELAY_MS = 4_000; // laisse le temps au cache de se réhydrater

const defaultPreferences: NotificationPreferences = {
  examReminder: true,
  lateTasks: true,
  highRisk: true,
  weeklySummary: false,
};

const readPreferences = (): NotificationPreferences => {
  try {
    const raw = window.localStorage.getItem(NOTIFICATION_PREFERENCES_STORAGE_KEY);
    return raw ? { ...defaultPreferences, ...(JSON.parse(raw) as Partial<NotificationPreferences>) } : defaultPreferences;
  } catch {
    return defaultPreferences;
  }
};

// Moteur local de notifications : déclenche les détecteurs (tâches en
// retard, examens, risques) sur les données déjà en cache — fonctionne
// hors ligne et sans backend. Les nouvelles entrées alimentent le centre
// in-app ET, si push actif + app en arrière-plan, une notification OS.
export const useLocalNotifications = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addNotifications = useNotificationStore((s) => s.addNotifications);
  const notifications = useNotificationStore((s) => s.notifications);

  const detect = useCallback(async () => {
    const tasks = queryClient.getQueryData<Task[]>(taskKeys.all) ?? [];
    const events = queryClient.getQueryData<Event[]>(eventKeys.all) ?? [];
    const grades = queryClient.getQueryData<Grade[]>(gradeKeys.all) ?? [];
    const courses = queryClient.getQueryData<Course[]>(courseKeys.all) ?? [];

    const drafts = runDetection({ tasks, events, grades, courses, preferences: readPreferences() });
    if (drafts.length === 0) return;

    const added = addNotifications(
      drafts.map((draft) => ({ ...draft, createdAt: Date.now(), read: false })),
    );
    if (added === 0) return;

    // Pas de notification OS quand l'app est au premier plan : le centre
    // in-app suffit et évite le doublon visuel.
    if (document.visibilityState === 'visible') return;
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    if (!('serviceWorker' in navigator)) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) return;

      const freshDrafts = drafts.slice(0, added);
      for (const draft of freshDrafts) {
        // tag = id de dédup : remplace silencieusement la notif identique.
        // vibrate existe au runtime mais manque dans le typage TS de NotificationOptions.
        const options: NotificationOptions & { vibrate?: number[] } = {
          body: draft.body,
          icon: '/pwa-192x192.png',
          badge: '/pwa-192x192.png',
          lang: 'fr',
          vibrate: [80, 40, 80],
          tag: draft.id,
          data: { url: draft.url },
        };
        void registration.showNotification(draft.title, options);
      }
    } catch (error) {
      console.warn('[notifications] OS notification failed', error);
    }
  }, [queryClient, addNotifications]);

  useEffect(() => {
    const timer = setTimeout(() => void detect(), MOUNT_DELAY_MS);
    const interval = setInterval(() => void detect(), DETECTION_INTERVAL_MS);
    const onVisible = () => {
      if (document.visibilityState === 'visible') void detect();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [detect]);

  // Badge d'app PWA = nombre de non-lues.
  useEffect(() => {
    const unread = notifications.filter((n) => !n.read).length;
    try {
      if (unread > 0 && 'setAppBadge' in navigator) navigator.setAppBadge(unread);
      else if ('clearAppBadge' in navigator) navigator.clearAppBadge();
    } catch {
      // setAppBadge non supporté partout — silencieux
    }
  }, [notifications]);

  // Clic sur une notification OS → navigation deep-link demandée par le SW.
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    const onMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; url?: string } | null;
      if (data?.type === 'NAVIGATE' && data.url) navigate(data.url);
    };
    navigator.serviceWorker.addEventListener('message', onMessage);
    return () => navigator.serviceWorker.removeEventListener('message', onMessage);
  }, [navigate]);
};
