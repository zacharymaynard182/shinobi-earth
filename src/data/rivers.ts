import type { River } from '../types/shinobi'

export const rivers: River[] = [
  {
    id: 'great-naruto-river',
    name: 'Great Shinobi River',
    description:
      'A major fictional river system crossing the central Shinobi World.',
    color: '#38bdf8',
    width: 5,
    coordinates: [
      [123, 36],
      [128, 35],
      [133, 34],
      [138, 33],
      [143, 34],
      [148, 36],
    ],
    centerLongitude: 135,
    centerLatitude: 34,
  },

  {
    id: 'fire-river',
    name: 'Fire Country River',
    description:
      'A fictional river flowing through the forested Land of Fire.',
    color: '#22d3ee',
    width: 4,
    coordinates: [
      [136, 40],
      [137, 38],
      [139, 36],
      [141, 34],
      [143, 31],
    ],
    centerLongitude: 139.5,
    centerLatitude: 35.5,
  },

  {
    id: 'wind-river',
    name: 'Wind Border River',
    description:
      'A fictional river forming part of the transition between the desert and central regions.',
    color: '#67e8f9',
    width: 4,
    coordinates: [
      [126, 39],
      [128, 36],
      [130, 33],
      [131, 30],
      [130, 27],
    ],
    centerLongitude: 129,
    centerLatitude: 33,
  },

  {
    id: 'lightning-river',
    name: 'Lightning River',
    description:
      'A fictional mountain river flowing through the Land of Lightning.',
    color: '#60a5fa',
    width: 4,
    coordinates: [
      [144, 48],
      [146, 46],
      [149, 44],
      [151, 42],
      [154, 40],
    ],
    centerLongitude: 149,
    centerLatitude: 44,
  },
]