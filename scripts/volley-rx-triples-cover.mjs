#!/usr/bin/env node
// One-off: Volley Rx event cover for "Mens & Womens Triples" (Aug 15, USF fundraiser).
// Matches existing event covers: baked-in title text, full art-deco frame, contained composition.
import fs from 'fs';
import sharp from 'sharp';
import { OpenRouterProvider } from '../src/providers/openrouter.js';

const out = process.argv[2] || '/tmp/triples-aug15-v2.jpg';
const W = 1376, H = 768;

const prompt = `Create a vintage 1950s pharmaceutical advertisement poster — a WIDE HORIZONTAL (landscape 16:9) promotional banner for a volleyball tournament.

CRITICAL LAYOUT (apply first):
- Compose ALL content inside a WIDE HORIZONTAL BAND across the CENTER of the square image. Leave generous EMPTY cream space at the very TOP and very BOTTOM (these strips will be trimmed away).
- Everything important — the art-deco border frame, all text, both figures — must sit within the central wide band, nothing in the top/bottom strips.
- Horizontal left-to-right arrangement, not a tall stack.

STYLE:
- 1950s retro-pharmaceutical advertising meets atomic-age art deco. Aged cream paper (#FDF8F0) background with subtle halftone dot texture and warm grain.
- Bold flat shapes, limited palette: deep navy (#1A1A2E), warm red (#C4453A), aged gold (#C4923A), cream (#FDF8F0).
- A wide art-deco border with corner ornaments and a sunburst behind the title.

GRASS THEME: this is an OUTDOOR GRASS volleyball tournament — include a subtle row of stylized grass blades along the very bottom edge inside the border, and a warm outdoor feel.

HORIZONTAL ARRANGEMENT (left to right):
- LEFT: a stylized male volleyball athlete in dynamic navy silhouette, mid-spike, well-proportioned and clearly inside the frame.
- CENTER: the title stacked compactly and CENTERED — the LARGEST line reads "AUGUST FEST", with "MENS & WOMENS TRIPLES" smaller beneath it, generous even letter-spacing, clean alignment. A small "EST. 2026" flourish.
- Directly beneath the title: EXACTLY THREE volleyballs in a neat row (representing the 3-on-3 "triples" format) — exactly three, no more and no fewer, ALL the same cream-and-navy color (do NOT make any ball red), with a single small pharmacy Rx cross symbol to the left of the three balls.
- RIGHT: a stylized female volleyball athlete in dynamic red silhouette, mid-action, well-proportioned and clearly inside the frame, visually balanced with the male figure on the left.
- Below everything, a compact tagline banner: "EVERYONE NEEDS A DOSE".

TEXT (render exactly, clean bold vintage lettering, correct spelling): "AUGUST FEST", "MENS & WOMENS TRIPLES", "EST. 2026", "EVERYONE NEEDS A DOSE".

MOOD: celebratory charity-fundraiser energy, competitive but welcoming, outdoor summer grass tournament. Premium vintage print quality.`;

const provider = new OpenRouterProvider({ model: 'gpt-image' });
if (!(await provider.isAvailable())) {
  console.error('No OPENROUTER_API_KEY in env. Run with: set -a; source .env; set +a');
  process.exit(1);
}
console.log('Generating Triples cover...');
const raw = await provider.generate(prompt, {});
const meta = await sharp(raw).metadata();
console.log(`Native output: ${meta.width}x${meta.height}`);
// Save native uncropped for reference.
const rawPath = out.replace(/\.\w+$/, '-raw.png');
fs.writeFileSync(rawPath, raw);
console.log(`Saved native: ${rawPath}`);
// Extract the central 16:9 band (content is composed there), then resize to target.
const bandH = Math.round(meta.width * H / W);
const top = Math.round((meta.height - bandH) / 2);
await sharp(raw)
  .extract({ left: 0, top, width: meta.width, height: bandH })
  .resize(W, H, { fit: 'cover' })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(out);
console.log(`Saved 16:9 band: ${out} (extracted ${meta.width}x${bandH} @ top=${top})`);
