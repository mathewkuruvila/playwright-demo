
import { test } from './fixtures';


test('SpecFlow #1.1', {tag: "@fix"}, async ({ page, sharedData, name }) => {
    
    console.log('mailUrl:' + sharedData.templateId);
    
    let title = await page.title();
    console.log('Page title:', name);  

    // await page.goto('https://www.saucedemo.com/inventory.html')
    // await expect(page.locator('[data-test="title"]')).toBeVisible();
})

// tests('SpecFlow #1.2', {tag: "@fix"}, async ({ page, mailUrl }) => {
    
//     console.log('mailUrl:' + mailUrl);
    
//     let title = await page.title();
//     console.log('Page title:', title);  

//     // await page.goto('https://www.saucedemo.com/inventory.html')
//     // await expect(page.locator('[data-test="title"]')).toBeVisible();
// })

// testss('SpecFlow #1.3 a', {tag: "@fix"}, async ({ page, mailUrl }) => {
    
//     console.log('mailUrl:' + mailUrl);
    
//     let title = await page.title();
//     console.log('Page title:', title);  

//     // await page.goto('https://www.saucedemo.com/inventory.html')
//     // await expect(page.locator('[data-test="title"]')).toBeVisible();
// })
