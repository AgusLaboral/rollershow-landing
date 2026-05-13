import { chromium } from 'playwright';
import fs from 'node:fs';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:8765/prototipo-tearable.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
// Take both: viewport AND element screenshots back-to-back at same moment
const viewportShot = await page.screenshot({ fullPage: false });
fs.writeFileSync('_screenshots/tearable/dbg-viewport.png', viewportShot);
const wrapShot = await page.locator('.canvas-wrap').first().screenshot();
fs.writeFileSync('_screenshots/tearable/dbg-wrap.png', wrapShot);
await browser.close();
