// @ts-nocheck
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import type { FeatureCollection, Feature } from 'geojson';
import { useEffect, useState, useMemo } from 'react';
import { useStatuses } from '../status/statusStore';

const STATUS_COLORS: Record<string, string> = {
  NONE: '#9ca3af',      // gray
  APPLIED: '#f59e0b',   // yellow
  RESPONSE: '#22c55e',  // green
  REJECTED: '#ef4444',  // red
  OFFER: '#3b82f6',     // blue
};

export default function MapView() {
  const [fc, setFc] = useState<FeatureCollection | null>(null);
  const { getStatus, setStatus } = useStatuses();

  useEffect(() => {
    fetch('/councils.geojson').then(r => r.json()).then(setFc).catch(console.error);
  }, []);

  const styleFn = useMemo(() => (feature: Feature) => {
    const id = (feature.properties as any)?.id ?? (feature.properties as any)?.slug;
    const s = getStatus(id);
    return {
      color: '#1f2937',       // stroke
      weight: 1,
      fillColor: STATUS_COLORS[s],
      fillOpacity: s === 'NONE' ? 0.0 : 0.5,
    };
  }, [getStatus]);

  function onEachFeature(feature: Feature, layer: any) {
    const props: any = feature.properties || {};
    const id = props.id ?? props.slug;
    layer.bindTooltip(props.name || id);
    layer.on('click', () => {
      // quick demo: cycle through statuses on click
      const order = ['NONE','APPLIED','RESPONSE','REJECTED','OFFER'] as const;
      const next = order[(order.indexOf(getStatus(id)) + 1) % order.length];
      setStatus(id, next);
    });
  }

  if (!fc) return <div className="h-full grid place-items-center text-sm text-gray-500">loading map…</div>;

  return (
    <MapContainer center={[-34.93, 138.6]} zoom={10} className="h-full w-full rounded-2xl overflow-hidden">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={fc as any} style={styleFn as any} onEachFeature={onEachFeature} />
    </MapContainer>
  );
}
