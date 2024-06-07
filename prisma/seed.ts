import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: 'organizer1@example.com',
      hashedPassword: await bcrypt.hash('password', 12),
      name: 'イベント主催者1',
      role: 'organizer',
      isAdmin: true
    },
  });

  await prisma.organizer.create({
    data: {
      userId: user1.id,
      organizationName: "organizer-" + user1.id
    },
  })

  const event = await prisma.event.create({
    data: {
      userId: user1.id,
      title: 'スイーツパラダイス',
      content: 'スイーツが大好きな方、集まれ！',
      location: '東京都渋谷区',
      image: 'https://res.cloudinary.com/du8k76ffm/image/upload/v1717750265/t3stackblog/wqvmtfc4cq2di7cbwz8c.jpg'
    }
  })

  const comment = await prisma.comment.create({
    data: {
      userId: user1.id,
      eventId: event.id,
      content: 'スイーツが大好きです！'
    },
  })
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