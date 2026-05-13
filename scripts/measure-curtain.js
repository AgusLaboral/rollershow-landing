import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(`
<canvas id="c"></canvas>
<script>
const img = new Image();
img.onload = () => {
  const c = document.getElementById('c');
  c.width = img.width; c.height = img.height;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  // Find bounds of non-white pixels
  const d = ctx.getImageData(0,0,img.width,img.height).data;
  let minX = img.width, minY = img.height, maxX = 0, maxY = 0;
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const i = (y * img.width + x) * 4;
      // pixel is "non-white" if any channel < 235
      if (d[i] < 235 || d[i+1] < 235 || d[i+2] < 235) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  window.__r = { w: img.width, h: img.height, minX, minY, maxX, maxY,
    pctMinX: minX/img.width, pctMaxX: maxX/img.width, pctMinY: minY/img.height, pctMaxY: maxY/img.height };
};
img.src = '/img/tear-curtain-good.jpg';
</script>
`);
// Need to serve the image. Use file:// or local server.
await browser.close();
