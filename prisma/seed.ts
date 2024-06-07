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
    "悟空(イベント主催者)",
    "organizer",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717763104/t3stackblog/zztfp01ft3okcun69hyk.png",
    true
  );
  await createOrganizer(organizer1);
  const event1 = await createEvent(
    organizer1,
    "一緒に特訓しませんか？",
    "特訓し放題！！仙豆もあります！！",
    "精神と時の部屋",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717764409/t3stackblog/sgiszgto0rtw1xbxfq8t.jpg"
  );
  const event2 = await createEvent(
    organizer1,
    "天下一舞踏会やります。",
    "サイヤ人に関わらず参加可能",
    "ナメック星",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717763665/t3stackblog/tdhls4hoppcf85wifgxr.jpg",
  );


  const organizer2 = await createUser(
    "organizer2@example.com",
    "ベジータ(イベント主催者)",
    "organizer",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717763204/t3stackblog/bh7c3mnntuvnbccizepx.png",
    true
  );
  await createOrganizer(organizer2);
  const event3 = await createEvent(
    organizer2,
    "一緒に重力１００倍で修行しませんか？",
    "サイヤ人限定！！",
    "カプセルコーポレーション",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717764654/t3stackblog/wknh9ycgcm7kqhq8q6a3.jpg"
  );
  const event4 = await createEvent(
    organizer2,
    "ビルス様と修行！！",
    "一緒にビルス様と修行しませんか？仙豆の配布はありません。",
    "天王神界",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717765058/t3stackblog/u9alrwb1gilbrefxslk3.jpg",
    true
  );

  const organizer3 = await createUser(
    "organizer3@example.com",
    "セル(イベント主催者)",
    "organizer",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717764286/t3stackblog/nsnyu06wavqme0haxxwj.jpg",
    true
  );
  await createOrganizer(organizer3);
  const event5 = await prisma.event.create({
    data: {
      userId: organizer3.id,
      title: "セルゲーム開催します！！",
      content: "ナメック星人参加可！！",
      location: "荒野",
      image:
        "https://res.cloudinary.com/du8k76ffm/image/upload/v1717764045/t3stackblog/whptjxwerknywkla9siw.jpg",
      premium: true,
    },
  });

  const vendor1 = await createUser(
    "vendor1@example.com",
    "フリーザ(イベント出店者)",
    "vendor",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717763250/t3stackblog/v10o9hjrdhlip0itkjdy.jpg"
  );
  await createVendor(vendor1);

  const vendor2 = await createUser(
    "vendor2@example.com",
    "ピッコロ(イベント出店者)",
    "vendor",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717767072/t3stackblog/mwylwmg459qk57jpqw8u.png"
  );
  await createVendor(vendor2);


  const customer1 = await createUser(
    "customer1@example.com",
    "亀仙人(イベント参加者)",
    "customer",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717763285/t3stackblog/mk1kdovvoc7zbcocideo.jpg"
  );
  await createCustomer(customer1);
  
  const customer2 = await createUser(
    "customer2@example.com",
    "トランクス(イベント参加者)",
    "customer",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717767214/t3stackblog/u5smgu6jqcvnavssbtb4.jpg"
  );
  await createCustomer(customer2);

  await createComment(customer1, event1, "楽しみです！");
  await createComment(vendor1, event1, "行きたいです！");
  await createComment(customer1, event2, "天下一舞踏会、期待しています！");
  await createComment(customer1, event3, "重力100倍の修行、挑戦してみたいです！");
  await createComment(organizer2, event4, "ビルス様との修行、皆さん頑張ってください！");
  await createComment(organizer1, event2, "多くの参加者をお待ちしています！");
  await createComment(vendor1, event4, "ビルス様との修行、商品も準備しています！");
  await createComment(customer1, event4, "ビルス様と修行できるなんて夢のようです！");
  await createComment(organizer3, event5, "セルゲーム、是非参加してください！");
  await createComment(vendor1, event5, "セルゲームのために特別な商品を用意しました！");
  await createComment(customer2, event5, "セルゲーム、楽しみにしています！");
  await createComment(customer2, event4, "ビルス様との修行、すごく楽しみです！");
  await createComment(vendor2, event3, "商品の準備が整いました！");
  await createComment(organizer1, event1, "イベントの成功を祈っています！");
  await createComment(customer1, event5, "セルゲーム、勝つぞ！");
  await createComment(vendor2, event2, "舞踏会のための特別なアイテムを用意しました！");
  await createComment(organizer2, event3, "修行イベント、皆さんをお待ちしています！");
  await createComment(customer2, event2, "舞踏会、ダンスの練習をしています！");
  await createComment(vendor1, event2, "舞踏会での出店、楽しみにしています！");
  await createComment(organizer3, event5, "セルゲーム、最高のイベントにします！");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
