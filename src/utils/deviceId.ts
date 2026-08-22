export const getDeviceId = (): string => {
  if (typeof window === 'undefined') return 'ssr-device';
  let id = localStorage.getItem('deviceId');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('deviceId', id);
  }
  return id;
};

export const extractEntityFromUrl = (url: string | undefined): string => {
  if (!url) return 'Unknown';
  const match = url.match(/^\/?(tasks|events|grades|works|courses)/);
  if (!match) return 'Unknown';
  const entityMap: Record<string, string> = {
    tasks: 'Task',
    events: 'Event',
    grades: 'Grade',
    works: 'Work',
    courses: 'Course',
  };
  return entityMap[match[1]] ?? 'Unknown';
};

export const methodToSyncType = (method: string): 'CREATE' | 'UPDATE' | 'DELETE' => {
  const m = method.toUpperCase();
  if (m === 'POST') return 'CREATE';
  if (m === 'DELETE') return 'DELETE';
  return 'UPDATE';
};