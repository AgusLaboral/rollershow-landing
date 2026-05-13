import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on('console', msg => console.log('[c]', msg.text()));
page.on('pageerror', err => console.log('[E]', err.message));
await page.goto('http://127.0.0.1:8765/prototipo-tearable.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
// dump entire canvas
const dataUrl = await page.evaluate(() => {
  return document.getElementById('cloth-bad').toDataURL('image/png');
});
const buf = Buffer.from(dataUrl.split(',')[1], 'base64');
const fs = await import('node:fs');
fs.writeFileSync('_screenshots/tearable/canvas-dump.png', buf);
console.log('canvas dumped');
await browser.close();
