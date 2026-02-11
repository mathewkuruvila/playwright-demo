// spec: specs/ozbargain-sections-links.plan.md
// seed: tests/custom-seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Section & Link Validation', () => {
  test('All section links are functional', async ({ page }) => {
    test.setTimeout(120000);
    // 1. Click each link in all main sections and verify the destination loads successfully.
    await page.goto('https://www.ozbargain.com.au/');
    await page.waitForSelector('main');

    const sectionLinks = await page.locator('main a').all();

    for (const link of sectionLinks) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('javascript:')) {
        const [newPage] = await Promise.all([
          page.waitForEvent('popup'),
          link.click({ button: 'middle' }),
        ]);
        await expect(newPage).not.toHaveURL(/404|error/i);
        await newPage.close();
      }
    }
  });
});