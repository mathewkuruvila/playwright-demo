// spec: specs/ozbargain-sections-links.plan.md
// seed: tests/custom-seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Section & Link Validation', () => {
  test('Section loads slowly', async ({ page }) => {
    test.setTimeout(120000);
    // 1. Simulate slow loading for a section and observe behavior.
    await page.goto('https://www.ozbargain.com.au/');
    await page.waitForSelector('main');

    // expect: Section displays loading indicator or message; no UI freeze or crash.
    const loadingIndicator = page.locator('.loading-indicator');
    await expect(loadingIndicator).toBeVisible();
    await expect(page).not.toHaveText(/crash|unresponsive/i);
  });
});