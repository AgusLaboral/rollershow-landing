import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on('console', msg => console.log('[console]', msg.text()));
page.on('pageerror', err => console.log('[ERROR]', err.message));
await page.goto('http://127.0.0.1:8765/prototipo-tearable.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
const info = await page.evaluate(() => {
  const canvas = document.getElementById('cloth-bad');
  const ctxc = canvas.getContext('2d');
  // sample multiple points
  const samples = {};
  for (const [name, x, y] of [['topLeft', 50, 50], ['center', canvas.width/2, canvas.height/2], ['bottom', canvas.width/2, canvas.height - 80], ['rollerArea', canvas.width/2, 30]]) {
    const px = ctxc.getImageData(x, y, 1, 1).data;
    samples[name] = Array.from(px);
  }
  return {
    canvasSize: [canvas.width, canvas.height],
    samples,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
