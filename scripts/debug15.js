import { chromium } from 'playwright';
import fs from 'node:fs';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on('console', msg => console.log('[c]', msg.text()));
await page.goto('http://127.0.0.1:8765/prototipo-tearable.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);

// Freeze cloth render, then draw fabricTex directly to canvas at (50,50)
await page.evaluate(() => { window.__cloths.bad.tick = () => {}; });
await page.waitForTimeout(50);

const result = await page.evaluate(() => {
  // I need to access fabricTex. It's in the IIFE closure. Can't access directly.
  // Instead: create a NEW texture using same makeFabricTexture-style logic and test
  function makeT(size, baseColor) {
    const tex = document.createElement('canvas');
    tex.width = tex.height = size;
    const c = tex.getContext('2d');
    c.fillStyle = baseColor;
    c.fillRect(0, 0, size, size);
    const img = c.getImageData(0, 0, size, size);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - 0.5) * 12;
      d[i] = Math.max(0, Math.min(255, d[i] + n));
      d[i+1] = Math.max(0, Math.min(255, d[i+1] + n));
      d[i+2] = Math.max(0, Math.min(255, d[i+2] + n));
    }
    c.putImageData(img, 0, 0);
    return tex;
  }
  const tex = makeT(256, '#f6f4ef');
  const canvas = document.getElementById('cloth-bad');
  const c = canvas.getContext('2d');
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.drawImage(tex, 50, 50, 100, 100);
  // sample
  return Array.from(c.getImageData(120 * 1.5, 120 * 1.5, 1, 1).data);
});
console.log('drew tex directly, sample:', result);
await browser.close();
