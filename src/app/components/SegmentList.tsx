import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Waypoints,
} from "lucide-react";
import { motion } from "motion/react";
import { Segment } from "../utils/segmentAnalyzer";

interface SegmentListProps {
  segments: Segment[];
  activeSegment?: Segment | null;
  onSegmentClick?: (segment: Segment) => void;
}

function getSegmentIcon(type: Segment["type"]) {
  switch (type) {
    case "steep-climb":
    case "climb":
      return TrendingUp;
    case "steep-descent":
    case "descent":
      return TrendingDown;
    case "flat":
    default:
      return Minus;
  }
}

function getSegmentColor(type: Segment["type"]) {
  switch (type) {
    case "steep-climb":
      return "#ef4444";
    case "climb":
      return "#f59e0b";
    case "steep-descent":
      return "#8b5e3c";
    case "descent":
      return "#3b82f6";
    case "flat":
    default:
      return "#6b7280";
  }
}

function formatDistance(meters: number) {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(2)} km`;
  }
  return `${Math.round(meters)} m`;
}

function getSegmentTypeLabel(type: Segment["type"]) {
  switch (type) {
    case "steep-climb":
      return "Steep Climb";
    case "climb":
      return "Climb";
    case "steep-descent":
      return "Steep Descent";
    case "descent":
      return "Descent";
    case "flat":
    default:
      return "Flat";
  }
}

export function SegmentList({
  segments,
  activeSegment,
  onSegmentClick,
}: SegmentListProps) {
  return (
    <Card className="shadow-lg overflow-hidden" id="segment-list">
      <div className="p-4 bg-muted/30 border-b">
        <h3 className="flex items-center gap-2">
          <Waypoints className="w-4 h-4" />
          Route Segments
        </h3>
        <p className="text-[11px] text-gray-400 mt-0.5">
          {segments.length} segments • Based on waypoints
        </p>
      </div>

      <div className="px-3 pb-3 space-y-2 max-h-[400px] overflow-y-auto">
        {segments.map((seg, i) => {
          const isActive = activeSegment?.name === seg.name;
          const color = getSegmentColor(seg.type);
          const Icon = getSegmentIcon(seg.type);

          return (
            <motion.div
              key={seg.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => onSegmentClick?.(seg)}
              className={`rounded-xl p-3 cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-[#1B4332] text-white shadow-lg"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="p-1.5 rounded-lg shrink-0"
                  style={{
                    backgroundColor: isActive
                      ? "rgba(255,255,255,0.15)"
                      : `${color}15`,
                    color: isActive ? "white" : color,
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p
                      className={`text-xs font-semibold truncate ${
                        isActive ? "text-white" : "text-[#1B4332]"
                      }`}
                    >
                      {seg.name}
                    </p>

                    <Badge
                      className="shrink-0 text-[10px] px-1.5 py-0 border-0"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(255,255,255,0.2)"
                          : `${color}15`,
                        color: isActive ? "white" : color,
                      }}
                    >
                      {getSegmentTypeLabel(seg.type)}
                    </Badge>
                  </div>

                  <div
                    className={`flex gap-3 text-[11px] ${
                      isActive ? "text-white/60" : "text-gray-400"
                    }`}
                  >
                    <span>{formatDistance(seg.distance)}</span>
                    <span>
                      {seg.endElevation - seg.startElevation >= 0 ? "+" : ""}
                      {Math.round(seg.endElevation - seg.startElevation)}m
                    </span>
                    <span>
                      {seg.avgGradient >= 0 ? "+" : ""}
                      {seg.avgGradient.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? "rotate-90 text-white/40" : "text-gray-300"
                  }`}
                />
              </div>

              {isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px]"
                >
                  <div>
                    <p className="text-white/40">Start Elev</p>
                    <p className="font-medium">
                      {Math.round(seg.startElevation)}m
                    </p>
                  </div>
                  <div>
                    <p className="text-white/40">End Elev</p>
                    <p className="font-medium">
                      {Math.round(seg.endElevation)}m
                    </p>
                  </div>
                  <div>
                    <p className="text-white/40">Gain</p>
                    <p className="font-medium text-green-300">
                      +{Math.round(seg.elevationGain)}m
                    </p>
                  </div>
                  <div>
                    <p className="text-white/40">Loss</p>
                    <p className="font-medium text-red-300">
                      -{Math.round(seg.elevationLoss)}m
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
