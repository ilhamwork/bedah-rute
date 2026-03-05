import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";

import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Layers } from "lucide-react";

import { Segment } from "../utils/segmentAnalyzer";
import { GPXData, TrackPoint } from "../utils/gpxParser";

interface MapViewProps {
  gpxData: GPXData;
  highlightedPointIndex?: number;
  highlightSegment?: Segment | null;
}

// Fix Leaflet marker issue (Vite)
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

/* =========================
   Custom Icons
========================= */

const startIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const finishIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const highlightIcon = new L.DivIcon({
  className: "",
  html: `<div style="background:#000;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4)"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const waypointIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [20, 33],
  iconAnchor: [10, 33],
  popupAnchor: [1, -28],
  shadowSize: [33, 33],
});

/* =========================
   Fit Bounds
========================= */

function FitBounds({ points }: { points: TrackPoint[] }) {
  const map = useMap();

  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lon]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [points, map]);

  return null;
}

/* =========================
   Highlight Segment
========================= */

function HighlightSegment({ segment }: { segment?: Segment | null }) {
  const map = useMap();

  useEffect(() => {
    if (segment && segment.trackPoints.length > 0) {
      const bounds = L.latLngBounds(
        segment.trackPoints.map((p) => [p.lat, p.lon]),
      );

      map.fitBounds(bounds, { padding: [60, 60] });
    }
  }, [segment, map]);

  return null;
}

/* =========================
   MapView
========================= */

export function MapView({
  gpxData,
  highlightedPointIndex,
  highlightSegment,
}: MapViewProps) {
  const [useSatellite, setUseSatellite] = useState(false);

  const { trackPoints, waypoints } = gpxData;

  if (!trackPoints || trackPoints.length === 0) return null;

  const start = trackPoints[0];
  const finish = trackPoints[trackPoints.length - 1];

  const routePositions: [number, number][] = trackPoints.map((p) => [
    p.lat,
    p.lon,
  ]);

  const highlightPositions =
    highlightSegment?.trackPoints.map(
      (p) => [p.lat, p.lon] as [number, number],
    ) ?? null;

  const highlightedPoint =
    highlightedPointIndex !== undefined
      ? trackPoints[highlightedPointIndex]
      : null;

  return (
    <Card className="overflow-hidden gap-0">
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
          center={[start.lat, start.lon]}
          zoom={13}
          className="h-full w-full"
          zoomControl
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url={
              useSatellite
                ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
          />

          {/* Full Route */}
          <Polyline
            positions={routePositions}
            pathOptions={{
              color: "rgb(255, 119, 0)",
              weight: 4,
              opacity: 0.8,
            }}
          />

          {/* Highlight Segment */}
          {highlightPositions && (
            <Polyline
              positions={highlightPositions}
              pathOptions={{
                color: "rgb(40, 40, 233)",
                weight: 6,
                opacity: 1,
              }}
            />
          )}

          {/* Start */}
          <Marker position={[start.lat, start.lon]} icon={startIcon}>
            <Popup>
              <strong>Start</strong>
              <br />
              Elevation: {Math.round(start.ele)} m
            </Popup>
          </Marker>

          {/* Finish */}
          <Marker position={[finish.lat, finish.lon]} icon={finishIcon}>
            <Popup>
              <strong>Finish</strong>
              <br />
              Distance: {(finish.distance / 1000).toFixed(2)} km
              <br />
              Elevation: {Math.round(finish.ele)} m
            </Popup>
          </Marker>

          {/* Waypoints */}
          {waypoints.map((wp, i) => (
            <Marker key={i} position={[wp.lat, wp.lon]} icon={waypointIcon}>
              <Popup>
                <strong>{wp.name}</strong>
                <br />
                Distance: {(wp.distance / 1000).toFixed(2)} km
                <br />
                Elevation: {Math.round(wp.ele)} m
              </Popup>
            </Marker>
          ))}

          {/* Highlight Point */}
          {highlightedPoint && (
            <Marker
              position={[highlightedPoint.lat, highlightedPoint.lon]}
              icon={highlightIcon}
            />
          )}

          <FitBounds points={trackPoints} />
          <HighlightSegment segment={highlightSegment} />
        </MapContainer>
      </div>
    </Card>
  );
}
