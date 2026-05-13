import { chromium } from 'playwright';
const browser = await chromium.launch();
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const mp = await m.newPage();
await mp.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
await mp.waitForTimeout(2500);
// scroll all the way to bottom slowly so reveals trigger
await mp.evaluate(async () => {
  await new Promise(resolve => {
    let y = 0;
    const i = setInterval(() => {
      window.scrollBy(0, 200);
      y += 200;
      if (y > document.body.scrollHeight) { clearInterval(i); resolve(); }
    }, 80);
  });
});
await mp.waitForTimeout(800);
// now scroll back to tear
await mp.evaluate(() => {
  const el = document.querySelector('.tear');
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo(0, top - 50);
});
await mp.waitForTimeout(800);
await mp.screenshot({ path: '_screenshots/landing-tear/final3-mobile.png', fullPage: false });
await browser.close();
