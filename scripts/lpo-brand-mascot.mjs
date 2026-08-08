/**
 * Let's Pepper brand mascot — in the tradition of famous brand mascots
 * (Chester Cheetah, Jolly Green Giant, Cap'n Crunch, the M&M's): a charming,
 * iconic CHARACTER with personality. Pepper IS the body + great face + simple
 * friendly limbs. NOT muscular, NOT gritty, NOT generic clip-art.
 */
import 'dotenv/config'
import { OpenRouterProvider } from '../src/providers/openrouter.js'
import { optimizeAndSave } from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const outDir = join(HERE, '..', 'output', 'lpo-brand-mascot')

const BASE = `Iconic BRAND-MASCOT character full of personality and charm — the lovable, recognizable "face" of a grass volleyball brand, in the tradition of famous brand mascots (Chester Cheetah, the Jolly Green Giant, Cap'n Crunch, the M&M's characters). The character's body IS a green bell pepper: a round bulbous green bell pepper with a short curved green stem on top. Big expressive cartoon face with TONS of character — bright lively eyes, characterful eyebrows, a {EXPRESSION}. Simple smooth cartoon arms and legs (SLIM and friendly, NOT muscular, NOT a bodybuilder), white-gloved cartoon hands, clean athletic shoes. {POSE}. Professional polished mascot illustration: bold simple shapes, strong clean silhouette, smooth vector-style rendering with subtle soft cel shading, confident limited palette of greens + cream. Charming, memorable, approachable with a little cool swagger. NOT gritty, NOT aggressive, NOT muscular, NOT generic clip-art, NOT photorealistic. Full body, centered, solid pure white background, no text, no logos.`

const opts = [
  { name: 'mascot-cool',
    expr: 'confident knowing smirk, cool and charismatic',
    pose: 'leaning back relaxed and cool, casually spinning a green-and-cream striped volleyball on one finger' },
  { name: 'mascot-friendly',
    expr: 'big warm welcoming grin, friendly and likable',
    pose: 'giving an enthusiastic thumbs-up to camera, a green-and-cream striped volleyball tucked under the other arm' },
  { name: 'mascot-hype',
    expr: 'fired-up fun open-mouth grin, energetic and playful',
    pose: 'dynamic excited ready stance leaning in, palming a green-and-cream striped volleyball, full of game-day energy' },
]

console.log('Generating brand-mascot personalities...\n')
for (const o of opts) {
  try {
    const p = new OpenRouterProvider({ model: 'gemini-flash' })
    const prompt = BASE.replace('{EXPRESSION}', o.expr).replace('{POSE}', o.pose)
    const buf = await p.generate(prompt)
    await optimizeAndSave(buf, join(outDir, `${o.name}.png`), { width: null, height: null, format: 'png' })
    console.log(`✓ ${o.name}.png`)
  } catch (e) { console.log(`✗ ${o.name} — ${e.message}`) }
}
console.log('\nDone → output/lpo-brand-mascot/')
