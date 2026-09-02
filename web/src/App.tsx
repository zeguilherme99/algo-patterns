import { useEffect } from 'react'
import { Link, Route, Routes, useSearchParams } from 'react-router-dom'
import Home from './pages/Home'
import PlayerPage from './pages/PlayerPage'
import { useI18n } from './i18n'

export default function App() {
  const { t, dict, toggle, setLocale } = useI18n()
  const [params] = useSearchParams()
  // ?record=1 hides the site chrome for clean screen recordings; ?lang=pt-BR forces a language.
  const recording = params.has('record')
  const lang = params.get('lang')
  useEffect(() => {
    if (lang === 'en' || lang === 'pt-BR') setLocale(lang)
  }, [lang, setLocale])
  return (
    <div className={recording ? 'app recording' : 'app'}>
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark">{'{ }'}</span> {t('ui.brand')}
        </Link>
        <nav className="topbar-links">
          <a href="https://github.com/zeguilherme99/algo-patterns" target="_blank" rel="noreferrer">{t('ui.github')}</a>
          <a href="https://zeguilherme99.github.io/" target="_blank" rel="noreferrer">{t('ui.author')}</a>
          <button className="lang-toggle" onClick={toggle} title={dict.meta.switchTo} aria-label={dict.meta.switchTo}>
            {dict.meta.label}
          </button>
        </nav>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:pattern/:problem" element={<PlayerPage />} />
        </Routes>
      </main>
    </div>
  )
}
