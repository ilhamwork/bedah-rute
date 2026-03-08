import { Analytics } from "@vercel/analytics/next";
import { useState, useCallback } from "react";
import { UploadCard } from "./components/UploadCard";
import { MetricsPanel } from "./components/MetricsPanel";
import { MapView } from "./components/MapView";
import { ElevationChart } from "./components/ElevationChart";
import { SegmentList } from "./components/SegmentList";
import { PaceEstimator } from "./components/PaceEstimator";
import { parseGPXFile, GPXData } from "./utils/gpxParser";
import {
  analyzeRouteByWaypoints,
  calculateRouteMetrics,
  Segment,
  RouteMetrics,
} from "./utils/segmentAnalyzer";
import { exportAnalysisAsImage } from "./utils/exportImage";
import { generateMockGPXFile } from "./utils/mockGPX";
import { Button } from "./components/ui/button";
import {
  BarChart3,
  Download,
  FileText,
  Mountain,
  Route,
  Timer,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";

const features = [
  { icon: Route, label: "Route Map", desc: "Interactive topographic map" },
  {
    icon: BarChart3,
    label: "Elevation Profile",
    desc: "Detailed elevation chart",
  },
  { icon: Mountain, label: "Segment Analysis", desc: "Auto-detected segments" },
  { icon: Timer, label: "Time Estimator", desc: "Per-segment pacing" },
];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [gpxData, setGpxData] = useState<GPXData | null>(null);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [metrics, setMetrics] = useState<RouteMetrics | null>(null);
  const [highlightedPointIndex, setHighlightedPointIndex] = useState<
    number | null
  >(null);
  const [activeSegment, setActiveSegment] = useState<Segment | null>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    setIsLoading(true);

    try {
      const data = await parseGPXFile(file);
      setGpxData(data);
      // Calculate metrics
      const routeMetrics = calculateRouteMetrics(
        data.trackPoints,
        data.waypoints,
      );
      setMetrics(routeMetrics);

      // Analyze segments
      const routeSegments = analyzeRouteByWaypoints(
        data.trackPoints,
        data.waypoints,
      );
      setSegments(routeSegments);

      toast.success("GPX file loaded successfully!", {
        description: `${(routeMetrics.totalDistance / 1000).toFixed(2)} km with ${Math.round(routeMetrics.totalElevationGain)}m elevation gain`,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      toast.error("Failed to load GPX file", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSegmentClick = useCallback(
    (segment: Segment) => {
      setActiveSegment(segment);
    },
    [gpxData],
  );

  const handleExport = useCallback(async () => {
    try {
      toast.info("Generating image...", {
        description: "This may take a few seconds",
      });
      await exportAnalysisAsImage("analysis-container");
      toast.success("Analysis exported successfully!");
    } catch (err) {
      toast.error("Failed to export analysis", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }, []);

  const handleLoadSample = useCallback(() => {
    const sampleFile = generateMockGPXFile();
    handleFileUpload(sampleFile);
  }, [handleFileUpload]);

  return (
    <div className="min-h-screen bg-background">
      <Analytics />
      <Toaster position="top-right" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-forest text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sun/20 rounded-lg flex items-center justify-center">
              <Mountain className="w-6 h-6 text-sun" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl">Bedah Rute</h1>
              <p className="text-xs opacity-90 hidden md:block">
                Trail Running GPX Analysis
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-2xl mx-auto space-y-4">
          <UploadCard onFileUpload={handleFileUpload} isLoading={isLoading} />

          {!gpxData && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="inline-flex p-4 rounded-2xl bg-[#1B4332]/5 mb-4"
                >
                  <Mountain className="w-10 h-10 text-[#1B4332]" />
                </motion.div>
                <p className="text-sm text-gray-400 max-w-sm mx-auto">
                  Analyze your trail route. Plan your strategy.
                  <br />
                  Get detailed route map, elevation, and segments.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {features.map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                  >
                    <f.icon className="w-5 h-5 text-[#E8713A] mb-2" />
                    <p className="text-xs font-semibold text-[#1B4332]">
                      {f.label}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {gpxData && (
          <div id="analysis-container" className="space-y-6">
            {/* Metrics Panel */}
            {metrics && <MetricsPanel metrics={metrics} />}

            {/* Desktop: Two column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left column: Map and Elevation Chart */}
              <div className="space-y-6">
                <MapView
                  gpxData={gpxData}
                  highlightedPointIndex={highlightedPointIndex ?? undefined}
                  highlightSegment={activeSegment}
                />
                <ElevationChart
                  trackPoints={gpxData.trackPoints}
                  waypoints={gpxData.waypoints}
                  onHover={setHighlightedPointIndex}
                />
              </div>

              {/* Right column: Segments and Pace Estimator */}
              <div className="space-y-6">
                <SegmentList
                  segments={segments}
                  onSegmentClick={handleSegmentClick}
                  activeSegment={activeSegment}
                />
                {/* {segments.length > 0 && <PaceEstimator segments={segments} />} */}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-5">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-2">Built by trail runner, for trail runners.</p>
          <p className="text-sm">
            &copy; 2026 by{" "}
            <a
              href="https://instagram.com/ilhamontrail"
              className="hover:underline"
            >
              @ilhamontrail
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
