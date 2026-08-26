/**
 * Pep gritty-anime VARIANT BOARD — both structures × several attitudes, so Nino
 * can pick from options. gemini-pro (grittiest). White bg + no shadow + legs
 * apart → clean keyable cuts.
 */
import 'dotenv/config'
import { OpenRouterProvider } from '../src/providers/openrouter.js'
import { optimizeAndSave } from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const outDir = join(HERE, '..', 'output', 'lpo-pep-anime-board')

const STYLE = `Detailed gritty ANIME / MANGA sports illustration (Haikyuu!! / Blue Lock / G FUEL / esports-mascot energy): sharp confident ink linework, hard-edged cel shading with deep cast shadows and bright rim highlights, halftone / screentone grit texture, moody cinematic lighting, intense expressive anime eyes with sharp catchlights. Lean athletic anime build, taped/wrapped hands, edgy black high-top sneakers, a green-and-cream striped volleyball. NOT a flat cartoon, NOT chibi, NOT cute, NOT a muscular bodybuilder, NOT clean vector. Isolated on a solid pure WHITE background, absolutely NO ground shadow, full body head-to-shoes with a clear open gap between the legs, no text, no logos.`

// Structure A — pepper IS the body (face carved into the pepper torso, stem = topknot)
const PBODY = `The character's WHOLE BODY is a green bell pepper — the round bulbous green bell pepper is the TORSO, the short curved stem is a small spiky topknot, a fierce anime face is on the front of the pepper, and lean anime arms and legs come directly out of the pepper. This is an anthropomorphic PEPPER, NOT a human with a pepper head.`
// Structure B — anime character, pepper head + stem-hair
const PCHAR = `An anime sports character whose HEAD is a green bell pepper with spiky green stem-hair and a fierce anime face, on a lean athletic humanoid anime body wearing a dark sleeveless volleyball jersey and black shorts.`

const jobs = [
  { name: 'A1-body-glare',  base: PBODY, lever: 'Fierce narrow-eyed glare, wide powerful ready stance, ball at the hip.' },
  { name: 'A2-body-cool',   base: PBODY, lever: 'Cool confident smirk, relaxed cocky stance, casually holding the ball on one hip.' },
  { name: 'A3-body-action', base: PBODY, lever: 'Dynamic mid-action lean about to spike, fired-up determined expression, motion energy.' },
  { name: 'B1-char-cool',   base: PCHAR, lever: 'Calm cool intense Blue-Lock expression, ball tucked under one arm, confident.' },
  { name: 'B2-char-shonen', base: PCHAR, lever: 'Fired-up shonen battle grin, dynamic energetic stance, intense.' },
  { name: 'B3-char-street', base: PCHAR, lever: 'Streetwear-cool attitude, arms loosely crossed with the ball, narrow confident glare.' },
]

console.log(`Generating ${jobs.length} anime variants...\n`)
for (const j of jobs) {
  try {
    const p = new OpenRouterProvider({ model: 'gemini-pro' })
    const buf = await p.generate(`${j.base} ${j.lever} ${STYLE}`)
    await optimizeAndSave(buf, join(outDir, `${j.name}.png`), { width: null, height: null, format: 'png' })
    console.log(`✓ ${j.name}.png`)
  } catch (e) { console.log(`✗ ${j.name} — ${e.message}`) }
}
console.log('\nDone → output/lpo-pep-anime-board/')
