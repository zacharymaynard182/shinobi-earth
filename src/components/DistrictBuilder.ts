import {
  Cartesian3,
  Color,
  Viewer,
} from 'cesium'

interface District {
  id: string
  name: string
  description: string
  color: string
  coordinates: [number, number][]
}

const districts: District[] = [
  {
    id: 'hokage',
    name: 'Hokage District',
    description:
      'Administrative center of Konohagakure.',
    color: '#d4a017',
    coordinates: [
      [140.193, 34.704],
      [140.200, 34.707],
      [140.207, 34.704],
      [140.207, 34.697],
      [140.200, 34.694],
      [140.193, 34.697],
    ],
  },

  {
    id: 'residential',
    name: 'Residential District',
    description:
      'Residential area surrounding the central village.',
    color: '#2ecc71',
    coordinates: [
      [140.182, 34.708],
      [140.192, 34.713],
      [140.198, 34.707],
      [140.193, 34.699],
      [140.183, 34.700],
    ],
  },

  {
    id: 'training',
    name: 'Training District',
    description:
      'Training grounds used by shinobi.',
    color: '#8e44ad',
    coordinates: [
      [140.202, 34.716],
      [140.214, 34.716],
      [140.220, 34.707],
      [140.212, 34.701],
      [140.202, 34.706],
    ],
  },

  {
    id: 'market',
    name: 'Market District',
    description:
      'Commercial and market area of Konoha.',
    color: '#e67e22',
    coordinates: [
      [140.203, 34.695],
      [140.215, 34.698],
      [140.220, 34.690],
      [140.212, 34.684],
      [140.202, 34.688],
    ],
  },
]

function createDistrict(
  viewer: Viewer,
  district: District,
) {
  const positions =
    Cartesian3.fromDegreesArray(
      district.coordinates.flat(),
    )

  viewer.entities.add({
    name: district.name,

    polygon: {
      hierarchy: positions,

      material:
        Color.fromCssColorString(
          district.color,
        ).withAlpha(0.18),

      outline: true,

      outlineColor:
        Color.fromCssColorString(
          district.color,
        ).withAlpha(0.85),

      /*
       * Keep a small vertical separation
       * above the ground.
       *
       * No heightReference is used here,
       * avoiding Cesium heightReference
       * warnings for polygons.
       */
      height: 8,

      extrudedHeight: 12,
    },

    properties: {
      type: 'district',

      districtId: district.id,

      districtName: district.name,

      description:
        district.description,
    },
  })
}

export function createDistricts(
  viewer: Viewer,
) {
  districts.forEach((district) => {
    createDistrict(
      viewer,
      district,
    )
  })
}