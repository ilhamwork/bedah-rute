import { useState, useEffect } from 'react';
import { Segment } from '../utils/segmentAnalyzer';
import { estimatePaceForRoute, formatTime, calculatePaceForSegment } from '../utils/paceCalculator';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { motion } from 'motion/react';
import { Timer, Clock } from 'lucide-react';

interface PaceEstimatorProps {
  segments: Segment[];
}

export function PaceEstimator({ segments }: PaceEstimatorProps) {
  const [customPaces, setCustomPaces] = useState<Map<string, number>>(new Map());

  // Initialize with calculated paces
  useEffect(() => {
    const initialPaces = new Map<string, number>();
    const defaultFlatPace = 6; // 6 min/km

    segments.forEach(segment => {
      const calculatedPace = calculatePaceForSegment(segment, defaultFlatPace);
      initialPaces.set(segment.id, calculatedPace);
    });

    setCustomPaces(initialPaces);
  }, [segments]);

  const handlePaceChange = (segmentId: string, value: number[]) => {
    const newPaces = new Map(customPaces);
    newPaces.set(segmentId, value[0]);
    setCustomPaces(newPaces);
  };

  const estimate = estimatePaceForRoute(segments, customPaces);

  const formatPace = (minPerKm: number): string => {
    const mins = Math.floor(minPerKm);
    const secs = Math.round((minPerKm - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')} /km`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Card className="overflow-hidden">
        <div className="p-4 bg-primary text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="flex items-center gap-2 mb-1">
                <Timer className="w-5 h-5" />
                Finish Time Estimate
              </h3>
              <p className="text-xs opacity-90">
                Adjust pace for each segment
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl md:text-4xl">
                {estimate.totalTimeFormatted}
              </p>
              <p className="text-xs opacity-90 mt-1">Total Time</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
          {segments.map((segment, index) => {
            const pace = customPaces.get(segment.id) || 6;
            const estimatedTime = (segment.distance / 1000) * pace;

            return (
              <div
                key={segment.id}
                className="p-4 rounded-lg bg-muted/30 border border-border space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate mb-1">
                      {segment.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(segment.distance / 1000).toFixed(2)} km • {segment.avgGradient.toFixed(1)}% avg gradient
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg">{formatTime(estimatedTime)}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatPace(pace)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Pace (min/km)</span>
                    <span>{pace.toFixed(1)}</span>
                  </div>
                  <Slider
                    value={[pace]}
                    onValueChange={(value) => handlePaceChange(segment.id, value)}
                    min={3}
                    max={15}
                    step={0.1}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>3:00 /km (Fast)</span>
                    <span>15:00 /km (Slow)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-muted/30 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Total Distance: {(segments.reduce((sum, s) => sum + s.distance, 0) / 1000).toFixed(2)} km
              </span>
            </div>
            <div className="text-right">
              <p className="text-2xl text-primary">
                {estimate.totalTimeFormatted}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
