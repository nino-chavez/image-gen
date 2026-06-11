/**
 * Apparel poses for the RETRO Pep (vintage rubber-hose mascot, the official
 * letspepper logo character). Reference-locked off the white-bg anchor
 * (letspepper public/images/mascots/bell-pepper-2.png) so the character holds.
 * White background -> keyed out downstream for heat-transfer print art.
 */
import 'dotenv/config'
import { OpenRouterProvider } from '../src/providers/openrouter.js'
import { optimizeAndSave } from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdirSync } from 'node:fs'

const HERE = dirname(fileURLToPath(import.meta.url))
const dir = join(HERE, '..', 'output', 'lpo-apparel')
mkdirSync(dir, { recursive: true })

const anchor = '/Users/nino/Workspace/dev/apps/letspepper/public/images/mascots/bell-pepper-2.png'

const KEEP = `Use the EXACT same charming retro brand-mascot character, design, colors, face, proportions and illustration style as the reference image — the vintage 1930s rubber-hose style cartoon green bell pepper mascot whose body IS the pepper, with thin friendly cartoon limbs, white cartoon gloves, retro sneakers, bold dark outlines and flat retro colors (NOT muscular, NOT gritty, NOT modern 3D). Keep his confident winking charm. Only change the action:`
const TAIL = `Clean professional vintage mascot illustration, bold simple shapes, strong silhouette, flat retro color fills with bold outlines, perfect for screen-print apparel. Full body, centered, solid pure white background, isolated character, no ground shadow, no text, no logos.`

const poses = [
  { name: 'pep-retro-spike-a', action: 'a dynamic volleyball SPIKE — leaping in the air, one gloved hand cocked high about to smash a green-and-cream striped volleyball, confident grin.' },
  { name: 'pep-retro-spike-b', action: 'a dynamic volleyball SPIKE — leaping in the air, body angled, one gloved hand swatting a green-and-cream striped volleyball downward, confident grin.' },
]

console.log('Generating retro Pep apparel poses (ref-locked)...\n')
for (const p of poses) {
  try {
    const prov = new OpenRouterProvider({ model: 'gemini-flash' })
    const buf = await prov.generate(`${KEEP} ${p.action} ${TAIL}`, { referenceImage: anchor })
    await optimizeAndSave(buf, join(dir, `${p.name}.png`), { width: null, height: null, format: 'png' })
    console.log(`✓ ${p.name}.png`)
  } catch (e) { console.log(`✗ ${p.name} — ${e.message}`) }
}
console.log('\nDone → output/lpo-apparel/')
