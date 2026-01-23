/**
 * Prompt Builder
 * Constructs detailed image generation prompts from style systems
 */

import { getStyleForCategory, extractVisualConcept } from './styles/index.js';

/**
 * Default prompt template for illustrations
 */
const DEFAULT_TEMPLATE = `Create a sophisticated hand-drawn illustration for a professional header image.

CONTEXT:
Title: "{title}"
{excerpt}
Visual Concept: {visualConcept}

ILLUSTRATION STYLE:
Background: {background}
Line Art Color: {lineColor}
Drawing Style: {style}
Visual Elements: {elements}
Personality: {personality}

CRITICAL REQUIREMENTS:
1. HAND-DRAWN AESTHETIC - looks like skillful pen/pencil work, NOT photorealistic
2. LINE ART FOCUS - bold confident strokes, varying line weights, organic feeling
3. LIMITED COLOR PALETTE - background gradient + 2-3 accent colors maximum
4. NEGATIVE SPACE - minimum 35% breathing room, composition not cluttered
5. SINGLE FOCAL POINT - one main visual element that tells the story
6. SLIGHTLY WHIMSICAL - professional but with personality and charm
7. HORIZONTAL COMPOSITION - optimized for {aspectRatio} landscape format

INCLUDE:
- One central illustrated element capturing the essence
- Supporting linework creating depth without clutter
- Subtle gradient background (not flat color)
- Organic imperfections that feel hand-crafted

AVOID:
- NO text, letters, words, or typography
- NO realistic photographs or photographic elements
- NO faces with identifiable features (abstract figures OK)
- NO generic stock imagery
- NO busy or cluttered compositions

OUTPUT: {width}x{height} pixels
Create an illustration that draws viewers in.`;

/**
 * Build a prompt for image generation
 * @param {object} options
 * @param {string} options.title - Content title
 * @param {string} [options.excerpt] - Content description
 * @param {string} [options.category] - Content category for style matching
 * @param {object} options.styleSystem - Style system to use
 * @param {string} [options.template] - Custom prompt template
 * @param {number} [options.width=1200] - Target width
 * @param {number} [options.height=675] - Target height
 * @returns {string}
 */
export function buildPrompt(options) {
  const {
    title,
    excerpt,
    category,
    styleSystem,
    template = DEFAULT_TEMPLATE,
    width = 1200,
    height = 675,
  } = options;

  const style = getStyleForCategory(styleSystem, category);
  const visualConcept = extractVisualConcept(styleSystem, title);
  const aspectRatio = `${width}:${Math.round((height / width) * width)}`;

  const replacements = {
    title,
    excerpt: excerpt ? `Summary: "${excerpt.substring(0, 200)}"` : '',
    visualConcept,
    background: style.background,
    lineColor: style.lineColor,
    style: style.style,
    elements: style.elements,
    personality: style.personality,
    width: String(width),
    height: String(height),
    aspectRatio,
  };

  let prompt = template;
  for (const [key, value] of Object.entries(replacements)) {
    prompt = prompt.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }

  return prompt;
}

/**
 * Build a simple prompt without style system
 * @param {string} description - What to generate
 * @param {object} options
 * @returns {string}
 */
export function buildSimplePrompt(description, options = {}) {
  const { width = 1200, height = 675, style = 'illustration' } = options;

  return `Create a ${style} image:

${description}

Requirements:
- Clean, professional aesthetic
- Horizontal composition (${width}x${height} pixels)
- No text or typography
- Single clear focal point

Output: ${width}x${height} pixels`;
}

export { DEFAULT_TEMPLATE };
