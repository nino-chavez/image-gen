#!/usr/bin/env node
/**
 * Basic Test Suite for @nino-tools/image-gen
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
} from '../src/index.js';
import fs from 'fs';
import path from 'path';

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

// Style System Tests
test('listStyleSystems returns available systems', () => {
  const systems = listStyleSystems();
  assert(systems.includes('default'), 'Should include default');
  assert(systems.includes('illustration'), 'Should include illustration');
});

test('getStyleSystem returns valid system', () => {
  const system = getStyleSystem('illustration');
  assert(system.name === 'illustration', 'Name should match');
  assert(system.styles, 'Should have styles');
  assert(system.default, 'Should have default style');
  assert(system.conceptMap, 'Should have concept map');
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

// Prompt Builder Tests
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

test('buildSimplePrompt generates prompt', () => {
  const prompt = buildSimplePrompt('A lighthouse at night');
  assert(prompt.includes('lighthouse'), 'Should include description');
  assert(prompt.includes('1200x675'), 'Should include dimensions');
});

// Progress Tracker Tests
test('ProgressTracker tracks progress', () => {
  const testFile = '/tmp/test-progress.json';
  if (fs.existsSync(testFile)) fs.unlinkSync(testFile);

  const tracker = new ProgressTracker(testFile);
  assert(tracker.getStats().completed === 0, 'Should start empty');

  tracker.markCompleted('item1', { test: true });
  assert(tracker.isCompleted('item1'), 'Should mark completed');

  tracker.markFailed('item2', 'Test error');
  assert(tracker.getStats().failed === 1, 'Should track failed');

  assert(tracker.shouldProcess('item3'), 'Should process new item');
  assert(!tracker.shouldProcess('item1'), 'Should not reprocess completed');

  // Cleanup
  fs.unlinkSync(testFile);
});

test('ProgressTracker filters remaining', () => {
  const testFile = '/tmp/test-progress2.json';
  if (fs.existsSync(testFile)) fs.unlinkSync(testFile);

  const tracker = new ProgressTracker(testFile);
  tracker.markCompleted('a');
  tracker.markSkipped('b', 'reason');

  const remaining = tracker.getRemaining(['a', 'b', 'c', 'd']);
  assert(remaining.length === 2, 'Should filter completed/skipped');
  assert(remaining.includes('c'), 'Should include c');
  assert(remaining.includes('d'), 'Should include d');

  fs.unlinkSync(testFile);
});

// Run tests
async function runTests() {
  console.log('\n🧪 Running Tests\n');

  for (const { name, fn } of tests) {
    try {
      await fn();
      passed++;
      console.log(`  ✅ ${name}`);
    } catch (error) {
      failed++;
      console.log(`  ❌ ${name}`);
      console.log(`     ${error.message}`);
    }
  }

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
