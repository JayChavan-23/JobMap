import { formatDistanceToNow } from 'date-fns';
export const since = (iso?: string) =>
  iso ? formatDistanceToNow(new Date(iso), { addSuffix: true }) : '';
