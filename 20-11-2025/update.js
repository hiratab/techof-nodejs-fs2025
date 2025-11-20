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

    const course = await CourseModel.create({
      name: "Cloud Computing Foundation",
      duration: {
        unit: 'weeks',
        value: 10
      }
    })

    const zeca = await StudentModel.findOne({
      name: "Zeca Gomes"
    })
    zeca.course = course._id
    await zeca.save()
    console.log(zeca)

    await StudentModel.findOneAndUpdate({
      name: "Felipe Barbosa"
    }, {
      $set: {
        course: course._id
      }
    })
  } catch (error) {
    console.error(error)
  } finally {
    await mongoose.disconnect()
    console.log('find Disconnected from the DB')
  }
}

find()