import { useI18n } from '../i18n'

interface Props {
  index: number
  last: number
  playing: boolean
  speed: number
  speeds: readonly number[]
  onSeek: (i: number) => void
  onTogglePlay: () => void
  onSpeed: (s: number) => void
}

export default function Controls({ index, last, playing, speed, speeds, onSeek, onTogglePlay, onSpeed }: Props) {
  const { t } = useI18n()
  const atEnd = index >= last
  return (
    <div className="controls">
      <div className="buttons">
        <button onClick={() => onSeek(0)} disabled={index === 0} title={t('ui.first')}>⏮</button>
        <button onClick={() => onSeek(index - 1)} disabled={index === 0} title={t('ui.prev')}>◀</button>
        <button className="primary" onClick={onTogglePlay} title={t('ui.playPause')}>
          {playing ? `⏸ ${t('ui.pause')}` : atEnd ? `↻ ${t('ui.replay')}` : `▶ ${t('ui.play')}`}
        </button>
        <button onClick={() => onSeek(index + 1)} disabled={atEnd} title={t('ui.next')}>▶</button>
        <button onClick={() => onSeek(last)} disabled={atEnd} title={t('ui.last')}>⏭</button>
      </div>
      <input
        type="range"
        min={0}
        max={last}
        value={index}
        onChange={(e) => onSeek(Number(e.target.value))}
        aria-label={t('ui.seek')}
      />
      <div className="controls-meta">
        <span className="muted">{t('ui.step', { i: index + 1, n: last + 1 })}</span>
        <label className="speed">
          <span className="muted">{t('ui.speed')}</span>
          <select value={speed} onChange={(e) => onSpeed(Number(e.target.value))}>
            {speeds.map((s) => <option key={s} value={s}>{s}×</option>)}
          </select>
        </label>
      </div>
    </div>
  )
}
