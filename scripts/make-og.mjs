/**
 * Generate the Open Graph share card.
 *
 *   npm run make:og
 *
 * Uses the site's own palette so a LinkedIn or Slack preview looks like the
 * page it links to. Text is rasterised here rather than shipped as SVG text,
 * so it renders identically regardless of the scraper's font stack.
 */
import sharp from 'sharp';

const W = 1200;
const H = 630;

const PAPER = '#f6f5f2';
const INK = '#16171b';
const MUTED = '#55585f';
const BRASS = '#8a5a12';
const RULE = '#dcd9d2';

const AVATAR = 260;
const SOURCE = new URL('../src/assets/photo.jpg', import.meta.url);
const OUT = new URL('../public/og.png', import.meta.url);

// Same square, face-centred crop the site uses for the portrait.
const { width, height } = await sharp(SOURCE.pathname).metadata();
const side = Math.round(width * 0.78);
const left = Math.max(0, Math.round(width * 0.45 - side / 2));
const top = Math.max(0, Math.round(height * 0.22 - side * 0.42));

const circle = Buffer.from(
  `<svg width="${AVATAR}" height="${AVATAR}"><circle cx="${AVATAR / 2}" cy="${AVATAR / 2}" r="${AVATAR / 2}" fill="#fff"/></svg>`
);

const avatar = await sharp(SOURCE.pathname)
  .extract({
    left,
    top,
    width: Math.min(side, width - left),
    height: Math.min(side, height - top),
  })
  .resize(AVATAR, AVATAR, { fit: 'cover' })
  .composite([{ input: circle, blend: 'dest-in' }])
  .png()
  .toBuffer();

const text = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <g>
    <text x="${W / 2}" y="418" fill="${BRASS}" font-size="24" font-weight="500"
          letter-spacing="4" text-anchor="middle"
          font-family="Menlo, Consolas, monospace">SCIENTIST + TECH BUILDER</text>
    <text x="${W / 2}" y="497" fill="${INK}" font-size="76" font-weight="400"
          text-anchor="middle"
          font-family="Georgia, 'Times New Roman', serif">Hung Q. Pham</text>
    <text x="${W / 2}" y="551" fill="${MUTED}" font-size="24"
          letter-spacing="1" text-anchor="middle"
          font-family="Menlo, Consolas, monospace">AI + Science &#183; Scientific Software &#183; Quantum Chemistry</text>
  </g>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="${BRASS}"/>
  <rect x="0" y="${H - 7}" width="${W}" height="1" fill="${RULE}"/>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 4, background: PAPER } })
  .composite([
    { input: text, top: 0, left: 0 },
    { input: avatar, top: 96, left: Math.round((W - AVATAR) / 2) },
  ])
  .png()
  .toFile(OUT.pathname);

console.log(`Wrote public/og.png (${W}x${H})`);
