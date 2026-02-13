import { test, expect } from '@playwright/test';

const WOOLWORTHS_HOME = 'http://www.woolworths.com.au/';

// Scenarios are designed so they can be exercised via playwright-cli
// (open, goto, click, fill, press, etc.) using real role/text/attribute selectors.

test.describe('Woolworths homepage - header, footer and search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(WOOLWORTHS_HOME);
  });

  test('Search for "milk" navigates to search results', async ({ page }) => {
    const searchBox = page.getByRole('combobox', { name: /Search products, recipes and ideas/i });
    await expect(searchBox).toBeVisible();

    await searchBox.fill('milk');
    await searchBox.press('Enter');

    await expect(page).toHaveURL(/\/shop\/search/i);
    await expect(page.getByText(/results/i)).toBeVisible();
  });

  test('Search for a known brand product (e.g. "Weet-Bix") shows matching items', async ({ page }) => {
    const searchBox = page.getByRole('combobox', { name: /Search products, recipes and ideas/i });
    await expect(searchBox).toBeVisible();

    await searchBox.fill('Weet-Bix');
    await searchBox.press('Enter');

    await expect(page).toHaveURL(/\/shop\/search/i);
    await expect(page.getByText(/Weet[- ]?Bix/i)).toBeVisible();
  });

  test('Search for a nonsense term shows a no-results state', async ({ page }) => {
    const searchBox = page.getByRole('combobox', { name: /Search products, recipes and ideas/i });
    await expect(searchBox).toBeVisible();

    await searchBox.fill('zzzznonexistentproduct');
    await searchBox.press('Enter');

    await expect(page).toHaveURL(/\/shop\/search/i);
    await expect(page.getByText(/no results|couldn\'t find any results/i)).toBeVisible();
  });

  test('Header shows logo, search, Specials & catalogue, and Everyday & Other Services', async ({ page }) => {
    const logoLink = page.getByRole('link', { name: /woolworths/i });
    await expect(logoLink).toBeVisible();

    const searchBox = page.getByRole('combobox', { name: /Search products, recipes and ideas/i });
    await expect(searchBox).toBeVisible();

    const specialsButton = page.getByRole('button', { name: 'Specials & catalogue' });
    await expect(specialsButton).toBeVisible();

    const servicesButton = page.getByRole('button', { name: 'Everyday & Other Services' });
    await expect(servicesButton).toBeVisible();
  });

  test('Specials & catalogue header flyout shows Catalogue option', async ({ page }) => {
    const specialsButton = page.getByRole('button', { name: 'Specials & catalogue' });
    await specialsButton.click();

    const catalogueLink = page.getByText('Catalogue', { exact: true }).nth(0);
    await expect(catalogueLink).toBeVisible();
  });

  test('Everyday & Other Services flyout lists partner tiles', async ({ page }) => {
    const servicesButton = page.getByRole('button', { name: 'Everyday & Other Services' });
    await servicesButton.click();

    const partnersLocator = page.locator("//section[@class='wx-header__everyday-partners-list']/a/img");
    await expect(partnersLocator.first()).toBeVisible();
  });

  test('Everyday & Other Services flyout Big W partner opens in a new tab', async ({ page }) => {
    const servicesButton = page.getByRole('button', { name: 'Everyday & Other Services' });
    await servicesButton.click();

    const partnersLocator = page.locator("//section[@class='wx-header__everyday-partners-list']/a/img");
    const bigWTile = partnersLocator.filter({ has: page.locator('img[alt="Big W"]') });

    const pagePromise = page.context().waitForEvent('page');
    await bigWTile.first().click();
    const newPage = await pagePromise;

    await newPage.waitForLoadState('load');
    await expect(newPage).toHaveTitle(/Big W/i);
    await newPage.close();
  });

  test('Header cart icon is visible and clickable', async ({ page }) => {
    const cartButton = page.getByRole('button', { name: /cart|trolley/i });
    await expect(cartButton).toBeVisible();

    await cartButton.click();
    await expect(page.getByText(/cart|trolley/i)).toBeVisible();
  });

  test('Footer contains key informational links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    await expect(footer.getByRole('link', { name: /contact us/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /privacy/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /terms/i })).toBeVisible();
  });

  test('Footer social or app download links are present', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    await expect(footer.getByRole('link', { name: /facebook|instagram|twitter|app store|google play/i })).toBeVisible();
  });
});
