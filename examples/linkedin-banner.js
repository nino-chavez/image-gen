/**
 * LinkedIn Banner Generation
 * Regenerates the Commerce blueprint image in LinkedIn banner format (1584 x 396)
 * Uses composite approach: Generate banner + overlay exact avatar
 */

import 'dotenv/config';
import { createGenerator } from '../src/index.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function generateLinkedInBanner() {
  console.log('🎨 Generating LinkedIn Banner (1584 x 396)...\n');

  const outputPath = join(__dirname, '..', 'output', 'linkedin-banner-commerce-v12.png');

  const generator = await createGenerator({
    provider: 'openrouter',
    model: 'google/gemini-3-pro-image-preview',
    styleSystem: 'illustration',
    width: 3168,  // 2x resolution for higher quality
    height: 792,
    format: 'png',
    quality: 100,
  });

  // Generate ILLUSTRATION ONLY - no text, leave space for logo/text overlay
  const prompt = `Create a HIGH RESOLUTION technical blueprint illustration for a LinkedIn banner. ILLUSTRATION ONLY - NO TEXT OR TYPOGRAPHY.

=== BRAND COLORS (USE EXACTLY) ===
- Deep Navy/Indigo background: #0f1629 (dark blue-purple, almost black)
- Cyan/Teal line art: #00d4ff (bright electric cyan for all blueprint lines)
- Iris purple accents: #6058FF
- Light background on right: #F5F3F2 to white gradient

=== COMPOSITION ===

LEFT SIDE (60% of width) - DETAILED BLUEPRINT ILLUSTRATION:

BACKGROUND: Deep navy blue (#0f1629) with subtle cyan blueprint grid lines throughout

ELEMENT 1 - SHOPPING CART BLUEPRINT (far left, large):
- Large double-ring CIRCULAR FRAME in bright cyan (#00d4ff) with neon glow effect
- Inside the circle: HIGHLY DETAILED technical blueprint of a shopping cart viewed from a 3/4 angle:
  * Wire mesh basket structure with visible horizontal and vertical grid lines
  * Handle bar at the top
  * TWO LARGE REAR WHEELS with LARGE COGWHEEL GEARS:
    - Each rear wheel has a prominent MECHANICAL GEAR (cogwheel) directly attached
    - The gears should be LARGE (nearly same diameter as the wheel)
    - Gears have clearly visible TEETH around the circumference (like industrial cogwheels)
    - Steampunk/mechanical aesthetic
  * Small front swivel caster wheels
  * Dimensional arrows with measurement annotations
  * Technical markings: coordinates, tick marks, dimension numbers
  * Blueprint grid pattern inside the circle

ELEMENT 2 - ISOMETRIC COMMERCE STACK (center):
Vertical EXPLODED VIEW of 5 distinct floating platform layers:

- TOP: Platform with cloud icon, upload arrows, radio tower with signal waves, floating documents, circuit traces
- LAYER 2: Payment module with $ € Bitcoin symbols, processor chip - use purple (#6058FF) accent
- LAYER 3: Inventory platform with 3D cardboard boxes in neat rows (tan/orange colored)
- LAYER 4: Storefront building with glass windows, directional arrows, wifi icons, POS terminals
- BOTTOM: Circuit board traces flowing downward, connection nodes

Additional elements:
- Dotted lines connecting layers (data flow)
- 2-3 floating GEARS in cyan on the right side of the stack
- Small floating icons: dollar signs, percentage symbols, nodes
- Technical annotations scattered throughout

RIGHT SIDE (40% of width) - CLEAN SPACE FOR LOGO/TEXT:
- Smooth gradient transition from dark navy to light gray (#F5F3F2) to white
- The transition should have an organic curved edge (not straight line)
- This area should be MOSTLY EMPTY - just the gradient background
- NO TEXT, NO HEADLINES, NO LOGOS - leave this space clean for overlay
- Some very subtle/faded blueprint grid lines can extend into this area but keep it minimal

=== STYLE REQUIREMENTS ===
- HIGH RESOLUTION output (3168x792 pixels)
- Technical blueprint aesthetic with CYAN (#00d4ff) linework on dark navy
- Lines should be CRISP, CLEAN, and DETAILED
- Subtle neon glow on cyan elements
- Shopping cart should be LARGE and detailed with visible gear teeth
- Professional, sophisticated quality
- 4:1 horizontal aspect ratio
- NO TEXT ANYWHERE IN THE IMAGE`;

  try {
    console.log('Generating banner with logo space...');
    const result = await generator.generateFromDescription(prompt, outputPath);

    console.log('✅ LinkedIn banner generated successfully!');
    console.log(`   Output: ${outputPath}`);
    console.log(`   Size: ${result.sizeKB} KB`);
    console.log(`   Dimensions: ${result.width}x${result.height}`);
    console.log('\n   Ready for Commerce logo overlay on right side.');

    return outputPath;
  } catch (error) {
    console.error('❌ Generation failed:', error.message);
    throw error;
  }
}

generateLinkedInBanner();
