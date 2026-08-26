/**
 * Pep anime — harder pass. Push manga rendering (screentones, cross-hatch, drama)
 * and try flux-pro for grit/detail that gemini-flash smooths away.
 */
import 'dotenv/config'
import { OpenRouterProvider } from '../src/providers/openrouter.js'
import { optimizeAndSave } from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const outDir = join(HERE, '..', 'output', 'lpo-pep-anime')

const PROMPT = `Detailed gritty ANIME / MANGA sports illustration — a single character: an anthropomorphic GREEN BELL PEPPER volleyball player drawn like a cool, intense character from a sports anime (Haikyuu!!, Blue Lock) or a G FUEL / esports anime mascot. The body IS a green bell pepper torso; the curved green stem reads as spiky anime hair. Semi-realistic anime rendering: sharp confident ink linework, dramatic HARD cel-shading with deep cast shadows and bright rim highlights, halftone / screentone grit texture, moody cinematic lighting. INTENSE anime eyes with sharp catchlights and a fierce-cool expression. Lean athletic anime build, taped hands, edgy black high-top sneakers, black athletic shorts. Confident wide stance holding a green-and-cream striped volleyball at the hip, legs planted clearly APART. NOT a flat simple cartoon, NOT a cute kids mascot, NOT chibi, NOT a muscular bodybuilder, NOT clean vector. Isolated on a solid pure WHITE background, absolutely NO ground shadow, full body head-to-shoes with a clear open gap between the legs, no text, no logos.`

const jobs = [
  { name: 'v2-gemini-manga', model: 'gemini-flash' },
  { name: 'v2-flux-gritty', model: 'flux-pro' },
  { name: 'v2-flux-cool', model: 'flux-pro', extra: ' Cooler sleeker Blue-Lock palette, blue-green cinematic rim light.' },
]

console.log('Generating harder anime pass...\n')
for (const j of jobs) {
  try {
    const p = new OpenRouterProvider({ model: j.model })
    const buf = await p.generate(PROMPT + (j.extra || ''))
    await optimizeAndSave(buf, join(outDir, `${j.name}.png`), { width: null, height: null, format: 'png' })
    console.log(`✓ ${j.name}.png  [${j.model}]`)
  } catch (e) { console.log(`✗ ${j.name} — ${e.message}`) }
}
console.log('\nDone.')
