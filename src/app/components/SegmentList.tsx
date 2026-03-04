import { Segment } from '../utils/segmentAnalyzer';
import { Card } from './ui/card';
import { motion } from 'motion/react';
import { ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SegmentListProps {
  segments: Segment[];
  onSegmentClick?: (segment: Segment) => void;
  selectedSegmentId?: string;
}

function getSegmentIcon(type: Segment['type']) {
  switch (type) {
    case 'steep-climb':
    case 'climb':
      return TrendingUp;
    case 'steep-descent':
    case 'descent':
      return TrendingDown;
    case 'flat':
      return Minus;
  }
}

function getSegmentColor(type: Segment['type']): string {
  switch (type) {
    case 'steep-climb':
      return 'bg-destructive/10 border-destructive/30 text-destructive';
    case 'climb':
      return 'bg-accent/10 border-accent/30 text-accent';
    case 'steep-descent':
      return 'bg-[var(--trail-brown)]/10 border-[var(--trail-brown)]/30 text-[var(--trail-brown)]';
    case 'descent':
      return 'bg-primary/10 border-primary/30 text-primary';
    case 'flat':
      return 'bg-muted border-border text-muted-foreground';
  }
}

export function SegmentList({
  segments,
  onSegmentClick,
  selectedSegmentId,
}: SegmentListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className="overflow-hidden">
        <div className="p-4 bg-muted/30 border-b">
          <h3>Route Segments</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {segments.length} segment{segments.length !== 1 ? 's' : ''} based on waypoints
          </p>
        </div>

        <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
          {segments.map((segment, index) => {
            const Icon = getSegmentIcon(segment.type);
            const colorClass = getSegmentColor(segment.type);
            const isSelected = segment.id === selectedSegmentId;

            return (
              <motion.div
                key={segment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`p-4 cursor-pointer transition-all hover:bg-muted/50 ${
                  isSelected ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                }`}
                onClick={() => onSegmentClick?.(segment)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg border ${colorClass} flex-shrink-0`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <p className="text-sm mb-1 truncate">
                          {segment.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          KM {(segment.startDistance / 1000).toFixed(1)} → KM{' '}
                          {(segment.endDistance / 1000).toFixed(1)}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Distance: </span>
                        <span>{(segment.distance / 1000).toFixed(2)} km</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avg Gradient: </span>
                        <span
                          className={
                            segment.avgGradient > 3
                              ? 'text-accent'
                              : segment.avgGradient < -3
                              ? 'text-[var(--trail-brown)]'
                              : ''
                          }
                        >
                          {segment.avgGradient.toFixed(1)}%
                        </span>
                      </div>
                      {segment.elevationGain > 0 && (
                        <div>
                          <span className="text-muted-foreground">Climb: </span>
                          <span className="text-accent">
                            +{Math.round(segment.elevationGain)}m
                          </span>
                        </div>
                      )}
                      {segment.elevationLoss > 0 && (
                        <div>
                          <span className="text-muted-foreground">Descent: </span>
                          <span className="text-[var(--trail-brown)]">
                            -{Math.round(segment.elevationLoss)}m
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
