import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL;

test('verify title of the page', async ({ page }) => {
  if (!BASE_URL) {
    throw new Error('URL is not provided');
  }
  await page.goto(BASE_URL);

  await expect(page).toHaveTitle('イベントマッチングサービス');

});