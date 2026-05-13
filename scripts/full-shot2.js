import { chromium } from 'playwright';
const browser = await chromium.launch();
const d = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const dp = await d.newPage();
await dp.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
await dp.waitForTimeout(2500);
await dp.evaluate(async () => {
  await new Promise(resolve => {
    let y = 0;
    const i = setInterval(() => { window.scrollBy(0, 300); y += 300; if (y > document.body.scrollHeight) { clearInterval(i); resolve(); } }, 80);
  });
});
await dp.waitForTimeout(600);
await dp.evaluate(() => { const el = document.querySelector('.tear'); window.scrollTo(0, el.offsetTop); });
await dp.waitForTimeout(600);
await dp.screenshot({ path: '_screenshots/landing-tear/final3-desktop.png', fullPage: false });
await browser.close();
