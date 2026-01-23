/**
 * LinkedIn Banner with Profile Photo Integration
 * Creates banners designed to work seamlessly with the profile photo placement
 *
 * LinkedIn specs:
 * - Banner: 1584 x 396 pixels (4:1 ratio)
 * - Profile photo: ~160px diameter, positioned bottom-left
 * - Profile photo center: approximately (115, 396) - bottom edge of banner
 */

import 'dotenv/config';
import { createGenerator } from '../src/index.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Profile photo position on LinkedIn (approximate)
// The profile photo is a circle ~160px diameter
// Its center is roughly at x=115, overlapping the bottom of the banner

const CONCEPTS = {
  // Concept A: The Architect's Blueprint
  // Profile photo appears to be at a digital drafting table with architecture flowing outward
  architect: {
    name: 'The Architect Blueprint',
    prompt: `Create a LinkedIn banner illustration (1584x396 pixels, 4:1 ratio). CRITICAL: Leave the BOTTOM-LEFT area (a circle ~200px from left edge, at the bottom) EMPTY for profile photo placement.

=== CONCEPT: THE ARCHITECT'S WORKSPACE ===

The design should make a profile photo in the bottom-left feel like it's part of the scene - as if the person is at a digital architect's workstation looking out at their creation.

=== COMPOSITION ===

BOTTOM-LEFT CORNER (0-250px from left):
- LEAVE THIS AREA MOSTLY EMPTY - this is where the profile photo sits
- Create a subtle "workstation frame" effect:
  * Gentle curved lines suggesting the edge of a holographic display or desk
  * Very subtle glow/ambient light emanating FROM this area (as if the person is the source)
  * The lines should FRAME where the profile photo will be, not overlap it

CENTER-LEFT TO CENTER (250px - 900px):
- Neural network / architecture diagram flowing OUTWARD from the profile area
- Interconnected nodes representing AI systems, data pipelines, commerce flows
- Use cyan (#00d4ff) lines on dark navy (#0f1629) background
- Elements should appear to EMANATE from where the profile photo sits
- Include: circuit traces, floating code snippets, API endpoint nodes
- Subtle floating icons: shopping carts, data symbols, AI chips

RIGHT SIDE (900px - 1584px):
- Clean space for text/branding
- Gradient from dark navy to lighter area
- Very minimal elements - just ambient glow and sparse nodes
- This is where "Product Architect | AI-Native Commerce" text would go

=== VISUAL STYLE ===
- Technical blueprint aesthetic
- Dark navy background (#0f1629)
- Cyan/teal line art (#00d4ff) with subtle glow
- Purple accents (#6058FF) for key nodes
- Professional, sophisticated, modern
- The design should make the viewer feel like the profile photo person is "commanding" this digital space

=== CRITICAL REQUIREMENTS ===
- NO TEXT in the image
- Bottom-left must be clear for profile photo integration
- Lines/elements should FLOW FROM bottom-left OUTWARD
- Create visual continuity so profile photo feels integrated, not pasted on`
  },

  // Concept B: Command Center
  // Profile photo appears to be at the helm of a futuristic control room
  commandCenter: {
    name: 'Command Center',
    prompt: `Create a LinkedIn banner illustration (1584x396 pixels, 4:1 ratio). CRITICAL: Design around a profile photo in the BOTTOM-LEFT corner.

=== CONCEPT: COMMAND CENTER / MISSION CONTROL ===

The banner should look like a futuristic control room, with the profile photo area being the "commander's position" looking out at holographic displays.

=== COMPOSITION ===

BOTTOM-LEFT CORNER (profile photo zone - leave clear):
- Empty circular area (~200px from left, bottom edge)
- Subtle "command chair" framing - gentle curved lines suggesting a captain's viewpoint
- Ambient glow suggesting screens illuminating from this position

CENTER AREA - HOLOGRAPHIC DISPLAYS:
- Multiple floating holographic screens/panels at slight angles
- Screens showing:
  * Commerce dashboards with graphs trending upward
  * AI neural network visualizations
  * Code/data streams
  * Shopping/transaction flows
- Use perspective to create depth - panels receding into the distance
- Cyan (#00d4ff) and purple (#6058FF) holographic effects
- Dark navy (#0f1629) background with starfield/grid

RIGHT SIDE:
- Cleaner area for text overlay
- Largest holographic display (blank/minimal for branding)
- Softer gradient to lighter tones

=== STYLE ===
- Sci-fi command center aesthetic
- Holographic, translucent panels
- Subtle lens flare and light bloom effects
- Professional tech futurism
- Dark background with glowing elements

=== REQUIREMENTS ===
- NO TEXT
- Profile area (bottom-left) must be CLEAR
- Create sense that profile photo person is "at the controls"
- Sophisticated, not cheesy sci-fi`
  },

  // Concept C: The Builder - more minimal, personal approach
  builder: {
    name: 'The Builder',
    prompt: `Create a LinkedIn banner illustration (1584x396 pixels, 4:1 ratio). Design to integrate with a profile photo in the BOTTOM-LEFT.

=== CONCEPT: THE BUILDER / CONSTRUCTOR ===

A more minimal, elegant design where abstract building blocks and connections flow from the profile photo area, representing someone who builds AI-native commerce platforms.

=== COMPOSITION ===

BOTTOM-LEFT (profile photo zone):
- Leave circular area empty for profile photo
- From this area, have ISOMETRIC BUILDING BLOCKS floating upward and rightward
- Blocks should look like they're being "constructed" or "assembled"
- First blocks close to profile area, dispersing as they go right

CENTER:
- Floating isometric cubes/blocks in various sizes
- Some blocks connected by glowing lines (data connections)
- Blocks transform from simple cubes (left) to more complex structures (right):
  * Simple blocks → API modules → AI chips → Commerce systems
- Use cyan (#00d4ff), purple (#6058FF), and touches of orange (#FF6B35) for commerce
- Clean dark navy (#0f1629) background

RIGHT SIDE:
- Blocks become more sparse
- Clean area for text
- Subtle grid lines
- Perhaps one larger "completed" structure floating

=== STYLE ===
- Clean isometric illustration
- Minimalist but detailed
- Professional and modern
- Subtle shadows and depth
- Limited color palette

=== REQUIREMENTS ===
- NO TEXT
- Bottom-left clear for profile
- Sense of "building/creating" emanating from profile position
- Sophisticated and understated`
  }
};

async function generateBanner(conceptKey, version = 1) {
  const concept = CONCEPTS[conceptKey];
  if (!concept) {
    console.error(`Unknown concept: ${conceptKey}. Available: ${Object.keys(CONCEPTS).join(', ')}`);
    process.exit(1);
  }

  console.log(`\n🎨 Generating LinkedIn Banner: "${concept.name}" (v${version})\n`);

  const outputPath = join(__dirname, '..', 'output', `linkedin-profile-${conceptKey}-v${version}.png`);

  const generator = await createGenerator({
    provider: 'openrouter',
    model: 'gemini-pro', // Using pro for better quality
    styleSystem: 'illustration',
    width: 3168,  // 2x resolution
    height: 792,
    format: 'png',
    quality: 100,
  });

  try {
    console.log('Generating banner...');
    console.log(`Concept: ${concept.name}`);

    const result = await generator.generateFromDescription(concept.prompt, outputPath);

    console.log('\n✅ Banner generated successfully!');
    console.log(`   Output: ${outputPath}`);
    console.log(`   Size: ${result.sizeKB} KB`);
    console.log(`   Dimensions: ${result.width}x${result.height}`);

    return outputPath;
  } catch (error) {
    console.error('❌ Generation failed:', error.message);
    throw error;
  }
}

// Run with concept from command line args
const conceptArg = process.argv[2] || 'architect';
const versionArg = parseInt(process.argv[3]) || 1;

generateBanner(conceptArg, versionArg);
