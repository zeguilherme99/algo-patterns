#!/usr/bin/env node
/**
 * Records a trace playing in the real player and exports MP4 + GIF for social posts.
 *
 *   npm run record -- sliding-window/max-sum-subarray-of-size-k --lang pt-BR --out ~/Documents/linkedin-posts/x
 *
 * Options:
 *   --lang   en | pt-BR            (default: en)
 *   --speed  0.5 | 1 | 1.5 | 2 | 3 (default: 1)
 *   --out    output directory      (default: ./recordings)
 *   --width  / --height            (default: 1200 x 600)
 *
 * Requires a production build (runs `npm run build` if dist/ is missing) and serves it locally.
 */
import { spawn, execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, renameSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import ffmpeg from 'ffmpeg-static'

const webDir = resolve(fileURLToPath(import.meta.url), '../..')
const args = process.argv.slice(2)
const traceId = args.find((a) => !a.startsWith('--'))
if (!traceId) {
  console.error('usage: npm run record -- <pattern>/<problem> [--lang en|pt-BR] [--speed 1] [--out dir]')
  process.exit(1)
}
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 && args[i + 1] ? args[i + 1] : def
}
const lang = opt('lang', 'en')
const speed = opt('speed', '1')
const outDir = resolve(opt('out', join(webDir, 'recordings')))
const width = Number(opt('width', 1200))
const height = Number(opt('height', 600))
const PORT = 4179
const BASE = `http://localhost:${PORT}/algo-patterns/`

if (!existsSync(join(webDir, 'dist'))) {
  console.log('dist/ missing, building…')
  execFileSync('npm', ['run', 'build'], { cwd: webDir, stdio: 'inherit' })
}

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { cwd: webDir, stdio: 'ignore' })
const waitForServer = async () => {
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(BASE)).ok) return } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 200))
  }
  throw new Error('preview server did not start')
}

const videoDir = join(tmpdir(), `algo-patterns-rec-${Date.now()}`)
mkdirSync(videoDir, { recursive: true })
mkdirSync(outDir, { recursive: true })

try {
  await waitForServer()
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width, height },
    colorScheme: 'dark',
    recordVideo: { dir: videoDir, size: { width, height } },
  })
  const tStart = Date.now()
  const page = await context.newPage()
  await page.goto(`${BASE}#/${traceId}?record=1&lang=${lang}`)
  await page.waitForSelector('.player')
  await page.selectOption('.speed select', speed)
  await page.waitForTimeout(1000)

  const tPlay = Date.now()
  await page.click('button.primary')
  const slider = page.locator('input[type=range]')
  await page.waitForFunction(
    (el) => el.value === el.max,
    await slider.elementHandle(),
    { timeout: 120_000 },
  )
  await page.waitForTimeout(2000)

  const video = page.video()
  await context.close()
  await browser.close()
  const webm = await video.path()

  const slug = traceId.split('/').pop()
  const base = join(outDir, `${slug}.${lang}`)
  const trim = Math.max(0, (tPlay - tStart) / 1000 - 1.2).toFixed(2)

  console.log('encoding mp4…')
  execFileSync(ffmpeg, ['-y', '-ss', trim, '-i', webm,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    `${base}.mp4`], { stdio: 'ignore' })

  console.log('encoding gif…')
  execFileSync(ffmpeg, ['-y', '-ss', trim, '-i', webm,
    '-vf', 'fps=12,scale=960:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5',
    `${base}.gif`], { stdio: 'ignore' })

  renameSync(webm, `${base}.webm`)
  console.log(`\nSaved to ${outDir}:\n  ${slug}.${lang}.mp4\n  ${slug}.${lang}.gif\n  ${slug}.${lang}.webm`)
} finally {
  server.kill()
  rmSync(videoDir, { recursive: true, force: true })
}
