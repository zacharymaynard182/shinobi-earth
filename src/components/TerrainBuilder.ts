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

      material: Color.fromCssColorString(
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

/* =========================================================
 * NORTHERN GREAT MOUNTAIN
 * ========================================================= */

function createNorthernGreatMountain(viewer: Viewer) {
  createTerrainMass(viewer, {
    id: 'terrain-north-great-mountain',
    name: 'Northern Great Mountain',
    longitude: 140.205,
    latitude: 34.815,
    radiusX: 4800,
    radiusY: 3000,
    height: 3500,
    color: '#536451',
  })

  createTerrainMass(viewer, {
    id: 'terrain-north-main-peak',
    name: 'Northern Main Peak',
    longitude: 140.205,
    latitude: 34.835,
    radiusX: 1900,
    radiusY: 1500,
    height: 4700,
    color: '#4a5d4a',
  })

  createTerrainMass(viewer, {
    id: 'terrain-north-west-peak',
    name: 'Northern West Peak',
    longitude: 140.175,
    latitude: 34.820,
    radiusX: 2100,
    radiusY: 1500,
    height: 3300,
    color: '#536550',
  })

  createTerrainMass(viewer, {
    id: 'terrain-north-east-peak',
    name: 'Northern East Peak',
    longitude: 140.235,
    latitude: 34.820,
    radiusX: 2100,
    radiusY: 1500,
    height: 3400,
    color: '#536550',
  })
}

/* =========================================================
 * NORTHERN MAIN RIDGE
 * Long overlapping masses create a mountain chain.
 * ========================================================= */

function createNorthernMainRidge(viewer: Viewer) {
  const ridge = [
    [140.155, 34.790, 2500, 1450, 2600],
    [140.175, 34.795, 2800, 1500, 2900],
    [140.195, 34.800, 3000, 1550, 3200],
    [140.215, 34.800, 3000, 1550, 3300],
    [140.235, 34.795, 2800, 1500, 3000],
    [140.255, 34.790, 2500, 1450, 2700],
  ] as [number, number, number, number, number][]

  ridge.forEach(
    ([longitude, latitude, radiusX, radiusY, height], index) => {
      createTerrainMass(viewer, {
        id: `terrain-north-ridge-${index}`,
        name: `Northern Main Ridge ${index + 1}`,
        longitude,
        latitude,
        radiusX,
        radiusY,
        height,
        color: index % 2 === 0
          ? '#596b55'
          : '#4f624e',
        alpha: 0.92,
      })
    },
  )
}

/* =========================================================
 * NORTHERN SIDE RIDGES
 * ========================================================= */

function createNorthernSideRidges(viewer: Viewer) {
  const westRidge = [
    [140.130, 34.785],
    [140.145, 34.775],
    [140.160, 34.765],
  ] as [number, number][]

  westRidge.forEach(
    ([longitude, latitude], index) => {
      createTerrainMass(viewer, {
        id: `terrain-north-west-ridge-${index}`,
        name: `Northern West Side Ridge ${index + 1}`,
        longitude,
        latitude,
        radiusX: 1900,
        radiusY: 1200,
        height: 1900 + index * 250,
        color: '#61715a',
        alpha: 0.86,
      })
    },
  )

  const eastRidge = [
    [140.280, 34.785],
    [140.265, 34.775],
    [140.250, 34.765],
  ] as [number, number][]

  eastRidge.forEach(
    ([longitude, latitude], index) => {
      createTerrainMass(viewer, {
        id: `terrain-north-east-ridge-${index}`,
        name: `Northern East Side Ridge ${index + 1}`,
        longitude,
        latitude,
        radiusX: 1900,
        radiusY: 1200,
        height: 1950 + index * 250,
        color: '#61715a',
        alpha: 0.86,
      })
    },
  )
}

/* =========================================================
 * WESTERN MOUNTAIN
 * ========================================================= */

function createWesternMountain(viewer: Viewer) {
  createTerrainMass(viewer, {
    id: 'terrain-west-mountain',
    name: 'Western Mountain',
    longitude: 140.120,
    latitude: 34.755,
    radiusX: 3000,
    radiusY: 4700,
    height: 2900,
    color: '#50634e',
  })

  createTerrainMass(viewer, {
    id: 'terrain-west-main-peak',
    name: 'Western Main Peak',
    longitude: 140.090,
    latitude: 34.780,
    radiusX: 1900,
    radiusY: 2300,
    height: 3900,
    color: '#465946',
  })
}

/* =========================================================
 * WESTERN RIDGES
 * ========================================================= */

function createWesternRidges(viewer: Viewer) {
  const ridges = [
    [140.135, 34.785, 2200, 1200, 2200],
    [140.125, 34.765, 2300, 1250, 2050],
    [140.115, 34.745, 2200, 1200, 1850],
    [140.110, 34.725, 2000, 1150, 1500],
  ] as [number, number, number, number, number][]

  ridges.forEach(
    ([longitude, latitude, radiusX, radiusY, height], index) => {
      createTerrainMass(viewer, {
        id: `terrain-west-ridge-${index}`,
        name: `Western Ridge ${index + 1}`,
        longitude,
        latitude,
        radiusX,
        radiusY,
        height,
        color: '#607159',
        alpha: 0.84,
      })
    },
  )
}

/* =========================================================
 * EASTERN MOUNTAIN
 * ========================================================= */

function createEasternMountain(viewer: Viewer) {
  createTerrainMass(viewer, {
    id: 'terrain-east-mountain',
    name: 'Eastern Mountain',
    longitude: 140.280,
    latitude: 34.755,
    radiusX: 3000,
    radiusY: 4700,
    height: 3000,
    color: '#50634e',
  })

  createTerrainMass(viewer, {
    id: 'terrain-east-main-peak',
    name: 'Eastern Main Peak',
    longitude: 140.310,
    latitude: 34.780,
    radiusX: 1900,
    radiusY: 2300,
    height: 4000,
    color: '#465946',
  })
}

/* =========================================================
 * EASTERN RIDGES
 * ========================================================= */

function createEasternRidges(viewer: Viewer) {
  const ridges = [
    [140.265, 34.785, 2200, 1200, 2200],
    [140.275, 34.765, 2300, 1250, 2050],
    [140.285, 34.745, 2200, 1200, 1850],
    [140.290, 34.725, 2000, 1150, 1500],
  ] as [number, number, number, number, number][]

  ridges.forEach(
    ([longitude, latitude, radiusX, radiusY, height], index) => {
      createTerrainMass(viewer, {
        id: `terrain-east-ridge-${index}`,
        name: `Eastern Ridge ${index + 1}`,
        longitude,
        latitude,
        radiusX,
        radiusY,
        height,
        color: '#607159',
        alpha: 0.84,
      })
    },
  )
}

/* =========================================================
 * NORTHERN FOOTHILLS
 * ========================================================= */

function createNorthernFoothills(viewer: Viewer) {
  const foothills = [
    [140.155, 34.755, 1200, 850, 850],
    [140.175, 34.750, 1400, 900, 900],
    [140.195, 34.750, 1500, 950, 1000],
    [140.215, 34.750, 1500, 950, 1000],
    [140.235, 34.750, 1400, 900, 900],
    [140.255, 34.755, 1200, 850, 850],
  ] as [number, number, number, number, number][]

  foothills.forEach(
    ([longitude, latitude, radiusX, radiusY, height], index) => {
      createTerrainMass(viewer, {
        id: `terrain-north-foothill-${index}`,
        name: `Northern Foothill ${index + 1}`,
        longitude,
        latitude,
        radiusX,
        radiusY,
        height,
        color: '#718162',
        alpha: 0.78,
      })
    },
  )
}

/* =========================================================
 * WESTERN FOOTHILLS
 * ========================================================= */

function createWesternFoothills(viewer: Viewer) {
  const foothills = [
    [140.150, 34.735],
    [140.150, 34.715],
    [140.150, 34.695],
    [140.155, 34.675],
  ] as [number, number][]

  foothills.forEach(
    ([longitude, latitude], index) => {
      createTerrainMass(viewer, {
        id: `terrain-west-foothill-${index}`,
        name: `Western Foothill ${index + 1}`,
        longitude,
        latitude,
        radiusX: 1300,
        radiusY: 1500,
        height: 550 + index * 100,
        color: '#748466',
        alpha: 0.68,
      })
    },
  )
}

/* =========================================================
 * EASTERN FOOTHILLS
 * ========================================================= */

function createEasternFoothills(viewer: Viewer) {
  const foothills = [
    [140.250, 34.735],
    [140.250, 34.715],
    [140.250, 34.695],
    [140.245, 34.675],
  ] as [number, number][]

  foothills.forEach(
    ([longitude, latitude], index) => {
      createTerrainMass(viewer, {
        id: `terrain-east-foothill-${index}`,
        name: `Eastern Foothill ${index + 1}`,
        longitude,
        latitude,
        radiusX: 1300,
        radiusY: 1500,
        height: 550 + index * 100,
        color: '#748466',
        alpha: 0.68,
      })
    },
  )
}

/* =========================================================
 * VALLEY WALLS
 * These frame Konoha without covering it.
 * ========================================================= */

function createValleyWalls(viewer: Viewer) {
  createTerrainMass(viewer, {
    id: 'terrain-west-valley-wall',
    name: 'Western Valley Wall',
    longitude: 140.155,
    latitude: 34.705,
    radiusX: 1100,
    radiusY: 3600,
    height: 900,
    color: '#68785d',
    alpha: 0.62,
  })

  createTerrainMass(viewer, {
    id: 'terrain-east-valley-wall',
    name: 'Eastern Valley Wall',
    longitude: 140.245,
    latitude: 34.705,
    radiusX: 1100,
    radiusY: 3600,
    height: 900,
    color: '#68785d',
    alpha: 0.62,
  })
}

/* =========================================================
 * KONOHA OPEN VALLEY
 * ========================================================= */

function createKonohaValley(viewer: Viewer) {
  createTerrainMass(viewer, {
    id: 'terrain-konoha-open-valley',
    name: 'Konoha Open Valley',
    longitude: 140.200,
    latitude: 34.700,
    radiusX: 5600,
    radiusY: 3900,
    height: 55,
    color: '#718566',
    alpha: 0.38,
  })
}

/* =========================================================
 * RIVER VALLEY
 * ========================================================= */

function createRiverValley(viewer: Viewer) {
  const points = [
    [140.205, 34.760],
    [140.205, 34.745],
    [140.205, 34.730],
    [140.207, 34.715],
    [140.210, 34.700],
    [140.215, 34.685],
    [140.225, 34.670],
    [140.235, 34.655],
  ] as [number, number][]

  points.forEach(
    ([longitude, latitude], index) => {
      createTerrainMass(viewer, {
        id: `terrain-river-valley-${index}`,
        name: `River Valley ${index + 1}`,
        longitude,
        latitude,
        radiusX: 850,
        radiusY: 1500,
        height: 45,
        color: '#7d916f',
        alpha: 0.34,
      })
    },
  )
}

/* =========================================================
 * FOREST → MOUNTAIN TRANSITION
 * ========================================================= */

function createForestMountainTransition(viewer: Viewer) {
  const transitionZones = [
    [140.165, 34.765, 1200, 1100, 450],
    [140.185, 34.770, 1300, 1150, 520],
    [140.215, 34.770, 1300, 1150, 520],
    [140.235, 34.765, 1200, 1100, 450],

    [140.145, 34.735, 1100, 1300, 380],
    [140.255, 34.735, 1100, 1300, 380],
  ] as [number, number, number, number, number][]

  transitionZones.forEach(
    ([longitude, latitude, radiusX, radiusY, height], index) => {
      createTerrainMass(viewer, {
        id: `terrain-forest-transition-${index}`,
        name: `Forest Mountain Transition ${index + 1}`,
        longitude,
        latitude,
        radiusX,
        radiusY,
        height,
        color: '#718360',
        alpha: 0.58,
      })
    },
  )
}

/* =========================================================
 * SOUTHERN LOW TERRAIN
 * ========================================================= */

function createSouthernTerrain(viewer: Viewer) {
  createTerrainMass(viewer, {
    id: 'terrain-southwest-hill',
    name: 'Southwestern Hill',
    longitude: 140.145,
    latitude: 34.650,
    radiusX: 2700,
    radiusY: 1900,
    height: 550,
    color: '#69795f',
    alpha: 0.64,
  })

  createTerrainMass(viewer, {
    id: 'terrain-south-hill',
    name: 'Southern Hill',
    longitude: 140.205,
    latitude: 34.635,
    radiusX: 3000,
    radiusY: 1800,
    height: 600,
    color: '#69795f',
    alpha: 0.64,
  })

  createTerrainMass(viewer, {
    id: 'terrain-southeast-hill',
    name: 'Southeastern Hill',
    longitude: 140.265,
    latitude: 34.650,
    radiusX: 2700,
    radiusY: 1900,
    height: 550,
    color: '#69795f',
    alpha: 0.64,
  })
}

/* =========================================================
 * ROCKY OUTCROPS
 * ========================================================= */

function createRockyOutcrops(viewer: Viewer) {
  const rocks = [
    [140.135, 34.785, 900, 700, 500],
    [140.155, 34.800, 850, 650, 600],
    [140.245, 34.800, 850, 650, 600],
    [140.280, 34.735, 900, 700, 500],
  ] as [number, number, number, number, number][]

  rocks.forEach(
    ([longitude, latitude, radiusX, radiusY, height], index) => {
      createTerrainMass(viewer, {
        id: `terrain-rock-outcrop-${index}`,
        name: `Rock Outcrop ${index + 1}`,
        longitude,
        latitude,
        radiusX,
        radiusY,
        height,
        color: '#626d59',
        alpha: 0.76,
      })
    },
  )
}

/* =========================================================
 * PUBLIC API
 * ========================================================= */

export function createTerrain(viewer: Viewer) {
  /* Great mountain */
  createNorthernGreatMountain(viewer)

  /* Long mountain chain */
  createNorthernMainRidge(viewer)
  createNorthernSideRidges(viewer)

  /* Western mountain system */
  createWesternMountain(viewer)
  createWesternRidges(viewer)

  /* Eastern mountain system */
  createEasternMountain(viewer)
  createEasternRidges(viewer)

  /* Mountain → foothill transition */
  createNorthernFoothills(viewer)
  createWesternFoothills(viewer)
  createEasternFoothills(viewer)

  /* Valley walls */
  createValleyWalls(viewer)

  /* Forest → mountain transition */
  createForestMountainTransition(viewer)

  /* Open Konoha */
  createKonohaValley(viewer)

  /* River valley */
  createRiverValley(viewer)

  /* Southern terrain */
  createSouthernTerrain(viewer)

  /* Geological detail */
  createRockyOutcrops(viewer)
}