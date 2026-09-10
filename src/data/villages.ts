import type { Village } from '../types/shinobi'

export const villages: Village[] = [
  {
    id: 'konoha',
    name: 'Konohagakure',
    countryId: 'fire',
    countryName: 'Land of Fire',
    description:
      'The Hidden Leaf Village, one of the Five Great Shinobi Villages.',
    longitude: 140.2,
    latitude: 34.7,
    color: '#2ecc71',
  },

  {
    id: 'suna',
    name: 'Sunagakure',
    countryId: 'wind',
    countryName: 'Land of Wind',
    description:
      'The Hidden Sand Village, located within the desert of the Land of Wind.',
    longitude: 127.2,
    latitude: 28.5,
    color: '#f39c12',
  },

  {
    id: 'kiri',
    name: 'Kirigakure',
    countryId: 'water',
    countryName: 'Land of Water',
    description:
      'The Hidden Mist Village, surrounded by the islands and seas of the Water region.',
    longitude: 153.2,
    latitude: 35.7,
    color: '#3498db',
  },

  {
    id: 'iwa',
    name: 'Iwagakure',
    countryId: 'earth',
    countryName: 'Land of Earth',
    description:
      'The Hidden Stone Village, famous for its mountainous environment.',
    longitude: 132.2,
    latitude: 40.2,
    color: '#95a5a6',
  },

  {
    id: 'kumo',
    name: 'Kumogakure',
    countryId: 'lightning',
    countryName: 'Land of Lightning',
    description:
      'The Hidden Cloud Village, located in the mountainous Land of Lightning.',
    longitude: 150.2,
    latitude: 43.2,
    color: '#9b59b6',
  },
]