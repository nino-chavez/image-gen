/**
 * Bell Pepper Open — anthropomorphic pepper CHARACTER mascot (face + limbs),
 * gritty/premium register, isolated transparent overlay graphic (NOT a scene).
 * Two style directions so we can lock the rendering before iterating poses.
 */
import 'dotenv/config'
import { OpenRouterProvider } from '../src/providers/openrouter.js'
import { optimizeAndSave } from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const outDir = join(HERE, '..', 'output', 'lpo-bell-char')

const BODY = `An anthropomorphic GREEN BELL PEPPER athlete character. The pepper IS the torso/body — a large round bulbous glossy green bell pepper with a short curved green stem on top. A FACE sits on the front of the pepper body: intense focused eyes, furrowed determined brows, a fierce competitive game-face (NOT a cute friendly smile). Lean, athletic, muscular human-like arms and legs, dark compression athletic shorts, green volleyball shoes, taped hands. Caught mid-action in a powerful volleyball {POSE}, with a green-and-cream striped volleyball. Full body head-to-shoes, centered, dynamic.`

const D1 = `Premium cinematic 3D-rendered character (Pixar-grade realism but gritty and serious): realistic glossy pepper skin with subtle bumps and highlights, real muscle definition in the limbs, dramatic studio rim lighting, subtle sweat and grit, shallow depth of field, high detail. Gritty high-level sports aesthetic, intimidating and premium. Isolated on a FULLY TRANSPARENT background — no scene, no ground shadow, no text, no logos.`

const D2 = `Gritty edgy 2D sports-team / esports mascot ILLUSTRATION with serious attitude: thick confident black linework, heavy dramatic cel-shading, halftone grit texture and grain, bold high-contrast colors, aggressive varsity-crest energy. NOT cute, NOT soft, NOT flat pastel. Solid PURE WHITE (#ffffff) background only — no checkerboard, no scene, no ground shadow, no text, no logos.`

const jobs = [
  { name: 'char-d1-3d-spike',    model: 'gpt-image',    style: D1, pose: 'SPIKE — fully airborne, one arm cocked high about to crush the ball', alpha: true },
  { name: 'char-d1-3d-dig',      model: 'gpt-image',    style: D1, pose: 'DIG — lunging low, both arms extended to platform a low ball, dirt kicking up', alpha: true },
  { name: 'char-d2-ill-spike',   model: 'gemini-flash', style: D2, pose: 'SPIKE — fully airborne, one arm cocked high about to crush the ball', alpha: false },
  { name: 'char-d2-ill-pose',    model: 'gemini-flash', style: D2, pose: 'HERO STANCE — standing tall, ball under one arm, glaring down the camera, ready to dominate', alpha: false },
]

console.log(`Generating ${jobs.length} character variants...\n`)
for (const j of jobs) {
  try {
    const p = new OpenRouterProvider({ model: j.model })
    const prompt = `${BODY.replace('{POSE}', j.pose)}\n\n${j.style}`
    const buf = await p.generate(prompt)
    await optimizeAndSave(buf, join(outDir, `${j.name}.png`), { width: null, height: null, format: 'png' })
    console.log(`✓ ${j.name}.png  [${j.model}]`)
  } catch (e) {
    console.log(`✗ ${j.name}  — ${e.message}`)
  }
}
console.log('\nDone → output/lpo-bell-char/')
