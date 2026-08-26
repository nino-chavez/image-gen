/**
 * Let's Pepper team-kit apparel art — generated AT the bar of Nino's finished
 * Brand Kit pieces (IMAGE_GEN_REF_DIR, default ~/Downloads/ref): character +
 * painted explosion + hand-brushed lettering as ONE illustrated unit.
 * Multi-reference: his finished
 * composition carries the lettering/composition style, his green hero carries
 * the character. Green colorway = the Let's Pepper team identity.
 *
 * White background -> keyed out downstream for DTF print art.
 */
import 'dotenv/config'
import { OpenRouterProvider } from '../src/providers/openrouter.js'
import { optimizeAndSave } from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdirSync } from 'node:fs'
import { homedir } from 'node:os'

const HERE = dirname(fileURLToPath(import.meta.url))
const dir = join(HERE, '..', 'output', 'lpo-apparel')
mkdirSync(dir, { recursive: true })

// Brand Kit source pieces. Override with IMAGE_GEN_REF_DIR to point elsewhere.
const REF = process.env.IMAGE_GEN_REF_DIR ?? join(homedir(), 'Downloads', 'ref')
const COMP = join(REF, 'Brand Kit-14.png')              // finished hero+lettering composition
const SHEET = join(REF, 'Brand Kit-5-tee-front-red.png') // lockup explorations (incl. green cell)
const HERO = join(REF, 'Firefly_one punch man style anime green bell pepper character that is in an action pose for s 55845.png')

const QUALITY = `Bold painted shapes with hard edges, professional screen-print merch illustration, rich color, dark outlines. Solid pure white background, fully isolated composition, no watermark, no extra text.`

const jobs = [
  {
    name: 'back-hero-green',
    refs: [COMP, HERO],
    n: 2,
    prompt: `The first image is a finished apparel merch design — study its composition, painted cartoon explosion burst, and hand-brushed "LET'S PEPPER" lettering style. The second image is the character: a fierce green bell pepper anime athlete. Create the SAME KIND of merch composition: the GREEN bell pepper character from the second image leaping mid-air spiking a green-and-cream volleyball, surrounded by a painted comic explosion burst in greens, chartreuse and gold, with hand-brushed "LET'S PEPPER" lettering integrated at the bottom in the same brush style as the first image, colored in a green-to-gold gradient with dark outline. ${QUALITY}`,
  },
  {
    name: 'front-lockup-green',
    refs: [SHEET, HERO],
    n: 2,
    prompt: `The first image is a sheet of apparel lockup designs — study the chunky hand-brushed "LET'S PEPPER" lettering with the small pepper stem details and the character bursting through with a painted motion swoosh. The second image is the character: a fierce green bell pepper anime athlete. Create ONE compact apparel lockup: hand-brushed stacked "LET'S PEPPER" lettering in green with gold highlights and dark outline, with the GREEN bell pepper character from the second image diving across the lettering on a painted motion swoosh, volleyball in play. ${QUALITY}`,
  },
]

console.log('Generating team-kit art (multi-ref, gemini-pro)...\n')
for (const j of jobs) {
  for (let i = 1; i <= j.n; i++) {
    const name = `${j.name}-${i}`
    try {
      const prov = new OpenRouterProvider({ model: 'gemini-pro' })
      const buf = await prov.generate(j.prompt, { referenceImages: j.refs })
      await optimizeAndSave(buf, join(dir, `${name}.png`), { width: null, height: null, format: 'png' })
      console.log(`✓ ${name}.png`)
    } catch (e) { console.log(`✗ ${name} — ${e.message}`) }
  }
}
console.log('\nDone → output/lpo-apparel/')
