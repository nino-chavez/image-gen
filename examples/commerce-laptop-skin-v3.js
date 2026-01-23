#!/usr/bin/env node
/**
 * Commerce.com Laptop Skin Generator - Round 3
 * Direction: Building Blocks / Construction
 * Vibe: Fun + Professional, Builder Energy
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
  console.log('🎨 Commerce Laptop Skins - Round 3\n');
  console.log('Direction: Building Blocks / Construction');
  console.log('Vibe: Fun + Professional, Builder Energy\n');

  // V8: Isometric Building Blocks
  await generate('commerce-skin-v8-blocks', `Create a laptop skin showing MODULAR BUILDING BLOCKS assembling into a commerce platform.

BRAND COLORS:
- Commerce purple: #6366f1
- Deep navy background: #1e1b4b
- Electric teal: #2dd4bf
- White: #ffffff
- Accent coral/orange: #f97316 (sparingly)

CONCEPT: Product Architecture as Building Blocks
You are a Product Architect - you design and assemble the pieces that become a commerce platform.

VISUAL ELEMENTS:
- ISOMETRIC 3D BLOCKS in various sizes
- Blocks are assembling/floating into position
- Some blocks already connected, others mid-flight
- Block types represent commerce components:
  - Storefront blocks (with tiny awning details)
  - Shopping cart blocks
  - Package/box blocks
  - Payment/card blocks
  - The "C" logo as a special connector block
- Glowing connection points where blocks join (teal)
- Motion lines showing blocks moving into place
- Some small blocks, some large foundation blocks

COMPOSITION:
- Blocks assembling from edges toward center
- Central area slightly open for Apple logo
- Diagonal flow / dynamic arrangement
- NOT a flat grid - varied heights and depths
- Floating particles and small debris for energy

STYLE:
- Clean vector isometric illustration
- Soft shadows and ambient occlusion
- Slight glow on connection points
- Playful but polished (think: premium toy catalog)
- Professional enough for a work laptop

NO text. Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`);

  // V9: Blueprint Construction
  await generate('commerce-skin-v9-blueprint', `Create a laptop skin with a BLUEPRINT / ARCHITECTURAL style showing commerce platform construction.

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
- Main "elevation" or exploded view in center
- Supporting detail drawings around edges
- Varied line weights (thick for main, thin for detail)
- Breathing room - not cluttered
- Professional technical drawing aesthetic

STYLE:
- Architectural blueprint meets product design
- Clean precise linework
- Mix of 2D elevations and subtle 3D hints
- Sophisticated, not sterile
- Like something from a design museum

NO readable text - just technical marks and symbols.
Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`);

  // V10: Lego-style Assembly
  await generate('commerce-skin-v10-lego', `Create a laptop skin showing LEGO-STYLE modular pieces building a commerce world.

COLORS:
- Navy background: #1e1b4b
- Purple blocks: #6366f1
- Teal blocks: #2dd4bf
- White/light blocks: #f1f5f9
- Warm accent blocks: #f97316 (orange, sparingly)

CONCEPT: Snap-together Commerce
Everything clicks into place - modular, extensible, buildable.

VISUAL ELEMENTS:
- Chunky, rounded LEGO-style building blocks
- Visible connection studs on top of blocks
- Blocks forming recognizable commerce shapes:
  - A storefront being assembled
  - Stack of package boxes
  - Shopping cart made of blocks
  - The "C" logo as a special 2x2 piece
- Some blocks floating, about to snap in
- Satisfying "click" implied by near-connections
- Baseplate visible in some areas
- Cheerful, toylike but sophisticated color balance

COMPOSITION:
- Scene of active building in progress
- Mix of completed structures and pieces in motion
- Central open area for Apple logo
- Depth through block layering
- Dynamic angles, not flat top-down

STYLE:
- Cute but not childish
- Premium toy photography aesthetic
- Soft studio lighting feel
- Clean renders, subtle reflections
- "What if LEGO made enterprise software"

NO text. Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`);

  // V11: Abstract Assembly
  await generate('commerce-skin-v11-abstract', `Create an ABSTRACT laptop skin showing geometric shapes assembling into formation.

COLORS:
- Deep navy: #1e1b4b
- Purple: #6366f1
- Teal: #2dd4bf
- White: #ffffff

CONCEPT: Abstract Builder Energy
Shapes coming together with purpose and momentum - the feeling of building without literal blocks.

VISUAL ELEMENTS:
- Geometric shapes: rounded rectangles, circles, arcs
- Shapes flowing/converging toward center
- Motion trails behind moving shapes
- The "C" logo curves as primary shapes
- Varying sizes (large anchor shapes, small particle shapes)
- Connection lines between shapes (thin, elegant)
- Subtle grid or guide lines in background
- Glowing edges on some shapes
- Overlapping transparency effects

COMPOSITION:
- Shapes converging from all edges
- Central gathering point (for Apple logo)
- Spiral or vortex-like flow pattern
- Balance of dense clusters and open space
- Dynamic, energetic, purposeful movement

STYLE:
- Motion graphics freeze-frame
- Clean vector aesthetic
- Depth through layering and blur
- Sophisticated, almost cinematic
- Like a logo animation paused mid-reveal

NO text. Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`);

  console.log('\n✨ Round 3 complete!\n');
  console.log('Building Blocks direction:');
  console.log('  - commerce-skin-v8-blocks.png (isometric assembly)');
  console.log('  - commerce-skin-v9-blueprint.png (architectural drawing)');
  console.log('  - commerce-skin-v10-lego.png (snap-together pieces)');
  console.log('  - commerce-skin-v11-abstract.png (geometric convergence)\n');
}

main().catch(console.error);
