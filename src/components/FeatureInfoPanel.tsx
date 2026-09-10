import type { CSSProperties } from 'react'

export interface FeatureInfo {
  type: string
  name: string

  buildingId?: string
  buildingType?: string

  districtId?: string
  districtName?: string

  villageId?: string
  villageName?: string

  countryId?: string
  countryName?: string

  description?: string

  longitude?: number
  latitude?: number
}

interface FeatureInfoPanelProps {
  feature: FeatureInfo | null
  onClose: () => void
}

const panelStyle: CSSProperties = {
  position: 'absolute',
  top: '72px',
  right: '24px',
  width: '320px',
  maxHeight: 'calc(100vh - 100px)',
  overflowY: 'auto',
  padding: '18px',
  borderRadius: '12px',
  background: 'rgba(15, 20, 26, 0.94)',
  border: '1px solid rgba(255, 255, 255, 0.14)',
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
  color: '#ffffff',
  zIndex: 1000,
  backdropFilter: 'blur(10px)',
}

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px',
}

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: '18px',
  fontWeight: 700,
}

const closeStyle: CSSProperties = {
  border: 'none',
  background: 'transparent',
  color: '#ffffff',
  fontSize: '22px',
  cursor: 'pointer',
  lineHeight: 1,
}

const rowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '110px 1fr',
  gap: '10px',
  padding: '8px 0',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
}

const labelStyle: CSSProperties = {
  color: '#9da7b1',
  fontSize: '12px',
  fontWeight: 600,
  textTransform: 'uppercase',
}

const valueStyle: CSSProperties = {
  color: '#ffffff',
  fontSize: '13px',
  wordBreak: 'break-word',
}

function formatType(type: string) {
  return type
    .split('-')
    .map(
      (part) =>
        part.charAt(0).toUpperCase() +
        part.slice(1),
    )
    .join(' ')
}

function InfoRow({
  label,
  value,
}: {
  label: string
  value?: string | number
}) {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return null
  }

  return (
    <div style={rowStyle}>
      <div style={labelStyle}>
        {label}
      </div>

      <div style={valueStyle}>
        {value}
      </div>
    </div>
  )
}

export default function FeatureInfoPanel({
  feature,
  onClose,
}: FeatureInfoPanelProps) {
  if (!feature) {
    return null
  }

  return (
    <div style={panelStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>
          Feature Information
        </h2>

        <button
          type="button"
          onClick={onClose}
          style={closeStyle}
          aria-label="Close feature information"
        >
          ×
        </button>
      </div>

      <InfoRow
        label="Name"
        value={feature.name}
      />

      <InfoRow
        label="Type"
        value={formatType(feature.type)}
      />

      <InfoRow
        label="Building"
        value={feature.buildingId}
      />

      <InfoRow
        label="Building Type"
        value={feature.buildingType}
      />

      <InfoRow
        label="District"
        value={feature.districtName}
      />

      <InfoRow
        label="District ID"
        value={feature.districtId}
      />

      <InfoRow
        label="Village"
        value={feature.villageName}
      />

      <InfoRow
        label="Country"
        value={feature.countryName}
      />

      <InfoRow
        label="Longitude"
        value={
          feature.longitude !== undefined
            ? feature.longitude.toFixed(6)
            : undefined
        }
      />

      <InfoRow
        label="Latitude"
        value={
          feature.latitude !== undefined
            ? feature.latitude.toFixed(6)
            : undefined
        }
      />

      {feature.description && (
        <div
          style={{
            marginTop: '14px',
          }}
        >
          <div style={labelStyle}>
            Description
          </div>

          <div
            style={{
              marginTop: '6px',
              color: '#d7dde3',
              fontSize: '13px',
              lineHeight: 1.5,
            }}
          >
            {feature.description}
          </div>
        </div>
      )}
    </div>
  )
}