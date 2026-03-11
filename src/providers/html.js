/**
 * HTML-to-PNG Provider
 * Renders HTML files to images using Playwright (headless Chromium)
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

export class HtmlProvider {
  constructor(config = {}) {
    this.config = config;
    this.name = 'html';
    this.browser = null;
  }

  async isAvailable() {
    return true;
  }

  /**
   * Launch browser (reused across renders)
   */
  async ensureBrowser() {
    if (!this.browser) {
      this.browser = await chromium.launch();
    }
    return this.browser;
  }

  /**
   * Detect viewport size from HTML content.
   * Looks for explicit width/height on body or a root container.
   */
  parseViewport(html) {
    // Match body width/height in CSS
    const widthMatch = html.match(/body\s*\{[^}]*width:\s*(\d+)px/s);
    const heightMatch = html.match(/body\s*\{[^}]*height:\s*(\d+)px/s);

    return {
      width: widthMatch ? parseInt(widthMatch[1]) : this.config.width || 1080,
      height: heightMatch ? parseInt(heightMatch[1]) : this.config.height || 1920,
    };
  }

  /**
   * Render a single HTML file to a PNG buffer
   * @param {string} htmlPath - Absolute path to HTML file
   * @param {object} options
   * @param {number} [options.width] - Override viewport width
   * @param {number} [options.height] - Override viewport height
   * @param {number} [options.deviceScaleFactor] - Pixel density (default 2 for retina)
   * @param {number} [options.waitMs] - Extra wait after load for fonts/animations
   * @returns {Promise<Buffer>} PNG buffer
   */
  async render(htmlPath, options = {}) {
    const absolutePath = path.resolve(htmlPath);
    const html = fs.readFileSync(absolutePath, 'utf-8');
    const viewport = this.parseViewport(html);

    const width = options.width || viewport.width;
    const height = options.height || viewport.height;
    const deviceScaleFactor = options.deviceScaleFactor ?? 2;

    const browser = await this.ensureBrowser();
    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor,
    });

    await page.goto(`file://${absolutePath}`, { waitUntil: 'networkidle' });

    // Extra wait for web fonts or animations
    if (options.waitMs) {
      await page.waitForTimeout(options.waitMs);
    }

    const buffer = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width, height },
    });

    await page.close();
    return buffer;
  }

  /**
   * Render an HTML string (not a file) to PNG
   * @param {string} htmlContent - Raw HTML string
   * @param {object} options
   * @returns {Promise<Buffer>}
   */
  async renderString(htmlContent, options = {}) {
    const viewport = this.parseViewport(htmlContent);
    const width = options.width || viewport.width;
    const height = options.height || viewport.height;
    const deviceScaleFactor = options.deviceScaleFactor ?? 2;

    const browser = await this.ensureBrowser();
    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor,
    });

    await page.setContent(htmlContent, { waitUntil: 'networkidle' });

    if (options.waitMs) {
      await page.waitForTimeout(options.waitMs);
    }

    const buffer = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width, height },
    });

    await page.close();
    return buffer;
  }

  /**
   * Close the browser when done
   */
  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
