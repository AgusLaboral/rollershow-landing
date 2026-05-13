import { chromium } from 'playwright';
import fs from 'node:fs';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on('console', msg => console.log('[c]', msg.text()));
await page.goto('http://127.0.0.1:8765/prototipo-tearable.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

await page.evaluate(() => { window.__cloths.bad.tick = () => {}; window.__cloths.good.tick = () => {}; });
await page.waitForTimeout(50);

// Replicate the exact drawTriangle code with fabricTex-like image
const dump = await page.evaluate(() => {
  const canvas = document.getElementById('cloth-bad');
  const c = canvas.getContext('2d');
  c.clearRect(0, 0, canvas.width, canvas.height);
  
  // Make a colored offscreen identical pattern to fabricTex (256x256)
  const tex = document.createElement('canvas');
  tex.width = tex.height = 256;
  const tc = tex.getContext('2d');
  tc.fillStyle = '#f6f4ef';
  tc.fillRect(0, 0, 256, 256);
  // add visible marker
  tc.fillStyle = 'red';
  tc.fillRect(0, 0, 50, 50);
  
  // Triangle: tl=(12.6,20), tr=(33.4,20), bl=(12.6,40.4)
  const p0 = {x:12.6, y:20}, p1 = {x:33.4, y:20}, p2 = {x:12.6, y:40.4};
  const u0=0, v0=0, u1=1/14, v1=0, u2=0, v2=1/18;
  
  c.save();
  c.beginPath();
  c.moveTo(p0.x, p0.y);
  c.lineTo(p1.x, p1.y);
  c.lineTo(p2.x, p2.y);
  c.closePath();
  c.clip();
  
  const tw = 256, th = 256;
  const su0=u0*tw, sv0=v0*th, su1=u1*tw, sv1=v1*th, su2=u2*tw, sv2=v2*th;
  const denom = su0*(sv2-sv1) - su1*sv2 + su2*sv1 + (su1-su2)*sv0;
  const id = 1/denom;
  const a = (p0.x*(sv2-sv1) - p1.x*sv2 + p2.x*sv1 + (p1.x-p2.x)*sv0) * id;
  const b = -(p0.x*(su2-su1) - p1.x*su2 + p2.x*su1 + (p1.x-p2.x)*su0) * id;
  const cc = (p0.y*(sv2-sv1) - p1.y*sv2 + p2.y*sv1 + (p1.y-p2.y)*sv0) * id;
  const dd = -(p0.y*(su2-su1) - p1.y*su2 + p2.y*su1 + (p1.y-p2.y)*su0) * id;
  const e = p0.x - a*su0 - b*sv0;
  const f = p0.y - cc*su0 - dd*sv0;
  c.transform(a, cc, b, dd, e, f);
  c.drawImage(tex, 0, 0);
  c.restore();
  
  return { matrix: [a, cc, b, dd, e, f], denom };
});
console.log('matrix:', dump);
const dataUrl = await page.evaluate(() => document.getElementById('cloth-bad').toDataURL('image/png'));
fs.writeFileSync('_screenshots/tearable/triangle-test.png', Buffer.from(dataUrl.split(',')[1], 'base64'));
console.log('triangle test dumped');

await browser.close();
