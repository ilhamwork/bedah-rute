# Bedah Rute - Visual Guide

## App Interface Overview

### 1. Upload Screen (Initial State)

```
┌─────────────────────────────────────────────────┐
│  🏃 Bedah Rute                                  │
│     Trail Running GPX Analysis                  │
├─────────────────────────────────────────────────┤
│                                                 │
│     ┌───────────────────────────────────┐      │
│     │         Bedah Rute                │      │
│     │  Trail running GPX route          │      │
│     │  analysis for race strategy       │      │
│     │                                   │      │
│     │  ┌─────────────────────────────┐ │      │
│     │  │                             │ │      │
│     │  │      📤 Upload Icon         │ │      │
│     │  │                             │ │      │
│     │  │   Drop your GPX file here   │ │      │
│     │  │   or click to browse         │ │      │
│     │  │                             │ │      │
│     │  └─────────────────────────────┘ │      │
│     │                                   │      │
│     │  Supports standard GPX files      │      │
│     └───────────────────────────────────┘      │
│                                                 │
│     [Load Sample Route (Mount Bromo Circuit)]  │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 2. Analysis View (After Upload)

#### Desktop Layout (2 columns)
```
┌────────────────────────────────────────────────────────────┐
│  🏃 Bedah Rute                          [Export] Button   │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Difficulty Score: 6.5 / 10     🔥                   │ │
│  │  Hard                                                 │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌─────────────┬─────────────┬─────────────┐             │
│  │ 🏔️ 25.4 km  │ ⬆️ +1,234m  │ ⬇️ -987m    │             │
│  ├─────────────┼─────────────┼─────────────┤             │
│  │ ⬆️ 2,650m   │ ⬇️ 2,329m   │ 📐 18.5%    │             │
│  └─────────────┴─────────────┴─────────────┘             │
│                                                            │
│  LEFT COLUMN              │  RIGHT COLUMN                  │
│  ┌──────────────────────┐ │  ┌──────────────────────────┐ │
│  │ 🗺️ Route Map         │ │  │ 📊 Route Segments        │ │
│  │ [Satellite Toggle]   │ │  │                          │ │
│  │                      │ │  │ ▶ Start → First Ridge   │ │
│  │  🟢 Start            │ │  │   3.2 km • +120m        │ │
│  │  ─────────────       │ │  │                          │ │
│  │  🟠 Waypoint 1       │ │  │ ▶ First Ridge → Summit  │ │
│  │  ─────────────       │ │  │   4.5 km • +220m        │ │
│  │  🟠 Waypoint 2       │ │  │                          │ │
│  │  ─────────────       │ │  │ ▶ Summit → Valley       │ │
│  │  🔴 Finish           │ │  │   8.1 km • -180m        │ │
│  └──────────────────────┘ │  └──────────────────────────┘ │
│                           │                               │
│  ┌──────────────────────┐ │  ┌──────────────────────────┐ │
│  │ 📈 Elevation Profile │ │  │ ⏱️ Finish Time Estimate │ │
│  │                      │ │  │                          │ │
│  │      /\  /\          │ │  │  Total: 3h 45m          │ │
│  │     /  \/  \         │ │  │                          │ │
│  │    /        \        │ │  │  Segment 1: [Slider]    │ │
│  │   /          \___    │ │  │  6:00/km • 19m          │ │
│  │  /               \   │ │  │                          │ │
│  │ ─────────────────── │ │  │  Segment 2: [Slider]    │ │
│  │ Distance (km) →     │ │  │  8:30/km • 38m          │ │
│  └──────────────────────┘ │  └──────────────────────────┘ │
│                           │                               │
└───────────────────────────┴───────────────────────────────┘
│                                                            │
│  [Upload New Route]  [Export Analysis as Image]           │
└────────────────────────────────────────────────────────────┘
```

#### Mobile Layout (1 column)
```
┌──────────────────────┐
│  🏃 Bedah Rute   [≡] │
├──────────────────────┤
│                      │
│  Difficulty: 6.5/10  │
│  🔥 Hard             │
│                      │
│  🏔️ 25.4 km          │
│  ⬆️ +1,234m          │
│  ⬇️ -987m            │
│                      │
│  ───────────────────│
│                      │
│  🗺️ Route Map        │
│  [Satellite Toggle]  │
│  [Map View]          │
│                      │
│  📈 Elevation        │
│  [Chart]             │
│                      │
│  📊 Segments         │
│  [List]              │
│                      │
│  ⏱️ Pace Estimator   │
│  [Sliders]           │
│                      │
│  [Export as Image]   │
└──────────────────────┘
```

## Color Scheme

### Primary Colors
- **Forest Green**: #2d4a2d (Primary buttons, map route)
- **Earth Brown**: #6b5442 (Secondary elements, descent segments)
- **Off White**: #faf8f6 (Background)
- **Accent Orange**: #ff6b35 (Highlights, CTAs, climb segments)

### Component Colors
```
┌─────────────────────────────────────┐
│  Steep Climb    │ 🔴 Red/Destructive │
│  Climb          │ 🟠 Orange/Accent   │
│  Flat/Rolling   │ ⚪ Gray/Muted      │
│  Descent        │ 🟢 Green/Primary   │
│  Steep Descent  │ 🟤 Brown/Secondary │
└─────────────────────────────────────┘
```

## Interactive Elements

### Map Markers
- 🟢 **Green** = Start point
- 🔴 **Red** = Finish point
- 🟠 **Orange** = Waypoints
- 🟣 **Purple** = Hover highlight (from chart)

### Segment Cards
```
┌────────────────────────────────┐
│ 🟠  Start → First Ridge    ▶   │
│    KM 0.0 → KM 3.2             │
│                                │
│  Distance: 3.20 km             │
│  Avg Gradient: 3.8%            │
│  Climb: +120m                  │
├────────────────────────────────┤
│ Click to highlight on map      │
└────────────────────────────────┘
```

### Pace Slider
```
┌────────────────────────────────┐
│  Start → First Ridge       19m │
│  3.20 km • 3.8% gradient   6:00/km
│                                │
│  Pace (min/km): 6.0            │
│  ●────────────────────○        │
│  3:00 /km (Fast)  15:00 /km   │
└────────────────────────────────┘
```

## User Flow

```
1. Landing Page
   ↓
2. Upload GPX (drag/drop or click)
   ↓
3. Loading Spinner (parsing)
   ↓
4. Analysis View
   ├─> View Metrics
   ├─> Explore Map
   ├─> Hover Elevation Chart
   ├─> Click Segments
   ├─> Adjust Pace Sliders
   └─> Export as Image
   ↓
5. Download PNG
```

## Responsive Breakpoints

- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1024px (single column, larger cards)
- **Desktop**: > 1024px (two columns, sticky map)

## Animation Timing

- **Upload Card**: Fade in 0.4s
- **Metrics Panel**: Stagger cards 0.05s each
- **Map**: Instant load, smooth zoom
- **Chart**: Fade in 0.4s (delay 0.2s)
- **Segments**: Stagger 0.05s each (delay 0.3s)
- **Pace Estimator**: Fade in 0.4s (delay 0.4s)

## Export Image

The exported PNG includes:
- Full metrics panel
- Map snapshot
- Elevation chart
- All segments
- Pace estimator
- 2x resolution (high DPI)
- ~2-5MB file size

## Accessibility

- ✅ High contrast colors
- ✅ Large touch targets (min 44px)
- ✅ Keyboard navigation
- ✅ Screen reader labels
- ✅ Focus indicators
- ✅ Readable fonts (16px base)

---

**This visual guide helps understand the app layout and user experience!**
