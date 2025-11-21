import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { unit: String, value: Number }
});

export const Course = mongoose.model('Course', CourseSchema, 'courses');
