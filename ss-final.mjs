import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 5500)); // wait for all staggered anims + petals mid-fall
await page.screenshot({ path: 'temporary screenshots/screenshot-final-splash.png' });
await browser.close(); console.log('done');
