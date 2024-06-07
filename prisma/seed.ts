import bcrypt from "bcrypt";
import { Event, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser(
  email: string,
  name: string,
  role: string,
  image: string,
  isAdmin = false,
) {
  return await prisma.user.create({
    data: {
      email,
      hashedPassword: await bcrypt.hash("password", 12),
      name,
      role,
      isAdmin,
      image,
    },
  });
}

async function createOrganizer(user: User) {
  return await prisma.organizer.create({
    data: {
      userId: user.id,
      organizationName: "organizer-" + user.id,
    },
  });
}

async function createVendor(user: User) {
  return await prisma.vendor.create({
    data: {
      userId: user.id,
      vendorName: "vendor-" + user.id,
    },
  });
}

async function createCustomer(user: User) {
  return await prisma.customer.create({
    data: {
      userId: user.id,
      customerName: "customer-" + user.id,
    },
  });
}

async function createEvent(
  user: User,
  title: string,
  content: string,
  location: string,
  image: string,
  premium = false
) {
  return await prisma.event.create({
    data: {
      userId: user.id,
      title,
      content,
      location,
      image,
      premium,
    },
  });
}

async function createComment(user: User, event: Event, content: string) {
  return await prisma.comment.create({
    data: {
      userId: user.id,
      eventId: event.id,
      content,
    },
  });
}

async function main() {
  const organizer1 = await createUser(
    "organizer1@example.com",
    "イベント主催者1",
    "organizer",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717763104/t3stackblog/zztfp01ft3okcun69hyk.png",
    true
  );
  await createOrganizer(organizer1);
  const event1 = await createEvent(
    organizer1,
    "スイーツパラダイス",
    "スイーツが大好きな方、集まれ！",
    "東京都渋谷区",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717750265/t3stackblog/wqvmtfc4cq2di7cbwz8c.jpg"
  );
  const event4 = await createEvent(
    organizer1,
    "天下一舞踏会やります。",
    "サイヤ人に関わらず参加可能",
    "ナメック星",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717763665/t3stackblog/tdhls4hoppcf85wifgxr.jpg",
  );


  const organizer2 = await createUser(
    "organizer2@example.com",
    "イベント主催者2",
    "organizer",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717763204/t3stackblog/bh7c3mnntuvnbccizepx.png",
    true
  );
  await createOrganizer(organizer2);
  const event2 = await createEvent(
    organizer2,
    "フラワー鑑賞",
    "フラワーが大好きな方、集まれ！",
    "千葉県",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717751149/t3stackblog/bjwk0ypuhpii2mc5bq6p.jpg"
  );
  const event3 = await prisma.event.create({
    data: {
      userId: organizer2.id,
      title: "潮干狩り",
      content: "潮干狩りを楽しもう！",
      location: "千葉県木更津市",
      image:
        "https://res.cloudinary.com/du8k76ffm/image/upload/v1717750931/t3stackblog/oigdvvjw1fs9c1zdsysl.jpg",
      premium: true,
    },
  });

  const vendor1 = await createUser(
    "vendor@example.com",
    "イベント出店者1",
    "vendor",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717763250/t3stackblog/v10o9hjrdhlip0itkjdy.jpg"
  );
  await createVendor(vendor1);

  const customer1 = await createUser(
    "customer1@example.com",
    "イベント参加者1",
    "customer",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717763285/t3stackblog/mk1kdovvoc7zbcocideo.jpg"
  );
  await createCustomer(customer1);
  createComment(customer1, event1, "楽しみです！");
  createComment(vendor1, event1, "行きたいです！");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
