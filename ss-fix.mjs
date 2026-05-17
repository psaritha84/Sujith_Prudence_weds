import puppeteer from 'puppeteer';
const outDir = 'temporary screenshots';

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 800));
await page.click('#openBtn');
await new Promise(r => setTimeout(r, 2000));
// Force all sr elements visible
await page.evaluate(() => document.querySelectorAll('.sr').forEach(el => el.classList.add('in')));
await new Promise(r => setTimeout(r, 400));

const cdTop = await page.evaluate(() => document.querySelector('.cd-sec').getBoundingClientRect().top + window.scrollY);
await page.evaluate(y => window.scrollTo(0, y), cdTop);
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: `${outDir}/screenshot-10-countdown-full.png` });
await browser.close(); console.log('done');
