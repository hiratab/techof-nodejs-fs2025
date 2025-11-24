import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  skills: [String],
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  password: { type: String, required: true },
  email:  {
    type: String,
    required: [true, "email is required"],
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'invalid email']
  },
}, {
  timestamps: true
});

StudentSchema.pre('save', async function() {
  console.log('StudentSchema pre')
  if (!this.isModified('password')) return ;

  const salt = 10;
  const hash = await bcrypt.hash(this.password, salt)
  this.password = hash;
});

export const Student = mongoose.model('Student', StudentSchema, 'students');