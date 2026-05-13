/**
 * Screenshot mobile-first del landing en múltiples viewports.
 *
 * Uso:
 *   node scripts/screenshot-mobile.js [url]
 *   node scripts/screenshot-mobile.js http://127.0.0.1:8765/index.html
 *
 * Default URL: http://127.0.0.1:8765/index.html
 *
 * Genera capturas en _screenshots/:
 *   - mobile-iphone-se-375.png  (iPhone SE — el más restrictivo)
 *   - mobile-iphone-14-390.png
 *   - mobile-iphone-pro-max-430.png
 *   - tablet-ipad-768.png
 *   - desktop-1280.png
 *   - desktop-1440.png
 *
 * También captura "above-the-fold" (solo el primer fold) para cada uno como ___-fold.png
 */

import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, '_screenshots');

const url = process.argv[2] || 'http://127.0.0.1:8765/index.html';

const VIEWPORTS = [
  { name: 'mobile-iphone-se-375',     width: 375,  height: 667,  isMobile: true,  hasTouch: true,  deviceScaleFactor: 2 },
  { name: 'mobile-iphone-14-390',     width: 390,  height: 844,  isMobile: true,  hasTouch: true,  deviceScaleFactor: 2 },
  { name: 'mobile-iphone-pro-max-430', width: 430, height: 932,  isMobile: true,  hasTouch: true,  deviceScaleFactor: 2 },
  { name: 'tablet-ipad-768',          width: 768,  height: 1024, isMobile: true,  hasTouch: true,  deviceScaleFactor: 2 },
  { name: 'desktop-1280',             width: 1280, height: 800,  isMobile: false, hasTouch: false, deviceScaleFactor: 1 },
  { name: 'desktop-1440',             width: 1440, height: 900,  isMobile: false, hasTouch: false, deviceScaleFactor: 1 },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  console.log(`Loading: ${url}\n`);

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch,
      deviceScaleFactor: vp.deviceScaleFactor,
      userAgent: vp.isMobile
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        : undefined,
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    // Esperar fonts + animaciones reveal
    await page.waitForTimeout(1500);

    // Above-the-fold (solo el primer viewport)
    const foldPath = resolve(OUT_DIR, `${vp.name}-fold.png`);
    await page.screenshot({ path: foldPath, fullPage: false });
    console.log(`  [fold]  ${vp.name}-fold.png  (${vp.width}×${vp.height})`);

    // Full page
    const fullPath = resolve(OUT_DIR, `${vp.name}-full.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`  [full]  ${vp.name}-full.png`);

    await context.close();
  }

  await browser.close();
  console.log(`\n[OK] ${VIEWPORTS.length * 2} screenshots saved in: ${OUT_DIR}`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
