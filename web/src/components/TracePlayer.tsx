import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Trace } from '../types'
import ArrayView from './ArrayView'
import CodeView from './CodeView'
import Controls from './Controls'
import VarsView from './VarsView'
import { useI18n } from '../i18n'

const SPEEDS = [0.5, 1, 1.5, 2, 3] as const
const BASE_MS = 1100

export default function TracePlayer({ trace }: { trace: Trace }) {
  const { t, tOptional } = useI18n()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState<number>(1)

  const last = trace.steps.length - 1
  const step = trace.steps[index]

  useEffect(() => {
    setIndex(0)
    setPlaying(false)
  }, [trace.id])

  useEffect(() => {
    if (!playing) return
    if (index >= last) {
      setPlaying(false)
      return
    }
    const id = window.setTimeout(() => setIndex((i) => Math.min(i + 1, last)), BASE_MS / speed)
    return () => window.clearTimeout(id)
  }, [playing, index, last, speed])

  const goTo = useCallback((i: number) => setIndex(Math.max(0, Math.min(last, i))), [last])
  const togglePlay = useCallback(() => {
    if (index >= last) {
      setIndex(0)
      setPlaying(true)
    } else {
      setPlaying((p) => !p)
    }
  }, [index, last])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return
      if (e.key === ' ') { e.preventDefault(); togglePlay() }
      else if (e.key === 'ArrowRight') { setPlaying(false); goTo(index + 1) }
      else if (e.key === 'ArrowLeft') { setPlaying(false); goTo(index - 1) }
      else if (e.key === 'Home') { setPlaying(false); goTo(0) }
      else if (e.key === 'End') { setPlaying(false); goTo(last) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo, index, last, togglePlay])

  const params = useMemo(
    () => Object.entries(trace.input).filter(([k]) => k !== 'array'),
    [trace.input],
  )

  return (
    <section className="player">
      <div className="player-stage">
        <div className="params">
          {params.map(([k, v]) => (
            <span key={k} className="param"><span className="muted">{k} =</span> {String(v)}</span>
          ))}
          <span className="param result">
            <span className="muted">{t('ui.result')} =</span> {index === last ? String(trace.result) : '?'}
          </span>
        </div>

        <ArrayView values={trace.input.array} left={step.left} right={step.right} action={step.action} />

        <div className={`message action-${step.action}`}>
          <span className="action-pill">{t(`actions.${step.action}`)}</span>
          <span>{tOptional(`traces.${trace.id}.steps.${step.key}`, { ...step.vars, ...step.params }) ?? step.key}</span>
        </div>

        <Controls
          index={index}
          last={last}
          playing={playing}
          speed={speed}
          speeds={SPEEDS}
          onSeek={(i) => { setPlaying(false); goTo(i) }}
          onTogglePlay={togglePlay}
          onSpeed={setSpeed}
        />
      </div>

      <aside className="player-side">
        <CodeView snippet={trace.snippet} line={step.line} title={t('ui.reference')} />
        <VarsView vars={step.vars} title={t('ui.variables')} />
      </aside>
    </section>
  )
}
