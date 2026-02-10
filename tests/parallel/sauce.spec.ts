import { expect, Locator, Page } from '@playwright/test';
import { test } from './fixtures';

// test.use({ storageState: './.auth/user.json' });

test('SpecFlow #1.1', {tag: "@setup"}, async ({ page, viewport }) => {
    
    console.log('Viewport:', viewport);
    // await page.goto('https://www.saucedemo.com/inventory.html')
    // await expect(page.locator('[data-test="title"]')).toBeVisible();
})

test('SpecFlow #1', {tag: "@setup"}, async ({ page }) => {
    
    await page.goto('https://www.saucedemo.com/inventory.html')
    await expect(page.locator('[data-test="title"]')).toBeVisible();
})

test('SpecFlow #2', {tag: "@setup"}, async ({ page }) => {
    
    await page.goto('https://www.saucedemo.com/inventory.html')
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
})

test('SpecFlow #3', {tag: "@setup"}, async ({ page }) => {
    
    await page.goto('https://www.saucedemo.com/inventory.html')
    await expect(page.locator('[data-test="shopping-cart-link"]')).not.toBeVisible();
})