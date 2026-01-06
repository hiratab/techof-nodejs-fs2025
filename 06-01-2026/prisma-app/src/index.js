const { prisma } = require('./db')

async function createPost() {
  // const post = await prisma.post.create({
  //   data: {
  //     title: "Meu Primeiro Post",
  //     content: 'Algum content para o primeiro post',
  //     userId: 1
  //   }
  // })

  // const post = await prisma.post.create({
  //   data: {
  //     title: 'Meu Segundo Post',
  //     content: 'Conteudo do segundo post',
  //     user: {
  //       connect: {
  //         id: 1
  //       }
  //     }
  //   }
  // })

  const post = await prisma.post.create({
    data: {
      title: 'Meu Segundo Post',
      content: 'Conteudo do segundo post',
      user: {
        connect: {
          email: 'bruno@domain.com'
        }
      }
    }
  })

  console.log(post)
}

async function fetchUserWithPosts() {
  const userPosts = await prisma.user.findUnique({
    where: {
      id: 1,
      email: 'bruno@domain.com'
    },
    include: { posts: true }
  })

  console.log(userPosts)
}

async function fetchAllPostsFromUser() {
  // const posts = await prisma.post.findMany({
  //   where: {
  //     userId: 1
  //   },
  //   include: { user: true }
  // })

  // const posts = await prisma.post.findMany({
  //   where: {
  //     user: {
  //       id: 1
  //     }
  //   },
  //   include: { user: true }
  // })

  const posts = await prisma.post.findMany({
    where: {
      user: {
        email: 'bruno@domain.com'
      }
    },
    include: { user: true }
  })

  console.log(posts)
}

async function selectColumn() {
  const userWithPosts = await prisma.user.findUnique({
    where: {
      email: 'bruno@domain.com',
    },
    select: {
      name: true,
      email: true,
      posts: {
        select: {
          title: true
        }
      }
    }
  })

  console.log(userWithPosts)
}

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     name: 'Bruno',
  //     email: 'bruno@domain.com',
  //   }
  // })

  // console.log(user)

  // Equivalente usando o knex
  // const userKnex = await knex('user').insert({
  //   name: 'Bruno',
  //   email: 'bruno@domain.com',
  // })

  // await createPost()

  // await fetchAllPostsFromUser()

  await selectColumn()
}

main().then().catch((error) => { console.error(error) })