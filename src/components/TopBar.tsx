interface TopBarProps {
  onMenuToggle: () => void
}

export default function TopBar({
  onMenuToggle,
}: TopBarProps) {
  return (
    <header className="top-bar">
      <button
        type="button"
        className="menu-button"
        onClick={onMenuToggle}
        aria-label="Toggle sidebar"
      >
        <span />
        <span />
        <span />
      </button>

      <div className="brand-area">
        <div className="brand-mark">
          ◈
        </div>

        <div className="brand-text">
          <strong>SHINOBI EARTH</strong>

          <span>
            DIGITAL TWIN
          </span>
        </div>
      </div>

      <div className="top-bar-spacer" />

      <div className="world-status">
        <span className="status-dot" />

        <span>
          WORLD ONLINE
        </span>
      </div>

      <button
        type="button"
        className="top-bar-icon"
        aria-label="Search"
      >
        ⌕
      </button>

      <button
        type="button"
        className="top-bar-icon"
        aria-label="Settings"
      >
        ⚙
      </button>

      <div className="observer">
        <span className="observer-indicator" />

        <div>
          <strong>OBSERVER</strong>

          <span>
            GIS SYSTEM
          </span>
        </div>
      </div>
    </header>
  )
}