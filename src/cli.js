#!/usr/bin/env node
/**
 * Image Generation CLI
 * Command-line interface for AI image generation
 */

import { program } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';
import path from 'path';
import { createGenerator } from './generator.js';
import { listStyleSystems, getStyleSystem } from './styles/index.js';
import { AVAILABLE_MODELS } from './providers/index.js';
import { HtmlProvider } from './providers/html.js';
import { optimizeAndSave } from './utils/optimizer.js';

// Load .env if present
import dotenv from 'dotenv';
dotenv.config();

program
  .name('image-gen')
  .description('AI-powered image generation tool')
  .version('1.0.0');

// Single image generation
program
  .command('generate')
  .description('Generate a single image')
  .option('-t, --title <title>', 'Content title')
  .option('-d, --description <desc>', 'Simple description (alternative to title)')
  .option('-e, --excerpt <excerpt>', 'Content excerpt/summary')
  .option('-c, --category <category>', 'Content category for style matching')
  .option('-o, --output <path>', 'Output file path', './output.webp')
  .option('-s, --style <system>', 'Style system to use', 'illustration')
  .option('-m, --model <model>', 'AI model to use', 'gemini-flash')
  .option('-w, --width <width>', 'Output width', '1200')
  .option('-h, --height <height>', 'Output height', '675')
  .option('-f, --format <format>', 'Output format (webp, jpeg, png)', 'webp')
  .option('-q, --quality <quality>', 'Output quality (1-100)', '85')
  .option('-r, --ref <path>', 'Reference image path (for likeness/style matching)')
  .action(async (options) => {
    const spinner = ora('Initializing...').start();

    try {
      const generator = await createGenerator({
        provider: 'openrouter',
        model: options.model,
        styleSystem: options.style,
        width: parseInt(options.width),
        height: parseInt(options.height),
        format: options.format,
        quality: parseInt(options.quality),
      });

      spinner.text = 'Generating image...';

      let result;
      const refOptions = options.ref ? { referenceImage: options.ref } : {};

      if (options.description) {
        result = await generator.generateFromDescription(
          options.description,
          options.output,
          refOptions
        );
      } else if (options.title) {
        result = await generator.generateFromContent(
          {
            title: options.title,
            excerpt: options.excerpt,
            category: options.category,
          },
          options.output
        );
      } else {
        spinner.fail('Either --title or --description is required');
        process.exit(1);
      }

      spinner.succeed(
        chalk.green(`Generated: ${options.output} (${result.sizeKB}KB)`)
      );
    } catch (error) {
      spinner.fail(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

// Batch generation from directory
program
  .command('batch')
  .description('Generate images for multiple content files')
  .requiredOption('-i, --input <dir>', 'Input directory with content files')
  .requiredOption('-o, --output <dir>', 'Output directory for images')
  .option('-p, --pattern <glob>', 'File pattern to match', '*.mdx')
  .option('-s, --style <system>', 'Style system to use', 'illustration')
  .option('-m, --model <model>', 'AI model to use', 'gemini-flash')
  .option('--progress <file>', 'Progress tracking file')
  .option('--force', 'Force regenerate all images')
  .option('--rate-limit <ms>', 'Rate limit between requests', '2000')
  .action(async (options) => {
    console.log(chalk.cyan('\n🎨 Image Generation - Batch Mode\n'));

    try {
      // Find content files
      const files = fs
        .readdirSync(options.input)
        .filter((f) => {
          if (options.pattern === '*.mdx') return f.endsWith('.mdx');
          if (options.pattern === '*.md') return f.endsWith('.md');
          return f.match(new RegExp(options.pattern.replace('*', '.*')));
        });

      console.log(chalk.dim(`Found ${files.length} content files`));

      // Initialize generator
      const generator = await createGenerator({
        provider: 'openrouter',
        model: options.model,
        styleSystem: options.style,
        progressFile: options.progress,
        rateLimitMs: parseInt(options.rateLimit),
      });

      if (options.force && generator.progressTracker) {
        generator.resetProgress();
      }

      // Ensure output directory
      if (!fs.existsSync(options.output)) {
        fs.mkdirSync(options.output, { recursive: true });
      }

      // Parse content files and generate
      const items = files.map((filename) => {
        const filepath = path.join(options.input, filename);
        const content = fs.readFileSync(filepath, 'utf-8');
        const frontmatter = extractFrontmatter(content);
        const slug = filename.replace(/\.(mdx?|md)$/, '');

        return {
          id: filename,
          filename,
          filepath,
          slug,
          title: frontmatter?.title || slug,
          excerpt: frontmatter?.excerpt || frontmatter?.description,
          category: frontmatter?.category,
        };
      });

      // Filter to remaining items
      const remaining = generator.progressTracker
        ? items.filter((item) => generator.progressTracker.shouldProcess(item.id))
        : items;

      const stats = generator.getProgress() || { completed: 0, failed: 0, skipped: 0 };
      console.log(chalk.dim(`Completed: ${stats.completed}, Remaining: ${remaining.length}\n`));

      if (remaining.length === 0) {
        console.log(chalk.green('All images already generated!'));
        return;
      }

      // Generate
      let count = 0;
      const results = await generator.generateBatch(
        remaining,
        (item) => path.join(options.output, `${item.slug}.webp`),
        {
          onProgress: ({ current, total, item, result }) => {
            count++;
            const shortTitle = item.title.length > 40
              ? item.title.substring(0, 37) + '...'
              : item.title;

            if (result.skipped) {
              console.log(
                chalk.dim(`[${current}/${total}] ⏭️  ${shortTitle} (skipped)`)
              );
            } else {
              console.log(
                chalk.green(`[${current}/${total}] ✅ ${shortTitle} (${result.sizeKB}KB)`)
              );
            }
          },
          onError: ({ item, error }) => {
            console.log(
              chalk.red(`[${count}/${remaining.length}] ❌ ${item.title}`)
            );
            console.log(chalk.dim(`   Error: ${error.message}`));
          },
        }
      );

      // Summary
      console.log(chalk.cyan('\n📊 Summary:'));
      console.log(chalk.green(`   ✅ Success: ${results.success.length}`));
      console.log(chalk.red(`   ❌ Failed: ${results.failed.length}`));
      console.log(chalk.dim(`   ⏭️  Skipped: ${results.skipped.length}`));

      if (results.success.length > 0) {
        const totalSize = results.success.reduce(
          (sum, r) => sum + (r.result.sizeKB || 0),
          0
        );
        console.log(
          chalk.dim(`   📦 Total: ${Math.round(totalSize / 1024)}MB, Avg: ${Math.round(totalSize / results.success.length)}KB`)
        );
      }

      console.log(chalk.green('\n✨ Done!\n'));
    } catch (error) {
      console.error(chalk.red(`\nError: ${error.message}\n`));
      process.exit(1);
    }
  });

// List available styles
program
  .command('styles')
  .description('List available style systems')
  .option('-v, --verbose', 'Show detailed style information')
  .action((options) => {
    console.log(chalk.cyan('\n🎨 Available Style Systems:\n'));

    for (const name of listStyleSystems()) {
      const system = getStyleSystem(name);
      console.log(chalk.bold(`  ${name}`));
      console.log(chalk.dim(`    ${system.description || 'No description'}`));

      if (options.verbose) {
        console.log(chalk.dim(`    Categories: ${Object.keys(system.styles).join(', ')}`));
      }
      console.log('');
    }
  });

// List available models
program
  .command('models')
  .description('List available AI models')
  .action(() => {
    console.log(chalk.cyan('\n🤖 Available Models:\n'));

    for (const [alias, fullName] of Object.entries(AVAILABLE_MODELS)) {
      console.log(`  ${chalk.bold(alias)}`);
      console.log(chalk.dim(`    ${fullName}`));
    }
    console.log('');
  });

// HTML-to-PNG rendering
program
  .command('render')
  .description('Render HTML files to images')
  .argument('[input]', 'HTML file or directory of HTML files')
  .option('-o, --output <path>', 'Output file or directory')
  .option('-p, --pattern <glob>', 'File pattern for directory mode', '*.html')
  .option('-w, --width <width>', 'Override viewport width')
  .option('--height <height>', 'Override viewport height')
  .option('-s, --scale <factor>', 'Device scale factor (pixel density)', '2')
  .option('-f, --format <format>', 'Output format (png, webp, jpeg)', 'png')
  .option('-q, --quality <quality>', 'Output quality for lossy formats (1-100)', '90')
  .option('--wait <ms>', 'Extra wait time after page load (ms)', '0')
  .option('--no-optimize', 'Skip sharp optimization, output raw screenshot')
  .action(async (input, options) => {
    if (!input) {
      console.error(chalk.red('Error: input file or directory is required'));
      process.exit(1);
    }

    const inputPath = path.resolve(input);
    const stat = fs.statSync(inputPath, { throwIfNoEntry: false });

    if (!stat) {
      console.error(chalk.red(`Error: ${input} does not exist`));
      process.exit(1);
    }

    const provider = new HtmlProvider({
      width: options.width ? parseInt(options.width) : undefined,
      height: options.height ? parseInt(options.height) : undefined,
    });

    const renderOpts = {
      width: options.width ? parseInt(options.width) : undefined,
      height: options.height ? parseInt(options.height) : undefined,
      deviceScaleFactor: parseFloat(options.scale),
      waitMs: parseInt(options.wait),
    };

    try {
      if (stat.isFile()) {
        // Single file mode
        const spinner = ora('Rendering...').start();
        const outPath = options.output || input.replace(/\.html?$/, `.${options.format}`);
        const buffer = await provider.render(inputPath, renderOpts);

        if (options.optimize !== false) {
          const result = await optimizeAndSave(buffer, outPath, {
            width: null,
            height: null,
            format: options.format,
            quality: parseInt(options.quality),
          });
          spinner.succeed(chalk.green(`Rendered: ${outPath} (${result.sizeKB}KB)`));
        } else {
          fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
          fs.writeFileSync(outPath, buffer);
          spinner.succeed(chalk.green(`Rendered: ${outPath} (${Math.round(buffer.length / 1024)}KB)`));
        }
      } else if (stat.isDirectory()) {
        // Batch directory mode
        const files = fs.readdirSync(inputPath).filter((f) => {
          if (options.pattern === '*.html') return f.endsWith('.html');
          return f.match(new RegExp(options.pattern.replace('*', '.*')));
        });

        if (files.length === 0) {
          console.log(chalk.yellow('No matching HTML files found.'));
          process.exit(0);
        }

        const outDir = options.output || inputPath;
        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir, { recursive: true });
        }

        console.log(chalk.cyan(`\nRendering ${files.length} HTML files...\n`));

        let success = 0;
        let failed = 0;

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const filePath = path.join(inputPath, file);
          const outName = file.replace(/\.html?$/, `.${options.format}`);
          const outPath = path.join(outDir, outName);

          try {
            const buffer = await provider.render(filePath, renderOpts);

            if (options.optimize !== false) {
              const result = await optimizeAndSave(buffer, outPath, {
                width: null,
                height: null,
                format: options.format,
                quality: parseInt(options.quality),
              });
              console.log(chalk.green(`  [${i + 1}/${files.length}] ${outName} (${result.sizeKB}KB)`));
            } else {
              fs.writeFileSync(outPath, buffer);
              console.log(chalk.green(`  [${i + 1}/${files.length}] ${outName} (${Math.round(buffer.length / 1024)}KB)`));
            }
            success++;
          } catch (err) {
            console.log(chalk.red(`  [${i + 1}/${files.length}] ${file} — ${err.message}`));
            failed++;
          }
        }

        console.log(chalk.cyan(`\nDone: ${success} rendered, ${failed} failed\n`));
      }
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    } finally {
      await provider.close();
    }
  });

// Simple frontmatter extraction
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

program.parse();
