# SHINOBI EARTH

## Shinobi World Digital Twin

A Naruto-inspired **3D WebGIS / Digital Twin** project built with React, TypeScript, CesiumJS, and GIS concepts.

SHINOBI EARTH is designed as a spatial platform where fictional shinobi countries, hidden villages, rivers, buildings, and characters can be explored as interactive 3D GIS objects.

The long-term goal is to evolve the project from a simple Naruto-inspired 3D map into a **professional WebGIS / 3D GIS portfolio project** demonstrating:

* 3D GIS
* CesiumJS
* React + TypeScript
* Spatial data modeling
* Interactive map layers
* Feature selection
* Camera navigation
* Digital Twin concepts
* Future PostGIS integration
* Future 3D models and spatial analytics

---

# 1. Project Status

Current version:

**v0.1.0**

Current development stage:

> **3D Globe + World Layers + Hidden Villages + Character Interaction**

The basic Cesium globe is working and the project currently contains:

* Five fictional shinobi countries
* Hidden villages
* Rivers
* 3D village buildings
* Village gates
* Shinobi characters
* Layer controls
* Character selection
* Character information panel
* Character camera fly-to
* Cesium World Terrain support
* 3D Digital Twin style interface

---

# 2. Current Architecture

```text
SHINOBI EARTH
│
├── React Application
│
├── GIS Data
│   ├── Countries
│   ├── Villages
│   ├── Rivers
│   └── Characters
│
├── Cesium 3D Globe
│   ├── Country polygons
│   ├── River polylines
│   ├── Village entities
│   ├── 3D buildings
│   ├── Village gates
│   └── Character entities
│
└── GIS User Interface
    ├── TopBar
    ├── Sidebar
    ├── LayerPanel
    ├── CharacterPanel
    └── Map UI
```

---

# 3. Technology Stack

## Frontend

* React
* TypeScript
* Vite

## 3D GIS

* CesiumJS
* Cesium World Terrain
* Cesium Entities
* Cesium Camera
* Cesium ScreenSpaceEventHandler

## GIS Concepts

* Geographic coordinates
* Longitude / Latitude
* Spatial entities
* Polygon features
* Polyline features
* Point features
* 3D buildings
* Feature attributes
* Layer visibility
* Feature selection
* Camera navigation

## Future Backend

Planned:

* PostgreSQL
* PostGIS
* Spatial APIs
* GeoJSON
* REST API
* Real-time spatial data

---

# 4. Project Location

Current project root:

```text
D:\Projects\SHINOBI EARTH\SHINOBI EARTH
```

PowerShell:

```powershell
cd "D:\Projects\SHINOBI EARTH\SHINOBI EARTH"
```

---

# 5. Project Structure

```text
SHINOBI EARTH
│
├── .env
├── .gitignore
├── package.json
├── vite.config.ts
├── index.html
│
├── src
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── App.css
│   ├── index.css
│   │
│   ├── styles
│   │   └── global.css
│   │
│   ├── components
│   │   ├── CesiumViewer.tsx
│   │   ├── LayerPanel.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── CharacterPanel.tsx
│   │
│   ├── data
│   │   ├── countries.ts
│   │   ├── rivers.ts
│   │   ├── villages.ts
│   │   └── characters.ts
│   │
│   └── types
│       └── shinobi.ts
│
└── public
    └── cesium
        ├── Workers
        ├── ThirdParty
        ├── Assets
        └── Widgets
```

---

# 6. Cesium Configuration

Cesium static assets are copied manually into:

```text
public/cesium
```

The following directories are required:

```text
public/cesium/Workers
public/cesium/ThirdParty
public/cesium/Assets
public/cesium/Widgets
```

Vite is configured with:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: 5173,
  },

  define: {
    CESIUM_BASE_URL: JSON.stringify('/cesium'),
  },

  build: {
    chunkSizeWarningLimit: 2000,
  },
})
```

---

# 7. Environment Variables

Cesium ion authentication is stored in `.env`.

```env
VITE_CESIUM_ION_TOKEN=REAL_TOKEN
```

The real token must never be committed to Git.

`.gitignore` contains:

```gitignore
.env
.env.local
```

After modifying `.env`, restart the Vite development server.

---

# 8. Running the Project

Install dependencies:

```powershell
npm install
```

Start development server:

```powershell
npm run dev
```

Build the project:

```powershell
npm run build
```

Run lint:

```powershell
npm run lint
```

Preview production build:

```powershell
npm run preview
```

Default development URL:

```text
http://localhost:5173/
```

---

# 9. World Data

## Five Great Nations

The current project contains five stylized fictional regions:

1. Land of Fire
2. Land of Wind
3. Land of Water
4. Land of Earth
5. Land of Lightning

These are **stylized project GIS overlays**.

They should not be presented as authoritative or canonical geographic boundaries from the Naruto franchise.

---

# 10. Hidden Villages

Current villages:

| ID     | Village      | Country           |
| ------ | ------------ | ----------------- |
| konoha | Konohagakure | Land of Fire      |
| suna   | Sunagakure   | Land of Wind      |
| kiri   | Kirigakure   | Land of Water     |
| iwa    | Iwagakure    | Land of Earth     |
| kumo   | Kumogakure   | Land of Lightning |

Each village currently contains:

* ID
* Name
* Country ID
* Country Name
* Description
* Longitude
* Latitude
* Color

---

# 11. Village 3D Digital Twin

Each village currently has a basic 3D representation.

The village contains:

```text
Village
│
├── Central Tower
├── Tower Roof
├── Buildings
├── Village Gate
├── Gate Towers
└── Village Label
```

Buildings are currently created with Cesium primitive Entity geometry such as:

* Box
* Cylinder
* Point
* Label

The current buildings are intentionally simple.

The future plan is to replace these procedural buildings with more detailed:

* GLB
* glTF
* 3D Tiles
* Procedural buildings
* Real Digital Twin structures

---

# 12. Rivers

The project currently contains several stylized rivers.

Current examples:

* Great Shinobi River
* Fire Country River
* Wind Border River
* Lightning River

Rivers are represented using Cesium polylines.

Each river contains:

```text
id
name
description
color
width
coordinates
centerLongitude
centerLatitude
```

---

# 13. Character Layer

The current character layer contains:

* Naruto Uzumaki
* Sasuke Uchiha
* Sakura Haruno
* Kakashi Hatake

Each character is represented as a spatial GIS entity.

Character attributes include:

```text
id
name
villageId
villageName
role
description
longitude
latitude
color
```

---

# 14. Character Visualization

Characters currently use:

```text
Character
│
├── Vertical Pin
├── Point
└── Label
```

The current visualization does not use character images or official 3D character models.

This is intentional.

Future versions may use:

```text
GLB / glTF
3D character models
3D Tiles
Animated models
```

---

# 15. Character Interaction

Characters can be enabled or disabled using:

```text
Characters
```

in the World Layers panel.

When Characters are enabled:

```text
Click Character
      ↓
Identify Cesium Entity
      ↓
Find Character Data
      ↓
Open Character Panel
      ↓
Fly Camera to Character
```

The Character Panel currently displays:

* Character name
* Role
* Village
* Village ID
* Character ID
* Description
* Longitude
* Latitude
* Spatial object status
* Fly-to button

---

# 16. Character Camera

The current character camera is intentionally close to the ground.

Current camera configuration:

```text
Height: 900 meters

Heading: 0°

Pitch: -65°

Roll: 0°
```

This was adjusted because a higher camera altitude caused multiple character locations to visually overlap.

The current behavior is:

```text
Character selected
       ↓
Camera flyTo()
       ↓
900m altitude
       ↓
-65° pitch
       ↓
Character becomes visually separated
```

---

# 17. Layer System

Current layers:

```text
Political Borders
Five Great Nations
Hidden Villages
Rivers
Terrain
Characters
```

Each layer can be switched ON/OFF.

Layer state is controlled centrally by `App.tsx`.

```ts
interface LayerState {
  borders: boolean
  villages: boolean
  rivers: boolean
  countries: boolean
  terrain: boolean
  characters: boolean
}
```

---

# 18. Terrain

Cesium World Terrain is supported.

Terrain is loaded asynchronously with:

```ts
createWorldTerrainAsync()
```

The Terrain layer controls whether World Terrain is active.

The project also keeps the default Cesium terrain provider as a fallback.

---

# 19. Entity Property Handling

Cesium Entity properties required special handling.

A major runtime issue occurred because Cesium `PropertyBag` values are not always returned as plain JavaScript strings.

The project therefore uses a helper:

```text
getEntityProperty()
```

The helper supports:

```text
PropertyBag.getValue()
Property.getValue()
Plain object properties
```

This prevents errors such as:

```text
entity.properties?.get is not a function
```

and:

```text
properties.getProperty is not a function
```

This is important for reliable feature selection.

---

# 20. Current UI

The current interface contains:

## TopBar

Displays:

```text
SHINOBI EARTH
DIGITAL TWIN
WORLD ONLINE
SEARCH
SETTINGS
OBSERVER
GIS SYSTEM
```

## Sidebar

Contains:

```text
WORLD
COUNTRIES
VILLAGES
RIVERS
CHARACTERS
```

## Layer Panel

Controls map visibility.

## Character Panel

Displays selected character information.

## Map UI

Displays:

```text
CURRENT VIEW
SHINOBI WORLD

DIGITAL TWIN
3D GLOBE

MAP DATA READY

DRAG — ROTATE
WHEEL — ZOOM
RIGHT DRAG — TILT
```

---

# 21. Main React Data Flow

The main application state is controlled in:

```text
src/App.tsx
```

The general flow is:

```text
App
│
├── TopBar
│
├── Sidebar
│   └── LayerPanel
│
└── Map Area
    │
    ├── CesiumViewer
    │
    └── CharacterPanel
```

Data flow:

```text
LayerPanel
     ↓
App
     ↓
CesiumViewer
     ↓
Cesium Entities
```

Character selection:

```text
Cesium Entity
     ↓
CesiumViewer
     ↓
Character
     ↓
App State
     ↓
CharacterPanel
```

---

# 22. Current Camera Navigation

Current village behavior:

```text
Click Village
      ↓
Find Village
      ↓
Camera flyTo()
      ↓
Village location
      ↓
Approx. 5 km altitude
```

Current character behavior:

```text
Click Character
      ↓
Character Panel
      ↓
Camera flyTo()
      ↓
900m altitude
      ↓
Character
```

---

# 23. Known Next Improvement

The current village camera behavior needs refinement.

Current problem:

```text
Click Konoha
     ↓
Camera moves to Konoha
     ↓
Camera remains around 5km altitude
     ↓
Buildings may not be clearly visible
```

The desired behavior is:

```text
Country
   ↓
Village
   ↓
Building
   ↓
Character
```

The camera should progressively move closer to the selected spatial object.

Desired navigation:

```text
Konoha selected
      ↓
Village overview
      ↓
Buildings clearly visible
      ↓
Select building
      ↓
Camera moves DOWN
      ↓
Building-level view
```

A building click should **not** return the camera to the previous village overview altitude.

This will be implemented in the next development stage.

---

# 24. Planned GIS Interaction Hierarchy

The long-term interaction model is:

```text
WORLD
  │
  ├── COUNTRY
  │     │
  │     └── VILLAGE
  │           │
  │           ├── BUILDING
  │           │     │
  │           │     └── CHARACTER
  │           │
  │           └── CHARACTERS
  │
  └── RIVERS
```

Camera navigation should follow the same spatial hierarchy:

```text
Global View
    ↓
Country View
    ↓
Village View
    ↓
Building View
    ↓
Character View
```

This is a key part of making SHINOBI EARTH behave like a real 3D GIS application rather than simply a visual map.

---

# 25. Future Development Roadmap

## Phase 1 — 3D Globe Foundation

Completed:

* React
* TypeScript
* Vite
* Cesium
* Cesium static assets
* Cesium ion
* 3D globe
* Basic UI

---

## Phase 2 — World GIS Layers

Completed / in progress:

* Countries
* Villages
* Rivers
* Terrain
* Layer control

---

## Phase 3 — Village Digital Twin

Current:

* Village locations
* Procedural buildings
* Village gates
* Village labels

Next:

* Village information panel
* Building selection
* Building information
* Better camera navigation
* Village → Building relationship

---

## Phase 4 — Character GIS

Current:

* Character spatial entities
* Character layer
* Character labels
* Character pins
* Character selection
* Character information panel
* Character fly-to

Future:

* More characters
* Character relationships
* Character history
* Mission locations
* Movement paths
* Timeline

---

## Phase 5 — 3D Models

Future:

```text
GLB
glTF
3D Tiles
Detailed buildings
Character models
Environment models
```

---

## Phase 6 — PostGIS

Future architecture:

```text
PostgreSQL
     │
   PostGIS
     │
Spatial API
     │
React / TypeScript
     │
CesiumJS
```

Potential spatial datasets:

* Countries
* Villages
* Buildings
* Roads
* Rivers
* Characters
* Missions
* Territories
* Historical events

---

## Phase 7 — Real Digital Twin

Future features:

* Spatial database
* 3D Tiles
* Building attributes
* Spatial queries
* GIS analytics
* Time dimension
* Real-time events
* Search
* Measurement
* Distance analysis
* Visibility analysis
* Terrain analysis
* Network analysis

---

# 26. Professional GIS Goal

SHINOBI EARTH is not intended to remain only a fan project.

The project is being designed to demonstrate professional skills in:

```text
GIS
+
WebGIS
+
3D GIS
+
CesiumJS
+
React
+
TypeScript
+
PostGIS
+
Spatial Data Engineering
+
Digital Twin
```

The Naruto-inspired world provides the visual and creative theme while the underlying architecture demonstrates real GIS development concepts.

---

# 27. Important Development Rule

Do not rebuild the project from scratch.

Continue from the existing project:

```text
D:\Projects\SHINOBI EARTH\SHINOBI EARTH
```

Before changing code:

1. Verify the existing file path.
2. Preserve the current working functionality.
3. Change only the required component.
4. Run the TypeScript build.
5. Run the application.
6. Test the GIS interaction.
7. Only then proceed to the next step.

---

# 28. Current Milestone

### Completed

```text
[x] React + TypeScript project
[x] Vite
[x] CesiumJS
[x] Cesium static assets
[x] Cesium ion
[x] 3D Globe
[x] Five Great Nations
[x] Village data
[x] River data
[x] Country polygons
[x] Village 3D buildings
[x] Village gates
[x] Terrain
[x] Layer controls
[x] Character data
[x] Character layer
[x] Character selection
[x] Character panel
[x] Character fly-to
[x] Character camera refinement
```

### Next

```text
[ ] Village Detail Panel
[ ] Village → Building navigation
[ ] Building selection
[ ] Building Detail Panel
[ ] Lower building-level camera
[ ] Village / Building / Character relationships
```

---

# 29. Development Philosophy

SHINOBI EARTH follows a GIS-first approach.

The visual interface is important, but every major object should eventually behave as a spatial feature with:

```text
Geometry
+
Attributes
+
Relationships
+
Interaction
+
Visualization
+
Spatial Navigation
```

The ultimate goal is:

> **Build a Naruto-inspired world that behaves like a real 3D GIS Digital Twin.**

---

# 30. Resume Point

When development resumes, start here:

```text
STEP 10
Village Detail Interaction
```

First task:

```text
Click Konohagakure
        ↓
Show Village Detail
        ↓
Fly to Village at appropriate overview altitude
        ↓
Buildings clearly visible
        ↓
Click Building
        ↓
Camera moves LOWER
        ↓
Show Building Detail
```

Do not modify the working Character functionality unless required.

---

**SHINOBI EARTH v0.1.0**

**3D WebGIS / Shinobi World Digital Twin**
