import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on('console', msg => console.log('[c]', msg.text()));
await page.goto('http://127.0.0.1:8765/prototipo-tearable.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const sample = await page.evaluate(() => {
  const canvas = document.getElementById('cloth-bad');
  const c = canvas.getContext('2d');
  // Sample many positions in BACKING coords (already DPR-scaled)
  const result = {};
  const tests = [
    ['midCell', 18, 290], // ~(12.6, 195) * 1.5
    ['nearTop', 30, 50],
    ['rollerY', 100, 30],
    ['leftEdge', 25, 200],
    ['rightCenter', 400, 300],
  ];
  for (const [n,x,y] of tests) {
    result[n] = Array.from(c.getImageData(x, y, 1, 1).data);
  }
  result.canvasSize = [canvas.width, canvas.height];
  return result;
});
console.log(JSON.stringify(sample, null, 2));
await browser.close();
