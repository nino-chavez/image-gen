/**
 * Style System Registry
 */

import { BASE_STYLES, getStyleForCategory, extractVisualConcept } from './base.js';
import { ILLUSTRATION_STYLES } from './illustration.js';
import { LETS_PEPPER_STYLES } from './lets-pepper.js';
import { SIGNAL_DISPATCH_STYLES } from './signal-dispatch.js';
import { VOLLEY_RX_STYLES } from './volley-rx.js';

const STYLE_SYSTEMS = {
  default: BASE_STYLES,
  illustration: ILLUSTRATION_STYLES,
  'lets-pepper': LETS_PEPPER_STYLES,
  'signal-dispatch': SIGNAL_DISPATCH_STYLES,
  'volley-rx': VOLLEY_RX_STYLES,
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
  LETS_PEPPER_STYLES,
  VOLLEY_RX_STYLES,
  getStyleForCategory,
  extractVisualConcept,
};
