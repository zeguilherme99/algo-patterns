import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadIndex } from '../lib/traces'
import { PATTERNS } from '../lib/patterns'
import type { IndexEntry } from '../types'

export default function Home() {
  const [entries, setEntries] = useState<IndexEntry[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadIndex().then(setEntries).catch((e) => setError(String(e)))
  }, [])

  const byPattern = entries.reduce<Record<string, IndexEntry[]>>((acc, e) => {
    ;(acc[e.pattern] ??= []).push(e)
    return acc
  }, {})

  return (
    <>
      <section className="hero">
        <h1>Algorithm patterns, <em>step by step</em>.</h1>
        <p>
          Pick a problem, press play, and watch the pointers move while the code that drives them lights up.
          Then clone the repo and solve the same problems yourself in Java.
        </p>
      </section>

      {error && <p className="error">{error}</p>}

      {Object.entries(byPattern).map(([slug, list]) => {
        const info = PATTERNS[slug]
        return (
          <section key={slug} className="pattern-block">
            <div className="pattern-head">
              <h2>{info?.name ?? slug}</h2>
              {info && <p className="tagline">{info.tagline}</p>}
            </div>
            {info && (
              <div className="pattern-grid">
                <div className="card">
                  <h3>When to reach for it</h3>
                  <ul>
                    {info.whenToUse.map((w) => <li key={w}>{w}</li>)}
                  </ul>
                </div>
                <div className="card">
                  <h3>Template</h3>
                  <pre className="template"><code>{info.template}</code></pre>
                </div>
              </div>
            )}
            <h3 className="list-title">Problems</h3>
            <ul className="problem-list">
              {list.map((e) => (
                <li key={e.id}>
                  <Link to={`/${e.id}`} className="problem-link">
                    <span>{e.title}</span>
                    <span className="muted">{e.steps} steps →</span>
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
