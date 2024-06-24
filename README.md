# event-matching-service

![Vercel](https://vercelbadge.vercel.app/api/biki-cloud/ems-t3-stack)


## サービス
[event-matching-service](ems-t3-stack.vercel.app)

# ローカル開発
```bash
# ローカルで起動
$ npm run dev

# プリズマスタジオの起動
$ npx prisma studio

# stripeのwebhookを起動
$ stripe listen --forward-to localhost:3000/api/webhook

# DBデータを初期化&リセット
$ ./init_db.sh

# docs/ERD.pngを更新
$ ./node_modules/.bin/mmdc -i docs/ERD.md -o docs/ERD.png

# npmのリセット
$ npm cache clean --force && rm -rf node_modules package-lock.json && npm install

# Playwright
$ export BASE_URL=https://www.sunnybe.online/
$ npx playwright test
$ npx playwright codegen http://localhost:3000/
```

## 技術スタック

### アーキテクチャ: T3 Stack
- [Create T3 App](https://create.t3.gg/)

### 言語(フロントエンド&バックエンド)
<img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">

- [Next.js by Vercel - The React Framework](https://nextjs.org/)
- [TypeScript: JavaScript With Syntax For Types.](https://www.typescriptlang.org/)

### デザイン
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" /> <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white">

- https://ui.shadcn.com/docs/components
- https://v0.dev/
- shadcnを使用したFigmaのデザイン: https://www.figma.com/community/file/1203061493325953101

### デプロイメント
<img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white">

デプロイに使用する
### ドキュメント
- [System Environment Variables Overview](https://vercel.com/docs/projects/environment-variables/system-environment-variables)

### DB
<img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white">

クラウドのDB

#### ドキュメント
[T3 Stack で Supabase をセットアップする](https://zenn.dev/yu_undefined/articles/f799ea05167621)


### オンライン決済
<img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white">

オンライン決済を提供する

#### テストクレジットカードの内容
- 番号: 4242 4242 4242 4242
- 期限: 未来の値
- ３桁の番号: 適当な３桁の番号

#### ドキュメント
- [Stripe のドキュメント](https://docs.stripe.com/)
- [[Next.js + Stripe] Stripeで簡単にオンライン決済を実装しよう](https://zenn.dev/knagano/articles/zenn-article-9)
- [Stripe ElementとNext.jsを利用して、クレジットカードの登録画面を構築する #JavaScript - Qiita](https://qiita.com/hideokamoto/items/cef6eaa1c62ae6cb728d)
- [Next.js 14 App router で動かす、Stripe Subscription Starter のハンズオン。 #GitHub - Qiita](https://qiita.com/masakinihirota/items/33cdd1f9cb1276211bdf#stripe%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%83%BC%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%AB%E3%81%AE%E8%A8%AD%E5%AE%9A)
- https://zenn.dev/hathle/books/t3-stack-subscription-book
- [Stripe WebhookのデバッグをStripe CLIで行う](https://zenn.dev/hideokamoto/books/e961b4bad92429/viewer/fcc60a)


### メディアファイル保存: 
<img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white">

クラウドに画像や動画を保存する

#### ドキュメント
- [【Web Library】Nextjs13で覚える便利なライブラリ【#１８Cloudinary SetUp】](https://zenn.dev/web_life_ch/articles/f3499dcfddba8b)


### ドメイン設定
- [Vercelにお名前.comで取得したドメインをカスタムドメインとして設定する | ZUMA Lab](https://zuma-lab.com/posts/vercel-onamae-domain-settings)

### Github Actions
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white">

- https://vercel.com/guides/how-can-i-run-end-to-end-tests-after-my-vercel-preview-deployment

### PlayWright
<img src="https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white">

- https://playwright.dev/docs/intro
- https://playwright.dev/docs/ci-intro

## その他
- [haruyasu/t3-stack-deploy-tutorial](https://github.com/haruyasu/t3-stack-deploy-tutorial)
- [[完全版] T3 Stack入門！デプロイまで実践するサブスクアプリ構築マスターガイド - YouTube](https://www.youtube.com/watch?v=EVjx7lAu0XQ&t=506s)
- [アイコン](https://github.com/Ileriayo/markdown-badges)

# TODO
- プロジェクトの理解
- 頻繁に使うパーツをコンポーネントにする
  - パーツに必要な情報はプロップスを渡す形になる
  - components/utils/aicon.tsxみたいなイメージ
  - 頻繁に仕様するパーツ
    - ユーザプロフィールへのリンクになっているアイコン + 名前
    - 情報入力,編集(名前:入力欄)
    - 情報表示(名前：値)
- ESlintを導入
- 主催者の自己紹介ページやプロフィールに投稿一覧(/author/xxx)のリンクを貼る
- 出店者検索
- 消費者検索
- playwrightの導入。BASE_URLを読み込むやり方。githubactionsで動かす. playwrightのgithubバッチも追加したい。
- イベントの並べ方はもう少しかっこよくできないか？
  - youtubeみたいな感じが良さそう, スマホとPCを真似る
  - PCの場合のみサイドバー. サイドバーと同じ項目をスマホの場合は右上のユーザ欄に入れるか
## プレリリースまでやること
- 自前でsupabaseのバックアップ機能を作成 
- 開発用と本番用のDBを用意

## Next JS お勉強
### クライアントコンポーネント
- 'use client'を付けた場合のみクライアントコンポーネントして判断される。それ以外は全てサーバコンポーネント。
- クライアントサイドで実行される: クライアントコンポーネントはブラウザ上で実行され、ユーザーインターフェイスのインタラクティブな部分を担当します。
- クライアントコンポーネントでのみReact Hookを使用できる。
- サーバーサイドのコード実行不可: サーバーサイド専用のコード（例えば、データベースクエリやファイルシステム操作など）は実行できません。
- クライアントコンポーネントではtrpc.event.getEvents.useQueryやtrpc.event.getEvents.useMutationをReact Hooksとともに利用するとよき！！

### サーバサイドコンポーネント
- サーバーサイドのデータフェッチ: データベースクエリや外部APIの呼び出しなど、サーバーサイドの処理を直接行うことができます。

