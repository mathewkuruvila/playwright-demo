import { test, expect, Locator, Page } from '@playwright/test';
import HomePage from '../../pages/woolies';
// import { step } from '../base';


test('Woolworth - Other Services - Big W', {tag: "@wool"}, async ({ page }) => {
    
    test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');

    const homePage = new HomePage(page);
  
    await homePage.every_OtherServices(page, "Big W");
})

test('Woolworth - Other Services - Everyday Market', {tag: "@wool"}, async ({ page }) => {
    
    test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');
  
    const homePage = new HomePage(page);
    await homePage.every_OtherServices(page, "Everyday Market");
})

test('Woolworth - Other Services - Milkrun', async ({ page }) => {
    
    test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');
  
    const homePage = new HomePage(page);
    await homePage.every_OtherServices(page, "Milkrun");
})

test('Woolworth - Other Services - Woolworths at Work', async ({ page }) => {
    
    test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');
  
    const homePage = new HomePage(page);
    await homePage.every_OtherServices(page, "Woolworths at Work");
})

test('Woolworth - Other Services - Healthy Life', async ({ page }) => {
    
    test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');
  
    const homePage = new HomePage(page);
    await homePage.every_OtherServices(page, "Healthy Life");
})

test('Woolworth - Other Services - MyDeal ', async ({ page }) => {
    
    test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');
  
    const homePage = new HomePage(page);
    await homePage.every_OtherServices(page, "MyDeal");
})

test('Woolworth - Other Services - Petstock', async ({ page }) => {
    
    test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');
  
    const homePage = new HomePage(page);
    await homePage.every_OtherServices(page, "Petstock");
})




async function every_OtherService(page: Page, service: string) {

    await page.getByRole('button', {name : 'Everyday & Other Services'}).click()

    let everyday_partners = "//section[@class='wx-header__everyday-partners-list']/a/img";
    // await expect(await page.locator(everyday_partners)).toHaveCount(7)

    await page.locator(everyday_partners).first().waitFor();

    let links = await page.locator(everyday_partners).all();
    console.log(` links: ${links.length}`);
    let element : Locator;

    
    const pagePromise = page.context().waitForEvent('page');

    for (let index = 0; index < links.length; index++) {
        element = links[index];
        let message : string = await element.getAttribute('alt') || "";
        
        if(message.trim() === service) {
            console.log(message.trim());
            await element.click();
            break;
        }
    }

    const newPage = await pagePromise;
    await newPage.waitForLoadState('load');
    await newPage.bringToFront();

    console.log(await newPage.title());
    await newPage.close();
    console.log(await page.title());
}