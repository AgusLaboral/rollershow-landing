import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
async function measure(url) {
  return await page.evaluate(async (u) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = u;
    await new Promise(r => img.onload = r);
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0,0,img.width,img.height).data;
    let minX = img.width, minY = img.height, maxX = 0, maxY = 0;
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        const i = (y * img.width + x) * 4;
        if (d[i] < 230 || d[i+1] < 230 || d[i+2] < 230) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }
    return { w: img.width, h: img.height, minX, minY, maxX, maxY,
      pctMinX: (minX/img.width).toFixed(3), pctMaxX: (maxX/img.width).toFixed(3),
      pctMinY: (minY/img.height).toFixed(3), pctMaxY: (maxY/img.height).toFixed(3) };
  }, url);
}
console.log('good:', await measure('http://127.0.0.1:9876/img/tear-curtain-good.jpg'));
console.log('bad:', await measure('http://127.0.0.1:9876/img/tear-curtain-bad.png'));
await browser.close();
