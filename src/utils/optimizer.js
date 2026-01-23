/**
 * Image Optimization Utilities
 * Handles resizing, format conversion, and compression
 */

import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

/**
 * Default optimization settings
 */
export const DEFAULT_OPTIONS = {
  width: 1200,
  height: 675,
  format: 'webp',
  quality: 85,
  fit: 'cover',
  position: 'center',
};

/**
 * Format-specific options
 */
const FORMAT_OPTIONS = {
  webp: (quality) => ({ quality, effort: 6 }),
  jpeg: (quality) => ({ quality, mozjpeg: true }),
  png: () => ({ compressionLevel: 9 }),
  avif: (quality) => ({ quality, effort: 6 }),
};

/**
 * Optimize an image buffer
 * @param {Buffer} inputBuffer - Raw image data
 * @param {object} options - Optimization options
 * @returns {Promise<{buffer: Buffer, info: object}>}
 */
export async function optimizeBuffer(inputBuffer, options = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  let pipeline = sharp(inputBuffer);

  // Resize
  if (opts.width || opts.height) {
    pipeline = pipeline.resize(opts.width, opts.height, {
      fit: opts.fit,
      position: opts.position,
    });
  }

  // Format conversion
  const formatOpts = FORMAT_OPTIONS[opts.format];
  if (formatOpts) {
    pipeline = pipeline[opts.format](formatOpts(opts.quality));
  }

  const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });

  return {
    buffer: data,
    info: {
      width: info.width,
      height: info.height,
      format: info.format,
      size: data.length,
      sizeKB: Math.round(data.length / 1024),
    },
  };
}

/**
 * Optimize and save an image
 * @param {Buffer} inputBuffer - Raw image data
 * @param {string} outputPath - Path to save the optimized image
 * @param {object} options - Optimization options
 * @returns {Promise<object>}
 */
export async function optimizeAndSave(inputBuffer, outputPath, options = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // Ensure output directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Infer format from extension if not specified
  if (!options.format) {
    const ext = path.extname(outputPath).slice(1).toLowerCase();
    if (['webp', 'jpeg', 'jpg', 'png', 'avif'].includes(ext)) {
      opts.format = ext === 'jpg' ? 'jpeg' : ext;
    }
  }

  let pipeline = sharp(inputBuffer);

  // Resize
  if (opts.width || opts.height) {
    pipeline = pipeline.resize(opts.width, opts.height, {
      fit: opts.fit,
      position: opts.position,
    });
  }

  // Format conversion
  const formatOpts = FORMAT_OPTIONS[opts.format];
  if (formatOpts) {
    pipeline = pipeline[opts.format](formatOpts(opts.quality));
  }

  const info = await pipeline.toFile(outputPath);

  return {
    path: outputPath,
    width: info.width,
    height: info.height,
    format: info.format,
    size: info.size,
    sizeKB: Math.round(info.size / 1024),
  };
}

/**
 * Get image metadata without processing
 * @param {Buffer|string} input - Buffer or file path
 * @returns {Promise<object>}
 */
export async function getMetadata(input) {
  const pipeline = typeof input === 'string' ? sharp(input) : sharp(input);
  return pipeline.metadata();
}

/**
 * Batch optimize multiple images
 * @param {Array<{input: Buffer, output: string}>} items
 * @param {object} options
 * @param {function} onProgress - Progress callback
 * @returns {Promise<Array<object>>}
 */
export async function batchOptimize(items, options = {}, onProgress) {
  const results = [];

  for (let i = 0; i < items.length; i++) {
    const { input, output } = items[i];
    const result = await optimizeAndSave(input, output, options);
    results.push(result);

    if (onProgress) {
      onProgress({
        current: i + 1,
        total: items.length,
        result,
      });
    }
  }

  return results;
}
