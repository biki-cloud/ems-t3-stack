import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL;

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(3000); // 5秒待機
});

let event_titles = [
  "セルゲーム開催します！！",
  "ビルス様と修行！！",
  "一緒に重力１００倍で修行しませんか？",
  "天下一武闘会やります。",
  "一緒に特訓しませんか？",
];

test.describe("Search Event", () => {
  test("search event by word", async ({ page }) => {
    await expect(page).toHaveTitle("イベントマッチングサービス");

    // イベント一覧表示でイベント名が全て表示されているか確認
    for (const event of event_titles) {
      await expect(await page.getByText(event)).toBeVisible();
    }

    // イベント名で検索
    await page.getByPlaceholder("イベント名").click();
    await page.getByPlaceholder("イベント名").fill("セル");
    await page.getByRole("button", { name: "検索" }).click();
    await expect(await page.getByText("セルゲーム開催します！！")).toBeVisible();
    await expect(await page.getByText("ビルス様と修行！！")).toBeHidden();

    // イベント名をクリックして詳細を表示
    await page.getByRole("link", { name: "セルゲーム開催します！！" }).click();
    await expect(await page.getByText("内容")).toBeVisible();
    await expect(await page.getByText("ナメック星人参加可！！")).toBeVisible();
  });
});
