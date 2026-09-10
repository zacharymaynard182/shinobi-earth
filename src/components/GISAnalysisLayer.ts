import {
  Cartesian3,
  Cartographic,
  Color,
  HeightReference,
  Viewer,
} from 'cesium'

const CENTER_LON = 140.2
const CENTER_LAT = 34.7

function metersToLon(meters: number, latitude: number) {
  return (
    meters /
    (111000 * Math.cos((latitude * Math.PI) / 180))
  )
}

function metersToLat(meters: number) {
  return meters / 111000
}

function addAnalysisBox(
  viewer: Viewer,
  id: string,
  name: string,
  longitude: number,
  latitude: number,
  width: number,
  depth: number,
  color: Color,
) {
  viewer.entities.add({
    id,
    name,

    position: Cartesian3.fromDegrees(
      longitude,
      latitude,
      5,
    ),

    box: {
      dimensions: new Cartesian3(
        width,
        depth,
        10,
      ),

      material: color.withAlpha(0.18),

      heightReference:
        HeightReference.RELATIVE_TO_GROUND,
    },

    properties: {
      type: 'analysis',
      analysisId: id,
      analysisName: name,
    },
  })
}

/*
 * BUILDING DENSITY ANALYSIS
 *
 * Reads existing building entities from Cesium
 * and creates a density grid around Konoha.
 */
function createBuildingDensityAnalysis(
  viewer: Viewer,
) {
  const buildings = viewer.entities.values.filter(
    (entity) => {
      const type =
        entity.properties?.type?.getValue?.()

      return type === 'building'
    },
  )

  const cellSize = 250
  const gridSize = 7
  const half =
    ((gridSize - 1) * cellSize) / 2

  for (let row = 0; row < gridSize; row += 1) {
    for (
      let column = 0;
      column < gridSize;
      column += 1
    ) {
      const cellCenterLon =
        CENTER_LON +
        metersToLon(
          column * cellSize - half,
          CENTER_LAT,
        )

      const cellCenterLat =
        CENTER_LAT +
        metersToLat(
          row * cellSize - half,
        )

      let count = 0

      buildings.forEach((building) => {
        if (!building.position) {
          return
        }

        const position =
          building.position.getValue?.(
            viewer.clock.currentTime,
          )

        if (!position) {
          return
        }

        const cartographic =
          Cartographic.fromCartesian(position)

        const lon =
          (cartographic.longitude * 180) /
          Math.PI

        const lat =
          (cartographic.latitude * 180) /
          Math.PI

        const dx =
          (lon - cellCenterLon) *
          111000 *
          Math.cos(
            (CENTER_LAT * Math.PI) / 180,
          )

        const dy =
          (lat - cellCenterLat) * 111000

        const distance = Math.sqrt(
          dx * dx + dy * dy,
        )

        if (distance <= cellSize / 2) {
          count += 1
        }
      })

      if (count === 0) {
        continue
      }

      let color = Color.YELLOW

      if (count >= 8) {
        color = Color.RED
      } else if (count >= 4) {
        color = Color.ORANGE
      }

      addAnalysisBox(
        viewer,
        `analysis-density-${row}-${column}`,
        `Building Density: ${count} buildings`,
        cellCenterLon,
        cellCenterLat,
        cellSize,
        cellSize,
        color,
      )
    }
  }
}

/*
 * RIVER BUFFER ANALYSIS
 *
 * Creates 100m and 250m visual buffer zones
 * along the main Konoha river corridor.
 */
function createRiverBufferAnalysis(
  viewer: Viewer,
) {
  const riverCoordinates: [number, number][] = [
    [140.205, 34.790],
    [140.207, 34.775],
    [140.209, 34.755],
    [140.211, 34.735],
    [140.213, 34.715],
    [140.215, 34.695],
    [140.218, 34.675],
    [140.220, 34.650],
  ]

  riverCoordinates.forEach(
    ([longitude, latitude], index) => {
      addAnalysisBox(
        viewer,
        `analysis-river-buffer-250-${index}`,
        'River 250m Buffer',
        longitude,
        latitude,
        500,
        500,
        Color.CYAN,
      )

      addAnalysisBox(
        viewer,
        `analysis-river-buffer-100-${index}`,
        'River 100m Buffer',
        longitude,
        latitude,
        200,
        200,
        Color.BLUE,
      )
    },
  )
}

/*
 * MOUNTAIN / FOREST TRANSITION ANALYSIS
 */
function createMountainForestAnalysis(
  viewer: Viewer,
) {
  const transitionCells = [
    {
      lon: 140.170,
      lat: 34.755,
      size: 500,
    },
    {
      lon: 140.185,
      lat: 34.755,
      size: 500,
    },
    {
      lon: 140.200,
      lat: 34.755,
      size: 500,
    },
    {
      lon: 140.215,
      lat: 34.755,
      size: 500,
    },
    {
      lon: 140.230,
      lat: 34.755,
      size: 500,
    },
  ]

  transitionCells.forEach(
    (cell, index) => {
      addAnalysisBox(
        viewer,
        `analysis-transition-${index}`,
        'Mountain Forest Transition',
        cell.lon,
        cell.lat,
        cell.size,
        cell.size,
        Color.LIME,
      )
    },
  )
}

/*
 * MAIN ANALYSIS LAYER
 */
export function createGISAnalysisLayer(
  viewer: Viewer,
) {
  createBuildingDensityAnalysis(viewer)

  createRiverBufferAnalysis(viewer)

  createMountainForestAnalysis(viewer)

  addAnalysisBox(
    viewer,
    'analysis-konoha-core',
    'Konoha Core Analysis',
    CENTER_LON,
    CENTER_LAT,
    900,
    900,
    Color.YELLOW,
  )

  addAnalysisBox(
    viewer,
    'analysis-operational-buffer',
    'Konoha Operational Buffer',
    CENTER_LON,
    CENTER_LAT,
    1400,
    1200,
    Color.MAGENTA,
  )

  setGISAnalysisVisibility(
    viewer,
    false,
  )
}

/*
 * GLOBAL VISIBILITY
 */
export function setGISAnalysisVisibility(
  viewer: Viewer,
  visible: boolean,
) {
  viewer.entities.values
    .filter((entity) =>
      entity.id.startsWith(
        'analysis-',
      ),
    )
    .forEach((entity) => {
      entity.show = visible
    })
}

/*
 * CATEGORY VISIBILITY
 */
export function setGISAnalysisCategoryVisibility(
  viewer: Viewer,
  category:
    | 'building'
    | 'forest'
    | 'river'
    | 'mountain'
    | 'all',
  visible: boolean,
) {
  viewer.entities.values
    .filter((entity) => {
      if (
        !entity.id.startsWith(
          'analysis-',
        )
      ) {
        return false
      }

      if (category === 'all') {
        return true
      }

      if (category === 'building') {
        return entity.id.includes(
          'density',
        )
      }

      if (category === 'forest') {
        return entity.id.includes(
          'forest',
        )
      }

      if (category === 'river') {
        return entity.id.includes(
          'river-buffer',
        )
      }

      if (category === 'mountain') {
        return entity.id.includes(
          'transition',
        )
      }

      return false
    })
    .forEach((entity) => {
      entity.show = visible
    })
}