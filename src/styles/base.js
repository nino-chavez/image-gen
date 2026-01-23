/**
 * Base Style System
 * Defines the structure for visual style configurations
 */

/**
 * @typedef {object} StyleDefinition
 * @property {string} background - Background color/gradient description
 * @property {string} lineColor - Primary line/accent color description
 * @property {string} style - Overall artistic style description
 * @property {string} elements - Suggested visual elements
 * @property {string} personality - Emotional/brand personality
 */

/**
 * @typedef {object} StyleSystem
 * @property {string} name - Style system name
 * @property {string} description - What this style system is for
 * @property {Record<string, StyleDefinition>} styles - Category to style mapping
 * @property {StyleDefinition} default - Default style when no category matches
 * @property {Record<string, string>} conceptMap - Keyword to visual concept mapping
 */

/**
 * Base style system - can be extended or replaced
 */
export const BASE_STYLES = {
  name: 'default',
  description: 'Clean, professional illustration style',
  styles: {
    default: {
      background: 'Rich charcoal gradient (#1f1f1f to #2d2d2d)',
      lineColor: 'Warm white (#e5e5e5) with teal accents (#14b8a6)',
      style: 'Clean editorial illustration - professional but with character',
      elements: 'abstract symbols, elegant linework, thoughtful composition',
      personality: 'Thoughtful professional sharing insights',
    },
  },
  default: {
    background: 'Rich charcoal gradient (#1f1f1f to #2d2d2d)',
    lineColor: 'Warm white (#e5e5e5) with teal accents (#14b8a6)',
    style: 'Clean editorial illustration - professional but with character',
    elements: 'abstract symbols, elegant linework, thoughtful composition',
    personality: 'Thoughtful professional sharing insights',
  },
  conceptMap: {},
};

/**
 * Get style for a category from a style system
 * @param {StyleSystem} styleSystem
 * @param {string} category
 * @returns {StyleDefinition}
 */
export function getStyleForCategory(styleSystem, category) {
  if (!category) return styleSystem.default;

  const normalizedCategory = category.toLowerCase();

  for (const [key, style] of Object.entries(styleSystem.styles)) {
    const normalizedKey = key.toLowerCase();
    if (
      normalizedCategory.includes(normalizedKey) ||
      normalizedKey.includes(normalizedCategory)
    ) {
      return style;
    }
  }

  return styleSystem.default;
}

/**
 * Extract visual concept from text using concept map
 * @param {StyleSystem} styleSystem
 * @param {string} text
 * @returns {string}
 */
export function extractVisualConcept(styleSystem, text) {
  const textLower = text.toLowerCase();
  const conceptMap = styleSystem.conceptMap || {};

  for (const [keyword, concept] of Object.entries(conceptMap)) {
    if (textLower.includes(keyword)) {
      return concept;
    }
  }

  return 'abstract symbols representing the core idea';
}
