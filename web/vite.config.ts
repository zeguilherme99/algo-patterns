import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served as a GitHub Pages *project* site: https://zeguilherme99.github.io/algo-patterns/
export default defineConfig({
  base: '/algo-patterns/',
  plugins: [react()],
})
