import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch();
await mkdir('_screenshots/landing-tear', { recursive: true });

// mobile
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const mp = await m.newPage();
mp.on('pageerror', e => console.log('[ERR]', e.message));
await mp.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
await mp.waitForTimeout(2500);
await mp.locator('#tear-title').scrollIntoViewIfNeeded();
await mp.waitForTimeout(800);
await mp.screenshot({ path: '_screenshots/landing-tear/mobile.png', fullPage: false });

// desktop
const d = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const dp = await d.newPage();
await dp.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
await dp.waitForTimeout(2500);
await dp.locator('#tear-title').scrollIntoViewIfNeeded();
await dp.waitForTimeout(800);
await dp.screenshot({ path: '_screenshots/landing-tear/desktop.png', fullPage: false });

await browser.close();
console.log('OK');
