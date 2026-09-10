
import {
  Cartesian3,
  Color,
  Viewer,
} from 'cesium'

interface RoadDefinition {
  coordinates: [number, number][]
  width: number
  color: string
  name: string
}


/*
 * -------------------------------------------------------
 * CREATE ROAD
 * -------------------------------------------------------
 */

function createRoad(
  viewer: Viewer,
  road: RoadDefinition,
) {
  viewer.entities.add({
    name: road.name,

    polyline: {
      positions:
        Cartesian3.fromDegreesArray(
          road.coordinates.flat(),
        ),

      width: road.width,

      clampToGround: true,

      material:
        Color.fromCssColorString(
          road.color,
        ).withAlpha(0.92),
    },

    properties: {
      type: 'road',
      roadName: road.name,
    },
  })
}


/*
 * -------------------------------------------------------
 * MAIN ROADS
 * -------------------------------------------------------
 */

function createMainRoads(
  viewer: Viewer,
) {
  /*
   * Main East-West Road
   */
  createRoad(
    viewer,
    {
      coordinates: [
        [140.165, 34.700],
        [140.177, 34.700],
        [140.188, 34.701],
        [140.200, 34.700],
        [140.212, 34.700],
        [140.224, 34.700],
        [140.238, 34.700],
      ],

      width: 16,

      color: '#51483f',

      name: 'Konoha Main Road',
    },
  )


  /*
   * Main North-South Road
   */
  createRoad(
    viewer,
    {
      coordinates: [
        [140.200, 34.670],
        [140.200, 34.680],
        [140.200, 34.690],
        [140.200, 34.700],
        [140.200, 34.710],
        [140.200, 34.720],
        [140.200, 34.732],
      ],

      width: 16,

      color: '#51483f',

      name: 'Konoha Central Road',
    },
  )


  /*
   * Northwest arterial.
   */
  createRoad(
    viewer,
    {
      coordinates: [
        [140.200, 34.700],
        [140.194, 34.706],
        [140.188, 34.713],
        [140.181, 34.721],
        [140.174, 34.730],
      ],

      width: 12,

      color: '#5d5349',

      name: 'Konoha Northwest Arterial',
    },
  )


  /*
   * Northeast arterial.
   */
  createRoad(
    viewer,
    {
      coordinates: [
        [140.200, 34.700],
        [140.207, 34.706],
        [140.214, 34.713],
        [140.222, 34.721],
        [140.230, 34.730],
      ],

      width: 12,

      color: '#5d5349',

      name: 'Konoha Northeast Arterial',
    },
  )


  /*
   * Southwest arterial.
   */
  createRoad(
    viewer,
    {
      coordinates: [
        [140.200, 34.700],
        [140.193, 34.694],
        [140.186, 34.687],
        [140.178, 34.680],
        [140.170, 34.673],
      ],

      width: 11,

      color: '#62584e',

      name: 'Konoha Southwest Arterial',
    },
  )


  /*
   * Southeast arterial.
   */
  createRoad(
    viewer,
    {
      coordinates: [
        [140.200, 34.700],
        [140.207, 34.694],
        [140.214, 34.687],
        [140.222, 34.680],
        [140.230, 34.673],
      ],

      width: 11,

      color: '#62584e',

      name: 'Konoha Southeast Arterial',
    },
  )
}


/*
 * -------------------------------------------------------
 * RESIDENTIAL DISTRICT
 * -------------------------------------------------------
 */

function createResidentialRoads(
  viewer: Viewer,
) {
  /*
   * North residential street.
   */
  createRoad(
    viewer,
    {
      coordinates: [
        [140.181, 34.708],
        [140.188, 34.710],
        [140.196, 34.710],
        [140.204, 34.709],
      ],

      width: 7,

      color: '#75695e',

      name: 'Residential Street North',
    },
  )


  /*
   * South residential street.
   */
  createRoad(
    viewer,
    {
      coordinates: [
        [140.181, 34.700],
        [140.189, 34.700],
        [140.197, 34.700],
        [140.204, 34.700],
      ],

      width: 7,

      color: '#75695e',

      name: 'Residential Street South',
    },
  )


  /*
   * Western residential connection.
   */
  createRoad(
    viewer,
    {
      coordinates: [
        [140.185, 34.695],
        [140.185, 34.702],
        [140.187, 34.709],
        [140.190, 34.716],
      ],

      width: 6,

      color: '#82766a',

      name: 'Residential Street West',
    },
  )


  /*
   * Eastern residential connection.
   */
  createRoad(
    viewer,
    {
      coordinates: [
        [140.195, 34.696],
        [140.195, 34.702],
        [140.195, 34.708],
        [140.198, 34.715],
      ],

      width: 6,

      color: '#82766a',

      name: 'Residential Street East',
    },
  )


  /*
   * Small connecting streets.
   */
  createRoad(
    viewer,
    {
      coordinates: [
        [140.188, 34.704],
        [140.193, 34.707],
        [140.199, 34.708],
      ],

      width: 5,

      color: '#897c70',

      name: 'Residential Connector 01',
    },
  )


  createRoad(
    viewer,
    {
      coordinates: [
        [140.187, 34.711],
        [140.192, 34.709],
        [140.197, 34.705],
      ],

      width: 5,

      color: '#897c70',

      name: 'Residential Connector 02',
    },
  )


  createRoad(
    viewer,
    {
      coordinates: [
        [140.190, 34.698],
        [140.193, 34.703],
        [140.201, 34.704],
      ],

      width: 5,

      color: '#897c70',

      name: 'Residential Connector 03',
    },
  )
}


/*
 * -------------------------------------------------------
 * HOKAGE DISTRICT
 * -------------------------------------------------------
 */

function createHokageRoads(
  viewer: Viewer,
) {
  createRoad(
    viewer,
    {
      coordinates: [
        [140.194, 34.696],
        [140.197, 34.699],
        [140.200, 34.701],
        [140.203, 34.704],
      ],

      width: 8,

      color: '#665b50',

      name: 'Hokage District Avenue',
    },
  )


  createRoad(
    viewer,
    {
      coordinates: [
        [140.200, 34.694],
        [140.200, 34.701],
        [140.200, 34.707],
      ],

      width: 7,

      color: '#71655a',

      name: 'Hokage District Street',
    },
  )


  createRoad(
    viewer,
    {
      coordinates: [
        [140.194, 34.700],
        [140.200, 34.700],
        [140.206, 34.700],
      ],

      width: 7,

      color: '#71655a',

      name: 'Hokage Administrative Street',
    },
  )
}


/*
 * -------------------------------------------------------
 * TRAINING DISTRICT
 * -------------------------------------------------------
 */

function createTrainingRoads(
  viewer: Viewer,
) {
  createRoad(
    viewer,
    {
      coordinates: [
        [140.200, 34.710],
        [140.207, 34.712],
        [140.214, 34.712],
        [140.221, 34.714],
      ],

      width: 8,

      color: '#62576d',

      name: 'Training District Avenue',
    },
  )


  createRoad(
    viewer,
    {
      coordinates: [
        [140.207, 34.706],
        [140.209, 34.712],
        [140.211, 34.718],
      ],

      width: 6,

      color: '#756b7d',

      name: 'Training Ground Road',
    },
  )


  createRoad(
    viewer,
    {
      coordinates: [
        [140.214, 34.706],
        [140.214, 34.711],
        [140.215, 34.717],
      ],

      width: 6,

      color: '#756b7d',

      name: 'Academy Road',
    },
  )
}


/*
 * -------------------------------------------------------
 * MARKET DISTRICT
 * -------------------------------------------------------
 */

function createMarketRoads(
  viewer: Viewer,
) {
  createRoad(
    viewer,
    {
      coordinates: [
        [140.201, 34.694],
        [140.208, 34.693],
        [140.215, 34.693],
        [140.222, 34.694],
      ],

      width: 9,

      color: '#654f3d',

      name: 'Market Avenue',
    },
  )


  createRoad(
    viewer,
    {
      coordinates: [
        [140.208, 34.686],
        [140.209, 34.691],
        [140.210, 34.697],
      ],

      width: 7,

      color: '#755e4b',

      name: 'Market Street East',
    },
  )


  createRoad(
    viewer,
    {
      coordinates: [
        [140.215, 34.686],
        [140.214, 34.691],
        [140.213, 34.697],
      ],

      width: 7,

      color: '#755e4b',

      name: 'Market Street West',
    },
  )


  createRoad(
    viewer,
    {
      coordinates: [
        [140.207, 34.689],
        [140.212, 34.689],
        [140.217, 34.689],
      ],

      width: 5,

      color: '#806b58',

      name: 'Market Connector 01',
    },
  )


  createRoad(
    viewer,
    {
      coordinates: [
        [140.207, 34.694],
        [140.212, 34.694],
        [140.218, 34.694],
      ],

      width: 5,

      color: '#806b58',

      name: 'Market Connector 02',
    },
  )
}


/*
 * -------------------------------------------------------
 * TRAINING ↔ MARKET CONNECTION
 * -------------------------------------------------------
 */

function createCrossDistrictRoads(
  viewer: Viewer,
) {
  createRoad(
    viewer,
    {
      coordinates: [
        [140.210, 34.704],
        [140.211, 34.700],
        [140.211, 34.696],
        [140.211, 34.691],
      ],

      width: 7,

      color: '#6a5d50',

      name: 'Central District Connector',
    },
  )


  createRoad(
    viewer,
    {
      coordinates: [
        [140.205, 34.706],
        [140.209, 34.702],
        [140.214, 34.699],
        [140.219, 34.696],
      ],

      width: 6,

      color: '#776a5d',

      name: 'Eastern District Connector',
    },
  )
}


/*
 * -------------------------------------------------------
 * VILLAGE GATE ROADS
 * -------------------------------------------------------
 */

function createGateRoads(
  viewer: Viewer,
) {
  /*
   * Main western gate.
   */
  createRoad(
    viewer,
    {
      coordinates: [
        [140.150, 34.700],
        [140.160, 34.700],
        [140.170, 34.700],
        [140.182, 34.700],
      ],

      width: 14,

      color: '#50463d',

      name: 'West Village Gate Road',
    },
  )


  /*
   * Main eastern gate.
   */
  createRoad(
    viewer,
    {
      coordinates: [
        [140.218, 34.700],
        [140.230, 34.700],
        [140.242, 34.700],
        [140.252, 34.700],
      ],

      width: 14,

      color: '#50463d',

      name: 'East Village Gate Road',
    },
  )


  /*
   * Northern approach.
   */
  createRoad(
    viewer,
    {
      coordinates: [
        [140.200, 34.720],
        [140.200, 34.732],
        [140.200, 34.744],
      ],

      width: 12,

      color: '#574d43',

      name: 'North Village Gate Road',
    },
  )


  /*
   * Southern approach.
   */
  createRoad(
    viewer,
    {
      coordinates: [
        [140.200, 34.680],
        [140.200, 34.668],
        [140.200, 34.656],
      ],

      width: 12,

      color: '#574d43',

      name: 'South Village Gate Road',
    },
  )
}


/*
 * -------------------------------------------------------
 * PUBLIC ROAD BUILDER
 * -------------------------------------------------------
 */

export function createRoads(
  viewer: Viewer,
) {
  createMainRoads(viewer)

  createResidentialRoads(viewer)

  createHokageRoads(viewer)

  createTrainingRoads(viewer)

  createMarketRoads(viewer)

  createCrossDistrictRoads(viewer)

  createGateRoads(viewer)
}

