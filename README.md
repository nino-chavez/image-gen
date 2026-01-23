# @nino-tools/image-gen

AI-powered image generation tool with style systems and optimization. Abstracted from the Signal Dispatch blog's image generation system.

## Features

- **Provider-Agnostic**: Support for OpenRouter (Gemini, Flux, DALL-E) with extensible provider system
- **Style Systems**: Category-based visual styles with concept mapping
- **Image Optimization**: Sharp-based optimization with WebP/JPEG/PNG output
- **Progress Tracking**: Persistent progress for batch operations
- **CLI & Library**: Use as a command-line tool or import into your project
- **Agent Mode**: Intelligent style selection and batch prioritization

## Installation

```bash
cd tools/image-gen
npm install
```

## Environment Setup

```bash
export OPENROUTER_API_KEY=your_api_key_here
```

## CLI Usage

### Generate a Single Image

```bash
# From a title (uses style system)
npx image-gen generate --title "The Future of AI Assistants" --category "AI & Automation" -o header.webp

# From a simple description
npx image-gen generate --description "A lighthouse on a stormy night" -o lighthouse.webp
```

### Batch Generation

```bash
# Generate images for all MDX files in a directory
npx image-gen batch -i ./content/blog -o ./public/images --progress ./progress.json

# Force regenerate all
npx image-gen batch -i ./content/blog -o ./public/images --force
```

### List Styles & Models

```bash
npx image-gen styles -v
npx image-gen models
```

## Library Usage

### Basic Generation

```javascript
import { createGenerator } from '@nino-tools/image-gen';

const generator = await createGenerator({
  provider: 'openrouter',
  model: 'gemini-flash',
  styleSystem: 'illustration',
});

// Generate from content
const result = await generator.generateFromContent(
  {
    title: 'Building Better AI Agents',
    excerpt: 'A practical guide to agent architecture',
    category: 'AI & Automation',
  },
  './output/ai-agents.webp'
);

// Generate from description
const result2 = await generator.generateFromDescription(
  'A minimalist illustration of interconnected nodes',
  './output/network.webp'
);
```

### Using the Agent

```javascript
import { createAgent } from '@nino-tools/image-gen';

const agent = await createAgent({
  styleSystem: 'illustration',
});

// Get style recommendations
const analysis = agent.analyzeContent({
  title: 'Leadership in Times of Change',
  category: 'Leadership',
});
console.log(analysis.reasoning);

// Generate with smart defaults
const result = await agent.generate(
  { title: 'My Article', category: 'Technology' },
  './output.webp'
);

// Batch with intelligent ordering
await agent.generateBatch(items, (item) => `./images/${item.slug}.webp`, {
  onProgress: (p) => console.log(`${p.current}/${p.total}: ${p.item.title}`),
});
```

### Custom Style System

```javascript
import { registerStyleSystem, createGenerator } from '@nino-tools/image-gen';

registerStyleSystem('corporate', {
  name: 'corporate',
  description: 'Clean corporate illustrations',
  styles: {
    'Finance': {
      background: 'Navy blue gradient (#0a1628 to #162447)',
      lineColor: 'Gold lines (#c9a227)',
      style: 'Professional, clean isometric',
      elements: 'charts, graphs, currency symbols',
      personality: 'Trustworthy and authoritative',
    },
    // ... more categories
  },
  default: {
    background: 'Slate grey (#334155)',
    lineColor: 'White with blue accents',
    style: 'Modern minimalist',
    elements: 'geometric shapes, clean lines',
    personality: 'Professional and approachable',
  },
  conceptMap: {
    'revenue': 'upward trending graph',
    'growth': 'ascending staircase',
    // ... more mappings
  },
});

const generator = await createGenerator({
  styleSystem: 'corporate',
});
```

## Style Systems

### Built-in: `illustration`

Hand-drawn editorial illustrations with category-based visual identities. Categories:

| Category | Visual Style |
|----------|--------------|
| AI & Automation | Technical blueprint + cyan accents |
| Reflections | Journal marginalia + golden amber |
| Leadership | Architectural linework + gold |
| Commerce | Isometric illustrations + teal/orange |
| Meta | Escher-like geometries + violet/pink |
| Systems Thinking | Organic diagrams + sky blue/green |
| Consulting | Whiteboard sketches + copper |
| Field Notes | Annotated sketches + graphite/red |
| Photography | Viewfinder aesthetic + white/amber |
| Technology | Technical diagrams + blue/green |
| Design | Sketchbook aesthetic + coral |

### Concept Map

Keywords in titles are mapped to visual concepts:

- `ai` → "friendly robot assistant"
- `strategy` → "chess pieces in motion"
- `team` → "figures working together"
- `code` → "elegant flowing script"

## API Reference

### `createGenerator(options)`

Creates an image generator instance.

**Options:**
- `provider`: Provider name (`'openrouter'` | `'auto'`)
- `model`: Model alias (`'gemini-flash'`, `'flux-pro'`, etc.)
- `styleSystem`: Style system name
- `width`, `height`: Output dimensions (default: 1200x675)
- `format`: Output format (`'webp'`, `'jpeg'`, `'png'`)
- `quality`: Compression quality (1-100)
- `rateLimitMs`: Delay between batch requests
- `progressFile`: Path for progress tracking

### `createAgent(options)`

Creates an intelligent image agent with style analysis.

**Additional Methods:**
- `analyzeContent(content)`: Get style recommendations
- `getStats()`: Get generation statistics
- `getStyleRecommendations(items)`: Get batch recommendations

### `buildPrompt(options)`

Build a generation prompt manually.

### Utilities

- `optimizeBuffer(buffer, options)`: Optimize an image buffer
- `optimizeAndSave(buffer, path, options)`: Optimize and save
- `ProgressTracker`: Persistent progress tracking class

## Architecture

```
tools/image-gen/
├── src/
│   ├── index.js           # Main exports
│   ├── generator.js       # Core generator class
│   ├── agent.js           # Intelligent agent wrapper
│   ├── prompt-builder.js  # Prompt construction
│   ├── cli.js             # Command-line interface
│   ├── providers/
│   │   ├── base.js        # Provider interface
│   │   ├── openrouter.js  # OpenRouter implementation
│   │   └── index.js       # Provider registry
│   ├── styles/
│   │   ├── base.js        # Style system interface
│   │   ├── illustration.js # Hand-drawn styles
│   │   └── index.js       # Style registry
│   └── utils/
│       ├── optimizer.js   # Sharp-based optimization
│       ├── progress.js    # Progress tracking
│       └── index.js       # Utility exports
├── examples/
├── tests/
└── package.json
```

## License

MIT
