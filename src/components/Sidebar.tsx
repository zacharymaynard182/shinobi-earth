import type { LayerState } from './LayerPanel'
import LayerPanel from './LayerPanel'

interface SidebarProps {
  isOpen: boolean
  activeSection: string
  onSectionChange: (section: string) => void
  layers: LayerState
  onLayerChange: (
    layer: keyof LayerState,
    enabled: boolean,
  ) => void
}

interface NavigationItem {
  id: string
  icon: string
  label: string
  description: string
}

const navigationItems: NavigationItem[] = [
  {
    id: 'world',
    icon: '◎',
    label: 'World Map',
    description: 'Global shinobi world',
  },
  {
    id: 'countries',
    icon: '◇',
    label: 'Five Nations',
    description: 'Major countries',
  },
  {
    id: 'villages',
    icon: '⌂',
    label: 'Hidden Villages',
    description: 'Shinobi settlements',
  },
  {
    id: 'rivers',
    icon: '≈',
    label: 'Rivers',
    description: 'Water networks',
  },
  {
    id: 'characters',
    icon: '◉',
    label: 'Characters',
    description: 'Character locations',
  },
]

export default function Sidebar({
  isOpen,
  activeSection,
  onSectionChange,
  layers,
  onLayerChange,
}: SidebarProps) {
  return (
    <aside
      className={`sidebar ${
        isOpen ? 'sidebar-open' : 'sidebar-closed'
      }`}
    >
      <div className="sidebar-scroll">
        <section className="sidebar-section">
          <div className="section-title">
            <span>EXPLORE</span>
          </div>

          <nav className="main-navigation">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={`navigation-item ${
                  activeSection === item.id
                    ? 'navigation-item-active'
                    : ''
                }`}
                onClick={() => onSectionChange(item.id)}
              >
                <span className="navigation-icon">
                  {item.icon}
                </span>

                <span className="navigation-content">
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>

                <span className="navigation-arrow">
                  ›
                </span>
              </button>
            ))}
          </nav>
        </section>

        <section className="sidebar-section">
          <LayerPanel
            layers={layers}
            onLayerChange={onLayerChange}
          />
        </section>

        <section className="sidebar-section world-status-panel">
          <div className="section-title">
            <span>WORLD STATUS</span>
          </div>

          <div className="status-card">
            <div className="status-card-header">
              <span className="status-card-dot" />

              <strong>SHINOBI WORLD</strong>

              <span className="status-live">
                LIVE
              </span>
            </div>

            <div className="status-metrics">
              <div className="metric">
                <span>REGIONS</span>
                <strong>5</strong>
              </div>

              <div className="metric">
                <span>VILLAGES</span>
                <strong>5</strong>
              </div>

              <div className="metric">
                <span>LAYERS</span>
                <strong>
                  {
                    Object.values(layers).filter(Boolean)
                      .length
                  }
                </strong>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="sidebar-footer">
        <div className="engine-status">
          <span className="engine-dot" />

          <div>
            <strong>CESIUM ENGINE</strong>
            <span>3D RENDERING ACTIVE</span>
          </div>
        </div>

        <span className="version">
          v0.1.0
        </span>
      </div>
    </aside>
  )
}