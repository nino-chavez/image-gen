/**
 * Volley Rx DTF T-Shirt Style System
 * 1950s Pharmaceutical × Atomic Age aesthetic for tournament merch
 *
 * Brand Identity:
 * - "Your Dose of Competitive Volleyball"
 * - Retro-pharmaceutical, apothecary, atomic age
 * - Prescription metaphor: dose, filled, dispensed, prescribed
 * - Tournament engine: rallyhq.app (referenced as pharmacy/dispensary)
 *
 * Color System:
 * - rx-black: #0a0a0a / #1A1A2E (deep navy midnight)
 * - rx-white: #FDF8F0 (cream)
 * - rx-parchment: #F5E6D3 (aged paper)
 * - rx-accent: #C4923A (aged gold/brass)
 * - rx-teal: #1B4D4F
 * - rx-red: #C4453A
 * - rx-green: #4A7C59
 *
 * Typography (for AI reference — NOT rendered as text):
 * - Display: Playfair Display (serif)
 * - Impact: Bebas Neue (propaganda headers)
 * - Slab: Alfa Slab One (Rx brandmark)
 * - Body: Inter (clean sans)
 * - Mono: JetBrains Mono (labels)
 *
 * DTF Print Specs:
 * - Output: 2400x3000px (8"x10" at 300dpi) or 3600x4200 (12"x14")
 * - Format: PNG with transparency where possible
 * - Colors: Full color DTF (not limited like screen print)
 */

export const VOLLEY_RX_STYLES = {
  name: 'volley-rx',
  description:
    'Volley Rx tournament merch — 1950s pharmaceutical × atomic age aesthetic for DTF t-shirt prints',

  basePrompt: `
BRAND: Volley Rx — competitive adult volleyball tournament series, Chicago IL.
AESTHETIC: 1950s pharmaceutical advertising meets atomic age retro-futurism.
Think vintage apothecary labels, propaganda posters, Bioshock/Fallout art deco.

KEY VISUAL LANGUAGE:
- Aged paper textures, halftone dot patterns, sepia warmth
- Art deco borders, ornamental dividers, starburst rays
- Brass/gold metallic accents on dark or cream backgrounds
- Volleyball as the central subject/icon
- "Rx" symbol as the brand mark (like a pharmacy prescription symbol)

COLOR PALETTE:
- Primary dark: #0a0a0a near-black, #1A1A2E deep navy
- Primary light: #FDF8F0 cream, #F5E6D3 aged parchment
- Accent gold: #C4923A aged brass, #D4A843 lighter gold
- Accent teal: #1B4D4F deep teal
- Accent red: #C4453A warm red (warnings, alerts)
- Accent green: #4A7C59 pharmacy green

CRITICAL:
- NO text, words, letters, or typography in the generated image
- Typography will be composited separately via HTML overlay
- Focus on TEXTURE, PATTERN, ILLUSTRATION, and ATMOSPHERE
- Output must work as a DTF transfer print on fabric (black or cream t-shirt)
`.trim(),

  styles: {
    // === DTF PRINT CATEGORIES ===

    propaganda: {
      background:
        'Near-black (#0a0a0a) with subtle aged paper grain texture and warm sepia undertone',
      lineColor:
        'Aged gold (#C4923A) line art with cream (#FDF8F0) highlights, brass metallic feel',
      style:
        'Soviet/WPA propaganda poster illustration — bold flat shapes, limited palette, dramatic composition. Atomic age starburst rays emanating from center. Strong angular geometry.',
      elements:
        'Volleyball with atomic starburst/sunburst rays behind it, art deco geometric border elements, halftone dot gradient textures, retro ray pattern radiating outward. Volleyball should have subtle Rx cross detail.',
      personality:
        'Bold, commanding, rally-the-troops energy. "Report for your dose." Authoritative but with retro charm.',
    },

    'propaganda-colorway': {
      background:
        'TRANSPARENT — no background fill. All elements float on transparency for DTF cutout.',
      lineColor:
        'Format-specific accent color with cream (#FDF8F0) highlights. Line art and fills only — no background.',
      style:
        'Soviet/WPA propaganda poster illustration — bold flat shapes, limited palette, dramatic starburst composition. Atomic age rays radiate outward. CRITICAL: transparent background, design elements only, optimized for vinyl/DTF cutout contour.',
      elements:
        'Volleyball at center with starburst/sunburst rays radiating outward, art deco corner accents, halftone dot textures on ray fills. Rays and elements should have clean defined edges for cut path. NO rectangular background — the ray shapes ARE the design boundary.',
      personality:
        'Bold, commanding, collectible series. Each format gets its own color variant. Retro propaganda energy.',
    },

    'apothecary-colorway': {
      background:
        'TRANSPARENT — no background fill. Label shape floats on transparency for DTF cutout.',
      lineColor:
        'Dark navy (#1A1A2E) ink lines with format-specific color for dosage stripe/accent band.',
      style:
        'Vintage pharmaceutical label/badge — ornamental border, decorative corners, halftone textures. The label shape IS the cutout boundary. Cream (#FDF8F0) fill inside the label contour only. CRITICAL: transparent outside the label shape, optimized for DTF cutout.',
      elements:
        'Ornamental double-line border forming a vintage label shape (rounded rectangle or shield), colored dosage stripe band across the middle, small Rx motifs, decorative corner flourishes, halftone dot textures inside label area. Clean outer edge for cut contour.',
      personality:
        'Authentic vintage pharmacy packaging. The colored band indicates the "formulation" (tournament format). Collectible medicine label series.',
    },

    'capsule-colorway': {
      background:
        'TRANSPARENT — no background fill. Capsule shape floats on transparency for DTF cutout.',
      lineColor:
        'Cream (#FDF8F0) and format-specific accent color — two-tone split.',
      style:
        'Large retro pharmaceutical capsule pill illustration — two-tone split with clean contour. The capsule shape IS the entire design and cutout boundary. Vintage illustration style with halftone shading. CRITICAL: transparent background, capsule floats alone.',
      elements:
        'Large two-tone capsule pill shape (horizontal or angled), split down the center — one half format color, other half cream. Subtle Rx cross etched into the colored half. Fine halftone dot shading for dimension. Vintage pharmaceutical illustration quality. Clean smooth outer capsule edge for DTF cut path.',
      personality:
        'The pill IS the graphic. Bold, iconic, immediately recognizable. Retro pharmaceutical illustration — the dose for your format.',
    },

    'seal-colorway': {
      background:
        'TRANSPARENT — no background fill. Seal/crest floats on transparency for DTF cutout.',
      lineColor:
        'Format-specific color replacing gold — metallic gradient feel within that hue. Cream (#FDF8F0) accent details.',
      style:
        'Art deco symmetrical crest/emblem — ornamental frame, geometric patterns, vintage seal. Rendered in format color instead of gold. CRITICAL: transparent background, the ornamental outline IS the cutout boundary. Optimized for DTF contour cut.',
      elements:
        'Symmetrical ornamental crest frame with art deco geometric patterns (chevrons, fan shapes, thin radiating lines), volleyball at center, decorative laurel/wheat flourishes flanking sides, starburst accent points. All rendered in format color with cream details. Clean ornamental outer edge for cut path.',
      personality:
        'Prestigious format badge. Like a vintage pharmacy seal stamped in your format color. Collectible, earned, display-worthy.',
    },

    ornamental: {
      background:
        'Deep black (#0a0a0a) with very subtle paper grain texture',
      lineColor:
        'Gold (#C4923A) with metallic gradient from lighter (#D4A843) to deeper (#A87B2E) — simulating gold foil or brass engraving',
      style:
        'Art deco crest/emblem illustration — symmetrical, ornamental, premium. Like a vintage pharmacy seal, apothecary emblem, or gentleman\'s club insignia. Gold foil on black.',
      elements:
        'Ornamental circular frame with art deco geometric patterns, volleyball at center, decorative wheat/laurel flourishes, compass-rose or starburst accents, thin ornamental lines radiating outward, small diamond and circle accent marks',
      personality:
        'Premium, established, prestigious. Like an old-world apothecary seal or luxury brand crest. Timeless.',
    },

    'pill-bottle': {
      background:
        'Aged parchment (#F5E6D3) with subtle paper grain, foxing marks, and slight yellowing at edges — like a genuine old pharmacy label',
      lineColor:
        'Deep navy (#1A1A2E) ink with aged gold (#C4923A) accent details — like printed pharmaceutical packaging',
      style:
        'Vintage pharmaceutical label illustration — decorative borders, ornamental corners, halftone textures. Like a 1940s medicine bottle label or apothecary packaging.',
      elements:
        'Ornamental double-line border frame with decorative corners, halftone dot textures, small pharmaceutical decorative elements (mortar and pestle motif, Rx cross, caduceus-inspired ornaments), vintage printer ornaments between sections, aged paper texture with authentic wear',
      personality:
        'Authentic vintage pharmaceutical. Could pass for a real 1940s label. Detailed, ornate, warm.',
    },

    champion: {
      background:
        'Near-black (#0a0a0a) with dramatic golden light source from above, creating a spotlight/stage effect',
      lineColor:
        'Rich gold gradient (#fbbf24 to #C4923A to #A87B2E) — metallic, reflective, trophy-quality',
      style:
        'Championship/trophy graphic — dramatic golden elements on black, like an awards ceremony or championship belt design. Bold, prestigious, earned.',
      elements:
        'Gold laurel wreath or championship banner frame, metallic gold texture with realistic reflections, starburst or spotlight effect behind center, small star accents, subtle volleyball silhouette integrated into the design',
      personality:
        'Earned prestige. This is a trophy you wear. Champion energy — gold, bold, victorious.',
    },

    texture: {
      background:
        'Subtle seamless texture — aged paper grain, halftone dot pattern, or vintage print texture. Should tile/repeat cleanly.',
      lineColor: 'Single tone — cream (#FDF8F0) or gold (#C4923A) on transparent',
      style:
        'Seamless background texture for compositing behind typography — vintage paper grain, halftone dots, or atomic-age geometric pattern',
      elements:
        'Repeating subtle texture pattern — options: halftone dot gradient, paper fiber grain, art deco geometric repeat, vintage printer dot screen, or atomic-age starburst micro-pattern',
      personality: 'Utility texture layer. Subtle, seamless, adds depth without competing with type.',
    },
  },

  default: {
    background:
      'Near-black (#0a0a0a) with subtle warm grain texture',
    lineColor:
      'Cream (#FDF8F0) primary with aged gold (#C4923A) accents',
    style:
      '1950s retro-pharmaceutical illustration — vintage advertising aesthetic with atomic age influence',
    elements:
      'Volleyball, Rx symbol motif, art deco geometric accents, halftone textures, starburst rays',
    personality:
      'Competitive but charming. Retro pharmacy meets athletic energy. "Everyone needs a dose."',
  },

  conceptMap: {
    // === BRAND ELEMENTS ===
    rx: 'pharmacy prescription Rx symbol as central icon, vintage apothecary style',
    prescription:
      'vintage prescription pad or pharmacy label aesthetic',
    dose: 'medicine bottle or pill capsule shape with volleyball inside',
    pharmacy: 'apothecary shelves, medicine bottles, vintage pharmacy counter',
    pill: 'two-tone capsule pill shape, split color, pharmaceutical',
    capsule: 'rounded capsule/pill shape, clean pharmaceutical form',
    dispensary: 'vintage pharmacy counter with bottles and signage',

    // === VOLLEYBALL ===
    volleyball:
      'volleyball with visible panel lines, slightly stylized, clean',
    spike: 'dynamic volleyball spike motion, arm raised, explosive',
    serve: 'volleyball serve toss, upward motion, anticipation',
    tournament:
      'competitive bracket/trophy aesthetic, championship atmosphere',
    court: 'volleyball net and court lines, overhead or perspective view',

    // === RETRO/VINTAGE ===
    atomic:
      'atomic age starburst, atom symbol with orbiting electrons, 1950s futurism',
    starburst:
      'radiating rays from center point, vintage sunburst pattern',
    propaganda:
      'bold flat shapes, limited palette, WPA/Soviet poster composition',
    halftone: 'Ben-Day dots pattern, vintage comic/print texture',
    'art deco':
      'geometric symmetrical patterns, chevrons, fan shapes, 1920s-30s',
    retro: '1950s advertising illustration style, vintage Americana',
    vintage:
      'aged paper, worn edges, foxing marks, sepia warmth',

    // === DESIGN ELEMENTS ===
    gold: 'metallic gold/brass texture with realistic reflection and depth',
    foil: 'metallic foil stamp effect, embossed, premium tactile feel',
    crest: 'symmetrical emblem/seal design, heraldic but modern',
    ornament:
      'decorative flourishes, ornamental borders, vintage printer marks',
    laurel: 'laurel wreath frame, classical victory symbol, gold',
    banner: 'ribbon banner shape, championship or award style',

    // === EVENT COLORWAYS ===
    coed: 'cool teal/cyan format color (#06b6d4, #14b8a6, #1B4D4F) — clean, balanced energy',
    'kings and queens':
      'warm rose/pink/gold format color (#f9a8d4, #f472b6, #fbbf24) — regal, elegant',
    kq: 'warm rose/pink/gold format color (#f9a8d4, #f472b6, #fbbf24) — regal, elegant',
    mens: 'deep red/crimson format color (#dc2626, #C4453A, #e11d48) — intense, competitive',
    colorway:
      'format-specific color variant, same design structure with different accent color per tournament format',
    'dtf cutout':
      'transparent background, clean contour edges, design floats — no wasted fill area. Optimize for DTF vinyl cut path.',

    // === MERCH CONTEXTS ===
    'front print': 'center chest composition, 10-12 inch wide, vertical format',
    'back print':
      'full back composition, 12-14 inch wide, tall vertical format',
    'pocket hit':
      'small 3-4 inch composition, left chest placement, minimal detail',
    dtf: 'DTF transfer ready, full color, works on dark fabric',
    champion:
      'championship gold, trophy aesthetic, earned prestige',

    // === RALLY HQ ===
    rallyhq:
      'tournament bracket structure, live scoring aesthetic, digital scoreboard',
    brackets:
      'tournament elimination bracket visual, competitive structure',
    scoring:
      'scoreboard, tally marks, point tracking, live results',
  },

  // Format modifiers for DTF-specific output
  formatModifiers: {
    'dtf-front': 'Vertical composition for center chest print. 2400x3000px (8"x10" at 300dpi). Full color on black fabric. Bold shapes that read at distance.',
    'dtf-back': 'Tall vertical composition for full back print. 3000x3600px (10"x12" at 300dpi). Full color on cream or black fabric. More detail permitted.',
    'dtf-pocket': 'Small square composition for left chest. 1200x1200px (4"x4" at 300dpi). Simplified, minimal detail, icon-like.',
    'dtf-allover': 'Wide composition for all-over or oversized print. 4200x3000px (14"x10" at 300dpi). Can extend edge to edge.',
    web: 'Standard web resolution. 1200x675px. Landscape format for social/web use.',
    print: 'High-res CMYK-safe output. 300dpi minimum. Bleed area included.',
  },
};

export default VOLLEY_RX_STYLES;
