import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: "organizer1@example.com",
      hashedPassword: await bcrypt.hash("password", 12),
      name: "イベント主催者1",
      role: "organizer",
      isAdmin: true,
    },
  });

  await prisma.organizer.create({
    data: {
      userId: user1.id,
      organizationName: "organizer-" + user1.id,
    },
  });

  const event1 = await prisma.event.create({
    data: {
      userId: user1.id,
      title: "スイーツパラダイス",
      content: "スイーツが大好きな方、集まれ！",
      location: "東京都渋谷区",
      image:
        "https://res.cloudinary.com/du8k76ffm/image/upload/v1717750265/t3stackblog/wqvmtfc4cq2di7cbwz8c.jpg",
    },
  });

  const event2 = await prisma.event.create({
    data: {
      userId: user1.id,
      title: "潮干狩り",
      content: "潮干狩りを楽しもう！",
      location: "千葉県木更津市",
      image:
        "https://res.cloudinary.com/du8k76ffm/image/upload/v1717750931/t3stackblog/oigdvvjw1fs9c1zdsysl.jpg",
      premium: true,
    },
  });

  const comment = await prisma.comment.create({
    data: {
      userId: user1.id,
      eventId: event1.id,
      content: "スイーツが大好きです！",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "organizer2@example.com",
      hashedPassword: await bcrypt.hash("password", 12),
      name: "イベント主催者2",
      role: "organizer",
      isAdmin: true,
    },
  });

  await prisma.organizer.create({
    data: {
      userId: user2.id,
      organizationName: "organizer-" + user1.id,
    },
  });

  const event3 = await prisma.event.create({
    data: {
      userId: user2.id,
      title: "フラワー鑑賞",
      content: "フラワーが大好きな方、集まれ！",
      location: "千葉県",
      image:
        "https://res.cloudinary.com/du8k76ffm/image/upload/v1717751149/t3stackblog/bjwk0ypuhpii2mc5bq6p.jpg",
      premium: false,
    },
  });

  const user4 = await prisma.user.create({
    data: {
      email: "vendor@example.com",
      hashedPassword: await bcrypt.hash("password", 12),
      name: "イベント出店者1",
      role: "vendor",
      isAdmin: true,
    },
  });

  await prisma.vendor.create({
    data: {
      userId: user4.id,
      vendorName: "vendor-" + user1.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      userId: user4.id,
      eventId: event2.id,
      content: "潮干狩りよき！",
    },
  });

  const user6 = await prisma.user.create({
    data: {
      email: "customer1@example.com",
      hashedPassword: await bcrypt.hash("password", 12),
      name: "イベント参加者1",
      role: "customer",
    },
  });

  const customer1 = await prisma.customer.create({
    data: {
      userId: user6.id,
      CustomerName: "customer-" + user6.id
    },
  });
  await prisma.comment.create({
    data: {
      userId: user6.id,
      eventId: event1.id,
      content: "スイーツ食べたい！",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
