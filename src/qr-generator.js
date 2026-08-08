/**
 * Styled QR Code Generator
 * Generates brand-styled QR codes with embedded logos for Signal X Studio
 *
 * Uses qr-code-styling with Node.js (JSDOM + canvas) for:
 * - Custom brand colors
 * - Embedded logo in center
 * - Rounded/dot module styles
 * - Gradient fills
 * - PNG and SVG output
 */

import QRCodeStylingModule from 'qr-code-styling/lib/qr-code-styling.common.js';
const QRCodeStyling = QRCodeStylingModule.QRCodeStyling || QRCodeStylingModule;
import { JSDOM } from 'jsdom';
import nodeCanvas from 'canvas';
import fs from 'fs';
import path from 'path';

/**
 * Brand presets for QR code styling
 */
const PRESETS = {
  'signalx': {
    name: 'Signal X Studio',
    dotsOptions: {
      color: '#6b88ff',
      type: 'rounded',
    },
    cornersSquareOptions: {
      color: '#8b5cf6',
      type: 'extra-rounded',
    },
    cornersDotOptions: {
      color: '#6366f1',
      type: 'dot',
    },
    backgroundOptions: {
      color: '#08080c',
    },
  },
  'signalx-light': {
    name: 'Signal X Studio (Light)',
    dotsOptions: {
      color: '#08080c',
      type: 'rounded',
    },
    cornersSquareOptions: {
      color: '#6366f1',
      type: 'extra-rounded',
    },
    cornersDotOptions: {
      color: '#8b5cf6',
      type: 'dot',
    },
    backgroundOptions: {
      color: '#f0f0f5',
    },
  },
  'nino': {
    name: 'Nino Chavez',
    dotsOptions: {
      color: '#a3e635',
      type: 'dots',
    },
    cornersSquareOptions: {
      color: '#a3e635',
      type: 'extra-rounded',
    },
    cornersDotOptions: {
      color: '#ffffff',
      type: 'dot',
    },
    backgroundOptions: {
      color: '#000000',
    },
  },
  'signalx-gradient': {
    name: 'Signal X Studio (Gradient)',
    dotsOptions: {
      type: 'rounded',
      gradient: {
        type: 'linear',
        rotation: Math.PI / 4,
        colorStops: [
          { offset: 0, color: '#6366f1' },
          { offset: 1, color: '#a855f7' },
        ],
      },
    },
    cornersSquareOptions: {
      type: 'extra-rounded',
      gradient: {
        type: 'linear',
        rotation: Math.PI / 4,
        colorStops: [
          { offset: 0, color: '#6366f1' },
          { offset: 1, color: '#8b5cf6' },
        ],
      },
    },
    cornersDotOptions: {
      color: '#6b88ff',
      type: 'dot',
    },
    backgroundOptions: {
      color: '#08080c',
    },
  },
  'nino-gradient': {
    name: 'Nino Chavez (Gradient)',
    dotsOptions: {
      type: 'dots',
      gradient: {
        type: 'linear',
        rotation: Math.PI / 4,
        colorStops: [
          { offset: 0, color: '#a3e635' },
          { offset: 1, color: '#22d3ee' },
        ],
      },
    },
    cornersSquareOptions: {
      type: 'extra-rounded',
      color: '#a3e635',
    },
    cornersDotOptions: {
      color: '#ffffff',
      type: 'dot',
    },
    backgroundOptions: {
      color: '#000000',
    },
  },
};

/**
 * Generate a styled QR code
 * @param {object} options
 * @param {string} options.data - URL or text to encode
 * @param {string} options.output - Output file path
 * @param {string} [options.preset] - Brand preset name
 * @param {string} [options.logo] - Path to logo image (embedded in center)
 * @param {number} [options.size] - QR code size in pixels (default: 1000)
 * @param {string} [options.format] - Output format: 'png' or 'svg' (default: 'png')
 * @param {number} [options.logoMargin] - Margin around embedded logo (default: 10)
 * @param {number} [options.logoSize] - Logo size as fraction of QR (default: 0.25)
 * @param {number} [options.margin] - QR code margin (default: 20)
 * @returns {Promise<{path: string, sizeKB: number}>}
 */
export async function generateStyledQR(options) {
  const {
    data,
    output,
    preset = 'signalx',
    logo,
    size = 1000,
    format = 'png',
    logoMargin = 10,
    logoSize = 0.25,
    margin = 20,
  } = options;

  const presetConfig = PRESETS[preset];
  if (!presetConfig) {
    throw new Error(`Unknown preset: ${preset}. Available: ${Object.keys(PRESETS).join(', ')}`);
  }

  // Load logo as data URL if provided
  let logoDataUrl;
  if (logo) {
    const logoPath = path.resolve(logo);
    if (!fs.existsSync(logoPath)) {
      throw new Error(`Logo file not found: ${logoPath}`);
    }
    const logoBuffer = fs.readFileSync(logoPath);
    const ext = path.extname(logoPath).toLowerCase();
    const mime = ext === '.svg' ? 'image/svg+xml' : ext === '.png' ? 'image/png' : 'image/jpeg';
    logoDataUrl = `data:${mime};base64,${logoBuffer.toString('base64')}`;
  }

  const qrOptions = {
    width: size,
    height: size,
    type: format === 'svg' ? 'svg' : 'canvas',
    data,
    margin,
    qrOptions: {
      errorCorrectionLevel: 'H', // High error correction for logo overlay
    },
    ...presetConfig,
  };

  // Add logo if provided
  if (logoDataUrl) {
    qrOptions.image = logoDataUrl;
    qrOptions.imageOptions = {
      saveAsBlob: true,
      crossOrigin: 'anonymous',
      hideBackgroundDots: true,
      imageSize: logoSize,
      margin: logoMargin,
    };
  }

  // Create QR code instance
  const qrCode = new QRCodeStyling({
    jsdom: JSDOM,
    nodeCanvas,
    ...qrOptions,
  });

  // Generate and save
  const buffer = await qrCode.getRawData(format === 'svg' ? 'svg' : 'png');

  const outPath = path.resolve(output);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buffer);

  const stats = fs.statSync(outPath);
  return {
    path: outPath,
    sizeKB: Math.round(stats.size / 1024),
  };
}

/**
 * List available presets
 * @returns {Array<{name: string, key: string}>}
 */
export function listPresets() {
  return Object.entries(PRESETS).map(([key, config]) => ({
    key,
    name: config.name,
  }));
}
