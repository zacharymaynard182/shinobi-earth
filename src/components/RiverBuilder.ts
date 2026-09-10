
import {
  CallbackProperty,
  Cartesian3,
  Color,
  JulianDate,
  PolylineGlowMaterialProperty,
  Viewer,
} from 'cesium'

interface RiverDefinition {
  id: string
  name: string
  description: string
  coordinates: [number, number][]
  width: number
  color: string
  glowPower: number
  flowSpeed: number
  flowWidth: number
}


/*
 * =========================================================
 * SHINOBI EARTH
 * RIVER BUILDER
 *
 * Procedural river system
 *
 * Mountain
 *    ↓
 * Tributaries
 *    ↓
 * Main River
 *    ↓
 * Konoha
 *    ↓
 * Downstream
 *
 * No external GLB / FBX models.
 * Everything is generated with Cesium entities.
 * =========================================================
 */


/*
 * =========================================================
 * MAIN RIVER NETWORK
 * =========================================================
 */

const MAIN_RIVER: RiverDefinition = {
  id: 'konoha-main-river',

  name: 'Konoha Main River',

  description:
    'A major river originating in the northern mountain range, flowing through the Konoha region and continuing southward.',

  coordinates: [
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
  ],

  width: 15,

  color: '#287fbd',

  glowPower: 0.12,

  flowSpeed: 2.2,

  flowWidth: 3,
}


/*
 * =========================================================
 * WEST TRIBUTARY
 * =========================================================
 */

const WEST_TRIBUTARY: RiverDefinition = {
  id: 'konoha-west-tributary',

  name: 'Western Mountain Tributary',

  description:
    'A mountain tributary descending from the western hills and joining the Konoha main river.',

  coordinates: [
    [140.168, 34.785],
    [140.171, 34.778],
    [140.175, 34.771],
    [140.179, 34.764],
    [140.183, 34.757],
    [140.187, 34.750],
    [140.190, 34.743],
    [140.193, 34.736],
    [140.196, 34.729],
    [140.199, 34.722],
    [140.202, 34.716],
    [140.205, 34.710],
    [140.207, 34.706],
  ],

  width: 8,

  color: '#4596c9',

  glowPower: 0.16,

  flowSpeed: 1.8,

  flowWidth: 2,
}


/*
 * =========================================================
 * EAST TRIBUTARY
 * =========================================================
 */

const EAST_TRIBUTARY: RiverDefinition = {
  id: 'konoha-east-tributary',

  name: 'Eastern Mountain Tributary',

  description:
    'A tributary flowing down from the eastern mountain region into the main river.',

  coordinates: [
    [140.255, 34.784],
    [140.252, 34.777],
    [140.249, 34.770],
    [140.246, 34.763],
    [140.243, 34.756],
    [140.239, 34.749],
    [140.235, 34.742],
    [140.231, 34.735],
    [140.227, 34.728],
    [140.222, 34.721],
    [140.218, 34.714],
    [140.214, 34.708],
    [140.211, 34.700],
  ],

  width: 8,

  color: '#4596c9',

  glowPower: 0.16,

  flowSpeed: 1.7,

  flowWidth: 2,
}


/*
 * =========================================================
 * NORTHWEST MOUNTAIN STREAM
 * =========================================================
 */

const NORTHWEST_STREAM: RiverDefinition = {
  id: 'konoha-northwest-stream',

  name: 'Northwest Mountain Stream',

  description:
    'A small stream originating in the northwest mountain area.',

  coordinates: [
    [140.180, 34.795],
    [140.182, 34.788],
    [140.185, 34.781],
    [140.188, 34.774],
    [140.191, 34.767],
    [140.194, 34.760],
    [140.197, 34.753],
    [140.199, 34.746],
    [140.201, 34.739],
  ],

  width: 5,

  color: '#63a9d5',

  glowPower: 0.18,

  flowSpeed: 1.5,

  flowWidth: 1.8,
}


/*
 * =========================================================
 * NORTHEAST MOUNTAIN STREAM
 * =========================================================
 */

const NORTHEAST_STREAM: RiverDefinition = {
  id: 'konoha-northeast-stream',

  name: 'Northeast Mountain Stream',

  description:
    'A small stream descending from the northeast mountain range.',

  coordinates: [
    [140.230, 34.795],
    [140.228, 34.788],
    [140.226, 34.781],
    [140.224, 34.774],
    [140.222, 34.767],
    [140.220, 34.760],
    [140.218, 34.753],
    [140.216, 34.746],
    [140.213, 34.739],
  ],

  width: 5,

  color: '#63a9d5',

  glowPower: 0.18,

  flowSpeed: 1.45,

  flowWidth: 1.8,
}


/*
 * =========================================================
 * SOUTHWEST FOREST STREAM
 * =========================================================
 */

const SOUTHWEST_STREAM: RiverDefinition = {
  id: 'konoha-southwest-stream',

  name: 'Southwest Forest Stream',

  description:
    'A forest stream flowing through the southwestern region of Konoha.',

  coordinates: [
    [140.160, 34.720],
    [140.164, 34.714],
    [140.168, 34.708],
    [140.172, 34.702],
    [140.177, 34.696],
    [140.182, 34.690],
    [140.188, 34.685],
    [140.195, 34.681],
    [140.202, 34.678],
    [140.210, 34.676],
  ],

  width: 6,

  color: '#579fce',

  glowPower: 0.18,

  flowSpeed: 1.4,

  flowWidth: 1.8,
}


/*
 * =========================================================
 * SOUTHERN TRIBUTARY
 * =========================================================
 */

const SOUTH_TRIBUTARY: RiverDefinition = {
  id: 'konoha-south-tributary',

  name: 'Southern Forest Tributary',

  description:
    'A southern tributary joining the downstream section of the main river.',

  coordinates: [
    [140.270, 34.625],
    [140.264, 34.631],
    [140.258, 34.637],
    [140.252, 34.643],
    [140.247, 34.649],
  ],

  width: 7,

  color: '#4b98c9',

  glowPower: 0.16,

  flowSpeed: 1.6,

  flowWidth: 2,
}


/*
 * =========================================================
 * CREATE BASE RIVER
 * =========================================================
 */

function createBaseRiver(
  viewer: Viewer,
  river: RiverDefinition,
) {
  const positions =
    Cartesian3.fromDegreesArray(
      river.coordinates.flat(),
    )

  viewer.entities.add({
    id: river.id,

    name: river.name,

    polyline: {
      positions,

      width: river.width,

      clampToGround: true,

      material:
        new PolylineGlowMaterialProperty({
          glowPower: river.glowPower,

          taperPower: 0.7,

          color:
            Color.fromCssColorString(
              river.color,
            ).withAlpha(0.88),
        }),
    },

    properties: {
      type: 'river',

      riverId:
        river.id,

      riverName:
        river.name,

      description:
        river.description,

      width:
        river.width,
    },
  })
}


/*
 * =========================================================
 * FLOW ANIMATION
 *
 * A moving highlighted section travels along
 * the river coordinates from upstream to downstream.
 *
 * This gives the river visible directional movement.
 * =========================================================
 */

function createFlowLine(
  viewer: Viewer,
  river: RiverDefinition,
  flowIndex: number,
) {
  const positions =
    Cartesian3.fromDegreesArray(
      river.coordinates.flat(),
    )

  const startTime =
    JulianDate.now()

  const segmentLength = 5

  const flowPosition =
    new CallbackProperty(
      (time) => {
        if (!time) {
          return positions.slice(
            0,
            segmentLength,
          )
        }

        const elapsed =
          JulianDate.secondsDifference(
            time,
            startTime,
          )

        const distance =
          Math.max(
            0,
            elapsed * river.flowSpeed +
              flowIndex * 4,
          )

        const index =
          Math.floor(
            distance,
          ) % positions.length

        const result: Cartesian3[] = []

        for (
          let i = 0;
          i < segmentLength;
          i += 1
        ) {
          const pointIndex =
            (index + i) %
            positions.length

          result.push(
            positions[pointIndex],
          )
        }

        return result
      },
      false,
    )

  viewer.entities.add({
    id:
      `${river.id}-flow-${flowIndex}`,

    name:
      `${river.name} Flow`,

    polyline: {
      positions:
        flowPosition,

      width:
        river.flowWidth,

      clampToGround:
        true,

      material:
        Color.WHITE.withAlpha(
          0.72,
        ),
    },

    properties: {
      type: 'river',

      riverId:
        river.id,

      riverName:
        river.name,

      riverPart:
        'flow',
    },
  })
}


/*
 * =========================================================
 * CREATE FLOW LINES
 * =========================================================
 */

function createRiverFlow(
  viewer: Viewer,
  river: RiverDefinition,
) {
  /*
   * Multiple flow streaks make the movement
   * continuous instead of looking like one object.
   */

  createFlowLine(
    viewer,
    river,
    0,
  )

  createFlowLine(
    viewer,
    river,
    1,
  )

  createFlowLine(
    viewer,
    river,
    2,
  )
}


/*
 * =========================================================
 * RIVER BANK
 *
 * Dark channel underneath the water.
 * =========================================================
 */

function createRiverBank(
  viewer: Viewer,
  river: RiverDefinition,
) {
  const positions =
    Cartesian3.fromDegreesArray(
      river.coordinates.flat(),
    )

  viewer.entities.add({
    id:
      `${river.id}-bank`,

    name:
      `${river.name} Channel`,

    polyline: {
      positions,

      width:
        river.width + 7,

      clampToGround:
        true,

      material:
        Color.fromCssColorString(
          '#36584b',
        ).withAlpha(
          0.52,
        ),
    },

    properties: {
      type: 'river',

      riverId:
        river.id,

      riverName:
        river.name,

      riverPart:
        'bank',
    },
  })
}


/*
 * =========================================================
 * RIVER POOL
 *
 * Slightly wider water areas create natural variation.
 * =========================================================
 */

function createRiverPool(
  viewer: Viewer,
  longitude: number,
  latitude: number,
  majorAxis: number,
  minorAxis: number,
  name: string,
) {
  viewer.entities.add({
    id:
      `river-pool-${longitude}-${latitude}`,

    name,

    position:
      Cartesian3.fromDegrees(
        longitude,
        latitude,
      ),

    ellipse: {
      semiMajorAxis:
        majorAxis,

      semiMinorAxis:
        minorAxis,

      material:
        Color.fromCssColorString(
          '#287fbd',
        ).withAlpha(
          0.45,
        ),

      height: 0,
    },

    properties: {
      type: 'river',

      riverPart:
        'pool',

      riverName:
        name,
    },
  })
}


/*
 * =========================================================
 * RIVER POOLS
 * =========================================================
 */

function createRiverPools(
  viewer: Viewer,
) {
  createRiverPool(
    viewer,
    140.211,
    34.752,
    70,
    35,
    'Northern River Pool',
  )

  createRiverPool(
    viewer,
    140.207,
    34.720,
    80,
    40,
    'Konoha North Pool',
  )

  createRiverPool(
    viewer,
    140.214,
    34.695,
    90,
    45,
    'Konoha East Pool',
  )

  createRiverPool(
    viewer,
    140.228,
    34.675,
    100,
    50,
    'Southern River Pool',
  )
}


/*
 * =========================================================
 * CREATE ONE COMPLETE RIVER
 * =========================================================
 */

function buildRiver(
  viewer: Viewer,
  river: RiverDefinition,
) {
  /*
   * Bank first
   */
  createRiverBank(
    viewer,
    river,
  )

  /*
   * Water
   */
  createBaseRiver(
    viewer,
    river,
  )

  /*
   * Moving water
   */
  createRiverFlow(
    viewer,
    river,
  )
}


/*
 * =========================================================
 * PUBLIC FUNCTION
 *
 * CesiumViewer.tsx calls:
 *
 * createRivers(viewer)
 * =========================================================
 */

export function createRivers(
  viewer: Viewer,
) {
  /*
   * Main river
   */
  buildRiver(
    viewer,
    MAIN_RIVER,
  )

  /*
   * Major tributaries
   */
  buildRiver(
    viewer,
    WEST_TRIBUTARY,
  )

  buildRiver(
    viewer,
    EAST_TRIBUTARY,
  )

  /*
   * Mountain streams
   */
  buildRiver(
    viewer,
    NORTHWEST_STREAM,
  )

  buildRiver(
    viewer,
    NORTHEAST_STREAM,
  )

  /*
   * Forest streams
   */
  buildRiver(
    viewer,
    SOUTHWEST_STREAM,
  )

  buildRiver(
    viewer,
    SOUTH_TRIBUTARY,
  )

  /*
   * Wider river sections
   */
  createRiverPools(
    viewer,
  )
}

