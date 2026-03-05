import { TrackPoint } from "../utils/gpxParser";
import { Card } from "./ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceDot,
} from "recharts";
import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";

interface Waypoint {
  name: string;
  distance: number; // meter
}

interface ElevationChartProps {
  trackPoints: TrackPoint[];
  waypoints?: Waypoint[];
  onHover?: (pointIndex: number | null) => void;
}

interface ChartDataPoint {
  distance: number;
  elevation: number;
  pointIndex: number;
}

export function ElevationChart({
  trackPoints,
  waypoints = [],
  onHover,
}: ElevationChartProps) {
  const sampleRate = Math.max(1, Math.floor(trackPoints.length / 500));

  const chartData: ChartDataPoint[] = trackPoints
    .filter((_, index) => index % sampleRate === 0)
    .map((point, index) => ({
      distance: point.distance / 1000,
      elevation: Math.round(point.ele),
      pointIndex: index * sampleRate,
    }));

  const totalDistanceKm =
    trackPoints.length > 0
      ? trackPoints[trackPoints.length - 1].distance / 1000
      : 0;

  const tickInterval = totalDistanceKm > 30 ? 10 : 5;

  const ticks: number[] = [];
  for (let i = 0; i <= totalDistanceKm; i += tickInterval) {
    ticks.push(i);
  }

  const lastKm = Math.round(totalDistanceKm);
  if (!ticks.includes(lastKm)) {
    ticks.push(lastKm);
  }

  const handleMouseMove = (data: any) => {
    if (data && data.activePayload && data.activePayload[0]) {
      const pointIndex = data.activePayload[0].payload.pointIndex;
      onHover?.(pointIndex);
    }
  };

  const handleMouseLeave = () => {
    onHover?.(null);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-xs text-muted-foreground mb-1">
            Distance:{" "}
            <span className="text-foreground">
              {data.distance.toFixed(2)} km
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Elevation:{" "}
            <span className="text-foreground">{data.elevation} m</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const getElevationAtDistance = (distanceKm: number) => {
    const point = chartData.find((d) => d.distance >= distanceKm);
    return point ? point.elevation : chartData[chartData.length - 1]?.elevation;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="overflow-hidden">
        <div className="p-4 bg-muted/30 border-b">
          <h3 className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Elevation Profile
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Hover over the chart to see details on the map
          </p>
        </div>

        <div className="p-4 md:p-6">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={chartData}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <defs>
                <linearGradient
                  id="elevationGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#2d4a2d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2d4a2d" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e8e4df" />

              <XAxis
                type="number"
                dataKey="distance"
                domain={[0, Math.ceil(totalDistanceKm)]}
                ticks={ticks}
                tickFormatter={(v) => `${v} km`}
                label={{
                  value: "Distance (km)",
                  position: "insideBottom",
                  offset: -5,
                  fontSize: 12,
                }}
                tick={{ fontSize: 10 }}
                stroke="#5a6859"
              />

              <YAxis
                tickFormatter={(v) => `${v}`}
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
                domain={["dataMin - 100", "dataMax + 100"]}
                label={{
                  value: "Elevation (m)",
                  position: "insideLeft",
                  fontSize: 12,
                  fill: "#9CA3AF",
                  angle: -90,
                }}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="elevation"
                stroke="#2d4a2d"
                strokeWidth={2}
                fill="url(#elevationGradient)"
                isAnimationActive={false}
              />

              {waypoints.map((wp, i) => {
                const x = wp.distance / 1000;
                const y = getElevationAtDistance(x);

                return (
                  <ReferenceDot
                    key={i}
                    x={x}
                    y={y}
                    r={5}
                    fill="#ef4444"
                    stroke="white"
                    strokeWidth={2}
                    label={{
                      value: wp.name,
                      position: "top",
                      fontSize: 10,
                    }}
                  />
                );
              })}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
