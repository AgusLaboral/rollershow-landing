import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:8765/prototipo-tearable.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const stack = await page.evaluate(() => {
  const wrap = document.querySelector('.canvas-wrap');
  const result = [];
  for (const ch of wrap.children) {
    const cs = getComputedStyle(ch);
    result.push({
      tag: ch.tagName + (ch.id ? '#'+ch.id : '') + (ch.className ? '.'+ch.className : ''),
      position: cs.position,
      zIndex: cs.zIndex,
      opacity: cs.opacity,
      visibility: cs.visibility,
      display: cs.display,
      width: cs.width,
      height: cs.height,
      mixBlendMode: cs.mixBlendMode,
    });
  }
  // Also check what's at the center of the wrap
  const wrapRect = wrap.getBoundingClientRect();
  const cx = wrapRect.left + wrapRect.width/2;
  const cy = wrapRect.top + wrapRect.height/2;
  const elAt = document.elementFromPoint(cx, cy);
  return { children: result, topElementAtCenter: elAt ? elAt.tagName + (elAt.id ? '#'+elAt.id : '') + (elAt.className ? '.'+elAt.className : '') : 'null' };
});
console.log(JSON.stringify(stack, null, 2));
await browser.close();
