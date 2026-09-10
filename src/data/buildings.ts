

export interface BuildingData {
  id: string

  villageId: string

  name: string

  type: string

  description: string

  longitude: number

  latitude: number

  height: number

  width: number

  depth: number

  color: string
}

export const buildings: BuildingData[] = [
  {
    id: 'hokage-office',

    villageId: 'konohagakure',

    name: 'Hokage Office',

    type: 'Government',

    description:
      'Headquarters of Konohagakure administration.',

    longitude: 139.6920,

    latitude: 35.6897,

    height: 110,

    width: 90,

    depth: 90,

    color: '#e67e22',
  },

  {
    id: 'ninja-academy',

    villageId: 'konohagakure',

    name: 'Ninja Academy',

    type: 'Education',

    description:
      'Training center for young shinobi.',

    longitude: 139.6930,

    latitude: 35.6904,

    height: 70,

    width: 70,

    depth: 70,

    color: '#3498db',
  },

  {
    id: 'hospital',

    villageId: 'konohagakure',

    name: 'Konoha Hospital',

    type: 'Medical',

    description:
      'Primary medical facility of the village.',

    longitude: 139.6910,

    latitude: 35.6903,

    height: 65,

    width: 80,

    depth: 80,

    color: '#2ecc71',
  },

  {
    id: 'mission-center',

    villageId: 'konohagakure',

    name: 'Mission Center',

    type: 'Operations',

    description:
      'Mission assignment headquarters.',

    longitude: 139.6928,

    latitude: 35.6888,

    height: 60,

    width: 65,

    depth: 65,

    color: '#9b59b6',
  },

  {
    id: 'ramen-shop',

    villageId: 'konohagakure',

    name: 'Ichiraku Ramen',

    type: 'Restaurant',

    description:
      "Naruto's favorite ramen shop.",

    longitude: 139.6908,

    latitude: 35.6891,

    height: 35,

    width: 40,

    depth: 40,

    color: '#f1c40f',
  },
]