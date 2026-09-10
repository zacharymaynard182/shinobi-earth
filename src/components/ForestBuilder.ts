
import {
  Cartesian3,
  Color,
  EllipsoidGraphics,
  HeightReference,
  Viewer,
} from 'cesium'

interface TreeOptions {
  height: number
  radius: number
  color: Color
}

/*
 * ============================================================
 * SHINOBI EARTH
 * Procedural Forest System
 * ============================================================
 *
 * Konoha center:
 * longitude = 140.2
 * latitude  = 34.7
 *
 * Design:
 *
 *        MOUNTAINS
 *     🌲 🌲 🌲 🌲 🌲
 *   🌲 🌲 🌲 🌲 🌲 🌲
 *  🌲 🌲         🌲 🌲
 *       KONOHA
 *    🏘️ 🏘️ 🏘️ 🏘️
 *          🌊
 *
 * The village center remains open.
 * Forest density increases toward the
 * surrounding foothills.
 * ============================================================
 */

const CENTER_LON = 140.2
const CENTER_LAT = 34.7

/*
 * ------------------------------------------------------------
 * Deterministic random
 * ------------------------------------------------------------
 */
function randomValue(
  seed: number,
): number {
  const x =
    Math.sin(seed * 12.9898) *
    43758.5453

  return (
    x - Math.floor(x)
  )
}

/*
 * ------------------------------------------------------------
 * Meters -> geographic coordinates
 * ------------------------------------------------------------
 */
function metersToDegrees(
  east: number,
  north: number,
): [number, number] {
  const latitude =
    CENTER_LAT +
    north / 111000

  const longitude =
    CENTER_LON +
    east /
      (111000 *
        Math.cos(
          (CENTER_LAT *
            Math.PI) /
            180,
        ))

  return [
    longitude,
    latitude,
  ]
}

/*
 * ------------------------------------------------------------
 * Tree colors
 * ------------------------------------------------------------
 */
function getTreeColor(
  seed: number,
): Color {
  const value =
    randomValue(seed)

  if (value < 0.2) {
    return Color.fromBytes(
      24,
      82,
      40,
      255,
    )
  }

  if (value < 0.45) {
    return Color.fromBytes(
      30,
      105,
      45,
      255,
    )
  }

  if (value < 0.72) {
    return Color.fromBytes(
      39,
      124,
      52,
      255,
    )
  }

  if (value < 0.9) {
    return Color.fromBytes(
      48,
      140,
      59,
      255,
    )
  }

  return Color.fromBytes(
    65,
    150,
    70,
    255,
  )
}

/*
 * ------------------------------------------------------------
 * Create one procedural tree
 * ------------------------------------------------------------
 *
 * RELATIVE_TO_GROUND is important:
 * the tree grows upward from the actual
 * Cesium ground surface.
 * ------------------------------------------------------------
 */
function createTree(
  viewer: Viewer,
  longitude: number,
  latitude: number,
  options: TreeOptions,
  id: string,
) {
  const {
    height,
    radius,
    color,
  } = options

  /*
   * ----------------------------------------------------------
   * Trunk
   * ----------------------------------------------------------
   */
  viewer.entities.add({
    id: `${id}-trunk`,

    name:
      'Shinobi Forest Tree Trunk',

    position:
      Cartesian3.fromDegrees(
        longitude,
        latitude,
        height * 0.21,
      ),

    cylinder: {
      length:
        height * 0.42,

      topRadius:
        radius * 0.16,

      bottomRadius:
        radius * 0.22,

      material:
        Color.fromBytes(
          88,
          55,
          32,
          255,
        ),

      heightReference:
        HeightReference.RELATIVE_TO_GROUND,
    },

    properties: {
      type: 'forest',
      forestType: 'tree',
    },
  })

  /*
   * ----------------------------------------------------------
   * Main crown
   * ----------------------------------------------------------
   */
  viewer.entities.add({
    id: `${id}-crown`,

    name:
      'Shinobi Forest Tree',

    position:
      Cartesian3.fromDegrees(
        longitude,
        latitude,
        height * 0.62,
      ),

    ellipsoid:
      new EllipsoidGraphics({
        radii:
          new Cartesian3(
            radius,
            radius,
            height * 0.42,
          ),

        material: color,

        heightReference:
          HeightReference.RELATIVE_TO_GROUND,
      }),

    properties: {
      type: 'forest',
      forestType: 'tree',
    },
  })

  /*
   * ----------------------------------------------------------
   * Upper crown
   * ----------------------------------------------------------
   */
  viewer.entities.add({
    id: `${id}-top`,

    name:
      'Shinobi Forest Tree Crown',

    position:
      Cartesian3.fromDegrees(
        longitude,
        latitude,
        height * 0.86,
      ),

    ellipsoid:
      new EllipsoidGraphics({
        radii:
          new Cartesian3(
            radius * 0.72,
            radius * 0.72,
            height * 0.23,
          ),

        material:
          color.withAlpha(0.96),

        heightReference:
          HeightReference.RELATIVE_TO_GROUND,
      }),

    properties: {
      type: 'forest',
      forestType: 'tree',
    },
  })
}

/*
 * ------------------------------------------------------------
 * Forest patch
 * ------------------------------------------------------------
 */
function createForestPatch(
  viewer: Viewer,
  centerEast: number,
  centerNorth: number,
  radiusMeters: number,
  treeCount: number,
  seed: number,
) {
  for (
    let i = 0;
    i < treeCount;
    i++
  ) {
    const localSeed =
      seed * 10000 + i

    const angle =
      randomValue(
        localSeed + 1,
      ) *
      Math.PI *
      2

    /*
     * Radial distribution.
     *
     * sqrt gives a more even
     * distribution across the patch.
     */
    const distance =
      Math.sqrt(
        randomValue(
          localSeed + 2,
        ),
      ) *
      radiusMeters

    /*
     * Irregular natural boundary.
     */
    const irregular =
      0.78 +
      randomValue(
        localSeed + 3,
      ) *
        0.44

    const east =
      centerEast +
      Math.cos(angle) *
        distance *
        irregular

    const north =
      centerNorth +
      Math.sin(angle) *
        distance *
        irregular

    /*
     * --------------------------------------------------------
     * Konoha clear zone
     * --------------------------------------------------------
     *
     * Keep the village center open.
     */
    const villageDistance =
      Math.sqrt(
        east * east +
          north * north,
      )

    if (
      villageDistance < 850
    ) {
      continue
    }

    /*
     * --------------------------------------------------------
     * Small river corridor
     * --------------------------------------------------------
     *
     * Main river generally runs north -> south
     * through the Konoha area.
     *
     * Keep a soft open corridor.
     */
    const riverCorridor =
      Math.abs(
        east -
          Math.sin(
            north / 1800,
          ) *
            180,
      )

    if (
      north > -3200 &&
      north < 3000 &&
      riverCorridor < 95
    ) {
      continue
    }

    const [
      longitude,
      latitude,
    ] = metersToDegrees(
      east,
      north,
    )

    /*
     * --------------------------------------------------------
     * Tree variation
     * --------------------------------------------------------
     */
    const sizeRandom =
      randomValue(
        localSeed + 4,
      )

    /*
     * 260m - 440m
     *
     * Large enough to be visible from
     * the current Konoha camera.
     */
    const height =
      260 +
      sizeRandom * 180

    const radius =
      52 +
      sizeRandom * 32

    const treeColor =
      getTreeColor(
        localSeed + 5,
      )

    createTree(
      viewer,
      longitude,
      latitude,
      {
        height,
        radius,
        color: treeColor,
      },
      `forest-tree-${seed}-${i}`,
    )
  }
}

/*
 * ============================================================
 * CREATE FOREST
 * ============================================================
 */
export function createForest(
  viewer: Viewer,
) {
  /*
   * ==========================================================
   * NORTHERN MOUNTAIN FOREST
   * ==========================================================
   *
   * TerrainBuilder mountain area:
   * approximately north of Konoha.
   *
   * These patches create the transition:
   *
   * Konoha
   *   ↓
   * foothill
   *   ↓
   * forest
   *   ↓
   * mountain
   */

  createForestPatch(
    viewer,
    0,
    2500,
    1700,
    100,
    10,
  )

  createForestPatch(
    viewer,
    -1400,
    2900,
    1500,
    85,
    20,
  )

  createForestPatch(
    viewer,
    1400,
    2900,
    1500,
    85,
    30,
  )

  /*
   * ----------------------------------------------------------
   * Northern mountain foothills
   * ----------------------------------------------------------
   */
  createForestPatch(
    viewer,
    -900,
    1800,
    1100,
    65,
    40,
  )

  createForestPatch(
    viewer,
    900,
    1800,
    1100,
    65,
    50,
  )

  /*
   * ==========================================================
   * NORTHWEST MOUNTAIN FOREST
   * ==========================================================
   */
  createForestPatch(
    viewer,
    -3000,
    2400,
    1900,
    105,
    60,
  )

  createForestPatch(
    viewer,
    -4300,
    3000,
    1500,
    75,
    70,
  )

  /*
   * Northwest foothill transition.
   */
  createForestPatch(
    viewer,
    -2400,
    1500,
    1200,
    55,
    80,
  )

  /*
   * ==========================================================
   * NORTHEAST MOUNTAIN FOREST
   * ==========================================================
   */
  createForestPatch(
    viewer,
    3000,
    2400,
    1900,
    105,
    90,
  )

  createForestPatch(
    viewer,
    4300,
    3000,
    1500,
    75,
    100,
  )

  /*
   * Northeast foothill transition.
   */
  createForestPatch(
    viewer,
    2400,
    1500,
    1200,
    55,
    110,
  )

  /*
   * ==========================================================
   * WESTERN FOREST
   * ==========================================================
   */
  createForestPatch(
    viewer,
    -3300,
    700,
    1700,
    85,
    120,
  )

  createForestPatch(
    viewer,
    -4400,
    900,
    1500,
    65,
    130,
  )

  /*
   * Western foothill.
   */
  createForestPatch(
    viewer,
    -2300,
    600,
    1100,
    50,
    140,
  )

  /*
   * ==========================================================
   * EASTERN FOREST
   * ==========================================================
   */
  createForestPatch(
    viewer,
    3300,
    700,
    1700,
    85,
    150,
  )

  createForestPatch(
    viewer,
    4400,
    900,
    1500,
    65,
    160,
  )

  /*
   * Eastern foothill.
   */
  createForestPatch(
    viewer,
    2300,
    600,
    1100,
    50,
    170,
  )

  /*
   * ==========================================================
   * SOUTHWEST FOREST
   * ==========================================================
   */
  createForestPatch(
    viewer,
    -3000,
    -2100,
    1700,
    80,
    180,
  )

  createForestPatch(
    viewer,
    -4300,
    -2600,
    1500,
    60,
    190,
  )

  /*
   * ==========================================================
   * SOUTH FOREST
   * ==========================================================
   */
  createForestPatch(
    viewer,
    0,
    -3000,
    1900,
    90,
    200,
  )

  createForestPatch(
    viewer,
    0,
    -4300,
    1500,
    65,
    210,
  )

  /*
   * ==========================================================
   * SOUTHEAST FOREST
   * ==========================================================
   */
  createForestPatch(
    viewer,
    3000,
    -2100,
    1700,
    80,
    220,
  )

  createForestPatch(
    viewer,
    4300,
    -2600,
    1500,
    60,
    230,
  )

  /*
   * ==========================================================
   * INNER FOOTHILL BELT
   * ==========================================================
   *
   * These patches are deliberately smaller.
   * They create a gradual transition from
   * village → woodland → mountain.
   */

  createForestPatch(
    viewer,
    -1250,
    1250,
    650,
    35,
    240,
  )

  createForestPatch(
    viewer,
    1250,
    1250,
    650,
    35,
    250,
  )

  createForestPatch(
    viewer,
    -1450,
    -1150,
    650,
    30,
    260,
  )

  createForestPatch(
    viewer,
    1450,
    -1150,
    650,
    30,
    270,
  )

  /*
   * ==========================================================
   * FOREST EDGE
   * ==========================================================
   *
   * These make the forest visually continuous
   * instead of looking like isolated circular patches.
   */

  createForestPatch(
    viewer,
    -5000,
    1800,
    1100,
    45,
    280,
  )

  createForestPatch(
    viewer,
    5000,
    1800,
    1100,
    45,
    290,
  )

  createForestPatch(
    viewer,
    -5000,
    -1500,
    1100,
    45,
    300,
  )

  createForestPatch(
    viewer,
    5000,
    -1500,
    1100,
    45,
    310,
  )

  /*
   * ==========================================================
   * FINAL RESULT
   * ==========================================================
   *
   * The forest should now read visually as:
   *
   *             MOUNTAINS
   *          🌲 🌲 🌲 🌲 🌲
   *       🌲 🌲 🌲 🌲 🌲 🌲
   *     🌲 🌲           🌲 🌲
   *   🌲 🌲   KONOHA      🌲 🌲
   *       🌲   🏘️ 🏘️   🌲
   *          🌊 RIVER
   *
   * with an open village center.
   * ==========================================================
   */
}

