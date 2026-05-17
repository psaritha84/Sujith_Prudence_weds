import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
const outDir = 'temporary screenshots';

async function shot(w, h, label) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 4000));
  await page.screenshot({ path: `${outDir}/ss-${label}.png` });
  await page.close();
}

await shot(375,  812,  'mobile-375');    // iPhone SE/13 mini
await shot(390,  844,  'mobile-390');    // iPhone 14
await shot(768,  1024, 'tablet-768');    // iPad
await shot(1280, 800,  'desktop-1280'); // Laptop

await browser.close(); console.log('all done');
