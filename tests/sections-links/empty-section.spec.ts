// spec: specs/ozbargain-sections-links.plan.md
// seed: tests/custom-seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Section & Link Validation', () => {
  test('Section displays empty data', async ({ page }) => {
    test.setTimeout(120000);
    // 1. Simulate or locate a section with empty data.
    await page.goto('https://www.ozbargain.com.au/');
    await page.waitForSelector('main');

    // expect: Section displays a user-friendly message or placeholder when data is empty; no errors occur.
    const emptySection = page.locator('.empty-section');
    await expect(emptySection).toBeVisible();
    await expect(emptySection).toHaveText(/no data|empty|nothing to display/i);
  });
});