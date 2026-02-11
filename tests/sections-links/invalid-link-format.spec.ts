// spec: specs/ozbargain-sections-links.plan.md
// seed: tests/custom-seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Section & Link Validation', () => {
  test('Section contains invalid link format', async ({ page }) => {
    test.setTimeout(120000);
    // 1. Simulate or locate a section with an invalid link format and attempt to click.
    await page.goto('https://www.ozbargain.com.au/');
    await page.waitForSelector('main');

    // expect: Invalid links are not clickable or display an error message; no application crash.
    const invalidLink = page.locator('a[href=""]');
    await expect(invalidLink).toBeVisible();
    await invalidLink.click();
    await expect(page.locator('.error-message')).toBeVisible();
  });
});