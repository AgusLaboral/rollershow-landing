import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, '_screenshots/tearable');

const URL = process.argv[2] || 'http://127.0.0.1:8765/prototipo-tearable.html';

async function shoot(page, name) {
  await page.screenshot({ path: resolve(OUT, name + '.png'), fullPage: false });
  console.log('  ->', name + '.png');
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();

  // Mobile viewport (iPhone 14)
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true, hasTouch: true, deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500); // espera unsplash + settle

  await shoot(page, '01-initial-mobile');

  // Trigger break en la tela mala (scroll a la sección, drag horizontal)
  await page.evaluate(() => {
    const cloth = window.__cloths.bad;
    const canvas = document.getElementById('cloth-bad');
    canvas.scrollIntoView({ block: 'center' });
    const r = canvas.getBoundingClientRect();
    // múltiples drags horizontales para romper bien
    cloth.simulateDrag(r.width * 0.2, r.height * 0.5, r.width * 0.8, r.height * 0.5, 25);
  });
  await page.waitForTimeout(1000);
  await shoot(page, '02-bad-after-drag');

  await page.evaluate(() => {
    const cloth = window.__cloths.bad;
    const canvas = document.getElementById('cloth-bad');
    const r = canvas.getBoundingClientRect();
    cloth.simulateDrag(r.width * 0.2, r.height * 0.4, r.width * 0.8, r.height * 0.6, 25);
  });
  await page.waitForTimeout(1500);
  await shoot(page, '03-bad-broken');

  // Drag en la buena
  await page.evaluate(() => {
    const cloth = window.__cloths.good;
    const canvas = document.getElementById('cloth-good');
    canvas.scrollIntoView({ block: 'center' });
    const r = canvas.getBoundingClientRect();
    cloth.simulateDrag(r.width * 0.2, r.height * 0.5, r.width * 0.8, r.height * 0.5, 25);
  });
  await page.waitForTimeout(1200);
  await shoot(page, '04-good-after-drag');

  // Desktop viewport
  await ctx.close();
  const ctxD = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const pageD = await ctxD.newPage();
  await pageD.goto(URL, { waitUntil: 'networkidle' });
  await pageD.waitForTimeout(2500);
  await shoot(pageD, '05-initial-desktop');

  await pageD.evaluate(() => {
    const cloth = window.__cloths.bad;
    const canvas = document.getElementById('cloth-bad');
    const r = canvas.getBoundingClientRect();
    cloth.simulateDrag(r.width * 0.2, r.height * 0.4, r.width * 0.8, r.height * 0.7, 30);
  });
  await pageD.waitForTimeout(1500);
  await shoot(pageD, '06-desktop-bad-broken');

  await browser.close();
  console.log('Done. Screenshots in:', OUT);
}

main().catch(e => { console.error(e); process.exit(1); });
