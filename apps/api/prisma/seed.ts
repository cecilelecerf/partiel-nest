import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcrypt';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await hash('Password123!', 10);

  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      password,
      name: 'Alice',
      posts: {
        create: [
          {
            title: 'Mon premier article',
            content: 'Contenu de mon premier article',
            published: true,
          },
          {
            title: 'Brouillon en cours',
            content: 'Pas encore publié...',
            published: false,
          },
        ],
      },
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      password,
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Article de Bob',
            content: 'Bob écrit aussi des articles',
            published: true,
          },
        ],
      },
    },
  });

  console.log('✅ Seeded:', { alice, bob });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
