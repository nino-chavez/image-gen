/**
 * HTML Template Engine
 * Renders HTML templates with data interpolation for HTML-to-PNG pipeline
 *
 * Templates use {{variable}} syntax for simple values and
 * {{#if variable}}...{{/if}} for conditionals.
 */

import fs from 'fs';
import path from 'path';

/**
 * Render a template string with data
 * @param {string} template - HTML template with {{variable}} placeholders
 * @param {object} data - Key-value pairs to interpolate
 * @returns {string} Rendered HTML
 */
export function renderTemplate(template, data = {}) {
  let rendered = template;

  // Handle {{#if key}}...{{/if}} conditionals
  rendered = rendered.replace(
    /\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (_, key, content) => (data[key] ? content : '')
  );

  // Handle {{#unless key}}...{{/unless}} inverse conditionals
  rendered = rendered.replace(
    /\{\{#unless\s+(\w+)\}\}([\s\S]*?)\{\{\/unless\}\}/g,
    (_, key, content) => (!data[key] ? content : '')
  );

  // Handle {{#each items}}...{{/each}} loops
  rendered = rendered.replace(
    /\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g,
    (_, key, content) => {
      const items = data[key];
      if (!Array.isArray(items)) return '';
      return items
        .map((item, index) => {
          let itemContent = content;
          if (typeof item === 'object') {
            for (const [k, v] of Object.entries(item)) {
              itemContent = itemContent.replace(
                new RegExp(`\\{\\{${k}\\}\\}`, 'g'),
                escapeHtml(String(v ?? ''))
              );
            }
          } else {
            itemContent = itemContent.replace(/\{\{this\}\}/g, escapeHtml(String(item)));
          }
          itemContent = itemContent.replace(/\{\{@index\}\}/g, String(index));
          return itemContent;
        })
        .join('');
    }
  );

  // Handle {{{variable}}} raw (unescaped) replacements — BEFORE double-brace
  rendered = rendered.replace(/\{\{\{(\w[\w.]*)\}\}\}/g, (_, key) => {
    const value = getNestedValue(data, key);
    return value !== undefined ? String(value) : '';
  });

  // Handle {{variable}} simple replacements
  rendered = rendered.replace(/\{\{(\w[\w.]*)\}\}/g, (_, key) => {
    const value = getNestedValue(data, key);
    return value !== undefined ? escapeHtml(String(value)) : '';
  });

  return rendered;
}

/**
 * Load and render a template file
 * @param {string} templatePath - Path to .html template file
 * @param {object} data - Template data
 * @returns {string} Rendered HTML
 */
export function renderTemplateFile(templatePath, data = {}) {
  const template = fs.readFileSync(templatePath, 'utf-8');
  return renderTemplate(template, data);
}

/**
 * Discover templates in a directory
 * @param {string} dir - Templates directory
 * @returns {Array<{name: string, path: string}>}
 */
export function listTemplates(dir) {
  if (!fs.existsSync(dir)) return [];

  const templates = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.html')) {
      templates.push({
        name: entry.name.replace('.html', ''),
        path: path.join(dir, entry.name),
      });
    } else if (entry.isDirectory()) {
      // Support nested: brand/template-name.html
      const nested = fs.readdirSync(path.join(dir, entry.name));
      for (const file of nested) {
        if (file.endsWith('.html')) {
          templates.push({
            name: `${entry.name}/${file.replace('.html', '')}`,
            path: path.join(dir, entry.name, file),
          });
        }
      }
    }
  }

  return templates;
}

/**
 * Load data from a JSON file
 * @param {string} dataPath - Path to JSON file
 * @returns {object}
 */
export function loadData(dataPath) {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getNestedValue(obj, key) {
  return key.split('.').reduce((o, k) => (o != null ? o[k] : undefined), obj);
}
