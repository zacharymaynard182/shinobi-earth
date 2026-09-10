export interface LayerState {
  borders: boolean
  villages: boolean
  rivers: boolean
  countries: boolean
  terrain: boolean
  characters: boolean
}

interface LayerPanelProps {
  layers: LayerState
  onLayerChange: (
    layer: keyof LayerState,
    enabled: boolean,
  ) => void
}

interface LayerDefinition {
  id: keyof LayerState
  icon: string
  label: string
  description: string
}

const layerDefinitions: LayerDefinition[] = [
  {
    id: 'borders',
    icon: '◈',
    label: 'Political Borders',
    description: 'Country boundaries',
  },
  {
    id: 'countries',
    icon: '◇',
    label: 'Five Great Nations',
    description: 'Major world regions',
  },
  {
    id: 'villages',
    icon: '⌂',
    label: 'Hidden Villages',
    description: 'Shinobi village locations',
  },
  {
    id: 'rivers',
    icon: '≈',
    label: 'Rivers',
    description: 'Major waterways',
  },
  {
    id: 'terrain',
    icon: '△',
    label: 'Terrain',
    description: '3D world terrain',
  },
  {
    id: 'characters',
    icon: '◉',
    label: 'Characters',
    description: 'Known character locations',
  },
]

export default function LayerPanel({
  layers,
  onLayerChange,
}: LayerPanelProps) {
  return (
    <div className="layer-panel">
      <div className="panel-header">
        <div>
          <span className="panel-kicker">MAP CONFIGURATION</span>
          <h2>WORLD LAYERS</h2>
        </div>

        <span className="layer-count">
          {Object.values(layers).filter(Boolean).length}/
          {layerDefinitions.length}
        </span>
      </div>

      <div className="layer-list">
        {layerDefinitions.map((layer) => (
          <label
            key={layer.id}
            className={`layer-row ${
              layers[layer.id] ? 'enabled' : ''
            }`}
          >
            <div className="layer-icon">
              {layer.icon}
            </div>

            <div className="layer-content">
              <strong>{layer.label}</strong>
              <span>{layer.description}</span>
            </div>

            <input
              type="checkbox"
              checked={layers[layer.id]}
              onChange={(event) =>
                onLayerChange(
                  layer.id,
                  event.target.checked,
                )
              }
            />

            <span className="custom-checkbox">
              {layers[layer.id] ? '✓' : ''}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}