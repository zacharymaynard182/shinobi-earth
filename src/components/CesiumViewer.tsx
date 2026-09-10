
import { useEffect, useRef } from 'react'

import {
  Cartesian2,
  Cartesian3,
  Color,
  createWorldTerrainAsync,
  Entity,
  HeadingPitchRange,
  HeightReference,
  Ion,
  JulianDate,
  LabelStyle,
  Math as CesiumMath,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  VerticalOrigin,
  Viewer,
} from 'cesium'

import type { LayerState } from './LayerPanel'

import type { Character } from '../types/shinobi'
import type { FeatureInfo } from './FeatureInfoPanel'

import { countries } from '../data/countries'
import { villages } from '../data/villages'
import { characters } from '../data/characters'

import { createBuildings } from './BuildingBuilder'
import { createTerrain } from './TerrainBuilder'
import { createRoads } from './RoadBuilder'
import { createForest } from './ForestBuilder'
import { createDistricts } from './DistrictBuilder'
import { createRivers } from './RiverBuilder'

import {
  createGISAnalysisLayer,
  setGISAnalysisVisibility,
} from './GISAnalysisLayer'

interface CesiumViewerProps {
  layers: LayerState

  onCharacterSelect?: (
    character: Character | null,
  ) => void

  onFeatureSelect?: (
    feature: FeatureInfo | null,
  ) => void

  flyToCharacter?: Character | null

  onFlyToComplete?: () => void
}

/*
 * Safely read an Entity property.
 */
function getEntityProperty(
  entity: Entity,
  name: string,
): unknown {
  const properties = entity.properties

  if (!properties) {
    return undefined
  }

  const propertyBag =
    properties as unknown as {
      getProperty?: (
        propertyName: string,
      ) => unknown

      getValue?: (
        time?: JulianDate,
      ) => Record<string, unknown>
    }

  if (
    typeof propertyBag.getValue ===
    'function'
  ) {
    const values =
      propertyBag.getValue(
        JulianDate.now(),
      )

    if (
      values &&
      typeof values === 'object' &&
      name in values
    ) {
      return values[name]
    }
  }

  if (
    typeof propertyBag.getProperty ===
    'function'
  ) {
    const property =
      propertyBag.getProperty(name)

    if (
      property &&
      typeof property === 'object'
    ) {
      const possibleProperty =
        property as {
          getValue?: (
            time?: JulianDate,
          ) => unknown
        }

      if (
        typeof possibleProperty.getValue ===
        'function'
      ) {
        return possibleProperty.getValue(
          JulianDate.now(),
        )
      }
    }

    return property
  }

  if (
    typeof properties === 'object' &&
    properties !== null &&
    name in properties
  ) {
    return (
      properties as unknown as Record<
        string,
        unknown
      >
    )[name]
  }

  return undefined
}

/*
 * Safely determine Entity type.
 */
function getEntityType(
  entity: Entity,
): string | undefined {
  const type = getEntityProperty(
    entity,
    'type',
  )

  return typeof type === 'string'
    ? type
    : undefined
}

/*
 * Move coordinate by meters.
 */
function offsetCoordinate(
  longitude: number,
  latitude: number,
  east: number,
  north: number,
): [number, number] {
  const latitudeOffset =
    north / 111000

  const longitudeOffset =
    east /
    (111000 *
      Math.cos(
        CesiumMath.toRadians(latitude),
      ))

  return [
    longitude + longitudeOffset,
    latitude + latitudeOffset,
  ]
}

/*
 * Create a simple 3D building.
 */
function createBuilding(
  viewer: Viewer,
  longitude: number,
  latitude: number,
  height: number,
  width: number,
  depth: number,
  color: Color,
  name: string,
) {
  viewer.entities.add({
    name,

    position: Cartesian3.fromDegrees(
      longitude,
      latitude,
      height / 2,
    ),

    box: {
      dimensions: new Cartesian3(
        width,
        depth,
        height,
      ),

      material: color,

      heightReference:
        HeightReference.RELATIVE_TO_GROUND,
    },

    properties: {
      type: 'building',
    },
  })
}

/*
 * Create a village gate.
 */
function createVillageGate(
  viewer: Viewer,
  longitude: number,
  latitude: number,
  color: Color,
  villageName: string,
) {
  const gateCenter = offsetCoordinate(
    longitude,
    latitude,
    0,
    -350,
  )

  const left = offsetCoordinate(
    gateCenter[0],
    gateCenter[1],
    -45,
    0,
  )

  const right = offsetCoordinate(
    gateCenter[0],
    gateCenter[1],
    45,
    0,
  )

  /*
   * Gate body.
   */
  viewer.entities.add({
    name: `${villageName} Gate`,

    position: Cartesian3.fromDegrees(
      gateCenter[0],
      gateCenter[1],
      65,
    ),

    box: {
      dimensions: new Cartesian3(
        110,
        45,
        130,
      ),

      material: color.withAlpha(0.9),

      heightReference:
        HeightReference.RELATIVE_TO_GROUND,
    },

    properties: {
      type: 'village-gate',
    },
  })

  /*
   * Left gate pillar.
   */
  viewer.entities.add({
    name: `${villageName} Gate Left`,

    position: Cartesian3.fromDegrees(
      left[0],
      left[1],
      95,
    ),

    cylinder: {
      length: 190,

      topRadius: 10,

      bottomRadius: 14,

      material: color,

      heightReference:
        HeightReference.RELATIVE_TO_GROUND,
    },

    properties: {
      type: 'village-gate',
    },
  })

  /*
   * Right gate pillar.
   */
  viewer.entities.add({
    name: `${villageName} Gate Right`,

    position: Cartesian3.fromDegrees(
      right[0],
      right[1],
      95,
    ),

    cylinder: {
      length: 190,

      topRadius: 10,

      bottomRadius: 14,

      material: color,

      heightReference:
        HeightReference.RELATIVE_TO_GROUND,
    },

    properties: {
      type: 'village-gate',
    },
  })
}

/*
 * Create village digital twin.
 */
function createVillageTwin(
  viewer: Viewer,
  village: (typeof villages)[number],
) {
  const {
    longitude,
    latitude,
    color,
    name,
  } = village

  const villageColor =
    Color.fromCssColorString(color)

  /*
   * Central tower.
   */
  viewer.entities.add({
    name: `${name} Central Tower`,

    position: Cartesian3.fromDegrees(
      longitude,
      latitude,
      70,
    ),

    box: {
      dimensions: new Cartesian3(
        110,
        110,
        140,
      ),

      material: villageColor.withAlpha(
        0.92,
      ),

      heightReference:
        HeightReference.RELATIVE_TO_GROUND,
    },

    properties: {
      type: 'village-building',

      villageId: village.id,
    },
  })

  /*
   * Tower roof.
   */
  viewer.entities.add({
    name: `${name} Tower Roof`,

    position: Cartesian3.fromDegrees(
      longitude,
      latitude,
      150,
    ),

    cylinder: {
      length: 20,

      topRadius: 75,

      bottomRadius: 55,

      material:
        villageColor.withAlpha(
          0.95,
        ),

      heightReference:
        HeightReference.RELATIVE_TO_GROUND,
    },

    properties: {
      type: 'village-building',

      villageId: village.id,
    },
  })

  /*
   * Residential buildings.
   */
  const buildingPositions = [
    [160, 120, 34],
    [-160, 120, 42],
    [170, -120, 38],
    [-170, -120, 32],
    [80, 210, 30],
    [-80, 210, 36],
    [80, -210, 42],
    [-80, -210, 34],
  ] as const

  buildingPositions.forEach(
    ([east, north, height], index) => {
      const position =
        offsetCoordinate(
          longitude,
          latitude,
          east,
          north,
        )

      createBuilding(
        viewer,
        position[0],
        position[1],
        height,
        65,
        65,
        villageColor.withAlpha(
          0.8,
        ),
        `${name} Building ${index + 1}`,
      )
    },
  )

  /*
   * Village gate.
   */
  createVillageGate(
    viewer,
    longitude,
    latitude,
    villageColor,
    name,
  )

  /*
   * Village marker and label.
   */
  viewer.entities.add({
    name,

    position: Cartesian3.fromDegrees(
      longitude,
      latitude,
      180,
    ),

    point: {
      pixelSize: 16,

      color: villageColor,

      outlineColor: Color.WHITE,

      outlineWidth: 2,

      heightReference:
        HeightReference.RELATIVE_TO_GROUND,
    },

    label: {
      text: name,

      font: 'bold 16px sans-serif',

      fillColor: Color.WHITE,

      outlineColor: Color.BLACK,

      outlineWidth: 4,

      style:
        LabelStyle.FILL_AND_OUTLINE,

      verticalOrigin:
        VerticalOrigin.BOTTOM,

      pixelOffset: new Cartesian2(
        0,
        -18,
      ),

      heightReference:
        HeightReference.RELATIVE_TO_GROUND,
    },

    properties: {
      type: 'village',

      villageId: village.id,

      villageName: village.name,

      countryId:
        village.countryId,

      countryName:
        village.countryName,

      description:
        village.description,
    },
  })
}

/*
 * Create country polygons.
 */
function createCountryEntities(
  viewer: Viewer,
) {
  countries.forEach((country) => {
    const positions =
      Cartesian3.fromDegreesArray(
        country.coordinates.flat(),
      )

    viewer.entities.add({
      name: country.name,

      polygon: {
        hierarchy: positions,

        material:
          Color.fromCssColorString(
            country.fillColor,
          ).withAlpha(0.16),

        outline: true,

        outlineColor:
          Color.fromCssColorString(
            country.borderColor,
          ),

        height: 0,

        extrudedHeight: 1200,
      },

      properties: {
        type: 'country',

        countryId: country.id,

        countryName:
          country.name,

        description:
          country.description,
      },
    })
  })
}

/*
 * Create character entity.
 */
function createCharacterEntity(
  viewer: Viewer,
  character: (typeof characters)[number],
) {
  const color =
    Color.fromCssColorString(
      character.color,
    )

  /*
   * Character pin.
   */
  viewer.entities.add({
    name: `${character.name} Pin`,

    position: Cartesian3.fromDegrees(
      character.longitude,
      character.latitude,
      55,
    ),

    cylinder: {
      length: 110,

      topRadius: 3,

      bottomRadius: 8,

      material:
        color.withAlpha(0.8),

      heightReference:
        HeightReference.RELATIVE_TO_GROUND,
    },

    properties: {
      type: 'character-pin',

      characterId:
        character.id,
    },
  })

  /*
   * Character point and label.
   */
  viewer.entities.add({
    name: character.name,

    position: Cartesian3.fromDegrees(
      character.longitude,
      character.latitude,
      120,
    ),

    point: {
      pixelSize: 18,

      color,

      outlineColor: Color.WHITE,

      outlineWidth: 3,

      heightReference:
        HeightReference.RELATIVE_TO_GROUND,
    },

    label: {
      text: character.name,

      font: 'bold 15px sans-serif',

      fillColor: Color.WHITE,

      outlineColor: Color.BLACK,

      outlineWidth: 4,

      style:
        LabelStyle.FILL_AND_OUTLINE,

      verticalOrigin:
        VerticalOrigin.BOTTOM,

      pixelOffset: new Cartesian2(
        0,
        -22,
      ),

      heightReference:
        HeightReference.RELATIVE_TO_GROUND,
    },

    properties: {
      type: 'character',

      characterId:
        character.id,

      characterName:
        character.name,

      role: character.role,

      villageId:
        character.villageId,

      villageName:
        character.villageName,

      description:
        character.description,

      longitude:
        character.longitude,

      latitude:
        character.latitude,
    },
  })
}

export default function CesiumViewer({
  layers,
  onCharacterSelect,
  onFeatureSelect,
  flyToCharacter,
  onFlyToComplete,
}: CesiumViewerProps) {
  const containerRef =
    useRef<HTMLDivElement | null>(
      null,
    )

  const viewerRef =
    useRef<Viewer | null>(null)

  const worldTerrainRef =
    useRef<
      Awaited<
        ReturnType<
          typeof createWorldTerrainAsync
        >
      > | null
    >(null)

  const ellipsoidTerrainRef =
    useRef<
      Viewer['terrainProvider'] | null
    >(null)

  /*
   * Initialize Cesium.
   */
  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const token =
      import.meta.env
        .VITE_CESIUM_ION_TOKEN

    if (token) {
      Ion.defaultAccessToken = token
    }

    let destroyed = false

    const viewer = new Viewer(
      containerRef.current,
      {
        animation: false,

        timeline: false,

        baseLayer: false,

        baseLayerPicker: false,

        geocoder: false,

        homeButton: false,

        sceneModePicker: false,

        navigationHelpButton: false,

        fullscreenButton: false,

        infoBox: false,

        selectionIndicator: false,

        shouldAnimate: true,
      },
    )

    viewerRef.current = viewer

    /*
     * IMPORTANT:
     *
     * Temporarily disable terrain depth testing.
     * This prevents procedural forest entities
     * from being hidden by terrain geometry.
     */
    viewer.scene.globe.depthTestAgainstTerrain =
      false

    /*
     * Initial Konoha camera.
     */
    viewer.camera.setView({
      destination:
        Cartesian3.fromDegrees(
          140.2,
          34.7,
          8000,
        ),

      orientation: {
        heading: 0,

        pitch:
          CesiumMath.toRadians(-45),

        roll: 0,
      },
    })

    /*
     * Countries.
     */
    createCountryEntities(viewer)

    /*
     * Procedural terrain.
     */
    createTerrain(viewer)

    /*
     * Roads.
     */
    createRoads(viewer)

    /*
     * Forest.
     */
    createForest(viewer)

    /*
     * Forest diagnostic.
     */
    const forestEntities =
      viewer.entities.values.filter(
        (entity) =>
          getEntityType(entity) ===
          'forest',
      )

    console.log(
      'FOREST ENTITIES:',
      forestEntities.length,
    )

    /*
     * Find debug forest crown.
     */
    const debugTree =
      viewer.entities.getById(
        'debug-forest-crown',
      )

    console.log(
      'DEBUG TREE ENTITY:',
      debugTree,
    )

    /*
     * Force debug tree visible and
     * fly directly to it.
     */
    if (debugTree) {
      debugTree.show = true

      viewer.scene.globe.depthTestAgainstTerrain =
        false

      void viewer.flyTo(
        debugTree,
        {
          duration: 1.5,

          offset:
            new HeadingPitchRange(
              0,

              CesiumMath.toRadians(
                -45,
              ),

              1500,
            ),
        },
      )
    }

    /*
     * Districts.
     */
    createDistricts(viewer)
    createGISAnalysisLayer(viewer)
    setGISAnalysisVisibility(viewer, false)

    /*
     * Villages.
     */
    villages.forEach(
      (village) => {
        createVillageTwin(
          viewer,
          village,
        )
      },
    )

    /*
     * Rivers.
     */
    createRivers(viewer)

    /*
     * Characters.
     */
    characters.forEach(
      (character) => {
        createCharacterEntity(
          viewer,
          character,
        )
      },
    )

    /*
     * Buildings.
     */
    createBuildings(viewer)

    /*
     * Mouse interaction.
     */
    const handler =
      new ScreenSpaceEventHandler(
        viewer.scene.canvas,
      )

    /*
     * LEFT CLICK.
     */
    handler.setInputAction(
      (movement: {
        position: Cartesian2
      }) => {
        const picked =
          viewer.scene.pick(
            movement.position,
          )

        if (!picked) {
          return
        }

        const entity =
          picked.id instanceof Entity
            ? picked.id
            : undefined

        if (!entity) {
          return
        }

        const type =
          getEntityType(entity)

        /*
         * CHARACTER CLICK.
         */
        if (
          type === 'character'
        ) {
          const characterId =
            getEntityProperty(
              entity,
              'characterId',
            )

          const character =
            characters.find(
              (item) =>
                item.id ===
                characterId,
            )

          if (character) {
            onCharacterSelect?.(
              character,
            )
          }

          return
        }

        /*
         * VILLAGE CLICK.
         */
        if (
          type === 'village'
        ) {
          const villageId =
            getEntityProperty(
              entity,
              'villageId',
            )

          const village =
            villages.find(
              (item) =>
                item.id ===
                villageId,
            )

          if (village) {
            viewer.camera.flyTo({
              destination:
                Cartesian3.fromDegrees(
                  village.longitude,
                  village.latitude,
                  5000,
                ),

              duration: 1.5,
            })
          }

          return
        }

        /*
         * COUNTRY CLICK.
         */
        if (
          type === 'country'
        ) {
          const countryId =
            getEntityProperty(
              entity,
              'countryId',
            )

          const country =
            countries.find(
              (item) =>
                item.id ===
                countryId,
            )

          if (country) {
            viewer.camera.flyTo({
              destination:
                Cartesian3.fromDegrees(
                  country.centerLongitude,
                  country.centerLatitude,
                  700000,
                ),

              duration: 1.5,
            })
          }

          return
        }

        /*
         * BUILDING CLICK.
         */
        if (
          type === 'building'
        ) {
          const feature: FeatureInfo = {
            type: 'building',

            name:
              String(
                getEntityProperty(
                  entity,
                  'buildingName',
                ) ??
                  entity.name ??
                  'Building',
              ),

            buildingId:
              getEntityProperty(
                entity,
                'buildingId',
              ) as string | undefined,

            buildingType:
              getEntityProperty(
                entity,
                'buildingType',
              ) as string | undefined,

            districtId:
              getEntityProperty(
                entity,
                'districtId',
              ) as string | undefined,

            districtName:
              getEntityProperty(
                entity,
                'districtName',
              ) as string | undefined,

            longitude:
              getEntityProperty(
                entity,
                'longitude',
              ) as number | undefined,

            latitude:
              getEntityProperty(
                entity,
                'latitude',
              ) as number | undefined,
          }

          onFeatureSelect?.(
            feature,
          )

          return
        }

        /*
         * DISTRICT CLICK.
         */
        if (
          type === 'district'
        ) {
          const feature: FeatureInfo = {
            type: 'district',

            name:
              String(
                getEntityProperty(
                  entity,
                  'districtName',
                ) ??
                  entity.name ??
                  'District',
              ),

            districtId:
              getEntityProperty(
                entity,
                'districtId',
              ) as string | undefined,

            districtName:
              getEntityProperty(
                entity,
                'districtName',
              ) as string | undefined,

            description:
              getEntityProperty(
                entity,
                'description',
              ) as string | undefined,
          }

          onFeatureSelect?.(
            feature,
          )

          return
        }
      },

      ScreenSpaceEventType.LEFT_CLICK,
    )

    /*
     * DOUBLE CLICK
     *
     * Return to world overview.
     */
    handler.setInputAction(
      () => {
        viewer.camera.flyTo({
          destination:
            Cartesian3.fromDegrees(
              138,
              37,
              3200000,
            ),

          duration: 1.2,
        })
      },

      ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
    )

    /*
     * Load Cesium World Terrain.
     */
    const loadTerrain =
      async () => {
        try {
          const terrain =
            await createWorldTerrainAsync()

          if (destroyed) {
            return
          }

          worldTerrainRef.current =
            terrain

          ellipsoidTerrainRef.current =
            viewer.terrainProvider

          if (
            layers.terrain &&
            !destroyed
          ) {
            viewer.terrainProvider =
              terrain

            viewer.scene.globe.show =
              true
          }
        } catch (error) {
          if (!destroyed) {
            console.error(
              'Failed to load Cesium World Terrain',
              error,
            )
          }
        }
      }

    void loadTerrain()

    /*
     * Cleanup.
     */
    return () => {
      destroyed = true

      handler.destroy()

      worldTerrainRef.current =
        null

      ellipsoidTerrainRef.current =
        null

      viewerRef.current =
        null

      if (
        !viewer.isDestroyed()
      ) {
        viewer.destroy()
      }
    }
  }, [onCharacterSelect])

  /*
   * Layer visibility.
   */
  useEffect(() => {
    const viewer =
      viewerRef.current

    if (!viewer) {
      return
    }

    viewer.entities.values.forEach(
      (entity) => {
        const type =
          getEntityType(entity)

        switch (type) {
          /*
           * Countries.
           */
          case 'country':
            entity.show =
              layers.countries
            break

          /*
           * Villages and buildings.
           */
          case 'village':
          case 'village-building':
          case 'building':
          case 'village-gate':
            entity.show =
              layers.villages
            break

          /*
           * Rivers.
           */
          case 'river':
            entity.show =
              layers.rivers
            break

          /*
           * Characters.
           */
          case 'character':
          case 'character-pin':
            entity.show =
              layers.characters
            break

          /*
           * Roads.
           */
          case 'road':
          case 'road-marker':
            entity.show =
              layers.villages
            break

          /*
           * Forest.
           *
           * Force ON for debugging.
           */
          case 'forest':
            entity.show = true
            break

          /*
           * Districts.
           */
          case 'district':
            entity.show =
              layers.villages
            break

          /*
           * Unknown entities.
           */
          default:
            break
        }
      },
    )
  }, [layers])

  /*
   * Terrain ON/OFF.
   */
  useEffect(() => {
    const viewer =
      viewerRef.current

    if (!viewer) {
      return
    }

    const terrain =
      worldTerrainRef.current

    /*
     * World Terrain ON.
     */
    if (
      layers.terrain &&
      terrain
    ) {
      viewer.terrainProvider =
        terrain

      return
    }

    /*
     * World Terrain OFF.
     */
    if (
      ellipsoidTerrainRef.current
    ) {
      viewer.terrainProvider =
        ellipsoidTerrainRef.current
    }
  }, [layers.terrain])

  /*
   * Fly to selected character.
   */
  useEffect(() => {
    const viewer =
      viewerRef.current

    if (
      !viewer ||
      !flyToCharacter
    ) {
      return
    }

    viewer.camera.flyTo({
      destination:
        Cartesian3.fromDegrees(
          flyToCharacter.longitude,
          flyToCharacter.latitude,
          900,
        ),

      orientation: {
        heading: 0,

        pitch:
          CesiumMath.toRadians(-65),

        roll: 0,
      },

      duration: 1.5,

      complete: () => {
        onFlyToComplete?.()
      },
    })
  }, [
    flyToCharacter,
    onFlyToComplete,
  ])

    /*
   * GIS Analysis ON/OFF.
   */
  useEffect(() => {
    const viewer = viewerRef.current

    if (!viewer) {
      return
    }

    setGISAnalysisVisibility(
      viewer,
      layers.gisAnalysis,
    )
  }, [layers.gisAnalysis])

  return (
    <div
      ref={containerRef}
      className="cesium-container"
    />
  )
}

