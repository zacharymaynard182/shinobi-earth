
import {
  Cartesian3,
  Color,
  HeightReference,
  Viewer,
} from 'cesium'

interface TerrainMassOptions {
  id: string
  name: string
  longitude: number
  latitude: number
  radiusX: number
  radiusY: number
  height: number
  color: string
  alpha?: number
}

function createTerrainMass(
  viewer: Viewer,
  options: TerrainMassOptions,
) {
  viewer.entities.add({
    id: options.id,

    name: options.name,

    position: Cartesian3.fromDegrees(
      options.longitude,
      options.latitude,
      options.height / 2,
    ),

    ellipsoid: {
      radii: new Cartesian3(
        options.radiusX,
        options.radiusY,
        options.height,
      ),

      material:
        Color.fromCssColorString(
          options.color,
        ).withAlpha(
          options.alpha ?? 0.95,
        ),

      heightReference:
        HeightReference.RELATIVE_TO_GROUND,
    },

    properties: {
      type: 'terrain',
      terrainId: options.id,
      terrainName: options.name,
    },
  })
}


/*
 * =========================================================
 * KONOHA TERRAIN
 *
 * Konoha center:
 * longitude 140.200
 * latitude  34.700
 *
 * Keep the village open.
 * Mountains stay around the outer perimeter.
 * =========================================================
 */


/*
 * =========================================================
 * NORTHERN GREAT MOUNTAIN
 *
 * Far enough north so Konoha is not trapped.
 * =========================================================
 */

function createNorthernMountain(
  viewer: Viewer,
) {
  createTerrainMass(viewer, {
    id: 'terrain-north-great-mountain',
    name: 'Northern Great Mountain',
    longitude: 140.205,
    latitude: 34.805,
    radiusX: 5200,
    radiusY: 4200,
    height: 3600,
    color: '#596b58',
  })

  createTerrainMass(viewer, {
    id: 'terrain-north-peak',
    name: 'Northern Mountain Peak',
    longitude: 140.205,
    latitude: 34.820,
    radiusX: 2500,
    radiusY: 2200,
    height: 4700,
    color: '#647460',
  })

  /*
   * Smaller side peaks
   */

  createTerrainMass(viewer, {
    id: 'terrain-north-west-peak',
    name: 'Northwest Peak',
    longitude: 140.175,
    latitude: 34.810,
    radiusX: 2600,
    radiusY: 2300,
    height: 3000,
    color: '#566853',
  })

  createTerrainMass(viewer, {
    id: 'terrain-north-east-peak',
    name: 'Northeast Peak',
    longitude: 140.235,
    latitude: 34.812,
    radiusX: 2600,
    radiusY: 2300,
    height: 3100,
    color: '#566853',
  })
}


/*
 * =========================================================
 * WESTERN MOUNTAIN
 *
 * Positioned outside the residential area.
 * =========================================================
 */

function createWesternMountain(
  viewer: Viewer,
) {
  createTerrainMass(viewer, {
    id: 'terrain-west-mountain',
    name: 'Western Mountain',
    longitude: 140.125,
    latitude: 34.755,
    radiusX: 4200,
    radiusY: 6000,
    height: 3000,
    color: '#566952',
  })

  createTerrainMass(viewer, {
    id: 'terrain-west-peak',
    name: 'Western Peak',
    longitude: 140.105,
    latitude: 34.775,
    radiusX: 2200,
    radiusY: 2800,
    height: 3800,
    color: '#4f624d',
  })
}


/*
 * =========================================================
 * EASTERN MOUNTAIN
 * =========================================================
 */

function createEasternMountain(
  viewer: Viewer,
) {
  createTerrainMass(viewer, {
    id: 'terrain-east-mountain',
    name: 'Eastern Mountain',
    longitude: 140.275,
    latitude: 34.755,
    radiusX: 4200,
    radiusY: 6000,
    height: 3100,
    color: '#566952',
  })

  createTerrainMass(viewer, {
    id: 'terrain-east-peak',
    name: 'Eastern Peak',
    longitude: 140.300,
    latitude: 34.780,
    radiusX: 2200,
    radiusY: 2800,
    height: 3900,
    color: '#4f624d',
  })
}


/*
 * =========================================================
 * NORTH FOOTHILLS
 *
 * Small transition hills.
 * These stop before Konoha.
 * =========================================================
 */

function createNorthernFoothills(
  viewer: Viewer,
) {
  const foothills = [
    [140.165, 34.775],
    [140.185, 34.770],
    [140.205, 34.765],
    [140.225, 34.770],
    [140.245, 34.775],
  ] as [number, number][]

  foothills.forEach(
    ([longitude, latitude], index) => {
      createTerrainMass(viewer, {
        id: `terrain-north-foothill-${index}`,
        name: `Northern Foothill ${index + 1}`,
        longitude,
        latitude,
        radiusX: 2300,
        radiusY: 1700,
        height: 650 + (index % 2) * 100,
        color: '#6b795e',
        alpha: 0.82,
      })
    },
  )
}


/*
 * =========================================================
 * WESTERN LOW HILLS
 *
 * Keep these small.
 * =========================================================
 */

function createWesternHills(
  viewer: Viewer,
) {
  const hills = [
    [140.155, 34.720],
    [140.155, 34.690],
  ] as [number, number][]

  hills.forEach(
    ([longitude, latitude], index) => {
      createTerrainMass(viewer, {
        id: `terrain-west-low-hill-${index}`,
        name: `Western Low Hill ${index + 1}`,
        longitude,
        latitude,
        radiusX: 1900,
        radiusY: 2400,
        height: 450 + index * 100,
        color: '#718164',
        alpha: 0.68,
      })
    },
  )
}


/*
 * =========================================================
 * EASTERN LOW HILLS
 * =========================================================
 */

function createEasternHills(
  viewer: Viewer,
) {
  const hills = [
    [140.250, 34.720],
    [140.250, 34.690],
  ] as [number, number][]

  hills.forEach(
    ([longitude, latitude], index) => {
      createTerrainMass(viewer, {
        id: `terrain-east-low-hill-${index}`,
        name: `Eastern Low Hill ${index + 1}`,
        longitude,
        latitude,
        radiusX: 1900,
        radiusY: 2400,
        height: 450 + index * 100,
        color: '#718164',
        alpha: 0.68,
      })
    },
  )
}


/*
 * =========================================================
 * SOUTHERN HILLS
 *
 * Very low and far from the village center.
 * =========================================================
 */

function createSouthernHills(
  viewer: Viewer,
) {
  createTerrainMass(viewer, {
    id: 'terrain-southwest-hill',
    name: 'Southwestern Hill',
    longitude: 140.145,
    latitude: 34.650,
    radiusX: 3000,
    radiusY: 2300,
    height: 650,
    color: '#68785e',
    alpha: 0.72,
  })

  createTerrainMass(viewer, {
    id: 'terrain-south-hill',
    name: 'Southern Hill',
    longitude: 140.205,
    latitude: 34.635,
    radiusX: 3500,
    radiusY: 2200,
    height: 700,
    color: '#68785e',
    alpha: 0.72,
  })

  createTerrainMass(viewer, {
    id: 'terrain-southeast-hill',
    name: 'Southeastern Hill',
    longitude: 140.265,
    latitude: 34.650,
    radiusX: 3000,
    radiusY: 2300,
    height: 650,
    color: '#68785e',
    alpha: 0.72,
  })
}


/*
 * =========================================================
 * KONOHA OPEN VALLEY
 *
 * IMPORTANT:
 *
 * This is deliberately smaller and lower.
 * It should not cover the village.
 * =========================================================
 */

function createKonohaValley(
  viewer: Viewer,
) {
  createTerrainMass(viewer, {
    id: 'terrain-konoha-valley',
    name: 'Konoha Open Valley',
    longitude: 140.200,
    latitude: 34.700,
    radiusX: 6500,
    radiusY: 4800,
    height: 80,
    color: '#718566',
    alpha: 0.45,
  })
}


/*
 * =========================================================
 * RIVER CORRIDOR
 *
 * Very low terrain beside the river.
 * =========================================================
 */

function createRiverCorridor(
  viewer: Viewer,
) {
  const points = [
    [140.205, 34.755],
    [140.206, 34.735],
    [140.205, 34.715],
    [140.210, 34.695],
    [140.220, 34.675],
    [140.235, 34.655],
  ] as [number, number][]

  points.forEach(
    ([longitude, latitude], index) => {
      createTerrainMass(viewer, {
        id: `terrain-river-corridor-${index}`,
        name: `River Valley ${index + 1}`,
        longitude,
        latitude,
        radiusX: 1700,
        radiusY: 2400,
        height: 60,
        color: '#788c6b',
        alpha: 0.38,
      })
    },
  )
}


/*
 * =========================================================
 * SMALL ROCKY OUTCROPS
 *
 * These add visual detail without enclosing Konoha.
 * =========================================================
 */

function createRockyOutcrops(
  viewer: Viewer,
) {
  const rocks = [
    [140.145, 34.785],
    [140.160, 34.805],
    [140.250, 34.805],
    [140.285, 34.730],
  ] as [number, number][]

  rocks.forEach(
    ([longitude, latitude], index) => {
      createTerrainMass(viewer, {
        id: `terrain-rock-outcrop-${index}`,
        name: `Rock Outcrop ${index + 1}`,
        longitude,
        latitude,
        radiusX: 1300,
        radiusY: 1100,
        height: 500,
        color: '#626d59',
        alpha: 0.78,
      })
    },
  )
}


/*
 * =========================================================
 * PUBLIC FUNCTION
 * =========================================================
 */

export function createTerrain(
  viewer: Viewer,
) {
  /*
   * Outer mountains
   */
  createNorthernMountain(viewer)

  createWesternMountain(viewer)

  createEasternMountain(viewer)

  /*
   * Transition terrain
   */
  createNorthernFoothills(viewer)

  createWesternHills(viewer)

  createEasternHills(viewer)

  /*
   * Southern terrain
   */
  createSouthernHills(viewer)

  /*
   * Open Konoha valley
   */
  createKonohaValley(viewer)

  /*
   * River valley
   */
  createRiverCorridor(viewer)

  /*
   * Detail
   */
  createRockyOutcrops(viewer)
}

