import { RouteMetrics } from "../utils/segmentAnalyzer";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import {
  Mountain,
  TrendingUp,
  TrendingDown,
  Maximize2,
  Minimize2,
  Target,
  GlassWater,
} from "lucide-react";

interface MetricsPanelProps {
  metrics: RouteMetrics;
}

function formatDistance(meters: number): string {
  const km = meters / 1000;
  return `${km.toFixed(2)} km`;
}

function formatElevation(meters: number): string {
  return `${Math.round(meters)} m`;
}

function formatGradient(gradient: number): string {
  return `${gradient.toFixed(1)}%`;
}

function getDifficultyColor(score: number): string {
  if (score >= 8) return "text-destructive";
  if (score >= 6) return "text-accent";
  if (score >= 4) return "text-[var(--sun)]";
  return "text-primary";
}

function getDifficultyLabel(score: number): string {
  if (score >= 8) return "Extreme";
  if (score >= 6) return "Hard";
  if (score >= 4) return "Moderate";
  return "Easy";
}

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  const difficultyColor = getDifficultyColor(metrics.difficultyScore);
  const difficultyLabel = getDifficultyLabel(metrics.difficultyScore);

  const metricCards = [
    {
      icon: Mountain,
      label: "Total Distance",
      value: formatDistance(metrics.totalDistance),
      color: "text-forest",
    },
    {
      icon: TrendingUp,
      label: "Elevation Gain",
      value: formatElevation(metrics.totalElevationGain),
      color: "text-destructive",
    },
    {
      icon: TrendingDown,
      label: "Elevation Loss",
      value: formatElevation(metrics.totalElevationLoss),
      color: "text-[var(--earth)]",
    },
    {
      icon: Maximize2,
      label: "Highest Point",
      value: formatElevation(metrics.highestPoint),
      color: "text-primary",
    },
    {
      icon: Minimize2,
      label: "Lowest Point",
      value: formatElevation(metrics.lowestPoint),
      color: "text-muted-foreground",
    },
    {
      icon: GlassWater,
      label: "Water Station",
      value: metrics.totalAidStation,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="space-y-4">
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-6 bg-primary text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Difficulty Score</p>
              <p className="text-4xl md:text-5xl">
                {metrics.difficultyScore.toFixed(1)}
                <span className="text-xl ml-2 opacity-75">/ 10</span>
              </p>
              <p className="text-sm mt-2 opacity-90">{difficultyLabel}</p>
            </div>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-primary-foreground/20 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">
                {metrics.difficultyScore >= 8 ? '🔥' : metrics.difficultyScore >= 6 ? '⚡' : metrics.difficultyScore >= 4 ? '💪' : '✓'}
              </span>
            </div>
          </div>
        </Card>
      </motion.div> */}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {metricCards.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-2">
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {metric.label}
                  </p>
                  <p className="text-xl md:text-2xl">{metric.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
