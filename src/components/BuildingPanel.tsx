import type { Building } from '../types/shinobi'

interface BuildingPanelProps {
  building: Building | null

  onClose: () => void
}

export default function BuildingPanel({
  building,
  onClose,
}: BuildingPanelProps) {
  if (!building) {
    return null
  }

  return (
    <aside className="building-panel">
      <div className="building-panel-header">
        <div>
          <span className="panel-kicker">
            BUILDING
          </span>

          <h2>{building.name}</h2>
        </div>

        <button
          className="building-close"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="building-section">
        <span>Village</span>
        <strong>{building.villageId}</strong>
      </div>

      <div className="building-section">
        <span>Type</span>
        <strong>{building.type}</strong>
      </div>

      <div className="building-section">
        <span>Height</span>
        <strong>{building.height} m</strong>
      </div>

      <div className="building-section">
        <span>Description</span>

        <p>{building.description}</p>
      </div>

      <div className="building-footer">
        DIGITAL TWIN
      </div>
    </aside>
  )
}