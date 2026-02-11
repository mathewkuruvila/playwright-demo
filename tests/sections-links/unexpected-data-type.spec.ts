// spec: specs/ozbargain-sections-links.plan.md
// seed: tests/custom-seed.spec.ts

import { test, expect } from '@playwright/test';


  
  test('Section contains unexpected data type', async ({ page }) => {
    test.setTimeout(120000);
    // 1. Simulate or locate a section with incorrect data type (e.g., string instead of number).
    await page.goto('https://www.ozbargain.com.au/');
    await page.waitForSelector('main');

    // expect: Section handles unexpected data types gracefully, displaying a fallback or error message.
    const errorSection = page.locator('.data-type-error');
    await expect(errorSection).toBeVisible();
    await expect(errorSection).toHaveText(/error|invalid|fallback/i);
  });
