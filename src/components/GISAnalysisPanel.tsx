import {
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import {
  getGISAnalysisMetrics,
  type GISAnalysisMetrics,
} from './GISAnalysisLayer'

interface AnalysisMetricProps {
  label: string
  value: string | number
  detail?: string
}

interface GISAnalysisPanelProps {
  visible: boolean
}

function AnalysisMetric({
  label,
  value,
  detail,
}: AnalysisMetricProps) {
  return (
    <div className="gis-analysis-metric">
      <div className="gis-analysis-metric-label">
        {label}
      </div>

      <div className="gis-analysis-metric-value">
        {value}
      </div>

      {detail && (
        <div className="gis-analysis-metric-detail">
          {detail}
        </div>
      )}
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="gis-analysis-section">
      <div className="gis-analysis-section-title">
        {title}
      </div>

      {children}
    </section>
  )
}

export default function GISAnalysisPanel({
  visible,
}: GISAnalysisPanelProps) {
  const [metrics, setMetrics] =
    useState<GISAnalysisMetrics>(
      getGISAnalysisMetrics(),
    )

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(
        getGISAnalysisMetrics(),
      )
    }

    updateMetrics()

    window.addEventListener(
      'shinobi-earth:gis-analysis-updated',
      updateMetrics,
    )

    return () => {
      window.removeEventListener(
        'shinobi-earth:gis-analysis-updated',
        updateMetrics,
      )
    }
  }, [])

  if (!visible) {
    return null
  }

  const {
        totalBuildings,
        densityCells,
        highDensityCells,
        mediumDensityCells,
        lowDensityCells,
        riverBuffer100,
        riverBuffer250,
        riverOutside250,
        closestBuildingDistance,
        mountainForestCells,
    } = metrics

  return (
    <aside className="gis-analysis-panel">
      <div className="gis-analysis-header">
        <div>
          <span className="gis-analysis-kicker">
            SPATIAL INTELLIGENCE
          </span>

          <h2>GIS ANALYSIS</h2>
        </div>

        <span className="gis-analysis-status">
          LIVE
        </span>
      </div>

      <div className="gis-analysis-subtitle">
        Konoha Digital Twin
      </div>

      <Section title="BUILDING ANALYSIS">
        <div className="gis-analysis-grid">
          <AnalysisMetric
            label="Buildings"
            value={totalBuildings}
            detail="mapped structures"
          />

          <AnalysisMetric
            label="Grid"
            value={densityCells}
            detail="active 250m cells"
          />
        </div>

        <div className="gis-analysis-density">
          <div className="density-row">
            <span>
              <i className="density-dot high" />
              HIGH
            </span>

            <strong>
              {highDensityCells}
            </strong>
          </div>

          <div className="density-row">
            <span>
              <i className="density-dot medium" />
              MEDIUM
            </span>

            <strong>
              {mediumDensityCells}
            </strong>
          </div>

          <div className="density-row">
            <span>
              <i className="density-dot low" />
              LOW
            </span>

            <strong>
              {lowDensityCells}
            </strong>
          </div>
        </div>
      </Section>

      <Section title="RIVER ANALYSIS">
        <div className="gis-analysis-grid">
          <AnalysisMetric
            label="100m Buffer"
            value={riverBuffer100}
            detail="analysis segments"
          />

          <AnalysisMetric
            label="250m Buffer"
            value={riverBuffer250}
            detail="analysis segments"
          />
        </div>

        <div className="analysis-bar-row">
          <span>100 m</span>

          <div className="analysis-bar">
            <div
              className="analysis-bar-fill river-100"
              style={{
                width: `${Math.min(
                  riverBuffer100 * 10,
                  100,
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="analysis-bar-row">
          <span>250 m</span>

          <div className="analysis-bar">
            <div
              className="analysis-bar-fill river-250"
              style={{
                width: `${Math.min(
                  riverBuffer250 * 10,
                  100,
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="analysis-section">
            <div className="analysis-section-title">
                RIVER PROXIMITY
            </div>

            <div className="analysis-metric">
                <span>0–100m</span>
                <strong>{riverBuffer100}</strong>
            </div>

            <div className="analysis-metric">
                <span>100–250m</span>
                <strong>{riverBuffer250}</strong>
            </div>

            <div className="analysis-metric">
                <span>Outside 250m</span>
                <strong>{riverOutside250}</strong>
            </div>

            <div className="analysis-metric">
                <span>Closest Building</span>
                <strong>{closestBuildingDistance}m</strong>
            </div>
            </div>
      </Section>

      <Section title="TERRAIN / FOREST">
        <AnalysisMetric
          label="Mountain / Forest Transition"
          value={mountainForestCells}
          detail="500m analysis cells"
        />

        <div className="transition-status">
          <span className="transition-indicator" />

          <div>
            <strong>
              TRANSITION ZONE
            </strong>

            <small>
              Mountain → foothill → forest
            </small>
          </div>
        </div>
      </Section>

      <Section title="OPERATIONAL ZONES">
        <div className="zone-list">
          <div className="zone-item">
            <span className="zone-marker core" />

            <div>
              <strong>
                KONOHA CORE
              </strong>

              <small>
                900m × 900m
              </small>
            </div>
          </div>

          <div className="zone-item">
            <span className="zone-marker operational" />

            <div>
              <strong>
                OPERATIONAL BUFFER
              </strong>

              <small>
                1.4km × 1.2km
              </small>
            </div>
          </div>
        </div>
      </Section>

      <div className="gis-analysis-footer">
        <span className="analysis-pulse" />

        Spatial analysis active
      </div>
    </aside>
  )
}