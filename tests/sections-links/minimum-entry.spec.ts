// spec: specs/ozbargain-sections-links.plan.md
// seed: tests/custom-seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Section & Link Validation', () => {
  test('Section contains only one entry', async ({ page }) => {
    test.setTimeout(120000);
    // 1. Simulate or locate a section with only one entry.
    await page.goto('https://www.ozbargain.com.au/');
    await page.waitForSelector('main');

    // expect: Section displays single entry correctly; no layout or functional issues.
    const singleEntry = page.locator('.single-entry');
    await expect(singleEntry).toBeVisible();
    const count = await page.locator('.single-entry').count();
    expect(count).toBe(1);
  });
});