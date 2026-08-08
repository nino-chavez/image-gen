/**
 * Let's Pepper mascot — character-first grammar (subject = athlete, pepper = the
 * head/design language) so the model designs an integrated character instead of
 * rendering a literal vegetable with limbs bolted on.
 *
 * Workflow: generate ANCHORS, then reference-lock new poses off the chosen
 * anchor to build a consistent sheet (not random one-offs).
 *
 *   node scripts/lpo-mascot-sheet.mjs
 */
import 'dotenv/config'
import { OpenRouterProvider } from '../src/providers/openrouter.js'
import { optimizeAndSave } from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const outDir = join(HERE, '..', 'output', 'lpo-mascot-sheet')

// Character-first: a COMPLETE human athlete body; the pepper is ONLY the head.
// This is the fix — the body must be fully human, not a pepper-torso with limbs.
const ILL = (color, jersey, num) =>
  `Bold gritty comic-book sports mascot illustration of a ripped HUMAN volleyball athlete. The body is a COMPLETE muscular human male — human torso, chest, shoulders, six-pack abs, defined human arms and human legs. The ONLY non-human feature is the HEAD: it is a glossy ${color} bell pepper with a curved green stem on top, worn like a head/mask, with a fierce snarling face on it (angry eyes, furrowed brow). He wears a sleeveless ${jersey} "PEPPERS" volleyball jersey number ${num}, black kneepads, and beat-up court shoes. {POSE}. Heavy black ink linework, dramatic cross-hatch shading, halftone grit texture, dynamic. Full body head-to-shoes, centered, on a solid pure white background. ISOLATED CHARACTER ONLY — absolutely no background shield, no emblem, no crest, no starburst, no radiating speed lines, no scene, no extra text.`

const DIG = 'Low defensive dig stance, knees bent wide, forearms locked together platforming a volleyball'
const anchors = [
  { name: 'anchor-green', model: 'gemini-flash',
    prompt: ILL('forest-green (#4A7C3F)', 'dark green and black', '7').replace('{POSE}', DIG) },
  { name: 'anchor-red', model: 'gemini-flash',
    prompt: ILL('glossy red (#D94C35)', 'dark red', '14').replace('{POSE}', DIG) },
]

// Reference-locked poses off the GREEN anchor (the Bell-correct one).
const LOCK = (pose) =>
  `Use the EXACT same mascot character, body, head design, colors, jersey, number and art style as the reference image — the same ripped HUMAN athlete with a green-bell-pepper head. Keep the body fully human; the pepper stays only the head. Only change the action: ${pose}. Bold gritty comic-book illustration, heavy ink linework, full body, centered, solid pure white background. ISOLATED CHARACTER ONLY — no shield, emblem, crest, starburst or speed lines.`

const poses = [
  { name: 'green-spike', pose: 'explosive jump SPIKE, fully airborne, one arm cocked high about to crush a green-and-cream volleyball' },
  { name: 'green-celebrate', pose: 'VICTORY celebration, both fists raised, fierce triumphant roar' },
]

console.log('Generating anchors...\n')
const saved = {}
for (const a of anchors) {
  try {
    const p = new OpenRouterProvider({ model: a.model })
    const buf = await p.generate(a.prompt)
    const out = join(outDir, `${a.name}.png`)
    await optimizeAndSave(buf, out, { width: null, height: null, format: 'png' })
    saved[a.name] = out
    console.log(`✓ ${a.name}.png`)
  } catch (e) { console.log(`✗ ${a.name} — ${e.message}`) }
}

if (saved['anchor-green']) {
  console.log('\nReference-locking poses off anchor-green...\n')
  for (const ps of poses) {
    try {
      const p = new OpenRouterProvider({ model: 'gemini-flash' })
      const buf = await p.generate(LOCK(ps.pose), { referenceImage: saved['anchor-green'] })
      await optimizeAndSave(buf, join(outDir, `${ps.name}.png`), { width: null, height: null, format: 'png' })
      console.log(`✓ ${ps.name}.png  [ref-locked]`)
    } catch (e) { console.log(`✗ ${ps.name} — ${e.message}`) }
  }
}
console.log('\nDone → output/lpo-mascot-sheet/')
