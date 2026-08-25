import { useState } from 'react';
import { useNetworkSync } from '../../hooks/useNetworkSync';
import type { FailedSyncAction } from '../../stores/syncStore';

const entityLabel = (entity: string) => {
  const labels: Record<string, string> = {
    Task: 'tâche',
    Event: 'événement',
    Grade: 'note',
    Work: 'travail',
    Course: 'cours',
    Unknown: 'élément',
  };
  return labels[entity] ?? 'élément';
};

const typeLabel = (type: string) => {
  const labels: Record<string, string> = {
    CREATE: 'Création',
    UPDATE: 'Modification',
    DELETE: 'Suppression',
  };
  return labels[type] ?? type;
};

const FailedActionsPanel = ({
  failedActions,
  onRetry,
  onDiscard,
  onRetryAll,
  onDiscardAll,
  onClose,
}: {
  failedActions: FailedSyncAction[];
  onRetry: (id: string) => void;
  onDiscard: (id: string) => void;
  onRetryAll: () => void;
  onDiscardAll: () => void;
  onClose: () => void;
}) => (
  <div className="absolute right-0 top-full mt-2 w-80 card card-padded shadow-lg z-50 max-h-96 overflow-y-auto">
    <div className="flex items-center justify-between mb-3">
      <span className="text-label-caps font-label-caps text-on-surface-variant">Synchronisations en échec</span>
      <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface" aria-label="Fermer">
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
    <div className="space-y-2 mb-3">
      {failedActions.map((f) => (
        <div key={f.action.id} className="p-2 rounded bg-surface-container text-left">
          <div className="text-label-sm font-label-sm font-medium text-on-surface">
            {typeLabel(f.action.type)} {entityLabel(f.action.entity)}
          </div>
          <div className="text-label-sm font-label-sm text-error mt-0.5">{f.message}</div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onRetry(f.action.id)}
              className="text-label-sm font-label-sm px-2 py-1 rounded bg-primary text-on-primary hover:opacity-90"
            >
              Réessayer
            </button>
            <button
              onClick={() => onDiscard(f.action.id)}
              className="text-label-sm font-label-sm px-2 py-1 rounded bg-surface-container-highest text-on-surface-variant hover:opacity-90"
            >
              Abandonner
            </button>
          </div>
        </div>
      ))}
    </div>
    <div className="flex gap-2 border-t border-outline-variant pt-3">
      <button
        onClick={onRetryAll}
        className="flex-1 text-label-sm font-label-sm px-2 py-1.5 rounded bg-primary text-on-primary hover:opacity-90"
      >
        Tout réessayer
      </button>
      <button
        onClick={onDiscardAll}
        className="flex-1 text-label-sm font-label-sm px-2 py-1.5 rounded bg-surface-container-highest text-on-surface-variant hover:opacity-90"
      >
        Tout abandonner
      </button>
    </div>
  </div>
);

export const SyncStatus = () => {
  const {
    isOnline,
    isSyncing,
    queueCount,
    failedActions,
    retryAction,
    discardAction,
    retryAllFailed,
    discardAllFailed,
  } = useNetworkSync();

  const [panelOpen, setPanelOpen] = useState(false);
  const failedCount = failedActions.length;

  if (!isOnline) {
    return (
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-error-container text-on-error-container"
        role="status"
        aria-label="Hors ligne"
      >
        <span className="material-symbols-outlined text-[16px]">wifi_off</span>
        <span className="text-label-sm font-label-sm hidden sm:inline">Hors ligne</span>
      </div>
    );
  }

  if (isSyncing) {
    return (
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container"
        role="status"
        aria-label="Synchronisation en cours"
      >
        <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
        <span className="text-label-sm font-label-sm hidden sm:inline">Synchronisation…</span>
      </div>
    );
  }

  if (failedCount > 0) {
    return (
      <div className="relative">
        <button
          onClick={() => setPanelOpen((open) => !open)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-error-container text-on-error-container hover:opacity-90 ${panelOpen ? 'ring-2 ring-error' : ''}`}
          aria-expanded={panelOpen}
          aria-label={`${failedCount} synchronisation(s) en échec`}
        >
          <span className="material-symbols-outlined text-[16px]">sync_problem</span>
          <span className="text-label-sm font-label-sm">{failedCount} en échec</span>
        </button>
        {panelOpen && (
          <FailedActionsPanel
            failedActions={failedActions}
            onRetry={(id) => retryAction(id)}
            onDiscard={(id) => discardAction(id)}
            onRetryAll={() => retryAllFailed()}
            onDiscardAll={discardAllFailed}
            onClose={() => setPanelOpen(false)}
          />
        )}
      </div>
    );
  }

  if (queueCount > 0) {
    return (
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-container/20 text-tertiary"
        role="status"
        aria-label={`${queueCount} modification(s) en attente de synchronisation`}
      >
        <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
        <span className="text-label-sm font-label-sm">{queueCount} en attente</span>
      </div>
    );
  }

  return null;
};
