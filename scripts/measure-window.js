import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
const r = await page.evaluate(async () => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = 'http://127.0.0.1:9878/img/tear-window.png';
  await new Promise(r => img.onload = r);
  const c = document.createElement('canvas');
  c.width = img.width; c.height = img.height;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const d = ctx.getImageData(0,0,img.width,img.height).data;
  // Find darkest column (window frame is dark vs wall)
  // Sample dark pixels (where R+G+B is low, like the aluminum frame ~80-130)
  // Actually find bounds of NOT-wall pixels: wall is ~ #f5f0e8 (very light)
  // Anything significantly different from cream wall is "window contents"
  let minX = img.width, minY = img.height, maxX = 0, maxY = 0;
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const i = (y * img.width + x) * 4;
      const r = d[i], g = d[i+1], b = d[i+2];
      // wall is cream/light. Window contents include sky (blueish), trees, frame (dark)
      // Detect: pixel is NOT cream wall
      // Cream wall ~ R 230-255, G 220-245, B 200-235
      const isWall = r > 220 && g > 210 && b > 195 && Math.abs(r-g) < 30 && r > b;
      if (!isWall) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { w: img.width, h: img.height, 
    pctMinX: (minX/img.width*100).toFixed(1),
    pctMaxX: (maxX/img.width*100).toFixed(1),
    pctMinY: (minY/img.height*100).toFixed(1),
    pctMaxY: (maxY/img.height*100).toFixed(1),
  };
});
console.log('non-wall bounds:', r);
await browser.close();
