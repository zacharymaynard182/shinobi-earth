export type Coordinate = [number, number]

export interface Country {
  id: string
  name: string
  shortName: string
  description: string
  color: string
  fillColor: string
  borderColor: string
  coordinates: Coordinate[]
  centerLongitude: number
  centerLatitude: number
}

export interface Village {
  id: string
  name: string
  countryId: string
  countryName: string
  description: string
  longitude: number
  latitude: number
  color: string
}

export interface River {
  id: string
  name: string
  description: string
  color: string
  width: number
  coordinates: Coordinate[]
  centerLongitude: number
  centerLatitude: number
}

export interface Character {
  id: string
  name: string
  villageId: string
  villageName: string
  role: string
  description: string
  longitude: number
  latitude: number
  color: string
}
export interface Building {
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
export interface Character {
  id: string

  name: string

  role: string

  villageId: string

  villageName: string

  description: string

  longitude: number

  latitude: number

  color: string
}

export interface Building {
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