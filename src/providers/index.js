/**
 * Provider Registry
 * Central management of image generation providers
 */

import { OpenRouterProvider, AVAILABLE_MODELS } from './openrouter.js';

const PROVIDERS = {
  openrouter: OpenRouterProvider,
};

/**
 * Create a provider instance
 * @param {string} name - Provider name
 * @param {object} config - Provider configuration
 * @returns {BaseImageProvider}
 */
export function createProvider(name, config = {}) {
  const Provider = PROVIDERS[name];
  if (!Provider) {
    const available = Object.keys(PROVIDERS).join(', ');
    throw new Error(`Unknown provider: ${name}. Available: ${available}`);
  }
  return new Provider(config);
}

/**
 * Get the best available provider
 * @param {object} config - Provider configuration
 * @returns {Promise<BaseImageProvider|null>}
 */
export async function getBestProvider(config = {}) {
  // Priority order
  const priority = ['openrouter'];

  for (const name of priority) {
    const provider = createProvider(name, config);
    if (await provider.isAvailable()) {
      return provider;
    }
  }

  return null;
}

export { OpenRouterProvider, AVAILABLE_MODELS };
