const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Path to source logo
const sourceLogoPath = path.join(__dirname, '..', 'public', 'logo.png');

// Output directory
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Sizes and output names
const imagesToGenerate = [
    { width: 16, height: 16, name: 'favicon-16x16.png' },
    { width: 32, height: 32, name: 'favicon-32x32.png' },
    { width: 180, height: 180, name: 'apple-touch-icon.png' },
    { width: 192, height: 192, name: 'android-chrome-192x192.png' },
    { width: 512, height: 512, name: 'android-chrome-512x512.png' },
    { width: 32, height: 32, name: 'favicon.png' },
    { width: 256, height: 256, name: 'logo-256.png' },
    { width: 128, height: 128, name: 'logo-128.png' },
];

async function generateIconsFromPNG() {
    console.log('🎨 Generating icons and logos from logo.png...');

    if (!fs.existsSync(sourceLogoPath)) {
        console.error('❌ logo.png not found at:', sourceLogoPath);
        return;
    }

    try {
        for (const { width, height, name } of imagesToGenerate) {
            await sharp(sourceLogoPath)
                .resize(width, height)
                .png()
                .toFile(path.join(publicDir, name));
        }

        // Copy favicon.png to favicon.ico
        fs.copyFileSync(
            path.join(publicDir, 'favicon.png'),
            path.join(publicDir, 'favicon.ico')
        );

        console.log('✅ Icons generated successfully!');
        console.log('📁 Generated files:');
        imagesToGenerate.forEach(({ name }) => console.log(`   - ${name}`));
        console.log('   - favicon.ico');
    } catch (error) {
        console.error('❌ Error generating icons:', error);
    }
}

generateIconsFromPNG();
