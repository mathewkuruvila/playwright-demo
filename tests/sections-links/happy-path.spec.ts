// spec: specs/ozbargain-sections-links.plan.md
// seed: tests/custom-seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Section & Link Validation', () => {
  test('Main sections display valid data', async ({ page }) => {
    test.setTimeout(120000);
    // 1. Navigate to the home page.
    await page.goto('https://www.ozbargain.com.au/');
    await page.waitForSelector('main');

    // expect: All main sections are visible and populated with valid (non-empty, non-placeholder) data.
    const sectionSelectors = [
      '#node-1', // Example: Deals section
      '#node-2', // Example: Forums section
      '#node-3', // Example: Wiki section
    ];

    for (const selector of sectionSelectors) {
      const section = page.locator(selector);
      await expect(section).toBeVisible();
      const text = await section.textContent();
      expect(text && text.trim().length > 0).toBeTruthy();
      expect(text).not.toMatch(/placeholder|lorem ipsum/i);
    }
  });
});