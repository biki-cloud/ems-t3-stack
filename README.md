# event-matching-service

![Vercel](https://vercelbadge.vercel.app/api/biki-cloud/ems-t3-stack)

# ローカル開発

```bash
# ローカルで起動
$ npm run dev

# プリズマスタジオの起動
$ npx prisma studio

# DBデータを初期化&リセット
$ npm run db-dev

# docs/ERD.pngを更新
$ ./node_modules/.bin/mmdc -i docs/ERD.md -o docs/ERD.png

# npmのリセット
$ npm cache clean --force && rm -rf node_modules package-lock.json && npm install

# Playwright
# 事前準備
$ export BASE_URL=https://www.sunnybe.online/
# コード生成
$ npx playwright codegen http://localhost:3000/
# テスト実行
$ npx playwright test
$ npx playwright test --reporter=allure-playwright
# テスト結果確認
$ allure generate allure-results -o allure-report --clean && allure open allure-report
```


## 技術スタック

### アーキテクチャ

<a href="https://create.t3.gg/" target="_blank">T3 Stack</a>

### 言語

<a href="https://nextjs.org/" target="_blank"><img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"></a>
<a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"></a>

### デザイン

<a href="https://tailwindcss.com/" target="_blank"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" /></a>
<a href="https://ui.shadcn.com/" target="_blank"><img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white"></a>

### デプロイメント

<a href="https://vercel.com/" target="_blank"><img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"></a>

### DB

<a href="https://supabase.com/" target="_blank"><img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white"></a>

### ファイルストレージ

<a href="https://cloudinary.com/" target="_blank"><img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white"></a>

### CI/CD

<a href="https://docs.github.com/ja/actions" target="_blank"><img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white"></a>

### E2E

<a href="https://playwright.dev/" target="_blank"><img src="https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white"></a>

# TODO

- ESlintを導入
- イベントの並べ方はもう少しかっこよくできないか？
  - youtubeみたいな感じが良さそう, スマホとPCを真似る
- 出店者検索
- 消費者検索

## プレリリースまでやること

- 自前でsupabaseのバックアップ機能を作成
- 開発用と本番用のDBを用意
