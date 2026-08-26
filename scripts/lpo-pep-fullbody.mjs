/**
 * Pep — FULL pepper body (pepper = the whole body, small stubby limbs, mascot-
 * logo proportions like Kool-Aid Man / M&M), rendered in GRITTY ANIME style.
 * The anime is rendering only; the FORM stays a dominant pepper, NOT humanoid.
 */
import 'dotenv/config'
import { OpenRouterProvider } from '../src/providers/openrouter.js'
import { optimizeAndSave } from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const outDir = join(HERE, '..', 'output', 'lpo-pep-fullbody')

const FORM = `The FORM is a FULL bell pepper body: a big, round, DOMINANT green bell pepper is the entire body-and-head as ONE shape (the fierce face is on the front of the pepper itself; short curved green stem on top). SMALL, simple, short cartoon arms and legs attached directly to the pepper — stubby little limbs, tiny gloved hands, small sneakers. Anthropomorphic PEPPER with mascot-logo proportions like Kool-Aid Man or an M&M character: the pepper makes up ~80% of the character. NOT a humanoid athlete, NOT a human body, NOT long human legs, NOT a muscular physique, NOT a torso-on-legs — the pepper dominates.`

const STYLE = `Rendered in GRITTY ANIME / MANGA style (the rendering only, not the proportions): sharp confident ink linework, hard cel-shading with deep shadows and bright highlights, halftone / screentone grit texture, dramatic lighting, intense expressive anime eyes with sharp catchlights, cool fierce attitude. Isolated on a solid pure WHITE background, absolutely NO ground shadow, full body, no text, no logos.`

const jobs = [
  { name: 'fb-fierce', lever: 'Fierce confident expression, planted and ready, holding a green-and-cream striped volleyball at its side.' },
  { name: 'fb-cool',   lever: 'Cool narrow-eyed smirk, casually spinning a green-and-cream striped volleyball on one fingertip.' },
  { name: 'fb-hype',   lever: 'Fired-up battle grin, dynamic energetic lean, palming a green-and-cream striped volleyball.' },
]

console.log(`Generating ${jobs.length} full-pepper-body anime variants...\n`)
for (const j of jobs) {
  try {
    const p = new OpenRouterProvider({ model: 'gemini-pro' })
    const buf = await p.generate(`${FORM} ${j.lever} ${STYLE}`)
    await optimizeAndSave(buf, join(outDir, `${j.name}.png`), { width: null, height: null, format: 'png' })
    console.log(`✓ ${j.name}.png`)
  } catch (e) { console.log(`✗ ${j.name} — ${e.message}`) }
}
console.log('\nDone → output/lpo-pep-fullbody/')
