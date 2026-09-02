import type { IndexEntry, Trace } from '../types'

const base = import.meta.env.BASE_URL

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${base}traces/${path}`)
  if (!res.ok) throw new Error(`Failed to load ${path} (${res.status})`)
  return res.json() as Promise<T>
}

export const loadIndex = () => getJson<IndexEntry[]>('index.json')
export const loadTrace = (id: string) => getJson<Trace>(`${id}.json`)
