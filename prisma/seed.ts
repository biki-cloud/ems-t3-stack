import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"

async function main() {
  console.log('Seeding data...');

  const user1 = await prisma.user.create({
    data: {
      email: 'organizer1@example.com',
      hashedPassword: await bcrypt.hash('password', 12),
      name: 'イベント主催者1',
      role: 'organizer',
    },
  });
  console.log('Created user:', user1);
  
  console.log('Data seeding complete.');
}

main()
  .catch(err => {
    console.error('Error seeding data:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
