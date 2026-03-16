import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'instructor@udplatform.dev' },
    update: {},
    create: {
      id: 'user_seed_1',
      email: 'instructor@udplatform.dev',
      fullName: 'Sarah Lane',
      instructorProfile: {
        create: {
          id: 'inst_seed_1',
          bio: 'Senior software instructor'
        }
      }
    }
  });

  await prisma.course.createMany({
    data: [
      {
        instructorId: 'inst_seed_1',
        title: 'Next.js for Beginners',
        subtitle: 'Build production-grade full-stack apps',
        description: 'Hands-on Next.js + PostgreSQL project',
        category: 'Development',
        priceUsd: 49.99,
        rating: 4.8,
        isPublished: true
      },
      {
        instructorId: 'inst_seed_1',
        title: 'Mastering PostgreSQL',
        subtitle: 'Schema design, indexing and performance',
        description: 'Advanced SQL for marketplace products',
        category: 'Databases',
        priceUsd: 59.99,
        rating: 4.9,
        isPublished: true
      }
    ],
    skipDuplicates: true
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
