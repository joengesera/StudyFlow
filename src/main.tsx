import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { router } from './router';
import { queryClient, queryPersister } from './lib/queryClient';
import { initializeVisualComfort } from './hooks/useVisualComfort';
import 'material-symbols/outlined.css';
import './index.css';

const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((module) => ({
        default: module.ReactQueryDevtools,
      }))
    )
  : null;

initializeVisualComfort();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Le cache React Query est restauré depuis IndexedDB avant les
        premiers fetchs : c'est lui qui sert de store offline. */}
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: queryPersister,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      }}
      onSuccess={() => console.info('[query-cache] restore OK — données IndexedDB remises en cache')}
      onError={() => console.error('[query-cache] restore FAILED')}
    >
      <RouterProvider router={router} />
      {ReactQueryDevtools && (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      )}
    </PersistQueryClientProvider>
  </StrictMode>
);
