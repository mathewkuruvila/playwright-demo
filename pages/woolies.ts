import { Locator, Page } from "@playwright/test";
import { Steps } from '../base';

export default class HomePage {
    page: Page;


    constructor(page: Page){
        this.page = page;

    }

    @Steps("Add product: {productName} to cart")
    async every_OtherServices(page: Page, service: string) {

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

}
