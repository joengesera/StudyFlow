import { create } from 'zustand';

export interface ToastOptions {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
}

export interface ToastItem extends Required<Pick<ToastOptions, 'message'>> {
  id: number;
  actionLabel?: string;
  onAction?: () => void;
  duration: number;
}

interface ToastState {
  toasts: ToastItem[];
  showToast: (options: ToastOptions) => void;
  dismissToast: (id: number) => void;
}

let toastSeq = 0;

// Store éphémère (non persisté) : les toasts ne doivent pas survivre à un reload.
export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: ({ message, actionLabel, onAction, duration = 6000 }) => {
    const id = ++toastSeq;
    set((state) => ({
      toasts: [...state.toasts, { id, message, actionLabel, onAction, duration }],
    }));
  },
  dismissToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
