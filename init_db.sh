npx prisma db execute --file rm_data.sql &&
npx prisma generate &&
npx prisma migrate dev --name init &&
npx prisma db push