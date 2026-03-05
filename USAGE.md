# Bedah Rute - Usage Guide

## Quick Start

### 1. Start the Application

```bash
npm run dev
```

Open your browser to `http://localhost:5173`

### 2. Upload Your First GPX File

**Option A: Use Sample Data**
- Click "Load Sample Route (Mount Bromo Circuit)"
- Instantly see a complete analysis

**Option B: Upload Your Own GPX**
- Drag and drop your .gpx file onto the upload area
- Or click to browse and select
- Wait for parsing (usually < 1 second)

### 3. Explore the Analysis

The application shows six main sections:

1. **Metrics Panel** (Top)
   - Difficulty score and key statistics
   - Distance, elevation gain/loss
   - Highest/lowest points

2. **Interactive Map** (Left)
   - Green marker = Start
   - Red marker = Finish
   - Orange markers = Waypoints
   - Click markers for details
   - Toggle satellite view

3. **Elevation Chart** (Left, below map)
   - Hover to see details
   - Synchronized with map (shows purple marker)

4. **Segment List** (Right)
   - Click segments to highlight on map
   - Color-coded by type
   - Shows distance and gradient

5. **Pace Estimator** (Right, below segments)
   - Adjust slider for each segment
   - See real-time finish time update

6. **Export** (Top right button)
   - Downloads PNG image of entire analysis

## Creating GPX Files with Waypoints

For best results, your GPX file should include waypoints that mark important sections of your route.

### Example GPX Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="YourApp">
  <metadata>
    <name>My Trail Run</name>
  </metadata>
  
  <!-- Waypoints define segment boundaries -->
  <wpt lat="40.7128" lon="-74.0060">
    <ele>100</ele>
    <name>Aid Station 1</name>
  </wpt>
  
  <wpt lat="40.7228" lon="-74.0160">
    <ele>250</ele>
    <name>Summit</name>
  </wpt>
  
  <!-- Track contains the actual route -->
  <trk>
    <name>My Trail Run</name>
    <trkseg>
      <trkpt lat="40.7128" lon="-74.0060">
        <ele>100</ele>
      </trkpt>
      <!-- More track points... -->
    </trkseg>
  </trk>
</gpx>
```

### Tools to Create GPX Files

1. **Strava** - Export activities as GPX
2. **Garmin Connect** - Export routes and activities
3. **AllTrails** - Export trail maps
4. **GPX Editor** - Create custom routes online
5. **Ride with GPS** - Plan and export routes

### Adding Waypoints

If your GPX doesn't have waypoints:
1. Open in GPX editor (like GPX Studio)
2. Add waypoints at key locations:
   - Aid stations
   - Major climbs/descents
   - Technical sections
   - Navigation points
3. Save and upload to Bedah Rute

## Understanding the Difficulty Score

The difficulty score (0-10) helps you quickly assess route difficulty:

| Score | Difficulty | Example |
|-------|-----------|---------|
| 0-2   | Easy      | 10km, <500m gain, gentle gradients |
| 2-4   | Moderate  | 20km, 500-1000m gain, some steep sections |
| 4-6   | Hard      | 30km, 1000-2000m gain, sustained climbs |
| 6-8   | Very Hard | 40km+, 2000-3000m gain, steep climbs |
| 8-10  | Extreme   | 50km+, 3000m+ gain, very steep terrain |

### Factors
- **Distance**: Longer = harder
- **Elevation Gain**: More climbing = harder
- **Max Gradient**: Steeper sections = harder

## Pace Estimation Tips

### Understanding Default Paces

The app automatically suggests paces based on gradient:

- **Flat (0-2%)**: Base pace (e.g., 6:00/km)
- **Gentle Climb (2-5%)**: ~30% slower (7:48/km)
- **Moderate Climb (5-10%)**: ~80% slower (10:48/km)
- **Steep Climb (10-15%)**: ~150% slower (15:00/km)
- **Very Steep (15%+)**: ~250% slower (21:00/km - walking)
- **Descent (-5% to -10%)**: ~15% faster (5:06/km)
- **Steep Descent (<-10%)**: May be slower due to technical terrain

### Adjusting for Your Fitness

**If you're a faster runner:**
- Start with 4:30-5:00/km flat pace
- Adjust climb paces down proportionally

**If you're building endurance:**
- Start with 7:00-8:00/km flat pace
- Be conservative on climbs

**Consider these factors:**
- Trail conditions (rocky, muddy, smooth)
- Weather (heat, cold, wind)
- Time of day (night running is slower)
- Fatigue (late race = slower)
- Altitude (higher = slower)

### Race Strategy Example

For a 25km route with 1200m gain:

1. **Early segments (0-10km)**: Start conservative
   - Flats: 5:30/km
   - Climbs: 8:00/km
   
2. **Middle segments (10-20km)**: Settle into rhythm
   - Flats: 5:45/km
   - Climbs: 8:30/km
   
3. **Final segments (20-25km)**: Push if feeling good
   - Flats: 5:30-6:00/km
   - Climbs: 9:00/km

## Exporting Analysis

### Best Practices

1. **Before Export:**
   - Scroll to top to ensure all sections are visible
   - Let map fully load
   - Close any popups or modals

2. **Export Quality:**
   - Image is 2x resolution for sharp printing
   - Background is off-white (printer friendly)
   - All metrics and charts included

3. **Sharing:**
   - PNG format works everywhere
   - ~2-5MB file size
   - Perfect for social media, email, or printing

## Troubleshooting

### "No track points found in GPX file"
- Check that your GPX has `<trk>` and `<trkpt>` elements
- Ensure elevation data (`<ele>`) is present
- Try exporting from a different source

### "Failed to parse GPX file"
- Verify it's a valid GPX file (not KML, TCX, etc.)
- Check XML is well-formed
- Try opening in a text editor to inspect

### Map not displaying route
- Check your internet connection (map tiles load from CDN)
- Try toggling satellite view
- Refresh the page

### Segments not showing
- Ensure your GPX has waypoints
- If no waypoints, the entire route becomes one segment
- Add waypoints in a GPX editor

### Export image incomplete
- Scroll to top before exporting
- Wait for all components to load
- Try on Chrome/Edge for best compatibility

## Advanced Tips

### Multiple Route Versions

Compare different strategies:
1. Export analysis with conservative pacing
2. Click "Upload New Route"
3. Upload same GPX
4. Adjust paces more aggressively
5. Export and compare estimates

### Training Progression

Track your improvement:
1. Upload a race route
2. Set paces based on training runs
3. After race, compare actual vs estimated
4. Adjust future estimates based on learnings

### Crew Planning

Use segments for crew coordination:
1. Each waypoint = crew access point
2. Segment times = arrival estimates
3. Export and share with crew
4. Add buffer time for safety

## Mobile Usage

The app is mobile-first:
- **Portrait mode**: Single column layout
- **Touch-friendly**: Large tap targets
- **High contrast**: Readable in sunlight
- **Offline after load**: Map tiles cache

### Mobile Tips
- Pinch to zoom on map
- Swipe to scroll segments
- Tap segments to highlight
- Use landscape for map detail

## Data Privacy

- **All processing is client-side**
- **No data sent to servers**
- **No account required**
- **No tracking or analytics**
- **Your GPX files never leave your device**

## Support

For questions or issues:
- Check README.md for technical details
- Inspect GPX file structure
- Try the sample route to verify app works
- Export and re-import from known-good source (Strava, Garmin)

---

**Ready to crush your next trail race!** 🏃‍♂️🏔️
