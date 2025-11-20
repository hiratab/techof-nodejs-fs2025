const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const MONGO_URL = process.env.MONGO_URL

const StudentSchema = new mongoose.Schema({
  name: {
    type: String
  },
  age: {
    type: Number
  },
  skills: {
    type: [String]
  },
  course: {
    name: String,
    duration: {
      unit: String,
      value: Number
    }
  }
})

const StudentModel = mongoose.model('Student', StudentSchema, 'students')

async function main() {
  try {
    await mongoose.connect(MONGO_URL)
    console.log("Connected to MongoDB")

    const students = await StudentModel.findOneAndUpdate(
      {
        name: 'Joana'
      },
      {
        age: 33,
      },
      {
        new: true,
        upsert: true,
      }
    )

    console.log(students)

    await mongoose.disconnect()
    console.log("Disconnected to MongoDB")
  } catch(error ) {
    console.error(error)
  }
}

main()
