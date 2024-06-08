import bcrypt from "bcrypt";
import { Event, PrismaClient, User, Vendor } from "@prisma/client";

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

async function createEventParticipationRequest(vendor: Vendor, event: Event, status: string) {
  return await prisma.eventParticipationRequest.create({
    data: {
      eventId: event.id,
      vendorId: vendor.id,
      status: status
    },
  });
}

async function main() {
  const organizer1 = await createUser(
    "organizer1@example.com",
    "悟空(イベント主催者1)",
    "organizer",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717796891/t3stackblog/g1hovgwweezqr3uvfmjf.png",
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
    "天下一武闘会やります。",
    "サイヤ人に関わらず参加可能",
    "ナメック星",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717763665/t3stackblog/tdhls4hoppcf85wifgxr.jpg",
  );


  const organizer2 = await createUser(
    "organizer2@example.com",
    "ベジータ(イベント主催者2)",
    "organizer",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717797012/t3stackblog/kx92sxq0rsnltkn4zykl.png",
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
    "セル(イベント主催者3)",
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
    "フリーザ(イベント出店者1)",
    "vendor",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717803325/t3stackblog/p84dmirm48zyvecsosch.jpg"
  );
  const vendor_obj1 = await createVendor(vendor1);

  const vendor2 = await createUser(
    "vendor2@example.com",
    "ピッコロ(イベント出店者2)",
    "vendor",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717797134/t3stackblog/y8ylsaz3ixd451otrk9k.png"
  );
  const vendor_obj2 = await createVendor(vendor2);


  const customer1 = await createUser(
    "customer1@example.com",
    "亀仙人(イベント参加者1)",
    "customer",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717763285/t3stackblog/mk1kdovvoc7zbcocideo.jpg"
  );
  await createCustomer(customer1);
  
  const customer2 = await createUser(
    "customer2@example.com",
    "トランクス(イベント参加者2)",
    "customer",
    "https://res.cloudinary.com/du8k76ffm/image/upload/v1717767214/t3stackblog/u5smgu6jqcvnavssbtb4.jpg"
  );
  await createCustomer(customer2);

  await createComment(customer1, event1, "特訓開始！仙豆はどこ？");
  await createComment(vendor1, event1, "仙豆売り場はこちらです！");
  await createComment(customer1, event2, "天下一武道会、私が優勝する予定です！");
  await createComment(customer1, event3, "100倍の重力でもへっちゃらです！");
  await createComment(organizer2, event4, "ビルス様との修行、遅刻厳禁ですよ！");
  await createComment(organizer1, event2, "参加者募集中！最強を決める時が来ました！");
  await createComment(vendor1, event4, "ビルス様専用の特製グッズ、限定販売中！");
  await createComment(customer1, event4, "ビルス様と修行、緊張してます！");
  await createComment(organizer3, event5, "セルゲーム、観客席にもドラゴンレーダー配布中！");
  await createComment(vendor1, event5, "セルゲーム記念、特製Tシャツ販売！");
  await createComment(customer2, event5, "セルゲーム、勝つ自信満々！");
  await createComment(customer2, event4, "ビルス様との修行、生き残れるかな？");
  await createComment(vendor2, event3, "修行用品、全て半額です！");
  await createComment(organizer1, event1, "特訓の成果、見せてください！");
  await createComment(customer1, event5, "セルゲーム、最後まで生き残るぞ！");
  await createComment(vendor2, event2, "武道会限定、飛び道具禁止の看板をご用意！");
  await createComment(organizer2, event3, "修行イベント、サイヤ人のみなさん、お待ちしています！");
  await createComment(customer2, event2, "ダンスの練習、毎日してます！");
  await createComment(vendor1, event2, "武道会スペシャル、力の大会セット販売中！");
  await createComment(organizer3, event5, "セルゲーム、最強の戦士を決めます！");

  await createEventParticipationRequest(vendor_obj1, event5, "pending");
  await createEventParticipationRequest(vendor_obj1, event1, "approved");
  await createEventParticipationRequest(vendor_obj1, event3, "pending");
  await createEventParticipationRequest(vendor_obj2, event3, "approved");
  await createEventParticipationRequest(vendor_obj2, event2, "pending");
  
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
