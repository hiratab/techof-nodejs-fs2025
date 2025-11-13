const express = require('express')
const fs = require('fs').promises
const path = require('path')

const userRouter = express.Router()

const readFileMiddleware = (filePath) => {
  return async (req, res, next) => {
    const data = await fs.readFile(
      path.join(...filePath),
      'utf8'
    )

    req.rawData = data

    next()
  }
}

const parseStringToJson = (property) => {
  return (req, res, next) => {
    req[property] = JSON.parse(req.rawData)
    next()
  }
}

const replaceTextWithData = (req, res, next) => {
  const greeting = 'Hello'
  req.data = req.rawData.replaceAll('$GREETING', greeting)

  next()
}

const findUserById = (req, res, next) => {
  const { id } = req.params
  const { users: { users } } = req

  req.user = users.filter(user => Number(user.id) === Number(id))

  next()
}

userRouter.get('/',
  readFileMiddleware([__dirname, '..', 'data', 'users.json']),
  parseStringToJson('users'),
  (req, res) => {
    const { users } = req
    return res.json(users)
  })

const middlewares = [
  readFileMiddleware([__dirname, '..', 'data', 'users.json']),
  parseStringToJson('users'),
  findUserById,
]
userRouter.get('/:id',
  middlewares,
  (req, res) => {
    const { user } = req

    return res.json({ user })
  })

userRouter.post('/', (req, res) => {
  console.log('req.body', req.body)
  const {
    name,
    email,
    password,
  } = req.body

  USERS.push({
    name,
    email,
    password,
  })

  return res.json({
    users: USERS
  })
})

module.exports = {
  userRouter
}
