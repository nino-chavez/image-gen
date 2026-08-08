/**
 * HTML-to-PNG Provider
 * Renders HTML files to images using Playwright (headless Chromium)
 */

import { chromium } from 'playwright';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

/** Prefix for the temp file renderString writes beside a template. */
export const TEMP_RENDER_PREFIX = '.image-gen-render-';

export class HtmlProvider {
  constructor(config = {}) {
    this.config = config;
    this.name = 'html';
    this.browser = null;
    this.browserPromise = null;
  }

  async isAvailable() {
    return true;
  }

  /**
   * Launch browser (reused across renders)
   */
  async ensureBrowser() {
    // Memoize the launch promise, not the resolved browser. Two concurrent
    // renders both saw `!this.browser`, both launched Chromium, and the second
    // assignment orphaned the first — which then kept the process alive after
    // close(), because nothing held a reference to shut it down.
    if (!this.browserPromise) {
      this.browserPromise = chromium.launch();
    }
    this.browser = await this.browserPromise;
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
   * @param {boolean} [options.transparent] - Omit background for transparent PNG (DTF transfers)
   * @returns {Promise<Buffer>} PNG buffer
   */
  async render(htmlPath, options = {}) {
    const absolutePath = path.resolve(htmlPath);
    const html = fs.readFileSync(absolutePath, 'utf-8');

    return this.#screenshot(html, options, async (page) => {
      await page.goto(`file://${absolutePath}`, { waitUntil: 'networkidle' });
    });
  }

  /**
   * Render an HTML string (not a file) to PNG.
   *
   * When `baseDir` is given, the content is written to a temporary file inside
   * that directory and loaded over file://. A <base> tag cannot do this job:
   * setContent leaves the document on about:blank, and Chromium refuses to load
   * file-scheme subresources into a non-file origin — the image silently renders
   * blank and networkidle still resolves, so nothing surfaces the failure.
   *
   * @param {string} htmlContent - Raw HTML string
   * @param {object} options
   * @param {string} [options.baseDir] - Directory that relative src/href resolve against
   * @param {boolean} [options.transparent] - Omit background for transparent PNG (DTF transfers)
   * @returns {Promise<Buffer>}
   */
  async renderString(htmlContent, options = {}) {
    if (!options.baseDir) {
      return this.#screenshot(htmlContent, options, async (page, content) => {
        await page.setContent(content, { waitUntil: 'networkidle' });
      });
    }

    // randomUUID, not pid+timestamp: pid is constant within a process and
    // Date.now() has millisecond granularity, so two concurrent renderString
    // calls through one provider compute the same path — the second overwrites
    // the first's markup, and whichever finally runs first deletes the file the
    // other page is still loading.
    const tempPath = path.join(
      path.resolve(options.baseDir),
      `${TEMP_RENDER_PREFIX}${randomUUID()}.html`
    );
    fs.writeFileSync(tempPath, htmlContent, 'utf-8');
    try {
      return await this.#screenshot(htmlContent, options, async (page) => {
        await page.goto(`file://${tempPath}`, { waitUntil: 'networkidle' });
      });
    } finally {
      fs.rmSync(tempPath, { force: true });
    }
  }

  /**
   * Shared page setup, wait, and capture. `load` puts the content on the page.
   *
   * Reports subresources that failed to load. A missing image or font renders as
   * a silent gap — `networkidle` resolves either way — so without this a broken
   * asset path looks exactly like a successful render.
   */
  async #screenshot(htmlContent, options, load) {
    const viewport = this.parseViewport(htmlContent);
    const width = options.width || viewport.width;
    const height = options.height || viewport.height;
    const deviceScaleFactor = options.deviceScaleFactor ?? 2;

    const browser = await this.ensureBrowser();
    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor,
    });

    const missing = [];
    page.on('requestfailed', (request) => missing.push(request.url()));
    page.on('response', (response) => {
      if (response.status() >= 400) missing.push(`${response.url()} (${response.status()})`);
    });

    try {
      await load(page, htmlContent);

      if (options.waitMs) {
        await page.waitForTimeout(options.waitMs);
      }

      if (missing.length > 0 && options.reportMissing !== false) {
        console.warn(`Rendered with ${missing.length} asset(s) that failed to load:`);
        for (const url of missing) console.warn(`  ${url}`);
      }

      return await page.screenshot({
        type: 'png',
        clip: { x: 0, y: 0, width, height },
        omitBackground: options.transparent ?? false,
      });
    } finally {
      await page.close();
    }
  }

  /**
   * Close the browser when done
   */
  async close() {
    // Await the in-flight launch first, so a close() racing a start still has a
    // browser to shut down rather than leaving one running.
    const pending = this.browserPromise;
    this.browserPromise = null;
    const browser = this.browser || (pending ? await pending : null);
    this.browser = null;
    if (browser) await browser.close();
  }
}
