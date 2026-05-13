import { chromium } from 'playwright';
const browser = await chromium.launch();
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const mp = await m.newPage();
await mp.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
await mp.waitForTimeout(2500);
// scroll to tear
await mp.evaluate(async () => {
  await new Promise(r => { let y=0; const i = setInterval(() => { window.scrollBy(0, 200); y+=200; if (y > document.body.scrollHeight) { clearInterval(i); r(); } }, 60); });
});
await mp.waitForTimeout(500);
await mp.evaluate(() => { const el = document.querySelector('.tear'); window.scrollTo(0, el.offsetTop - 30); });
await mp.waitForTimeout(500);
// programmatically tear the bad cloth heavily
await mp.evaluate(() => {
  const canvas = document.getElementById('tearClothBad');
  const r = canvas.getBoundingClientRect();
  // Use bounding box to access internal cloth simulation - we don't have direct access
  // Instead simulate touchend touches sequentially
  const events = ['touchstart','touchmove','touchmove','touchmove','touchmove','touchmove','touchmove','touchend'];
  function dispatch(type, x, y) {
    const t = new Touch({ identifier: 1, target: canvas, clientX: x, clientY: y });
    canvas.dispatchEvent(new TouchEvent(type, { bubbles: true, cancelable: true, touches: type === 'touchend' ? [] : [t], changedTouches: [t] }));
  }
  // 5 drags fuertes
  for (let pass = 0; pass < 8; pass++) {
    const y = r.top + r.height * (0.35 + pass*0.05);
    dispatch('touchstart', r.left + 10, y);
    for (let i = 0; i < 10; i++) dispatch('touchmove', r.left + 10 + i*15, y + i*5);
    dispatch('touchend', r.left + 150, y + 50);
  }
});
await mp.waitForTimeout(2000);
await mp.screenshot({ path: '_screenshots/landing-tear/torn-mobile.png', fullPage: false });
await browser.close();
