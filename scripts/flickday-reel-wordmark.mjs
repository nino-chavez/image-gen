/**
 * Flickday Media — "d as film reel" wordmark.
 * Concept: lowercase "flickday", heavy rounded italic sans; the bowl of the "d"
 * IS a circular film reel, with a 35mm film strip ribboning off the top-right.
 * Colors from BRAND-PRIORS.md: Flickday Yellow #facc15, bright #fde047,
 * black #000000, white #ffffff. Owner prefers the lowercase logotype over Bebas caps.
 *
 * Three variants:
 *   on-white  — charcoal letters + gold reel, white bg (web/social/print master)
 *   on-black  — white letters + gold reel, black bg (dark site + video overlay)
 *   apparel   — FLAT single-color gold on black, no gloss (DTF garment master, -dark pair)
 *
 * Reference image is the existing logo (concept anchor for reel-in-the-d), with the
 * prompt instructed to modernize/flatten so we don't just clone the old glossy 3D mark.
 */
import 'dotenv/config'
import { OpenRouterProvider } from '../src/providers/openrouter.js'
import { optimizeAndSave } from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdirSync } from 'node:fs'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = join(HERE, '..', 'output', 'flickday-reel-wordmark')
mkdirSync(OUT, { recursive: true })

const REF = join(HERE, '..', 'refs', 'flickday-logo-ref.png')

// Shared letterform + reel concept. Every variant carries this verbatim.
const BASE = `Brand wordmark logo, horizontal lockup, for a sports-media company.
The single word "flickday" spelled f-l-i-c-k-d-a-y in lowercase, set in a heavy,
bold, rounded geometric sans-serif with a slight forward italic lean and tight,
even kerning. The lowercase letter "d" is the hero: its round bowl IS a circular
movie film reel — a classic reel with a raised center hub, curved interior spokes,
and round film holes — and a perforated 35mm film strip ribbons upward and trails
off the top-right of the word in a smooth dynamic arc, sprocket-hole perforations
running along both edges of the strip. The reel and the film strip read as one
continuous cinematic object that still clearly forms the letter "d". Directly
beneath the wordmark, smaller and in the same rounded italic sans-serif, the word
"media" spelled m-e-d-i-a. Correct spelling only, no extra or garbled letters.
Modern, clean, professional brand mark. Centered composition with generous margins.`

const variants = [
  {
    name: 'on-white',
    prompt: `${BASE}
COLOR: the "flickday" and "media" letters in solid deep charcoal-black (#1a1a1a);
the film reel and film strip in polished brand gold-yellow (#facc15) with a lighter
yellow highlight (#fde047). Crisp flat vector shapes with only subtle dimensional
shading on the reel. Plain solid white (#ffffff) background. No photograph, no busy
scene, no gradients behind the mark, no additional text or taglines.`,
  },
  {
    name: 'on-black',
    prompt: `${BASE}
COLOR: the "flickday" and "media" letters in pure white (#ffffff); the film reel
and film strip in brand gold-yellow (#facc15) with a lighter yellow highlight
(#fde047). Bold high-contrast vector logo on a solid pure-black (#000000)
background. Clean, no photograph, no gradients behind the mark, no extra text.`,
  },
  {
    name: 'apparel-flat',
    prompt: `${BASE}
STYLE: FLAT one-color garment-print / DTF artwork. Render the entire mark —
"flickday", "media", the film reel and the film strip — in a SINGLE solid brand
gold-yellow (#facc15), with the reel's holes, hub gaps and film-strip perforations
KNOCKED OUT so the black background shows through them. Absolutely flat: NO
gradients, NO glow, NO drop shadow, NO 3D bevel, NO soft edges, NO highlight color.
Pure crisp vector silhouette suitable for one-color screen printing on a dark
garment. Solid pure-black (#000000) background.`,
  },
]

const MODEL = process.env.FD_MODEL || 'gpt-image'
const useRef = process.env.FD_NOREF ? false : true
const only = process.argv.slice(2)
const run = only.length ? variants.filter((v) => only.includes(v.name)) : variants

console.log(`\nFlickday reel-wordmark — ${run.length} variant(s) [${MODEL}]${useRef ? ' +ref' : ''}\n`)

const results = await Promise.allSettled(
  run.map(async (v) => {
    const start = Date.now()
    const prov = new OpenRouterProvider({ model: MODEL })
    const opts = useRef ? { referenceImage: REF } : {}
    const buf = await prov.generate(v.prompt, opts)
    const file = join(OUT, `${v.name}-${MODEL}.png`)
    await optimizeAndSave(buf, file, { width: null, height: null, format: 'png' })
    return { name: v.name, file: `${v.name}-${MODEL}.png`, s: ((Date.now() - start) / 1000).toFixed(1), kb: (buf.length / 1024).toFixed(0) }
  })
)

console.log('\n─── Results ─────────────────────────────────────────')
for (const r of results) {
  if (r.status === 'fulfilled') console.log(`  ok   ${r.value.s}s  ${r.value.kb}KB  →  ${r.value.file}`)
  else console.log(`  FAIL  ${r.reason?.message || r.reason}`)
}
console.log(`──────────────────────────────────────────────────────\noutput/flickday-reel-wordmark/\n`)
