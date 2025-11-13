const express = require('express')
const notFoundRouter = express.Router()

notFoundRouter.use((req, res) => {
  res.status(404).send('Not Found')
})

module.exports = {
  notFoundRouter
}