/**
 * Speakeasy wall — wife identity FIX v3. Earlier passes failed: volleyball
 * shots hid her eyes behind sunglasses, and the older homecoming crops never
 * locked the face. This pass uses ONLY fresh clear profile photos taken today,
 * cropped tight (refs/wife-{front,smile,profile}.jpg), with a descriptor
 * rebuilt from what's actually in those shots. No old reference paths remain —
 * nothing from the previous photos can leak in.
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

const R = join(HERE, '..', 'refs')
const HIM = '/Users/nino/Downloads/pic/Gemini_Generated_Image_jjlf1hjjlf1hjjlf.png'
// Fresh photos from today only. front = neutral lock, smile = teeth/expression,
// profile = nose/jaw structure. The old DSC06 / her-face crops are NOT referenced.
const HER_REFS = [join(R, 'wife-front.jpg'), join(R, 'wife-smile.jpg'), join(R, 'wife-profile.jpg')]
const HER_ONE = join(R, 'wife-front.jpg')

const PERIOD = `Render as an AUTHENTIC 1930s Prohibition-era black-and-white photograph: vintage silver-gelatin print, fine silver-halide film grain, period lens, single harsh magnesium-flash source with bright facial highlights and a hard dark shadow on the wall behind. Subtle age, scratches and tonal fade. Must look like a genuine antique photo — NOT modern, NOT digital, NOT color.`

// MINIMAL descriptor. The previous version was stacked with aging adjectives
// ("deeply sun-weathered, hollow cheeks, heavy crow's-feet, deep expression
// lines, do NOT make her younger/softer") — GPT Image obeyed the words instead
// of the reference and rendered a gaunt, much older, unflattering stranger. The
// reference photos already carry her likeness; the job of the words is only to
// (a) name facts a head-on photo can't show and (b) STOP the model from
// exaggerating. Do not re-describe her face.
const HER = `Faithfully match the woman in the reference photos — her exact face, bone structure, proportions, age and natural skin. She is a lean, athletic woman in her early-to-mid 40s with blue-green eyes, gold hoop earrings, and a colorful tattoo sleeve on one arm. Her real hair is dyed bright blue; render it as a natural dark tone slicked back for this black-and-white period photo. Keep her likeness completely faithful and natural — do NOT exaggerate, age, gaunt, harden or hollow her features, and do not add extra wrinkles. She should look like the same attractive, healthy woman in the photos.`
const MAN = `the bald clean-shaven middle-aged man with a heavy brow and thick black rectangular eyeglasses from the FIRST reference image`

const jobs = [
  {
    name: 'her-nightclub-tattoos',
    refs: HER_REFS,
    prompt: `${HER} A bold tattooed speakeasy nightclub woman: sleeveless bias-cut satin evening gown showing her tattoo sleeve, long pearl necklace, art-deco drop earrings, a coupe of champagne in hand. Confident smiling expression. Waist-up portrait at a dim nightclub table. ${PERIOD}`,
  },
  {
    name: 'her-mugshot',
    refs: HER_REFS,
    prompt: `${HER} A 1930s police booking MUGSHOT, front-facing. She wears a simple dark sleeveless dress with her tattoo sleeve visible, holding a small plain booking placard, defiant expression, plain height-chart wall behind, harsh booking-room flash. ${PERIOD}`,
  },
  {
    name: 'couple-nightclub',
    refs: [HIM, HER_ONE],
    prompt: `A 1930s speakeasy nightclub photograph of a COUPLE seated close together at a small candlelit table. The MAN (${MAN}) in a pinstripe three-piece suit and a white felt fedora, a cigar in one hand, his other arm around her. The WOMAN beside him — ${HER} — in a sleeveless satin evening gown with her tattoo sleeve visible, long pearls. Both look straight at the camera like they own the room. Two people, waist-up, intimate dim club. ${PERIOD}`,
  },
  {
    name: 'couple-walking',
    refs: [HIM, HER_ONE],
    prompt: `A 1930s candid newspaper press photograph: a glamorous, well-dressed couple walking arm-in-arm through a busy city street at night, caught by a press photographer's flash. The MAN (${MAN}) in a long dark overcoat and white fedora, a cigar at his mouth, calm and confident. The WOMAN on his arm — ${HER} — in an elegant fur-collared coat with her tattooed forearm visible, poised and stylish. Full-body, two people, slight motion blur, onlookers blurred behind. ${PERIOD}`,
  },
  {
    name: 'couple-booking-card',
    refs: [HIM, HER_ONE],
    prompt: `A 1930s police "rogues gallery" booking card showing TWO mugshots side by side. On the LEFT, the MAN (${MAN}) in a rumpled 1930s dark suit and tie. On the RIGHT, the WOMAN — ${HER} — in a plain 1930s dark dress with her tattoo sleeve visible. Both front-facing booking photos against a plain height-chart wall under harsh booking-room flash, stoic expressions. Aged police record card. Below each photo hangs a small BLANK dark metal placard that is completely empty — absolutely NO text, NO letters, NO numbers, NO captions, NO names anywhere on the entire card. The placards are smooth and blank. ${PERIOD}`,
  },
]

const MODEL = process.env.SPEAKEASY_MODEL || 'gemini-pro'
const only = process.argv.slice(2)
const run = only.length ? jobs.filter((j) => only.includes(j.name)) : jobs
console.log(`Regenerating ${run.length} wife-fix renders [${MODEL}]...\n`)
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
