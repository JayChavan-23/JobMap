type F = 'ALL' | 'APPLIED' | 'RESPONSE' | 'REJECTED' | 'OFFER';
const items: { value: F; label: string; color: string }[] = [
  { value: 'ALL', label: 'All', color: 'bg-slate-100 text-slate-700' },
  { value: 'APPLIED', label: 'Applied', color: 'bg-amber-100 text-amber-700' },
  { value: 'RESPONSE', label: 'Response', color: 'bg-green-100 text-green-700' },
  { value: 'REJECTED', label: 'Rejected', color: 'bg-red-100 text-red-700' },
  { value: 'OFFER', label: 'Offer', color: 'bg-blue-100 text-blue-700' },
];

export default function Filters({ value, onChange }:{ value: F; onChange:(f:F)=>void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md
            ${value === item.value 
              ? `${item.color} border-current shadow-md` 
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
