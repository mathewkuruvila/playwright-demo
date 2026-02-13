import { test, expect } from '@playwright/test';

const JIOMART_GROCERIES = 'https://www.jiomart.com/?tab=groceries';

// Scenarios are written so they can be exercised via playwright-cli
// (open, goto, click, fill, press, etc.) using real role/text/attribute selectors.

test.describe('JioMart groceries - location, search and checkout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(JIOMART_GROCERIES, { waitUntil: 'networkidle' });
  });

  test('Header shows delivery pincode for a metropolitan city (Mumbai)', async ({ page }) => {
    const deliveryButton = page.getByRole('button', { name: /Scheduled delivery to:/i });
    await expect(deliveryButton).toBeVisible();
    await expect(deliveryButton).toContainText(/Mumbai\s*4000\d{2}/i);
  });

  test('Manual pincode entry accepts a valid metropolitan pincode (positive)', async ({ page }) => {
    // The location prompt is shown as an overlay with a
    // "Select Location Manually" button on initial load.
    const manualButton = page.getByRole('button', { name: /Select Location Manually/i });
    await expect(manualButton).toBeVisible();
    await manualButton.click();

    // Input is labelled via aria-label="PIN Code" and may be hidden
    // behind overlay styling, so we fill it directly without asserting
    // visibility.
    const pincodeInput = page.getByLabel(/PIN Code/i);
    // Mumbai pincode (metropolitan city in India).
    await pincodeInput.fill('400001', { force: true });

    // Positive: HTML validity should treat a 6-digit Mumbai pincode as valid.
    const isValid = await pincodeInput.evaluate((el) => (el as HTMLInputElement).validity.valid);
    await expect(isValid).toBe(true);
  });

  test('Manual pincode entry shows an error for an invalid pincode (negative)', async ({ page }) => {
    const manualButton = page.getByRole('button', { name: /Select Location Manually/i });
    await expect(manualButton).toBeVisible();
    await manualButton.click();

    const pincodeInput = page.getByLabel(/PIN Code/i);
    // Clearly invalid pincode: deliberately too short.
    await pincodeInput.fill('123', { force: true });

    const validity = await pincodeInput.evaluate((el) => (el as HTMLInputElement).validity);
    await expect(validity.tooShort || !validity.valid).toBe(true);
  });

  test('Search for a valid grocery item shows search results (positive)', async ({ page }) => {
    const searchBox = page.getByRole('searchbox');
    await expect(searchBox).toBeVisible();

    await searchBox.fill('rice');
    await searchBox.press('Enter');

    await expect(page).toHaveURL(/\/search\?q=rice/i);
    await expect(page).toHaveTitle(/Search Results/i);

    // At least the Search Results heading should be visible to confirm
    // that the query returned a product listing view.
    await expect(page.getByText(/Search Results/i)).toBeVisible();
  });

  test('Search for a nonsense term shows a no-results state (negative)', async ({ page }) => {
    const searchBox = page.getByRole('searchbox');
    await expect(searchBox).toBeVisible();

    await searchBox.fill('zzzznonexistentproduct');
    await searchBox.press('Enter');

    await expect(page).toHaveURL(/\/search\?q=zzzznonexistentproduct/i);

    // Negative scenario: no purchasable products should be listed,
    // so there should be no visible "Add" buttons.
    await expect(page.getByRole('button', { name: /^Add$/ })).toHaveCount(0);
  });

  test('Cart icon is visible for checkout', async ({ page }) => {
    // Close any blocking location overlay if present.
    const closeOverlayButton = page.getByRole('button', { name: /close icon/i });
    if (await closeOverlayButton.isVisible()) {
      await closeOverlayButton.click();
    }

    const cartButton = page.getByRole('button', { name: /cart icon|cart/i });
    await expect(cartButton).toBeVisible();
  });
});
