# DBのデータを削除し、初期化を行う
npx prisma db execute --file rm_data.sql &&

# schema.prismaを元にprismaクライアントファイルを作成. migrateコマンドの中で実行されているかも 
# npx prisma generate &&

# Prismaスキーマファイルに基づいたマイグレーションをデータベースに適用します。initという名前でマイグレーションが作成されます。
npx prisma migrate dev --name init &&

# Prismaスキーマをデータベースにプッシュし、最新の状態にします。
npx prisma db push

# データベースに初期データを投入します
npx prisma db seed
