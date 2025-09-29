import { useLocalStorage } from '../lib/useLocalStorage';
export type Status = 'NONE' | 'APPLIED' | 'RESPONSE' | 'REJECTED' | 'OFFER';
export const STATUS_ORDER: Status[] = ['NONE','APPLIED','RESPONSE','REJECTED','OFFER'];

export type StatusRec = { status: Status; note?: string; updatedAt: string };

export function useStatuses() {
  const [map, setMap] = useLocalStorage<Record<string, StatusRec>>('council-statuses', {});
  const setStatus = (id: string, status: Status, note?: string) =>
    setMap(prev => ({ ...prev, [id]: { status, note, updatedAt: new Date().toISOString() } }));
  const getStatus = (id: string): Status => map[id]?.status ?? 'NONE';
  const getUpdatedAt = (id: string) => map[id]?.updatedAt;
  return { map, setStatus, getStatus, getUpdatedAt };
}
