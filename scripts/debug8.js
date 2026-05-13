import { chromium } from 'playwright';
import fs from 'node:fs';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on('console', msg => console.log('[c]', msg.text()));
await page.goto('http://127.0.0.1:8765/prototipo-tearable.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);

// Try inserting a probe by replacing the requestAnimationFrame loop
// Then in next frame, draw a triangle using the same path as the cloth code
const probeResult = await page.evaluate(() => {
  // Cancel cloth's render by overriding tick
  const cloth = window.__cloths.bad;
  cloth.tick = () => {}; // freeze it
  
  // Now draw something on the canvas manually
  const canvas = document.getElementById('cloth-bad');
  const c = canvas.getContext('2d');
  c.clearRect(0, 0, canvas.width, canvas.height);
  // The setTransform DPR is already applied. Let's try drawing one triangle like the cloth code does
  
  // 1. simple test: just drawImage of a known image
  const offscreen = document.createElement('canvas');
  offscreen.width = offscreen.height = 256;
  const oc = offscreen.getContext('2d');
  oc.fillStyle = '#00ff00';
  oc.fillRect(0, 0, 256, 256);
  
  // Draw it
  c.drawImage(offscreen, 50, 50);
  return 'drew offscreen at 50,50';
});
console.log(probeResult);
await page.waitForTimeout(100);

// Now also freeze good cloth
await page.evaluate(() => { window.__cloths.good.tick = () => {}; });
await page.waitForTimeout(50);

// Sample
const s = await page.evaluate(() => {
  const c = document.getElementById('cloth-bad').getContext('2d');
  return Array.from(c.getImageData(150, 150, 1, 1).data);
});
console.log('after freeze, sample at (150,150):', s);

// Dump the canvas
const dataUrl = await page.evaluate(() => document.getElementById('cloth-bad').toDataURL('image/png'));
fs.writeFileSync('_screenshots/tearable/canvas-frozen.png', Buffer.from(dataUrl.split(',')[1], 'base64'));
console.log('frozen canvas dumped');

await browser.close();
