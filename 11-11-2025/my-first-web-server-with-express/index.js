const express = require('express')
const path = require('path')
const fs = require('fs').promises

const app = express()
app.use(express.json())

const USERS = [{
  id: 1,
  name: 'Bruno',
  email: 'b@b.com',
  password: 'nao-fazer-isso'
},
{
  id: 2,
  name: 'Postman',
  email: 'post@man.com',
  password: 'nao-fazer-isso'
}]

app.use('/assets', express.static(path.join(__dirname, '/public')))

app.get('/', async (req, res) => {
  console.log('Request in /')
  const data = await fs.readFile(
    path.join(__dirname, 'public', 'index.html'),
    'utf8'
  )
  const greeting = 'Hello'
  res.type('html').send(data.replaceAll('$GREETING', greeting))
})

app.get('/user', (req, res) => {
  return res.json({
    users: USERS
  })
})

app.get('/user/:id', (req, res) => {
  const { id, outroId } = req.params
  console.log('id', id, 'outroId', outroId)
  return res.json({
    user: USERS.filter(user => Number(user.id) === Number(id))
  })
})

app.post('/user', (req, res) => {
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

app.use((req, res) => {
  res.status(404).send('Not Found')
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})