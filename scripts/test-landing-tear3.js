import { chromium } from 'playwright';
const browser = await chromium.launch();
// Desktop full section
const d = await browser.newContext({ viewport: { width: 1280, height: 1100 } });
const dp = await d.newPage();
await dp.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
await dp.waitForTimeout(2500);
await dp.evaluate(() => document.querySelector('#tear-title').scrollIntoView({ block: 'start', behavior: 'instant' }));
await dp.waitForTimeout(500);
await dp.screenshot({ path: '_screenshots/landing-tear/desktop-full.png', fullPage: false });

// Mobile - scroll a la primera demo
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const mp = await m.newPage();
await mp.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
await mp.waitForTimeout(2500);
await mp.evaluate(() => document.querySelector('#tear-title').scrollIntoView({ block: 'start', behavior: 'instant' }));
await mp.waitForTimeout(500);
await mp.screenshot({ path: '_screenshots/landing-tear/mobile-top.png', fullPage: false });
// scroll a primera demo
await mp.evaluate(() => document.querySelector('.tear__demo--bad').scrollIntoView({ block: 'center', behavior: 'instant' }));
await mp.waitForTimeout(500);
await mp.screenshot({ path: '_screenshots/landing-tear/mobile-bad.png', fullPage: false });
// scroll a segunda demo
await mp.evaluate(() => document.querySelector('.tear__demo--good').scrollIntoView({ block: 'center', behavior: 'instant' }));
await mp.waitForTimeout(500);
await mp.screenshot({ path: '_screenshots/landing-tear/mobile-good.png', fullPage: false });
await browser.close();
console.log('OK');
