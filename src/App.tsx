
import {
  useCallback,
  useState,
} from 'react'

import TopBar from './components/TopBar'
import Sidebar from './components/Sidebar'
import CesiumViewer from './components/CesiumViewer'
import CharacterPanel from './components/CharacterPanel'
import FeatureInfoPanel from './components/FeatureInfoPanel'

import type { LayerState } from './components/LayerPanel'
import type { Character } from './types/shinobi'
import type { FeatureInfo } from './components/FeatureInfoPanel'

export default function App() {
  const [sidebarOpen, setSidebarOpen] =
    useState(true)

  const [activeSection, setActiveSection] =
    useState('world')

  const [selectedCharacter, setSelectedCharacter] =
    useState<Character | null>(null)

  const [flyToCharacter, setFlyToCharacter] =
    useState<Character | null>(null)

  const [selectedFeature, setSelectedFeature] =
    useState<FeatureInfo | null>(null)

  const [layers, setLayers] =
    useState<LayerState>({
      borders: true,
      countries: true,
      villages: true,
      rivers: true,
      terrain: false,
      characters: false,
      gisAnalysis: false,
    })

  const handleLayerChange = (
  layer: keyof LayerState,
  enabled: boolean,
) => {
  setLayers((previous) => ({
    ...previous,
    [layer]: enabled,
  }))
}

  /*
   * Character selection.
   */
  const handleCharacterSelect =
    useCallback(
      (character: Character | null) => {
        setSelectedCharacter(character)

        /*
         * Close feature information
         * when selecting a character.
         */
        if (character) {
          setSelectedFeature(null)
          setFlyToCharacter(character)
        }
      },
      [],
    )

  /*
   * Feature selection.
   *
   * Buildings and districts are sent
   * from CesiumViewer.
   */
  const handleFeatureSelect =
    useCallback(
      (feature: FeatureInfo | null) => {
        setSelectedFeature(feature)

        /*
         * Close character panel when
         * selecting a GIS feature.
         */
        if (feature) {
          setSelectedCharacter(null)
          setFlyToCharacter(null)
        }
      },
      [],
    )

  /*
   * Character camera movement completed.
   */
  const handleFlyToComplete =
    useCallback(() => {
      setFlyToCharacter(null)
    }, [])

  /*
   * Close character panel.
   */
  const handleCloseCharacterPanel =
    () => {
      setSelectedCharacter(null)
      setFlyToCharacter(null)
    }

  /*
   * Close feature information panel.
   */
  const handleCloseFeaturePanel =
    () => {
      setSelectedFeature(null)
    }

  return (
    <div className="shinobi-earth">
      <TopBar
        onMenuToggle={() =>
          setSidebarOpen(
            (current) => !current,
          )
        }
      />

      <div className="application-body">
        <Sidebar
          isOpen={sidebarOpen}
          activeSection={activeSection}
          onSectionChange={
            setActiveSection
          }
          layers={layers}
          onLayerChange={
            handleLayerChange
          }
        />

        <main className="map-area">
          <CesiumViewer
            layers={layers}

            onCharacterSelect={
              handleCharacterSelect
            }

            onFeatureSelect={
              handleFeatureSelect
            }

            flyToCharacter={
              flyToCharacter
            }

            onFlyToComplete={
              handleFlyToComplete
            }
          />

          <div className="map-ui">
            <div className="map-location">
              <div className="location-indicator">
                <span />
              </div>

              <div>
                <span className="location-label">
                  CURRENT VIEW
                </span>

                <strong>
                  SHINOBI WORLD
                </strong>
              </div>
            </div>

            <div className="map-mode">
              <span>
                DIGITAL TWIN
              </span>

              <strong>
                3D GLOBE
              </strong>
            </div>

            <div className="map-crosshair">
              <span className="crosshair-horizontal" />
              <span className="crosshair-vertical" />
            </div>

            <div className="map-bottom-bar">
              <div className="map-data-status">
                <span className="data-dot" />

                <span>
                  MAP DATA READY
                </span>
              </div>

              <div className="map-controls">
                <span>
                  DRAG — ROTATE
                </span>

                <span>
                  WHEEL — ZOOM
                </span>

                <span>
                  RIGHT DRAG — TILT
                </span>
              </div>
            </div>
          </div>

          {/*
           * Character information.
           */}
          <CharacterPanel
            character={
              selectedCharacter
            }

            onClose={
              handleCloseCharacterPanel
            }

            onFlyTo={() => {
              if (selectedCharacter) {
                setFlyToCharacter(
                  selectedCharacter,
                )
              }
            }}
          />

          {/*
           * GIS Feature information.
           *
           * Displays Building / District
           * attributes when clicked.
           */}
          <FeatureInfoPanel
            feature={
              selectedFeature
            }

            onClose={
              handleCloseFeaturePanel
            }
          />
        </main>
      </div>
    </div>
  )
}

