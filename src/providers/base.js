/**
 * Base Image Provider Interface
 * All providers must implement this interface
 */

export class BaseImageProvider {
  constructor(config = {}) {
    this.config = config;
    this.name = 'base';
  }

  /**
   * Generate an image from a prompt
   * @param {string} prompt - The image generation prompt
   * @param {object} options - Generation options (dimensions, etc.)
   * @returns {Promise<Buffer>} - Raw image buffer
   */
  async generate(prompt, options = {}) {
    throw new Error('generate() must be implemented by provider');
  }

  /**
   * Check if the provider is available (API key set, etc.)
   * @returns {Promise<boolean>}
   */
  async isAvailable() {
    throw new Error('isAvailable() must be implemented by provider');
  }

  /**
   * Get provider capabilities
   * @returns {object}
   */
  getCapabilities() {
    return {
      maxWidth: 1024,
      maxHeight: 1024,
      supportedFormats: ['png'],
      supportsNegativePrompt: false,
      supportsStylePresets: false,
    };
  }
}
