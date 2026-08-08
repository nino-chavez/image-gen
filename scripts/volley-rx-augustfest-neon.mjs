#!/usr/bin/env node
// August Fest hero — NEON / synthwave style, inspired by Payton's IG flyer.
// Hot pink + cyan + purple neon on a dark grainy background, apothecary/Rx motif.
// Landscape 16:9: compose in the central band of the square, extract the middle strip.
import fs from 'fs';
import sharp from 'sharp';
import { OpenRouterProvider } from '../src/providers/openrouter.js';

const out = process.argv[2] || '/tmp/af-neon.jpg';
const W = 1376, H = 768;

const prompt = `Create a WIDE HORIZONTAL (landscape 16:9) promotional banner for an outdoor grass volleyball tournament, in a 1980s/1990s RETRO NEON SYNTHWAVE poster style fused with vintage apothecary/pharmacy motifs.

CRITICAL LAYOUT (apply first — this is the most important rule):
- The ENTIRE design must fit inside a WIDE LETTERBOX strip occupying only the MIDDLE HALF of the square (roughly the central 16:9 band). The TOP QUARTER and BOTTOM QUARTER of the square must be COMPLETELY EMPTY dark background — absolutely no artwork, text, arms, heads, crest tips, or grass in those top/bottom zones.
- Picture a wide cinematic banner floating in the center of a tall dark canvas, with thick empty dark margins above and below.
- Both athlete figures must be COMPACT and SHORT enough that even their raised arms stay within the central band — do NOT let any arm, hand, head, or the top of the crest reach into the top quarter. Nothing clipped at any edge.
- Horizontal left-to-right arrangement, not a tall stack.

STYLE & PALETTE:
- Dark background: near-black with a mottled deep-purple and magenta grain/speckle texture (gritty, glowing).
- NEON palette: hot pink / magenta (#FF3D9A), electric cyan / blue (#37D0FF), vivid purple (#8A4FFF), with warm cream / off-white (#FBF3E2) for the main lettering.
- Bold neon glow outlines, chunky 3D extruded lettering with pink-and-cyan edge highlights, subtle scanline/grain. Retro arcade / synthwave energy, NOT vintage sepia, NOT muted.

CENTER EMBLEM:
- A bold shield / crest badge outlined in glowing pink and cyan neon. Inside it: a small line-art diving volleyball player at the top, a few pink star sparkles, and a circular pharmacy "Rx" emblem.
- A trio of EXACTLY THREE volleyballs (the 3-on-3 "triples" motif) — exactly three, glowing neon-outlined.

HORIZONTAL ARRANGEMENT (left to right):
- LEFT: a stylized male volleyball athlete silhouette in neon cyan, mid-spike, clearly inside the frame.
- CENTER: the crest/title block — LARGEST line "AUGUST FEST" in chunky cream lettering with pink + cyan neon outline, "MENS & WOMENS TRIPLES" beneath in neon, a small "EST. 2026".
- RIGHT: a stylized female volleyball athlete silhouette in neon pink/magenta, mid-action, balanced with the left figure.
- The banner reading "EVERYONE NEEDS A DOSE" must sit fully INSIDE the central band, comfortably above the bottom edge (never cropped). Glowing neon purple/cyan grass blades along the lower edge behind it.
- Spell the year exactly "EST. 2026" (twenty-twenty-six), not 2926 or 2026 with extra digits.

TEXT (render exactly, clean bold lettering, correct spelling): "AUGUST FEST", "MENS & WOMENS TRIPLES", "EST. 2026", "EVERYONE NEEDS A DOSE".

MOOD: electric, fun, eye-catching summer night energy. Premium neon poster quality.`;

const provider = new OpenRouterProvider({ model: 'gpt-image' });
if (!(await provider.isAvailable())) { console.error('No OPENROUTER_API_KEY'); process.exit(1); }
console.log('Generating neon August Fest hero...');
const raw = await provider.generate(prompt, {});
const meta = await sharp(raw).metadata();
console.log(`Native: ${meta.width}x${meta.height}`);
fs.writeFileSync(out.replace(/\.\w+$/, '-raw.png'), raw);
const bandH = Math.round(meta.width * H / W);
const top = Math.round((meta.height - bandH) / 2);
await sharp(raw)
  .extract({ left: 0, top, width: meta.width, height: bandH })
  .resize(W, H, { fit: 'cover' })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(out);
console.log(`Saved 16:9 band: ${out}`);
