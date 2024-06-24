import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL;

test.beforeEach(async ({ page }) => {
  if (!BASE_URL) {
    throw new Error('URL is not provided');
  }
  await page.goto(BASE_URL);
});

test.describe('Search Event', () => {
  test('search event by word', async ({ page }) => {
    await expect(page).toHaveTitle('イベントマッチングサービス');
    // const search = page.getByPlaceholder('イベント名');
    // await search.fill("セル");

    // const searchButton = page.getByRole('button', { name: '検索' });
    // await searchButton.click();

    // // イベントのリストを取得
    // const eventList = await page.locator('div:has-text("イベント一覧")').locator('li');

    // // イベントの数をアサート
    // const eventCount = await eventList.count();
    // expect(eventCount).toBe(4);  // 期待されるイベントの数を設定
  })
});