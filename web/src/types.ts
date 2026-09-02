export type Action = 'init' | 'expand' | 'shrink' | 'record' | 'wait' | 'check' | 'done' | string

export interface Step {
  line: number
  left: number
  right: number
  action: Action
  /** Dot-separated message key, resolved against traces.<id>.steps in the dictionaries. */
  key: string
  params: Record<string, unknown>
  vars: Record<string, unknown>
}

export interface Trace {
  id: string
  pattern: string
  /** English fallback; the UI prefers the dictionary entry. */
  title: string
  /** English fallback; the UI prefers the dictionary entry. */
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
