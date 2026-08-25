import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificationStore } from '../../stores/notificationStore';
import type { AppNotification, NotificationKind } from '../../stores/notificationStore';

const kindMeta: Record<NotificationKind, { icon: string; color: string }> = {
  LATE_TASK: { icon: 'schedule', color: 'text-error' },
  EXAM_REMINDER: { icon: 'event', color: 'text-primary' },
  HIGH_RISK: { icon: 'warning', color: 'text-tertiary' },
  WEEKLY_SUMMARY: { icon: 'insights', color: 'text-primary' },
};

const relativeTime = (timestamp: number) => {
  const minutes = Math.round((Date.now() - timestamp) / 60_000);
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.round(hours / 24);
  return days === 1 ? 'hier' : `il y a ${days} j`;
};

const NotificationRow = ({ notification, onSelect }: {
  notification: AppNotification;
  onSelect: (notification: AppNotification) => void;
}) => {
  const meta = kindMeta[notification.kind];
  return (
    <button
      type="button"
      onClick={() => onSelect(notification)}
      className={`w-full text-left px-4 py-3 flex gap-3 items-start transition-colors hover:bg-surface-container-low border-b border-outline-variant last:border-b-0 ${notification.read ? 'opacity-60' : ''}`}
    >
      <span className={`material-symbols-outlined text-[20px] mt-0.5 shrink-0 ${meta.color}`}>{meta.icon}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-body-md font-body-md font-medium text-on-surface truncate">
            {!notification.read && (
              <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2 align-middle" aria-label="Non lue" />
            )}
            {notification.title}
          </span>
        </div>
        <p className="text-label-sm font-label-sm text-on-surface-variant mt-0.5 line-clamp-2">{notification.body}</p>
        <span className="text-label-caps font-label-caps text-outline mt-1 block">{relativeTime(notification.createdAt)}</span>
      </div>
    </button>
  );
};

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const notifications = useNotificationStore((s) => s.notifications);
  const markRead = useNotificationStore((s) => s.markRead);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const clearAll = useNotificationStore((s) => s.clearAll);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSelect = (notification: AppNotification) => {
    markRead(notification.id);
    setOpen(false);
    navigate(notification.url);
  };

  return (
    <div className="relative">
      {/* Clic extérieur : overlay transparent dans le même contexte de
          stacking que le panneau (le header est sticky z-10). */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications${unreadCount > 0 ? ` — ${unreadCount} non lue(s)` : ''}`}
        aria-expanded={open}
        className="relative text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-primary-fixed-dim transition-colors p-2 rounded-full hover:bg-surface-container-low"
      >
        <span
          className="material-symbols-outlined"
          data-icon="notifications"
          style={{ fontVariationSettings: unreadCount > 0 ? "'FILL' 1" : "'FILL' 0" }}
        >
          notifications
        </span>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-error text-on-error text-[10px] font-semibold flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[min(92vw,22rem)] bg-surface rounded-xl shadow-2xl border border-outline-variant overflow-hidden"
          role="dialog"
          aria-label="Centre de notifications"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant bg-surface-container-lowest">
            <span className="text-label-caps font-label-caps text-on-surface-variant">Notifications</span>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="text-label-sm font-label-sm text-primary hover:text-primary-fixed-dim px-2 py-1 rounded hover:bg-surface-container-low"
                >
                  Tout lire
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-label-sm font-label-sm text-on-surface-variant hover:text-error px-2 py-1 rounded hover:bg-surface-container-low"
                >
                  Effacer
                </button>
              )}
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-6 py-10 flex flex-col items-center gap-3 text-center">
                <span className="material-symbols-outlined text-[32px] text-outline">notifications_off</span>
                <p className="text-body-md font-body-md text-on-surface-variant">Aucune notification</p>
                <p className="text-label-sm font-label-sm text-outline">
                  Les retards, examens proches et cours à risque apparaîtront ici.
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationRow key={notification.id} notification={notification} onSelect={handleSelect} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
