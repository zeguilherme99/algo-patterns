import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import en, { type Dictionary } from './en'
import ptBR from './pt-BR'

export type Locale = 'en' | 'pt-BR'
const DICTS: Record<Locale, Dictionary> = { en, 'pt-BR': ptBR }
const STORAGE_KEY = 'algo-patterns.locale'

function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'pt-BR') return saved
  } catch { /* storage unavailable */ }
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en'
}

/** Walks a dot-separated path through a nested object. */
function lookup(dict: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((node, part) => {
    if (node && typeof node === 'object' && part in (node as Record<string, unknown>)) {
      return (node as Record<string, unknown>)[part]
    }
    return undefined
  }, dict)
}

function fmt(v: unknown): string {
  if (v === null || v === undefined) return '—'
  return String(v)
}

function interpolate(template: string, params?: Record<string, unknown>): string {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (m, name) => (name in params ? fmt(params[name]) : m))
}

export type TFn = (path: string, params?: Record<string, unknown>) => string

interface I18n {
  locale: Locale
  dict: Dictionary
  setLocale: (l: Locale) => void
  toggle: () => void
  /** Translates a dotted path; falls back to English, then to the path itself. */
  t: TFn
  /** Like t, but returns undefined instead of the path when the key is missing in every language. */
  tOptional: (path: string, params?: Record<string, unknown>) => string | undefined
  /** Translates a path expected to hold a string array. */
  tList: (path: string) => string[]
}

const Ctx = createContext<I18n | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale)
  const dict = DICTS[locale]

  useEffect(() => {
    document.documentElement.lang = dict.meta.htmlLang
    document.title = dict.ui.brand
  }, [dict])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch { /* ignore */ }
  }, [])

  const value = useMemo<I18n>(() => {
    const tOptional = (path: string, params?: Record<string, unknown>) => {
      const hit = lookup(dict, path) ?? lookup(en, path)
      return typeof hit === 'string' ? interpolate(hit, params) : undefined
    }
    return {
      locale,
      dict,
      setLocale,
      toggle: () => setLocale(locale === 'en' ? 'pt-BR' : 'en'),
      t: (path, params) => tOptional(path, params) ?? path,
      tOptional,
      tList: (path) => {
        const hit = lookup(dict, path) ?? lookup(en, path)
        return Array.isArray(hit) ? (hit as string[]) : []
      },
    }
  }, [dict, locale, setLocale])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n(): I18n {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
