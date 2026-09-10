import type { Country } from '../types/shinobi'

export const countries: Country[] = [
  {
    id: 'fire',
    name: 'Land of Fire',
    shortName: 'Fire',
    description:
      'A large forested nation located near the center of the Shinobi World.',
    color: '#e74c3c',
    fillColor: '#e74c3c',
    borderColor: '#ff6b5f',
    coordinates: [
      [133, 34],
      [136, 38],
      [141, 40],
      [146, 38],
      [148, 34],
      [145, 30],
      [139, 29],
      [134, 31],
    ],
    centerLongitude: 140.5,
    centerLatitude: 34.5,
  },

  {
    id: 'wind',
    name: 'Land of Wind',
    shortName: 'Wind',
    description:
      'A vast desert nation occupying the western region of the Shinobi World.',
    color: '#f1c40f',
    fillColor: '#f1c40f',
    borderColor: '#ffe066',
    coordinates: [
      [121, 29],
      [126, 34],
      [133, 34],
      [134, 31],
      [131, 25],
      [125, 23],
      [120, 25],
    ],
    centerLongitude: 127,
    centerLatitude: 29,
  },

  {
    id: 'water',
    name: 'Land of Water',
    shortName: 'Water',
    description:
      'An island nation surrounded by water and known for the Hidden Mist Village.',
    color: '#3498db',
    fillColor: '#3498db',
    borderColor: '#66b3ff',
    coordinates: [
      [147, 39],
      [153, 42],
      [158, 39],
      [159, 34],
      [155, 30],
      [149, 32],
      [146, 35],
    ],
    centerLongitude: 153,
    centerLatitude: 36,
  },

  {
    id: 'earth',
    name: 'Land of Earth',
    shortName: 'Earth',
    description:
      'A mountainous nation located in the northern-western part of the Shinobi World.',
    color: '#8e6e53',
    fillColor: '#8e6e53',
    borderColor: '#b99a7a',
    coordinates: [
      [121, 42],
      [127, 46],
      [135, 45],
      [140, 41],
      [141, 37],
      [136, 35],
      [130, 36],
      [125, 38],
    ],
    centerLongitude: 131,
    centerLatitude: 40.5,
  },

  {
    id: 'lightning',
    name: 'Land of Lightning',
    shortName: 'Lightning',
    description:
      'A mountainous coastal nation located in the northern-eastern region.',
    color: '#9b59b6',
    fillColor: '#9b59b6',
    borderColor: '#c084d6',
    coordinates: [
      [141, 45],
      [147, 48],
      [154, 47],
      [158, 43],
      [154, 39],
      [147, 40],
      [142, 42],
    ],
    centerLongitude: 150,
    centerLatitude: 43.5,
  },
]