import { gpx } from '@tmcw/togeojson';

export interface TrackPoint {
  lat: number;
  lon: number;
  ele: number;
  distance: number; // cumulative distance in meters
}

export interface Waypoint {
  name: string;
  lat: number;
  lon: number;
  ele: number;
  distance: number; // distance from start in meters
}

export interface GPXData {
  trackPoints: TrackPoint[];
  waypoints: Waypoint[];
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

// Calculate distance between two points using Haversine formula
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export async function parseGPXFile(file: File): Promise<GPXData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        
        // Check for parsing errors
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
          throw new Error('Invalid XML format');
        }

        // Convert GPX to GeoJSON using togeojson
        const geojson = gpx(xmlDoc);
        
        const trackPoints: TrackPoint[] = [];
        const waypoints: Waypoint[] = [];
        let cumulativeDistance = 0;

        // Extract track points
        if (geojson.features && geojson.features.length > 0) {
          for (const feature of geojson.features) {
            if (feature.geometry.type === 'LineString') {
              const coordinates = feature.geometry.coordinates;
              
              for (let i = 0; i < coordinates.length; i++) {
                const [lon, lat, ele = 0] = coordinates[i];
                
                // Calculate distance from previous point
                if (i > 0) {
                  const prevPoint = trackPoints[i - 1];
                  const distance = haversineDistance(
                    prevPoint.lat,
                    prevPoint.lon,
                    lat,
                    lon
                  );
                  cumulativeDistance += distance;
                }

                trackPoints.push({
                  lat,
                  lon,
                  ele,
                  distance: cumulativeDistance,
                });
              }
            } else if (feature.geometry.type === 'Point') {
              // Extract waypoints
              const [lon, lat, ele = 0] = feature.geometry.coordinates;
              const name = feature.properties?.name || `WP${waypoints.length + 1}`;
              
              // Find closest track point to determine distance
              let closestDistance = 0;
              if (trackPoints.length > 0) {
                let minDist = Infinity;
                for (const tp of trackPoints) {
                  const dist = haversineDistance(tp.lat, tp.lon, lat, lon);
                  if (dist < minDist) {
                    minDist = dist;
                    closestDistance = tp.distance;
                  }
                }
              }
              
              waypoints.push({
                name,
                lat,
                lon,
                ele,
                distance: closestDistance,
              });
            }
          }
        }

        if (trackPoints.length === 0) {
          throw new Error('No track points found in GPX file');
        }

        // Calculate bounds
        const lats = trackPoints.map(p => p.lat);
        const lons = trackPoints.map(p => p.lon);
        
        const bounds = {
          north: Math.max(...lats),
          south: Math.min(...lats),
          east: Math.max(...lons),
          west: Math.min(...lons),
        };

        resolve({ trackPoints, waypoints, bounds });
      } catch (error) {
        reject(new Error(`Failed to parse GPX file: ${error}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}
