# Bedah Rute

**A professional trail running GPX route analysis tool for race strategy planning.**

![Trail Running](https://images.unsplash.com/photo-1665555082187-95133d7f6e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200)

## Overview

Bedah Rute is a mobile-first, high-performance web application that allows trail runners to upload GPX files and analyze their routes in detail. Plan your pacing, effort distribution, and race strategy with comprehensive elevation profiles, segment analysis, and finish time estimation.

## Features

### ✅ GPX Upload
- **Drag & drop** or click to upload GPX files
- Real-time parsing and validation
- Support for track points and waypoints
- Sample route included for testing

### 📊 Route Analysis
- **Interactive Map Visualization**
  - Route polyline display
  - Start, finish, and waypoint markers
  - Satellite/terrain view toggle
  - Zoom and pan controls
  
- **Elevation Profile Chart**
  - Interactive elevation visualization
  - Hover to see details on map
  - Distance and elevation metrics

- **Key Metrics**
  - Total distance
  - Elevation gain/loss
  - Highest/lowest points
  - Maximum gradient
  - Difficulty score (0-10)

### 🎯 Segment Analysis
- Automatic segmentation based on **waypoints** in GPX file
- Each segment shows:
  - Distance and elevation change
  - Average gradient
  - Segment type (flat, climb, descent, steep climb, steep descent)
  - Visual indicators and color coding

### ⏱️ Finish Time Estimator
- **Per-segment pace adjustment** with sliders
- Automatic pace calculation based on gradient
- Real-time finish time estimation
- Individual segment time breakdown

### 📸 Export Functionality
- Export entire analysis as high-quality PNG image
- Perfect for sharing race strategies
- Includes all metrics, charts, and segments

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS v4** for styling
- **shadcn/ui** component library
- **Leaflet** for interactive maps
- **Recharts** for elevation visualization
- **Motion** (Framer Motion) for animations
- **@tmcw/togeojson** for GPX parsing
- **html-to-image** for export functionality

## Design Philosophy

### Outdoor/Trail Running Theme
- **Colors**: Dark forest green, earth brown, off-white, accent orange
- **High contrast** for sunlight readability
- **Mobile-first** responsive design
- **Large touch-friendly** controls
- **Rounded cards** with soft shadows

## Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`

### Using the App

1. **Upload a GPX File**
   - Drag and drop your GPX file onto the upload area
   - Or click to browse and select a file
   - Try the "Load Sample Route" button to see a demo

2. **View Metrics**
   - See overall route statistics at the top
   - Difficulty score helps gauge route complexity

3. **Explore the Map**
   - Pan and zoom to explore your route
   - Toggle satellite view for terrain details
   - Click markers for detailed information

4. **Analyze Segments**
   - Segments are automatically created based on waypoints
   - Click on any segment to highlight it on the map
   - See detailed gradient and elevation data

5. **Estimate Finish Time**
   - Adjust pace for each segment using sliders
   - Based on gradient, default paces are suggested
   - See real-time total finish time estimation

6. **Export Your Analysis**
   - Click "Export Analysis as Image"
   - Download high-quality PNG for sharing

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── UploadCard.tsx         # GPX file upload UI
│   │   ├── MetricsPanel.tsx       # Key metrics display
│   │   ├── MapView.tsx            # Interactive Leaflet map
│   │   ├── ElevationChart.tsx     # Elevation profile chart
│   │   ├── SegmentList.tsx        # Segment analysis list
│   │   ├── PaceEstimator.tsx      # Pace adjustment and estimation
│   │   └── ui/                    # shadcn/ui components
│   ├── utils/
│   │   ├── gpxParser.ts           # GPX file parsing logic
│   │   ├── segmentAnalyzer.ts     # Route segmentation and metrics
│   │   ├── paceCalculator.ts      # Pace estimation algorithms
│   │   ├── exportImage.ts         # Image export functionality
│   │   └── mockGPX.ts             # Sample GPX file generator
│   └── App.tsx                    # Main application component
└── styles/
    ├── theme.css                  # Trail running theme colors
    └── tailwind.css               # Tailwind configuration
```

## Key Features Explained

### Segment Analysis by Waypoints
Unlike gradient-based segmentation, Bedah Rute uses **waypoints** from your GPX file to create meaningful segments. This allows you to:
- Define your own segment boundaries
- Match segments to race aid stations
- Plan strategy based on known landmarks
- Better reflect real race conditions

### Intelligent Pace Calculation
The pace calculator adjusts estimates based on:
- **Gradient**: Steeper sections = slower pace
- **Elevation change**: Accounts for climbs and descents
- **User adjustment**: Manual override with sliders
- **Distance**: Accurate time per segment

Formula considers:
- Flat: 0% adjustment
- Gentle climb (2-5%): +30% slower
- Moderate climb (5-10%): +80% slower
- Steep climb (10-15%): +150% slower
- Very steep (15%+): +250% slower (walking)
- Descents: 10-15% faster (technical sections may be slower)

### Difficulty Score
The 0-10 difficulty score combines:
- **Distance** (max 3 points for 50km+)
- **Elevation gain** (max 4 points for 3000m+)
- **Steepness** (max 3 points for 30%+ gradients)

Helps you quickly assess route difficulty and plan accordingly.

## Sample GPX File

The app includes a sample route: **Mount Bromo Circuit**
- 15km loop with ~350m elevation gain
- Mix of climbs, descents, and flat sections
- 5 waypoints marking key locations
- Perfect for testing all features

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- Large GPX files (1000+ points) are automatically sampled for chart performance
- Map rendering is optimized with Leaflet
- Export quality is set to 2x pixel ratio for sharp images

## Future Enhancements

Potential features for future versions:
- Dark mode toggle
- Multiple route comparison
- Heart rate zone planning
- Nutrition/hydration planning
- Weather overlay
- Route sharing with unique URLs
- Local storage for saved routes
- Gear recommendations based on terrain

## Contributing

This is a demonstration project. Feel free to fork and adapt for your needs!

## License

MIT License - feel free to use this for your trail running adventures!

## Acknowledgments

- Leaflet for excellent mapping library
- @tmcw for the togeojson parser
- shadcn for the beautiful UI components
- Trail running community for inspiration

---

**Happy Trails!** 🏃‍♂️⛰️

*Built with ❤️ for trail runners by trail runners*