import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadIndex } from '../lib/traces'
import { PATTERN_TEMPLATES } from '../lib/patterns'
import { useI18n } from '../i18n'
import type { IndexEntry } from '../types'

export default function Home() {
  const { t, tOptional, tList } = useI18n()
  const [entries, setEntries] = useState<IndexEntry[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    loadIndex().then(setEntries).catch(() => setError(true))
  }, [])

  const byPattern = entries.reduce<Record<string, IndexEntry[]>>((acc, e) => {
    ;(acc[e.pattern] ??= []).push(e)
    return acc
  }, {})

  return (
    <>
      <section className="hero">
        <h1>{t('ui.heroTitle')} <em>{t('ui.heroAccent')}</em>.</h1>
        <p>{t('ui.heroText')}</p>
      </section>

      {error && <p className="error">{t('ui.loadError')}</p>}

      {Object.entries(byPattern).map(([slug, list]) => {
        const bullets = tList(`patterns.${slug}.whenToUse`)
        const template = PATTERN_TEMPLATES[slug]
        return (
          <section key={slug} className="pattern-block">
            <div className="pattern-head">
              <h2>{tOptional(`patterns.${slug}.name`) ?? slug}</h2>
              {tOptional(`patterns.${slug}.tagline`) && <p className="tagline">{t(`patterns.${slug}.tagline`)}</p>}
            </div>
            {(bullets.length > 0 || template) && (
              <div className="pattern-grid">
                {bullets.length > 0 && (
                  <div className="card">
                    <h3>{t('ui.whenToUse')}</h3>
                    <ul>{bullets.map((w) => <li key={w}>{w}</li>)}</ul>
                  </div>
                )}
                {template && (
                  <div className="card">
                    <h3>{t('ui.template')}</h3>
                    <pre className="template"><code>{template}</code></pre>
                  </div>
                )}
              </div>
            )}
            <h3 className="list-title">{t('ui.problems')}</h3>
            <ul className="problem-list">
              {list.map((e) => (
                <li key={e.id}>
                  <Link to={`/${e.id}`} className="problem-link">
                    <span>{tOptional(`traces.${e.id}.title`) ?? e.title}</span>
                    <span className="muted">{t('ui.steps', { n: e.steps })}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </>
  )
}
