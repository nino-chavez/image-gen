#!/usr/bin/env node
/**
 * Commerce.com Laptop Skin - V4 and V5 with Gemini 3 Pro
 */

import { createGenerator } from '../src/index.js';
import fs from 'fs';

const TEST_WIDTH = 1800;
const TEST_HEIGHT = 1274;

const outputDir = './output';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const V4_PROMPT = `Create a laptop skin design featuring an ISOMETRIC COMMERCE ECOSYSTEM.

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
Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`;

const V5_PROMPT = `Create a SOPHISTICATED ABSTRACT PATTERN laptop skin for Commerce.com.

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
NO TEXT. Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`;

async function generate(name, prompt) {
  const generator = await createGenerator({
    provider: 'openrouter',
    model: 'google/gemini-3-pro-image-preview',
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
  console.log('🎨 Commerce V4 & V5 with Gemini 3 Pro\n');

  await generate('commerce-v4-isometric-gemini3pro', V4_PROMPT);
  await generate('commerce-v5-pattern-gemini3pro', V5_PROMPT);

  console.log('\n✨ Done!\n');
}

main().catch(console.error);
