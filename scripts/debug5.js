import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on('console', msg => console.log('[c]', msg.text()));
page.on('pageerror', err => console.log('[E]', err.message));
await page.goto('http://127.0.0.1:8765/prototipo-tearable.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

// Try drawing a triangle manually mimicking what the cloth code does
const result = await page.evaluate(() => {
  const canvas = document.getElementById('cloth-bad');
  const c = canvas.getContext('2d');
  // use CSS coords (transform is already DPR-scaled in setTransform)
  // Direct fill — bypass clip+transform
  c.fillStyle = 'lime';
  c.fillRect(50, 100, 100, 100);
  return 'drew lime rect';
});
console.log(result);
await page.waitForTimeout(50);

// Sample
const sample = await page.evaluate(() => {
  const canvas = document.getElementById('cloth-bad');
  const c = canvas.getContext('2d');
  // Backing store coords
  const px1 = c.getImageData(150, 200, 1, 1).data; // should be lime if it survived
  return { sample: Array.from(px1) };
});
console.log('sample:', sample);
await browser.close();
