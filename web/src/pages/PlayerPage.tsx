import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadTrace } from '../lib/traces'
import { useI18n } from '../i18n'
import TracePlayer from '../components/TracePlayer'
import type { Trace } from '../types'

export default function PlayerPage() {
  const { pattern, problem } = useParams()
  const { t, tOptional } = useI18n()
  const [trace, setTrace] = useState<Trace | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    setTrace(null)
    setError(false)
    loadTrace(`${pattern}/${problem}`).then(setTrace).catch(() => setError(true))
  }, [pattern, problem])

  if (error) return <p className="error">{t('ui.loadError')} <Link to="/">{t('ui.backHome')}</Link></p>
  if (!trace) return <p className="muted">{t('ui.loading')}</p>

  return (
    <>
      <nav className="crumbs">
        <Link to="/">{t('ui.patterns')}</Link> / <span>{tOptional(`patterns.${trace.pattern}.name`) ?? trace.pattern}</span>
      </nav>
      <h1 className="problem-title">{tOptional(`traces.${trace.id}.title`) ?? trace.title}</h1>
      <p className="problem-statement">{tOptional(`traces.${trace.id}.problem`) ?? trace.problem}</p>
      <TracePlayer trace={trace} />
    </>
  )
}
