/**
 * Pep — gritty ANIME re-skin. Keep the approved pepper-body character structure,
 * re-render in anime/manga sports style (Haikyuu / Blue Lock / G FUEL / esports).
 * White bg + NO shadow + legs apart → clean keyable cut (fixes enclosed-white bug).
 */
import 'dotenv/config'
import { OpenRouterProvider } from '../src/providers/openrouter.js'
import { optimizeAndSave } from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const outDir = join(HERE, '..', 'output', 'lpo-pep-anime')

const BASE = `Gritty Japanese ANIME / manga sports-character illustration of a bell pepper mascot for an underground grass-volleyball brand — in the style of anime like Haikyuu!! and Blue Lock, with the edgy energy of a G FUEL / esports team mascot. The character's body IS a green bell pepper (round green bell pepper torso, short curved green stem on top), rendered as a cool stylized ANIME character — {INTENSITY}. Sharp angular ink linework, hard-edged cel shading with dramatic highlights and deep shadow, intense expressive anime eyes, confident cool attitude. Lean athletic anime proportions (NOT a bodybuilder, NOT chibi-cute, NOT a round Western retro cartoon, NOT rubber-hose), athletic anime high-top sneakers and taped/wrapped hands. Confident wide athletic ready stance, legs planted clearly APART, holding a green-and-cream striped volleyball at the hip. Isolated on a solid pure WHITE background, absolutely NO ground shadow and NO drop shadow, full body head-to-shoes with clear open space between the legs, no text, no logos.`

const takes = [
  { name: 'anime-cool',   intensity: 'sleek clean anime hero with dramatic cinematic lighting and a cool confident smirk (Blue Lock energy)' },
  { name: 'anime-street', intensity: 'grittier streetwear-anime with heavier inks, rougher textured shading, more edge and grime, intense narrow-eyed glare (G FUEL / esports energy)' },
  { name: 'anime-shonen', intensity: 'high-energy shonen action style, fired-up determined expression, bold dynamic dramatic shading (Haikyuu spike energy)' },
]

console.log('Generating anime Pep takes...\n')
for (const t of takes) {
  try {
    const p = new OpenRouterProvider({ model: 'gemini-flash' })
    const buf = await p.generate(BASE.replace('{INTENSITY}', t.intensity))
    await optimizeAndSave(buf, join(outDir, `${t.name}.png`), { width: null, height: null, format: 'png' })
    console.log(`✓ ${t.name}.png`)
  } catch (e) { console.log(`✗ ${t.name} — ${e.message}`) }
}
console.log('\nDone → output/lpo-pep-anime/')
