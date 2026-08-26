/**
 * Speakeasy lounge wall art — render Nino + wife into 1930s Prohibition-era
 * mob photographs, reference-locked off real photos so the likeness holds.
 * Pass 1: solo identity lock. Resolves two forks empirically —
 *   him:  real black glasses vs period round wire-frames
 *   her:  tattoo sleeves visible (likeness) vs covered (period-faithful)
 * Couple shots + mugshot grid come in pass 2 after the faces are locked.
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

const HIM = ['/Users/nino/Downloads/pic/Gemini_Generated_Image_jjlf1hjjlf1hjjlf.png']
const HER = [
  '/Users/nino/Downloads/DSC06124_original.jpg',
  '/Users/nino/Downloads/DSC06277_original.jpg',
  '/Users/nino/Downloads/DSC06301_original.jpg',
]

// Shared period treatment so renders sit next to real archive prints.
const PERIOD = `Render as an AUTHENTIC 1930s Prohibition-era black-and-white photograph: vintage silver-gelatin print, fine silver-halide film grain, slightly soft period lens, single harsh magnesium-flash light source producing bright highlights on the face and a hard dark shadow cast on the wall directly behind the subject. Subtle age, scratches and tonal fade. Must look like a genuine antique press or police photo — NOT modern, NOT digital, NOT color, no smartphone look.`

const ID_HIM = `Preserve the EXACT facial identity, bone structure, skin tone and the completely bald clean-shaven head of the man in the reference photo — same eyes, heavy brow, nose, mouth and jaw. A serious middle-aged man.`
const ID_HER = `Preserve the EXACT facial identity and bone structure of the woman in the reference photos — same sharp cheekbones, same lean athletic muscular build. A striking middle-aged woman.`

const jobs = [
  // ---- HIM ----
  {
    name: 'him-capone-realglasses',
    refs: HIM,
    prompt: `${ID_HIM} He keeps his modern thick black rectangular eyeglasses. Dressed as a 1930s mob boss: sharp three-piece pinstripe wool suit, wide silk tie, white pocket square, a white felt fedora tilted on his bald head. Calm confident slight smirk, a fat cigar held near his mouth. Waist-up studio portrait, looking straight at camera with quiet menace. ${PERIOD}`,
  },
  {
    name: 'him-capone-roundglasses',
    refs: HIM,
    prompt: `${ID_HIM} No modern glasses — instead small round thin wire-frame spectacles appropriate to the 1920s-30s. Dressed as a 1930s mob boss: sharp three-piece pinstripe wool suit, wide silk tie, white pocket square, a white felt fedora tilted on his bald head. Calm confident slight smirk, a fat cigar held near his mouth. Waist-up studio portrait, looking straight at camera with quiet menace. ${PERIOD}`,
  },
  {
    name: 'him-mugshot',
    refs: HIM,
    prompt: `${ID_HIM} No glasses. A 1930s police booking MUGSHOT, front-facing. He wears a rumpled dark suit and loosened tie, holding a small booking placard with arrest numbers across his chest, blank stoic expression, plain height-chart wall behind him, harsh flat booking-room flash. ${PERIOD}`,
  },
  // ---- HER ----
  {
    name: 'her-nightclub-tattoos',
    refs: HER,
    prompt: `${ID_HER} KEEP her heavy full tattoo sleeves visible on both arms and her gold hoop earrings; hair styled into glamorous 1930s finger-waves. A bold tattooed speakeasy nightclub woman: sleeveless bias-cut satin evening gown showing the tattooed arms, long pearl necklace, art-deco drop earrings, a coupe of champagne in hand. Confident defiant expression. Waist-up portrait at a dim nightclub table. ${PERIOD}`,
  },
  {
    name: 'her-nightclub-covered',
    refs: HER,
    prompt: `${ID_HER} Period-faithful: cover both arms with long satin opera gloves and sleeves so NO tattoos show; hair in elegant natural 1930s finger-waves. An elegant Prohibition-era society woman / gangster's wife: tasteful satin gown, fur stole, pearls. Poised demure expression. Waist-up portrait at a dim nightclub table. ${PERIOD}`,
  },
]

const MODEL = process.env.SPEAKEASY_MODEL || 'gemini-pro'
console.log(`Generating ${jobs.length} speakeasy renders [${MODEL}]...\n`)
for (const j of jobs) {
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
