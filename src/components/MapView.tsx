// @ts-nocheck
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useMemo } from 'react';
import type { Feature } from 'geojson';
import { useCouncils } from '../features/councils/useCouncils';
import { useStatuses, STATUS_ORDER } from '../state/statusStore';
import { STATUS_COLORS } from '../styles/statusColors';

type Props = {
  selectedId?: string | null;
  onSelect: (id: string) => void;
  filter?: ('ALL' | 'APPLIED' | 'RESPONSE' | 'REJECTED' | 'OFFER');
};

export default function MapView({ selectedId, onSelect, filter = 'ALL' }: Props) {
  const { fc, ready } = useCouncils();
  const { getStatus } = useStatuses();

  // Filter features based on status
  const filteredFeatures = useMemo(() => {
    if (!fc) return null;
    return {
      ...fc,
      features: fc.features.filter(feature => {
        const p: any = feature.properties || {};
        const id = p.id;
        const status = getStatus(id);
        return filter === 'ALL' || status === filter;
      })
    };
  }, [fc, filter, getStatus]);

  const styleFn = useMemo(() => (feature: Feature) => {
    const p: any = feature.properties || {};
    const id = p.id;
    const s = getStatus(id);
    return {
      color: id === selectedId ? '#0f172a' : '#1f2937',
      weight: id === selectedId ? 3 : 1,
      opacity: 1,
      fillColor: STATUS_COLORS[s],
      fillOpacity: s === 'NONE' ? 0.05 : 0.5,
    };
  }, [getStatus, selectedId]);

  function onEachFeature(feature: Feature, layer: any) {
    const p: any = feature.properties || {};
    layer.bindTooltip(p.name || p.Council || p.id);
    layer.on('click', () => onSelect(p.id));
  }

  if (!ready || !filteredFeatures) return (
    <div className="h-full grid place-items-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Loading map...</p>
        <p className="text-slate-400 text-sm mt-1">Fetching SA council data</p>
      </div>
    </div>
  );

  return (
    <div className="h-full relative">
      <MapContainer center={[-34.93, 138.6]} zoom={7} className="h-full w-full rounded-2xl overflow-hidden shadow-inner">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={filteredFeatures as any} style={styleFn as any} onEachFeature={onEachFeature} />
      </MapContainer>
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
        <h4 className="font-semibold text-slate-800 mb-3">Status Legend</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-400"></span>
            <span className="text-slate-600">None</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="text-slate-600">Applied</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="text-slate-600">Response</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="text-slate-600">Rejected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="text-slate-600">Offer</span>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3 pt-2 border-t border-slate-200">
          Click councils to select, then update status in the sidebar
        </p>
      </div>
    </div>
  );
}
