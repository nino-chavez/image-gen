# @nino-tools/image-gen

Image generation tool with two rendering paths: **AI generation** via OpenRouter and **HTML-to-PNG rendering** via Playwright. Includes style systems, a template engine, and sharp-based optimization.

## Features

- **AI Generation**: OpenRouter provider supporting Gemini, Flux, DALL-E, GPT Image
- **HTML-to-PNG**: Render any HTML file to a screenshot using headless Chromium
- **Template Engine**: `{{variable}}` interpolation, conditionals, loops — data-driven image creation
- **Style Systems**: Category-based visual styles (illustration, lets-pepper, signal-dispatch, volley-rx)
- **Image Optimization**: Sharp-based resize, format conversion (WebP/JPEG/PNG), quality control
- **Progress Tracking**: Persistent progress for batch operations
- **CLI & Library**: Use as a command-line tool or import into your project

## Installation

```bash
npm install
npx playwright install chromium
```

## Environment Setup

```bash
# Required for AI generation only (not needed for HTML rendering)
export OPENROUTER_API_KEY=your_api_key_here
```

## CLI Usage

### AI Generation

```bash
# From a description
image-gen generate -d "A lighthouse on a stormy night" -o lighthouse.webp

# From a title with style system
image-gen generate -t "The Future of AI" -c "AI & Automation" -s illustration -o header.webp

# With a reference image
image-gen generate -d "Similar style but with mountains" -r reference.png -o mountains.webp
```

### HTML-to-PNG Rendering

```bash
# Render a single HTML file
image-gen render slide.html -o slide.png

# Render a directory of HTML files
image-gen render output/day2-hot-takes/ -f webp

# With options
image-gen render slide.html -o slide.png -s 1 -f webp -q 85 --wait 500
```

**Options:**
- `-s, --scale <factor>` — Device scale factor (default: `2` for retina)
- `-f, --format <fmt>` — Output format: `png`, `webp`, `jpeg` (default: `png`)
- `-q, --quality <n>` — Lossy quality 1-100 (default: `90`)
- `-w, --width <px>` — Override viewport width
- `--height <px>` — Override viewport height
- `--wait <ms>` — Extra wait after page load for fonts/animations
- `--no-optimize` — Skip sharp processing, output raw screenshot

Viewport is auto-detected from CSS `body { width: Xpx; height: Ypx; }`.

### Template Rendering

Combine an HTML template with JSON data to produce an image.

```bash
# With a JSON data file
image-gen template -t templates/lets-pepper/story-cover.html -d data.json -o cover.png

# With inline data
image-gen template -t templates/lets-pepper/story-cover.html -o cover.png \
  --set label=Community titleLine1=Hot titleLine2=Takes subtitle="The community has spoken."

# List available templates
image-gen templates -d ./templates
```

Templates use `{{variable}}` for escaped values, `{{{variable}}}` for raw HTML, `{{#if}}...{{/if}}` for conditionals, and `{{#each}}...{{/each}}` for loops.

### Watch Mode

Auto-re-render an HTML file on every save — useful for template development.

```bash
image-gen watch slide.html -o slide.png
image-gen watch slide.html -f webp -s 1
```

### Batch AI Generation

```bash
# Generate images for all MDX files in a directory
image-gen batch -i ./content/blog -o ./public/images --progress progress.json

# Force regenerate all
image-gen batch -i ./content/blog -o ./public/images --force
```

### List Styles & Models

```bash
image-gen styles -v
image-gen models
```

## Library Usage

### AI Generation

```javascript
import { createGenerator } from '@nino-tools/image-gen';

const generator = await createGenerator({
  provider: 'openrouter',
  model: 'gemini-flash',
  styleSystem: 'illustration',
});

const result = await generator.generateFromContent(
  { title: 'Building Better AI Agents', category: 'AI & Automation' },
  './output/ai-agents.webp'
);
```

### HTML-to-PNG

```javascript
import { HtmlProvider } from '@nino-tools/image-gen';

const provider = new HtmlProvider();

// Render a file
const buffer = await provider.render('./slide.html', {
  deviceScaleFactor: 2,
  waitMs: 500,
});

// Render an HTML string
const buffer2 = await provider.renderString('<html>...</html>');

await provider.close();
```

### Template Engine

```javascript
import { renderTemplate, renderTemplateFile } from '@nino-tools/image-gen';

// Inline
const html = renderTemplate('<h1>{{title}}</h1>', { title: 'Hello' });

// From file
const html2 = renderTemplateFile('./templates/story.html', {
  label: 'Community',
  titleLine1: 'Hot',
  titleLine2: 'Takes',
});
```

### Combined: Template + Render

```javascript
import { HtmlProvider } from '@nino-tools/image-gen';
import { renderTemplateFile } from '@nino-tools/image-gen/templates';
import { optimizeAndSave } from '@nino-tools/image-gen';

const html = renderTemplateFile('./templates/lets-pepper/story-cover.html', {
  label: 'Rankings',
  titleLine1: 'Top',
  titleLine2: 'Teams',
  subtitle: 'Week 5 standings',
  url: 'letspepper.com/rankings',
});

const provider = new HtmlProvider();
const buffer = await provider.renderString(html, { deviceScaleFactor: 2 });
await optimizeAndSave(buffer, './output/rankings-cover.png', {
  width: null, height: null, format: 'png',
});
await provider.close();
```

### Custom Style System

```javascript
import { registerStyleSystem, createGenerator } from '@nino-tools/image-gen';

registerStyleSystem('corporate', {
  name: 'corporate',
  description: 'Clean corporate illustrations',
  styles: {
    Finance: {
      background: 'Navy blue gradient (#0a1628 to #162447)',
      lineColor: 'Gold lines (#c9a227)',
      style: 'Professional, clean isometric',
      elements: 'charts, graphs, currency symbols',
      personality: 'Trustworthy and authoritative',
    },
  },
  default: { /* ... */ },
  conceptMap: { revenue: 'upward trending graph' },
});
```

## Style Systems

| System | Description |
|--------|-------------|
| `illustration` | Hand-drawn editorial illustrations with category-based identities |
| `lets-pepper` | Let's Pepper grass volleyball mascot — anthropomorphic pepper characters |
| `signal-dispatch` | Signal Dispatch blog visual identity |
| `volley-rx` | Volley RX brand style |
| `default` | Clean, professional baseline |

## Architecture

```
image-gen/
├── src/
│   ├── index.js            # Main exports
│   ├── generator.js        # Core AI generator class
│   ├── agent.js            # Intelligent agent wrapper
│   ├── prompt-builder.js   # Prompt construction
│   ├── cli.js              # CLI (generate, render, template, batch)
│   ├── providers/
│   │   ├── base.js         # Provider interface
│   │   ├── openrouter.js   # AI generation via OpenRouter
│   │   ├── html.js         # HTML-to-PNG via Playwright
│   │   └── index.js        # Provider registry
│   ├── styles/
│   │   ├── base.js         # Style system interface
│   │   ├── illustration.js # Hand-drawn editorial styles
│   │   ├── lets-pepper.js  # Pepper mascot styles
│   │   ├── signal-dispatch.js
│   │   ├── volley-rx.js
│   │   └── index.js        # Style registry
│   ├── templates/
│   │   └── engine.js       # Template interpolation engine
│   └── utils/
│       ├── optimizer.js    # Sharp-based optimization
│       ├── progress.js     # Progress tracking
│       └── index.js
├── templates/              # HTML templates
│   ├── lets-pepper/
│   │   └── story-cover.html
│   ├── signal-dispatch/
│   │   ├── post-header.html
│   │   └── social-card.html
│   └── volley-rx/
│       ├── event-poster.html
│       └── results-card.html
├── tests/
│   └── run.js              # Test suite (37 tests)
├── .github/workflows/
│   └── ci.yml              # GitHub Actions CI
└── package.json
```

## Testing

```bash
npm test
```

Runs 37 tests covering style systems, prompt building, progress tracking, image optimization, template engine, HTML provider, and CLI smoke tests.

## License

MIT
