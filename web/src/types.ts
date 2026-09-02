export type Action = 'init' | 'expand' | 'shrink' | 'record' | 'wait' | 'check' | 'done' | string

export interface Step {
  line: number
  left: number
  right: number
  action: Action
  message: string
  vars: Record<string, unknown>
}

export interface Trace {
  id: string
  pattern: string
  title: string
  problem: string
  snippet: string
  input: { array: (number | string)[] } & Record<string, unknown>
  steps: Step[]
  result: unknown
}

export interface IndexEntry {
  id: string
  pattern: string
  title: string
  steps: number
}
