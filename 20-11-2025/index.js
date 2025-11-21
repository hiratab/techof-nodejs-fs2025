const express = require('express')
const mongoose = require('mongoose')


const { StudentModel } = require('./models')

const app = express()

const dotenv = require('dotenv')
dotenv.config()
const MONGO_URL = process.env.MONGO_URL


app.get('', async (req, res) => {
  let students = {}
  try {
      console.log('find Connecting to from DB')
      await mongoose.connect(MONGO_URL)
      console.log('find Connected to the DB')

      const { sort, sortDirection, limit } = req.query
      console.log(req.query)

      const sortObj = {}
      sortObj[sort] = sortDirection

      students = await StudentModel.find({})
        .sort({ age: 1 })
        .limit(limit)
      
    } catch (error) {
      console.error(error)
    } finally {
      await mongoose.disconnect()
      console.log('find Disconnected from the DB')

      return res.json({
        students
      })
    }
})

app.listen(3000, () => {
  console.log('App listening in 3000')
})