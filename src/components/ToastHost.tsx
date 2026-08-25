import { useEffect } from 'react';
import { useToastStore } from '../stores/toastStore';
import type { ToastItem } from '../stores/toastStore';

const Toast = ({ toast }: { toast: ToastItem }) => {
  const dismissToast = useToastStore((s) => s.dismissToast);

  useEffect(() => {
    const timer = setTimeout(() => dismissToast(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, dismissToast]);

  return (
    <div
      role="status"
      className="w-full max-w-sm px-4 py-3 rounded-xl bg-surface-container-high border border-outline-variant shadow-lg flex items-center gap-3"
    >
      <span className="material-symbols-outlined text-[18px] text-on-surface-variant shrink-0">check_circle</span>
      <span className="flex-1 text-body-md font-body-md text-on-surface">{toast.message}</span>
      {toast.actionLabel && (
        <button
          onClick={() => {
            toast.onAction?.();
            dismissToast(toast.id);
          }}
          className="text-label-md font-label-md font-semibold text-primary hover:text-primary-fixed-dim shrink-0 uppercase tracking-wide"
        >
          {toast.actionLabel}
        </button>
      )}
      <button
        onClick={() => dismissToast(toast.id)}
        aria-label="Fermer la notification"
        className="text-on-surface-variant hover:text-on-surface p-0.5 rounded-full hover:bg-surface-container-highest shrink-0"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
};

export function ToastHost() {
  const toasts = useToastStore((s) => s.toasts);
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 inset-x-0 z-[70] flex flex-col items-center gap-2 px-4 pointer-events-none">
      <div className="flex flex-col items-center gap-2 w-full pointer-events-auto">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </div>
    </div>
  );
}
