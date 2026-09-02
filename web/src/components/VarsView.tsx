function fmt(v: unknown): string {
  if (v === null || v === undefined) return '—'
  if (typeof v === 'object') {
    const entries = Object.entries(v as Record<string, unknown>)
    return entries.length ? `{ ${entries.map(([k, x]) => `${k}: ${fmt(x)}`).join(', ')} }` : '{ }'
  }
  return String(v)
}

export default function VarsView({ vars }: { vars: Record<string, unknown> }) {
  const entries = Object.entries(vars)
  return (
    <div className="vars-view">
      <div className="panel-title">Variables</div>
      {entries.length === 0 && <p className="muted">—</p>}
      <dl>
        {entries.map(([k, v]) => (
          <div key={k} className="var-row">
            <dt>{k}</dt>
            <dd>{fmt(v)}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
