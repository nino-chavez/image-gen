/**
 * Flickday — standalone "d" film-reel glyph (composited into the wordmark manually).
 * The failure mode in every prior render was ORIENTATION: the film strip left the
 * top of the reel, so the shape never read as a lowercase "d". This prompt pins it:
 * bowl (reel) on the LEFT, ascender (film strip) on the RIGHT, rising above the bowl.
 * Colors from BRAND-PRIORS.md: #facc15 / #fde047. White + black plates for easy keying.
 */
import 'dotenv/config'
import { OpenRouterProvider } from '../src/providers/openrouter.js'
import { optimizeAndSave } from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdirSync } from 'node:fs'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = join(HERE, '..', 'output', 'flickday-d-glyph')
mkdirSync(OUT, { recursive: true })

const CORE = `Flat 2D vector logo icon of a movie film reel forming a single lowercase letter "d", isolated, no wordmark. The round bowl of the "d" is on the LEFT and is a circular film reel seen head-on with a raised center hub and evenly spaced round film holes; the ascender is on the RIGHT and rises well above the bowl, formed by a strip of perforated 35mm film running straight up the reel's right edge then curling over at the top, sprocket holes along both edges. Bowl-on-left plus film-strip-stem-on-right read instantly as a lowercase "d". Bold solid brand gold-yellow (#facc15) with a subtle lighter-yellow highlight (#fde047) and thin dark outlines, crisp flat shapes, centered with generous margins.`

const variants = [
  { name: 'on-white', bg: 'Plain solid pure-white background. No other letters, no words, no text, no extra objects, no photorealism, no 3D, no drop shadow, no background scene.' },
  { name: 'on-black', bg: 'Plain solid pure-black background for a knockout to composite on dark. No other letters, no words, no text, no extra objects, no photorealism, no 3D, no drop shadow, no background scene.' },
]

const MODEL = process.env.FD_MODEL || 'gpt-image'
const only = process.argv.slice(2)
const run = only.length ? variants.filter((v) => only.includes(v.name)) : variants

console.log(`\nFlickday "d" glyph — ${run.length} plate(s) [${MODEL}]\n`)

const results = await Promise.allSettled(
  run.map(async (v) => {
    const start = Date.now()
    const prov = new OpenRouterProvider({ model: MODEL })
    const buf = await prov.generate(`${CORE}\n\n${v.bg}`, {})
    const file = join(OUT, `d-${v.name}-${MODEL}.png`)
    await optimizeAndSave(buf, file, { width: null, height: null, format: 'png' })
    return { file: `d-${v.name}-${MODEL}.png`, s: ((Date.now() - start) / 1000).toFixed(1), kb: (buf.length / 1024).toFixed(0) }
  })
)

console.log('\n─── Results ─────────────────────────────────────────')
for (const r of results) {
  if (r.status === 'fulfilled') console.log(`  ok   ${r.value.s}s  ${r.value.kb}KB  →  ${r.value.file}`)
  else console.log(`  FAIL  ${r.reason?.message || r.reason}`)
}
console.log(`──────────────────────────────────────────────────────\noutput/flickday-d-glyph/\n`)
