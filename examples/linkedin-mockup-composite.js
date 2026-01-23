/**
 * LinkedIn Banner Mockup Composite
 * Combines banner + profile photo + branding into a realistic LinkedIn preview
 *
 * LinkedIn dimensions:
 * - Banner: 1584 x 396 pixels
 * - Profile photo: ~160px diameter circle, positioned at approximately (115, 396)
 *   (center x=115, bottom edge of banner)
 * - Profile photo overlaps banner by about 50% of its height
 */

import sharp from 'sharp';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// LinkedIn layout constants (at 1x scale)
const LINKEDIN = {
  banner: { width: 1584, height: 396 },
  profile: {
    diameter: 160,
    centerX: 115,  // From left edge
    centerY: 396,  // At bottom of banner (profile overlaps)
    borderWidth: 4,
    borderColor: '#FFFFFF'
  },
  // Safe zone for text (right side of banner)
  textArea: {
    startX: 900,   // Start text area here
    endX: 1550,    // End before edge
    centerY: 198   // Vertical center of banner
  }
};

async function extractProfilePhoto(screenshotPath, outputPath) {
  console.log('📷 Extracting profile photo from screenshot...');

  // The screenshot is high-res, profile photo appears at roughly:
  // Based on the screenshot, profile is at approximately x=165-290, y=245-370 (at screen scale)
  // Let's extract a generous area and then process it

  const image = sharp(screenshotPath);
  const metadata = await image.metadata();

  console.log(`   Screenshot dimensions: ${metadata.width}x${metadata.height}`);

  // Profile photo approximate location in the screenshot (these are estimates)
  // The profile photo in LinkedIn appears to be around 125px diameter at screen resolution
  const extractRegion = {
    left: 170,
    top: 250,
    width: 130,
    height: 130
  };

  await image
    .extract(extractRegion)
    .resize(400, 400, { fit: 'cover' })  // Upscale for quality
    .toFile(outputPath);

  console.log(`   ✅ Profile photo extracted to: ${outputPath}`);
  return outputPath;
}

async function createCircularProfilePhoto(inputPath, outputPath, diameter = 320) {
  console.log('🔵 Creating circular profile photo with border...');

  const borderWidth = 8;  // At 2x scale
  const innerDiameter = diameter - (borderWidth * 2);

  // Create circular mask
  const circleMask = Buffer.from(
    `<svg width="${innerDiameter}" height="${innerDiameter}">
      <circle cx="${innerDiameter/2}" cy="${innerDiameter/2}" r="${innerDiameter/2}" fill="white"/>
    </svg>`
  );

  // Create the circular profile photo
  const circularPhoto = await sharp(inputPath)
    .resize(innerDiameter, innerDiameter, { fit: 'cover' })
    .composite([{
      input: circleMask,
      blend: 'dest-in'
    }])
    .toBuffer();

  // Create white border circle
  const borderCircle = Buffer.from(
    `<svg width="${diameter}" height="${diameter}">
      <circle cx="${diameter/2}" cy="${diameter/2}" r="${diameter/2}" fill="white"/>
    </svg>`
  );

  // Composite: border circle + profile photo centered
  await sharp(borderCircle)
    .composite([{
      input: circularPhoto,
      left: borderWidth,
      top: borderWidth
    }])
    .png()
    .toFile(outputPath);

  console.log(`   ✅ Circular profile created: ${outputPath}`);
  return outputPath;
}

async function createBrandingOverlay(width, height) {
  console.log('🏷️  Creating branding overlay...');

  // Create SVG with text branding
  // Position text on the right side of the banner
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;display=swap');
          .title {
            font-family: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
            font-weight: 700;
            fill: white;
          }
          .subtitle {
            font-family: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
            font-weight: 400;
            fill: rgba(255,255,255,0.85);
          }
          .tagline {
            font-family: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
            font-weight: 600;
            fill: #00d4ff;
          }
        </style>
      </defs>

      <!-- Main title -->
      <text x="${width - 100}" y="${height/2 - 60}" text-anchor="end" class="title" font-size="72">
        Product Architect
      </text>

      <!-- Subtitle -->
      <text x="${width - 100}" y="${height/2 + 10}" text-anchor="end" class="subtitle" font-size="42">
        AI-Native Commerce Platforms
      </text>

      <!-- Tagline -->
      <text x="${width - 100}" y="${height/2 + 80}" text-anchor="end" class="tagline" font-size="36">
        Building what's next
      </text>
    </svg>
  `;

  return Buffer.from(svg);
}

async function createMockup(bannerPath, profilePhotoPath, outputPath, options = {}) {
  console.log('\n🎨 Creating LinkedIn mockup composite...\n');

  const scale = options.scale || 2;  // 2x for high quality
  const bannerWidth = LINKEDIN.banner.width * scale;
  const bannerHeight = LINKEDIN.banner.height * scale;
  const profileDiameter = LINKEDIN.profile.diameter * scale;

  // 1. Load and resize banner
  console.log('1️⃣  Processing banner...');
  const banner = await sharp(bannerPath)
    .resize(bannerWidth, bannerHeight, { fit: 'cover' })
    .toBuffer();

  // 2. Create circular profile photo
  const tempCircularPath = join(__dirname, '..', 'output', 'temp-circular-profile.png');
  await createCircularProfilePhoto(profilePhotoPath, tempCircularPath, profileDiameter);
  const circularProfile = await sharp(tempCircularPath).toBuffer();

  // 3. Create branding overlay
  const brandingOverlay = await createBrandingOverlay(bannerWidth, bannerHeight);

  // 4. Calculate profile position (centered at bottom-left, overlapping)
  const profileX = Math.round((LINKEDIN.profile.centerX * scale) - (profileDiameter / 2));
  const profileY = Math.round((bannerHeight) - (profileDiameter / 2) - 20); // Slight adjustment

  console.log(`   Profile position: (${profileX}, ${profileY})`);

  // 5. Create the composite
  console.log('5️⃣  Compositing layers...');

  // Create a slightly taller canvas to show profile photo overlap
  const canvasHeight = bannerHeight + (profileDiameter / 2) + 40;

  await sharp({
    create: {
      width: bannerWidth,
      height: canvasHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      // Banner at top
      { input: banner, left: 0, top: 0 },
      // Branding overlay
      { input: brandingOverlay, left: 0, top: 0 },
      // Profile photo (positioned to overlap banner bottom)
      { input: circularProfile, left: profileX, top: profileY }
    ])
    .png()
    .toFile(outputPath);

  // Cleanup temp file
  fs.unlinkSync(tempCircularPath);

  const stats = fs.statSync(outputPath);
  console.log(`\n✅ Mockup created successfully!`);
  console.log(`   Output: ${outputPath}`);
  console.log(`   Size: ${Math.round(stats.size / 1024)} KB`);

  return outputPath;
}

// Also create a banner-only version with branding (for actual LinkedIn upload)
async function createBrandedBanner(bannerPath, outputPath) {
  console.log('\n🎨 Creating branded banner (for LinkedIn upload)...\n');

  const scale = 2;
  const bannerWidth = LINKEDIN.banner.width * scale;
  const bannerHeight = LINKEDIN.banner.height * scale;

  const banner = await sharp(bannerPath)
    .resize(bannerWidth, bannerHeight, { fit: 'cover' })
    .toBuffer();

  const brandingOverlay = await createBrandingOverlay(bannerWidth, bannerHeight);

  await sharp(banner)
    .composite([{ input: brandingOverlay, left: 0, top: 0 }])
    .png()
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  console.log(`✅ Branded banner created!`);
  console.log(`   Output: ${outputPath}`);
  console.log(`   Size: ${Math.round(stats.size / 1024)} KB`);
  console.log(`   Dimensions: ${bannerWidth}x${bannerHeight} (resize to 1584x396 for upload)`);

  return outputPath;
}

// Main execution
async function main() {
  const screenshotPath = process.argv[2] || '/var/folders/qm/r8v65ln91bv8_pl0c3x3pwnc0000gn/T/TemporaryItems/NSIRD_screencaptureui_gq5VAX/Screenshot 2026-01-15 at 2.16.11 PM.jpg';
  const bannerPath = process.argv[3] || join(__dirname, '..', 'output', 'linkedin-profile-commandCenter-v1.png');

  const outputDir = join(__dirname, '..', 'output');
  const profilePath = join(outputDir, 'extracted-profile-photo.png');
  const mockupPath = join(outputDir, 'linkedin-mockup-final.png');
  const brandedBannerPath = join(outputDir, 'linkedin-banner-branded-final.png');

  try {
    // Extract profile photo
    await extractProfilePhoto(screenshotPath, profilePath);

    // Create full mockup (preview)
    await createMockup(bannerPath, profilePath, mockupPath);

    // Create branded banner (for upload)
    await createBrandedBanner(bannerPath, brandedBannerPath);

    console.log('\n📦 All outputs created:');
    console.log(`   - Mockup preview: ${mockupPath}`);
    console.log(`   - Banner for upload: ${brandedBannerPath}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
