import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on('console', msg => console.log('[console]', msg.text()));
page.on('pageerror', err => console.log('[ERROR]', err.message));

// Inject probe BEFORE script runs
await page.addInitScript(() => {
  window.__renderCalls = 0;
  window.__cellsTotal = 0;
  window.__cellsBroken = 0;
});

await page.goto('http://127.0.0.1:8765/prototipo-tearable.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

const info = await page.evaluate(() => {
  // Patch directly into cloth's internals via render observation
  // Since I exposed __cloths but not the cells, I need to instrument render
  // Instead: just manually call render and measure
  const canvas = document.getElementById('cloth-bad');
  const c = canvas.getContext('2d');
  // see if drawing a simple rect now works
  c.fillStyle = 'red';
  c.fillRect(100, 100, 50, 50);
  const px = c.getImageData(110, 110, 1, 1).data;
  return { manualDrawWorks: Array.from(px) };
});
console.log('Manual draw test:', JSON.stringify(info));

// Now check what the next render does — wait one frame and sample
await page.waitForTimeout(50);
const info2 = await page.evaluate(() => {
  const canvas = document.getElementById('cloth-bad');
  const c = canvas.getContext('2d');
  const px = c.getImageData(110, 110, 1, 1).data;
  return { afterFrame: Array.from(px) };
});
console.log('After 1 frame:', JSON.stringify(info2));

await browser.close();
