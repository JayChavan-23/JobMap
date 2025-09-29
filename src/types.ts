export type Status = 'NONE' | 'APPLIED' | 'RESPONSE' | 'REJECTED' | 'OFFER';

export interface CouncilProps {
  id: string;               // stable slug, e.g. "city-of-adelaide"
  name: string;
  website?: string;
  careersUrl?: string;
  email?: string;
  phone?: string;
}

export interface CouncilStatus {
  councilId: string;
  status: Status;
  note?: string;
  updatedAt: string;        // ISO
}
