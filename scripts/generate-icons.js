const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Define the base logo SVG
const logoSVG = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1d4ed8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
  </defs>
  <!-- Background circle -->
  <circle cx="256" cy="256" r="240" fill="url(#grad1)" />
  
  <!-- University building icon -->
  <g transform="translate(256, 256)">
    <!-- Main building base -->
    <rect x="-100" y="40" width="200" height="120" fill="white" rx="8"/>
    
    <!-- Pillars -->
    <rect x="-80" y="40" width="20" height="120" fill="#f1f5f9"/>
    <rect x="-30" y="40" width="20" height="120" fill="#f1f5f9"/>
    <rect x="20" y="40" width="20" height="120" fill="#f1f5f9"/>
    <rect x="70" y="40" width="20" height="120" fill="#f1f5f9"/>
    
    <!-- Roof -->
    <polygon points="-120,40 0,-40 120,40" fill="white"/>
    
    <!-- Flag pole -->
    <rect x="-4" y="-80" width="8" height="120" fill="white"/>
    
    <!-- Flag -->
    <rect x="4" y="-80" width="40" height="25" fill="#ef4444"/>
    
    <!-- Windows -->
    <rect x="-60" y="60" width="15" height="20" fill="#3b82f6" rx="2"/>
    <rect x="-10" y="60" width="15" height="20" fill="#3b82f6" rx="2"/>
    <rect x="40" y="60" width="15" height="20" fill="#3b82f6" rx="2"/>
    
    <!-- Door -->
    <rect x="-15" y="120" width="30" height="40" fill="#1e40af" rx="4"/>
    <circle cx="8" cy="140" r="2" fill="white"/>
    
    <!-- Text -->
    <text x="0" y="-100" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="32" font-weight="bold">U</text>
  </g>
</svg>
`;

// Generate different sizes and formats
async function generateIcons() {
    console.log('🎨 Generating icons and logos...');

    try {
        // Create base SVG file
        fs.writeFileSync(path.join(publicDir, 'logo.svg'), logoSVG);

        // Generate favicon.ico (16x16, 32x32, 48x48)
        await sharp(Buffer.from(logoSVG))
            .resize(32, 32)
            .png()
            .toFile(path.join(publicDir, 'favicon-32x32.png'));

        await sharp(Buffer.from(logoSVG))
            .resize(16, 16)
            .png()
            .toFile(path.join(publicDir, 'favicon-16x16.png'));

        // Generate Apple Touch Icon
        await sharp(Buffer.from(logoSVG))
            .resize(180, 180)
            .png()
            .toFile(path.join(publicDir, 'apple-touch-icon.png'));

        // Generate Android Chrome icons
        await sharp(Buffer.from(logoSVG))
            .resize(192, 192)
            .png()
            .toFile(path.join(publicDir, 'android-chrome-192x192.png'));

        await sharp(Buffer.from(logoSVG))
            .resize(512, 512)
            .png()
            .toFile(path.join(publicDir, 'android-chrome-512x512.png'));

        // Generate main favicon.ico
        await sharp(Buffer.from(logoSVG))
            .resize(32, 32)
            .png()
            .toFile(path.join(publicDir, 'favicon.png'));

        // Copy to favicon.ico (browsers will handle it)
        fs.copyFileSync(
            path.join(publicDir, 'favicon.png'),
            path.join(publicDir, 'favicon.ico')
        );

        // Generate larger logo versions
        await sharp(Buffer.from(logoSVG))
            .resize(256, 256)
            .png()
            .toFile(path.join(publicDir, 'logo-256.png'));

        await sharp(Buffer.from(logoSVG))
            .resize(128, 128)
            .png()
            .toFile(path.join(publicDir, 'logo-128.png'));

        console.log('✅ Icons generated successfully!');
        console.log('📁 Generated files:');
        console.log('   - logo.svg');
        console.log('   - favicon.ico');
        console.log('   - favicon-16x16.png');
        console.log('   - favicon-32x32.png');
        console.log('   - apple-touch-icon.png');
        console.log('   - android-chrome-192x192.png');
        console.log('   - android-chrome-512x512.png');
        console.log('   - logo-256.png');
        console.log('   - logo-128.png');

    } catch (error) {
        console.error('❌ Error generating icons:', error);
    }
}

generateIcons();
