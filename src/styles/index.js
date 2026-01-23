/**
 * Style System Registry
 */

import { BASE_STYLES, getStyleForCategory, extractVisualConcept } from './base.js';
import { ILLUSTRATION_STYLES } from './illustration.js';

const STYLE_SYSTEMS = {
  default: BASE_STYLES,
  illustration: ILLUSTRATION_STYLES,
};

/**
 * Get a style system by name
 * @param {string} name
 * @returns {StyleSystem}
 */
export function getStyleSystem(name) {
  return STYLE_SYSTEMS[name] || STYLE_SYSTEMS.default;
}

/**
 * List available style systems
 * @returns {string[]}
 */
export function listStyleSystems() {
  return Object.keys(STYLE_SYSTEMS);
}

/**
 * Register a custom style system
 * @param {string} name
 * @param {StyleSystem} styleSystem
 */
export function registerStyleSystem(name, styleSystem) {
  STYLE_SYSTEMS[name] = styleSystem;
}

export {
  BASE_STYLES,
  ILLUSTRATION_STYLES,
  getStyleForCategory,
  extractVisualConcept,
};
