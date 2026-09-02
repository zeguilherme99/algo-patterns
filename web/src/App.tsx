import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PlayerPage from './pages/PlayerPage'

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark">{'{ }'}</span> Algo Patterns
        </Link>
        <nav className="topbar-links">
          <a href="https://github.com/zeguilherme99/algo-patterns" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://zeguilherme99.github.io/" target="_blank" rel="noreferrer">by José Guilherme</a>
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
