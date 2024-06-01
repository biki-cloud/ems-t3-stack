# event-matching-service

## 開発
```bash
# ローカルで起動
$ npm run dev

# DB情報をDBに書き込む
$ npx prisma db push

# DB初期化コマンド
$ npx prisma db execute --file rm_data.sql && npx prisma db push
```

## supabase
[T3 Stack で Supabase をセットアップする](https://zenn.dev/yu_undefined/articles/f799ea05167621)

## google auth
[NextAuth.jsでNext.js13にGoogle認証機能を実装](https://zenn.dev/hayato94087/articles/91179fbbe1cad4)

## stripe導入
```
4242 4242 4242 4242
```
- [[Next.js + Stripe] Stripeで簡単にオンライン決済を実装しよう](https://zenn.dev/knagano/articles/zenn-article-9)
- [Stripe ElementとNext.jsを利用して、クレジットカードの登録画面を構築する #JavaScript - Qiita](https://qiita.com/hideokamoto/items/cef6eaa1c62ae6cb728d)
- [Next.js 14 App router で動かす、Stripe Subscription Starter のハンズオン。 #GitHub - Qiita](https://qiita.com/masakinihirota/items/33cdd1f9cb1276211bdf#stripe%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%83%BC%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%AB%E3%81%AE%E8%A8%AD%E5%AE%9A)
- https://zenn.dev/hathle/books/t3-stack-subscription-book
- [Stripe WebhookのデバッグをStripe CLIで行う](https://zenn.dev/hideokamoto/books/e961b4bad92429/viewer/fcc60a)

## vercel
- [System Environment Variables Overview](https://vercel.com/docs/projects/environment-variables/system-environment-variables)

## cloudinary
[【Web Library】Nextjs13で覚える便利なライブラリ【#１８Cloudinary SetUp】](https://zenn.dev/web_life_ch/articles/f3499dcfddba8b)

## 参考GitHub
- [haruyasu/t3-stack-deploy-tutorial](https://github.com/haruyasu/t3-stack-deploy-tutorial)
- [[完全版] T3 Stack入門！デプロイまで実践するサブスクアプリ構築マスターガイド - YouTube](https://www.youtube.com/watch?v=EVjx7lAu0XQ&t=506s)