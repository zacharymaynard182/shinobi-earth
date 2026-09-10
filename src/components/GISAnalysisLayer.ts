import {
  Cartesian3,
  Cartographic,
  Color,
  HeightReference,
  Viewer,
} from 'cesium'

const CENTER_LON = 140.2
const CENTER_LAT = 34.7

const ANALYSIS_PREFIX = 'analysis-'

const MAIN_RIVER: [number, number][] = [
  [140.205, 34.790],
  [140.207, 34.784],
  [140.209, 34.778],
  [140.211, 34.772],
  [140.212, 34.766],
  [140.213, 34.760],
  [140.212, 34.754],
  [140.211, 34.748],
  [140.209, 34.742],
  [140.208, 34.736],
  [140.207, 34.730],
  [140.206, 34.724],
  [140.205, 34.718],
  [140.205, 34.713],
  [140.206, 34.709],
  [140.207, 34.706],
  [140.210, 34.702],
  [140.212, 34.698],
  [140.214, 34.694],
  [140.216, 34.690],
  [140.219, 34.686],
  [140.222, 34.682],
  [140.225, 34.678],
  [140.228, 34.674],
  [140.231, 34.670],
  [140.234, 34.666],
  [140.238, 34.662],
  [140.242, 34.658],
  [140.246, 34.654],
  [140.250, 34.650],
]

export interface GISAnalysisMetrics {
  totalBuildings: number
  densityCells: number
  highDensityCells: number
  mediumDensityCells: number
  lowDensityCells: number
  riverBuffer100: number
  riverBuffer250: number
  riverOutside250: number
  closestBuildingDistance: number
  mountainForestCells: number
}

let currentMetrics: GISAnalysisMetrics = {
  totalBuildings: 0,
  densityCells: 0,
  highDensityCells: 0,
  mediumDensityCells: 0,
  lowDensityCells: 0,
  riverBuffer100: 0,
  riverBuffer250: 0,
  riverOutside250: 0,
  closestBuildingDistance: 0,
  mountainForestCells: 0,
}

export function getGISAnalysisMetrics(): GISAnalysisMetrics {
  return {
    ...currentMetrics,
  }
}

/*
 * =======================================================
 * COORDINATE HELPERS
 * =======================================================
 */

function metersToLon(
  meters: number,
  latitude: number,
) {
  return (
    meters /
    (111000 *
      Math.cos(
        (latitude * Math.PI) / 180,
      ))
  )
}

function metersToLat(
  meters: number,
) {
  return meters / 111000
}

function lonLatToMeters(
  longitude: number,
  latitude: number,
) {
  return {
    x:
      longitude *
      111000 *
      Math.cos(
        (latitude * Math.PI) / 180,
      ),

    y: latitude * 111000,
  }
}

function distanceMeters(
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number,
) {
  const a = lonLatToMeters(
    lon1,
    lat1,
  )

  const b = lonLatToMeters(
    lon2,
    lat2,
  )

  const dx = a.x - b.x
  const dy = a.y - b.y

  return Math.sqrt(
    dx * dx + dy * dy,
  )
}

/*
 * =======================================================
 * POINT TO SEGMENT DISTANCE
 * =======================================================
 */

function pointToSegmentDistance(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
) {
  const dx = bx - ax
  const dy = by - ay

  if (dx === 0 && dy === 0) {
    return Math.sqrt(
      (px - ax) ** 2 +
        (py - ay) ** 2,
    )
  }

  const t =
    ((px - ax) * dx +
      (py - ay) * dy) /
    (dx * dx + dy * dy)

  const clampedT = Math.max(
    0,
    Math.min(1, t),
  )

  const closestX =
    ax + clampedT * dx

  const closestY =
    ay + clampedT * dy

  return Math.sqrt(
    (px - closestX) ** 2 +
      (py - closestY) ** 2,
  )
}

/*
 * =======================================================
 * BUILDING → RIVER DISTANCE
 * =======================================================
 */

function getDistanceToMainRiver(
  longitude: number,
  latitude: number,
) {
  const point =
    lonLatToMeters(
      longitude,
      latitude,
    )

  let minimumDistance =
    Number.POSITIVE_INFINITY

  for (
    let i = 0;
    i < MAIN_RIVER.length - 1;
    i += 1
  ) {
    const start =
      lonLatToMeters(
        MAIN_RIVER[i][0],
        MAIN_RIVER[i][1],
      )

    const end =
      lonLatToMeters(
        MAIN_RIVER[i + 1][0],
        MAIN_RIVER[i + 1][1],
      )

    const distance =
      pointToSegmentDistance(
        point.x,
        point.y,
        start.x,
        start.y,
        end.x,
        end.y,
      )

    minimumDistance =
      Math.min(
        minimumDistance,
        distance,
      )
  }

  return minimumDistance
}

/*
 * =======================================================
 * ENTITY PROPERTY HELPER
 * =======================================================
 */

function getEntityProperty(
  entity: any,
  name: string,
) {
  const properties =
    entity.properties

  if (!properties) {
    return undefined
  }

  if (
    typeof properties.getValue ===
    'function'
  ) {
    const values =
      properties.getValue()

    if (
      values &&
      typeof values === 'object'
    ) {
      return values[name]
    }
  }

  if (
    typeof properties.getProperty ===
    'function'
  ) {
    const property =
      properties.getProperty(name)

    if (
      property &&
      typeof property.getValue ===
        'function'
    ) {
      return property.getValue()
    }

    return property
  }

  return properties[name]
}

/*
 * =======================================================
 * ANALYSIS BOX
 * =======================================================
 */

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

    position:
      Cartesian3.fromDegrees(
        longitude,
        latitude,
        5,
      ),

    box: {
      dimensions:
        new Cartesian3(
          width,
          depth,
          10,
        ),

      material:
        color.withAlpha(0.22),

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
 * =======================================================
 * BUILDING DENSITY
 * =======================================================
 */

function createBuildingDensityAnalysis(
  viewer: Viewer,
) {
  const buildings =
    viewer.entities.values.filter(
      (entity) =>
        getEntityProperty(
          entity,
          'type',
        ) === 'building',
    )

  const cellSize = 250
  const gridSize = 7

  const half =
    ((gridSize - 1) *
      cellSize) /
    2

  let densityCells = 0
  let highDensityCells = 0
  let mediumDensityCells = 0
  let lowDensityCells = 0

  for (
    let row = 0;
    row < gridSize;
    row += 1
  ) {
    for (
      let column = 0;
      column < gridSize;
      column += 1
    ) {
      const cellLon =
        CENTER_LON +
        metersToLon(
          column * cellSize -
            half,
          CENTER_LAT,
        )

      const cellLat =
        CENTER_LAT +
        metersToLat(
          row * cellSize -
            half,
        )

      let count = 0

      buildings.forEach(
        (building) => {
          if (!building.position) {
            return
          }

          const position =
            building.position.getValue(
              viewer.clock
                .currentTime,
            )

          if (!position) {
            return
          }

          const cartographic =
            Cartographic.fromCartesian(
              position,
            )

          const longitude =
            (cartographic.longitude *
              180) /
            Math.PI

          const latitude =
            (cartographic.latitude *
              180) /
            Math.PI

          const distance =
            distanceMeters(
              longitude,
              latitude,
              cellLon,
              cellLat,
            )

          if (
            distance <=
            cellSize / 2
          ) {
            count += 1
          }
        },
      )

      if (count === 0) {
        continue
      }

      densityCells += 1

      let color = Color.YELLOW

      if (count >= 8) {
        color = Color.RED
        highDensityCells += 1
      } else if (count >= 4) {
        color = Color.ORANGE
        mediumDensityCells += 1
      } else {
        lowDensityCells += 1
      }

      const level =
        count >= 8
          ? 'HIGH'
          : count >= 4
            ? 'MEDIUM'
            : 'LOW'

      addAnalysisBox(
        viewer,
        `analysis-building-density-${row}-${column}`,
        `Building Density — ${level} — ${count} buildings`,
        cellLon,
        cellLat,
        cellSize,
        cellSize,
        color,
      )
    }
  }

  currentMetrics = {
    ...currentMetrics,

    totalBuildings:
      buildings.length,

    densityCells,

    highDensityCells,

    mediumDensityCells,

    lowDensityCells,
  }
}

/*
 * =======================================================
 * RIVER PROXIMITY ANALYSIS
 *
 * Actual building → river centerline distance.
 *
 * 0–100m:
 *   HIGH PROXIMITY
 *
 * 100–250m:
 *   MEDIUM PROXIMITY
 *
 * >250m:
 *   OUTSIDE BUFFER
 * =======================================================
 */

function createRiverProximityAnalysis(
  viewer: Viewer,
) {
  const buildings =
    viewer.entities.values.filter(
      (entity) =>
        getEntityProperty(
          entity,
          'type',
        ) === 'building',
    )

  let within100 = 0
  let within250 = 0
  let outside250 = 0

  let closestDistance =
    Number.POSITIVE_INFINITY

  buildings.forEach(
    (building) => {
      if (!building.position) {
        return
      }

      const position =
        building.position.getValue(
          viewer.clock.currentTime,
        )

      if (!position) {
        return
      }

      const cartographic =
        Cartographic.fromCartesian(
          position,
        )

      const longitude =
        (cartographic.longitude *
          180) /
        Math.PI

      const latitude =
        (cartographic.latitude *
          180) /
        Math.PI

      const distance =
        getDistanceToMainRiver(
          longitude,
          latitude,
        )

      closestDistance =
        Math.min(
          closestDistance,
          distance,
        )

      if (distance <= 100) {
        within100 += 1
      } else if (distance <= 250) {
        within250 += 1
      } else {
        outside250 += 1
      }
    },
  )

  currentMetrics = {
    ...currentMetrics,

    riverBuffer100:
      within100,

    riverBuffer250:
      within250,

    riverOutside250:
      outside250,

    closestBuildingDistance:
      Number.isFinite(
        closestDistance,
      )
        ? Math.round(
            closestDistance,
          )
        : 0,
  }

  /*
   * Visual river corridor.
   */

  MAIN_RIVER.forEach(
    ([longitude, latitude], index) => {
      addAnalysisBox(
        viewer,
        `analysis-river-buffer-250-${index}`,
        'River 250m Analysis Zone',
        longitude,
        latitude,
        500,
        500,
        Color.CYAN,
      )

      addAnalysisBox(
        viewer,
        `analysis-river-buffer-100-${index}`,
        'River 100m Analysis Zone',
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
 * =======================================================
 * MOUNTAIN / FOREST TRANSITION
 * =======================================================
 */

function createMountainForestAnalysis(
  viewer: Viewer,
) {
  const cells = [
    [140.170, 34.755],
    [140.185, 34.755],
    [140.200, 34.755],
    [140.215, 34.755],
    [140.230, 34.755],
  ] as const

  cells.forEach(
    ([lon, lat], index) => {
      addAnalysisBox(
        viewer,
        `analysis-mountain-forest-${index}`,
        'Mountain / Forest Transition',
        lon,
        lat,
        500,
        500,
        Color.LIME,
      )
    },
  )

  currentMetrics = {
    ...currentMetrics,

    mountainForestCells:
      cells.length,
  }
}

/*
 * =======================================================
 * KONOHA CORE
 * =======================================================
 */

function createCoreAnalysis(
  viewer: Viewer,
) {
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
}

/*
 * =======================================================
 * CREATE ALL ANALYSIS
 * =======================================================
 */

export function createGISAnalysisLayer(
  viewer: Viewer,
) {
  createRiverProximityAnalysis(
    viewer,
  )

  createMountainForestAnalysis(
    viewer,
  )

  createCoreAnalysis(viewer)

  /*
   * Buildings are created after
   * GIS layer initialization.
   */
  setTimeout(() => {
    createBuildingDensityAnalysis(
      viewer,
    )

    createRiverProximityAnalysis(
      viewer,
    )

    window.dispatchEvent(
      new CustomEvent(
        'shinobi-earth:gis-analysis-updated',
      ),
    )
  }, 0)

  setGISAnalysisVisibility(
    viewer,
    false,
  )
}

/*
 * =======================================================
 * VISIBILITY
 * =======================================================
 */

export function setGISAnalysisVisibility(
  viewer: Viewer,
  visible: boolean,
) {
  viewer.entities.values
    .filter((entity) =>
      entity.id.startsWith(
        ANALYSIS_PREFIX,
      ),
    )
    .forEach((entity) => {
      entity.show = visible
    })
}

/*
 * =======================================================
 * CATEGORY VISIBILITY
 * =======================================================
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
          ANALYSIS_PREFIX,
        )
      ) {
        return false
      }

      if (category === 'all') {
        return true
      }

      if (
        category === 'building'
      ) {
        return entity.id.includes(
          'building-density',
        )
      }

      if (category === 'forest') {
        return entity.id.includes(
          'mountain-forest',
        )
      }

      if (category === 'river') {
        return entity.id.includes(
          'river-buffer',
        )
      }

      if (
        category === 'mountain'
      ) {
        return entity.id.includes(
          'mountain-forest',
        )
      }

      return false
    })
    .forEach((entity) => {
      entity.show = visible
    })
}