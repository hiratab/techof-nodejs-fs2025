const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
const fs = require('fs').promises
const path = require('path')

const {
  StudentModel,
  CourseModel,
} = require('../models')

const MONGO_URL = process.env.MONGO_URL

async function runSeed() {
  try {
    console.log('runSeed Connecting to from DB')
    await mongoose.connect(MONGO_URL)
    console.log('runSeed Connected to the DB')

    console.log('runSeed Reading Students File')
    const data = await fs.readFile(path.join(__dirname, 'data', 'students-50.json'), 'utf-8')
    const jsonData = JSON.parse(data)
    console.log('runSeed File read')

    const courses = []
    const students = jsonData.map(({_id, ...student }) => {
        return student
      })
    .map(({ course, ...student }) => {
      const exist = courses.filter(_course => _course.name === course.name)

      if (exist && exist.length === 0) {
        courses.push(course)
      }
      return({ course, ...student })
    })

    console.log('Deleting all courses')
    await CourseModel.deleteMany({})
    console.log('Deleted all courses')

    console.log('Deleting all students')
    await StudentModel.deleteMany({})
    console.log('Deleted all students')

    console.log(`Inserting ${courses.length} courses`)
    const _courses = await CourseModel.insertMany(courses)
    console.log(`Inserted ${courses.length} courses`)

    const studentsWithCourses = students.map(({ course, ..._student }) => {
      const [studentCourse] = _courses.filter(c => c.name === course.name)

      return {
        ..._student,
        course: studentCourse._id
      }
    })

    console.log(`Inserting ${studentsWithCourses.length} students`)
    const _students = await StudentModel.insertMany(studentsWithCourses)
    console.log(`Inserted ${_students.length} students`)

  } catch (error) {
    console.error(error)
  } finally {
    await mongoose.disconnect()
    console.log('runSeed Disconnected from the DB')
  }
}

runSeed()