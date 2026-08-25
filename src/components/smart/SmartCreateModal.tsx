import { useEffect } from 'react';
import { SmartDraftForm } from './SmartDraftForm';

interface SmartCreateModalProps {
  open: boolean;
  onClose: () => void;
}

// Modale globale de création sémantique — ouverte depuis n'importe quelle
// page via le bouton "Créer" de la barre supérieure.
export function SmartCreateModal({ open, onClose }: SmartCreateModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-start justify-center px-4 pt-[10vh]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-lg bg-surface rounded-2xl shadow-2xl border border-outline-variant p-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Création intelligente"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            <h3 className="text-headline-sm font-headline-sm text-on-surface">Création intelligente</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface -mr-2"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <SmartDraftForm autoFocus onCreated={onClose} />

        <p className="mt-4 pt-3 border-t border-outline-variant text-label-sm font-label-sm text-outline">
          Astuce : « réviser maths demain matin urgent », « examen vendredi de 14h à 16h », « rendre rapport le 12/05 »…
        </p>
      </div>
    </div>
  );
}
