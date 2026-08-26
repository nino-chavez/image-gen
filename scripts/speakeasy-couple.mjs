/**
 * Speakeasy wall — pass 2. Couple shots + booking card, on the locked looks:
 *   him = real black rectangular glasses, her = tattoo sleeves visible.
 * Two-person identity is harder; pass his portrait + her strongest portrait
 * as ordered references and name "the man" / "the woman" explicitly.
 */
import 'dotenv/config'
import { OpenRouterProvider } from '../src/providers/openrouter.js'
import { optimizeAndSave } from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdirSync } from 'node:fs'

const HERE = dirname(fileURLToPath(import.meta.url))
const dir = join(HERE, '..', 'output', 'speakeasy-wall')
mkdirSync(dir, { recursive: true })

const HIM = '/Users/nino/Downloads/pic/Gemini_Generated_Image_jjlf1hjjlf1hjjlf.png'
const HER = '/Users/nino/Downloads/DSC06124_original.jpg'

const PERIOD = `Render as an AUTHENTIC 1930s Prohibition-era black-and-white photograph: vintage silver-gelatin print, fine silver-halide film grain, period lens, single harsh magnesium-flash source with bright facial highlights and a hard dark shadow on the wall behind. Subtle age, scratches and tonal fade. Must look like a genuine antique photo — NOT modern, NOT digital, NOT color.`

const MAN = `The MAN (match the completely bald clean-shaven middle-aged man with a heavy brow and thick black rectangular eyeglasses from the FIRST reference image)`
const WOMAN = `The WOMAN (match the lean athletic middle-aged woman with sharp cheekbones and heavy full tattoo sleeves on both arms from the SECOND reference image)`

const jobs = [
  {
    name: 'couple-nightclub',
    refs: [HIM, HER],
    prompt: `A 1930s speakeasy nightclub photograph of a COUPLE seated close together at a small candlelit table. ${MAN} in a pinstripe three-piece suit and a white felt fedora, a cigar in one hand, his other arm around her. ${WOMAN} beside him in a sleeveless satin evening gown with her tattoo sleeves clearly visible, long pearls and finger-waved hair, holding a champagne coupe. Both look straight at the camera like they own the room. Two people, waist-up, intimate dim club. ${PERIOD}`,
  },
  {
    name: 'couple-walking',
    refs: [HIM, HER],
    prompt: `A 1930s candid newspaper press photograph: a notorious mob couple walking arm-in-arm through a crowd on a city street, frozen by a photographer's flash. ${MAN} in a long dark overcoat and white fedora, cigar at his mouth, unbothered. ${WOMAN} on his arm in a fur-collared coat with her tattooed forearms and hands visible, glamorous and defiant. Full-body, two people, slight motion, onlookers blurred behind them. ${PERIOD}`,
  },
  {
    name: 'couple-booking-card',
    refs: [HIM, HER],
    prompt: `A 1930s police "rogues gallery" booking card showing TWO mugshots side by side. On the LEFT, ${MAN}, in a rumpled 1930s dark suit and tie. On the RIGHT, ${WOMAN} with tattoos visible, in a plain 1930s dark dress. Both front-facing booking photos against a plain height-chart wall under harsh booking-room flash, stoic expressions. Aged police record card. The ONLY printed text anywhere is two tiny illegible numeric placards below each photo — NO captions, NO descriptive words, NO names anywhere on the card. ${PERIOD}`,
  },
  {
    name: 'her-mugshot',
    refs: [HER],
    prompt: `Match the lean athletic middle-aged woman with sharp cheekbones and heavy full tattoo sleeves from the reference photos, tattoos visible. A 1930s police booking MUGSHOT, front-facing. She wears a simple dark sleeveless dress, holding a small plain booking placard, defiant expression, plain height-chart wall behind, harsh booking-room flash. ${PERIOD}`,
  },
  {
    name: 'him-mugshot-v2',
    refs: [HIM],
    prompt: `Match the completely bald clean-shaven middle-aged man with heavy brow from the reference photo, wearing his thick black rectangular glasses. A 1930s police booking MUGSHOT, front-facing. Rumpled dark suit and loosened tie, holding a small plain dark booking placard (no readable date), blank stoic expression, plain height-chart wall behind, harsh booking-room flash. ${PERIOD}`,
  },
]

const MODEL = process.env.SPEAKEASY_MODEL || 'gemini-pro'
const only = process.argv.slice(2)
const run = only.length ? jobs.filter((j) => only.includes(j.name)) : jobs
console.log(`Generating ${run.length} couple/booking renders [${MODEL}]...\n`)
for (const j of run) {
  try {
    const prov = new OpenRouterProvider({ model: MODEL })
    const buf = await prov.generate(j.prompt, { referenceImages: j.refs })
    await optimizeAndSave(buf, join(dir, `${j.name}.png`), { width: null, height: null, format: 'png' })
    console.log(`✓ ${j.name}.png`)
  } catch (e) {
    console.log(`✗ ${j.name} — ${e.message}`)
  }
}
console.log('\nDone → output/speakeasy-wall/')
