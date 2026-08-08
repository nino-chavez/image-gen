/**
 * Disambiguate "anthropomorphic character" — two unexplored archetypes, since
 * both prior poles were rejected (pepper-with-limbs AND human-with-pepper-head).
 */
import 'dotenv/config'
import { OpenRouterProvider } from '../src/providers/openrouter.js'
import { optimizeAndSave } from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const outDir = join(HERE, '..', 'output', 'lpo-archetypes')

const jobs = [
  { name: 'A-pepper-is-body',
    prompt: `Gritty cartoon sports MASCOT CHARACTER where an anthropomorphic GREEN BELL PEPPER is the ENTIRE body — the round bulbous green bell pepper IS the torso/body, with a short green stem on top and a fierce snarling face (angry eyes, furrowed brow) on the FRONT of the pepper body. Athletic cartoon-stylized arms and legs grow directly out of the pepper body, gloved hands, dark athletic shorts, court shoes. The character is a PEPPER, anthropomorphized — not a human. Dynamic low volleyball dig stance with a volleyball. Bold gritty comic mascot illustration, heavy clean black linework, dramatic cel-shading, cohesive single design, pro sports-mascot energy (think a tough team mascot). Full body, centered, solid pure white background, no scene, no text.` },
  { name: 'C-fused-creature',
    prompt: `A cohesive bell-pepper CREATURE mascot — one fully integrated character where a green bell pepper morphs SEAMLESSLY into a powerful humanoid athlete. The pepper forms the head and chest as ONE continuous flowing form (NO separate head sitting on shoulders, NO visible seam, NOT a human wearing a pepper mask). Stylized muscular arms and legs of the same character, a fierce integrated face, wearing a "PEPPERS" volleyball jersey, kneepads, court shoes. Dynamic low dig stance with a volleyball. Bold gritty comic mascot illustration, heavy clean linework, dramatic shading, one cohesive original character design like a pro sports / fighting-game mascot. Full body, centered, solid pure white background, no scene, no text.` },
]

console.log('Generating archetype options...\n')
for (const j of jobs) {
  try {
    const p = new OpenRouterProvider({ model: 'gemini-flash' })
    const buf = await p.generate(j.prompt)
    await optimizeAndSave(buf, join(outDir, `${j.name}.png`), { width: null, height: null, format: 'png' })
    console.log(`✓ ${j.name}.png`)
  } catch (e) { console.log(`✗ ${j.name} — ${e.message}`) }
}
console.log('\nDone → output/lpo-archetypes/')
