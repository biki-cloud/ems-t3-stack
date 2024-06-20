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
```

## 技術スタック

### アーキテクチャ: T3 Stack
- [Create T3 App](https://create.t3.gg/)

### 言語(フロントエンド&バックエンド): NextJS & Typescript
- [Next.js by Vercel - The React Framework](https://nextjs.org/)
- [TypeScript: JavaScript With Syntax For Types.](https://www.typescriptlang.org/)

### デザイン: Tailwind CSS & Shadcn
- https://ui.shadcn.com/docs/components
- https://v0.dev/
- shadcnを使用したFigmaのデザイン: https://www.figma.com/community/file/1203061493325953101

### デプロイメント: Vercel
デプロイに使用する
### ドキュメント
- [System Environment Variables Overview](https://vercel.com/docs/projects/environment-variables/system-environment-variables)

### DB: Supabase
クラウドのDB

#### ドキュメント
[T3 Stack で Supabase をセットアップする](https://zenn.dev/yu_undefined/articles/f799ea05167621)

### 認証: Google Auth
google認証を追加する

#### ドキュメント
[NextAuth.jsでNext.js13にGoogle認証機能を実装](https://zenn.dev/hayato94087/articles/91179fbbe1cad4)

### オンライン決済: Stripe
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


### メディアファイル保存: Cloudinary
クラウドに画像や動画を保存する

#### ドキュメント
- [【Web Library】Nextjs13で覚える便利なライブラリ【#１８Cloudinary SetUp】](https://zenn.dev/web_life_ch/articles/f3499dcfddba8b)

## 参考GitHub
- [haruyasu/t3-stack-deploy-tutorial](https://github.com/haruyasu/t3-stack-deploy-tutorial)
- [[完全版] T3 Stack入門！デプロイまで実践するサブスクアプリ構築マスターガイド - YouTube](https://www.youtube.com/watch?v=EVjx7lAu0XQ&t=506s)

## ドメイン設定
- [Vercelにお名前.comで取得したドメインをカスタムドメインとして設定する | ZUMA Lab](https://zuma-lab.com/posts/vercel-onamae-domain-settings)


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
## リリースまでやること
- イベントの並べ方はもう少しかっこよくできないか？
  - youtubeみたいな感じが良さそう, スマホとPCを真似る
  - PCの場合はサイドバー
    - [react-device-detectでPC/モバイル判定を行う](https://sunday-morning.app/posts/2021-05-13-react-device-detect-pc-mobile)
- 出店者検索
- 消費者検索
- 消費者はログインだけ
- 出店者プロフィールページ
- 主催者プロフィールページ
- 自前でsupabaseのバックアップ機能を作成 
- 開発用と本番用のDBを用意
- isSubscribedとか削除する

## Next JS お勉強
### クライアントコンポーネント
- 'use client'を付けた場合のみクライアントコンポーネントして判断される。それ以外は全てサーバコンポーネント。
- クライアントサイドで実行される: クライアントコンポーネントはブラウザ上で実行され、ユーザーインターフェイスのインタラクティブな部分を担当します。
- クライアントコンポーネントでのみReact Hookを使用できる。
- サーバーサイドのコード実行不可: サーバーサイド専用のコード（例えば、データベースクエリやファイルシステム操作など）は実行できません。
- クライアントコンポーネントではtrpc.event.getEvents.useQueryやtrpc.event.getEvents.useMutationをReact Hooksとともに利用するとよき！！

### サーバサイドコンポーネント
- サーバーサイドのデータフェッチ: データベースクエリや外部APIの呼び出しなど、サーバーサイドの処理を直接行うことができます。

