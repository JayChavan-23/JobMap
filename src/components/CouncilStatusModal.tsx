import { useState, useEffect, useCallback } from 'react';
import { useStatuses, STATUS_ORDER } from '../state/statusStore';
import { STATUS_COLORS } from '../styles/statusColors';

type Status = 'NONE' | 'APPLIED' | 'RESPONSE' | 'REJECTED' | 'OFFER';

interface CouncilStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  councilId: string;
  councilName: string;
}

const statusLabels: Record<Status, string> = {
  NONE: 'None',
  APPLIED: 'Applied',
  RESPONSE: 'Received Reply',
  REJECTED: 'Rejected',
  OFFER: 'Offer Received'
};

export default function CouncilStatusModal({ isOpen, onClose, councilId, councilName }: CouncilStatusModalProps) {
  const { getStatus, setStatus } = useStatuses();
  const [selectedStatus, setSelectedStatus] = useState<Status>('NONE');

  // Update selected status only when modal first opens
  useEffect(() => {
    if (isOpen && councilId) {
      const currentStatus = getStatus(councilId);
      console.log('Modal opened for council:', { councilId, councilName, currentStatus });
      setSelectedStatus(currentStatus);
    }
  }, [isOpen]); // Only depend on isOpen, not councilId

  if (!isOpen) return null;

  const handleSave = () => {
    console.log('Saving status:', { councilId, selectedStatus });
    setStatus(councilId, selectedStatus);
    console.log('Status saved, closing modal');
    onClose();
    // Refresh the page to show updated changes
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{councilName}</h2>
          <p className="text-slate-600">Update application status</p>
          <p className="text-xs text-slate-400 mt-2">Current selection: {selectedStatus}</p>
        </div>

        <div className="space-y-3 mb-8">
          {STATUS_ORDER.map(status => (
            <button
              key={status}
              onClick={() => {
                console.log('Status clicked:', status);
                setSelectedStatus(status);
              }}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                selectedStatus === status
                  ? 'border-blue-400 bg-blue-50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <span 
                    className="inline-block h-4 w-4 rounded-full shadow-sm" 
                    style={{ background: STATUS_COLORS[status] }}
                  />
                  {selectedStatus === status && (
                    <span className="absolute inset-0 rounded-full animate-ping opacity-30" 
                          style={{ background: STATUS_COLORS[status] }}></span>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{statusLabels[status]}</div>
                  <div className="text-sm text-slate-500">
                    {status === 'NONE' && 'No application submitted'}
                    {status === 'APPLIED' && 'Application submitted'}
                    {status === 'RESPONSE' && 'Received a response'}
                    {status === 'REJECTED' && 'Application rejected'}
                    {status === 'OFFER' && 'Job offer received'}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-medium hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 hover:shadow-md transition-all duration-200"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}
