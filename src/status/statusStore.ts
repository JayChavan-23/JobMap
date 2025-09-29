import { useLocalStorage } from '../lib/useLocalStorage.ts';
import type { Status } from '../types';

export function useStatuses() {
  const [map, setMap] = useLocalStorage<Record<string, { status: Status; note?: string; updatedAt: string }>>(
    'council-statuses', {}
  );
  function setStatus(id: string, status: Status, note?: string) {
    setMap(prev => ({ ...prev, [id]: { status, note, updatedAt: new Date().toISOString() } }));
  }
  function getStatus(id: string): Status {
    return map[id]?.status ?? 'NONE';
  }
  return { map, setStatus, getStatus };
}
