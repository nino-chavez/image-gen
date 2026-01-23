/**
 * OpenRouter Image Provider
 * Supports multiple models via OpenRouter API (Gemini, Flux, DALL-E, etc.)
 */

import OpenAI from 'openai';
import { BaseImageProvider } from './base.js';

const MODELS = {
  'gemini-flash': 'google/gemini-2.5-flash-image',
  'gemini-pro': 'google/gemini-3-pro-image-preview',
  'flux-schnell': 'black-forest-labs/flux-schnell',
  'flux-pro': 'black-forest-labs/flux.2-pro',
  'flux-max': 'black-forest-labs/flux.2-max',
  'dall-e-3': 'openai/dall-e-3',
  'gpt-image': 'openai/gpt-5-image',
};

export class OpenRouterProvider extends BaseImageProvider {
  constructor(config = {}) {
    super(config);
    this.name = 'openrouter';
    this.apiKey = config.apiKey || process.env.OPENROUTER_API_KEY;
    this.model = MODELS[config.model] || config.model || MODELS['gemini-flash'];
    this.referer = config.referer || 'https://github.com/nino-tools/image-gen';
    this.siteName = config.siteName || 'Image Generator';

    if (this.apiKey) {
      this.client = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: this.apiKey,
        defaultHeaders: {
          'HTTP-Referer': this.referer,
          'X-Title': this.siteName,
        },
      });
    }
  }

  async isAvailable() {
    return !!this.apiKey;
  }

  getCapabilities() {
    return {
      maxWidth: 2048,
      maxHeight: 2048,
      supportedFormats: ['png', 'webp', 'jpeg'],
      supportsNegativePrompt: true,
      supportsStylePresets: false,
      models: Object.keys(MODELS),
    };
  }

  /**
   * Extract image data from various response formats
   */
  extractImageData(message) {
    // Format 1: message.images array (OpenRouter/Gemini format)
    if (message?.images && Array.isArray(message.images) && message.images.length > 0) {
      const imageData = message.images[0];

      // OpenRouter: { type: 'image_url', image_url: { url: 'data:image/png;base64,...' } }
      if (imageData?.image_url?.url) {
        return this.decodeBase64Url(imageData.image_url.url);
      }
      // Direct string
      if (typeof imageData === 'string') {
        return this.decodeBase64Url(imageData);
      }
      // Direct url property
      if (imageData?.url) {
        return this.decodeBase64Url(imageData.url);
      }
      // b64_json format
      if (imageData?.b64_json) {
        return Buffer.from(imageData.b64_json, 'base64');
      }
    }

    // Format 2: message.content array with image parts
    if (message?.content && Array.isArray(message.content)) {
      for (const part of message.content) {
        // image_url type
        if (part.type === 'image_url' && part.image_url?.url) {
          return this.decodeBase64Url(part.image_url.url);
        }
        // inline_data format (Gemini native)
        if (part.inline_data?.data) {
          return Buffer.from(part.inline_data.data, 'base64');
        }
      }
    }

    return null;
  }

  decodeBase64Url(url) {
    const base64Data = url.replace(/^data:image\/\w+;base64,/, '');
    return Buffer.from(base64Data, 'base64');
  }

  async generate(prompt, options = {}) {
    if (!this.client) {
      throw new Error('OpenRouter API key not configured');
    }

    const response = await this.client.chat.completions.create({
      model: this.model,
      modalities: ['text', 'image'],
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const message = response.choices?.[0]?.message;
    const imageBuffer = this.extractImageData(message);

    if (!imageBuffer) {
      const keys = Object.keys(message || {}).join(', ');
      throw new Error(`No image found in response. Message keys: ${keys}`);
    }

    return imageBuffer;
  }
}

export const AVAILABLE_MODELS = MODELS;
