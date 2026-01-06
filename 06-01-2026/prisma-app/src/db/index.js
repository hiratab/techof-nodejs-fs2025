const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient({
    log: [
      { emit: 'stdout', level: 'query' }
    ]
  })

prisma.$on('query', (e) => {
  console.log('Query', e)
})

module.exports = {
  prisma
}
