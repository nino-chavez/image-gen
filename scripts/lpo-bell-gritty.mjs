/**
 * Gritty Bell Pepper Open hero graphics — photoreal pepper-head athlete to
 * match the recent cinematic brand aesthetic (NOT the cartoon mascot).
 * Reference-guided off the existing bell hero to lock grade + composition.
 */
import 'dotenv/config'
import { OpenRouterProvider } from '../src/providers/openrouter.js'
import { optimizeAndSave } from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '..')
const outDir = join(ROOT, 'output', 'lpo-bell-gritty')
const ref = join(ROOT, '..', '..', 'apps', 'letspepper', 'public', 'images', 'heroes', 'bell-pepper-open.webp')

const STYLE = `Photorealistic cinematic sports-action photograph in the EXACT gritty style, color grade, lighting and composition of the reference image. A lean muscular athlete whose HEAD is a giant realistic GREEN BELL PEPPER — round, bulbous, glossy green bell-pepper skin with subtle highlights and a short curved green stem on top, NO human face, the pepper IS the head/helmet. Outdoor grass volleyball tournament: golden-hour backlight and sun flare, tournament net, blurred crowd and pop-up tents behind, shallow depth of field. Heavy 35mm film grain, high contrast, slightly desaturated warm cinematic grade, real sweat and dirt and motion, 200mm telephoto compression. Editorial pro-sports photography. No text, no logos, no cartoon, no illustration.`

const jobs = [
  { name: 'bell-gritty-spike-v', model: 'gemini-flash',
    pose: 'Vertical 9:16 framing. The athlete explodes vertically at the net mid-SPIKE, fully airborne, hitting arm cocked high above a volleyball, body taut and powerful.' },
  { name: 'bell-gritty-dig-h', model: 'gemini-flash',
    pose: 'Wide 16:9 framing. The athlete lays out in a full horizontal DIVING DIG, arms extended low to platform a ball just above the grass, dirt spraying.' },
  { name: 'bell-gritty-serve-v', model: 'gemini-pro',
    pose: 'Vertical 9:16 framing. The athlete in a powerful jump-SERVE toss, one arm reaching up to a high ball, back arched, intense and dynamic.' },
  { name: 'bell-gritty-portrait', model: 'gemini-flash',
    pose: 'Tight square 1:1 chest-up portrait. The green-bell-pepper-headed athlete stares down the camera, jaw of the pepper set, dramatic rim light, ready-for-battle intensity.' },
]

console.log(`Generating ${jobs.length} gritty bell graphics...\n`)

for (const job of jobs) {
  try {
    const p = new OpenRouterProvider({ model: job.model })
    const buf = await p.generate(`${job.pose}\n\n${STYLE}`, { referenceImage: ref })
    const out = join(outDir, `${job.name}.png`)
    await optimizeAndSave(buf, out, { width: null, height: null, format: 'png' })
    console.log(`✓ ${job.name}.png  [${job.model}]`)
  } catch (e) {
    console.log(`✗ ${job.name}  — ${e.message}`)
  }
}
console.log('\nDone → output/lpo-bell-gritty/')
