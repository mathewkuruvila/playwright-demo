import { test as base, Page } from '@playwright/test';

type MyPage = { myPage: Page };

export const test = base.extend<{}, MyPage>({
  myPage: [async ({ browser }, use, workerInfo) => {
    const page = await browser.newPage();
    console.log(`Worker: ${workerInfo.workerIndex}, Page created`);
    
    await page.goto('https://www.google.com');
    await use(page);
    await page.close();
  }, { scope: 'worker' }],
});