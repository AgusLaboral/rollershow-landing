import { chromium } from 'playwright';
import fs from 'node:fs';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:8765/prototipo-tearable.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

// Take a screenshot of just the wrap element
const wrap = await page.locator('.canvas-wrap').first();
const buf = await wrap.screenshot();
fs.writeFileSync('_screenshots/tearable/wrap-only.png', buf);

// Also take a wrap screenshot AFTER overriding canvas background
await page.evaluate(() => {
  const c = document.getElementById('cloth-bad');
  c.style.background = 'cyan';
  c.style.opacity = '0.7';
});
await page.waitForTimeout(100);
const buf2 = await wrap.screenshot();
fs.writeFileSync('_screenshots/tearable/wrap-cyan.png', buf2);

// Check element at each position
const eltest = await page.evaluate(() => {
  const wrap = document.querySelector('.canvas-wrap');
  const r = wrap.getBoundingClientRect();
  const points = [
    ['10% from top, center', r.left + r.width/2, r.top + r.height*0.1],
    ['40% from top, center', r.left + r.width/2, r.top + r.height*0.4],
    ['70% from top, center', r.left + r.width/2, r.top + r.height*0.7],
  ];
  return points.map(([n,x,y]) => {
    const el = document.elementFromPoint(x, y);
    return { n, top: el ? el.tagName + (el.className ? '.'+el.className : '') : 'null' };
  });
});
console.log(JSON.stringify(eltest, null, 2));
await browser.close();
