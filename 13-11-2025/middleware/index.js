const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())

const { userRouter } = require('./routes/userRouter')
const { notFoundRouter } = require('./routes/notFoundRouter')
const {
  readFileMiddleware,
  replaceTextWithDataMiddleware,
} = require('./middlewares')

app.use('/assets', express.static(path.join(__dirname, '/public')))

app.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

app.use('/user', userRouter)

app.get('/',
  readFileMiddleware([__dirname, 'public', 'index.html']),
  replaceTextWithDataMiddleware,
  async (req, res) => {
    console.log('Request in /')
    res.type('html').send(req.data)
  }
)

app.use(notFoundRouter)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})