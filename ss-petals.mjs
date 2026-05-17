import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
// Wait 4s so petals are mid-fall
await new Promise(r => setTimeout(r, 4000));
await page.screenshot({ path: 'temporary screenshots/screenshot-petals.png' });
await browser.close(); console.log('done');
