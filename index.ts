// const puppeteer = require('puppeteer-extra');
import puppeteer from 'puppeteer';
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// puppeteer.use(StealthPlugin());

(async function () {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto('https:/baidu.com');
  await page.waitForSelector('#kw');

  const input = await page.$<HTMLInputElement>('#kw');
  console.log(input);
  await input!.focus();
  console.log('input focus');
  await page.keyboard.type('vue');
  await (await page.$('#su'))!.click();

  await page.waitForSelector('.result.c-container.new-pmd');
  const links = await page.$$eval('.result.c-container.new-pmd', (els) => {
    return els.map((el) => {
      const title = el.querySelector('h3.t')!.textContent;
      const link = el.querySelector<HTMLLinkElement>('h3.t a')?.href;
      return {
        title,
        link,
      };
    });
  });
  console.log(links);
})();
