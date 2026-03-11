/**
 * @nino-tools/image-gen
 * AI-powered image generation tool with style systems and optimization
 */

// Main exports
export { ImageGenerator, createGenerator } from './generator.js';
export { ImageAgent, createAgent } from './agent.js';

// Provider exports
export {
  createProvider,
  getBestProvider,
  OpenRouterProvider,
  HtmlProvider,
  AVAILABLE_MODELS,
} from './providers/index.js';

// Template engine
export {
  renderTemplate,
  renderTemplateFile,
  listTemplates,
  loadData,
} from './templates/engine.js';

// Style exports
export {
  getStyleSystem,
  listStyleSystems,
  registerStyleSystem,
  getStyleForCategory,
  extractVisualConcept,
  BASE_STYLES,
  ILLUSTRATION_STYLES,
} from './styles/index.js';

// Prompt building
export {
  buildPrompt,
  buildSimplePrompt,
  DEFAULT_TEMPLATE,
} from './prompt-builder.js';

// Utilities
export {
  optimizeBuffer,
  optimizeAndSave,
  getMetadata,
  batchOptimize,
  DEFAULT_OPTIONS,
  ProgressTracker,
} from './utils/index.js';
