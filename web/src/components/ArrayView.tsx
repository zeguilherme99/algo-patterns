import type { Action } from '../types'

const CELL = 56
const GAP = 8

interface Props {
  values: (number | string)[]
  left: number
  right: number
  action: Action
}

export default function ArrayView({ values, left, right, action }: Props) {
  const active = left >= 0 && right >= 0 && right >= left
  const x = (i: number) => i * (CELL + GAP)
  const windowStyle = active
    ? { left: x(left), width: (right - left + 1) * CELL + (right - left) * GAP, opacity: 1 }
    : { left: 0, width: CELL, opacity: 0 }

  return (
    <div className="array-view" style={{ ['--cell' as string]: `${CELL}px`, ['--gap' as string]: `${GAP}px` }}>
      <div className="indices">
        {values.map((_, i) => <span key={i} className="index">{i}</span>)}
      </div>
      <div className="cells">
        <div className={`window action-${action}`} style={windowStyle} aria-hidden />
        {values.map((v, i) => {
          const inWindow = active && i >= left && i <= right
          return (
            <div key={i} className={`cell${inWindow ? ' in-window' : ''}`}>
              {String(v)}
            </div>
          )
        })}
      </div>
      <div className="pointers">
        <span className={`pointer pointer-left${active ? '' : ' hidden'}`} style={{ left: x(Math.max(left, 0)) }}>
          <span>▲</span>L
        </span>
        <span className={`pointer pointer-right${active ? '' : ' hidden'}`} style={{ left: x(Math.max(right, 0)) }}>
          <span>▲</span>R
        </span>
      </div>
    </div>
  )
}
