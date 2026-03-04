import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { TrackPoint, GPXData } from '../utils/gpxParser';
import { Card } from './ui/card';
import { Layers } from 'lucide-react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useState } from 'react';

interface MapViewProps {
  gpxData: GPXData;
  highlightedPointIndex?: number;
}

// Fix Leaflet default marker icon issue with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom start marker (green)
const startIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom finish marker (red)
const finishIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom waypoint marker (orange)
const waypointIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [20, 33],
  iconAnchor: [10, 33],
  popupAnchor: [1, -28],
  shadowSize: [33, 33],
});

function MapController({ bounds }: { bounds: GPXData['bounds'] }) {
  const map = useMap();

  useEffect(() => {
    const leafletBounds = L.latLngBounds(
      [bounds.south, bounds.west],
      [bounds.north, bounds.east]
    );
    map.fitBounds(leafletBounds, { padding: [30, 30] });
  }, [map, bounds]);

  return null;
}

function HighlightMarker({ point }: { point: TrackPoint }) {
  const highlightIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <Marker position={[point.lat, point.lon]} icon={highlightIcon}>
      <Popup>
        Distance: {(point.distance / 1000).toFixed(2)} km<br />
        Elevation: {Math.round(point.ele)} m
      </Popup>
    </Marker>
  );
}

export function MapView({ gpxData, highlightedPointIndex }: MapViewProps) {
  const [useSatellite, setUseSatellite] = useState(false);
  const { trackPoints, waypoints, bounds } = gpxData;

  // Convert track points to Leaflet LatLng format
  const routeCoordinates: [number, number][] = trackPoints.map(p => [p.lat, p.lon]);

  const center: [number, number] = [
    (bounds.north + bounds.south) / 2,
    (bounds.east + bounds.west) / 2,
  ];

  const highlightedPoint =
    highlightedPointIndex !== undefined && highlightedPointIndex >= 0
      ? trackPoints[highlightedPointIndex]
      : null;

  return (
    <Card className="overflow-hidden">
      <div className="p-4 bg-muted/30 border-b flex items-center justify-between">
        <h3 className="flex items-center gap-2">
          <Layers className="w-4 h-4" />
          Route Map
        </h3>
        <div className="flex items-center gap-2">
          <Label htmlFor="satellite-toggle" className="text-xs cursor-pointer">
            Satellite
          </Label>
          <Switch
            id="satellite-toggle"
            checked={useSatellite}
            onCheckedChange={setUseSatellite}
          />
        </div>
      </div>

      <div className="h-[400px] md:h-[500px] w-full relative">
        <MapContainer
          center={center}
          zoom={13}
          className="h-full w-full"
          zoomControl={true}
        >
          <MapController bounds={bounds} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url={
              useSatellite
                ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            }
          />
          <Polyline
            positions={routeCoordinates}
            pathOptions={{
              color: '#2d4a2d',
              weight: 4,
              opacity: 0.8,
            }}
          />
          {trackPoints.length > 0 && (
            <Marker position={[trackPoints[0].lat, trackPoints[0].lon]} icon={startIcon}>
              <Popup>
                <strong>Start</strong><br />
                Elevation: {Math.round(trackPoints[0].ele)} m
              </Popup>
            </Marker>
          )}
          {trackPoints.length > 0 && (
            <Marker
              position={[
                trackPoints[trackPoints.length - 1].lat,
                trackPoints[trackPoints.length - 1].lon,
              ]}
              icon={finishIcon}
            >
              <Popup>
                <strong>Finish</strong><br />
                Distance: {(trackPoints[trackPoints.length - 1].distance / 1000).toFixed(2)} km<br />
                Elevation: {Math.round(trackPoints[trackPoints.length - 1].ele)} m
              </Popup>
            </Marker>
          )}
          {waypoints.map((waypoint, index) => (
            <Marker
              key={`waypoint-${index}`}
              position={[waypoint.lat, waypoint.lon]}
              icon={waypointIcon}
            >
              <Popup>
                <strong>{waypoint.name}</strong><br />
                Distance: {(waypoint.distance / 1000).toFixed(2)} km<br />
                Elevation: {Math.round(waypoint.ele)} m
              </Popup>
            </Marker>
          ))}
          {highlightedPoint && <HighlightMarker point={highlightedPoint} />}
        </MapContainer>
      </div>
    </Card>
  );
}