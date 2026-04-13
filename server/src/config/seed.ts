import { hashSync } from "bcrypt";
import { prisma } from "./prisma";

async function run() {
  const hashedPassword = hashSync("123456", 10)

  const user = await prisma.user.upsert({
    where: { name: 'donati' },
    update: {},
    create: { name: 'donati', password: hashedPassword, status: 'ACTIVE'}
  });
  console.log('Created user', user);
}
run();