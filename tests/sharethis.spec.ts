import { test, expect } from '@playwright/test';

const SHARETHIS_HOME = 'https://sharethis.com/';

test.describe('ShareThis homepage', () => {
  test('Website tools CTA navigates to Platform page', async ({ page }) => {
    await page.goto(SHARETHIS_HOME);

    const getFreeToolsLink = page.getByRole('link', { name: 'Get Free Tools' });
    await expect(getFreeToolsLink).toBeVisible();

    await getFreeToolsLink.click();

    await expect(page).toHaveURL(/\/platform(\/|$)/);
  });

  test('Data solutions CTA navigates to Data page', async ({ page }) => {
    await page.goto(SHARETHIS_HOME);

    const exploreDataLink = page.getByRole('link', { name: 'Explore ShareThis Data' });
    await expect(exploreDataLink).toBeVisible();

    await exploreDataLink.click();

    await expect(page).toHaveURL(/\/data(\/|$)/);
  });

  test('Act On What’s Trending Now Learn More CTA goes to Insights', async ({ page }) => {
    await page.goto(SHARETHIS_HOME);

    const insightsLearnMoreLink = page.locator('a[href*="/insights/"]', { hasText: 'Learn More' }).first();
    await expect(insightsLearnMoreLink).toBeVisible();

    await insightsLearnMoreLink.click();

    await expect(page).toHaveURL(/\/insights\//);
  });

  test('Footer Stay in touch Subscribe link opens subscription page', async ({ page }) => {
    await page.goto(SHARETHIS_HOME);

    const stayInTouchHeading = page.getByRole('heading', { name: /Stay in touch/i });
    await expect(stayInTouchHeading).toBeVisible();

    const subscribeLink = page.getByRole('link', { name: 'Subscribe' });
    await expect(subscribeLink).toBeVisible();

    await subscribeLink.click();

    await expect(page).toHaveURL(/\/subscribe\//);

    const emailInput = page.getByPlaceholder(/email/i).first().or(page.getByRole('textbox').first());
    await expect(emailInput).toBeVisible();
  });

  test('Footer Website Tools Share Buttons link navigates and shows share icons', async ({ page }) => {
    await page.goto(SHARETHIS_HOME);

    const shareButtonsLink = page.getByRole('link', { name: 'Share Buttons' });
    await expect(shareButtonsLink).toBeVisible();

    await shareButtonsLink.click();

    await expect(page).toHaveURL(/\/platform\/share-buttons\//);

    const facebookIcon = page.locator('img[alt="facebook sharing button"]');
    await expect(facebookIcon.first()).toBeVisible();
  });
});
