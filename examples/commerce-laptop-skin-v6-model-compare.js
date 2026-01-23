#!/usr/bin/env node
/**
 * Commerce.com Laptop Skin - Model Comparison
 * Testing V16 and V18 prompts with:
 * - Gemini 3 Pro Image (google/gemini-3-pro-image-preview)
 * - GPT-5 Image (openai/gpt-5-image)
 */

import { createGenerator } from '../src/index.js';
import fs from 'fs';

const TEST_WIDTH = 1800;
const TEST_HEIGHT = 1274;

const outputDir = './output';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// V16 Prompt - Full Detail Exploded Stack
const V16_PROMPT = `Create a TECHNICAL BLUEPRINT laptop skin showing Commerce platform architecture.

STYLE: Classic architectural blueprint / technical drawing
CRITICAL: ABSOLUTELY NO TEXT, WORDS, NUMBERS, OR LABELS anywhere in the image. Zero text.

BACKGROUND: Deep navy blueprint paper #1e1b4b

LINE COLORS:
- Primary structural lines: White #ffffff
- Secondary detail lines: Light periwinkle #a5b4fc
- Data flow accents: Electric teal #2dd4bf
- AI/intelligence accents: Soft coral #f97316

THE COMMERCE C LOGO (draw accurately):
- Two curved wedge segments forming a geometric C
- Left segment: larger curved wedge (like pac-man)
- Right segment: smaller curved wedge completing the C
- White space GAP between the two segments
- Render in white lines as a prominent "stamp" element

CENTRAL COMPOSITION - ISOMETRIC EXPLODED VIEW:
Draw an isometric technical illustration showing 4 platform layers:

LAYER 1 (BOTTOM) - ENGINE:
- Solid rectangular foundation block
- Database cylinder symbols on top
- Gear mechanism visible inside (cross-section view)
- Shopping cart schematic
- API connection nodes (small circles) on edges

LAYER 2 - STOREFRONT:
- Floating above engine (show gap)
- Storefront building elevation (awning, window, door)
- Browser window frame with component grid inside
- React-style component tree diagram
- Dotted connection lines down to engine

LAYER 3 - DATA FEEDS:
- Floating above storefront
- Central hub with radiating arrows outward
- Channel endpoint circles (5-6 around the hub)
- Data transformation symbol (input arrow → box → output arrow)
- Flow lines connecting to storefront below

LAYER 4 (TOP) - AI:
- Floating highest
- Neural network diagram (interconnected nodes)
- Brain outline or lightbulb schematic
- Sparkle/star symbols indicating intelligence
- Connects down to all other layers

BLUEPRINT DRAWING ELEMENTS:
- Dimension lines with small perpendicular end caps (no numbers)
- Circular detail callout bubbles (empty, no text)
- Dotted construction guide lines
- Subtle background grid
- Varying line weights (thick structural, thin detail)

CORNER DETAIL CALLOUTS (4 corners):
Each in a circular callout bubble with pointer line to main diagram

THE C LOGO PLACEMENT:
- Render as a "stamp" or "seal" - bottom right or integrated into the engine layer

ABSOLUTELY NO TEXT, NUMBERS, LETTERS, OR READABLE LABELS.
Only technical drawing marks, symbols, and the C logo shape.

Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`;

// V18 Prompt - Circuit Board Style
const V18_PROMPT = `Create a BLUEPRINT laptop skin with circuit board influence.

STYLE: Architectural blueprint meets PCB aesthetics
CRITICAL: ABSOLUTELY NO TEXT, WORDS, NUMBERS, OR LABELS. Zero text anywhere.

BACKGROUND: Deep navy #1e1b4b
PRIMARY LINES: White #ffffff
ACCENTS: Teal #2dd4bf (data), coral #f97316 (AI)

COMMERCE C LOGO: Two curved segments forming geometric C shape, white lines, prominently placed

CENTRAL ELEMENT:
Isometric platform "chip" with internal architecture visible:

THE MAIN CHIP/PLATFORM (center):
- Large rectangular chip outline with beveled edges
- Internal zones for each component:
  - Engine zone: database cylinders + gears
  - Storefront zone: building icon + browser window
  - Data zone: hub + radiating arrows
  - AI zone: neural network nodes
- Pin connections radiating from edges
- Via points (small circles) at intersections

SURROUNDING ELEMENTS:
- PCB trace lines connecting to corners
- Detail callout circles (3-4) with pointer lines
- Component symbols in corners
- Data flow indicators (teal traces)
- AI connection lines (coral traces)

BLUEPRINT STYLE:
- Technical precision
- Dimension marks (no numbers, just tick marks)
- Grid underlay
- Cross-hatching fills for solid sections
- Varying line weights

C LOGO: As chip marking/stamp, prominently displayed

Clean, sophisticated, technical.
ABSOLUTELY NO TEXT, WORDS, OR LABELS ANYWHERE.

Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`;

async function generateWithModel(modelAlias, modelId, promptName, prompt) {
  const name = `commerce-${promptName}-${modelAlias}`;

  const generator = await createGenerator({
    provider: 'openrouter',
    model: modelId,
    width: TEST_WIDTH,
    height: TEST_HEIGHT,
    format: 'png',
    quality: 100,
  });

  console.log(`\nGenerating ${name}...`);
  console.log(`  Model: ${modelId}`);

  try {
    const result = await generator.generateFromDescription(prompt, `${outputDir}/${name}.png`);
    console.log(`  ✅ ${name}.png (${result.sizeKB}KB)`);
    return { success: true, name, size: result.sizeKB };
  } catch (error) {
    console.log(`  ❌ Failed: ${error.message}`);
    return { success: false, name, error: error.message };
  }
}

async function main() {
  console.log('🎨 Commerce Blueprint - Model Comparison\n');
  console.log('Testing V16 (exploded) and V18 (circuit) with:\n');
  console.log('  1. Gemini 3 Pro Image');
  console.log('  2. GPT-5 Image\n');
  console.log('=' .repeat(50));

  const results = [];

  // Gemini 3 Pro Image
  results.push(await generateWithModel(
    'gemini3pro',
    'google/gemini-3-pro-image-preview',
    'v16-exploded',
    V16_PROMPT
  ));

  results.push(await generateWithModel(
    'gemini3pro',
    'google/gemini-3-pro-image-preview',
    'v18-circuit',
    V18_PROMPT
  ));

  // GPT-5 Image
  results.push(await generateWithModel(
    'gpt5',
    'openai/gpt-5-image',
    'v16-exploded',
    V16_PROMPT
  ));

  results.push(await generateWithModel(
    'gpt5',
    'openai/gpt-5-image',
    'v18-circuit',
    V18_PROMPT
  ));

  console.log('\n' + '='.repeat(50));
  console.log('\n📊 Results Summary:\n');

  for (const r of results) {
    if (r.success) {
      console.log(`  ✅ ${r.name}.png (${r.size}KB)`);
    } else {
      console.log(`  ❌ ${r.name} - ${r.error}`);
    }
  }

  console.log('\n✨ Model comparison complete!\n');
}

main().catch(console.error);
