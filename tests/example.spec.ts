import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL;

test('verify title of the page', async ({ page }) => {
  if (!BASE_URL) {
    throw new Error('URL is not provided');
  }
  await page.goto(BASE_URL);
});

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
