/**
 * Generate the favicon and touch icons.
 *
 *   npm run make:icons
 *
 * The site had a <link rel="icon" href="/favicon.ico"> pointing at a file that
 * never existed, so browsers fell back to a letter placeholder in the tab.
 *
 * Text is rasterised here rather than shipped as SVG text, so the mark renders
 * identically everywhere instead of depending on the viewer's font stack.
 */
import sharp from 'sharp';

const INK = '#16171b';
const PAPER = '#f6f5f2';
const BRASS = '#d9a441';

const PUBLIC = new URL('../public/', import.meta.url);

/** Square mark: ink field, paper monogram, brass rule. Legible down to 16px. */
const mark = (radius) => Buffer.from(`
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="${radius}" fill="${INK}"/>
  <text x="256" y="256" fill="${PAPER}"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="250" font-weight="700" letter-spacing="-8"
        text-anchor="middle" dominant-baseline="central">HP</text>
  <rect x="150" y="392" width="212" height="26" rx="13" fill="${BRASS}"/>
</svg>`);

const targets = [
  // Rounded on the web, square for iOS — Apple applies its own mask.
  { file: 'favicon-32.png', size: 32, radius: 112 },
  { file: 'favicon-192.png', size: 192, radius: 112 },
  { file: 'apple-touch-icon.png', size: 180, radius: 0 },
];

for (const { file, size, radius } of targets) {
  await sharp(mark(radius)).resize(size, size).png().toFile(new URL(file, PUBLIC).pathname);
  console.log(`wrote public/${file} (${size}x${size})`);
}
