import { useEffect, useMemo, useState } from 'react';
import type { Feature, FeatureCollection, Polygon, MultiPolygon } from 'geojson';
import { slug } from '../../lib/slug';

export interface CouncilFeature extends Feature<Polygon | MultiPolygon> {
  properties: {
    Council?: string;     // from your GeoJSON
    URL?: string;
    [k: string]: any;
    id?: string;          // we will add
    name?: string;        // we will add
  };
}

export function useCouncils() {
  const [fc, setFc] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    fetch('/councils.geojson').then(r => r.json()).then(setFc).catch(console.error);
  }, []);

  const features = useMemo(() => {
    if (!fc) return [];
    return (fc.features as CouncilFeature[]).map(f => {
      const name = f.properties.Council ?? f.properties.name ?? 'Unknown';
      const id = f.properties.id ?? slug(name);
      f.properties.id = id;
      f.properties.name = name;
      return f;
    });
  }, [fc]);

  return { fc, features, ready: !!fc };
}
