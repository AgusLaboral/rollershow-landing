import { chromium } from 'playwright';
const browser = await chromium.launch();
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const mp = await m.newPage();
await mp.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
await mp.waitForTimeout(2500);
await mp.evaluate(() => document.querySelector('#tear-title').scrollIntoView({ block: 'start' }));
await mp.waitForTimeout(400);
await mp.screenshot({ path: '_screenshots/landing-tear/final-mobile.png', fullPage: false });

const d = await browser.newContext({ viewport: { width: 1280, height: 950 } });
const dp = await d.newPage();
await dp.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
await dp.waitForTimeout(2500);
await dp.evaluate(() => document.querySelector('#tear-title').scrollIntoView({ block: 'start' }));
await dp.waitForTimeout(400);
await dp.screenshot({ path: '_screenshots/landing-tear/final-desktop.png', fullPage: false });
await browser.close();
console.log('OK');
