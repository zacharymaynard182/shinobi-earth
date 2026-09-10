
import {
  Cartesian3,
  Color,
  HeightReference,
  Viewer,
} from 'cesium'

interface BuildingDefinition {
  id: string
  name: string

  longitude: number
  latitude: number

  width: number
  depth: number
  height: number

  color: string

  districtId: string
  districtName: string
  buildingType: string

  roofColor?: string
}


/*
 * -------------------------------------------------------
 * DETERMINISTIC RANDOM
 * -------------------------------------------------------
 */

function randomValue(seed: number) {
  const value =
    Math.sin(seed * 12.9898) *
    43758.5453

  return (
    value -
    Math.floor(value)
  )
}


/*
 * -------------------------------------------------------
 * CREATE BUILDING
 * -------------------------------------------------------
 */

function createBuilding(
  viewer: Viewer,
  building: BuildingDefinition,
) {
  /*
   * Main building body
   */
  viewer.entities.add({
    id: building.id,

    name: building.name,

    position: Cartesian3.fromDegrees(
      building.longitude,
      building.latitude,
      building.height / 2,
    ),

    box: {
      dimensions: new Cartesian3(
        building.width,
        building.depth,
        building.height,
      ),

      material:
        Color.fromCssColorString(
          building.color,
        ).withAlpha(0.96),

      heightReference:
        HeightReference.RELATIVE_TO_GROUND,
    },

    properties: {
      type: 'building',

      buildingId:
        building.id,

      buildingName:
        building.name,

      buildingType:
        building.buildingType,

      districtId:
        building.districtId,

      districtName:
        building.districtName,

      longitude:
        building.longitude,

      latitude:
        building.latitude,
    },
  })


  /*
   * -----------------------------------------------------
   * ROOF
   * -----------------------------------------------------
   *
   * A second shallow box creates a visible roof cap.
   */
  const roofHeight = Math.max(
    4,
    building.height * 0.07,
  )

  viewer.entities.add({
    name: `${building.name} Roof`,

    position:
      Cartesian3.fromDegrees(
        building.longitude,
        building.latitude,
        building.height +
          roofHeight / 2,
    ),

    box: {
      dimensions:
        new Cartesian3(
          building.width * 1.04,
          building.depth * 1.04,
          roofHeight,
        ),

      material:
        Color.fromCssColorString(
          building.roofColor ??
            '#4a3b32',
        ).withAlpha(0.98),

      heightReference:
        HeightReference.RELATIVE_TO_GROUND,
    },

    properties: {
      type: 'building',

      buildingId:
        building.id,

      buildingName:
        building.name,

      buildingType:
        building.buildingType,

      districtId:
        building.districtId,

      districtName:
        building.districtName,
    },
  })
}


/*
 * -------------------------------------------------------
 * FIXED LANDMARK BUILDINGS
 * -------------------------------------------------------
 */

const buildings: BuildingDefinition[] = [

  /*
   * ==============================================
   * HOKAGE DISTRICT
   * ==============================================
   */

  {
    id: 'hokage-office',
    name: 'Hokage Office',

    longitude: 140.200,
    latitude: 34.701,

    width: 90,
    depth: 90,
    height: 120,

    color: '#d4a017',
    roofColor: '#6b4f1d',

    districtId: 'hokage',
    districtName: 'Hokage District',

    buildingType: 'administration',
  },

  {
    id: 'shinobi-headquarters',
    name: 'Shinobi Headquarters',

    longitude: 140.196,
    latitude: 34.700,

    width: 75,
    depth: 65,
    height: 75,

    color: '#b8860b',
    roofColor: '#59441c',

    districtId: 'hokage',
    districtName: 'Hokage District',

    buildingType: 'administration',
  },

  {
    id: 'administration-building',
    name: 'Administration Building',

    longitude: 140.204,
    latitude: 34.700,

    width: 70,
    depth: 60,
    height: 65,

    color: '#c49a18',
    roofColor: '#614a1e',

    districtId: 'hokage',
    districtName: 'Hokage District',

    buildingType: 'administration',
  },


  /*
   * ==============================================
   * RESIDENTIAL DISTRICT
   * ==============================================
   */

  {
    id: 'residential-house-01',
    name: 'Residential House 01',

    longitude: 140.187,
    latitude: 34.705,

    width: 48,
    depth: 48,
    height: 32,

    color: '#4caf50',
    roofColor: '#39452d',

    districtId: 'residential',
    districtName: 'Residential District',

    buildingType: 'residential',
  },

  {
    id: 'residential-house-02',
    name: 'Residential House 02',

    longitude: 140.190,
    latitude: 34.708,

    width: 52,
    depth: 45,
    height: 35,

    color: '#388e3c',
    roofColor: '#34432d',

    districtId: 'residential',
    districtName: 'Residential District',

    buildingType: 'residential',
  },

  {
    id: 'residential-house-03',
    name: 'Residential House 03',

    longitude: 140.185,
    latitude: 34.710,

    width: 45,
    depth: 45,
    height: 30,

    color: '#66bb6a',
    roofColor: '#3f4a35',

    districtId: 'residential',
    districtName: 'Residential District',

    buildingType: 'residential',
  },

  {
    id: 'residential-house-04',
    name: 'Residential House 04',

    longitude: 140.192,
    latitude: 34.704,

    width: 50,
    depth: 42,
    height: 34,

    color: '#43a047',
    roofColor: '#35452f',

    districtId: 'residential',
    districtName: 'Residential District',

    buildingType: 'residential',
  },

  {
    id: 'residential-house-05',
    name: 'Residential House 05',

    longitude: 140.188,
    latitude: 34.712,

    width: 46,
    depth: 46,
    height: 31,

    color: '#81c784',
    roofColor: '#46513b',

    districtId: 'residential',
    districtName: 'Residential District',

    buildingType: 'residential',
  },


  /*
   * ==============================================
   * TRAINING DISTRICT
   * ==============================================
   */

  {
    id: 'training-facility',
    name: 'Shinobi Training Facility',

    longitude: 140.208,
    latitude: 34.711,

    width: 85,
    depth: 70,
    height: 45,

    color: '#8e44ad',
    roofColor: '#4d3159',

    districtId: 'training',
    districtName: 'Training District',

    buildingType: 'training',
  },

  {
    id: 'training-academy',
    name: 'Shinobi Academy',

    longitude: 140.214,
    latitude: 34.710,

    width: 75,
    depth: 60,
    height: 55,

    color: '#7d3c98',
    roofColor: '#49304f',

    districtId: 'training',
    districtName: 'Training District',

    buildingType: 'training',
  },

  {
    id: 'training-storage',
    name: 'Training Equipment Hall',

    longitude: 140.211,
    latitude: 34.715,

    width: 55,
    depth: 45,
    height: 28,

    color: '#9b59b6',
    roofColor: '#54385f',

    districtId: 'training',
    districtName: 'Training District',

    buildingType: 'training',
  },


  /*
   * ==============================================
   * MARKET DISTRICT
   * ==============================================
   */

  {
    id: 'market-main',
    name: 'Konoha Market',

    longitude: 140.208,
    latitude: 34.691,

    width: 90,
    depth: 65,
    height: 42,

    color: '#e67e22',
    roofColor: '#633d24',

    districtId: 'market',
    districtName: 'Market District',

    buildingType: 'commercial',
  },

  {
    id: 'market-shop-01',
    name: 'Market Shop 01',

    longitude: 140.213,
    latitude: 34.693,

    width: 45,
    depth: 40,
    height: 28,

    color: '#f39c12',
    roofColor: '#70451f',

    districtId: 'market',
    districtName: 'Market District',

    buildingType: 'commercial',
  },

  {
    id: 'market-shop-02',
    name: 'Market Shop 02',

    longitude: 140.216,
    latitude: 34.691,

    width: 45,
    depth: 40,
    height: 30,

    color: '#d35400',
    roofColor: '#653b22',

    districtId: 'market',
    districtName: 'Market District',

    buildingType: 'commercial',
  },

  {
    id: 'market-shop-03',
    name: 'Market Shop 03',

    longitude: 140.212,
    latitude: 34.688,

    width: 42,
    depth: 38,
    height: 26,

    color: '#e67e22',
    roofColor: '#70431f',

    districtId: 'market',
    districtName: 'Market District',

    buildingType: 'commercial',
  },
]


/*
 * -------------------------------------------------------
 * PROCEDURAL RESIDENTIAL BUILDINGS
 * -------------------------------------------------------
 */

function createResidentialBuildings(
  viewer: Viewer,
) {
  const centerLongitude = 140.188
  const centerLatitude = 34.705

  const count = 34

  for (let i = 0; i < count; i++) {
    const seed =
      2000 +
      i * 19.31

    const angle =
      randomValue(seed) *
      Math.PI *
      2

    const distance =
      350 +
      randomValue(
        seed + 4,
      ) *
        950

    const east =
      Math.cos(angle) *
      distance

    const north =
      Math.sin(angle) *
      distance

    const longitude =
      centerLongitude +
      east /
        (
          111000 *
          Math.cos(
            centerLatitude *
              Math.PI /
              180,
          )
        )

    const latitude =
      centerLatitude +
      north / 111000

    const width =
      34 +
      randomValue(
        seed + 10,
      ) *
        30

    const depth =
      32 +
      randomValue(
        seed + 20,
      ) *
        28

    const height =
      22 +
      randomValue(
        seed + 30,
      ) *
        28

    const colors = [
      '#4caf50',
      '#388e3c',
      '#66bb6a',
      '#43a047',
      '#81c784',
    ]

    const roofs = [
      '#35452f',
      '#3d4a34',
      '#46513b',
      '#303d2c',
    ]

    const color =
      colors[
        Math.floor(
          randomValue(
            seed + 40,
          ) *
            colors.length,
        )
      ]

    const roofColor =
      roofs[
        Math.floor(
          randomValue(
            seed + 50,
          ) *
            roofs.length,
        )
      ]

    createBuilding(
      viewer,
      {
        id:
          `residential-procedural-${i}`,

        name:
          `Konoha Residential Building ${i + 1}`,

        longitude,

        latitude,

        width,

        depth,

        height,

        color,

        roofColor,

        districtId:
          'residential',

        districtName:
          'Residential District',

        buildingType:
          'residential',
      },
    )
  }
}


/*
 * -------------------------------------------------------
 * PROCEDURAL MARKET BUILDINGS
 * -------------------------------------------------------
 */

function createMarketBuildings(
  viewer: Viewer,
) {
  const centerLongitude = 140.211
  const centerLatitude = 34.691

  const count = 18

  for (let i = 0; i < count; i++) {
    const seed =
      3000 +
      i * 23.17

    const angle =
      randomValue(seed) *
      Math.PI *
      2

    const distance =
      180 +
      randomValue(
        seed + 5,
      ) *
        500

    const east =
      Math.cos(angle) *
      distance

    const north =
      Math.sin(angle) *
      distance

    const longitude =
      centerLongitude +
      east /
        (
          111000 *
          Math.cos(
            centerLatitude *
              Math.PI /
              180,
          )
        )

    const latitude =
      centerLatitude +
      north / 111000

    const width =
      32 +
      randomValue(
        seed + 10,
      ) *
        28

    const depth =
      28 +
      randomValue(
        seed + 20,
      ) *
        25

    const height =
      24 +
      randomValue(
        seed + 30,
      ) *
        24

    const colors = [
      '#d35400',
      '#e67e22',
      '#f39c12',
      '#c96a12',
      '#e08b28',
    ]

    const color =
      colors[
        Math.floor(
          randomValue(
            seed + 40,
          ) *
            colors.length,
        )
      ]

    createBuilding(
      viewer,
      {
        id:
          `market-procedural-${i}`,

        name:
          `Konoha Market Building ${i + 1}`,

        longitude,

        latitude,

        width,

        depth,

        height,

        color,

        roofColor:
          '#633d24',

        districtId:
          'market',

        districtName:
          'Market District',

        buildingType:
          'commercial',
      },
    )
  }
}


/*
 * -------------------------------------------------------
 * PROCEDURAL TRAINING BUILDINGS
 * -------------------------------------------------------
 */

function createTrainingBuildings(
  viewer: Viewer,
) {
  const centerLongitude = 140.212
  const centerLatitude = 34.712

  const count = 10

  for (let i = 0; i < count; i++) {
    const seed =
      4000 +
      i * 29.73

    const angle =
      randomValue(seed) *
      Math.PI *
      2

    const distance =
      180 +
      randomValue(
        seed + 4,
      ) *
        450

    const east =
      Math.cos(angle) *
      distance

    const north =
      Math.sin(angle) *
      distance

    const longitude =
      centerLongitude +
      east /
        (
          111000 *
          Math.cos(
            centerLatitude *
              Math.PI /
              180,
          )
        )

    const latitude =
      centerLatitude +
      north / 111000

    const width =
      42 +
      randomValue(
        seed + 10,
      ) *
        35

    const depth =
      38 +
      randomValue(
        seed + 20,
      ) *
        30

    const height =
      28 +
      randomValue(
        seed + 30,
      ) *
        30

    createBuilding(
      viewer,
      {
        id:
          `training-procedural-${i}`,

        name:
          `Training Facility ${i + 1}`,

        longitude,

        latitude,

        width,

        depth,

        height,

        color:
          i % 2 === 0
            ? '#8e44ad'
            : '#7d3c98',

        roofColor:
          '#49304f',

        districtId:
          'training',

        districtName:
          'Training District',

        buildingType:
          'training',
      },
    )
  }
}


/*
 * -------------------------------------------------------
 * PUBLIC BUILDER
 * -------------------------------------------------------
 */

export function createBuildings(
  viewer: Viewer,
) {
  /*
   * Fixed important buildings.
   */
  buildings.forEach(
    (building) => {
      createBuilding(
        viewer,
        building,
      )
    },
  )

  /*
   * Procedural city expansion.
   */
  createResidentialBuildings(
    viewer,
  )

  createMarketBuildings(
    viewer,
  )

  createTrainingBuildings(
    viewer,
  )
}

