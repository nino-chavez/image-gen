#!/usr/bin/env node
/**
 * Example: Custom Style System
 * Shows how to create and register a custom style system
 */

import { registerStyleSystem, createGenerator } from '../src/index.js';

// Define a custom style system for a photography portfolio
const PHOTOGRAPHY_PORTFOLIO_STYLES = {
  name: 'photography-portfolio',
  description: 'Elegant photography portfolio style with film-inspired aesthetics',

  styles: {
    'Landscape': {
      background: 'Deep twilight gradient (#0c1445 to #1a237e)',
      lineColor: 'Golden hour amber (#ffc107) with soft white highlights',
      style: 'Expansive horizon compositions with dramatic lighting',
      elements: 'mountain silhouettes, vast skies, leading lines, rule of thirds grid',
      personality: 'Contemplative explorer, finding grandeur in nature',
    },
    'Portrait': {
      background: 'Warm studio grey (#2d2d2d to #424242)',
      lineColor: 'Soft skin tones (#e0b4a0) with catch light white',
      style: 'Intimate focus on human expression and form',
      elements: 'face outlines, expressive eyes, soft bokeh circles, window light',
      personality: 'Empathetic observer, capturing authentic moments',
    },
    'Street': {
      background: 'Urban concrete gradient (#37474f to #263238)',
      lineColor: 'Neon accent (#00e5ff) with harsh shadow black',
      style: 'Gritty urban documentary with high contrast',
      elements: 'city silhouettes, crosswalks, motion blur, decisive moments',
      personality: 'Urban anthropologist, stories in passing moments',
    },
    'Action Sports': {
      background: 'Adrenaline dark (#1b1b1b to #2e2e2e)',
      lineColor: 'Energy orange (#ff5722) with motion blur white',
      style: 'Dynamic freeze-frame capturing peak action',
      elements: 'athletes in motion, spray particles, extreme angles, speed lines',
      personality: 'Thrill-seeker, capturing intensity and dedication',
    },
    'Product': {
      background: 'Clean studio white (#f5f5f5 to #eeeeee)',
      lineColor: 'Product shadow grey (#9e9e9e) with highlight white',
      style: 'Minimalist focus on form and detail',
      elements: 'floating products, soft shadows, reflective surfaces, clean lines',
      personality: 'Precision craftsman, elevating objects to art',
    },
    'Event': {
      background: 'Warm ambient (#3e2723 to #4e342e)',
      lineColor: 'Candlelight gold (#ffcc02) with flash highlight',
      style: 'Documentary moments with available light feel',
      elements: 'crowd silhouettes, dancing figures, ambient lighting, candid expressions',
      personality: 'Invisible observer, capturing celebration and connection',
    },
  },

  default: {
    background: 'Neutral dark grey (#212121 to #424242)',
    lineColor: 'Film silver (#bdbdbd) with warm highlight',
    style: 'Classic photographic aesthetic with timeless appeal',
    elements: 'camera viewfinder, film perforations, light leaks, vignette edges',
    personality: 'Visual storyteller with respect for the craft',
  },

  conceptMap: {
    // Landscape
    'mountain': 'majestic peak with morning mist',
    'ocean': 'waves meeting shore at golden hour',
    'sunset': 'dramatic sky with silhouette foreground',
    'forest': 'light rays through tree canopy',
    'desert': 'endless dunes with harsh shadows',

    // Portrait
    'portrait': 'expressive face with window light',
    'headshot': 'professional close-up with clean background',
    'editorial': 'fashion-forward pose with dramatic lighting',

    // Street
    'urban': 'city street with converging lines',
    'street': 'decisive moment in public space',
    'night': 'neon reflections on wet pavement',

    // Action
    'sports': 'athlete at peak motion',
    'action': 'frozen moment of intensity',
    'adventure': 'extreme angle of daring feat',

    // Technical
    'gear': 'camera equipment with reverence',
    'behind': 'photographer at work',
    'workflow': 'editing setup with screens',
  },
};

// Register the custom style system
registerStyleSystem('photography-portfolio', PHOTOGRAPHY_PORTFOLIO_STYLES);

async function main() {
  console.log('\n🎨 Custom Style System Demo\n');

  // Create generator with custom style
  const generator = await createGenerator({
    provider: 'openrouter',
    model: 'gemini-flash',
    styleSystem: 'photography-portfolio',
    width: 1200,
    height: 800, // Different aspect ratio for portfolio
  });

  // Generate sample images
  const samples = [
    {
      title: 'Mountain Photography Workshop',
      category: 'Landscape',
      output: './samples/landscape-workshop.webp',
    },
    {
      title: 'Street Photography in Tokyo',
      category: 'Street',
      output: './samples/tokyo-streets.webp',
    },
    {
      title: 'Action Sports: Capturing the Moment',
      category: 'Action Sports',
      output: './samples/action-sports.webp',
    },
  ];

  for (const sample of samples) {
    console.log(`Generating: ${sample.title}...`);
    try {
      const result = await generator.generateFromContent(
        { title: sample.title, category: sample.category },
        sample.output
      );
      console.log(`  ✅ ${result.path} (${result.sizeKB}KB)`);
    } catch (error) {
      console.log(`  ❌ ${error.message}`);
    }
  }

  console.log('\n✨ Done!\n');
}

main().catch(console.error);
