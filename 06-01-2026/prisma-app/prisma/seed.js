const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: {
      email: 'admin@email.com',
    },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@email.com'
    }
  })

  await prisma.user.upsert({
    where: {
      email: 'user@email.com'
    },
    update: {},
    create: {
      name: 'User',
      email: 'user@email.com'
    }
  })
}

main()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })