import type { Status } from '../state/statusStore';
export const STATUS_COLORS: Record<Status, string> = {
  NONE: '#9ca3af',
  APPLIED: '#f59e0b',
  RESPONSE: '#22c55e',
  REJECTED: '#ef4444',
  OFFER: '#3b82f6',
};
