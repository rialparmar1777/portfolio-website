const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [192, 512];
const sourceImage = path.join(__dirname, '../public/logo.svg');

async function generateIcons() {
  try {
    // Create icons directory if it doesn't exist
    const iconsDir = path.join(__dirname, '../public');
    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir, { recursive: true });
    }

    // Generate icons for each size
    for (const size of sizes) {
      await sharp(sourceImage)
        .resize(size, size)
        .png()
        .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));
      console.log(`Generated ${size}x${size} icon`);
    }

    // Generate favicon
    await sharp(sourceImage)
      .resize(32, 32)
      .toFile(path.join(iconsDir, 'favicon.ico'));
    console.log('Generated favicon');

    // Generate apple-touch-icon
    await sharp(sourceImage)
      .resize(180, 180)
      .png()
      .toFile(path.join(iconsDir, 'apple-touch-icon.png'));
    console.log('Generated apple-touch-icon');

    // Generate OG image
    await sharp(sourceImage)
      .resize(1200, 630, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 1 } })
      .png()
      .toFile(path.join(iconsDir, 'og-image.jpg'));
    console.log('Generated OG image');

    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 