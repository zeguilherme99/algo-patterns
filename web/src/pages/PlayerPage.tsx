import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadTrace } from '../lib/traces'
import { PATTERNS } from '../lib/patterns'
import TracePlayer from '../components/TracePlayer'
import type { Trace } from '../types'

export default function PlayerPage() {
  const { pattern, problem } = useParams()
  const [trace, setTrace] = useState<Trace | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setTrace(null)
    setError(null)
    loadTrace(`${pattern}/${problem}`).then(setTrace).catch((e) => setError(String(e)))
  }, [pattern, problem])

  if (error) return <p className="error">{error} <Link to="/">Back home</Link></p>
  if (!trace) return <p className="muted">Loading…</p>

  return (
    <>
      <nav className="crumbs">
        <Link to="/">Patterns</Link> / <span>{PATTERNS[trace.pattern]?.name ?? trace.pattern}</span>
      </nav>
      <h1 className="problem-title">{trace.title}</h1>
      <p className="problem-statement">{trace.problem}</p>
      <TracePlayer trace={trace} />
    </>
  )
}
