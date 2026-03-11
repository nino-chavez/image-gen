#!/usr/bin/env node
/**
 * Test Suite for @nino-tools/image-gen
 */

import {
  getStyleSystem,
  listStyleSystems,
  getStyleForCategory,
  extractVisualConcept,
  buildPrompt,
  buildSimplePrompt,
  ProgressTracker,
  optimizeBuffer,
  HtmlProvider,
  renderTemplate,
  renderTemplateFile,
  listTemplates,
} from '../src/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tests = [];
let passed = 0;
let failed = 0;

function test(name, fn) {
  tests.push({ name, fn });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

// ── Style System Tests ──────────────────────────────────────────

test('listStyleSystems returns all systems', () => {
  const systems = listStyleSystems();
  assert(systems.includes('default'), 'Should include default');
  assert(systems.includes('illustration'), 'Should include illustration');
  assert(systems.includes('lets-pepper'), 'Should include lets-pepper');
  assert(systems.includes('signal-dispatch'), 'Should include signal-dispatch');
  assert(systems.includes('volley-rx'), 'Should include volley-rx');
});

test('getStyleSystem returns valid system', () => {
  const system = getStyleSystem('illustration');
  assertEqual(system.name, 'illustration');
  assert(system.styles, 'Should have styles');
  assert(system.default, 'Should have default style');
  assert(system.conceptMap, 'Should have concept map');
});

test('getStyleSystem returns default for unknown', () => {
  const system = getStyleSystem('nonexistent');
  assertEqual(system.name, 'default');
});

test('getStyleForCategory finds matching style', () => {
  const system = getStyleSystem('illustration');
  const style = getStyleForCategory(system, 'AI & Automation');
  assert(style.lineColor.includes('cyan'), 'AI style should have cyan');
});

test('getStyleForCategory returns default for unknown', () => {
  const system = getStyleSystem('illustration');
  const style = getStyleForCategory(system, 'Unknown Category');
  assert(style === system.default, 'Should return default style');
});

test('extractVisualConcept maps keywords', () => {
  const system = getStyleSystem('illustration');
  const concept = extractVisualConcept(system, 'Building AI Agents');
  assert(concept.includes('robot') || concept.includes('agent'), 'Should find AI concept');
});

test('extractVisualConcept returns default for no match', () => {
  const system = getStyleSystem('illustration');
  const concept = extractVisualConcept(system, 'xyzzy blorp');
  assert(concept.includes('abstract'), 'Should return default concept');
});

// ── Lets Pepper Style Tests ─────────────────────────────────────

test('lets-pepper has pepper variety styles', () => {
  const system = getStyleSystem('lets-pepper');
  assert(system.styles['Bell Pepper'], 'Should have Bell Pepper');
  assert(system.styles['Ghost Pepper'], 'Should have Ghost Pepper');
  assert(system.styles['Carolina Reaper'], 'Should have Carolina Reaper');
});

test('lets-pepper has basePrompt', () => {
  const system = getStyleSystem('lets-pepper');
  assert(system.basePrompt, 'Should have basePrompt');
  assert(system.basePrompt.includes('CARTOON MASCOT'), 'basePrompt should mention mascot');
});

test('lets-pepper conceptMap covers volleyball actions', () => {
  const system = getStyleSystem('lets-pepper');
  assert(system.conceptMap['spike'], 'Should map spike');
  assert(system.conceptMap['dig'], 'Should map dig');
  assert(system.conceptMap['serve'], 'Should map serve');
});

// ── Prompt Builder Tests ────────────────────────────────────────

test('buildPrompt generates valid prompt', () => {
  const system = getStyleSystem('illustration');
  const prompt = buildPrompt({
    title: 'Test Title',
    excerpt: 'Test excerpt',
    category: 'Leadership',
    styleSystem: system,
  });

  assert(prompt.includes('Test Title'), 'Should include title');
  assert(prompt.includes('1200x675'), 'Should include dimensions');
  assert(prompt.includes('gold') || prompt.includes('Gold'), 'Should include leadership style');
});

test('buildPrompt accepts custom dimensions', () => {
  const system = getStyleSystem('illustration');
  const prompt = buildPrompt({
    title: 'Test',
    styleSystem: system,
    width: 1080,
    height: 1920,
  });
  assert(prompt.includes('1080x1920'), 'Should use custom dimensions');
});

test('buildSimplePrompt generates prompt', () => {
  const prompt = buildSimplePrompt('A lighthouse at night');
  assert(prompt.includes('lighthouse'), 'Should include description');
  assert(prompt.includes('1200x675'), 'Should include dimensions');
});

// ── Progress Tracker Tests ──────────────────────────────────────

test('ProgressTracker tracks completed items', () => {
  const testFile = '/tmp/test-progress-1.json';
  if (fs.existsSync(testFile)) fs.unlinkSync(testFile);

  const tracker = new ProgressTracker(testFile);
  assertEqual(tracker.getStats().completed, 0);

  tracker.markCompleted('item1', { test: true });
  assert(tracker.isCompleted('item1'), 'Should mark completed');
  assertEqual(tracker.getStats().completed, 1);

  fs.unlinkSync(testFile);
});

test('ProgressTracker tracks failed items', () => {
  const testFile = '/tmp/test-progress-2.json';
  if (fs.existsSync(testFile)) fs.unlinkSync(testFile);

  const tracker = new ProgressTracker(testFile);
  tracker.markFailed('item1', 'Test error');
  assertEqual(tracker.getStats().failed, 1);

  fs.unlinkSync(testFile);
});

test('ProgressTracker shouldProcess filters correctly', () => {
  const testFile = '/tmp/test-progress-3.json';
  if (fs.existsSync(testFile)) fs.unlinkSync(testFile);

  const tracker = new ProgressTracker(testFile);
  tracker.markCompleted('done');
  tracker.markSkipped('skip', 'reason');

  assert(!tracker.shouldProcess('done'), 'Should not reprocess completed');
  assert(tracker.shouldProcess('new'), 'Should process new item');

  fs.unlinkSync(testFile);
});

test('ProgressTracker getRemaining filters list', () => {
  const testFile = '/tmp/test-progress-4.json';
  if (fs.existsSync(testFile)) fs.unlinkSync(testFile);

  const tracker = new ProgressTracker(testFile);
  tracker.markCompleted('a');
  tracker.markSkipped('b', 'reason');

  const remaining = tracker.getRemaining(['a', 'b', 'c', 'd']);
  assertEqual(remaining.length, 2);
  assert(remaining.includes('c'), 'Should include c');
  assert(remaining.includes('d'), 'Should include d');

  fs.unlinkSync(testFile);
});

// ── Image Optimizer Tests ───────────────────────────────────────

test('optimizeBuffer converts format', async () => {
  const sharp = (await import('sharp')).default;
  const input = await sharp({
    create: { width: 10, height: 10, channels: 3, background: { r: 255, g: 0, b: 0 } },
  }).png().toBuffer();

  const result = await optimizeBuffer(input, {
    width: null,
    height: null,
    format: 'webp',
    quality: 80,
  });

  assert(result.buffer.length > 0, 'Should produce output');
  assertEqual(result.info.format, 'webp');
});

test('optimizeBuffer resizes when dimensions given', async () => {
  const sharp = (await import('sharp')).default;
  const input = await sharp({
    create: { width: 100, height: 100, channels: 3, background: { r: 0, g: 0, b: 255 } },
  }).png().toBuffer();

  const result = await optimizeBuffer(input, {
    width: 50,
    height: 50,
    format: 'png',
  });

  assertEqual(result.info.width, 50);
  assertEqual(result.info.height, 50);
});

test('optimizeBuffer skips resize when null', async () => {
  const sharp = (await import('sharp')).default;
  const input = await sharp({
    create: { width: 100, height: 100, channels: 3, background: { r: 0, g: 255, b: 0 } },
  }).png().toBuffer();

  const result = await optimizeBuffer(input, {
    width: null,
    height: null,
    format: 'png',
  });

  assertEqual(result.info.width, 100);
  assertEqual(result.info.height, 100);
});

// ── Template Engine Tests ───────────────────────────────────────

test('renderTemplate interpolates variables', () => {
  const result = renderTemplate('<h1>{{title}}</h1>', { title: 'Hello' });
  assertEqual(result, '<h1>Hello</h1>');
});

test('renderTemplate escapes HTML by default', () => {
  const result = renderTemplate('<p>{{text}}</p>', { text: '<script>alert(1)</script>' });
  assert(result.includes('&lt;script&gt;'), 'Should escape HTML');
  assert(!result.includes('<script>'), 'Should not contain raw script tag');
});

test('renderTemplate raw triple braces skip escaping', () => {
  const result = renderTemplate('<div>{{{html}}}</div>', { html: '<b>bold</b>' });
  assert(result.includes('<b>bold</b>'), 'Should contain raw HTML');
});

test('renderTemplate handles conditionals', () => {
  const tmpl = '{{#if show}}visible{{/if}}{{#unless show}}hidden{{/unless}}';
  assertEqual(renderTemplate(tmpl, { show: true }), 'visible');
  assertEqual(renderTemplate(tmpl, { show: false }), 'hidden');
  assertEqual(renderTemplate(tmpl, {}), 'hidden');
});

test('renderTemplate handles each loops', () => {
  const tmpl = '{{#each items}}<li>{{this}}</li>{{/each}}';
  const result = renderTemplate(tmpl, { items: ['a', 'b', 'c'] });
  assertEqual(result, '<li>a</li><li>b</li><li>c</li>');
});

test('renderTemplate handles object loops', () => {
  const tmpl = '{{#each people}}{{name}}-{{/each}}';
  const result = renderTemplate(tmpl, { people: [{ name: 'Alice' }, { name: 'Bob' }] });
  assertEqual(result, 'Alice-Bob-');
});

test('renderTemplate handles nested values', () => {
  const result = renderTemplate('{{user.name}}', { user: { name: 'Nino' } });
  assertEqual(result, 'Nino');
});

test('renderTemplate handles missing values gracefully', () => {
  const result = renderTemplate('Hello {{name}}!', {});
  assertEqual(result, 'Hello !');
});

test('listTemplates finds all brand templates', () => {
  const templatesDir = path.join(__dirname, '..', 'templates');
  const templates = listTemplates(templatesDir);
  assert(templates.length >= 5, `Should find at least 5 templates, got ${templates.length}`);
  assert(templates.some((t) => t.name.includes('story-cover')), 'Should find lets-pepper/story-cover');
  assert(templates.some((t) => t.name.includes('post-header')), 'Should find signal-dispatch/post-header');
  assert(templates.some((t) => t.name.includes('social-card')), 'Should find signal-dispatch/social-card');
  assert(templates.some((t) => t.name.includes('event-poster')), 'Should find volley-rx/event-poster');
  assert(templates.some((t) => t.name.includes('results-card')), 'Should find volley-rx/results-card');
});

test('renderTemplateFile renders a file', () => {
  const templatePath = path.join(__dirname, '..', 'templates', 'lets-pepper', 'story-cover.html');
  const result = renderTemplateFile(templatePath, {
    label: 'Test',
    titleLine1: 'Hello',
    titleLine2: 'World',
    subtitle: 'A test',
  });
  assert(result.includes('Hello'), 'Should contain interpolated title');
  assert(result.includes('A test'), 'Should contain subtitle');
});

// ── HTML Provider Tests ─────────────────────────────────────────

test('HtmlProvider parseViewport detects dimensions', () => {
  const provider = new HtmlProvider();
  const html = 'body { width: 1080px; height: 1920px; }';
  const viewport = provider.parseViewport(html);
  assertEqual(viewport.width, 1080);
  assertEqual(viewport.height, 1920);
});

test('HtmlProvider parseViewport uses defaults', () => {
  const provider = new HtmlProvider();
  const viewport = provider.parseViewport('<html><body>hi</body></html>');
  assertEqual(viewport.width, 1080);
  assertEqual(viewport.height, 1920);
});

test('HtmlProvider renderString produces a buffer', async () => {
  const provider = new HtmlProvider();
  try {
    const html = `<!DOCTYPE html><html><head></head><body style="width:100px;height:100px;background:red;margin:0;"></body></html>`;
    const buffer = await provider.renderString(html, {
      width: 100,
      height: 100,
      deviceScaleFactor: 1,
    });
    assert(Buffer.isBuffer(buffer), 'Should return a Buffer');
    assert(buffer.length > 100, 'Buffer should have meaningful size');
  } finally {
    await provider.close();
  }
});

test('HtmlProvider renders a file to PNG', async () => {
  const provider = new HtmlProvider();
  const testHtml = path.join('/tmp', 'test-render-provider.html');
  fs.writeFileSync(testHtml, `<!DOCTYPE html><html><head></head>
    <body style="width:200px;height:200px;background:blue;margin:0;">
      <h1 style="color:white;padding:20px;">Test</h1>
    </body></html>`);

  try {
    const buffer = await provider.render(testHtml, {
      width: 200,
      height: 200,
      deviceScaleFactor: 1,
    });
    assert(Buffer.isBuffer(buffer), 'Should return a Buffer');
    assert(buffer[0] === 0x89 && buffer[1] === 0x50, 'Should be a valid PNG');
  } finally {
    await provider.close();
    fs.unlinkSync(testHtml);
  }
});

// ── CLI Smoke Tests ─────────────────────────────────────────────

test('CLI --help exits cleanly', async () => {
  const { execSync } = await import('child_process');
  const output = execSync('node src/cli.js --help', { cwd: path.join(__dirname, '..') }).toString();
  assert(output.includes('image-gen'), 'Should show program name');
  assert(output.includes('generate'), 'Should list generate command');
  assert(output.includes('render'), 'Should list render command');
  assert(output.includes('template'), 'Should list template command');
  assert(output.includes('watch'), 'Should list watch command');
});

test('CLI styles command lists systems', async () => {
  const { execSync } = await import('child_process');
  const output = execSync('node src/cli.js styles', { cwd: path.join(__dirname, '..') }).toString();
  assert(output.includes('illustration'), 'Should list illustration');
  assert(output.includes('lets-pepper'), 'Should list lets-pepper');
});

test('CLI models command lists models', async () => {
  const { execSync } = await import('child_process');
  const output = execSync('node src/cli.js models', { cwd: path.join(__dirname, '..') }).toString();
  assert(output.includes('gemini-flash'), 'Should list gemini-flash');
  assert(output.includes('dall-e-3'), 'Should list dall-e-3');
});

// ── Run ─────────────────────────────────────────────────────────

async function runTests() {
  console.log('\n  @nino-tools/image-gen test suite\n');

  for (const { name, fn } of tests) {
    try {
      await fn();
      passed++;
      console.log(`  \x1b[32m+\x1b[0m ${name}`);
    } catch (error) {
      failed++;
      console.log(`  \x1b[31mx\x1b[0m ${name}`);
      console.log(`    \x1b[2m${error.message}\x1b[0m`);
    }
  }

  console.log(`\n  ${passed} passed, ${failed} failed\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
