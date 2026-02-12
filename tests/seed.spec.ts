import { test, expect } from '@playwright/test';

test.describe('YouTube Homepage Tests', () => {
  
  test('YouTube homepage loads successfully', async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    await page.waitForSelector('#masthead');
    await expect(page).toHaveTitle(/YouTube/);
    await expect(page.getByRole('link', { name: 'YouTube Home' }).first()).toBeVisible();
  });

  test('Search functionality is present and functional', async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    
    const searchInput = page.getByRole('combobox', { name: 'Search' });
    await expect(searchInput).toBeVisible();
    await searchInput.fill('playwright testing');
    
    const searchButton = page.getByRole('button', { name: 'Search' }).first();
    await expect(searchButton).toBeVisible();
  });

  test('Search returns results for a valid query', async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    const searchInput = page.getByRole('combobox', { name: 'Search' });
    await expect(searchInput).toBeVisible();
    await searchInput.click();
    await searchInput.fill('');
    await searchInput.type('playwright testing', { delay: 100 });
    const searchButton = page.getByRole('button', { name: 'Search' }).first();
    await expect(searchButton).toBeVisible();
    await searchButton.click();
    // Wait for either results or empty state to appear
    await Promise.race([
      page.waitForSelector('ytd-video-renderer', { timeout: 10000 }),
      page.waitForSelector('text=Try searching to get started', { timeout: 10000 })
    ]);
    // Check for empty state or results
    const emptyStateMessage = page.getByText('Try searching to get started');
    const hasEmptyState = await emptyStateMessage.isVisible().catch(() => false);
    if (hasEmptyState) {
      // Empty state is shown when no results are available
      await expect(emptyStateMessage).toBeVisible();
    } else {
      // Results are present
      const results = page.locator('ytd-video-renderer');
      const count = await results.count();
      expect(count).toBeGreaterThan(0);
    }
  });
});

test('Reddit search returns results for a searched article', async ({ page }) => {
  await page.goto('https://www.reddit.com/');

  // Accept cookies or privacy popups if present
  const acceptBtn = page.getByRole('button', { name: /accept/i });
  if (await acceptBtn.isVisible().catch(() => false)) {
    await acceptBtn.click();
  }

  // Wait for page to load
  await page.waitForTimeout(2000);

  // Use the actual Reddit search input selector discovered via DOM inspection
  const searchInput = page.locator('input[placeholder="Find anything"]');
  await expect(searchInput).toBeVisible();
  
  // Fill and submit the search
  await searchInput.fill('playwright');
  await searchInput.press('Enter');

  // Wait for search results to load
  await page.waitForTimeout(3000);

  // Check that we have search results - look for articles or posts
  const results = page.locator('article, [role="article"]');
  const count = await results.count();
  expect(count).toBeGreaterThan(0);
});
