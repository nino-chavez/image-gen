#!/usr/bin/env node
/**
 * Urvil Performance — v8.
 * Concept: U is INCOMPLETE — only its left stem and bottom curve exist.
 * The athlete's silhouette VISUALLY COMPLETES the U's right stem.
 * Figure IS part of the letter, not jumping off it.
 */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { OpenRouterProvider } from '../src/providers/openrouter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../output/urvil-performance-logos');
fs.mkdirSync(OUT, { recursive: true });

const REF_LETTERS = path.join(OUT, 'v7-gemini-flash-refLetters.png');
const REF_FIGURE  = path.join(OUT, 'v6-gemini-pro-detailed.png');

const PROMPT = `
Minimalist black-and-white vector logo for "Urvil Performance" (strength and conditioning brand).

CORE CONCEPT: The monogram "UP". The letter U is INCOMPLETE and OPEN ON THE RIGHT — only the left vertical stem and the bottom curve are drawn. There is no right stem. The silhouette of a male athlete VISUALLY COMPLETES the letter U by occupying the space where its right stem would be. The viewer's eye reads "U" because the figure's vertical silhouette fills that gap and acts as the right stem of the letter.

FIGURE INTEGRATION (critical): The athlete is NOT jumping off the U and NOT floating above it. The athlete IS part of the U letterform. His body stands upright where the U's right stem should be, feet meeting the U's bottom inner curve, torso rising vertically, and reaching arm extending straight up above the top of the letter to complete the vertical line of the right stem. The figure is absorbed into the letter, as if the U was drawn with a person as its right side.

POSE: Peak of vertical-jump test. One arm fully extended overhead with splayed fingers reaching to the highest point (this arm forms the visual vertical stem). Body upright, slightly dynamic — feels like a held reach at peak of a jump. Opposite arm along body. Legs slightly bent with one foot faintly lifted (subtle airborne feel without losing the "part of the letter" integration).

TYPOGRAPHY: Letters in clean bold geometric sans-serif (Archivo Black or Montserrat Black). Chunky and uniform weight. Upright — no italic. No decorative terminals. The P is fully whole with a perfectly symmetrical round bowl.

STYLE: Pure solid black (#000000) on pure white (#FFFFFF). Flat vector. No gradients, shadows, textures, outlines, 3D, motion particles, dust clouds, or additional elements. No other text, numbers, tagline. Clean professional brand mark, centered square composition, generous white margin.
`.trim();

const jobs = [
  { model: 'gemini-pro',   ref: REF_LETTERS,  out: 'v8-gemini-pro-refLetters.png' },
  { model: 'gemini-pro',   ref: REF_FIGURE,   out: 'v8-gemini-pro-refFigure.png' },
  { model: 'gemini-pro',   ref: null,         out: 'v8-gemini-pro-solo.png' },
  { model: 'gemini-flash', ref: REF_LETTERS,  out: 'v8-gemini-flash-refLetters.png' },
  { model: 'gpt-image',    ref: REF_LETTERS,  out: 'v8-gpt-image-refLetters.png' },
];

console.log(`\nGenerating ${jobs.length} "figure completes U" variations in parallel...\n`);

const results = await Promise.allSettled(
  jobs.map(async ({ model, ref, out }) => {
    const start = Date.now();
    try {
      const provider = new OpenRouterProvider({ model });
      const opts = ref ? { referenceImage: ref } : {};
      const buffer = await provider.generate(PROMPT, opts);
      fs.writeFileSync(path.join(OUT, out), buffer);
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      return { model, out, status: 'ok', elapsed, kb: (buffer.length / 1024).toFixed(0), ref: ref ? path.basename(ref).replace(/.*-/, '+ref:') : '' };
    } catch (err) {
      return { model, out, status: 'error', elapsed: ((Date.now() - start)/1000).toFixed(1), error: err.message };
    }
  })
);

console.log('\n─── Results ─────────────────────────────────────────────');
for (const r of results) {
  const v = r.value ?? r.reason;
  if (v.status === 'ok') {
    console.log(`  ${v.model.padEnd(14)} ${v.elapsed}s  ${v.kb}KB  ${v.ref}  →  ${v.out}`);
  } else {
    console.log(`  ${v.model.padEnd(14)} ${v.elapsed}s  FAIL: ${v.error}`);
  }
}
console.log('─────────────────────────────────────────────────────────\n');
