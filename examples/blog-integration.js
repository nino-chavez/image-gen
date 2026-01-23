#!/usr/bin/env node
/**
 * Example: Blog Integration
 * Shows how to integrate image-gen with a blog project like Signal Dispatch
 */

import fs from 'fs';
import path from 'path';
import { createAgent } from '../src/index.js';

// Configuration - adapt these to your project
const CONFIG = {
  blogDir: process.env.BLOG_DIR || './src/content/blog',
  outputDir: process.env.OUTPUT_DIR || './public/images/generated',
  progressFile: process.env.PROGRESS_FILE || './image-generation-progress.json',
  filePattern: /\.mdx?$/,
};

/**
 * Extract frontmatter from MDX content
 */
function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    if (line.match(/^\s+-\s/)) continue;
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyMatch) {
      let value = keyMatch[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontmatter[keyMatch[1]] = value;
    }
  }

  return frontmatter;
}

/**
 * Update MDX file with new image path
 */
function updateMdxFile(filepath, imagePath) {
  let content = fs.readFileSync(filepath, 'utf-8');

  if (content.match(/^featureImage:\s/m)) {
    content = content.replace(
      /^featureImage:\s*"[^"]*"/m,
      `featureImage: "${imagePath}"`
    );
  } else {
    // Add after category line
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].match(/^category:\s*["']/)) {
        lines.splice(i + 1, 0, `featureImage: "${imagePath}"`);
        break;
      }
    }
    content = lines.join('\n');
  }

  fs.writeFileSync(filepath, content);
}

/**
 * Main generation function
 */
async function generateBlogImages() {
  console.log('\n🎨 Blog Image Generator\n');

  // Initialize agent
  const agent = await createAgent({
    provider: 'openrouter',
    model: 'gemini-flash',
    styleSystem: 'illustration',
    progressFile: CONFIG.progressFile,
    width: 1200,
    height: 675,
    format: 'webp',
    quality: 85,
    rateLimitMs: 2000,
  });

  // Find blog files
  const files = fs.readdirSync(CONFIG.blogDir)
    .filter(f => CONFIG.filePattern.test(f));

  console.log(`Found ${files.length} blog posts\n`);

  // Parse content items
  const items = files.map(filename => {
    const filepath = path.join(CONFIG.blogDir, filename);
    const content = fs.readFileSync(filepath, 'utf-8');
    const frontmatter = extractFrontmatter(content);
    const slug = filename.replace(/\.(mdx?|md)$/, '');

    return {
      id: filename,
      filename,
      filepath,
      slug,
      title: frontmatter?.title || slug,
      excerpt: frontmatter?.excerpt || frontmatter?.metaDescription,
      category: frontmatter?.category,
      hasImage: !!frontmatter?.featureImage,
    };
  });

  // Filter to items needing images
  const needsImage = items.filter(item => !item.hasImage);
  console.log(`${needsImage.length} posts need images\n`);

  // Get style recommendations
  const recommendations = agent.getStyleRecommendations(items);
  if (recommendations.length > 0) {
    console.log('📋 Style Recommendations:');
    for (const rec of recommendations) {
      console.log(`  - ${rec.suggestion}`);
    }
    console.log('');
  }

  // Ensure output directory
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  // Generate images
  const results = await agent.generateBatch(
    needsImage,
    (item) => path.join(CONFIG.outputDir, `${item.slug}.webp`),
    {
      onProgress: ({ current, total, item, result }) => {
        const shortTitle = item.title.length > 45
          ? item.title.substring(0, 42) + '...'
          : item.title;

        if (result.skipped) {
          console.log(`[${current}/${total}] ⏭️  ${shortTitle}`);
        } else {
          console.log(`[${current}/${total}] ✅ ${shortTitle} (${result.sizeKB}KB)`);

          // Update MDX file with image path
          const relativePath = `/images/generated/${item.slug}.webp`;
          updateMdxFile(item.filepath, relativePath);
        }
      },
      onError: ({ item, error }) => {
        console.log(`❌ ${item.title}: ${error.message}`);
      },
    }
  );

  // Summary
  console.log('\n📊 Generation Complete:');
  console.log(`  ✅ Success: ${results.success.length}`);
  console.log(`  ❌ Failed: ${results.failed.length}`);
  console.log(`  ⏭️  Skipped: ${results.skipped.length}`);

  const stats = agent.getStats();
  console.log(`\n📈 Performance:`);
  console.log(`  Avg size: ${stats.avgSizeKB}KB`);
  console.log(`  Avg time: ${Math.round(stats.avgGenerationTimeMs / 1000)}s`);

  console.log('\n✨ Done!\n');
}

// Run if executed directly
generateBlogImages().catch(console.error);
