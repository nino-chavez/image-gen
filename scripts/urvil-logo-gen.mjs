#!/usr/bin/env node
/**
 * Urvil Performance — multi-model logo generation.
 * Runs several high-quality image models in parallel with a direct prompt
 * (bypasses the style-system prompt builder, which forbids typography).
 */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { OpenRouterProvider } from '../src/providers/openrouter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../output/urvil-performance-logos');
fs.mkdirSync(OUT, { recursive: true });

// ─── Prompt variants ────────────────────────────────────────────────
const PROMPT_DETAILED = `
Design a professional black-and-white vector logo for a strength and conditioning brand called "Urvil Performance".

COMPOSITION: The letters "U" and "P" as a tight monogram, side by side, with a dynamic silhouette of a male athlete performing a vertical-jump test integrated into the right portion of the letter "U". The athlete's reaching arm extends UP and above the top of the letters. The athlete is a clean solid black silhouette — one arm fully extended overhead reaching to the highest point, splayed fingers, body in mid-air peak of vertical leap, legs slightly bent, opposite arm swinging down alongside body.

TYPOGRAPHY: The "U" and "P" must be set in a clean modern geometric sans-serif in extra-bold weight (similar to Archivo Black, Montserrat Black, or Bebas Neue Bold). Uniform stroke width. Perfectly upright — no italic slant. No decorative flairs or serifs on the terminals. The P has a fully symmetrical, clean round bowl. The U has clean rounded bottom curve.

STYLE: Flat minimal vector logo. Pure solid black (#000000) silhouettes on pure white (#FFFFFF) background. No gradients, no shadows, no textures, no 3D effects, no outlines, no decorative elements.

COMPOSITION: Centered logo on square canvas with generous white margin. The athlete silhouette is fully contained or breaks cleanly above the U — NO stray shapes, NO floating artifacts, NO extra feet or limbs poking out of the letters at the bottom. Everything resolves cleanly.

NO other text, numbers, tagline, or graphic elements. Just the "UP" monogram + athlete silhouette.
`.trim();

const PROMPT_TIGHT = `
Minimal black-and-white logo: the letters "UP" as a bold geometric sans-serif monogram (Archivo Black style, upright, uniform weight, no italic). A solid black silhouette of an athlete jumping for a vertical-jump test is integrated into the right side of the U — one arm fully extended overhead reaching high above the top of the letters, body in mid-leap, legs slightly bent. Pure black on pure white. Flat vector, no gradients, no shadows, no texture. No extra elements, no floating shapes, clean resolution at all edges. For the brand "Urvil Performance".
`.trim();

// ─── Jobs ───────────────────────────────────────────────────────────
const jobs = [
  { model: 'gemini-pro',   prompt: PROMPT_DETAILED, out: 'v6-gemini-pro-detailed.png' },
  { model: 'gemini-pro',   prompt: PROMPT_TIGHT,    out: 'v6-gemini-pro-tight.png' },
  { model: 'gemini-flash', prompt: PROMPT_DETAILED, out: 'v6-gemini-flash-detailed.png' },
  { model: 'gpt-image',    prompt: PROMPT_DETAILED, out: 'v6-gpt-image-detailed.png' },
  { model: 'flux-max',     prompt: PROMPT_DETAILED, out: 'v6-flux-max-detailed.png' },
];

console.log(`\nGenerating ${jobs.length} logo variations in parallel...\n`);

const results = await Promise.allSettled(
  jobs.map(async ({ model, prompt, out }) => {
    const start = Date.now();
    try {
      const provider = new OpenRouterProvider({ model });
      if (!(await provider.isAvailable())) throw new Error('API key unavailable');

      const buffer = await provider.generate(prompt);
      const filePath = path.join(OUT, out);
      fs.writeFileSync(filePath, buffer);

      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      const kb = (buffer.length / 1024).toFixed(0);
      return { model, out, status: 'ok', elapsed, kb };
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
    console.log(`  ${v.model.padEnd(14)} ${v.elapsed}s  ${v.kb}KB  →  ${v.out}`);
  } else {
    console.log(`  ${v.model.padEnd(14)} ${v.elapsed}s  FAIL: ${v.error}`);
  }
}
console.log('─────────────────────────────────────────────────────────\n');
