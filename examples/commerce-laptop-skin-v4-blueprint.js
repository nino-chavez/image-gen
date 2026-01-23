#!/usr/bin/env node
/**
 * Commerce.com Laptop Skin - Final Blueprint Direction
 *
 * Commerce Platform Components:
 * - BigCommerce Engine (core commerce, checkout, catalog)
 * - Makeswift + Catalyst (visual storefront builder + React framework)
 * - Feedonomics (data feeds, channel integrations)
 * - AI (intelligent features)
 *
 * Style: Technical blueprint / architectural drawing
 * Logo: White Commerce logo on navy
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
  console.log('🎨 Commerce Blueprint - Final Polish\n');
  console.log('Components: BigCommerce Engine | Makeswift/Catalyst | Feedonomics | AI\n');

  // V12: Architecture Blueprint - Full Platform
  await generate('commerce-blueprint-v12', `Create a TECHNICAL BLUEPRINT laptop skin showing the Commerce.com platform architecture.

BACKGROUND: Deep navy blue #1e1b4b (like classic blueprint paper)

LINE COLORS:
- Primary lines: White #ffffff
- Secondary lines: Light purple/periwinkle #a5b4fc
- Accent highlights: Electric teal #2dd4bf
- Warm accent (sparingly): Coral #f97316

THE COMMERCE LOGO (CRITICAL - DRAW THIS ACCURATELY):
The Commerce "C" logo consists of TWO curved segments:
- LEFT SEGMENT: A large curved wedge shape (like 3/4 of a circle with a bite taken out)
- RIGHT SEGMENT: A smaller curved wedge that creates the "opening" of the C
- Together they form a stylized, geometric letter C
- There is WHITE SPACE / GAP between the two segments
- Draw this logo in WHITE lines on the navy background
- Place it prominently as a "stamp" or key element in the blueprint

PLATFORM COMPONENTS TO ILLUSTRATE (as technical drawings):

1. BIGCOMMERCE ENGINE (center/foundation):
   - Database cylinder icon
   - Shopping cart schematic
   - Checkout flow diagram (boxes connected by arrows)
   - API endpoint nodes
   - The "engine" - gears or motor diagram

2. MAKESWIFT + CATALYST (storefront layer):
   - Storefront elevation drawing (building facade with awning)
   - Component blocks / UI wireframes
   - React component tree diagram
   - Visual builder canvas representation
   - Browser window outline

3. FEEDONOMICS (data layer):
   - Data flow arrows / streams
   - Channel icons (simplified): marketplace, social, search
   - Feed transformation diagram (input → process → output)
   - Integration connection points
   - Data table / spreadsheet grid

4. AI COMPONENTS (intelligence layer):
   - Neural network node diagram (circles connected)
   - Brain or lightbulb schematic
   - Recommendation arrows
   - Search/personalization icons
   - Sparkle/magic indicators

BLUEPRINT STYLE ELEMENTS:
- Technical dimension lines with small perpendicular end marks
- Circular detail callout bubbles pointing to components
- Dotted construction/guide lines
- Grid lines (subtle, in background)
- Section markers (like "A-A" cross-section indicators)
- Small annotation tick marks (no readable text)
- Varying line weights: thick for main elements, thin for details
- Exploded view showing how pieces connect

COMPOSITION:
- Central exploded/layered diagram showing platform stack
- Corner detail callouts for each major component
- The Commerce C logo as a prominent stamp (bottom right or integrated)
- Breathing room - sophisticated, not cluttered
- Flow showing how components connect (Engine → Storefront → Feeds → AI)
- Leave subtle space for Apple logo area (center or offset)

STYLE:
- Authentic technical drawing / architectural blueprint feel
- Mix of isometric 3D hints and 2D elevations
- Professional, precise, beautiful
- Like something from a design museum or architecture firm
- Shows "this person understands how systems work"

ABSOLUTELY NO readable text, words, or labels - only technical marks, symbols, and the C logo shape.

Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`);

  // V13: Cleaner/Minimal Blueprint
  await generate('commerce-blueprint-v13-minimal', `Create a MINIMAL BLUEPRINT laptop skin for Commerce.com platform.

BACKGROUND: Deep navy #1e1b4b

LINES: White #ffffff primary, teal #2dd4bf accents

THE COMMERCE C LOGO:
Two curved segments forming a geometric C shape:
- Large curved wedge on left
- Smaller curved wedge on right
- Gap/white space between them
Draw in white lines, place as focal element.

SIMPLIFIED PLATFORM VISUALIZATION:
Show the platform as 4 CONNECTED LAYERS (vertical stack or horizontal flow):

Layer 1 - ENGINE:
- Simple database + gear icon
- Foundation block

Layer 2 - STOREFRONT:
- Browser window + component blocks
- Building on the engine

Layer 3 - DATA/FEEDS:
- Flow arrows + channel dots
- Connecting to external world

Layer 4 - AI:
- Neural net nodes + sparkles
- Intelligence layer on top

CONNECTION STYLE:
- Clean lines connecting layers
- Data flow direction indicators
- Minimal detail callouts (1-2 circles)

COMPOSITION:
- Layered stack diagram (isometric or flat)
- C logo as stamp/seal
- Maximum whitespace/breathing room
- Elegant, not busy
- Apple logo space consideration

STYLE:
- Ultra-clean technical illustration
- Single line weight (or just 2 weights)
- More minimal than V12
- Could be a slide in a pitch deck
- Sophisticated simplicity

NO text. Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`);

  // V14: Exploded View Focus
  await generate('commerce-blueprint-v14-exploded', `Create an EXPLODED VIEW BLUEPRINT showing Commerce.com platform layers separating.

BACKGROUND: Navy #1e1b4b
LINES: White #ffffff, teal #2dd4bf highlights

COMMERCE C LOGO: Two curved segments forming geometric C (white lines)

CONCEPT: Platform layers floating apart to show internal architecture

THE FOUR LAYERS (exploded vertically, floating with gaps between):

BOTTOM - BIGCOMMERCE ENGINE:
- Solid foundation platform/base
- Database cylinders
- API nodes as connection points on top surface
- Gear mechanisms visible

LAYER 2 - MAKESWIFT/CATALYST STOREFRONT:
- Floating above engine
- Browser/window frame
- UI component blocks inside
- React tree structure hint
- Dotted lines showing it connects down to engine

LAYER 3 - FEEDONOMICS DATA:
- Floating above storefront
- Data stream arrows flowing outward
- Channel endpoint dots (marketplaces, social)
- Transformation process boxes
- Connects down and outward

TOP - AI LAYER:
- Floating highest
- Neural network diagram
- Sparkle/intelligence indicators
- Recommendation arrows pointing down
- "Brain" of the system

VISUAL STYLE:
- Isometric exploded view (like IKEA assembly)
- Dotted lines showing connections between layers
- Each layer casts subtle shadow on layer below
- Dimension lines showing the gaps
- Detail callouts pointing to key features
- C logo integrated into engine layer or as separate stamp

COMPOSITION:
- Diagonal arrangement (bottom-left to top-right float)
- Generous spacing between layers
- Technical precision
- Beautiful and educational

NO text. Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`);

  // V15: Circuit/System Diagram Style
  await generate('commerce-blueprint-v15-circuit', `Create a CIRCUIT DIAGRAM style blueprint for Commerce.com platform.

BACKGROUND: Navy #1e1b4b
LINES: White #ffffff, teal #2dd4bf for data flow, coral #f97316 for AI

COMMERCE C LOGO: Geometric C from two curved segments (white)

STYLE: Electronic circuit board meets system architecture diagram

COMPONENTS AS CIRCUIT ELEMENTS:

BIGCOMMERCE ENGINE (center processor):
- Large central "chip" rectangle
- Pin connections radiating out
- Internal grid pattern
- Database symbols inside

MAKESWIFT/CATALYST (display/output section):
- Screen/display component shape
- Component slots
- UI block symbols
- Connected to engine via bus lines

FEEDONOMICS (I/O section):
- Multiple input/output ports
- Data bus arrows
- Channel connectors (circles on edge)
- Transformation gate symbols

AI (co-processor):
- Secondary chip with neural pattern
- Connected to all other components
- Sparkle indicators
- Decision tree traces

CIRCUIT STYLE ELEMENTS:
- PCB trace lines (right angles with rounded corners)
- Via holes (small circles at intersections)
- Component outlines with pin markings
- Ground/power rail lines
- Test point markers
- Silkscreen-style annotations (marks, not text)

COMPOSITION:
- Central engine chip
- Other components arranged around it
- Clean trace routing between components
- C logo as board marking/stamp
- Balanced, symmetric where possible

FEEL:
- High-tech but approachable
- "The architecture of commerce"
- Shows system thinking
- Beautiful functional diagram

NO text. Dimensions: ${TEST_WIDTH}x${TEST_HEIGHT} pixels`);

  console.log('\n✨ Blueprint refinements complete!\n');
  console.log('Generated:');
  console.log('  - commerce-blueprint-v12.png (full architecture)');
  console.log('  - commerce-blueprint-v13-minimal.png (clean/simple)');
  console.log('  - commerce-blueprint-v14-exploded.png (layered view)');
  console.log('  - commerce-blueprint-v15-circuit.png (circuit board style)\n');
}

main().catch(console.error);
