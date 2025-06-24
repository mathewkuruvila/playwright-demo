import { test, expect, Locator, Page } from '@playwright/test';

test('Woolworth - Catalog - 3008', async ({ page }) => {
    
    test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');
  
    await opencatalog(page, "3008");
})

test('Woolworth - Catalog - 3220', async ({ page }) => {
    
    test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');
  
    await opencatalog(page, "3000");
})

test('Woolworth - Catalog - 3358', async ({ page }) => {
    
    test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');
  
    await opencatalog(page, "3358");
})

test('Woolworth - Catalog - 3377', async ({ page }) => {
    
    test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');
  
    await opencatalog(page, "3377");
})

test('Woolworth - Catalog - 3340', async ({ page }) => {
    
    test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');
  
    await opencatalog(page, "3340");
})

test('Woolworth - Catalog - 3977', async ({ page }) => {
    
    test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');
  
    await opencatalog(page, "3977");
})

test('Woolworth - Catalog - 3030', async ({ page }) => {
    
    test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');
  
    await opencatalog(page, "3030");
})

test('Woolworth - Catalog - 2640', async ({ page }) => {
    
    // test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');
  
    await opencatalog(page, "2640");
})

test('Woolworth - Catalog - 2600', async ({ page }) => {
    
    // test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');
  
    await opencatalog(page, "2600");
})

test('Woolworth - Catalog - 2000', async ({ page }) => {
    
    // test.setTimeout(120000);

    await page.goto('http://www.woolworths.com.au/');
  
    await opencatalog(page, "2000");
})

async function opencatalog(page: Page, pincode: string) {

    await page.getByRole('button', {name : 'Specials & catalogue'}).click()
    await page.getByText('Catalogue', {exact : true}).nth(1).click()

    const enter_Pincode = page.getByPlaceholder('Enter postcode or suburb')

    // await expect(enter_Pincode).toBeVisible();
    await expect(enter_Pincode).not.toBeVisible();
    await expect(enter_Pincode).toBeHidden();
    await expect(enter_Pincode).toHaveCount(0);

    await enter_Pincode.fill(pincode);

    await page.getByRole('listbox', {name : 'Find a store'}).first().click();

    // await page.getByText('Woolworths Victoria Harbour').click();

    await page.getByRole('link', {name : 'Weekly Catalogue VIC'}).first().click()
    await page.waitForLoadState('load');   

    await expect(enter_Pincode).not.toBeVisible();
    await expect(enter_Pincode).toBeHidden();
    await expect(enter_Pincode).toHaveCount(0);

    await page.locator("//ul[@class='slides']//li//a").first().waitFor({ state: 'visible' });

    let links = await page.locator("//ul[@class='slides']//li//a").all();

    console.log(` links: ${links.length}`);


    for (let index = 0; index < links.length; index++) {
        const element = await links[index].getAttribute('title') || "";
        console.log(element);
    }
}