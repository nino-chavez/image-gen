/**
 * Image Generator
 * Main orchestration class for AI image generation
 */

import { getBestProvider, createProvider } from './providers/index.js';
import { getStyleSystem } from './styles/index.js';
import { buildPrompt, buildSimplePrompt } from './prompt-builder.js';
import { optimizeAndSave, optimizeBuffer } from './utils/optimizer.js';
import { ProgressTracker } from './utils/progress.js';

/**
 * Main image generator class
 */
export class ImageGenerator {
  constructor(options = {}) {
    this.options = {
      provider: 'openrouter',
      model: 'gemini-flash',
      styleSystem: 'illustration',
      width: 1200,
      height: 675,
      format: 'webp',
      quality: 85,
      rateLimitMs: 2000,
      ...options,
    };

    this.provider = null;
    this.styleSystem = null;
    this.progressTracker = null;
  }

  /**
   * Initialize the generator
   */
  async init() {
    // Initialize provider
    if (this.options.provider === 'auto') {
      this.provider = await getBestProvider(this.options);
      if (!this.provider) {
        throw new Error('No image provider available. Set OPENROUTER_API_KEY.');
      }
    } else {
      this.provider = createProvider(this.options.provider, this.options);
      if (!(await this.provider.isAvailable())) {
        throw new Error(`Provider ${this.options.provider} is not available.`);
      }
    }

    // Load style system
    this.styleSystem = getStyleSystem(this.options.styleSystem);

    // Initialize progress tracker if path provided
    if (this.options.progressFile) {
      this.progressTracker = new ProgressTracker(this.options.progressFile);
    }

    return this;
  }

  /**
   * Generate an image from a content item
   * @param {object} content
   * @param {string} content.title - Content title
   * @param {string} [content.excerpt] - Content description
   * @param {string} [content.category] - Content category
   * @param {string} [content.id] - Unique identifier for progress tracking
   * @param {string} [outputPath] - Path to save the image
   * @returns {Promise<object>}
   */
  async generateFromContent(content, outputPath) {
    const { title, excerpt, category, id } = content;

    // Check progress
    if (this.progressTracker && id && this.progressTracker.isCompleted(id)) {
      return { skipped: true, reason: 'already completed' };
    }

    // Build prompt
    const prompt = buildPrompt({
      title,
      excerpt,
      category,
      styleSystem: this.styleSystem,
      width: this.options.width,
      height: this.options.height,
    });

    try {
      // Generate
      const rawBuffer = await this.provider.generate(prompt);

      // Optimize and save
      let result;
      if (outputPath) {
        result = await optimizeAndSave(rawBuffer, outputPath, {
          width: this.options.width,
          height: this.options.height,
          format: this.options.format,
          quality: this.options.quality,
        });
      } else {
        const optimized = await optimizeBuffer(rawBuffer, {
          width: this.options.width,
          height: this.options.height,
          format: this.options.format,
          quality: this.options.quality,
        });
        result = { buffer: optimized.buffer, ...optimized.info };
      }

      // Track progress
      if (this.progressTracker && id) {
        this.progressTracker.markCompleted(id, {
          path: outputPath,
          sizeKB: result.sizeKB,
          generatedAt: new Date().toISOString(),
        });
      }

      return { success: true, ...result };
    } catch (error) {
      if (this.progressTracker && id) {
        this.progressTracker.markFailed(id, error.message);
      }
      throw error;
    }
  }

  /**
   * Generate an image from a simple description
   * @param {string} description
   * @param {string} [outputPath]
   * @returns {Promise<object>}
   */
  async generateFromDescription(description, outputPath) {
    const prompt = buildSimplePrompt(description, {
      width: this.options.width,
      height: this.options.height,
    });

    const rawBuffer = await this.provider.generate(prompt);

    if (outputPath) {
      return optimizeAndSave(rawBuffer, outputPath, {
        width: this.options.width,
        height: this.options.height,
        format: this.options.format,
        quality: this.options.quality,
      });
    }

    const optimized = await optimizeBuffer(rawBuffer, {
      width: this.options.width,
      height: this.options.height,
      format: this.options.format,
      quality: this.options.quality,
    });

    return { buffer: optimized.buffer, ...optimized.info };
  }

  /**
   * Generate images for multiple content items
   * @param {Array<object>} items - Content items
   * @param {function} getOutputPath - Function to get output path from item
   * @param {object} callbacks - Progress callbacks
   * @returns {Promise<object>}
   */
  async generateBatch(items, getOutputPath, callbacks = {}) {
    const { onProgress, onError, onComplete } = callbacks;
    const results = {
      success: [],
      failed: [],
      skipped: [],
    };

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const outputPath = getOutputPath(item);

      try {
        const result = await this.generateFromContent(item, outputPath);

        if (result.skipped) {
          results.skipped.push({ item, reason: result.reason });
        } else {
          results.success.push({ item, result });
        }

        if (onProgress) {
          onProgress({
            current: i + 1,
            total: items.length,
            item,
            result,
          });
        }
      } catch (error) {
        results.failed.push({ item, error: error.message });

        if (onError) {
          onError({ item, error });
        }
      }

      // Rate limiting
      if (i < items.length - 1) {
        await this.sleep(this.options.rateLimitMs);
      }
    }

    if (onComplete) {
      onComplete(results);
    }

    return results;
  }

  /**
   * Get progress statistics
   * @returns {object|null}
   */
  getProgress() {
    return this.progressTracker?.getStats() || null;
  }

  /**
   * Reset progress tracking
   */
  resetProgress() {
    this.progressTracker?.reset();
  }

  /**
   * Sleep utility
   * @param {number} ms
   */
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Create and initialize a generator
 * @param {object} options
 * @returns {Promise<ImageGenerator>}
 */
export async function createGenerator(options) {
  const generator = new ImageGenerator(options);
  await generator.init();
  return generator;
}
