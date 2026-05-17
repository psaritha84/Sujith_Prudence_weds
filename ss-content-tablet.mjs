import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
const out = 'temporary screenshots';

async function shot(w, h, label, scrollY) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));
  await page.click('#openBtn');
  await new Promise(r => setTimeout(r, 1800));
  await page.evaluate(() => document.querySelectorAll('.sr').forEach(el => el.classList.add('in')));
  await new Promise(r => setTimeout(r, 300));
  if (scrollY) await page.evaluate(y => window.scrollTo(0, y), scrollY);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: `${out}/ss-${label}.png` });
  await page.close();
}

await shot(768,  1024, 'tab-names',    100);
await shot(768,  1024, 'tab-gallery',  900);
await shot(768,  1024, 'tab-events',   1700);
await shot(1280, 800,  'desk-names',   100);
await shot(1280, 800,  'desk-gallery', 900);

await browser.close(); console.log('done');
