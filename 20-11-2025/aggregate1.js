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

    const result = await StudentModel.aggregate([
      {
        $match: {
          age: {
            $gte: 30
          }
        }
      },
      {
        $group: {
          _id: "$course.name",
          total: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          total: -1
        }
      }
    ])
    console.log(result)
  } catch (error) {
    console.error(error)
  } finally {
    await mongoose.disconnect()
    console.log('find Disconnected from the DB')
  }
}

find()