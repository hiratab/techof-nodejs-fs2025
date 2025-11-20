const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')

const {
  StudentModel,
  CourseModel,
} = require('./models')

const MONGO_URL = process.env.MONGO_URL

async function find() {
  try {
    console.log('find Connecting to from DB')
    await mongoose.connect(MONGO_URL)
    console.log('find Connected to the DB')

    const result = await StudentModel.find({
      age: {
        $gte: 45
      }
    })
    .skip(0)
    .limit(1)
    .sort({
      age: -1
    })
    console.log(result)
  } catch (error) {
    console.error(error)
  } finally {
    await mongoose.disconnect()
    console.log('find Disconnected from the DB')
  }
}

find()