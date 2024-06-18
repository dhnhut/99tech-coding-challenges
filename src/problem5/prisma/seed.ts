import { PrismaClient, User } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/en';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const amountOfUsers = 50;

  const users: User[] = [];

  for (let i = 0; i < amountOfUsers; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const user: User = {
      uuid: faker.string.uuid(),
      firstName: firstName,
      lastName: lastName,
      email: faker.internet.email(),
      phone: faker.phone.number(),
      bio: faker.person.bio(),
      address: faker.location.streetAddress(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    users.push(user);
  }

  // create multiple dummy users
  (async () => await prisma.user.createMany({ data: users }))();
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
