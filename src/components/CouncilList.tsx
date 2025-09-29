import { useMemo, useState } from 'react';
import { useCouncils } from '../features/councils/useCouncils';
import { useStatuses } from '../state/statusStore';
import { STATUS_COLORS } from '../styles/statusColors';
import { since } from '../lib/time';

type F = 'ALL' | 'APPLIED' | 'RESPONSE' | 'REJECTED' | 'OFFER';

export default function CouncilList({
  filter, selectedId, onSelect
}:{ filter:F; selectedId?:string|null; onSelect:(id:string)=>void }) {
  const { features } = useCouncils();
  const { getStatus, getUpdatedAt } = useStatuses();
  const [q, setQ] = useState('');

  const rows = useMemo(() => {
    return features
      .map(f => ({ id: f.properties.id!, name: f.properties.name!, url: f.properties.URL }))
      .filter(r => (filter==='ALL' ? true : getStatus(r.id)===filter))
      .filter(r => r.name.toLowerCase().includes(q.toLowerCase()))
      .sort((a,b) => a.name.localeCompare(b.name));
  }, [features, filter, q, getStatus]);

  return (
    <div className="flex flex-col h-full">
      <div className="relative mb-4 flex-shrink-0">
        <input
          value={q} onChange={e=>setQ(e.target.value)}
          placeholder="Search councils…" 
          className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm bg-white/50 backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {rows.map(r => {
          const s = getStatus(r.id);
          return (
            <button key={r.id}
              onClick={() => onSelect(r.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md hover:scale-[1.02] group
                ${selectedId===r.id 
                  ? 'bg-blue-50 border-blue-300 shadow-md' 
                  : 'bg-white/50 border-slate-200 hover:border-slate-300'
                }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="inline-block h-3 w-3 rounded-full shadow-sm" style={{background: STATUS_COLORS[s]}}/>
                    <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{background: STATUS_COLORS[s]}}></span>
                  </div>
                  <span className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">{r.name}</span>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  s === 'APPLIED' ? 'bg-amber-100 text-amber-700' :
                  s === 'RESPONSE' ? 'bg-green-100 text-green-700' :
                  s === 'REJECTED' ? 'bg-red-100 text-red-700' :
                  s === 'OFFER' ? 'bg-blue-100 text-blue-700' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {s}
                </span>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {since(getUpdatedAt(r.id)) || 'No updates yet'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
