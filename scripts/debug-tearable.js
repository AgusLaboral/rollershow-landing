import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
page.on('console', msg => console.log('[console]', msg.type(), msg.text()));
page.on('pageerror', err => console.log('[ERROR]', err.message));
await page.goto('http://127.0.0.1:8765/prototipo-tearable.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
const info = await page.evaluate(() => {
  const c = window.__cloths.bad;
  const canvas = document.getElementById('cloth-bad');
  const wrap = canvas.parentElement;
  const wrapRect = wrap.getBoundingClientRect();
  const cRect = canvas.getBoundingClientRect();
  // pull internals
  const ctxc = canvas.getContext('2d');
  const px = ctxc.getImageData(canvas.width / 2, canvas.height / 2, 1, 1).data;
  return {
    wrapSize: [wrapRect.width, wrapRect.height],
    canvasSize: [canvas.width, canvas.height],
    canvasCSS: [cRect.width, cRect.height],
    pxAtCenter: Array.from(px),
    canvasComputedStyle: {
      position: getComputedStyle(canvas).position,
      zIndex: getComputedStyle(canvas).zIndex,
      width: getComputedStyle(canvas).width,
      height: getComputedStyle(canvas).height,
    },
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
