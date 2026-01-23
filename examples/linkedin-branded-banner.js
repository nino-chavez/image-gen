/**
 * LinkedIn Branded Banner Creator
 * Adds text branding overlay to the Command Center banner
 */

import sharp from 'sharp';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// LinkedIn banner dimensions
const BANNER = {
  width: 1584,
  height: 396
};

async function createBrandedBanner(bannerPath, outputPath, options = {}) {
  const scale = options.scale || 2;
  const width = BANNER.width * scale;
  const height = BANNER.height * scale;

  console.log('\n🎨 Creating branded LinkedIn banner...\n');

  // Load and resize the base banner
  console.log('1️⃣  Loading base banner...');
  const banner = await sharp(bannerPath)
    .resize(width, height, { fit: 'cover' })
    .toBuffer();

  // Create branding SVG overlay
  console.log('2️⃣  Creating branding overlay...');

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Gradient for subtle text shadow/glow -->
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <!-- Drop shadow for readability -->
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="4" flood-opacity="0.5"/>
        </filter>
      </defs>

      <!-- Semi-transparent gradient overlay for text readability on right side -->
      <rect x="${width * 0.55}" y="0" width="${width * 0.45}" height="${height}"
            fill="url(#textBg)" opacity="0.3"/>

      <linearGradient id="textBg" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:rgb(15,22,41);stop-opacity:0" />
        <stop offset="100%" style="stop-color:rgb(15,22,41);stop-opacity:0.7" />
      </linearGradient>

      <!-- Main title -->
      <text x="${width - 80}" y="${height * 0.38}"
            text-anchor="end"
            font-family="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif"
            font-size="${64 * scale / 2}"
            font-weight="700"
            fill="white"
            filter="url(#shadow)">
        Product Architect
      </text>

      <!-- Subtitle -->
      <text x="${width - 80}" y="${height * 0.55}"
            text-anchor="end"
            font-family="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif"
            font-size="${36 * scale / 2}"
            font-weight="400"
            fill="rgba(255,255,255,0.9)"
            filter="url(#shadow)">
        AI-Native Commerce Platforms
      </text>

      <!-- Tagline with accent color -->
      <text x="${width - 80}" y="${height * 0.72}"
            text-anchor="end"
            font-family="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif"
            font-size="${30 * scale / 2}"
            font-weight="600"
            fill="#00d4ff"
            filter="url(#shadow)">
        Building what's next
      </text>
    </svg>
  `;

  const svgBuffer = Buffer.from(svg);

  // Composite banner + branding
  console.log('3️⃣  Compositing layers...');
  await sharp(banner)
    .composite([{ input: svgBuffer, left: 0, top: 0 }])
    .png()
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  console.log(`\n✅ Branded banner created!`);
  console.log(`   Output: ${outputPath}`);
  console.log(`   Size: ${Math.round(stats.size / 1024)} KB`);
  console.log(`   Dimensions: ${width}x${height}`);

  // Also create 1x version for direct upload
  const upload1xPath = outputPath.replace('.png', '-1x.png');
  await sharp(outputPath)
    .resize(BANNER.width, BANNER.height)
    .toFile(upload1xPath);
  console.log(`   Upload-ready (1x): ${upload1xPath}`);

  return outputPath;
}

async function createMockupWithPlaceholder(bannerPath, outputPath) {
  const scale = 2;
  const width = BANNER.width * scale;
  const height = BANNER.height * scale;
  const profileDiameter = 160 * scale;
  const profileX = 115 * scale;

  console.log('\n🖼️  Creating mockup preview with profile placeholder...\n');

  // Load branded banner
  const banner = await sharp(bannerPath).toBuffer();

  // Create profile photo placeholder (circle with gradient)
  const placeholderSvg = `
    <svg width="${profileDiameter}" height="${profileDiameter}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="profileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a2e"/>
          <stop offset="100%" style="stop-color:#16213e"/>
        </linearGradient>
      </defs>
      <circle cx="${profileDiameter/2}" cy="${profileDiameter/2}" r="${profileDiameter/2 - 8}"
              fill="url(#profileGrad)" stroke="white" stroke-width="8"/>
      <text x="${profileDiameter/2}" y="${profileDiameter/2 + 10}"
            text-anchor="middle"
            font-family="SF Pro Display, sans-serif"
            font-size="32"
            fill="rgba(255,255,255,0.5)">
        Your Photo
      </text>
    </svg>
  `;

  const placeholder = Buffer.from(placeholderSvg);

  // Canvas to show profile overlap
  const canvasHeight = height + profileDiameter / 2;

  await sharp({
    create: {
      width: width,
      height: canvasHeight,
      channels: 4,
      background: { r: 240, g: 240, b: 245, alpha: 255 }  // Light gray like LinkedIn
    }
  })
    .composite([
      { input: banner, left: 0, top: 0 },
      {
        input: placeholder,
        left: Math.round(profileX - profileDiameter / 2),
        top: Math.round(height - profileDiameter / 2)
      }
    ])
    .png()
    .toFile(outputPath);

  console.log(`✅ Mockup preview created: ${outputPath}`);
  return outputPath;
}

// Main
async function main() {
  const bannerPath = process.argv[2] || join(__dirname, '..', 'output', 'linkedin-profile-commandCenter-v1.png');
  const outputDir = join(__dirname, '..', 'output');

  const brandedPath = join(outputDir, 'linkedin-command-center-branded.png');
  const mockupPath = join(outputDir, 'linkedin-command-center-mockup.png');

  await createBrandedBanner(bannerPath, brandedPath);
  await createMockupWithPlaceholder(brandedPath, mockupPath);

  console.log('\n📦 Done! Files created:');
  console.log(`   - Branded banner: ${brandedPath}`);
  console.log(`   - Mockup preview: ${mockupPath}`);
}

main().catch(console.error);
