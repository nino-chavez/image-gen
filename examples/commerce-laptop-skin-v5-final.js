#!/usr/bin/env node
/**
 * Commerce.com Laptop Skin - Final Round
 * Mix of V9 (classic blueprint) + V12 (full architecture)
 * NO TEXT LABELS
 */

import { createGenerator } from '../src/index.js';
import fs from 'fs';

const TEST_WIDTH = 1800;
const TEST_HEIGHT = 1274;

const outputDir = './output';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generate(name, prompt) {
  const generator = await createGenerator({
    provider: 'openrouter',
    model: 'gemini-flash',
    width: TEST_WIDTH,
    height: TEST_HEIGHT,
    format: 'png',
    quality: 100,
  });

  console.log(`\nGenerating ${name}...`);
  const result = await generator.generateFromDescription(prompt, `${outputDir}/${name}.png`);
  console.log(`✅ ${name}.png (${result.sizeKB}KB)`);
  return result;
}

async function main() {
  console.log('🎨 Commerce Blueprint - Final Mix (V9 + V12 style)\n');
  console.log('NO TEXT LABELS - Pure technical illustration\n');

  // V16: Classic Blueprint + Full Architecture
  await generate('commerce-final-v16', `Create a TECHNICAL BLUEPRINT laptop skin showing Commerce platform architecture.

STYLE: Classic architectural blueprint / technical drawing (like V9 reference)
CONTENT: Full platform with all 4 components (like V12 reference)
CRITICAL: ABSOLUTELY NO TEXT, WORDS, OR LABELS anywhere in the image

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
- Section cut indicators (just lines, no letters)
- Varying line weights (thick structural, thin detail)
- Cross-hatching for solid sections

CORNER DETAIL CALLOUTS (4 corners):
- Top-left: Enlarged gear/engine detail
- Top-right: Storefront component detail
- Bottom-left: Data flow hub detail
- Bottom-right: Neural network detail
Each in a circular callout bubble with pointer line to main diagram

THE C LOGO PLACEMENT:
- Render as a "stamp" or "seal" - could be bottom right or integrated into the engine layer
- Should be recognizable and prominent

COMPOSITION FLOW:
- Main exploded diagram slightly left of center
- Corner callouts frame the composition
- Breathing room around elements
- Apple logo area consideration (center or offset)
- Professional, museum-quality technical illustration

ABSOLUTELY NO TEXT, NUMBERS, LETTERS, OR READABLE LABELS.
Only technical drawing marks, symbols, and the C logo shape.

Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`);

  // V17: Variation - More horizontal flow
  await generate('commerce-final-v17', `Create a BLUEPRINT STYLE laptop skin with horizontal architecture flow.

STYLE: Technical drawing / architectural blueprint
CRITICAL: NO TEXT OR LABELS OF ANY KIND

BACKGROUND: Navy #1e1b4b
LINES: White #ffffff primary, teal #2dd4bf accents, periwinkle #a5b4fc secondary

COMMERCE C LOGO: Two curved segments forming geometric C (white, prominent placement)

COMPOSITION - HORIZONTAL TECHNICAL FLOW:
Left-to-right progression showing platform layers:

[ENGINE] → [STOREFRONT] → [DATA FEEDS] → [AI]

Each section as a detailed technical drawing:

ENGINE (left section):
- Database cylinders
- Gear cross-section
- Cart schematic
- Foundation block

STOREFRONT (left-center):
- Building elevation with awning
- Browser window
- Component blocks
- Connected to engine via lines

DATA FEEDS (right-center):
- Hub with radiating arrows
- Channel circles
- Transformation diagram
- Flow arrows outward

AI (right section):
- Neural network nodes
- Brain schematic
- Sparkle indicators
- Connects back to all

BLUEPRINT ELEMENTS:
- Dimension lines (no numbers)
- Connection flows between sections
- Detail callouts (2-3)
- Grid background (subtle)
- Varying line weights
- Cross-section views

C LOGO: Integrated into flow or as corner stamp

NO TEXT. Pure technical illustration.
Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`);

  // V18: Variation - Circuit board influence
  await generate('commerce-final-v18', `Create a BLUEPRINT laptop skin with subtle circuit board influence.

STYLE: Architectural blueprint meets PCB aesthetics
CRITICAL: ABSOLUTELY NO TEXT, WORDS, OR LABELS

BACKGROUND: Deep navy #1e1b4b
PRIMARY LINES: White #ffffff
ACCENTS: Teal #2dd4bf (data), coral #f97316 (AI)

COMMERCE C LOGO: Two curved segments, geometric C shape, white lines

CENTRAL ELEMENT:
Isometric platform "chip" with internal architecture visible:

THE MAIN CHIP/PLATFORM (center):
- Large rectangular chip outline
- Internal zones for each component:
  - Engine zone: database + gears
  - Storefront zone: building + browser
  - Data zone: hub + arrows
  - AI zone: neural nodes
- Pin connections radiating from edges
- Via points (small circles) at intersections

SURROUNDING ELEMENTS:
- PCB trace lines connecting to corners
- Detail callout circles (3-4)
- Component symbols in corners
- Data flow indicators (teal traces)
- AI connection lines (coral traces)

BLUEPRINT STYLE:
- Technical precision
- Dimension marks (no text)
- Grid underlay
- Section indicators
- Cross-hatching fills

C LOGO: As chip marking/stamp

Clean, sophisticated, technical.
NO TEXT ANYWHERE.
Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`);

  // V19: Most refined - Clean isometric stack
  await generate('commerce-final-v19', `Create the CLEANEST possible blueprint of Commerce platform architecture.

CRITICAL RULES:
1. ABSOLUTELY NO TEXT, LABELS, NUMBERS, OR LETTERS
2. Only technical drawing symbols and the C logo shape
3. Maximum clarity and elegance

BACKGROUND: Navy #1e1b4b
LINES: White #ffffff, teal #2dd4bf accents

COMMERCE C LOGO:
Two curved wedge segments with gap between, forming geometric C.
Place as prominent seal/stamp element.

THE ILLUSTRATION:
A beautiful isometric EXPLODED VIEW of 4 layers floating above each other:

BOTTOM - ENGINE LAYER:
- Thick foundation slab
- Database cylinder symbols
- Gear mechanism (visible in cutaway)
- Shopping cart icon
- Small circles on top surface (API nodes)

SECOND - STOREFRONT LAYER:
- Floating above with visible gap
- Simple storefront elevation (awning shape)
- Browser window frame
- Grid of component squares inside
- Dotted lines connecting down

THIRD - DATA LAYER:
- Floating above storefront
- Central circle with arrows radiating out
- 5-6 endpoint circles around edges
- Flow direction indicators

TOP - AI LAYER:
- Floating highest
- Interconnected node network (6-8 nodes with lines)
- Small sparkle marks
- Lines connecting down to other layers

DRAWING STYLE:
- Clean white lines on navy
- 2-3 line weights only
- Minimal detail callouts (just 2)
- Subtle grid in background
- Elegant negative space
- No clutter

COMPOSITION:
- Diagonal float (bottom-left to top-right)
- C logo as stamp in corner
- Room for Apple logo (center gap)
- Balanced, sophisticated

Think: What would Dieter Rams design as a blueprint?

NO TEXT. Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`);

  console.log('\n✨ Final round complete!\n');
  console.log('Generated (NO TEXT versions):');
  console.log('  - commerce-final-v16.png (V9+V12 mix, full detail)');
  console.log('  - commerce-final-v17.png (horizontal flow)');
  console.log('  - commerce-final-v18.png (circuit influence)');
  console.log('  - commerce-final-v19.png (cleanest/minimal)\n');
}

main().catch(console.error);
