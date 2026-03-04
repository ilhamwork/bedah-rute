import { Segment } from './segmentAnalyzer';

export interface SegmentPace {
  segmentId: string;
  paceMinPerKm: number; // pace in minutes per kilometer
  estimatedTimeMinutes: number;
}

export interface PaceEstimate {
  segmentPaces: SegmentPace[];
  totalTimeMinutes: number;
  totalTimeFormatted: string;
}

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  const secs = Math.floor((minutes % 1) * 60);
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  } else if (mins > 0) {
    return `${mins}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

export function calculatePaceForSegment(
  segment: Segment,
  baseFlatPace: number, // min/km
): number {
  // Adjust pace based on gradient
  // This is a simplified model - real trail running pace varies significantly
  const gradient = segment.avgGradient;
  
  let adjustmentFactor = 1.0;
  
  if (gradient > 15) {
    // Very steep climb - walking pace
    adjustmentFactor = 3.5;
  } else if (gradient > 10) {
    // Steep climb
    adjustmentFactor = 2.5;
  } else if (gradient > 5) {
    // Moderate climb
    adjustmentFactor = 1.8;
  } else if (gradient > 2) {
    // Gentle climb
    adjustmentFactor = 1.3;
  } else if (gradient < -15) {
    // Very steep descent - careful pace
    adjustmentFactor = 1.8;
  } else if (gradient < -10) {
    // Steep descent
    adjustmentFactor = 1.2;
  } else if (gradient < -5) {
    // Moderate descent - faster
    adjustmentFactor = 0.85;
  } else if (gradient < -2) {
    // Gentle descent
    adjustmentFactor = 0.9;
  }
  
  return baseFlatPace * adjustmentFactor;
}

export function estimatePaceForRoute(
  segments: Segment[],
  customPaces?: Map<string, number>
): PaceEstimate {
  const segmentPaces: SegmentPace[] = [];
  let totalTimeMinutes = 0;

  const defaultFlatPace = 6; // 6 min/km as default

  for (const segment of segments) {
    const distanceKm = segment.distance / 1000;
    
    // Use custom pace if provided, otherwise calculate based on gradient
    const paceMinPerKm = customPaces?.has(segment.id)
      ? customPaces.get(segment.id)!
      : calculatePaceForSegment(segment, defaultFlatPace);
    
    const estimatedTimeMinutes = distanceKm * paceMinPerKm;
    
    segmentPaces.push({
      segmentId: segment.id,
      paceMinPerKm,
      estimatedTimeMinutes,
    });
    
    totalTimeMinutes += estimatedTimeMinutes;
  }

  return {
    segmentPaces,
    totalTimeMinutes,
    totalTimeFormatted: formatTime(totalTimeMinutes),
  };
}
