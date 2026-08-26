#!/usr/bin/env node
/**
 * Urvil Performance — v7.
 * Concept: U's right stem is BROKEN / truncated; athlete has just
 * launched off that broken edge. The U is the jumping-off platform.
 */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { OpenRouterProvider } from '../src/providers/openrouter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../output/urvil-performance-logos');
fs.mkdirSync(OUT, { recursive: true });

const REF_FIGURE = path.join(OUT, 'v6-gemini-pro-detailed.png');
const REF_LETTERS = path.join(OUT, 'v6-gpt-image-detailed.png');

// ─── Prompt ─────────────────────────────────────────────────────────
const PROMPT = `
Minimalist black-and-white vector logo for strength-and-conditioning brand "Urvil Performance".

CORE CONCEPT: The letter "U" acts as a jumping-off platform. Its right vertical stem is BROKEN — truncated and ending abruptly partway up (roughly at 60–70% of the letter's height) with a clean flat horizontal edge, like a snapped-off diving platform. The letter "P" sits to the right, fully intact and cleanly drawn.

FIGURE: A solid black silhouette of a male athlete explosively launching upward from the top edge of the U's broken right stem. He is clearly AIRBORNE, mid-leap — his feet have just left the platform with a visible small gap of white space between his feet and the broken U edge. He is NOT standing on it; he has just launched.

POSE: Peak of vertical-jump test. One arm fully extended overhead reaching as high as possible, fingers splayed. Body tilted slightly upward and forward with explosive motion. Opposite arm swinging down along body. Legs just starting to trail — slight bend, pointed toes. Arm reaches well above the top of both letters.

TYPOGRAPHY: Letters in clean bold geometric sans-serif (Archivo Black / Montserrat Black style). Uniform stroke weight. Perfectly upright — no italic. No decorative terminals. The P has a fully symmetrical round bowl.

STYLE: Pure solid black (#000000) on pure white (#FFFFFF). Flat vector logo. No gradients, shadows, textures, outlines, 3D, or additional elements. No other text, numbers, or tagline. Clean professional brand mark. Centered composition, generous white margin, square canvas.
`.trim();

// ─── Jobs ───────────────────────────────────────────────────────────
const jobs = [
  { model: 'gemini-pro',   ref: null,          out: 'v7-gemini-pro-a.png' },
  { model: 'gemini-pro',   ref: null,          out: 'v7-gemini-pro-b.png' },
  { model: 'gemini-pro',   ref: REF_FIGURE,    out: 'v7-gemini-pro-refFigure.png' },
  { model: 'gpt-image',    ref: null,          out: 'v7-gpt-image.png' },
  { model: 'gemini-flash', ref: REF_LETTERS,   out: 'v7-gemini-flash-refLetters.png' },
];

console.log(`\nGenerating ${jobs.length} "broken-U platform" variations in parallel...\n`);

const results = await Promise.allSettled(
  jobs.map(async ({ model, ref, out }) => {
    const start = Date.now();
    try {
      const provider = new OpenRouterProvider({ model });
      const opts = ref ? { referenceImage: ref } : {};
      const buffer = await provider.generate(PROMPT, opts);
      const filePath = path.join(OUT, out);
      fs.writeFileSync(filePath, buffer);
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      return { model, out, status: 'ok', elapsed, kb: (buffer.length / 1024).toFixed(0), ref: ref ? '+ref' : '' };
    } catch (err) {
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      return { model, out, status: 'error', elapsed, error: err.message };
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
