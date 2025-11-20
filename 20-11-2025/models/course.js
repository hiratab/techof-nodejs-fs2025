const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    unit: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      min: 0
    }
  }
})

const CourseModel = mongoose.model('Course', CourseSchema, 'courses')

module.exports = {
  CourseModel
}
