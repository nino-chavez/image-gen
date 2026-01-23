#!/usr/bin/env node
/**
 * Commerce.com Laptop Skin Generator - Round 2
 * Focusing on isometric and abstract pattern styles (no comic book)
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
  console.log('🎨 Commerce Laptop Skins - Round 2\n');
  console.log('Styles: Isometric + Abstract Pattern (no comic book)\n');

  // V4: Enhanced Isometric - More detailed, less text
  await generate('commerce-skin-v4-isometric', `Create a laptop skin design featuring an ISOMETRIC COMMERCE ECOSYSTEM.

BRAND COLORS:
- Primary purple: #6366f1 (bright, saturated)
- Deep navy background: #1e1b4b
- Electric teal accents: #2dd4bf
- White highlights: #ffffff

THE COMMERCE "C" LOGO:
A modern geometric "C" made from two curved segments forming an abstract C shape.
Use this as architectural elements - buildings shaped like C, signs, decorations.

ISOMETRIC SCENE REQUIREMENTS:
- Bird's eye isometric view of a miniature commerce district
- Cute storefronts with awnings and display windows
- Delivery trucks and vans moving on roads
- Drones carrying small packages overhead
- Shopping carts with personality (maybe tiny wheels, cute proportions)
- Warehouse buildings with packages flowing in/out
- Network connection lines between buildings (glowing teal)
- Small trees and street elements for scale
- Roads/paths creating flow through the scene

COMPOSITION:
- Central open area (circular or rounded square) for Apple logo placement
- Buildings and activity radiating outward from center
- Purple gradient sky fading to deeper navy at edges
- Teal glow effects on connections and highlights
- Clean, professional aesthetic - NOT childish
- Depth through layering and shadows

STYLE:
- Clean vector-style illustration
- Soft shadows for depth
- Slightly rounded, friendly geometry
- Professional but approachable
- Similar to Stripe, Linear, or Vercel illustration styles

NO TEXT OR WORDS. Pure illustration.
Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`);

  // V5: Abstract Pattern - Refined
  await generate('commerce-skin-v5-pattern', `Create a SOPHISTICATED ABSTRACT PATTERN laptop skin for Commerce.com.

COLORS (USE EXACTLY):
- Background: Deep navy #1e1b4b
- Primary shapes: Commerce purple #6366f1
- Accent lines/flows: Electric teal #2dd4bf
- Highlights: White #ffffff

PATTERN ELEMENTS:
- The Commerce "C" logo (two curved segments forming a C) at MULTIPLE SCALES
  - Large focal C near center (but offset)
  - Medium C shapes scattered
  - Small C shapes as texture
- Flowing curved lines connecting elements (teal)
- Abstract shopping icons (simplified, geometric):
  - Minimal shopping cart shapes
  - Package box outlines
  - Storefront silhouettes
- Geometric shapes: circles, arcs, dots
- Subtle grid or dot matrix texture in background

STYLE:
- Modern, minimal, sophisticated
- Memphis design meets tech aesthetic
- Clean lines, intentional spacing
- Balance of density and breathing room
- Dynamic diagonal flow (bottom-left to top-right)
- NOT cluttered - elegant negative space

COMPOSITION:
- Navy background dominates
- Purple C logos as primary visual weight
- Teal lines create movement and connection
- White dots/accents for sparkle
- Asymmetric but balanced
- No obvious center - works as continuous pattern

This should look like something from a premium SaaS company's brand assets.
NO TEXT. Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`);

  // V6: Minimal Geometric
  await generate('commerce-skin-v6-minimal', `Create a MINIMAL GEOMETRIC laptop skin design.

BRAND:
- Commerce purple: #6366f1
- Navy: #1e1b4b
- Teal: #2dd4bf
- White: #ffffff

CONCEPT:
The Commerce "C" logo deconstructed into pure geometric forms.
The C is made of two curved segments - use these CURVES as the design foundation.

DESIGN:
- Navy background
- Large sweeping ARCS and CURVES inspired by the C logo shape
- Curves flow across the entire canvas
- Purple as primary curve color
- Teal as secondary accent curves
- White thin lines for detail
- Overlapping transparent layers
- Gradient fills within curves (purple to teal)

COMPOSITION:
- One or two LARGE dominant curves spanning the canvas
- Smaller complementary curves creating rhythm
- Negative space is a feature, not a bug
- Sophisticated, almost architectural feel
- Like a close-up crop of the C logo, abstracted

FEEL:
- Premium, confident, bold
- Apple-esque minimalism
- Could be a wallpaper for a luxury brand
- Timeless, not trendy

NO text, NO icons, just pure geometric curves.
Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`);

  // V7: Network/Architecture
  await generate('commerce-skin-v7-network', `Create a NETWORK ARCHITECTURE laptop skin representing commerce infrastructure.

COLORS:
- Deep navy base: #1e1b4b
- Node purple: #6366f1
- Connection teal: #2dd4bf
- Highlight white: #ffffff

CONCEPT:
Visualize the architecture of a commerce platform as an elegant network diagram.

ELEMENTS:
- NODES: Purple circles/rounded squares of varying sizes representing:
  - Storefronts (larger nodes)
  - Warehouses (medium nodes)
  - Customers (smaller nodes)
  - The "C" logo shape incorporated into some nodes
- CONNECTIONS: Teal lines linking nodes
  - Varying line weights (thicker = more traffic)
  - Some dashed, some solid
  - Flowing, organic paths (not rigid straight lines)
- DATA PARTICLES: Tiny white dots moving along connections
- CLUSTERS: Groups of related nodes closer together

STYLE:
- Dark mode data visualization aesthetic
- Subtle glow effects on nodes and lines
- Depth through opacity variations
- Clean, technical, but beautiful
- Like a live dashboard visualization frozen in time

COMPOSITION:
- Distributed across canvas (no single center)
- Denser clusters balanced with open space
- Organic flow, not grid-based
- Some connections extend beyond canvas edges (implies larger system)

Think: What if Stripe's infrastructure diagram was art?
NO text. Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`);

  console.log('\n✨ Round 2 complete!\n');
  console.log('Generated:');
  console.log('  - commerce-skin-v4-isometric.png (refined isometric city)');
  console.log('  - commerce-skin-v5-pattern.png (sophisticated abstract)');
  console.log('  - commerce-skin-v6-minimal.png (pure geometric curves)');
  console.log('  - commerce-skin-v7-network.png (architecture visualization)\n');
}

main().catch(console.error);
