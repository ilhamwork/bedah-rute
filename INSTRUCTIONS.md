# 🏃‍♂️ Bedah Rute - Quick Setup

## Installation

```bash
# Install dependencies
npm install
# or
pnpm install
```

## Running Locally

```bash
# Start development server
npm run dev
# or
pnpm dev
```

Open browser to: **http://localhost:5173**

## First Steps

1. Click **"Load Sample Route"** to see the app in action
2. Or drag and drop your own .gpx file
3. Explore metrics, map, elevation, and segments
4. Adjust pace sliders for finish time estimate
5. Export as image to save/share

## Features Checklist

✅ GPX drag & drop upload  
✅ Interactive Leaflet map (satellite/terrain toggle)  
✅ Elevation profile chart (hover to see on map)  
✅ Route metrics (distance, elevation, difficulty)  
✅ Waypoint-based segment analysis  
✅ Per-segment pace adjustment sliders  
✅ Real-time finish time estimation  
✅ Export analysis as PNG image  
✅ Mobile-responsive design  
✅ Trail running theme (forest green, earth brown, orange)  

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Leaflet maps
- Recharts
- Motion (Framer Motion)
- @tmcw/togeojson (GPX parsing)
- html-to-image (export)

## Project Structure

```
src/app/
├── components/
│   ├── UploadCard.tsx
│   ├── MetricsPanel.tsx
│   ├── MapView.tsx
│   ├── ElevationChart.tsx
│   ├── SegmentList.tsx
│   └── PaceEstimator.tsx
├── utils/
│   ├── gpxParser.ts
│   ├── segmentAnalyzer.ts
│   ├── paceCalculator.ts
│   ├── exportImage.ts
│   └── mockGPX.ts
└── App.tsx
```

## Documentation

- **README.md** - Comprehensive overview
- **USAGE.md** - Detailed usage guide
- **INSTRUCTIONS.md** - This file (quick reference)

## Production Build

```bash
npm run build
# or
pnpm build
```

Output in `dist/` directory.

---

**Happy trail running!** 🏔️
