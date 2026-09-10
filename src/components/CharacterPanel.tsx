import type { Character } from '../types/shinobi'

interface CharacterPanelProps {
  character: Character | null
  onClose: () => void
  onFlyTo: () => void
}

export default function CharacterPanel({
  character,
  onClose,
  onFlyTo,
}: CharacterPanelProps) {
  if (!character) {
    return null
  }

  return (
    <aside className="character-panel">
      <div className="character-panel-header">
        <div>
          <span className="character-panel-kicker">
            SHINOBI PROFILE
          </span>

          <h2>CHARACTER</h2>
        </div>

        <button
          type="button"
          className="character-panel-close"
          onClick={onClose}
          aria-label="Close character panel"
        >
          ×
        </button>
      </div>

      <div className="character-identity">
        <div
          className="character-avatar"
          style={{
            borderColor: character.color,
            boxShadow: `0 0 18px ${character.color}33`,
          }}
        >
          <span
            style={{
              background: character.color,
            }}
          />
        </div>

        <div className="character-name-block">
          <h3>{character.name}</h3>

          <span>{character.role}</span>
        </div>
      </div>

      <div className="character-status">
        <span className="character-status-dot" />

        <span>SPATIAL OBJECT ACTIVE</span>
      </div>

      <div className="character-details">
        <div className="character-detail">
          <span>VILLAGE</span>

          <strong>{character.villageName}</strong>
        </div>

        <div className="character-detail">
          <span>VILLAGE ID</span>

          <strong>{character.villageId}</strong>
        </div>

        <div className="character-detail">
          <span>CHARACTER ID</span>

          <strong>{character.id}</strong>
        </div>
      </div>

      <div className="character-description">
        <span>DESCRIPTION</span>

        <p>{character.description}</p>
      </div>

      <div className="character-coordinates">
        <div>
          <span>LONGITUDE</span>

          <strong>
            {character.longitude.toFixed(5)}°
          </strong>
        </div>

        <div>
          <span>LATITUDE</span>

          <strong>
            {character.latitude.toFixed(5)}°
          </strong>
        </div>
      </div>

      <button
        type="button"
        className="character-fly-button"
        onClick={onFlyTo}
      >
        <span>◎</span>

        FLY TO CHARACTER
      </button>

      <div className="character-panel-footer">
        CESIUM SPATIAL ENTITY
      </div>
    </aside>
  )
}