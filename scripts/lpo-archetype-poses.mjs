/**
 * Develop both surviving archetypes into options: a 2nd pose each, reference-
 * locked off the anchor so each reads as a consistent character.
 */
import 'dotenv/config'
import { OpenRouterProvider } from '../src/providers/openrouter.js'
import { optimizeAndSave } from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const dir = join(HERE, '..', 'output', 'lpo-archetypes')

const SPIKE = 'explosive jump SPIKE — fully airborne, one arm cocked high about to crush a volleyball'
const jobs = [
  { name: 'A-spike', ref: join(dir, 'A-pepper-is-body.png'),
    keep: 'the anthropomorphic green bell pepper whose PEPPER BODY is the entire torso, with muscular arms and legs growing out of the pepper (the pepper IS the body, not a human)' },
  { name: 'C-spike', ref: join(dir, 'C-fused-creature.png'),
    keep: 'the fused green pepper-creature — a bell pepper morphed seamlessly into a muscular green humanoid athlete in a PEPPERS jersey' },
]

console.log('Generating 2nd pose per archetype (ref-locked)...\n')
for (const j of jobs) {
  try {
    const p = new OpenRouterProvider({ model: 'gemini-flash' })
    const prompt = `Use the EXACT same mascot character, design, colors and art style as the reference image — ${j.keep}. Keep that exact structure. Only change the action: ${SPIKE}. Bold gritty comic mascot illustration, heavy clean linework, full body, centered, solid pure white background, isolated character, no burst, no scene, no text.`
    const buf = await p.generate(prompt, { referenceImage: j.ref })
    await optimizeAndSave(buf, join(dir, `${j.name}.png`), { width: null, height: null, format: 'png' })
    console.log(`✓ ${j.name}.png`)
  } catch (e) { console.log(`✗ ${j.name} — ${e.message}`) }
}
console.log('\nDone → output/lpo-archetypes/')
