// spec: specs/ozbargain-sections-links.plan.md
// seed: tests/custom-seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Section & Link Validation', () => {
  test('Section contains duplicate entries', async ({ page }) => {
    test.setTimeout(120000);
    // 1. Simulate or locate a section with duplicate entries.
    await page.goto('https://www.ozbargain.com.au/');
    await page.waitForSelector('main');

    // expect: Section displays duplicate entries without breaking layout; duplicates are handled as per business rules.
    const items = await page.locator('.duplicate-entry').allTextContents();
    const uniqueItems = new Set(items);
    expect(items.length).toBeGreaterThan(uniqueItems.size);
    await expect(page.locator('.duplicate-entry')).toBeVisible();
  });
});