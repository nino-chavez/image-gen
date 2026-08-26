/**
 * "Pep" — the locked Cool personality. Build action poses reference-locked off
 * the cool anchor so it stays the same charming character.
 */
import 'dotenv/config'
import { OpenRouterProvider } from '../src/providers/openrouter.js'
import { optimizeAndSave } from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const dir = join(HERE, '..', 'output', 'lpo-brand-mascot')
const anchor = join(dir, 'mascot-cool.png')

const KEEP = `Use the EXACT same charming brand-mascot character, design, colors, face, proportions and clean illustration style as the reference image — the cool confident green bell pepper mascot whose body IS the bell pepper, with slim friendly cartoon arms and legs (NOT muscular, NOT gritty). Keep his cool confident personality and the same look. Only change the action:`
const TAIL = `Professional polished mascot illustration, bold simple shapes, smooth vector-style rendering, greens + cream palette. Full body, centered, solid pure white background, isolated character, no text, no logos.`

const poses = [
  { name: 'pep-spike', action: 'a confident volleyball SPIKE — jumping up, one arm cocked high about to strike a green-and-cream striped volleyball, still wearing his cool charismatic smirk.' },
  { name: 'pep-celebrate', action: 'a triumphant WIN celebration — one fist pumped up, big confident grin, a green-and-cream striped volleyball held in the other hand.' },
]

console.log('Generating Pep poses (ref-locked)...\n')
for (const p of poses) {
  try {
    const prov = new OpenRouterProvider({ model: 'gemini-flash' })
    const buf = await prov.generate(`${KEEP} ${p.action} ${TAIL}`, { referenceImage: anchor })
    await optimizeAndSave(buf, join(dir, `${p.name}.png`), { width: null, height: null, format: 'png' })
    console.log(`✓ ${p.name}.png`)
  } catch (e) { console.log(`✗ ${p.name} — ${e.message}`) }
}
console.log('\nDone.')
