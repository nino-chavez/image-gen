/**
 * Let's Pepper Mascot Style System
 * Brand-compliant mascot generation for grass volleyball brand
 *
 * Reference: /brand-specs/lets-pepper-mascot.md
 *
 * PEPPER VARIETIES (Event "Flavors"):
 * - Bell Pepper: Sweet entry, inaugural events
 * - Jalapeño: Mid-tier intensity, technical players
 * - Poblano: Defensive focus, gritty grind
 * - Banana Pepper: Series progression
 * - Ghost Pepper: Elite invite-only events
 *
 * QUIZ RESULT PEPPERS (Personality Types):
 * - Bell Pepper: Here for the vibes (shared with Event Flavors)
 * - Serrano: Sneaky dangerous, quiet confidence
 * - Chipotle: Smooth veteran, composed leader
 * - Habanero: Intense competitor, passionate motivator
 * - Carolina Reaper: Unhinged energy, relentless effort
 * - Pepper X: Beyond the Scoville scale (easter egg)
 *
 * AWARD PEPPERS (Category Trophies):
 * - Ghost Pepper Award: MVP
 * - Jalapeño Award: Most Improved
 * - Chipotle Award: Best Sportsmanship
 * - Habanero Award: Best Single Performance
 * - Bell Pepper Award: Most Fun Team
 */

export const LETS_PEPPER_STYLES = {
  name: 'lets-pepper',
  description: 'Let\'s Pepper grass volleyball mascot - anthropomorphic pepper characters with expressive cartoon faces',

  // Base prompt that applies to ALL generations - CRITICAL FACE REQUIREMENTS
  basePrompt: `
CRITICAL - CARTOON MASCOT WITH EXPRESSIVE FACE:
The character MUST have a full cartoon face on the pepper body including:
- TWO LARGE EXPRESSIVE EYES with white/cream sclera and black pupils
- EXPRESSIVE EYEBROWS above the eyes showing emotion
- A WIDE OPEN MOUTH smile showing enthusiasm (red tongue visible)
- The face is ON THE FRONT of the pepper body, not separate

STYLE: Clean polished vector cartoon mascot illustration (like sports team mascot)
NOT: Sketch style, hand-drawn doodle, watercolor, or realistic
MUST BE: Sharp clean lines, solid color fills, professional mascot quality

CHARACTER BODY:
- Anthropomorphized pepper with human-like arms and legs
- Athletic but NOT muscular/bodybuilder - slim simple limbs
- Head-to-body ratio approximately 1:2
- Simple cartoon hands (4 fingers, glove-like)

OUTFIT: Dark green or black athletic shorts, green sneakers with cream/white soles
LINE WORK: Bold consistent black outlines, solid color fills, minimal shading
VOLLEYBALL: Green and cream striped volleyball (grass volleyball brand)
BACKGROUND: Clean white or transparent, no complex backgrounds

AVOID: Faceless peppers, sketch/doodle style, bodybuilder muscles, realistic rendering, angry scowl
`.trim(),

  styles: {
    // === PEPPER VARIETIES (Event Flavors) ===

    'Bell Pepper': {
      background: 'Clean white background',
      lineColor: 'Bold black outlines with solid color fills',
      style: 'BELL PEPPER shape - round, bulbous, classic pepper silhouette with lobes at bottom',
      elements: 'Round bell pepper body, short curved green stem, MUST HAVE: large cartoon eyes, expressive eyebrows, wide open smile',
      personality: 'Sweet and welcoming, entry-level friendly, the approachable starter mascot',
      colorGuide: 'Available in: Yellow (#F5B91A), Green (#4A7C3F), Red (#D94C35), Orange (#FF8C00)',
    },

    'Jalapeño': {
      background: 'Clean white background',
      lineColor: 'Bold black outlines with solid green fills',
      style: 'JALAPEÑO shape - elongated, tapered, smooth curved pepper with pointed tip',
      elements: 'Long tapered jalapeño body (bright green #4CAF50), curved stem, MUST HAVE: large cartoon eyes, confident eyebrows, competitive smirk smile',
      personality: 'Spicy mid-tier intensity, technical and fast, "not too hot not too mild"',
      colorGuide: 'Body: Bright green (#4CAF50), Stem: Dark green (#2E7D32)',
    },

    'Poblano': {
      background: 'Clean white background',
      lineColor: 'Bold black outlines with deep green fills',
      style: 'POBLANO shape - wide at top, long tapered body, slight wrinkles/texture implied',
      elements: 'Wide poblano body (dark green #1B5E20), thick stem, MUST HAVE: large cartoon eyes, determined eyebrows, gritty confident expression',
      personality: 'Low and loaded, defensive grinder, relentless and gritty competitor',
      colorGuide: 'Body: Dark forest green (#1B5E20), Stem: Brown-green (#33691E)',
    },

    'Banana Pepper': {
      background: 'Clean white background',
      lineColor: 'Bold black outlines with yellow fills',
      style: 'BANANA PEPPER shape - long curved crescent shape like a banana, smooth skin',
      elements: 'Long curved banana pepper body (pale yellow #FFEB3B), small stem, MUST HAVE: large cartoon eyes, playful eyebrows, fun mischievous smile',
      personality: 'Playful and unpredictable, curved ball specialist, keeps opponents guessing',
      colorGuide: 'Body: Pale yellow (#FFEB3B) with slight green tips, Stem: Green (#689F38)',
    },

    'Ghost Pepper': {
      background: 'Clean white background',
      lineColor: 'Bold black outlines with intense red-orange fills',
      style: 'GHOST PEPPER (Bhut Jolokia) shape - wrinkled, gnarly, intimidating texture, pointed',
      elements: 'Wrinkled ghost pepper body (intense red-orange #E64A19), gnarly stem, MUST HAVE: large intense cartoon eyes, fierce eyebrows, elite competitor expression',
      personality: 'Elite invite-only intensity, the hottest level, intimidating but respected',
      colorGuide: 'Body: Fiery red-orange (#E64A19) with darker wrinkle accents, Stem: Dark (#4E342E)',
    },

    // === QUIZ RESULT PEPPERS (Personality Types) ===

    'Serrano': {
      background: 'Clean white background',
      lineColor: 'Bold black outlines with deep green fills',
      style: 'SERRANO shape - slim, elongated, sleek and smooth with a pointed tip, slightly smaller than jalapeño',
      elements: 'Slim serrano body (deep green #2E7D32), thin curved stem, MUST HAVE: large focused cartoon eyes, calm confident eyebrows, knowing subtle smirk',
      personality: 'Sneaky dangerous, quiet confidence, deadly execution — opponents underestimate once, never twice',
      colorGuide: 'Body: Deep green (#2E7D32), Stem: Dark green (#1B5E20)',
    },

    'Chipotle': {
      background: 'Clean white background',
      lineColor: 'Bold black outlines with smoky brown-red fills',
      style: 'CHIPOTLE shape - dried and wrinkled jalapeño, smoky texture, slightly curved and weathered looking',
      elements: 'Smoky chipotle body (warm brown-red #8B4513 with darker #5D2E0C accents), dried stem, MUST HAVE: large wise cartoon eyes, composed knowing eyebrows, veteran calm smile',
      personality: 'Smooth veteran, composed leader, refined touch — the smoky veteran who never panics',
      colorGuide: 'Body: Warm brown-red (#8B4513) with smoky darker accents (#5D2E0C), Stem: Dark brown (#3E2723)',
    },

    'Habanero': {
      background: 'Clean white background',
      lineColor: 'Bold black outlines with bright orange fills',
      style: 'HABANERO shape - round and lantern-shaped, bumpy skin texture, short and stout with a pinched bottom',
      elements: 'Round habanero body (bright orange #FF6D00), short thick stem, MUST HAVE: large intense cartoon eyes, fired-up determined eyebrows, wide competitive grin',
      personality: 'Intense competitor, passionate motivator — brings the heat every rally, contagious intensity',
      colorGuide: 'Body: Bright orange (#FF6D00) with subtle red-orange highlights, Stem: Green (#4A7C3F)',
    },

    'Carolina Reaper': {
      background: 'Clean white background',
      lineColor: 'Bold black outlines with intense deep red fills',
      style: 'CAROLINA REAPER shape - bumpy, gnarly, with a distinctive pointed scorpion-like tail curling from the bottom',
      elements: 'Gnarly reaper body (intense red #C62828) with signature pointed tail, thick gnarly stem, MUST HAVE: large wild cartoon eyes, fierce intense eyebrows, relentless wide-open battle grin',
      personality: 'Unhinged energy, no off switch — 100% on every ball, every point. Opponents fear, teammates love.',
      colorGuide: 'Body: Intense red (#C62828) with darker wrinkle accents (#B71C1C), Stem: Dark (#4E342E), Tail: Same red, curved scorpion-style',
    },

    'Pepper X': {
      background: 'Clean white background',
      lineColor: 'Bold black outlines with electric fuchsia/magenta fills',
      style: 'PEPPER X shape - extreme gnarly texture, otherworldly wrinkled skin, looks alien and menacing, slightly glowing',
      elements: 'Alien-looking pepper X body (electric fuchsia #D946EF with magenta #A21CAF accents), twisted gnarly stem, MUST HAVE: wild oversized cartoon eyes with chaotic energy, unhinged eyebrows, maniacal grin',
      personality: 'Beyond the Scoville scale — chaotic energy, sky ball specialist, menace to society, absolute legend',
      colorGuide: 'Body: Electric fuchsia (#D946EF) with magenta accents (#A21CAF), Stem: Dark purple (#4A148C)',
    },

    // === COLOR VARIANTS (for Bell Pepper) ===

    'Yellow Pepper': {
      background: 'Clean white background',
      lineColor: 'Bold black outlines (#1A1A1A) with warm yellow fills',
      style: 'Yellow BELL PEPPER - round bulbous shape, primary mascot color',
      elements: 'Yellow bell pepper body (#F5B91A), green stem, MUST HAVE: large cartoon eyes with cream sclera, expressive eyebrows, wide open happy smile with red tongue',
      personality: 'Enthusiastic team captain, "Let\'s go!" energy, welcoming and confident',
      colorGuide: 'Body: #F5B91A (golden yellow), Stem: #4A7C3F (green), Shorts: #3D5A3D or #1A1A1A',
    },

    'Green Pepper': {
      background: 'Clean white background',
      lineColor: 'Bold black outlines (#1A1A1A) with deep green fills',
      style: 'Green BELL PEPPER - round bulbous shape, secondary mascot color',
      elements: 'Green bell pepper body (#4A7C3F), darker green stem, MUST HAVE: large cartoon eyes, calm confident eyebrows, steady smile',
      personality: 'Reliable defender, calm confidence, earthy and grounded',
      colorGuide: 'Body: #4A7C3F (forest green), Stem: #3D5A3D (dark green), Shorts: #1A1A1A',
    },

    'Red Pepper': {
      background: 'Clean white background',
      lineColor: 'Bold black outlines (#1A1A1A) with vibrant red fills',
      style: 'Red BELL PEPPER - round bulbous shape, wears BLACK-FRAMED GLASSES',
      elements: 'Red bell pepper body (#D94C35), green stem, MUST HAVE: BLACK GLASSES on face, large cartoon eyes behind glasses, smart knowing smirk',
      personality: 'Strategic thinker, smart player, the "brain" of the team',
      colorGuide: 'Body: #D94C35 (vibrant red), Stem: #4A7C3F, Shorts: #3D5A3D, REQUIRED: Black-framed glasses',
    },

    // === POSE TYPES ===

    'Action Pose': {
      background: 'Clean white background',
      lineColor: 'Bold outlines with motion energy',
      style: 'High-energy volleyball action - spike, dig, serve, or dive',
      elements: 'Dynamic athletic pose, volleyball in frame, FACE MUST BE VISIBLE with excited expression',
      personality: 'Peak athletic moment, competitive spirit, skill demonstration',
    },

    'Celebration': {
      background: 'Clean white background',
      lineColor: 'Bold outlines with triumphant feel',
      style: 'Victory pose - fist pump, jump celebration, team energy',
      elements: 'Arms raised, FACE MUST SHOW: huge joyful smile, excited eyes, pure happiness',
      personality: 'Pure joy, team victory, inclusive celebration',
    },

    'Standing': {
      background: 'Clean white background',
      lineColor: 'Clean bold outlines',
      style: 'Static pose - thumbs up, wave, ready position, ball spin',
      elements: 'Friendly gesture, FACE MUST BE CLEARLY VISIBLE: welcoming smile, friendly eyes',
      personality: 'Welcoming, brand ambassador, approachable mascot',
    },

    // === BACKGROUND VARIANTS ===

    'Dark Background': {
      background: 'Deep dark background (#0a0a0a near-black) with subtle heat-colored glow and ember particle effects',
      lineColor: 'Bold black outlines with vivid color fills that pop against dark',
      style: 'Mascot on dark cinematic background with heat-colored accent lighting — green (#4ade80), orange (#f97316), red (#ef4444) rim lights and subtle ember particles',
      elements: 'Character centered with dramatic lighting, subtle heat glow around mascot, floating ember/spark particles, dark vignette edges',
      personality: 'Instagram-ready dark aesthetic matching the Let\'s Pepper website brand — screenshot-ready premium feel',
    },

    'Dark Poster': {
      background: 'Near-black (#0a0a0a) gradient to dark charcoal (#1a1a1a) with heat-colored accent glow',
      lineColor: 'Bold outlines with colors that contrast against dark — vivid fills with subtle glow',
      style: 'Feature reveal poster format — cinematic lighting, dramatic composition, single mascot hero shot on dark background',
      elements: 'Full mascot front-and-center, dramatic rim lighting in heat colors, subtle smoke/ember effects, premium sports poster aesthetic',
      personality: 'High-energy announcement graphic — "The Drop" energy, cinematic and premium',
    },

    'Dark Trophy': {
      background: 'Near-black (#0a0a0a) with gold (#F5B91A) accent lighting and subtle metallic shimmer',
      lineColor: 'Bold outlines with gold-leaf accents on the mascot',
      style: 'Award ceremony aesthetic — mascot in victory pose with gold-leaf metallic accents, trophy presentation feel',
      elements: 'Mascot in celebration pose with golden rim light, subtle gold particle effects, premium award-show atmosphere',
      personality: 'End-of-season award reveal — prestigious, celebratory, gold-accented premium',
    },
  },

  default: {
    background: 'Transparent background',
    lineColor: 'Bold black outlines (#1A1A1A)',
    style: 'Clean mascot illustration, athletic bell pepper character',
    elements: 'Bell pepper body, green stem, athletic shorts, green sneakers, volleyball',
    personality: 'Friendly athletic mascot for grass volleyball brand',
  },

  conceptMap: {
    // === PEPPER VARIETIES (shapes) ===
    'bell': 'round bulbous bell pepper shape with lobes at bottom',
    'jalapeno': 'elongated tapered jalapeño shape with pointed tip, bright green',
    'jalapeño': 'elongated tapered jalapeño shape with pointed tip, bright green',
    'poblano': 'wide at top, long tapered poblano shape, dark green, slight texture',
    'banana': 'long curved crescent banana pepper shape, pale yellow',
    'ghost': 'wrinkled gnarly ghost pepper shape, intense red-orange, intimidating',
    'serrano': 'slim elongated serrano shape, sleek deep green (#2E7D32), pointed tip, smaller than jalapeño',
    'chipotle': 'dried wrinkled chipotle shape, smoky brown-red (#8B4513), weathered texture, veteran look',
    'habanero': 'round lantern-shaped habanero, bumpy bright orange (#FF6D00), short and stout',
    'reaper': 'gnarly carolina reaper shape, intense red (#C62828), scorpion-like tail curling from bottom',
    'carolina reaper': 'gnarly carolina reaper shape, intense red (#C62828), scorpion-like tail curling from bottom',
    'pepper x': 'alien-looking pepper X shape, electric fuchsia (#D946EF), extreme gnarly texture, otherworldly',
    'pepperx': 'alien-looking pepper X shape, electric fuchsia (#D946EF), extreme gnarly texture, otherworldly',

    // === VOLLEYBALL ACTIONS ===
    'spike': 'jumping with arm raised high about to hit volleyball, excited face visible',
    'dig': 'diving horizontally arms extended to save ball, determined face visible',
    'serve': 'tossing ball up arm back ready to serve, focused face visible',
    'set': 'arms raised fingers positioned for overhead set, concentrated face',
    'block': 'jumping with arms up to block at net, intense face visible',
    'pass': 'platform position forearms together for bump pass, ready expression',
    'attack': 'explosive jump arm cocked back for powerful hit, fierce smile',

    // === CELEBRATIONS ===
    'victory': 'both fists raised in triumph, HUGE open-mouth smile showing joy',
    'celebrate': 'jumping with joy arms in the air, ecstatic facial expression',
    'fistpump': 'one arm raised with clenched fist, determined confident smile',
    'highfive': 'hand raised for high five, welcoming happy expression',
    'winner': 'triumphant pose, beaming smile, champion energy',

    // === STATIC POSES ===
    'thumbsup': 'giving thumbs up, big friendly smile, welcoming eyes',
    'wave': 'waving hand in greeting, happy open expression',
    'ready': 'athletic stance knees bent arms out, focused but friendly face',
    'spin': 'spinning volleyball on one finger, playful cocky smirk',
    'hold': 'holding volleyball under arm or against hip, casual confident smile',

    // === COLOR VARIANTS (Bell Pepper) ===
    'yellow': 'golden YELLOW bell pepper (#F5B91A), primary mascot, happy leader',
    'green': 'forest GREEN bell pepper (#4A7C3F), grounded defender personality',
    'red': 'vibrant RED bell pepper (#D94C35), MUST wear BLACK GLASSES, smart strategic',
    'orange': 'bright ORANGE bell pepper (#FF8C00), energetic and warm',

    // === EVENT FLAVORS ===
    'entry': 'Bell Pepper mascot - sweet welcoming entry level',
    'spicy': 'Jalapeño mascot - mid-tier intensity technical',
    'gritty': 'Poblano mascot - defensive grinder low and loaded',
    'unpredictable': 'Banana Pepper mascot - playful curved specialist',
    'elite': 'Ghost Pepper mascot - invite-only intensity intimidating',

    // === QUIZ PERSONALITY FLAVORS ===
    'sneaky': 'Serrano mascot - quiet confidence, under the radar, deadly execution',
    'veteran': 'Chipotle mascot - smoky veteran, composed leader, refined touch',
    'intense': 'Habanero mascot - intense competitor, passionate, contagious fire',
    'relentless': 'Carolina Reaper mascot - unhinged energy, no off switch, 100% effort',
    'chaotic': 'Pepper X mascot - beyond the scale, chaotic legend, sky ball specialist',

    // === CONTEXTS ===
    'grass': 'outdoor grass volleyball setting',
    'tournament': 'competitive tournament atmosphere',
    'team': 'multiple pepper mascots together',
    'dark': 'dark background (#0a0a0a) with heat-colored glow and ember effects, Instagram-ready',
    'poster': 'cinematic dark poster with dramatic lighting, feature reveal energy',
    'trophy': 'award ceremony dark background with gold accent lighting and metallic shimmer',
    'instagram': 'Instagram story/post ready — dark background, heat accents, screenshot-friendly',
  },

  // Format-specific modifiers
  formatModifiers: {
    web: 'High detail, transparent PNG, crisp at 400px+',
    print: 'CMYK-safe colors, 300dpi quality, bleed-ready',
    tshirt: 'Simplified 2-3 colors, bold for screen printing, works on dark fabric',
    sticker: 'Die-cut friendly silhouette, extra bold outlines, 2-4px white border implied',
    icon: 'Extreme simplification, recognizable at 32x32px',
    'instagram-story': 'Vertical 1080x1920 composition, dark background, heat-colored accents, room for text overlay at top and bottom',
    'instagram-post': 'Square 1080x1080 composition, dark background, centered mascot, heat-colored accents',
    'instagram-reel': 'Vertical 1080x1920 composition, high-energy, cinematic dark background with dramatic lighting',
  },
};

export default LETS_PEPPER_STYLES;
