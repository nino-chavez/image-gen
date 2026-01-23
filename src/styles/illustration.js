/**
 * Hand-Drawn Illustration Style System
 * Ported from Signal Dispatch blog - professional editorial illustrations
 */

export const ILLUSTRATION_STYLES = {
  name: 'illustration',
  description: 'Hand-drawn editorial illustrations with category-based visual identities',

  styles: {
    'AI & Automation': {
      background: 'Deep navy to midnight gradient (#0a1628 to #162447)',
      lineColor: 'Electric cyan lines (#00d9ff) with soft white accents',
      style: 'Technical blueprint meets organic flow - circuit-like patterns that feel alive',
      elements: 'robots with personality, flowing connection lines, geometric brain patterns, glowing nodes',
      personality: 'Curious and forward-looking, like a friendly guide into the future',
    },
    'Reflections': {
      background: 'Warm charcoal to soft brown gradient (#2d2d2d to #3d3428)',
      lineColor: 'Golden amber lines (#e8b86d) with cream highlights',
      style: 'Thoughtful sketches like journal marginalia - loose, contemplative, human',
      elements: 'open books, coffee cups, window views, single figures in thought, candles',
      personality: 'Introspective and warm, like a quiet conversation with a wise friend',
    },
    'Leadership': {
      background: 'Rich charcoal (#1a1a2e) with subtle purple undertones',
      lineColor: 'Warm gold (#c9a227) with silver accent lines',
      style: 'Confident architectural linework - strong but not rigid, like good mentorship',
      elements: 'lighthouses, mountain paths, bridges being built, hands reaching, compasses',
      personality: 'Authoritative but approachable, experienced but still learning',
    },
    'Commerce': {
      background: 'Dark slate with teal undertones (#0d1f22 to #1a3a3a)',
      lineColor: 'Bright teal (#2dd4bf) with orange accents (#f97316)',
      style: 'Clean isometric illustrations - systems and flows made visual',
      elements: 'shopping carts with wings, connected storefronts, flow charts that dance, coins in motion',
      personality: 'Strategic and energetic, seeing opportunity in complexity',
    },
    'Meta': {
      background: 'Deep purple-black gradient (#1a0a2e to #2d1b4e)',
      lineColor: 'Soft violet (#a78bfa) with pink highlights (#f472b6)',
      style: 'Escher-like impossible geometries - playful recursion',
      elements: 'hands drawing themselves, nested frames, mirrors reflecting mirrors, infinite staircases',
      personality: 'Intellectually playful, delighting in self-reference',
    },
    'Systems Thinking': {
      background: 'Dark blue-grey (#1e293b to #334155)',
      lineColor: 'Sky blue (#38bdf8) with green data accents (#4ade80)',
      style: 'Elegant diagrams that feel organic - where structure meets nature',
      elements: 'interconnected nodes, tree-like networks, gears as ecosystems, flowing data rivers',
      personality: 'Pattern-seeking and holistic, finding beauty in complexity',
    },
    'Consulting': {
      background: 'Professional charcoal (#262626) with warm undertones',
      lineColor: 'Warm white (#f5f5f4) with copper accents (#f59e0b)',
      style: 'Whiteboard sketches come to life - energetic and collaborative',
      elements: 'sticky notes taking flight, collaborative diagrams, puzzle pieces connecting, lightbulbs',
      personality: 'Energetic problem-solver, collaborative spirit',
    },
    'Field Notes': {
      background: 'Kraft paper texture effect (#2a2520 to #3d3630)',
      lineColor: 'Pencil graphite grey (#94a3b8) with red annotation marks (#ef4444)',
      style: 'Field journal sketches - observational, annotated, authentic',
      elements: 'notebooks, binoculars, specimen drawings, maps with routes, timestamps',
      personality: 'Curious observer, documenting discoveries in real-time',
    },
    'Photography': {
      background: 'Deep black with subtle blue (#0a0a0a to #0f172a)',
      lineColor: 'Bright white (#ffffff) with film-strip amber (#fbbf24)',
      style: 'Camera viewfinder aesthetic - frames within frames',
      elements: 'lens apertures, film strips, light rays, composition grids, shutter clicks',
      personality: 'Visual storyteller, seeing the extraordinary in ordinary moments',
    },
    'Technology': {
      background: 'Dark slate (#0f172a to #1e293b)',
      lineColor: 'Electric blue (#3b82f6) with green accents (#22c55e)',
      style: 'Technical diagrams with warmth - accessible complexity',
      elements: 'circuit boards, code snippets as art, data streams, network nodes',
      personality: 'Technical expert who makes complexity approachable',
    },
    'Design': {
      background: 'Warm grey gradient (#1c1917 to #292524)',
      lineColor: 'Coral (#f97316) with cream highlights (#fef3c7)',
      style: 'Sketchbook aesthetic - ideas in development',
      elements: 'wireframes, color swatches, typography specimens, grid systems',
      personality: 'Creative problem-solver, balancing form and function',
    },
  },

  default: {
    background: 'Rich charcoal gradient (#1f1f1f to #2d2d2d)',
    lineColor: 'Warm white (#e5e5e5) with teal accents (#14b8a6)',
    style: 'Clean editorial illustration - professional but with character',
    elements: 'abstract symbols relevant to the topic, elegant linework, thoughtful composition',
    personality: 'Thoughtful professional sharing hard-won insights',
  },

  conceptMap: {
    // AI & Tech
    'ai': 'friendly robot assistant',
    'agent': 'autonomous helper character',
    'automation': 'self-moving gears and cogs',
    'machine': 'elegant mechanical creature',
    'algorithm': 'flowing decision tree',
    'neural': 'interconnected constellation',
    'model': 'architectural blueprint',
    'prompt': 'conversation bubbles',
    'llm': 'vast library with glowing books',
    'chatgpt': 'friendly dialogue illustration',
    'claude': 'thoughtful assistant character',

    // Strategy
    'strategy': 'chess pieces in motion',
    'plan': 'roadmap with milestones',
    'framework': 'scaffolding being built',
    'architecture': 'elegant building cross-section',
    'design': 'drafting tools and sketches',
    'system': 'interconnected modules',

    // Human
    'team': 'figures working together',
    'leadership': 'guide with lantern',
    'mentor': 'wise figure sharing knowledge',
    'growth': 'seedling becoming tree',
    'learning': 'books sprouting ideas',
    'career': 'winding path upward',
    'burnout': 'flame dimming but not out',
    'balance': 'tightrope walker',

    // Work
    'consulting': 'whiteboard full of ideas',
    'meeting': 'heads coming together',
    'deadline': 'clock with wings',
    'project': 'construction crane building',
    'code': 'elegant flowing script',
    'build': 'hands assembling blocks',
    'ship': 'rocket preparing for launch',
    'deploy': 'paper airplane taking flight',

    // Commerce
    'commerce': 'shop window with magic',
    'storefront': 'welcoming doorway with light',
    'customer': 'two figures exchanging',
    'market': 'bustling bazaar from above',
    'product': 'gift box being opened',
    'checkout': 'smooth flowing transaction',

    // Meta
    'writing': 'pen leaving trail of stars',
    'blog': 'typewriter with wings',
    'voice': 'sound waves becoming shapes',
    'story': 'open book with world inside',
    'reflection': 'figure looking in mirror',
    'philosophy': 'thinker surrounded by symbols',
  },
};
