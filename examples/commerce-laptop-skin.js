#!/usr/bin/env node
/**
 * Commerce.com Laptop Skin Generator
 * Creates a fun, comic-book style laptop skin for Nino's work laptop
 *
 * Style reference: Flickday Media skin (pop art, illustrated, vibrant)
 * Brand: Commerce.com (purple #6366f1, dark navy #1e1b4b)
 */

import { createGenerator } from '../src/index.js';
import fs from 'fs';

// Laptop skin dimensions (MacBook Pro 14" or 16")
// Standard dbrand/slickwraps dimensions: roughly 12.31 x 8.71 inches at 300 DPI
const SKIN_WIDTH = 3693;  // 12.31" * 300 DPI
const SKIN_HEIGHT = 2613; // 8.71" * 300 DPI

// For testing, use smaller size first
const TEST_WIDTH = 1800;
const TEST_HEIGHT = 1274;

const COMMERCE_PROMPT = `Create a FUN, ENERGETIC laptop skin design for a Product Architect at Commerce.com.

BRAND COLORS (USE THESE EXACTLY):
- Primary Purple: #6366f1 (bright purple for the Commerce "C" logo icon)
- Dark Navy: #1e1b4b (deep navy for text and contrast)
- White: #ffffff (for highlights and contrast)
- Accent options: Electric teal #2dd4bf, Vibrant orange #f97316, Hot pink #ec4899

COMMERCE LOGO REFERENCE:
The Commerce logo is a stylized "C" made of TWO curved segments:
- A larger curved segment on the left (like a pac-man shape)
- A smaller curved segment on the right that creates the opening
Together they form a modern, geometric "C" shape
DO NOT write out the word "Commerce" - just use the C icon shape abstractly in the pattern

STYLE (CRITICAL - MATCH THIS EXACTLY):
- Comic book / Pop art illustration style
- Bold black outlines on all elements
- Halftone dot patterns for shading and texture
- Speech bubbles and comic panel layouts
- Vibrant, saturated colors
- Fun illustrated characters and icons
- Retro advertising / propaganda poster energy
- Ben-Day dots background texture

CONTENT TO INCLUDE:
- Multiple stylized "C" logo shapes (the curved two-segment C) scattered throughout as design elements
- Fun commerce/shopping themed illustrations: shopping carts, packages, storefronts, coins, credit cards
- Tech/architecture themed elements: building blocks, blueprints, flowcharts, connected nodes
- Abstract geometric patterns using the Commerce purple
- Comic-style action words or decorative shapes (NO actual readable text)
- Playful isometric shopping scenes
- Flying packages with motion lines
- Happy shopping cart characters with personality

COMPOSITION:
- Fill the ENTIRE canvas edge-to-edge with illustration
- Comic book panel layout with multiple "scenes"
- Balance of busy detailed areas and breathing room
- Central focal area that would frame where the Apple logo cutout would be
- Design should work with a laptop lid shape (wider than tall, rounded corners)

TECHNICAL REQUIREMENTS:
- Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels
- No text, words, or readable typography
- Edge-to-edge illustration (no white borders)
- High contrast for print reproduction
- Clean vector-style artwork

Create a design that screams "I love building commerce experiences" while being FUN and showing personality. This should make people smile when they see it.`;

async function generateCommerceSkin() {
  console.log('\n🎨 Commerce.com Laptop Skin Generator\n');
  console.log('Creating a fun, comic-book style laptop skin...\n');

  // Ensure output directory exists
  const outputDir = './output';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    const generator = await createGenerator({
      provider: 'openrouter',
      model: 'gemini-flash',
      width: TEST_WIDTH,
      height: TEST_HEIGHT,
      format: 'png',  // PNG for print quality
      quality: 100,
    });

    console.log('Generating design (this may take 30-60 seconds)...\n');

    const result = await generator.generateFromDescription(
      COMMERCE_PROMPT,
      `${outputDir}/commerce-laptop-skin-v1.png`
    );

    console.log(`✅ Generated: ${result.path}`);
    console.log(`   Size: ${result.sizeKB}KB`);
    console.log(`   Dimensions: ${result.width}x${result.height}`);

    // Generate a second variant
    console.log('\nGenerating variant 2...\n');

    const VARIANT_PROMPT = `Create a DIFFERENT laptop skin design for Commerce.com - Product Architect role.

BRAND COLORS:
- Commerce Purple: #6366f1
- Deep Navy: #1e1b4b
- Accent: Electric teal #2dd4bf, white #ffffff

COMMERCE "C" LOGO:
A geometric "C" made from two curved segments - use this shape as a repeating pattern element

THIS VARIANT'S STYLE:
- Isometric illustration style (3D-ish perspective)
- Mini commerce cityscape / ecosystem
- Connected storefronts, warehouses, delivery trucks
- Data streams and network connections
- Shopping carts as characters navigating the city
- Packages being delivered by drones
- Purple gradient sky with geometric clouds
- Fun, whimsical but slightly more sophisticated than comic book
- Subtle grid pattern base

COMPOSITION:
- Isometric city fills the canvas
- Buildings made of abstract shapes incorporating the C logo
- Flying elements (packages, drones) add dynamism
- Network lines connecting everything
- Central clearing for Apple logo area
- Edge-to-edge coverage

Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels
NO text or readable words - pure illustration`;

    const result2 = await generator.generateFromDescription(
      VARIANT_PROMPT,
      `${outputDir}/commerce-laptop-skin-v2.png`
    );

    console.log(`✅ Generated: ${result2.path}`);
    console.log(`   Size: ${result2.sizeKB}KB`);

    // Third variant - more abstract/pattern based
    console.log('\nGenerating variant 3 (abstract pattern)...\n');

    const PATTERN_PROMPT = `Create an ABSTRACT PATTERN laptop skin for Commerce.com.

COLORS:
- Deep navy background: #1e1b4b
- Commerce purple: #6366f1
- Electric teal accents: #2dd4bf
- White highlights: #ffffff

PATTERN ELEMENTS:
- The Commerce "C" logo (two curved segments forming a C) repeated at various sizes
- Abstract shopping icons: simplified cart shapes, package boxes, storefronts
- Flowing lines connecting elements like a network
- Geometric shapes: circles, arcs, flowing curves
- Subtle halftone dot texture in background

STYLE:
- Modern, clean pattern design
- Memphis design influence (90s geometric fun)
- Scattered elements with intentional rhythm
- Mix of solid shapes and line art
- Varying scales (some large C logos, some tiny)
- Dynamic diagonal flow across canvas

COMPOSITION:
- Navy background with elements floating
- Purple C logos as dominant shapes
- Teal and white accents for pop
- Balanced distribution across canvas
- Works as repeating pattern aesthetic
- Professional but playful

Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels
NO text - only abstract shapes and icons`;

    const result3 = await generator.generateFromDescription(
      PATTERN_PROMPT,
      `${outputDir}/commerce-laptop-skin-v3.png`
    );

    console.log(`✅ Generated: ${result3.path}`);
    console.log(`   Size: ${result3.sizeKB}KB`);

    console.log('\n✨ All variants generated!');
    console.log(`\nFiles saved to: ${outputDir}/`);
    console.log('  - commerce-laptop-skin-v1.png (comic book style)');
    console.log('  - commerce-laptop-skin-v2.png (isometric city)');
    console.log('  - commerce-laptop-skin-v3.png (abstract pattern)\n');

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    if (error.message.includes('API key')) {
      console.log('Make sure OPENROUTER_API_KEY is set in your environment.\n');
    }
    process.exit(1);
  }
}

generateCommerceSkin();
