/**
 * Flickday Media DTF T-Shirt Style System
 * Sports Press / Media Credential aesthetic for brand merch
 *
 * Brand Identity:
 * - "Every Day's a Flickday"
 * - Grassroots sports media — raw, fast, player-first
 * - Camera aperture + volleyball hybrid mark with motion trails
 * - Sports press credentials, contact sheets, shutter speed readouts
 * - Instagram: @flickday.media | flickday@ninochavez.co
 *
 * Color System:
 * - fd-black: #000000 (true black)
 * - fd-rich-black: #0a0a0f (card/surface black)
 * - fd-yellow: #facc15 (Flickday Yellow — primary accent)
 * - fd-yellow-hover: #fde047 (lighter yellow for highlights)
 * - fd-white: #ffffff (primary text on dark)
 * - fd-gray-300: #d1d5db (secondary text)
 * - fd-gray-500: #6b7280 (muted text, borders)
 * - fd-gray-700: #374151 (subtle borders)
 * - fd-green: #22c55e (live/booking status)
 * - fd-orange: #f97316 (video badge)
 * - fd-pink: #ec4899 (reels badge)
 *
 * Typography:
 * - Display: Bebas Neue (ALL CAPS, high energy headlines)
 * - Body: Inter (clean sans-serif)
 * - Mono: JetBrains Mono (labels, metadata, technical)
 *
 * DTF Print Specs:
 * - Output: PNG with transparency
 * - Colors: Full color DTF (yellow + white on dark, yellow + black on light)
 * - Minimal ink coverage where possible
 */

export const FLICKDAY_MEDIA_STYLES = {
  name: 'flickday-media',
  description:
    'Flickday Media brand merch — sports press credential × action photography aesthetic for DTF t-shirt prints',

  basePrompt: `
BRAND: Flickday Media — grassroots sports media company specializing in volleyball and action sports content. Chicago-based.
AESTHETIC: Sports press credential meets high-energy action photography. Think press badges, media passes, contact sheets, shutter speed displays, and field-side energy.

KEY VISUAL LANGUAGE:
- Camera aperture blades (6-blade iris) — the core brand motif
- Volleyball panel lines merged with aperture geometry
- Motion trails, speed lines, kinetic energy
- Press credential badges, lanyards, media passes
- Film strip frames, contact sheet grids
- Shutter speed / ISO / f-stop readouts as decorative type
- High contrast: yellow on black, or black on yellow
- Clean geometric shapes, no ornamental flourishes

COLOR PALETTE:
- Primary: #facc15 Flickday Yellow (warm, saturated)
- Secondary: #fde047 lighter yellow (highlights, gradients)
- Dark: #000000 true black, #0a0a0f rich black
- Light: #ffffff white (text on dark backgrounds)
- Accent: #22c55e live green, #f97316 video orange, #ec4899 reels pink
- Neutral: #d1d5db gray-300, #6b7280 gray-500

CRITICAL:
- NO text, words, letters, or typography in AI-generated images
- Typography will be composited separately via HTML overlay
- Focus on GEOMETRIC SHAPES, MOTION, and PHOTOGRAPHIC MOTIFS
- Output must work as a DTF transfer print on fabric
`.trim(),

  styles: {
    // === DTF PRINT CATEGORIES ===

    'press-badge': {
      background:
        'TRANSPARENT — no background fill. Badge shape floats on transparency for DTF cutout.',
      lineColor:
        'Flickday Yellow (#facc15) borders and accent lines. White (#ffffff) fill areas. Black (#000000) for contrast details.',
      style:
        'Sports media press credential / VIP badge — clean geometric badge shape with lanyard hole at top. Modern, official, bold. The badge shape IS the cutout boundary. CRITICAL: transparent background.',
      elements:
        'Rectangular badge shape with rounded corners, lanyard hole punch circle at top center, horizontal stripe bands, camera aperture motif as watermark, geometric grid lines suggesting a barcode/QR zone. Clean outer edge for DTF contour cut.',
      personality:
        'Official but cool. Like a backstage media pass you actually want to keep. Field-side energy.',
    },

    'credential-strip': {
      background:
        'TRANSPARENT — no background fill. Strip floats on transparency.',
      lineColor:
        'Flickday Yellow (#facc15) on transparent. Minimal ink — outlines and fills only.',
      style:
        'Horizontal media credential strip — like a wristband or accreditation strip. Narrow, wide, modern geometric. CRITICAL: transparent background, strip shape IS the cutout boundary.',
      elements:
        'Long horizontal rectangle with geometric internal divisions, aperture icon, motion speed lines trailing from one end. Minimal detail, reads at distance. Clean edges for DTF cut path.',
      personality:
        'Wearable credential energy. Quick-read brand strip. The kind of thing you see on a media lanyard.',
    },

    'contact-sheet': {
      background:
        'TRANSPARENT — no background fill. Frame grid floats on transparency.',
      lineColor:
        'Flickday Yellow (#facc15) frame lines. White (#ffffff) accent marks. Thin precise lines.',
      style:
        'Film contact sheet / proof sheet aesthetic — grid of empty frames with film sprocket holes along edges. Photographic darkroom energy. CRITICAL: transparent background.',
      elements:
        'Grid of rectangular frames (3x4 or 2x3), film sprocket holes along top and bottom edges, frame numbers in corners, aperture motif in one frame as the focal point. Geometric, precise, photographic.',
      personality:
        'Behind-the-scenes photographer energy. The tools of the trade. Raw, unprocessed, authentic.',
    },

    'shutter-dial': {
      background:
        'TRANSPARENT — no background fill. Circular dial floats on transparency.',
      lineColor:
        'Flickday Yellow (#facc15) primary. White (#ffffff) tick marks and details. High contrast.',
      style:
        'Camera top-plate dial / shutter speed selector — circular mechanical dial with tick marks, indicator notch. Vintage camera control meets modern brand mark. CRITICAL: transparent background, circle IS the cutout boundary.',
      elements:
        'Circular dial with concentric rings, radial tick marks at regular intervals (like shutter speed positions), center aperture motif, indicator triangle/notch at top. Mechanical precision, satisfying geometry.',
      personality:
        'Precision instrument energy. The camera IS the tool. Technical but beautiful. Analog tactile feel.',
    },

    'motion-mark': {
      background:
        'TRANSPARENT — no background fill. Mark floats on transparency.',
      lineColor:
        'Flickday Yellow (#facc15) only — single color for maximum DTF efficiency.',
      style:
        'Kinetic brand mark — the volleyball-aperture hybrid in motion with speed trails. Dynamic, energetic, reads at any size. CRITICAL: transparent background, mark silhouette IS the cutout boundary.',
      elements:
        'Circular volleyball-aperture hybrid mark with 3-5 motion/speed lines trailing behind it. The ball appears to be moving fast — diagonal trajectory. Simple, bold, icon-like. Clean contour for DTF cut.',
      personality:
        'Pure energy. The ball is in motion, the shutter is clicking. Fast. This is the brand distilled to its purest form.',
    },

    'viewfinder': {
      background:
        'TRANSPARENT — no background fill. Viewfinder frame floats on transparency.',
      lineColor:
        'Flickday Yellow (#facc15) frame lines. White (#ffffff) for focus indicators and brackets.',
      style:
        'Camera viewfinder / heads-up display — looking through a camera viewfinder with focus brackets, exposure readout zones, rule-of-thirds grid. CRITICAL: transparent background.',
      elements:
        'Rectangular viewfinder frame with corner focus brackets (L-shaped), center focus point (crosshair or small brackets), rule-of-thirds grid lines (subtle), small indicator zones in corners for metadata display. The frame creates negative space — the subject is implied.',
      personality:
        'First-person perspective. You ARE the photographer. The viewfinder is your world. Focused, intentional, ready.',
    },

    'aperture-burst': {
      background:
        'TRANSPARENT — no background fill. Burst floats on transparency.',
      lineColor:
        'Flickday Yellow (#facc15) with white (#ffffff) highlights. Radiating energy.',
      style:
        'Aperture blade starburst — camera aperture blades opening/closing with energy radiating outward. Like a flash firing or a shutter opening to reveal light. CRITICAL: transparent background.',
      elements:
        '6-blade aperture iris pattern at center with light/energy rays radiating outward between blades. The aperture is partially open — light escaping through the gaps. Geometric, precise, explosive energy. Clean outer edge for DTF contour.',
      personality:
        'The decisive moment. The shutter fires. Light floods in. Explosive, frozen-in-time energy.',
    },

    texture: {
      background:
        'Subtle seamless texture — film grain, digital noise, or halftone screen. Should tile cleanly.',
      lineColor: 'Single tone — yellow (#facc15) or white (#ffffff) on transparent',
      style:
        'Seamless background texture for compositing — film grain, sensor noise, or geometric grid pattern',
      elements:
        'Repeating texture pattern — options: film grain noise, camera sensor pixel grid, contact sheet frame repeat, or aperture blade geometric tessellation',
      personality: 'Utility texture layer. Adds photographic depth without competing with content.',
    },
  },

  default: {
    background:
      'True black (#000000) with subtle film grain texture',
    lineColor:
      'Flickday Yellow (#facc15) primary with white (#ffffff) accents',
    style:
      'Sports media credential / action photography aesthetic — bold, modern, kinetic',
    elements:
      'Camera aperture motif, volleyball silhouette, motion speed lines, geometric frames',
    personality:
      'Raw. Fast. Player-first. Every day is a flickday.',
  },

  conceptMap: {
    // === BRAND ELEMENTS ===
    aperture: 'camera aperture iris blades, 6-blade pattern, the core brand icon',
    shutter: 'shutter mechanism, curtain reveal, decisive moment',
    lens: 'camera lens barrel, glass reflections, optical elements',
    flash: 'strobe flash burst, explosive light, frozen moment',
    film: 'film strip frames, sprocket holes, contact sheet grid',
    credential: 'press badge, media pass, VIP credential, accreditation',
    viewfinder: 'camera viewfinder overlay, focus brackets, exposure readout',

    // === VOLLEYBALL ===
    volleyball: 'volleyball with visible panel lines, slightly stylized, clean',
    spike: 'dynamic volleyball spike motion, arm raised, explosive',
    serve: 'volleyball serve toss, upward motion, anticipation',
    action: 'mid-play sports action, frozen in motion, peak moment',
    court: 'volleyball net and court lines, competition setting',

    // === MOTION / ENERGY ===
    motion: 'speed lines, motion blur trails, kinetic energy, movement',
    speed: 'velocity indicators, trailing lines, fast movement',
    burst: 'explosive energy, starburst, flash pop, impact moment',
    kinetic: 'energy in motion, dynamic angles, diagonal composition',
    freeze: 'frozen moment, time stopped, decisive instant',

    // === PHOTOGRAPHIC ===
    grain: 'film grain texture, high-ISO noise, analog warmth',
    'contact sheet': 'proof sheet grid, film frames, photographer workflow',
    darkroom: 'developing process, red safe light, chemical trays',
    exposure: 'light metering, histogram, EV values, exposure triangle',

    // === CONTENT TYPES ===
    photos: 'photography badge, yellow accent, static captures',
    video: 'video badge, orange accent (#f97316), motion content',
    reels: 'reels badge, pink accent (#ec4899), short-form edits',
    live: 'live/booking indicator, green pulse (#22c55e), available now',

    // === MERCH CONTEXTS ===
    'front print': 'center chest composition, 10-12 inch wide, vertical format',
    'back print': 'full back composition, 12-14 inch wide, tall vertical format',
    'pocket hit': 'small 3-4 inch composition, left chest placement, minimal detail',
    dtf: 'DTF transfer ready, full color, works on dark fabric',
    'sleeve hit': 'small 2-3 inch composition, upper arm placement, icon-only',

    // === LOCATIONS / CONTEXT ===
    chicago: 'Chicago-based, midwest grassroots sports scene',
    courtside: 'field-side, courtside perspective, on-location energy',
    grassroots: 'community sports, local tournaments, player-first coverage',
  },

  formatModifiers: {
    'dtf-front': 'Vertical composition for center chest print. 2400x3000px (8"x10" at 300dpi). Yellow and white on transparent. Bold shapes that read at distance.',
    'dtf-back': 'Tall vertical composition for full back print. 3000x3600px (10"x12" at 300dpi). More detail permitted. Full brand statement.',
    'dtf-pocket': 'Small square composition for left chest. 1200x1200px (4"x4" at 300dpi). Simplified, minimal detail, icon-like. Logo mark only.',
    'dtf-strip': 'Wide horizontal composition for back yoke or hem. 3000x900px (10"x3" at 300dpi). Wordmark lockup.',
    'dtf-sleeve': 'Small square for upper arm. 900x900px (3"x3" at 300dpi). Icon only, no text.',
    web: 'Standard web resolution. 1200x675px. Landscape format for social/web use.',
    print: 'High-res output. 300dpi minimum.',
  },
};

export default FLICKDAY_MEDIA_STYLES;
