
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

export interface GISAnalysisMetrics {
  totalBuildings: number
  densityCells: number
  highDensityCells: number
  mediumDensityCells: number
  lowDensityCells: number
  riverBuffer100: number
  riverBuffer250: number
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
  mountainForestCells: 0,
}

export function getGISAnalysisMetrics(): GISAnalysisMetrics {
  return {
    ...currentMetrics,
  }
}

/*
 * -------------------------------------------------------
 * COORDINATE HELPERS
 * -------------------------------------------------------
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

/*
 * -------------------------------------------------------
 * ENTITY PROPERTY HELPER
 * -------------------------------------------------------
 *
 * Supports both:
 * - Cesium Property objects
 * - plain object properties
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
 * -------------------------------------------------------
 * ANALYSIS BOX
 * -------------------------------------------------------
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
 * -------------------------------------------------------
 * BUILDING DENSITY ANALYSIS
 * -------------------------------------------------------
 *
 * 250m × 250m analysis grid.
 *
 * LOW:
 *   1–3 buildings
 *
 * MEDIUM:
 *   4–7 buildings
 *
 * HIGH:
 *   8+ buildings
 * -------------------------------------------------------
 */

function createBuildingDensityAnalysis(
  viewer: Viewer,
) {
  /*
   * Read actual building entities
   * already created in the Cesium viewer.
   */
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
          if (
            !building.position
          ) {
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

          const dx =
            (longitude -
              cellLon) *
            111000 *
            Math.cos(
              (CENTER_LAT *
                Math.PI) /
                180,
            )

          const dy =
            (latitude -
              cellLat) *
            111000

          const distance =
            Math.sqrt(
              dx * dx +
                dy * dy,
            )

          if (
            distance <=
            cellSize / 2
          ) {
            count += 1
          }
        },
      )

      /*
       * Empty cells are not rendered.
       */
      if (count === 0) {
        continue
      }

      densityCells += 1

      let color = Color.YELLOW

      let level = 'LOW'

      if (count >= 8) {
        color = Color.RED

        level = 'HIGH'

        highDensityCells += 1
      } else if (count >= 4) {
        color = Color.ORANGE

        level = 'MEDIUM'

        mediumDensityCells += 1
      } else {
        lowDensityCells += 1
      }

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

  /*
   * Store real analysis metrics.
   */
  currentMetrics = {
    ...currentMetrics,

    totalBuildings:
      buildings.length,

    densityCells,

    highDensityCells,

    mediumDensityCells,

    lowDensityCells,
  }

  /*
   * Notify the React dashboard.
   */
  window.dispatchEvent(
    new CustomEvent(
      'shinobi-earth:gis-analysis-updated',
    ),
  )
}

/*
 * -------------------------------------------------------
 * RIVER BUFFER ANALYSIS
 * -------------------------------------------------------
 *
 * These are visual analysis segments
 * following the current river corridor.
 *
 * 100m buffer:
 *   200m × 200m cells
 *
 * 250m buffer:
 *   500m × 500m cells
 * -------------------------------------------------------
 */

function createRiverBufferAnalysis(
  viewer: Viewer,
) {
  const riverCoordinates: [
    number,
    number,
  ][] = [
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
    ([lon, lat], index) => {
      /*
       * 250m buffer.
       */
      addAnalysisBox(
        viewer,
        `analysis-river-buffer-250-${index}`,
        'River 250m Buffer',
        lon,
        lat,
        500,
        500,
        Color.CYAN,
      )

      /*
       * 100m buffer.
       */
      addAnalysisBox(
        viewer,
        `analysis-river-buffer-100-${index}`,
        'River 100m Buffer',
        lon,
        lat,
        200,
        200,
        Color.BLUE,
      )
    },
  )

  currentMetrics = {
    ...currentMetrics,

    riverBuffer100:
      riverCoordinates.length,

    riverBuffer250:
      riverCoordinates.length,
  }
}

/*
 * -------------------------------------------------------
 * MOUNTAIN / FOREST TRANSITION
 * -------------------------------------------------------
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
 * -------------------------------------------------------
 * KONOHA CORE ANALYSIS
 * -------------------------------------------------------
 */

function createCoreAnalysis(
  viewer: Viewer,
) {
  /*
   * Konoha core.
   */
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

  /*
   * Operational buffer.
   */
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
 * -------------------------------------------------------
 * CREATE ALL GIS ANALYSIS
 * -------------------------------------------------------
 */

export function createGISAnalysisLayer(
  viewer: Viewer,
) {
  /*
   * River analysis.
   */
  createRiverBufferAnalysis(
    viewer,
  )

  /*
   * Mountain / forest transition.
   */
  createMountainForestAnalysis(
    viewer,
  )

  /*
   * Konoha operational zones.
   */
  createCoreAnalysis(viewer)

  /*
   * Buildings are created later by
   * CesiumViewer.
   *
   * Wait until the current initialization
   * stack has completed, then inspect the
   * actual building entities.
   */
  setTimeout(() => {
    createBuildingDensityAnalysis(
      viewer,
    )
  }, 0)

  /*
   * Analysis layer starts hidden.
   */
  setGISAnalysisVisibility(
    viewer,
    false,
  )
}

/*
 * -------------------------------------------------------
 * GLOBAL GIS ANALYSIS VISIBILITY
 * -------------------------------------------------------
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
 * -------------------------------------------------------
 * CATEGORY VISIBILITY
 * -------------------------------------------------------
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
