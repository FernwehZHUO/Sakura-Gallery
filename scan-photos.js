/**
 * Photo Scanner Script
 * Run this script whenever you add new photos to the photos/ folder
 * Usage: node scan-photos.js
 */

const fs = require('fs');
const path = require('path');

const PHOTOS_DIR = './photos';
const OUTPUT_FILE = './photos.json';

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

function scanPhotos() {
    console.log('🌸 Scanning photos folder...\n');

    if (!fs.existsSync(PHOTOS_DIR)) {
        fs.mkdirSync(PHOTOS_DIR);
        console.log('📁 Created photos/ folder');
    }

    const files = fs.readdirSync(PHOTOS_DIR);
    const photos = [];

    files.forEach((file, index) => {
        const ext = path.extname(file).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
            const name = path.basename(file, ext);
            photos.push({
                url: `photos/${file}`,
                title: formatTitle(name),
                date: `Memory ${index + 1}`
            });
            console.log(`  ✓ Found: ${file}`);
        }
    });

    if (photos.length === 0) {
        console.log('\n⚠️  No photos found! Add images to the photos/ folder.');
        console.log('   Supported formats: jpg, jpeg, png, webp, gif\n');

        // Create sample config anyway
        photos.push(
            { url: 'photos/sample.jpg', title: 'Add Your Photos', date: 'Drop images in photos/' }
        );
    }

    // Write JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(photos, null, 2));
    console.log(`\n✨ Generated ${OUTPUT_FILE} with ${photos.length} photo(s)`);
    console.log('   Refresh the webpage to see your photos!\n');
}

function formatTitle(filename) {
    // Convert filename to readable title
    // "my_photo_1" -> "My Photo 1"
    return filename
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}

scanPhotos();
