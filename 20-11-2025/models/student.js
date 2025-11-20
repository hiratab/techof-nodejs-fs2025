const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"]
  },
  email:  {
    type: String,
    required: [true, "email is required"],
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'invalid email']
  },
  age: {
    type: Number,
    min: 0
  },
  skills: {
    type: [String],
    default: []
  },
  active: {
    type: Boolean,
    default: false,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }
}, {
  timestamps: true
})

const StudentModel = mongoose.model('Student', StudentSchema, 'students')

module.exports = {
  StudentModel
}
