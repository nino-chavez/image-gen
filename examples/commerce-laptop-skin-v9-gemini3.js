#!/usr/bin/env node
/**
 * Commerce.com Laptop Skin - V9 Blueprint with Gemini 3 Pro
 */

import { createGenerator } from '../src/index.js';
import fs from 'fs';

const TEST_WIDTH = 1800;
const TEST_HEIGHT = 1274;

const outputDir = './output';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const V9_PROMPT = `Create a laptop skin with a BLUEPRINT / ARCHITECTURAL style showing commerce platform construction.

COLORS:
- Deep navy background: #1e1b4b (like blueprint paper)
- Blueprint lines: White #ffffff and light purple #a5b4fc
- Accent highlights: Electric teal #2dd4bf
- Key elements: Commerce purple #6366f1

CONCEPT: The Architect's Blueprint
A Product Architect's working document - the plans for building commerce.

VISUAL ELEMENTS:
- Technical drawing style linework
- Exploded view diagrams of commerce components
- Storefronts shown as architectural elevations
- Shopping cart mechanical drawings
- Package boxes with dimension lines
- The "C" logo integrated as a stamp or key component
- Grid lines (subtle, not overwhelming)
- Circular detail callouts
- Dotted construction lines
- Small annotation marks (no readable text, just marks)

COMPOSITION:
- Fill the ENTIRE canvas with blueprint content - no empty center
- Main "elevation" or exploded view as the focal point
- Supporting detail drawings distributed across the design
- Varied line weights (thick for main, thin for detail)
- Breathing room - not cluttered
- Professional technical drawing aesthetic
- DO NOT leave any blank or empty circular area in the center
- The design should be continuous across the entire surface

STYLE:
- Architectural blueprint meets product design
- Clean precise linework
- Mix of 2D elevations and subtle 3D hints
- Sophisticated, not sterile
- Like something from a design museum

NO readable text - just technical marks and symbols.
IMPORTANT: Fill the entire canvas - no cutouts, no empty center areas.
Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`;

async function main() {
  console.log('🎨 Commerce V9 Blueprint with Gemini 3 Pro\n');

  const generator = await createGenerator({
    provider: 'openrouter',
    model: 'google/gemini-3-pro-image-preview',
    width: TEST_WIDTH,
    height: TEST_HEIGHT,
    format: 'png',
    quality: 100,
  });

  console.log('Generating commerce-v9-blueprint-gemini3pro...');
  const result = await generator.generateFromDescription(V9_PROMPT, `${outputDir}/commerce-v9-blueprint-gemini3pro.png`);
  console.log(`✅ commerce-v9-blueprint-gemini3pro.png (${result.sizeKB}KB)`);

  console.log('\n✨ Done!\n');
}

main().catch(console.error);
