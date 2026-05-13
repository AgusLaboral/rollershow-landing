import { chromium } from 'playwright';
import fs from 'node:fs';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on('console', msg => console.log('[c]', msg.text()));
await page.goto('http://127.0.0.1:8765/prototipo-tearable.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

// Try drawing the triangle in isolation, NO clip, just drawImage with transform
const result = await page.evaluate(() => {
  const canvas = document.getElementById('cloth-bad');
  const c = canvas.getContext('2d');
  // First draw a simple test: a manual triangle without clip
  c.save();
  c.fillStyle = 'red';
  c.beginPath();
  c.moveTo(50, 50);
  c.lineTo(150, 50);
  c.lineTo(50, 150);
  c.closePath();
  c.fill();
  c.restore();
  // sample
  const px = c.getImageData(120, 120, 1, 1).data;
  return { redTri: Array.from(px) };
});
console.log('manual red triangle (immediate):', result);

await page.waitForTimeout(50);
const sample2 = await page.evaluate(() => {
  const canvas = document.getElementById('cloth-bad');
  const c = canvas.getContext('2d');
  // After 50ms = ~3 frames of clearRect, this should be wiped
  return { afterFrames: Array.from(c.getImageData(120, 120, 1, 1).data) };
});
console.log(sample2);

// Pause the cloth render and try drawing
await page.evaluate(() => {
  // Mark all cells broken so render does nothing useful
  // We can't access cells, but we can swap render
});

await browser.close();
