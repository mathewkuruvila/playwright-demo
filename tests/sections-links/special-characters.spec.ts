// spec: specs/ozbargain-sections-links.plan.md
// seed: tests/custom-seed.spec.ts


import { test, expect } from '@playwright/test';


test.describe('Section & Link Validation', () => {
  test('Section contains special characters or long text', async ({ page }) => {
    test.setTimeout(60000);
    // 1. Simulate or locate a section with special characters or long text.
    await page.goto('https://www.ozbargain.com.au/');
    await page.waitForSelector('main');

    // Wait for the special section to appear (up to 30s)
    const specialSection = page.locator('.special-characters');
    await expect(specialSection, 'Special characters section should be visible').toBeVisible({ timeout: 30000 });

    // Check for special characters or long text
    const text = await specialSection.textContent();
    expect(text, 'Section should contain special characters or long text').toMatch(/[@#$%^&*()_+]|.{100,}/);
  });
});
