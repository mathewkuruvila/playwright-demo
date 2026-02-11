// spec: specs/ozbargain-sections-links.plan.md
// seed: tests/custom-seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Section & Link Validation', () => {
  test('Section contains broken link', async ({ page }) => {
    // 1. Simulate or locate a section with a broken link and click it.
    test.setTimeout(120000);
    await page.goto('https://www.ozbargain.com.au/');
    await page.waitForSelector('main');

    // expect: Broken links display an error or redirect to a 404 page; error is handled gracefully.
    const brokenLink = page.locator('a[href*="broken-link"]');
    await brokenLink.click();
    await expect(page).toHaveURL(/404|error/i);
    await expect(page.locator('body')).toHaveText(/not found|error/i);
  });
});