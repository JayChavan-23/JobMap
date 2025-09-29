import { useState } from 'react';
import MapView from './components/MapView';
import Filters from './components/Filters';
import CouncilList from './components/CouncilList';
import CouncilStatusModal from './components/CouncilStatusModal';

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'ALL'|'APPLIED'|'RESPONSE'|'REJECTED'|'OFFER'>('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCouncil, setModalCouncil] = useState<{id: string, name: string} | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="mx-auto w-[90%] space-y-6">
        <header className="text-center py-6">
          <h1 className="text-4xl font-bold bg-black bg-clip-text text-transparent mb-2">
            SA Councils Job Tracker
          </h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 h-[85vh]">
          <aside className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 w-full lg:w-[500px] flex-shrink-0 flex flex-col">
            <div className="mb-6 flex-shrink-0">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Filters & Search</h2>
              <Filters value={filter} onChange={setFilter} />
            </div>
            <div className="h-4 flex-shrink-0" />
            <div className="flex-1 min-h-0 flex flex-col">
              <h3 className="text-lg font-medium text-slate-700 mb-4 flex-shrink-0">Councils</h3>
              <div className="flex-1 min-h-0">
                <CouncilList 
                  filter={filter} 
                  selectedId={selectedId} 
                  onSelect={setSelectedId}
                  onOpenModal={(id, name) => {
                    setModalCouncil({id, name});
                    setModalOpen(true);
                  }}
                />
              </div>
            </div>
          </aside>

          <section className="flex-1 min-h-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-2 shadow-xl border border-white/20 h-full">
              <MapView 
                selectedId={selectedId} 
                onSelect={setSelectedId} 
                filter={filter}
              />
            </div>
          </section>
        </div>
      </div>

      <CouncilStatusModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setModalCouncil(null);
        }}
        councilId={modalCouncil?.id || ''}
        councilName={modalCouncil?.name || ''}
      />
    </div>
  );
}
