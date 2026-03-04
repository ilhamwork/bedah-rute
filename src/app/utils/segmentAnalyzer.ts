import { TrackPoint, Waypoint } from './gpxParser';

export interface Segment {
  id: string;
  name: string;
  startDistance: number;
  endDistance: number;
  distance: number; // segment distance in meters
  elevationGain: number;
  elevationLoss: number;
  startElevation: number;
  endElevation: number;
  avgGradient: number;
  maxGradient: number;
  minGradient: number;
  type: 'flat' | 'climb' | 'descent' | 'steep-climb' | 'steep-descent';
  trackPoints: TrackPoint[];
}

export interface RouteMetrics {
  totalDistance: number; // in meters
  totalElevationGain: number;
  totalElevationLoss: number;
  highestPoint: number;
  lowestPoint: number;
  maxGradient: number;
  minGradient: number;
  difficultyScore: number;
}

function calculateGradient(elevationChange: number, distance: number): number {
  if (distance === 0) return 0;
  return (elevationChange / distance) * 100;
}

function getSegmentType(avgGradient: number): Segment['type'] {
  if (avgGradient > 8) return 'steep-climb';
  if (avgGradient > 3) return 'climb';
  if (avgGradient < -8) return 'steep-descent';
  if (avgGradient < -3) return 'descent';
  return 'flat';
}

function getSegmentName(type: Segment['type'], elevationChange: number): string {
  const absChange = Math.abs(Math.round(elevationChange));
  
  switch (type) {
    case 'steep-climb':
      return `Steep Climb (+${absChange}m)`;
    case 'climb':
      return `Climb (+${absChange}m)`;
    case 'steep-descent':
      return `Steep Descent (-${absChange}m)`;
    case 'descent':
      return `Descent (-${absChange}m)`;
    case 'flat':
      return 'Flat / Rolling';
    default:
      return 'Unknown';
  }
}

export function analyzeRouteByWaypoints(
  trackPoints: TrackPoint[],
  waypoints: Waypoint[]
): Segment[] {
  if (trackPoints.length === 0) return [];

  const segments: Segment[] = [];
  
  // Sort waypoints by distance
  const sortedWaypoints = [...waypoints].sort((a, b) => a.distance - b.distance);
  
  // If no waypoints, create one segment for entire route
  if (sortedWaypoints.length === 0) {
    const segment = createSegment(trackPoints, 0, trackPoints.length - 1, 'Full Route');
    segments.push(segment);
    return segments;
  }

  // Create segments between waypoints
  let lastWaypointIndex = 0;
  
  for (let i = 0; i < sortedWaypoints.length; i++) {
    const waypoint = sortedWaypoints[i];
    
    // Find the track point index closest to this waypoint
    const waypointIndex = findClosestTrackPointIndex(trackPoints, waypoint.distance);
    
    // Create segment from last waypoint to this one
    if (waypointIndex > lastWaypointIndex) {
      const segmentPoints = trackPoints.slice(lastWaypointIndex, waypointIndex + 1);
      const segment = createSegmentFromPoints(
        segmentPoints,
        lastWaypointIndex,
        waypointIndex,
        i === 0 ? 'Start' : sortedWaypoints[i - 1]?.name || `Segment ${i}`,
        waypoint.name
      );
      segments.push(segment);
      lastWaypointIndex = waypointIndex;
    }
  }

  // Add final segment from last waypoint to end
  if (lastWaypointIndex < trackPoints.length - 1) {
    const segmentPoints = trackPoints.slice(lastWaypointIndex);
    const segment = createSegmentFromPoints(
      segmentPoints,
      lastWaypointIndex,
      trackPoints.length - 1,
      sortedWaypoints[sortedWaypoints.length - 1].name,
      'Finish'
    );
    segments.push(segment);
  }

  return segments;
}

function findClosestTrackPointIndex(trackPoints: TrackPoint[], distance: number): number {
  let closestIndex = 0;
  let minDiff = Math.abs(trackPoints[0].distance - distance);

  for (let i = 1; i < trackPoints.length; i++) {
    const diff = Math.abs(trackPoints[i].distance - distance);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  }

  return closestIndex;
}

function createSegmentFromPoints(
  segmentPoints: TrackPoint[],
  startIdx: number,
  endIdx: number,
  startName: string,
  endName: string
): Segment {
  const startDistance = segmentPoints[0].distance;
  const endDistance = segmentPoints[segmentPoints.length - 1].distance;
  const distance = endDistance - startDistance;
  
  const startElevation = segmentPoints[0].ele;
  const endElevation = segmentPoints[segmentPoints.length - 1].ele;
  const elevationChange = endElevation - startElevation;

  // Calculate elevation gain and loss
  let elevationGain = 0;
  let elevationLoss = 0;
  let maxGradient = -Infinity;
  let minGradient = Infinity;

  for (let i = 1; i < segmentPoints.length; i++) {
    const eleChange = segmentPoints[i].ele - segmentPoints[i - 1].ele;
    const dist = segmentPoints[i].distance - segmentPoints[i - 1].distance;
    
    if (eleChange > 0) elevationGain += eleChange;
    if (eleChange < 0) elevationLoss += Math.abs(eleChange);
    
    if (dist > 0) {
      const gradient = calculateGradient(eleChange, dist);
      maxGradient = Math.max(maxGradient, gradient);
      minGradient = Math.min(minGradient, gradient);
    }
  }

  const avgGradient = calculateGradient(elevationChange, distance);
  const type = getSegmentType(avgGradient);
  const name = `${startName} → ${endName}`;

  return {
    id: `segment-${startIdx}-${endIdx}`,
    name,
    startDistance,
    endDistance,
    distance,
    elevationGain,
    elevationLoss,
    startElevation,
    endElevation,
    avgGradient,
    maxGradient: maxGradient === -Infinity ? 0 : maxGradient,
    minGradient: minGradient === Infinity ? 0 : minGradient,
    type,
    trackPoints: segmentPoints,
  };
}

function createSegment(
  trackPoints: TrackPoint[],
  startIdx: number,
  endIdx: number,
  name: string
): Segment {
  const segmentPoints = trackPoints.slice(startIdx, endIdx + 1);
  return createSegmentFromPoints(segmentPoints, startIdx, endIdx, 'Start', 'Finish');
}

export function calculateRouteMetrics(trackPoints: TrackPoint[]): RouteMetrics {
  if (trackPoints.length === 0) {
    return {
      totalDistance: 0,
      totalElevationGain: 0,
      totalElevationLoss: 0,
      highestPoint: 0,
      lowestPoint: 0,
      maxGradient: 0,
      minGradient: 0,
      difficultyScore: 0,
    };
  }

  const totalDistance = trackPoints[trackPoints.length - 1].distance;
  let totalElevationGain = 0;
  let totalElevationLoss = 0;
  let maxGradient = -Infinity;
  let minGradient = Infinity;

  const elevations = trackPoints.map(p => p.ele);
  const highestPoint = Math.max(...elevations);
  const lowestPoint = Math.min(...elevations);

  for (let i = 1; i < trackPoints.length; i++) {
    const eleChange = trackPoints[i].ele - trackPoints[i - 1].ele;
    const dist = trackPoints[i].distance - trackPoints[i - 1].distance;

    if (eleChange > 0) totalElevationGain += eleChange;
    if (eleChange < 0) totalElevationLoss += Math.abs(eleChange);

    if (dist > 0) {
      const gradient = calculateGradient(eleChange, dist);
      maxGradient = Math.max(maxGradient, gradient);
      minGradient = Math.min(minGradient, gradient);
    }
  }

  // Calculate difficulty score (0-10)
  // Factors: distance, elevation gain, steepness
  const distanceScore = Math.min((totalDistance / 1000) / 50, 1) * 3; // max 3 points for 50km+
  const elevationScore = Math.min(totalElevationGain / 3000, 1) * 4; // max 4 points for 3000m+
  const steepnessScore = Math.min(Math.abs(maxGradient) / 30, 1) * 3; // max 3 points for 30%+
  const difficultyScore = Math.min(distanceScore + elevationScore + steepnessScore, 10);

  return {
    totalDistance,
    totalElevationGain,
    totalElevationLoss,
    highestPoint,
    lowestPoint,
    maxGradient: maxGradient === -Infinity ? 0 : maxGradient,
    minGradient: minGradient === Infinity ? 0 : minGradient,
    difficultyScore,
  };
}
